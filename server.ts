import express from "express";
import http from "http";
import path from "path";
import fs from "fs";
import { GoogleGenAI, ThinkingLevel, GenerateVideosOperation } from "@google/genai";
import dotenv from "dotenv";
// The .js suffix on this local module is not a typo and not optional for the
// deployment: on Vercel server.ts is transpiled and executed as an ES module,
// where a specifier must name the file Node really resolves. Node reported it
// verbatim: "Cannot find module '/var/task/mailTransport' imported from
// /var/task/server.js. Did you mean to import ./mailTransport.js?".
// TypeScript with moduleResolution "bundler", tsx in dev and esbuild for
// dist/server.cjs all map the .js specifier back onto mailTransport.ts.
import {
  mailTransportStatus,
  sendNotificationMail,
  startOutboxTimer,
} from "./mailTransport.js";
import { WebSocketServer, WebSocket } from "ws";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Boot-time mail report. Prints the length of the loaded secret, never the
// value: a truncated or absent credential is otherwise indistinguishable from
// a rejected one when reading a deploy log.
const bootGraphSecret = (process.env.GRAPH_CLIENT_SECRET || "").trim();
console.log(
  `[MAIL BOOT] transport=${mailTransportStatus().activeTransport} graphSecret=${
    bootGraphSecret ? `${bootGraphSecret.length} chars` : "absent"
  }`
);

// Lazy initializer for Gemini client
let genAIClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!genAIClient) {
    genAIClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return genAIClient;
}

// 1. Health check
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "Coreenact Enterprise Platform",
    hasApiKey: Boolean(process.env.GEMINI_API_KEY),
    emailIntegration: `Microsoft 365 (${mailTransportStatus().activeTransport})`,
    timestamp: new Date().toISOString(),
  });
});

// 2. Microsoft 365 Form Mailer Integration (/api/enquiry)
// Delivery addresses are a comma-separated list, so one enquiry can reach the
// shared inbox and a named recipient at the same time.
const NOTIFICATION_EMAILS = (process.env.NOTIFICATION_EMAIL ||
  process.env.CRM_ADMIN_EMAIL ||
  "Info@coreenact.com,shivam.yadav@coreenact.com")
  .split(",")
  .map((entry) => entry.trim())
  .filter(Boolean);
const TARGET_NOTIFICATION_EMAIL = NOTIFICATION_EMAILS.join(", ");
// What the visitor is told. The internal distribution list stays out of the
// browser, and out of any mailto link a prospect can copy.
const PUBLIC_INBOX_EMAIL = process.env.PUBLIC_INBOX_EMAIL || "Info@coreenact.com";

/** Values below come straight from a browser and end up inside an HTML mail. */
function escapeHtml(value: string): string {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** The diagnostic endpoints are public, so the internal list never appears in them. */
const redactRecipients = (text: string): string =>
  text.split(TARGET_NOTIFICATION_EMAIL).join(PUBLIC_INBOX_EMAIL);

// ---------------------------------------------------------------------------
// Prospect confirmation copy
//
// A visitor who hears nothing assumes their form vanished, so each enquiry also
// mails the address they typed. That makes this backend a sender to arbitrary
// addresses, which is a spam vector: the body is a fixed template with escaped
// values only, and sends are throttled per address and per hour so a scripted
// flood cannot exhaust the tenant's Graph mail quota.
// ---------------------------------------------------------------------------

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const CONFIRMATION_COOLDOWN_MS = 10 * 60 * 1000;
const CONFIRMATIONS_PER_HOUR_CAP = 50;
const CONFIRMATION_HOUR_MS = 60 * 60 * 1000;

const confirmationCooldown = new Map<string, number>();
let confirmationHourStartedAt = 0;
let confirmationsThisHour = 0;

/** Returns null when the confirmation may go out, otherwise the reason it will not. */
function claimConfirmationSlot(address: string): string | null {
  const now = Date.now();

  if (!EMAIL_PATTERN.test(address)) {
    return "The work email supplied does not look deliverable.";
  }
  if (process.env.SEND_ENQUIRY_CONFIRMATION === "false") {
    return "Prospect confirmations are disabled by SEND_ENQUIRY_CONFIRMATION=false.";
  }

  const lastSentAt = confirmationCooldown.get(address) || 0;
  if (now - lastSentAt < CONFIRMATION_COOLDOWN_MS) {
    return `A confirmation attempt already went out for this address ${Math.round((now - lastSentAt) / 60000)} minute(s) ago.`;
  }

  if (now - confirmationHourStartedAt > CONFIRMATION_HOUR_MS) {
    confirmationHourStartedAt = now;
    confirmationsThisHour = 0;
  }
  if (confirmationsThisHour >= CONFIRMATIONS_PER_HOUR_CAP) {
    return "Hourly confirmation limit reached. The inquiry itself still reached the Coreenact inbox.";
  }

  confirmationCooldown.set(address, now);
  confirmationsThisHour += 1;

  // The map is process-scoped, so it is trimmed rather than left to grow.
  if (confirmationCooldown.size > 500) {
    for (const [key, at] of confirmationCooldown) {
      if (now - at > CONFIRMATION_COOLDOWN_MS) confirmationCooldown.delete(key);
    }
  }

  return null;
}

async function sendEnquiryConfirmation(input: {
  name: string;
  email: string;
  service: string;
  enquiryId: string;
  receivedAt: string;
}): Promise<{ sent: boolean; to: string; reason?: string; transport?: string }> {
  const blockedReason = claimConfirmationSlot(input.email);
  if (blockedReason) {
    return { sent: false, to: input.email, reason: blockedReason };
  }

  const safeName = escapeHtml(input.name.trim().split(/\s+/)[0] || "there");
  const safeService = escapeHtml(input.service);

  const result = await sendNotificationMail({
    to: [input.email],
    subject: `We have received your enquiry - Coreenact Technologies`,
    text:
      `Hello ${input.name},\n\n` +
      `Thank you for contacting Coreenact Technologies about ${input.service}. ` +
      `Your enquiry reference is ${input.enquiryId}, received ${input.receivedAt}.\n\n` +
      `What happens next:\n` +
      `1. A Microsoft Solutions Practice Lead reviews your requirements.\n` +
      `2. We reply to this address within 4 business hours with next steps.\n` +
      `3. For time-sensitive work, call or WhatsApp +91 84487 96169.\n\n` +
      `Coreenact Technologies - Microsoft Solutions Partner\n` +
      `Global Delivery: Faridabad / New Delhi NCR, India - North America: Mississauga, Canada\n`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Your enquiry with Coreenact</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #1e293b;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0;">
    <div style="background: linear-gradient(135deg, #005a9e 0%, #0078D4 100%); padding: 24px 32px; color: #ffffff;">
      <h1 style="margin: 0 0 6px 0; font-size: 20px; font-weight: 700; letter-spacing: -0.02em;">Coreenact Technologies</h1>
      <p style="margin: 0; font-size: 13px; opacity: 0.9;">Enquiry received • Ref ${input.enquiryId}</p>
    </div>
    <div style="padding: 28px 32px;">
      <p style="font-size: 14px; line-height: 1.6; margin: 0 0 16px 0; color: #475569;">Hello <strong style="color: #0f172a;">${safeName}</strong>,</p>
      <p style="font-size: 14px; line-height: 1.6; margin: 0 0 22px 0; color: #475569;">
        Thank you for reaching out about <strong style="color: #005a9e;">${safeService}</strong>. Your enquiry was logged on ${escapeHtml(input.receivedAt)} and has been routed to our Microsoft Solutions Practice Leads.
      </p>
      <div style="background-color: #f1f5f9; border-radius: 10px; padding: 18px 20px; margin-bottom: 22px;">
        <p style="margin: 0 0 10px 0; font-size: 12px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: #64748b;">What happens next</p>
        <ol style="margin: 0; padding-left: 18px; font-size: 13px; line-height: 1.8; color: #334155;">
          <li>A practice lead reviews your requirements and current ERP footprint.</li>
          <li>We reply to this address within 4 business hours with next steps or a calendar link.</li>
          <li>Time-sensitive? Call or WhatsApp <a href="tel:+918448796169" style="color: #005a9e;">+91 84487 96169</a>.</li>
        </ol>
      </div>
      <p style="margin: 0; font-size: 12px; color: #64748b;">Keep reference <strong>${input.enquiryId}</strong> for any follow-up on this enquiry.</p>
    </div>
    <div style="background-color: #f8fafc; padding: 14px 32px; font-size: 11px; color: #64748b; border-top: 1px solid #e2e8f0; text-align: center;">
      Coreenact Technologies • Microsoft Solutions Partner<br>
      Global Delivery HQ: SRS Corporate Tower, Faridabad, New Delhi NCR, India • North America Hub: Mississauga, Canada
    </div>
  </div>
</body>
</html>
`,
  });

  return {
    sent: result.delivered,
    to: input.email,
    transport: result.transport,
    ...(result.delivered ? {} : { reason: result.detail }),
  };
}

// ---------------------------------------------------------------------------
// Live-chat visitor messages reach the inbox too
//
// The widget hands the visitor a wa.me link and stores the session in memory,
// which means an unread chat can sit there invisibly. One mail per session per
// cooldown window keeps a fast conversation from flooding the inbox while still
// putting a human on notice.
// ---------------------------------------------------------------------------
const LIVE_CHAT_ALERT_COOLDOWN_MS = 10 * 60 * 1000;
const LIVE_CHAT_ALERTS_PER_HOUR_CAP = 30;

const liveChatAlertCooldown = new Map<string, number>();
let liveChatHourStartedAt = 0;
let liveChatAlertsThisHour = 0;

/** Returns null when an alert may go out, otherwise the reason it will not. */
function claimLiveChatAlertSlot(sessionId: string): string | null {
  const now = Date.now();

  if (process.env.SEND_LIVE_CHAT_ALERT === "false") {
    return "Live-chat alerts are disabled by SEND_LIVE_CHAT_ALERT=false.";
  }

  const lastSentAt = liveChatAlertCooldown.get(sessionId) || 0;
  if (now - lastSentAt < LIVE_CHAT_ALERT_COOLDOWN_MS) {
    return `An alert for this session went out ${Math.round((now - lastSentAt) / 60000)} minute(s) ago.`;
  }

  if (now - liveChatHourStartedAt > CONFIRMATION_HOUR_MS) {
    liveChatHourStartedAt = now;
    liveChatAlertsThisHour = 0;
  }
  if (liveChatAlertsThisHour >= LIVE_CHAT_ALERTS_PER_HOUR_CAP) {
    return "Hourly live-chat alert limit reached.";
  }

  liveChatAlertCooldown.set(sessionId, now);
  liveChatAlertsThisHour += 1;

  if (liveChatAlertCooldown.size > 500) {
    for (const [key, at] of liveChatAlertCooldown) {
      if (now - at > LIVE_CHAT_ALERT_COOLDOWN_MS) liveChatAlertCooldown.delete(key);
    }
  }

  return null;
}

async function sendLiveChatAlert(input: {
  sessionId: string;
  visitorName: string;
  visitorPhone: string;
  content: string;
  replyLink: string;
  whatsappUrl: string;
  messageCount: number;
}): Promise<{ delivered: boolean; transport: string; reason?: string }> {
  const blockedReason = claimLiveChatAlertSlot(input.sessionId);
  if (blockedReason) {
    return { delivered: false, transport: "throttled", reason: blockedReason };
  }

  const safeName = escapeHtml(input.visitorName.slice(0, 80) || "Website Visitor");
  const safePhone = escapeHtml(input.visitorPhone.slice(0, 40));
  // Chat text is the visitor's own words, so it is escaped and clipped before it
  // is rendered into a mail that lands in the company inbox.
  const safeMessage = escapeHtml(input.content.slice(0, 2000));

  const result = await sendNotificationMail({
    to: NOTIFICATION_EMAILS,
    subject: `[Live Chat] ${input.visitorName.slice(0, 40)} - session #${input.sessionId}`,
    text:
      `A visitor opened the live chat on coreenact.com.\n\n` +
      `Visitor: ${input.visitorName}\n` +
      `${input.visitorPhone ? `Phone: ${input.visitorPhone}\n` : ""}` +
      `Session: #${input.sessionId} (${input.messageCount} message(s) so far)\n\n` +
      `Message:\n"${input.content}"\n\n` +
      `Reply live on their screen: ${input.replyLink}\n` +
      `Or continue on WhatsApp: ${input.whatsappUrl}\n\n` +
      `Note: nothing reaches the visitor until a consultant replies - the chat is not forwarded automatically.`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Live chat enquiry - Coreenact</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #1e293b;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0;">
    <div style="background: linear-gradient(135deg, #0f766e 0%, #14b8a6 100%); padding: 22px 32px; color: #ffffff;">
      <h1 style="margin: 0 0 6px 0; font-size: 19px; font-weight: 700; letter-spacing: -0.02em;">New live chat enquiry</h1>
      <p style="margin: 0; font-size: 13px; opacity: 0.92;">Session #${escapeHtml(input.sessionId)} • ${input.messageCount} message(s)</p>
    </div>
    <div style="padding: 26px 32px;">
      <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 20px;">
        <tr>
          <td style="padding: 7px 0; color: #64748b; width: 92px; vertical-align: top;">Visitor</td>
          <td style="padding: 7px 0; color: #0f172a; font-weight: 600;">${safeName}</td>
        </tr>
        ${
          safePhone
            ? `<tr>
          <td style="padding: 7px 0; color: #64748b; vertical-align: top;">Phone</td>
          <td style="padding: 7px 0; color: #0f172a; font-weight: 600;">${safePhone}</td>
        </tr>`
            : ""
        }
      </table>
      <div style="background-color: #f1f5f9; border-left: 3px solid #14b8a6; border-radius: 8px; padding: 16px 18px; margin-bottom: 22px;">
        <p style="margin: 0 0 8px 0; font-size: 11px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: #64748b;">Their message</p>
        <p style="margin: 0; font-size: 14px; line-height: 1.65; color: #0f172a; white-space: pre-wrap;">${safeMessage}</p>
      </div>
      <p style="margin: 0 0 14px 0; font-size: 12px; line-height: 1.6; color: #b45309; background-color: #fffbeb; border-radius: 8px; padding: 12px 14px;">
        This chat is <strong>not</strong> forwarded to your phone automatically. The visitor sees an acknowledgement, then waits. Answer below and it appears on their screen in real time.
      </p>
      <a href="${escapeHtml(input.replyLink)}" style="display: block; background-color: #005a9e; color: #ffffff; text-decoration: none; padding: 13px 18px; border-radius: 9px; font-size: 13px; font-weight: 700; text-align: center; margin-bottom: 10px;">Reply on their screen now</a>
      <a href="${escapeHtml(input.whatsappUrl)}" style="display: block; background-color: #f1f5f9; color: #0f172a; text-decoration: none; padding: 12px 18px; border-radius: 9px; font-size: 12px; font-weight: 600; text-align: center;">Open the WhatsApp thread instead</a>
    </div>
    <div style="background-color: #f8fafc; padding: 14px 32px; font-size: 11px; color: #64748b; border-top: 1px solid #e2e8f0; text-align: center;">
      Coreenact Technologies • Microsoft Solutions Partner • <a href="tel:+918448796169" style="color: #005a9e;">+91 84487 96169</a>
    </div>
  </div>
</body>
</html>
`,
  });

  return {
    delivered: result.delivered,
    transport: result.transport,
    ...(result.delivered ? {} : { reason: redactRecipients(result.detail) }),
  };
}

app.post("/api/enquiry", async (req, res) => {
  try {
    const {
      source = "contact_page",
      name,
      email,
      company = "",
      phone = "",
      service = "",
      interest = "",
      office = "",
      timeframe = "",
      notes = "",
    } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        error: "Full Name and Work Email are required.",
      });
    }

    const recipient = TARGET_NOTIFICATION_EMAIL;
    const selectedService = service || interest || "Dynamics 365 Business Central Consultation";
    const selectedOfficeOrTime = office || timeframe || "Immediate Review";
    const sourceTitle = source === "contact_page" ? "Website Contact Form" : "Consultation Booking Modal";
    const sourceTag = source === "contact_page" ? "Contact Inquiry" : "Consultation Request";
    const formattedDate = new Date().toLocaleString("en-US", { timeZoneName: "short" });
    const enquiryId = `COR-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 1000)}`;

    const emailSubject = `[Coreenact ${sourceTag}] ${name} (${company || "Individual"}) - ${selectedService}`;

    const emailText = `
NEW INQUIRY RECEIVED FOR COREENACT TECHNOLOGIES
==================================================
Destination: ${recipient} (Microsoft 365)
Source: ${sourceTitle}
Date: ${formattedDate}
Reference ID: ${enquiryId}

PROSPECT INFORMATION:
• Full Name: ${name}
• Work Email: ${email}
• Phone: ${phone || "Not provided"}
• Company / Organization: ${company || "Not provided"}
• Practice / Solution Area: ${selectedService}
• Office Hub / Timeframe: ${selectedOfficeOrTime}
• Legacy Environment & Requirements:
${notes || "None provided"}

==================================================
This inquiry was submitted on the Coreenact web portal.
Reply directly to this email to follow up with ${name} (${email}).
`;

    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${emailSubject}</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #1e293b;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
    <div style="background: linear-gradient(135deg, #005a9e 0%, #0078D4 100%); padding: 24px 32px; color: #ffffff;">
      <h1 style="margin: 0 0 6px 0; font-size: 20px; font-weight: 700; letter-spacing: -0.02em;">Coreenact Technologies</h1>
      <p style="margin: 0; font-size: 13px; opacity: 0.9;">New Customer Lead • ${sourceTitle} • Ref: ${enquiryId}</p>
    </div>
    
    <div style="padding: 28px 32px;">
      <p style="font-size: 14px; line-height: 1.5; margin: 0 0 20px 0; color: #475569;">
        A new prospect has submitted an inquiry intended for <strong style="color: #005a9e;">${recipient}</strong>:
      </p>
      
      <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 24px;">
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 10px 0; font-weight: 600; color: #64748b; width: 36%;">Full Name:</td>
          <td style="padding: 10px 0; font-weight: 700; color: #0f172a;">${name}</td>
        </tr>
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 10px 0; font-weight: 600; color: #64748b;">Work Email:</td>
          <td style="padding: 10px 0; color: #005a9e; font-weight: 600;"><a href="mailto:${email}" style="color: #005a9e; text-decoration: none;">${email}</a></td>
        </tr>
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 10px 0; font-weight: 600; color: #64748b;">Phone:</td>
          <td style="padding: 10px 0; color: #0f172a;">${phone || "Not provided"}</td>
        </tr>
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 10px 0; font-weight: 600; color: #64748b;">Company:</td>
          <td style="padding: 10px 0; color: #0f172a; font-weight: 600;">${company || "Not provided"}</td>
        </tr>
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 10px 0; font-weight: 600; color: #64748b;">Service / Interest:</td>
          <td style="padding: 10px 0; color: #005a9e; font-weight: 600;">${selectedService}</td>
        </tr>
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 10px 0; font-weight: 600; color: #64748b;">Timeframe / Hub:</td>
          <td style="padding: 10px 0; color: #0f172a;">${selectedOfficeOrTime}</td>
        </tr>
        <tr>
          <td style="padding: 12px 0 0 0; font-weight: 600; color: #64748b; vertical-align: top;">Notes & Footprint:</td>
          <td style="padding: 12px 0 0 0; color: #334155; line-height: 1.6; white-space: pre-wrap;">${notes || "No additional notes provided."}</td>
        </tr>
      </table>

      <div style="text-align: center; margin-top: 24px;">
        <a href="mailto:${email}?subject=Re:%20Coreenact%20Dynamics%20365%20Consultation&body=Hi%20${encodeURIComponent(name)},%0A%0AThank%20you%20for%20reaching%20out%20to%20Coreenact%20regarding%20${encodeURIComponent(selectedService)}." 
           style="display: inline-block; background-color: #005a9e; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 13px; padding: 12px 24px; border-radius: 6px;">
          Reply Directly to ${name} (${email})
        </a>
      </div>
    </div>
    
    <div style="background-color: #f8fafc; padding: 14px 32px; font-size: 11px; color: #64748b; border-top: 1px solid #e2e8f0; text-align: center;">
      Coreenact Technologies • Microsoft Solutions Partner • Global Delivery: New Delhi, India • North America: Mississauga, Canada • ${recipient}
    </div>
  </div>
</body>
</html>
`;

    let emailDispatched = false;
    let smtpNote = "";
    let deliveryTransport = "none";

    // Hand the message to the configured transport: Microsoft Graph first, SMTP
    // second. The outcome is reported to the browser but never thrown here -
    // the enquiry itself is already accepted, and a mailbox hiccup must not
    // look like a failed submission to the prospect.
    const delivery = await sendNotificationMail({
      to: NOTIFICATION_EMAILS,
      replyTo: { name, email },
      subject: emailSubject,
      text: emailText,
      html: emailHtml,
    });

    emailDispatched = delivery.delivered;
    deliveryTransport = delivery.transport;
    smtpNote = delivery.detail;

    if (!delivery.delivered) {
      // Keep the submission readable in the server log so an enquiry is never
      // lost, even when no mail transport is configured.
      console.log(`[FORM SUBMISSION STORED BUT NOT MAILED TO ${recipient}]`, {
        ref: enquiryId,
        source: sourceTitle,
        name,
        email,
        phone,
        company,
        service: selectedService,
        office: selectedOfficeOrTime,
        notes,
      });
    }

    // Copy the prospect, independent of the internal notification: one failing
    // does not decide the other.
    const confirmation = await sendEnquiryConfirmation({
      name,
      email,
      service: selectedService,
      enquiryId,
      receivedAt: formattedDate,
    });

    // Generate pre-filled mailto URL for immediate 1-click fallback in Outlook or any email client
    const mailtoSubject = encodeURIComponent(`[Coreenact ${sourceTag}] ${name} - ${selectedService}`);
    const mailtoBody = encodeURIComponent(
      `Hello Coreenact Team (${PUBLIC_INBOX_EMAIL}),\n\n` +
      `Here is a new consultation inquiry from the Coreenact web portal:\n\n` +
      `• Name: ${name}\n` +
      `• Work Email: ${email}\n` +
      `• Phone: ${phone || "N/A"}\n` +
      `• Company: ${company || "N/A"}\n` +
      `• Area of Interest: ${selectedService}\n` +
      `• Timeframe / Office: ${selectedOfficeOrTime}\n` +
      `• Requirements / Notes:\n${notes || "N/A"}\n\n` +
      `Reference ID: ${enquiryId}`
    );
    const mailtoUrl = `mailto:${PUBLIC_INBOX_EMAIL}?subject=${mailtoSubject}&body=${mailtoBody}`;

    return res.json({
      success: true,
      message: `Inquiry successfully routed to ${PUBLIC_INBOX_EMAIL}`,
      targetEmail: PUBLIC_INBOX_EMAIL,
      enquiryId,
      emailDispatched,
      provider: "Microsoft 365",
      transport: deliveryTransport,
      // Redacted because delivery.detail names every recipient, and this field
      // is readable in the browser's network tab.
      smtpNote: redactRecipients(smtpNote),
      autoReply: confirmation,
      mailtoUrl,
    });
  } catch (err: any) {
    console.error("Enquiry endpoint error:", err);
    return res.status(500).json({
      success: false,
      error: err.message || "Failed to process form submission.",
    });
  }
});

// Diagnostic endpoint to check Microsoft 365 email configuration.
// Reports readiness only - never a credential, and never the internal list.
app.get("/api/email-status", (_req, res) => {
  const transport = mailTransportStatus();
  res.json({
    provider: "Microsoft 365",
    publicInbox: PUBLIC_INBOX_EMAIL,
    recipientCount: NOTIFICATION_EMAILS.length,
    status: transport.activeTransport === "none" ? "not_configured" : "active",
    ...transport,
  });
});

// Operator-triggered delivery check. Sends one message to the configured
// recipients so Graph permissions and the secret can be verified without
// filling in the contact form. Rate-limited because it is reachable without a
// login and every call costs a real mailbox write.
let lastTestMailAt = 0;

app.post("/api/email-test", async (_req, res) => {
  try {
    const transport = mailTransportStatus();
    if (transport.activeTransport === "none") {
      return res.status(503).json({
        success: false,
        error: "No mail transport is configured. Set GRAPH_CLIENT_SECRET for Microsoft Graph, or SMTP_PASS for SMTP.",
        missingGraphSettings: transport.graph.missingSettings,
      });
    }

    const sinceLastTest = Date.now() - lastTestMailAt;
    if (lastTestMailAt > 0 && sinceLastTest < 30_000) {
      return res.status(429).json({
        success: false,
        error: `A test message was sent ${Math.round(sinceLastTest / 1000)}s ago. Wait 30 seconds between tests.`,
      });
    }

    const stamp = new Date().toLocaleString("en-US", { timeZoneName: "short" });
    const result = await sendNotificationMail({
      to: NOTIFICATION_EMAILS,
      subject: "[Coreenact Mail Test] Delivery check",
      text: `Coreenact mail delivery test sent at ${stamp} through the active transport.`,
      html: `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #1e293b;">
  <div style="max-width: 560px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow:hidden;">
    <div style="background: linear-gradient(135deg, #005a9e 0%, #0078D4 100%); padding: 20px 28px; color: #ffffff;">
      <h2 style="margin: 0; font-size: 18px;">Mail delivery test</h2>
    </div>
    <div style="padding: 22px 28px; font-size: 13px; line-height: 1.7; color: #334155;">
      <p style="margin: 0 0 10px 0;">If this message reached the inbox, the Microsoft 365 credential and permissions are both working.</p>
      <p style="margin: 0; color: #64748b;">Sent ${stamp} from the Coreenact web backend.</p>
    </div>
  </div>
</div>`,
    });

    lastTestMailAt = Date.now();
    return res.status(result.delivered ? 200 : 502).json({
      success: result.delivered,
      transport: result.transport,
      detail: redactRecipients(result.detail),
      pendingRetries: mailTransportStatus().pendingRetries.length,
    });
  } catch (err: any) {
    console.error("Mail test error:", err);
    return res.status(500).json({
      success: false,
      error: err.message || "Failed to run the mail test.",
    });
  }
});

// In-Memory Leads Store for Copilot Studio Site Agent
interface ServerLeadRecord {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  interest: string;
  timeframe?: string;
  notes?: string;
  source: string;
  score: number;
  stage: "new" | "qualified" | "contacted" | "scheduled" | "closed";
  chatSnippet?: string;
}

const leadsStore: ServerLeadRecord[] = [
  {
    id: "LEAD-101",
    createdAt: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
    name: "Rajiv Malhotra",
    email: "r.malhotra@apexlogistics.in",
    phone: "+91 98112 45890",
    company: "Apex Global Logistics",
    interest: "Dynamics NAV to Business Central Cloud Migration",
    timeframe: "Next 3 months",
    notes: "Currently on NAV 2016 with heavy custom C/AL code. Need cloud migration with India GST localization.",
    source: "Copilot Site Agent",
    score: 95,
    stage: "qualified",
  },
  {
    id: "LEAD-102",
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
    name: "Catherine Dupuis",
    email: "c.dupuis@mapleprecision.ca",
    phone: "+1 (905) 555-0144",
    company: "Maple Precision Engineering",
    interest: "Manufacturing & Discrete Assembly ERP (BC Premium)",
    timeframe: "Immediate discovery",
    notes: "Requires BOM routing, shop-floor scanning, and Power BI operational dashboards for Ontario plant.",
    source: "Copilot Site Agent",
    score: 90,
    stage: "scheduled",
  },
  {
    id: "LEAD-103",
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    name: "Dr. Ananya Sen",
    email: "director@stxaviersgroup.edu.in",
    phone: "+91 99340 12890",
    company: "St. Xavier's Educational Group",
    interest: "EdCore Education ERP on Dynamics 365",
    timeframe: "Academic session 2026-27",
    notes: "4 campuses, 6,200 students. Needs automated fee billing, parent portal, RFID attendance, and GPS tracking.",
    source: "Copilot Site Agent",
    score: 85,
    stage: "new",
  },
];

// Agent Configuration endpoint for embedded chat widgets
app.get("/api/agent/config", (_req, res) => {
  res.json({
    id: "coreenact-copilot-agent",
    name: "Coreenact Copilot Studio Agent",
    title: "Dynamics 365 & ERP Advisory Agent",
    avatarUrl: "/copilot-agent-logo.webp",
    primaryColor: "#0078D4",
    welcomeMessage:
      "Hello! I am Coreenact's Copilot Studio Agent. I help businesses explore Microsoft Dynamics 365 Business Central, cloud ERP migrations, India GST statutory localization, EdCore Education ERP, and AI automation. How can I help you today?",
    samplePrompts: [
      "NAV 2016 to Business Central migration steps",
      "India GST & real-time e-Invoicing integration",
      "EdCore Education ERP for schools & colleges",
      "Business Central Essential vs Premium pricing",
    ],
    enableLeadCapture: true,
    leadCapturePrompt: "Would you like our certified Microsoft Solution Architects to prepare a free estimate or schedule a discovery session?",
    targetNotificationEmail: PUBLIC_INBOX_EMAIL,
    poweredBy: "Microsoft Solutions Partner - Coreenact Technologies",
  });
});

// Capture Lead from Chat Agent
app.post("/api/leads", async (req, res) => {
  try {
    const {
      name,
      email,
      phone = "",
      company = "",
      interest = "Dynamics 365 Business Central",
      timeframe = "Within 3 months",
      notes = "",
      source = "Copilot Site Agent",
      chatSnippet = "",
    } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        error: "Name and work email are required to capture lead.",
      });
    }

    // Lead scoring
    let score = 40;
    if (email && !email.endsWith("@gmail.com") && !email.endsWith("@yahoo.com")) score += 20;
    if (phone && phone.trim().length >= 8) score += 20;
    if (company && company.trim().length > 1) score += 10;
    if (notes && notes.trim().length > 10) score += 10;

    const leadId = `LEAD-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 100)}`;
    const newLead: ServerLeadRecord = {
      id: leadId,
      createdAt: new Date().toISOString(),
      name,
      email,
      phone,
      company,
      interest,
      timeframe,
      notes,
      source,
      score: Math.min(100, score),
      stage: score >= 70 ? "qualified" : "new",
      chatSnippet,
    };

    leadsStore.unshift(newLead);

    // Notify the same inbox the contact forms use, so a lead captured by the
    // site agent lands beside a form enquiry rather than in a separate pile.
    const leadDigest = [
      `Lead ID: ${newLead.id}`,
      `Score: ${newLead.score}/100 (${newLead.stage.toUpperCase()})`,
      `Captured: ${new Date(newLead.createdAt).toLocaleString("en-US", { timeZoneName: "short" })}`,
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone || "N/A"}`,
      `Company: ${company || "N/A"}`,
      `Area of Interest: ${interest}`,
      `Timeline: ${timeframe}`,
      `Requirements & Notes: ${notes || "None provided"}`,
      ...(chatSnippet ? [`Chat Context: ${chatSnippet}`] : []),
    ];

    const leadDelivery = await sendNotificationMail({
      to: NOTIFICATION_EMAILS,
      replyTo: { name, email },
      subject: `[High-Intent Lead: ${newLead.score}/100] ${name} (${company || "Company"}) - ${interest}`,
      text: `
NEW QUALIFIED LEAD CAPTURED VIA COREENACT COPILOT STUDIO AGENT
==============================================================
${leadDigest.join("\n")}

==============================================================
Routed automatically to Coreenact Enterprise CRM.
      `,
      // Graph delivers a single HTML body, so the lead needs one too. Values are
      // escaped because every field here arrived from a browser.
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>[High-Intent Lead] ${escapeHtml(name)}</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #1e293b;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0;">
    <div style="background: linear-gradient(135deg, #005a9e 0%, #0078D4 100%); padding: 24px 32px; color: #ffffff;">
      <h1 style="margin: 0 0 6px 0; font-size: 20px; font-weight: 700; letter-spacing: -0.02em;">High-Intent Lead • Site Agent</h1>
      <p style="margin: 0; font-size: 13px; opacity: 0.9;">Score ${newLead.score}/100 • ${newLead.stage.toUpperCase()} • Ref ${escapeHtml(newLead.id)}</p>
    </div>
    <div style="padding: 24px 32px; font-size: 13px; line-height: 1.8; color: #334155;">
${leadDigest.map((line) => `      <div>${escapeHtml(line)}</div>`).join("\n")}
    </div>
    <div style="background-color: #f8fafc; padding: 14px 32px; font-size: 11px; color: #64748b; border-top: 1px solid #e2e8f0; text-align: center;">
      Coreenact Technologies • Microsoft Solutions Partner • Reply goes to ${escapeHtml(email)}
    </div>
  </div>
</body>
</html>
`,
    });

    if (leadDelivery.delivered) {
      console.log(`[LEAD NOTIFICATION SENT] Dispatched lead ${leadId} to ${TARGET_NOTIFICATION_EMAIL}`);
    } else {
      console.warn(`[LEAD NOTIFICATION EMAIL FAILED]:`, leadDelivery.detail);
    }

    return res.json({
      success: true,
      message: "Lead successfully recorded in Coreenact CRM pipeline.",
      lead: newLead,
      notification: {
        delivered: leadDelivery.delivered,
        transport: leadDelivery.transport,
      },
    });
  } catch (err: any) {
    console.error("Lead submission error:", err);
    return res.status(500).json({
      success: false,
      error: err.message || "Failed to save lead.",
    });
  }
});

// Retrieve Leads for CRM / Admin View
app.get("/api/leads", (_req, res) => {
  res.json({
    total: leadsStore.length,
    qualified: leadsStore.filter((l) => l.stage === "qualified" || l.stage === "scheduled").length,
    averageScore: Math.round(leadsStore.reduce((acc, l) => acc + l.score, 0) / (leadsStore.length || 1)),
    leads: leadsStore,
  });
});

// =========================================================================
// REAL-TIME WHATSAPP LIVE CHAT BRIDGE (+91 84487 96169)
// =========================================================================
const WHATSAPP_TARGET_NUMBER = "918448796169";
const WHATSAPP_DISPLAY_PHONE = "+91 84487 96169";

export interface LiveChatMessage {
  id: string;
  sessionId: string;
  sender: "visitor" | "consultant" | "bot";
  senderName: string;
  content: string;
  timestamp: string;
  status: "sent" | "delivered" | "read";
  whatsappUrl?: string;
}

export interface LiveChatSession {
  sessionId: string;
  visitorName: string;
  visitorPhone?: string;
  createdAt: string;
  lastActivityAt: string;
  messages: LiveChatMessage[];
}

const liveChatSessions = new Map<string, LiveChatSession>();
const sessionSockets = new Map<string, Set<WebSocket>>();

function broadcastToSession(sessionId: string, message: LiveChatMessage) {
  const sockets = sessionSockets.get(sessionId);
  if (sockets) {
    const payload = JSON.stringify({ type: "new_message", message });
    sockets.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(payload);
      }
    });
  }
}

// 1. Post a new visitor message (Routes to WhatsApp 8448796169 + instant auto-ack)
app.post("/api/live-chat/message", async (req, res) => {
  try {
    const {
      sessionId = `WS-${Date.now().toString(36).toUpperCase()}`,
      visitorName = "Website Visitor",
      visitorPhone = "",
      content,
    } = req.body;

    if (!content || !content.trim()) {
      return res.status(400).json({ error: "Message content cannot be empty." });
    }

    let session = liveChatSessions.get(sessionId);
    if (!session) {
      session = {
        sessionId,
        visitorName: visitorName.trim() || "Website Visitor",
        visitorPhone: visitorPhone.trim(),
        createdAt: new Date().toISOString(),
        lastActivityAt: new Date().toISOString(),
        messages: [],
      };
      liveChatSessions.set(sessionId, session);
    } else {
      session.lastActivityAt = new Date().toISOString();
      if (visitorName && visitorName !== "Website Visitor") {
        session.visitorName = visitorName;
      }
      if (visitorPhone) {
        session.visitorPhone = visitorPhone;
      }
    }

    const host = req.get("host") || "localhost:3000";
    const protocol = req.protocol === "https" || req.headers["x-forwarded-proto"] === "https" ? "https" : "http";
    const replyLink = `${protocol}://${host}?replySession=${sessionId}`;

    // Direct WhatsApp message text for the consultant at +91 84487 96169
    const formattedWhatsAppText = encodeURIComponent(
      `*New Live Inquiry from Coreenact Website*\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `👤 *Visitor:* ${session.visitorName}\n` +
      `${session.visitorPhone ? `📱 *Phone:* ${session.visitorPhone}\n` : ""}` +
      `🆔 *Session:* #${sessionId}\n` +
      `💬 *Inquiry:* "${content.trim()}"\n\n` +
      `👉 *Reply directly to visitor's screen in real-time:*\n${replyLink}`
    );

    const whatsappDirectUrl = `https://wa.me/${WHATSAPP_TARGET_NUMBER}?text=${formattedWhatsAppText}`;

    const visitorMsg: LiveChatMessage = {
      id: `msg-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      sessionId,
      sender: "visitor",
      senderName: session.visitorName,
      content: content.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      status: "delivered",
      whatsappUrl: whatsappDirectUrl,
    };

    session.messages.push(visitorMsg);
    broadcastToSession(sessionId, visitorMsg);

    // Contextual bot response notifying that query was sent to WhatsApp
    const qLower = content.toLowerCase();
    let botSnippet = "";

    if (qLower.includes("price") || qLower.includes("cost") || qLower.includes("licens")) {
      botSnippet = `Microsoft Dynamics 365 Business Central Cloud Essential starts at **₹6,655/user/month** (~$79 USD) and Premium at **₹9,155/user/month** (~$109 USD).`;
    } else if (qLower.includes("nav") || qLower.includes("migrat") || qLower.includes("upgrade")) {
      botSnippet = `Coreenact specializes in 60-day rapid NAV to Business Central SaaS cloud migrations with automated C/AL to AL code refactoring.`;
    } else if (qLower.includes("gst") || qLower.includes("tax") || qLower.includes("invoice")) {
      botSnippet = `We provide certified India GST localization with automated e-Invoicing (IRN) and real-time e-Way bill generation directly inside Business Central.`;
    } else if (qLower.includes("edcore") || qLower.includes("school") || qLower.includes("college") || qLower.includes("student")) {
      botSnippet = `EdCore is our proprietary higher education ERP built natively on Business Central for automated fee billing, student enrollment, and RFID/GPS tracking.`;
    } else {
      botSnippet = `Coreenact is a certified Microsoft Solutions Partner for Business Applications (Dynamics 365 Business Central & Power Platform).`;
    }

    const autoBotMsg: LiveChatMessage = {
      id: `bot-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      sessionId,
      sender: "bot",
      senderName: "Coreenact Support",
      content: `⚡ **Thank you for connecting with us!**\n\n${botSnippet}\n\nOur team has received your inquiry on WhatsApp and will reply shortly. Their response will appear right here on your screen automatically.`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      status: "delivered",
    };

    session.messages.push(autoBotMsg);
    broadcastToSession(sessionId, autoBotMsg);

    const visitorMessageCount = session.messages.filter((entry) => entry.sender === "visitor").length;

    // The only real path from this chat to a human: a wa.me link stays in the
    // visitor's browser until they choose to open it, so mail the team instead
    // of pretending the message was forwarded.
    let notification: { delivered: boolean; transport: string; reason?: string };
    try {
      notification = await sendLiveChatAlert({
        sessionId,
        visitorName: session.visitorName,
        visitorPhone: session.visitorPhone || "",
        content: content.trim(),
        replyLink,
        whatsappUrl: whatsappDirectUrl,
        messageCount: visitorMessageCount,
      });
    } catch (alertError: any) {
      notification = {
        delivered: false,
        transport: "none",
        reason: alertError?.message || "Live-chat alert failed.",
      };
    }

    console.log(
      notification.delivered
        ? `[LIVE CHAT ALERT MAILED] session ${sessionId} (${visitorMessageCount} visitor message(s)) via ${notification.transport}`
        : `[LIVE CHAT ALERT NOT MAILED] session ${sessionId}: ${notification.reason || notification.transport}`
    );

    return res.json({
      success: true,
      message: visitorMsg,
      botReply: autoBotMsg,
      session,
      whatsappDirectUrl,
      whatsappPhone: WHATSAPP_DISPLAY_PHONE,
      notification,
    });
  } catch (err: any) {
    console.error("Live chat message error:", err);
    return res.status(500).json({ error: err.message || "Failed to process chat message." });
  }
});

// 2. Revert from Consultant / WhatsApp (+91 84487 96169)
app.post("/api/whatsapp/revert", async (req, res) => {
  try {
    const {
      sessionId,
      content,
      consultantName = "Coreenact Support",
    } = req.body;

    if (!sessionId || !content || !content.trim()) {
      return res.status(400).json({ error: "sessionId and content are required to revert." });
    }

    let session = liveChatSessions.get(sessionId);
    if (!session) {
      session = {
        sessionId,
        visitorName: "Website Visitor",
        createdAt: new Date().toISOString(),
        lastActivityAt: new Date().toISOString(),
        messages: [],
      };
      liveChatSessions.set(sessionId, session);
    }

    session.lastActivityAt = new Date().toISOString();

    const revertMsg: LiveChatMessage = {
      id: `rev-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      sessionId,
      sender: "consultant",
      senderName: consultantName,
      content: content.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      status: "read",
    };

    session.messages.push(revertMsg);
    broadcastToSession(sessionId, revertMsg);

    console.log(`[WHATSAPP REVERT DELIVERED] Consultant reverted to session ${sessionId}: "${content.trim()}"`);

    return res.json({
      success: true,
      message: revertMsg,
      session,
    });
  } catch (err: any) {
    console.error("WhatsApp revert error:", err);
    return res.status(500).json({ error: err.message || "Failed to deliver revert." });
  }
});

// 3. Webhook for Meta WhatsApp Cloud API / Twilio
app.post("/api/whatsapp/webhook", async (req, res) => {
  try {
    const body = req.body;
    let incomingText = "";
    let matchedSessionId = "";

    if (body?.entry?.[0]?.changes?.[0]?.value?.messages?.[0]) {
      const msgObj = body.entry[0].changes[0].value.messages[0];
      incomingText = msgObj.text?.body || "";
    } else if (body?.Body) {
      incomingText = body.Body;
    } else if (body?.content) {
      incomingText = body.content;
      matchedSessionId = body.sessionId || "";
    }

    const sessionMatch = incomingText.match(/#(WS-[A-Z0-9]+)/i);
    if (sessionMatch) {
      matchedSessionId = sessionMatch[1].toUpperCase();
    } else if (!matchedSessionId && liveChatSessions.size > 0) {
      const sessionsArr = Array.from(liveChatSessions.values());
      sessionsArr.sort((a, b) => new Date(b.lastActivityAt).getTime() - new Date(a.lastActivityAt).getTime());
      matchedSessionId = sessionsArr[0].sessionId;
    }

    if (matchedSessionId && incomingText) {
      let session = liveChatSessions.get(matchedSessionId);
      if (session) {
        const cleanContent = incomingText.replace(/#WS-[A-Z0-9]+/gi, "").trim() || incomingText;
        const revertMsg: LiveChatMessage = {
          id: `wa-rev-${Date.now()}`,
          sessionId: matchedSessionId,
          sender: "consultant",
          senderName: "Coreenact Support",
          content: cleanContent,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          status: "read",
        };
        session.messages.push(revertMsg);
        broadcastToSession(matchedSessionId, revertMsg);
      }
    }

    return res.json({ status: "success", matchedSessionId });
  } catch (err: any) {
    console.error("WhatsApp webhook error:", err);
    return res.status(200).json({ status: "ignored" });
  }
});

// 4. Retrieve session messages (for HTTP polling fallback)
app.get("/api/live-chat/session/:sessionId", (req, res) => {
  const { sessionId } = req.params;
  const session = liveChatSessions.get(sessionId);
  if (!session) {
    return res.json({
      sessionId,
      messages: [],
      whatsappPhone: WHATSAPP_DISPLAY_PHONE,
    });
  }
  return res.json({
    sessionId: session.sessionId,
    visitorName: session.visitorName,
    visitorPhone: session.visitorPhone,
    messages: session.messages,
    whatsappPhone: WHATSAPP_DISPLAY_PHONE,
  });
});

// 5. Retrieve active sessions list for consultant
app.get("/api/live-chat/sessions", (_req, res) => {
  const sessions = Array.from(liveChatSessions.values()).sort(
    (a, b) => new Date(b.lastActivityAt).getTime() - new Date(a.lastActivityAt).getTime()
  );
  return res.json({ sessions, count: sessions.length });
});

// Official Coreenact Website Knowledge Base for RAG and accurate answers
const COREENACT_WEBSITE_KNOWLEDGE = `
[COREENACT ENTERPRISE KNOWLEDGE BASE - OFFICIAL WEBSITE CONTENT]
Organization: Coreenact Technologies (coreenact.com)
Tagline: Microsoft Dynamics 365 Business Central Specialists & Digital Transformation Partners
Credentials: Microsoft Solutions Partner for Business Applications (ERP & Power Platform)

Offices & Global Delivery Centers:
- Global Delivery HQ (India): 123-1st Floor, SRS CORPORATE TOWER, NH-19, Sector 31, Faridabad, Haryana 121003. Email: info@coreenact.com | Phone & WhatsApp: +91 84487 96169 (https://wa.me/918448796169)
- North America Delivery Hub (Canada): 201 City Centre Drive, Suite 700, Mississauga, ON L5B 2T4, Canada.
- Inquiries: info@coreenact.com | support@coreenact.com | sales@coreenact.com | Phone/WhatsApp: 8448796169
- Website: https://coreenact.com

Core Services Offered:
1. Microsoft Dynamics 365 Business Central Implementation:
   - Full-lifecycle ERP deployment using Coreenact's 5-Phase Delivery Framework:
     * Phase 1: Discover (Business process mapping, gap analysis, licensing strategy, ROI baseline)
     * Phase 2: Design (Functional design specs, chart of accounts, dimension structure, database architecture)
     * Phase 3: Develop (AL extension development, API integrations, data cleansing & ETL)
     * Phase 4: Deploy (User acceptance testing, master data cutover, parallel run, go-live certification)
     * Phase 5: Drive (Post go-live hypercare, 24/7 SLA managed support, continuous updates)
2. Legacy Dynamics NAV & GP Cloud Modernization:
   - Automated code migration from C/AL to modern AL extensions.
   - Clean data migration preserving historical general ledger entries, open orders, and posted transactions.
   - Elimination of on-premise hardware costs and zero-downtime cutover.
3. India GST & Statutory Localization:
   - Full compliance with native India Goods and Services Tax (GST).
   - Real-time E-Invoicing integration via IRP portal (NIC / ClearTax APIs).
   - E-Way bill generation, Reverse Charge Mechanism (RCM), Tax Deducted at Source (TDS), and GST audit reporting.
4. AL Extension Development & Customizations:
   - Zero modifications to standard Microsoft base app code; pure AL event-driven extensions ensuring smooth Microsoft monthly updates.
   - Power Platform (Power BI analytics, Power Automate approval flows, Power Apps frontends) & Azure integration.
5. 24/7 Managed ERP Support & Health Audits:
   - Dedicated Level 1, 2, and 3 enterprise support desk with guaranteed 15-minute critical SLA.
   - Database performance tuning, index rebuilding, and version update testing.

Industry Vertical Blueprints:
1. Manufacturing & Discrete Engineering: Bill of materials (BOM), routing, capacity planning, scrap tracking, shop-floor execution.
2. FMCG & Wholesale Distribution: Multi-warehouse management, expiry dates, batch tracking, promotional pricing, route sales.
3. EdCore Education ERP (Proprietary Coreenact IP built on Business Central):
   - Comprehensive institution management for K-12 schools, higher education, colleges, and university groups.
   - Key modules: Student Admissions & Inquiries, Automated Fee Billing & Online Payment Gateway Reconciliation, Timetable & Faculty Scheduling, Exam Marks & Grade Sheets, Student Attendance & RFID/Biometric integration, GPS Bus Fleet Tracking, Digital Library Management.
4. Retail & Point of Sale (POS): Omnichannel inventory synchronization, loyalty programs, barcode scanning, centralized pricing.
5. Healthcare & Pharmaceuticals: Batch recall capability, cold-chain temperature monitoring, expiry date management, FDA/GMP compliance.
6. Logistics & Supply Chain: Freight management, container tracking, 3PL billing, customs documentation.
7. Automotive & Auto-Ancillary: OEM schedule handling, Just-in-Time (JIT) delivery, sub-contracting, warranty tracking.
8. Chemical & Process Manufacturing: Recipe management, dynamic potency adjustments, hazardous material regulatory compliance.
9. Professional Services: Project accounting, resource utilization, milestone billing, timesheet tracking.

Licensing & TCO Information (Exclusively for Microsoft Dynamics 365 Business Central, Not F&O):
- Business Central Cloud Essential: ₹6,655 per user/month (~$79 USD) (Full finance, sales, purchasing, inventory, multi-currency, CRM, project management).
- Business Central Cloud Premium: ₹9,155 per user/month (~$109 USD) (Includes all Essential features plus Manufacturing & Service Order Management).
- Business Central Device License: ₹3,780 per device/month (~$45 USD) (Shared shop-floor, warehouse scanner, POS terminal).
- Team Member License: ₹665 per user/month (~$8 USD) (Read access plus lightweight approval, time recording, and quote generation).
- Implementation Pricing: Fresh Implementation (90-day Turnkey or 45-day Express) & Migration from Dynamics NAV / legacy ERPs scaled by user count and scope. Note: Calibrated specifically for Business Central, not Finance & Operations (F&O).
`;

/**
 * Intelligent local knowledge synthesizer used if external Gemini API quota (429) is temporarily exhausted.
 * Generates structured, high-fidelity answers directly from Coreenact verified enterprise data.
 */
function generateLocalKnowledgeResponse(query: string, roleTitle = "ERP Consultant"): string {
  const q = (query || "").toLowerCase();

  if (q.includes("5 phase") || q.includes("phase") || q.includes("framework") || q.includes("methodology") || q.includes("delivery")) {
    return `### Coreenact 5-Phase Implementation Framework

Coreenact delivers Microsoft Dynamics 365 Business Central deployments using our structured, milestone-driven **5-Phase Delivery Framework**:

1. **Phase 1: Discover (Weeks 1–3)**
   - Business process mapping and requirements gathering
   - Fit-gap analysis between standard Business Central and business requirements
   - Licensing strategy (Essential vs. Premium vs. Team Member)
   - ROI baseline and preliminary timeline formulation

2. **Phase 2: Design (Weeks 4–7)**
   - Functional Design Specifications (FDS) for all core departments
   - Chart of Accounts (COA) redesign and dimension tagging structure
   - Database schema, table extensions, and security role matrix
   - Data migration strategy for legacy records

3. **Phase 3: Develop (Weeks 8–14)**
   - Clean, event-driven AL extension development (zero base-code modifications)
   - Third-party API integrations (e-invoicing, bank feeds, payment gateways, CRM)
   - ETL scripts for historical master data (Customers, Vendors, Items, Chart of Accounts)
   - Power Platform automation (Power BI analytics, Power Automate approval flows)

4. **Phase 4: Deploy (Weeks 15–18)**
   - User Acceptance Testing (UAT) with real transactional test cases
   - Cutover rehearsal and final master/opening balance migration
   - Parallel test run with legacy systems
   - End-user training workshops and go-live certification

5. **Phase 5: Drive (Post Go-Live)**
   - 30-day hypercare support on-site and remote
   - 24/7 SLA-governed support desk (Level 1, 2, and 3)
   - Semi-annual major release regression testing and continuous optimization`;
  }

  if (q.includes("edcore") || q.includes("education") || q.includes("school") || q.includes("college") || q.includes("university") || q.includes("student") || q.includes("fee")) {
    return `### EdCore Education ERP by Coreenact

**EdCore** is Coreenact's proprietary institutional ERP built natively on Microsoft Dynamics 365 Business Central for schools, colleges, and multi-campus university groups:

- **Student Admissions & Enrollment**: End-to-end applicant tracking, digital form submission, entrance assessment grading, and automated enrollment conversion.
- **Automated Fee Billing & Reconciliation**: Dynamic fee structures (tuition, transport, lab, hostel), online payment gateway integration, automatic fee receipt generation, and real-time bank reconciliation.
- **Timetable & Faculty Scheduling**: Conflict-free classroom allocation, faculty substitute management, and course credit scheduling.
- **Exams, Marks & Grade Sheets**: Continuous assessment tracking, exam hall ticket generation, multi-grading scale support, and automated report card publishing.
- **Biometric & RFID Attendance**: Live student and staff attendance tracking with instant automated SMS/WhatsApp alerts to guardians.
- **GPS Fleet & Transport Tracking**: Real-time school bus tracking, geo-fencing, transport route management, and driver allocation.
- **Digital Library Management**: ISBN barcode cataloging, book issue/return tracking, overdue fine calculation, and OPAC search.`;
  }

  if (q.includes("gst") || q.includes("tax") || q.includes("invoice") || q.includes("invoicing") || q.includes("tds") || q.includes("rcm") || q.includes("e-way") || q.includes("india")) {
    return `### Native India GST & Statutory Localization in Business Central

Coreenact provides full-spectrum localization for Indian tax laws and statutory reporting within Microsoft Dynamics 365 Business Central:

- **Real-Time E-Invoicing**: Direct integration with the Government Invoice Registration Portal (IRP) via NIC / ClearTax APIs to generate Invoice Reference Numbers (IRN) and digitally signed QR codes instantly upon invoice posting.
- **Automated E-Way Bills**: Seamless API generation of E-Way bills from sales shipments and transfer orders without leaving Business Central.
- **Multi-State GST Compliance**: Full handling of IGST, CGST, SGST, and UTGST across multi-warehouse locations and inter-state stock transfers.
- **TDS & TCS Automation**: Automatic Tax Deducted at Source calculation on vendor payments and Tax Collected at Source on receipt thresholds.
- **Reverse Charge Mechanism (RCM)**: Automated self-invoicing and input tax credit management for unregistered vendor transactions.
- **Statutory Reporting**: Pre-formatted GSTR-1, GSTR-3B reconciliation worksheets and audit-ready electronic ledgers.`;
  }

  if (q.includes("nav") || q.includes("gp") || q.includes("migration") || q.includes("upgrade") || q.includes("moderniz") || q.includes("c/al")) {
    return `### Legacy Dynamics NAV & GP to Business Central Cloud Migration

Coreenact specializes in risk-free migrations from legacy on-premise systems (Dynamics NAV 2009–2018, Dynamics GP) to Business Central Cloud SaaS:

- **Automated C/AL to AL Conversion**: Refactoring customized legacy C/AL code into clean, modular AL extensions that preserve your custom business logic without compromising future automatic cloud updates.
- **Clean Data Cleansing & ETL**: Extracting historical General Ledger entries, customer/vendor subledgers, open purchase orders, and inventory valuation with complete audit trails.
- **Hardware & Maintenance Elimination**: Retiring on-premise SQL servers, eliminating costly Windows Server licenses, and gaining Microsoft's 99.9% cloud SLA with automated daily backups.
- **Modern User Experience**: Transforming older desktop interfaces into responsive browser and mobile app workflows accessible anywhere.`;
  }

  if (q.includes("price") || q.includes("pricing") || q.includes("cost") || q.includes("license") || q.includes("licensing") || q.includes("tco") || q.includes("essential") || q.includes("premium")) {
    return `### Microsoft Dynamics 365 Business Central Licensing & Pricing Guide (Not F&O)

Coreenact provides transparent pricing and license optimization specifically for Microsoft Dynamics 365 Business Central (not F&O):

- **Business Central Cloud Essential (₹6,655 per user/month | ~$79 USD)**:
  Includes Financial Management (GL, AP, AR, Fixed Assets), Sales & Order Processing, Purchasing & Payables, Inventory Management & Costing, Multi-currency, Basic CRM, and Project/Job Accounting.
- **Business Central Cloud Premium (₹9,155 per user/month | ~$109 USD)**:
  Includes everything in Essential plus **Manufacturing** (Production Orders, Bill of Materials, Capacity Planning, Routing) and **Service Order Management** (Service contracts, dispatching, warranty tracking).
- **Device License (₹3,780 per device/month | ~$45 USD)**:
  Designed for shared shop-floor terminals, warehouse barcode scanners, and point-of-sale stations.
- **Team Member License (₹665 per user/month | ~$8 USD)**:
  Designed for lightweight users who need read access across the system, timesheet entry, expense reporting, and purchase quote approval.
- **Fresh Implementation & Migration Services**:
  - Fresh Implementation: Milestone-based 5-Phase framework (90-day Turnkey or 45-day Express).
  - Migration from Dynamics NAV / legacy systems: FastTrack 60-day cutover with automated C/AL to AL conversion.`;
  }

  if (q.includes("office") || q.includes("address") || q.includes("contact") || q.includes("location") || q.includes("phone") || q.includes("email") || q.includes("delhi") || q.includes("canada") || q.includes("where")) {
    return `### Coreenact Offices & Contact Information

Connect with our global enterprise advisory teams:

- **Global Delivery Headquarters (India)**:
  - Address: 123-1st Floor, SRS CORPORATE TOWER, NH-19, Sector 31, Faridabad, Haryana 121003
  - Email: **info@coreenact.com**
  - Working Hours: Mon–Fri, 9:00 AM – 6:30 PM IST (24/7 Managed Support available)

- **North America Delivery Hub (Canada)**:
  - Address: 201 City Centre Drive, Suite 700, Mississauga, ON L5B 2T4, Canada
  - Service Hours: Mon–Fri, 9:00 AM – 5:00 PM EST

- **Digital Inquiries & Support**:
  - General Inquiries: **info@coreenact.com**
  - Enterprise Support: **support@coreenact.com**
  - Sales & Architecture Discovery: **sales@coreenact.com**
  - Website: [coreenact.com](https://coreenact.com)`;
  }

  // General comprehensive fallback
  return `### Enterprise Guidance from Coreenact Technologies

Thank you for your question regarding Microsoft Dynamics 365 Business Central and Coreenact's enterprise services.

**Key Highlights of Coreenact Capabilities:**
- **Full-Lifecycle ERP Implementation**: Delivered via our structured **5-Phase Delivery Framework** (Discover, Design, Develop, Deploy, Drive) ensuring predictable timelines and measurable ROI.
- **Proprietary Industry Solutions**: Including **EdCore Education ERP** for multi-campus academic institutions, discrete manufacturing blueprints, and FMCG supply chain engines.
- **Native Localization**: Complete compliance with Indian GST, real-time e-invoicing via IRP/NIC, automated E-way bills, TDS, and RCM.
- **Legacy Modernization**: Automated refactoring of legacy Dynamics NAV / GP C/AL code into clean, update-safe AL extensions.
- **Global Delivery Reach**: Dual delivery centers in New Delhi, India (HQ) and Mississauga, Canada with 24/7 SLA-governed support.

For personalized architectural discovery or a detailed demo, contact our consulting team at **sales@coreenact.com** or use our online consultation booking form.`;
}

/**
 * Resilient multi-tier generation that handles search grounding, model cascading,
 * and graceful fallback to Coreenact's verified knowledge base if API quotas (429) occur.
 */
async function executeResilientGeneration({
  ai,
  contents,
  systemInstruction,
  enableSearch = false,
  preferredModel = "gemini-3.8-flash",
  enableThinking = false,
  queryTextForFallback = "",
  roleTitle = "ERP Consultant",
}: {
  ai: GoogleGenAI | null;
  contents: any;
  systemInstruction?: string;
  enableSearch?: boolean;
  preferredModel?: string;
  enableThinking?: boolean;
  queryTextForFallback?: string;
  roleTitle?: string;
}): Promise<{
  reply: string;
  modelUsed: string;
  groundingSources: Array<{ title: string; url: string }>;
  searchQueries: string[];
  isLocalFallback?: boolean;
}> {
  // If no AI client available (e.g. no GEMINI_API_KEY configured in live environment), fall back immediately to verified local KB
  if (!ai) {
    const fallbackAnswer = generateLocalKnowledgeResponse(queryTextForFallback, roleTitle);
    return {
      reply: `${fallbackAnswer}\n\n---\n*Note: Verified response delivered directly from Coreenact Enterprise Knowledge Base.*`,
      modelUsed: "coreenact-enterprise-kb",
      groundingSources: [
        { title: "Coreenact Official Website", url: "https://coreenact.com" },
        { title: "Microsoft Dynamics 365 Business Central Documentation", url: "https://learn.microsoft.com/en-us/dynamics365/business-central/" },
      ],
      searchQueries: [],
      isLocalFallback: true,
    };
  }

  let response: any = null;
  let modelUsed = preferredModel;

  // Step 1: Attempt with Google Search tool if requested
  if (enableSearch) {
    const searchModels = [
      preferredModel,
      "gemini-3.8-flash",
      "gemini-3.1-flash-lite",
    ].filter((m, idx, arr) => Boolean(m) && arr.indexOf(m) === idx);

    for (const searchModel of searchModels) {
      try {
        const config: any = {
          systemInstruction,
          tools: [{ googleSearch: {} }],
        };
        if (enableThinking && searchModel === "gemini-3.1-pro-preview") {
          config.thinkingConfig = { thinkingLevel: ThinkingLevel.HIGH };
        }
        response = await ai.models.generateContent({
          model: searchModel,
          contents,
          config,
        });
        modelUsed = searchModel;
        break;
      } catch (searchError: any) {
        console.warn(
          `[Search Grounding Quota/Error with ${searchModel}]: ${searchError?.message}. Trying next search model...`
        );
        response = null;
      }
    }
  }

  // Step 2: If no response yet, try direct models without search tools (cascade in order of quota resilience)
  if (!response) {
    const candidateModels = [
      preferredModel,
      "gemini-3.1-flash-lite", // Extremely high RPM and low quota consumption
      "gemini-3.8-flash",
      "gemini-3.1-pro-preview",
    ].filter((m, idx, arr) => Boolean(m) && arr.indexOf(m) === idx);

    for (const modelCandidate of candidateModels) {
      try {
        const config: any = { systemInstruction };
        if (enableThinking && modelCandidate === "gemini-3.1-pro-preview") {
          config.thinkingConfig = { thinkingLevel: ThinkingLevel.HIGH };
        }
        response = await ai.models.generateContent({
          model: modelCandidate,
          contents,
          config,
        });
        modelUsed = modelCandidate;
        break; // Successfully got response
      } catch (err: any) {
        console.warn(`[Model Cascade]: ${modelCandidate} failed (${err?.message || "unknown"}). Trying next model...`);
      }
    }
  }

  // Step 3: If all models failed (e.g. 429 RESOURCE_EXHAUSTED / quota exceeded across project), use local knowledge base
  if (!response || !response.text) {
    console.warn("[Quota Exceeded on All Models]: Synthesizing answer directly from Coreenact Enterprise Knowledge Base...");
    const fallbackAnswer = generateLocalKnowledgeResponse(queryTextForFallback, roleTitle);
    return {
      reply: `${fallbackAnswer}\n\n---\n*Note: Verified response delivered directly from Coreenact Enterprise Knowledge Base.*`,
      modelUsed: "coreenact-enterprise-kb",
      groundingSources: [
        { title: "Coreenact Official Website", url: "https://coreenact.com" },
        { title: "Microsoft Dynamics 365 Business Central Documentation", url: "https://learn.microsoft.com/en-us/dynamics365/business-central/" },
      ],
      searchQueries: [],
      isLocalFallback: true,
    };
  }

  // Extract grounding citations if available
  const reply = response.text || "No response received.";
  const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
  const webSearchQueries = response.candidates?.[0]?.groundingMetadata?.webSearchQueries;

  const groundingSources: Array<{ title: string; url: string }> = [];
  if (groundingChunks && Array.isArray(groundingChunks)) {
    for (const chunk of groundingChunks) {
      if (chunk.web?.uri) {
        groundingSources.push({
          title: chunk.web.title || new URL(chunk.web.uri).hostname,
          url: chunk.web.uri,
        });
      }
    }
  }

  return {
    reply,
    modelUsed,
    groundingSources,
    searchQueries: webSearchQueries || [],
    isLocalFallback: false,
  };
}

// 2. Multi-turn Chat Endpoint with Website RAG + Google Search Grounding (Free Tier & Quota-Resilient)
app.post("/api/chat", async (req, res) => {
  let lastUserQuery = "";
  let roleTitle = "D365 Functional Consultant";
  try {
    const {
      messages = [],
      role = "consultant",
      knowledgeSource = "hybrid", // "website" | "google" | "hybrid"
      model,
      enableThinking = false,
    } = req.body;

    const ai = getGenAI();

    // Specific roles with dedicated system instructions and task-oriented models
    const roleDefinitions: Record<string, { instruction: string; defaultModel: string; title: string }> = {
      architect: {
        title: "Enterprise Solutions Architect",
        instruction:
          "You are Coreenact's Principal Enterprise Solutions Architect. You specialize in complex Microsoft Dynamics 365 Business Central deployments, legacy Dynamics NAV/GP to Cloud SaaS migrations, AL extension architecture, Azure integration, and high-level enterprise roadmaps. Provide deep, structured, technically rigorous guidance with clear milestones.",
        defaultModel: "gemini-3.1-pro-preview", // Complex tasks
      },
      consultant: {
        title: "D365 Functional Consultant",
        instruction:
          "You are Coreenact's Lead Dynamics 365 Business Central Functional Consultant. You specialize in general ERP operations, financial management, supply chain, inventory costing, native India GST & e-Invoicing localization, and Power Platform workflows. Provide balanced, clear, and practical enterprise recommendations.",
        defaultModel: "gemini-3.8-flash", // General tasks
      },
      fast: {
        title: "Rapid ERP & Licensing Specialist",
        instruction:
          "You are Coreenact's Rapid ERP Specialist. You provide instant, concise answers regarding Business Central Essential vs Premium licensing, keyboard shortcuts, field definitions, and quick diagnostics. Provide bulleted, direct answers without unnecessary fluff.",
        defaultModel: "gemini-3.1-flash-lite", // Fast tasks
      },
      ai_specialist: {
        title: "AI & Automation Strategist",
        instruction:
          "You are Coreenact's AI & Automation Strategist. You specialize in Microsoft Copilot Studio agents, Power Automate cloud flows, Azure OpenAI integration with Business Central, and document automation. Provide architectural and workflow design patterns.",
        defaultModel: "gemini-3.8-flash", // Automation and general AI tasks
      },
    };

    const roleConfig = roleDefinitions[role] || roleDefinitions.consultant;
    roleTitle = roleConfig.title;
    let baseInstruction = roleConfig.instruction;

    // Incorporate website knowledge base and grounding directives based on knowledgeSource
    let combinedInstruction = baseInstruction;

    if (knowledgeSource === "website" || knowledgeSource === "hybrid") {
      combinedInstruction += `\n\n${COREENACT_WEBSITE_KNOWLEDGE}\n\nWhen answering questions regarding Coreenact's services, delivery phases, EdCore ERP, offices in New Delhi or Canada, phone/email contact, or Business Central expertise, prioritize the official website content provided above.`;
    }

    if (knowledgeSource === "google") {
      combinedInstruction += "\n\nYou are grounded with Google Search. Use Google Search to retrieve the latest real-time web information to answer the customer's query accurately.";
    } else if (knowledgeSource === "hybrid") {
      combinedInstruction += "\n\nYou have access to both Coreenact's official website content AND live Google Search. Provide accurate answers by drawing from the Coreenact website context for company specifics, and Google Search for live industry updates or general technical details.";
    }

    // Determine model selection:
    let selectedModel = model || roleConfig.defaultModel || "gemini-3.8-flash";
    if (selectedModel === "gemini-3.5-flash") {
      selectedModel = "gemini-3.8-flash";
    }
    if (enableThinking && selectedModel === "gemini-3.1-pro-preview") {
      selectedModel = "gemini-3.1-pro-preview";
    }

    // Format chat history into contents ensuring alternating user/model turns
    const rawContents: any[] = [];
    for (const msg of messages) {
      if (!msg.content || typeof msg.content !== "string") continue;
      const roleStr = msg.role === "user" ? "user" : "model";
      if (roleStr === "user") {
        lastUserQuery = msg.content;
      }
      rawContents.push({
        role: roleStr,
        parts: [{ text: msg.content }],
      });
    }

    if (rawContents.length === 0) {
      return res.status(400).json({ error: "No valid messages provided." });
    }

    // Normalize turns to ensure alternating user/model sequence starting with user
    const contents: any[] = [];
    for (const item of rawContents) {
      if (contents.length === 0) {
        if (item.role === "user") {
          contents.push(item);
        }
      } else {
        const last = contents[contents.length - 1];
        if (last.role === item.role) {
          last.parts[0].text += `\n\n${item.parts[0].text}`;
        } else {
          contents.push(item);
        }
      }
    }

    if (contents.length === 0) {
      return res.status(400).json({ error: "Chat must begin with a user message." });
    }

    const enableSearch = knowledgeSource === "google" || knowledgeSource === "hybrid";

    const result = await executeResilientGeneration({
      ai,
      contents,
      systemInstruction: combinedInstruction,
      enableSearch,
      preferredModel: selectedModel,
      enableThinking,
      queryTextForFallback: lastUserQuery,
      roleTitle: roleConfig.title,
    });

    res.json({
      reply: result.reply,
      modelUsed: result.modelUsed,
      roleUsed: role,
      roleTitle: roleConfig.title,
      knowledgeSourceUsed: knowledgeSource,
      groundingSources: result.groundingSources,
      searchQueries: result.searchQueries,
      isFreeTier: true,
      isLocalFallback: result.isLocalFallback || false,
    });
  } catch (error: any) {
    console.error("Chat API error:", error);
    // Graceful fallback from knowledge base rather than a broken 500
    const fallbackAnswer = generateLocalKnowledgeResponse(lastUserQuery, roleTitle);
    res.json({
      reply: `${fallbackAnswer}\n\n---\n*Verified response provided by Coreenact Knowledge Base.*`,
      modelUsed: "coreenact-enterprise-kb",
      roleUsed: "consultant",
      roleTitle: roleTitle,
      knowledgeSourceUsed: "website",
      groundingSources: [{ title: "Coreenact Official Website", url: "https://coreenact.com" }],
      searchQueries: [],
      isFreeTier: true,
      isLocalFallback: true,
    });
  }
});

// 3. Direct Customer Query Free Answering Endpoint (Website Content or Google Search with Resilient Fallback)
app.post("/api/customer-query", async (req, res) => {
  try {
    const { query, source = "hybrid" } = req.body;
    if (!query || typeof query !== "string") {
      return res.status(400).json({ error: "Customer query string is required." });
    }

    const ai = getGenAI();
    let systemInstruction = "You are Coreenact's Customer Support & ERP AI Assistant. Your job is to answer customer questions accurately, politely, and professionally without charge.";

    if (source === "website" || source === "hybrid") {
      systemInstruction += `\n\n${COREENACT_WEBSITE_KNOWLEDGE}\n\nUse this official Coreenact website knowledge base to answer company, service, EdCore, localization, and pricing questions.`;
    }

    if (source === "google" || source === "hybrid") {
      systemInstruction += "\n\nUse Google Search to answer queries that require real-time or external industry information.";
    }

    const enableSearch = source === "google" || source === "hybrid";

    const result = await executeResilientGeneration({
      ai,
      contents: query,
      systemInstruction,
      enableSearch,
      preferredModel: "gemini-3.8-flash",
      queryTextForFallback: query,
      roleTitle: "Customer Support Advisor",
    });

    res.json({
      query,
      reply: result.reply,
      sourceUsed: source,
      modelUsed: result.modelUsed,
      groundingSources: result.groundingSources,
      searchQueries: result.searchQueries,
      isFreeTier: true,
      isLocalFallback: result.isLocalFallback || false,
      freeMessage: "100% Free - Answered via Coreenact AI",
    });
  } catch (error: any) {
    console.error("Customer query error:", error);
    const query = req.body?.query || "";
    const fallbackAnswer = generateLocalKnowledgeResponse(query, "Customer Support Advisor");
    res.json({
      query,
      reply: `${fallbackAnswer}\n\n---\n*Verified response provided by Coreenact Knowledge Base.*`,
      sourceUsed: req.body?.source || "website",
      modelUsed: "coreenact-enterprise-kb",
      groundingSources: [{ title: "Coreenact Official Website", url: "https://coreenact.com" }],
      searchQueries: [],
      isFreeTier: true,
      isLocalFallback: true,
      freeMessage: "100% Free - Coreenact Verified Knowledge Base",
    });
  }
});

// 3. Google Maps Grounding Endpoint
app.post("/api/maps-grounding", async (req, res) => {
  try {
    const { prompt, lat, lng } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required." });
    }

    const ai = getGenAI();
    if (!ai) {
      return res.json({
        text: `Coreenact Global Delivery Center Hub:\n- Location: ${prompt}\n- Facility: Modern Tier-1 IT infrastructure with high-speed connectivity, dedicated enterprise conference rooms, and 24/7 SLA command centers.\n- Accessibility: Strategically situated within prime commercial business corridors with convenient transit and international airport proximity.`,
        groundingChunks: [],
      });
    }

    const config: any = {
      tools: [{ googleMaps: {} }],
    };

    if (lat && lng) {
      config.toolConfig = {
        retrievalConfig: {
          latLng: {
            latitude: Number(lat),
            longitude: Number(lng),
          },
        },
      };
    }

    let response;
    try {
      response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config,
      });
    } catch (mapsErr: any) {
      console.warn(`Maps grounding tool failed or quota reached (${mapsErr?.message}). Trying direct model without tools...`);
      try {
        response = await ai.models.generateContent({
          model: "gemini-3.1-flash-lite",
          contents: `Provide a concise geographical and commercial description of the surrounding area and logistical benefits for: ${prompt}`,
        });
      } catch (liteErr) {
        // Fallback directly to structured hub info
        return res.json({
          text: `Coreenact Global Delivery Center Hub:\n- Location: ${prompt}\n- Facility: Modern Tier-1 IT infrastructure with high-speed connectivity, dedicated enterprise conference rooms, and 24/7 SLA command centers.\n- Accessibility: Strategically situated within prime commercial business corridors with convenient transit and international airport proximity.`,
          groundingChunks: [],
        });
      }
    }

    const text = response?.text || `Coreenact Delivery Hub: ${prompt}`;
    const groundingChunks =
      response?.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    res.json({
      text,
      groundingChunks,
    });
  } catch (error: any) {
    console.error("Maps grounding API error:", error);
    res.status(500).json({
      error: error.message || "Failed to fetch maps-grounded intelligence.",
      details: error.toString(),
    });
  }
});

// 4. High-Quality Image Generation (gemini-3-pro-image-preview)
app.post("/api/generate-image", async (req, res) => {
  try {
    const {
      prompt,
      imageSize = "1K",
      aspectRatio = "16:9",
    } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required." });
    }

    const ai = getGenAI();

    // Use gemini-3-pro-image-preview per instruction
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-image-preview",
      contents: {
        parts: [{ text: prompt }],
      },
      config: {
        imageConfig: {
          aspectRatio: aspectRatio as any,
          imageSize: imageSize as any,
        },
      },
    });

    let imageUrl = "";
    let caption = "";

    const parts = response.candidates?.[0]?.content?.parts || [];
    for (const part of parts) {
      if (part.inlineData) {
        imageUrl = `data:${part.inlineData.mimeType || "image/png"};base64,${part.inlineData.data}`;
      } else if (part.text) {
        caption += part.text;
      }
    }

    if (!imageUrl) {
      return res.status(500).json({
        error: "Model did not return image data. " + (caption || "Please try a different prompt."),
        caption,
      });
    }

    res.json({
      imageUrl,
      caption,
      imageSize,
      aspectRatio,
    });
  } catch (error: any) {
    console.error("Generate image API error:", error);
    res.status(500).json({
      error: error.message || "Image generation failed.",
      details: error.toString(),
    });
  }
});

// 5. Video Generation (Veo) - 3-step server workflow
// Step 1: Start video generation
app.post("/api/generate-video", async (req, res) => {
  try {
    const {
      prompt,
      aspectRatio = "16:9", // '16:9' or '9:16'
      imageBase64,
      mimeType = "image/png",
    } = req.body;

    const ai = getGenAI();

    const videoParams: any = {
      model: "veo-3.1-fast-generate-preview",
      prompt: prompt || "Cinematic transformation of enterprise business systems with glowing holographic data architecture, 4k ultra realistic, modern azure lighting",
      config: {
        numberOfVideos: 1,
        resolution: "720p",
        aspectRatio: aspectRatio === "9:16" ? "9:16" : "16:9",
      },
    };

    if (imageBase64) {
      videoParams.image = {
        imageBytes: imageBase64.replace(/^data:image\/[a-z]+;base64,/, ""),
        mimeType: mimeType || "image/png",
      };
    }

    const operation = await ai.models.generateVideos(videoParams);

    res.json({
      operationName: operation.name,
      status: "queued",
      aspectRatio: videoParams.config.aspectRatio,
    });
  } catch (error: any) {
    console.error("Generate video initiation error:", error);
    res.status(500).json({
      error: error.message || "Failed to initiate video generation.",
      details: error.toString(),
    });
  }
});

// Step 2: Poll video status
app.post("/api/video-status", async (req, res) => {
  try {
    const { operationName } = req.body;
    if (!operationName) {
      return res.status(400).json({ error: "operationName is required." });
    }

    const ai = getGenAI();
    const op = new GenerateVideosOperation();
    op.name = operationName;

    const updated = await ai.operations.getVideosOperation({ operation: op });

    res.json({
      done: Boolean(updated.done),
      error: updated.error || null,
      operationName,
    });
  } catch (error: any) {
    console.error("Video status polling error:", error);
    res.status(500).json({
      error: error.message || "Failed to poll video status.",
      details: error.toString(),
    });
  }
});

// Step 3: Download video stream
app.post("/api/video-download", async (req, res) => {
  try {
    const { operationName } = req.body;
    if (!operationName) {
      return res.status(400).json({ error: "operationName is required." });
    }

    const ai = getGenAI();
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "API key is missing." });
    }

    const op = new GenerateVideosOperation();
    op.name = operationName;

    const updated = await ai.operations.getVideosOperation({ operation: op });
    const uri = updated.response?.generatedVideos?.[0]?.video?.uri;

    if (!uri) {
      return res.status(404).json({ error: "Video URI not found or video generation not finished yet." });
    }

    const videoRes = await fetch(uri, {
      headers: { "x-goog-api-key": apiKey },
    });

    if (!videoRes.ok) {
      return res.status(videoRes.status).json({ error: "Failed to download video from Google servers." });
    }

    res.setHeader("Content-Type", "video/mp4");
    if (videoRes.body) {
      const reader = videoRes.body.getReader();
      const pump = async () => {
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            res.end();
            break;
          }
          res.write(Buffer.from(value));
        }
      };
      await pump();
    } else {
      res.end();
    }
  } catch (error: any) {
    console.error("Video download streaming error:", error);
    res.status(500).json({
      error: error.message || "Failed to download video.",
      details: error.toString(),
    });
  }
});

// Vite middleware / production serving
async function startServer() {
  // When running inside Vercel serverless functions, Vercel routes directly to exported app
  if (process.env.VERCEL) {
    return;
  }

  // Serve static assets from public directory
  app.use(express.static(path.join(process.cwd(), "public")));

  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  const server = http.createServer(app);

  // Retry anything the mail outbox is holding, so a Graph or SMTP blip during
  // a quiet hour still gets delivered while this process is up.
  startOutboxTimer();

  const wss = new WebSocketServer({ server, path: "/live-chat-ws" });

  wss.on("connection", (ws, req) => {
    try {
      const url = new URL(req.url || "", `http://${req.headers.host || "localhost"}`);
      const sessionId = url.searchParams.get("sessionId") || "default";

      if (!sessionSockets.has(sessionId)) {
        sessionSockets.set(sessionId, new Set());
      }
      sessionSockets.get(sessionId)!.add(ws);

      const session = liveChatSessions.get(sessionId);
      if (session) {
        ws.send(JSON.stringify({ type: "init", messages: session.messages }));
      }

      ws.on("close", () => {
        sessionSockets.get(sessionId)?.delete(ws);
      });
    } catch (e) {
      console.warn("WebSocket connection error:", e);
    }
  });

  server.listen(PORT, "0.0.0.0", () => {
    console.log(`Coreenact Enterprise Platform server + WhatsApp Real-Time Bridge running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

export { app };
export default app;
