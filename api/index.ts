import type { Request, Response } from "express";

/**
 * Vercel's entry point for the entire API. `vercel.json` rewrites every
 * /api/* request here, so this file is the only thing the platform loads;
 * nothing in the browser-facing build touches it.
 *
 * The Express app is imported dynamically, without a file extension, inside
 * the handler. Three separate reasons, all of them learned from a deployment
 * that answered FUNCTION_INVOCATION_FAILED for every route - including
 * /api/health, which reads nothing and writes nothing:
 *
 *  1. `import app from "../server.ts"` only compiles because tsconfig sets
 *     moduleResolution "bundler" plus allowImportingTsExtensions. That is a
 *     Vite-only convenience. The specifier is emitted literally, and the
 *     function's files hold a transpiled `server.js`, so resolution fails.
 *  2. A static import that fails does so while the module graph is being
 *     built, before any request exists to answer - the platform has nothing
 *     to show but a 500 with an empty body. Loaded from inside the handler,
 *     the identical failure is reported back as readable JSON.
 *  3. The promise is cached, so a warm instance pays for the import once.
 *     A rejection is not cached, so a next request retries rather than
 *     inheriting the first failure forever.
 */
let pendingApp: Promise<ExpressApp> | null = null;

/**
 * The shape actually called here. Express's own app type demands a third
 * `next` argument, which a serverless entry has no way to supply, so the
 * import is held against the two-argument callable the platform can offer.
 */
type ExpressApp = (req: Request, res: Response) => unknown;

async function loadApp(): Promise<ExpressApp> {
  if (!pendingApp) {
    // "../server.js", not "../server": the function runs as an ES module, and
    // ESM resolution never appends an extension, so an extension-less specifier
    // fails with ERR_MODULE_NOT_FOUND on /var/task/server even when the
    // transpiled server.js sits right there. TypeScript maps .js back to the
    // .ts source, so this still typechecks and still bundles.
    pendingApp = import("../server.js")
      .then((mod: any) => {
        const handler = mod?.default ?? mod?.app;
        if (typeof handler !== "function") {
          throw new Error(
            "server.ts exported no callable Express app (default export missing)"
          );
        }
        return handler;
      })
      .catch((err) => {
        pendingApp = null;
        throw err;
      });
  }
  return pendingApp;
}

export default async function handler(req: Request, res: Response) {
  let app: ExpressApp;
  try {
    app = await loadApp();
  } catch (err: any) {
    // Diagnostics only: which stage broke, what the runtime said, and nothing
    // that resembles a credential.
    res.status(503).json({
      ok: false,
      stage: "api-bootstrap",
      error: String(err?.message || err),
      code: err?.code || null,
      stack: typeof err?.stack === "string"
        ? err.stack.split("\n").slice(0, 5).map((line: string) => line.trim())
        : null,
      runtime: {
        node: process.version,
        vercel: process.env.VERCEL || null,
        region: process.env.VERCEL_REGION || null,
        env: process.env.VERCEL_ENV || null,
      },
      mailConfigured: Boolean(
        (process.env.GRAPH_CLIENT_SECRET || "").trim() ||
          (process.env.SMTP_PASS || "").trim()
      ),
    });
    return;
  }

  return app(req, res);
}
