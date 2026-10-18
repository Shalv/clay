/**
 * Server-side mail delivery for website enquiries and chat-agent leads.
 *
 * Two transports are available and are tried in order:
 *
 *  1. Microsoft Graph (preferred). The web app talks to Graph as a daemon
 *     service principal using the OAuth 2.0 client-credentials flow, then calls
 *     /users/{sender}/sendMail. This is the transport that works when the
 *     organization has disabled SMTP AUTH on Microsoft 365, which is the
 *     common case on newer tenants.
 *  2. SMTP through nodemailer (fallback), the older path, kept working so an
 *     existing SMTP_PASS setting still delivers.
 *
 * A failed send is not dropped: the message goes to an in-process outbox and
 * is retried on the next inbound request (or on a timer while the standalone
 * server is up). That covers transient blips - Graph throttling, a DNS hiccup -
 * without needing a queue. It is deliberately *not* a durable outbox: nothing
 * survives a process restart, and a serverless function can be frozen between
 * invocations. If these notifications ever become business-critical, the next
 * step is to write the enquiry to Postgres first and let a worker drain it,
 * rather than trusting this list.
 */

import nodemailer from "nodemailer";

export interface MailMessage {
  to: string[];
  /** Who to reach when the recipient hits reply - the prospect, not us. */
  replyTo?: { name: string; email: string };
  subject: string;
  text?: string;
  html: string;
}

export type TransportName = "microsoft-graph" | "smtp" | "none";

export interface DeliveryResult {
  delivered: boolean;
  transport: TransportName;
  /** Human-readable outcome, safe to log and to show in the diagnostics endpoint. */
  detail: string;
  /**
   * Whether retrying later could plausibly help. A throttled Graph call or a DNS
   * blip is worth another attempt; a rejected credential or a missing
   * permission is not, and queueing it only makes every later enquiry pay for
   * two more doomed calls.
   */
  retryable: boolean;
}

const GRAPH_TOKEN_SCOPE = "https://graph.microsoft.com/.default";
const GRAPH_SEND_MAIL_VERSION = "v1.0";

/**
 * Defaults for the Coreenact Azure AD app registration. A tenant id, an app id
 * and a sender mailbox are identifiers rather than secrets - they are visible
 * to anyone who watches a sign-in - so they live here to keep deployment to a
 * single credential. Every one of them can still be overridden per environment.
 */
const DEFAULT_TENANT_ID = "d74b8bb7-09a3-4a3c-9ca7-49b9a9dea733";
const DEFAULT_CLIENT_ID = "95226f77-c85e-424c-a7a9-dd7f0dcec852";
const DEFAULT_SENDER_EMAIL = "Info@coreenact.com";

// Read at call time, never captured at import. server.ts imports this module
// above its own dotenv.config() call, and ES module imports are evaluated
// before the importing file runs - so a module-level read here would permanently
// see an empty environment and report Graph as unconfigured no matter what .env
// holds. Trimming also forgives a stray space from pasting into a shell or a
// Vercel field, which would otherwise fail authentication with no clue why.
const readEnv = (name: string, fallback = ""): string => (process.env[name] || "").trim() || fallback;

const graphTenantId = () => readEnv("GRAPH_TENANT_ID", DEFAULT_TENANT_ID);
const graphClientId = () => readEnv("GRAPH_CLIENT_ID", DEFAULT_CLIENT_ID);
// The one value that must never be committed: the app registration's secret.
const graphClientSecret = () => readEnv("GRAPH_CLIENT_SECRET");
const graphSenderEmail = () => readEnv("GRAPH_SENDER_EMAIL", DEFAULT_SENDER_EMAIL);

/** True once the four values Graph needs are present. Checked per send, not at boot. */
export const isGraphConfigured = (): boolean =>
  Boolean(graphTenantId() && graphClientId() && graphClientSecret() && graphSenderEmail());

export const isSmtpConfigured = (): boolean => Boolean(process.env.SMTP_PASS);

const smtpUser = () => process.env.SMTP_USER || "Info@coreenact.com";

// ---------------------------------------------------------------------------
// Graph access token, cached for its lifetime
// ---------------------------------------------------------------------------

/** Carries the retry verdict out of the token call and into the outbox decision. */
class GraphDeliveryError extends Error {
  readonly permanent: boolean;

  constructor(message: string, permanent: boolean) {
    super(message);
    this.name = "GraphDeliveryError";
    this.permanent = permanent;
  }
}

// ENTRA reports bad credentials as `invalid_client`. Nothing about retrying a
// wrong secret can end well, so that one is called out as permanent.
const PERMANENT_TOKEN_ERRORS = new Set(["invalid_client", "unauthorized_client", "invalid_request"]);

interface CachedToken {
  value: string;
  /** Epoch millis. Renewed slightly early so a request never uses a dead token. */
  expiresAt: number;
}

let cachedToken: CachedToken | null = null;
let tokenInFlight: Promise<string> | null = null;

async function fetchGraphToken(): Promise<string> {
  const response = await fetch(
    `https://login.microsoftonline.com/${graphTenantId()}/oauth2/v2.0/token`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: graphClientId(),
        scope: GRAPH_TOKEN_SCOPE,
        client_secret: graphClientSecret(),
        grant_type: "client_credentials",
      }),
    }
  );

  const payload: any = await response.json().catch(() => ({}));

  if (!response.ok || !payload.access_token) {
    const code = payload.error || `http_${response.status}`;
    const description = payload.error_description || "No description returned.";
    throw new GraphDeliveryError(
      `Graph token request failed (${code}): ${description}`,
      PERMANENT_TOKEN_ERRORS.has(code)
    );
  }

  const expiresIn = Number(payload.expires_in) || 3600;
  cachedToken = {
    value: payload.access_token as string,
    expiresAt: Date.now() + (expiresIn - 120) * 1000,
  };
  return cachedToken.value;
}

/**
 * Concurrent requests share one token round-trip. Graph issues a fresh token
 * per call otherwise, and the endpoint throttles aggressive minting.
 */
async function getGraphToken(): Promise<string> {
  if (cachedToken && cachedToken.expiresAt > Date.now()) {
    return cachedToken.value;
  }
  if (!tokenInFlight) {
    tokenInFlight = fetchGraphToken().finally(() => {
      tokenInFlight = null;
    });
  }
  return tokenInFlight;
}

/** Drop the cached token when Graph rejects it, so the next send re-authenticates. */
function invalidateGraphToken() {
  cachedToken = null;
}

function graphErrorText(status: number, payload: any): string {
  const inner = payload?.error;
  if (!inner) return `HTTP ${status}`;
  return `${inner.code || "graph_error"}: ${inner.message || "no message"}`;
}

async function sendViaGraph(message: MailMessage): Promise<DeliveryResult> {
  const token = await getGraphToken();
  const sender = encodeURIComponent(graphSenderEmail());

  const response = await fetch(
    `https://graph.microsoft.com/${GRAPH_SEND_MAIL_VERSION}/users/${sender}/sendMail`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        // Graph accepts a single body per message, so HTML wins and the plain
        // text variant is only used by the SMTP transport.
        message: {
          subject: message.subject,
          body: { contentType: "HTML", content: message.html },
          toRecipients: message.to.map((address) => ({ emailAddress: { address } })),
          ...(message.replyTo
            ? {
                replyTo: [
                  {
                    emailAddress: {
                      address: message.replyTo.email,
                      name: message.replyTo.name,
                    },
                  },
                ],
              }
            : {}),
        },
        // Notification mail is outgoing from a service mailbox; keeping it out
        // of the sender's Sent Items avoids doubling up the shared inbox.
        saveToSentItems: false,
      }),
    }
  );

  if (!response.ok) {
    const payload: any = await response.json().catch(() => ({}));
    if (response.status === 401 || response.status === 400) {
      invalidateGraphToken();
    }
    return {
      delivered: false,
      transport: "microsoft-graph",
      detail: `Microsoft Graph rejected the message (${graphErrorText(response.status, payload)}).`,
      // Only throttling and server-side faults are worth another try: a 403
      // means the Mail.Send permission is missing and a 404 means the sender
      // mailbox does not exist, and neither heals itself.
      retryable: response.status === 429 || response.status >= 500,
    };
  }

  return {
    delivered: true,
    transport: "microsoft-graph",
    detail: `Delivered to ${message.to.join(", ")} through Microsoft Graph.`,
    retryable: false,
  };
}

// ---------------------------------------------------------------------------
// SMTP fallback
// ---------------------------------------------------------------------------

async function sendViaSmtp(message: MailMessage): Promise<DeliveryResult> {
  const port = Number(process.env.SMTP_PORT) || 587;
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.office365.com",
    port,
    secure: port === 465,
    requireTLS: true,
    auth: { user: smtpUser(), pass: process.env.SMTP_PASS },
  });

  await transporter.sendMail({
    from: `"Coreenact Form Inquiries" <${smtpUser()}>`,
    to: message.to.join(", "),
    replyTo: message.replyTo ? `${message.replyTo.name} <${message.replyTo.email}>` : undefined,
    subject: message.subject,
    text: message.text,
    html: message.html,
  });

  return {
    delivered: true,
    transport: "smtp",
    detail: `Delivered to ${message.to.join(", ")} over Microsoft 365 SMTP.`,
    retryable: false,
  };
}

// ---------------------------------------------------------------------------
// Outbox for transient failures
// ---------------------------------------------------------------------------

interface QueuedMail {
  message: MailMessage;
  attempts: number;
  lastError: string;
  queuedAt: string;
}

const MAX_OUTBOX_MESSAGES = 20;
const MAX_DELIVERY_ATTEMPTS = 3;

const outbox: QueuedMail[] = [];
let flushingOutbox = false;

function queueForRetry(message: MailMessage, lastError: string) {
  const existing = outbox.findIndex((entry) => entry.message.subject === message.subject);
  if (existing !== -1) {
    outbox.splice(existing, 1);
  }
  outbox.push({ message, attempts: 1, lastError, queuedAt: new Date().toISOString() });
  if (outbox.length > MAX_OUTBOX_MESSAGES) {
    const dropped = outbox.shift();
    console.error(`[MAIL OUTBOX FULL] Dropped undelivered notification: ${dropped?.message.subject}`);
  }
}

/** Read a permanent-failure verdict off whatever an error object carried. */
const isPermanentError = (err: any): boolean => Boolean(err?.permanent);

async function deliverOnce(message: MailMessage): Promise<DeliveryResult> {
  let graphDetail = "";
  let graphPermanent = false;

  if (isGraphConfigured()) {
    try {
      return await sendViaGraph(message);
    } catch (err: any) {
      // An unreachable token endpoint or a throttled call should not stop the
      // SMTP fallback from getting its turn.
      invalidateGraphToken();
      graphDetail = err?.message || String(err);
      graphPermanent = isPermanentError(err);
      console.error("[MICROSOFT GRAPH ERROR]:", graphDetail);
    }
  }

  if (isSmtpConfigured()) {
    try {
      const smtpResult = await sendViaSmtp(message);
      if (graphDetail) {
        smtpResult.detail = `Graph unavailable (${graphDetail}); ${smtpResult.detail}`;
      }
      return smtpResult;
    } catch (err: any) {
      const detail = err?.message || String(err);
      // 535 / EAUTH are SMTP authentication rejections, not transient faults.
      const smtpPermanent = err?.responseCode === 535 || String(err?.code || "").startsWith("EAUTH");
      console.error("[MICROSOFT 365 SMTP ERROR]:", detail);
      return {
        delivered: false,
        transport: "smtp",
        detail: graphDetail
          ? `Graph failed (${graphDetail}) and SMTP failed (${detail}).`
          : `Microsoft 365 SMTP failed: ${detail}`,
        retryable: !(smtpPermanent || graphPermanent),
      };
    }
  }

  return {
    delivered: false,
    transport: "none",
    detail: graphDetail
      ? `Graph delivery failed (${graphDetail}) and no SMTP credentials are configured.`
      : "No mail transport configured. Set GRAPH_CLIENT_SECRET (with tenant, client and sender) or SMTP_PASS.",
    // Retrying cannot supply a missing or wrong credential.
    retryable: Boolean(graphDetail) && !graphPermanent,
  };
}

/**
 * Retry everything the outbox is holding. Runs on its own so a caller never
 * has to know whether it is sending a fresh message or an old one.
 */
async function flushOutbox(): Promise<number> {
  if (flushingOutbox || outbox.length === 0) return 0;
  flushingOutbox = true;

  let recovered = 0;
  const batch = [...outbox];
  outbox.length = 0;

  try {
    for (const entry of batch) {
      const result = await deliverOnce(entry.message);
      if (result.delivered) {
        recovered += 1;
        console.log(`[MAIL OUTBOX RETRY OK] ${entry.message.subject} after ${entry.attempts} attempt(s)`);
        continue;
      }
      entry.attempts += 1;
      entry.lastError = result.detail;
      if (result.retryable && entry.attempts < MAX_DELIVERY_ATTEMPTS) {
        outbox.push(entry);
      } else {
        console.error(
          `[MAIL OUTBOX ${result.retryable ? "GAVE UP" : "PERMANENT FAILURE"}] ${entry.message.subject} after ${entry.attempts} attempt(s): ${result.detail}`
        );
      }
    }
  } finally {
    flushingOutbox = false;
  }

  return recovered;
}

/**
 * Send a notification, trying Graph first and SMTP second. Failures are
 * reported rather than thrown: an enquiry must still look saved to the
 * visitor even if the mailbox is unreachable.
 */
export async function sendNotificationMail(message: MailMessage): Promise<DeliveryResult> {
  // Opportunistic retry of anything already queued, before adding more.
  await flushOutbox().catch((err) => console.error("[MAIL OUTBOX FLUSH ERROR]:", err?.message));

  const result = await deliverOnce(message);
  if (!result.delivered && result.retryable) {
    queueForRetry(message, result.detail);
  } else if (!result.delivered) {
    console.error(`[MAIL NOT QUEUED - PERMANENT] ${message.subject}: ${result.detail}`);
  } else {
    console.log(`[MAIL SENT VIA ${result.transport.toUpperCase()}] ${message.subject}`);
  }
  return result;
}

export function startOutboxTimer(intervalMs = 60_000): NodeJS.Timeout {
  const timer = setInterval(() => {
    flushOutbox().catch((err) => console.error("[MAIL OUTBOX FLUSH ERROR]:", err?.message));
  }, intervalMs);
  // Never hold a shutting-down process open for a retry timer.
  timer.unref?.();
  return timer;
}

/** Shape for GET /api/email-status - configuration truth without leaking secrets. */
export function mailTransportStatus() {
  return {
    graph: {
      configured: isGraphConfigured(),
      tenantId: graphTenantId() || null,
      clientId: graphClientId() || null,
      senderMailbox: graphSenderEmail() || null,
      clientSecretPresent: Boolean(graphClientSecret()),
      tokenCachedUntil: cachedToken ? new Date(cachedToken.expiresAt).toISOString() : null,
      missingSettings: [
        !graphTenantId() ? "GRAPH_TENANT_ID" : "",
        !graphClientId() ? "GRAPH_CLIENT_ID" : "",
        !graphClientSecret() ? "GRAPH_CLIENT_SECRET" : "",
        !graphSenderEmail() ? "GRAPH_SENDER_EMAIL" : "",
      ].filter(Boolean),
    },
    smtp: {
      configured: isSmtpConfigured(),
      host: process.env.SMTP_HOST || "smtp.office365.com",
      port: Number(process.env.SMTP_PORT) || 587,
      user: smtpUser(),
    },
    activeTransport: (isGraphConfigured()
      ? "microsoft-graph"
      : isSmtpConfigured()
        ? "smtp"
        : "none") as TransportName,
    pendingRetries: outbox.map((entry) => ({
      subject: entry.message.subject,
      attempts: entry.attempts,
      queuedAt: entry.queuedAt,
      lastError: entry.lastError,
    })),
  };
}
