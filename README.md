<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/dd232b5e-ba95-4382-ada5-7367217e56d3

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Enquiry notifications (Microsoft 365)

Every submission to `POST /api/enquiry` (contact form and consultation modal),
`POST /api/leads` (site agent) and `POST /api/live-chat/message` (visitor chat)
sends a notification mail to the addresses in `NOTIFICATION_EMAIL`, comma
separated. Reply-to is set to the prospect.

Two transports, tried in that order (see `mailTransport.ts`):

1. **Microsoft Graph** - preferred, and the one that works when the tenant has
   disabled SMTP AUTH. The backend authenticates as the Azure app registration
   with the client-credentials flow, then calls `/users/{sender}/sendMail`.
   Setup:
   - Azure portal → App registrations → your app → **Certificates & secrets** →
     New client secret → copy the **Value** (not the Secret ID).
   - API permissions → add **Mail.Send** as an *Application* permission →
     **Grant admin consent**.
   - Set `GRAPH_CLIENT_SECRET` in your environment. The tenant ID, client ID and
     sender mailbox have defaults in `mailTransport.ts`, overridable through
     `GRAPH_TENANT_ID`, `GRAPH_CLIENT_ID` and `GRAPH_SENDER_EMAIL`. The sender
     must be a licensed mailbox; a shared mailbox will not accept `sendMail`.
2. **SMTP** (`smtp.office365.com:587`) - kept as a fallback, used only when Graph
   is not configured. Needs `SMTP_USER` + `SMTP_PASS`, and SMTP AUTH enabled on
   the mailbox.

Verify without filling in the form:

- `GET /api/email-status` - which transport is active and which settings are missing.
- `POST /api/email-test` - sends one message to the configured recipients.

Each enquiry also sends a fixed-template confirmation to the address the prospect
typed, throttled to one per address per 10 minutes and 50 per hour so the form
cannot be used to mail arbitrary addresses at volume. Set
`SEND_ENQUIRY_CONFIRMATION=false` to turn it off. The outcome is returned as
`autoReply` from `/api/enquiry`.

Live-chat messages are mailed too, because the widget only hands the visitor a
`wa.me` link - nothing reaches a phone or an inbox on its own. One alert per chat
session per 10 minutes, 30 per hour, containing the visitor's name, phone,
message and a link to the reply portal. Set `SEND_LIVE_CHAT_ALERT=false` to turn
it off; the outcome is returned as `notification` from `/api/live-chat/message`.

A failed send is retried up to three times from an in-process outbox. That
absorbs throttling and brief network faults; it does **not** survive a process
restart, and nothing is persisted to a database.

**Storage:** submissions are not written to a database. There is no PostgreSQL
support in this codebase - `GET /api/leads` reads an in-memory list that is
empty after every restart, and an enquiry that cannot be mailed is only echoed
to the server log. Treat the mailbox as the system of record until a real store
is added.

