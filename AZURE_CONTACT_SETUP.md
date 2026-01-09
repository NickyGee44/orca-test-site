# Azure contact form email setup

This repo is prepared for **Azure Static Web Apps** + **Azure Functions**.

## What’s included

- Serverless endpoint: `POST /api/contact`
- Location: `api/contact/`
- Spam protection:
  - Honeypot (`website` field)
  - Rate limiting (basic per-IP, in-memory)
  - Validation and “too many links” heuristic
  - Optional Cloudflare Turnstile (if configured)
- Email delivery: **SendGrid** via REST API
- Email delivery: **Azure Communication Services Email**

## Environment variables (Azure Function App / Static Web App)

Set these in Azure:

- `ACS_EMAIL_CONNECTION_STRING`
- `ACS_EMAIL_SENDER` (the verified sender address in ACS)
- `CONTACT_TO_EMAIL`
- `CONTACT_SUBJECT_PREFIX` (optional, default: `[Orca Lead]`)

Optional (strongly recommended):
- `TURNSTILE_SECRET_KEY` (Cloudflare Turnstile server secret)

## Frontend behavior

The frontend will `POST` to `/api/contact`.

- If the API is **not available** (e.g. local dev without Functions running), it will **fall back to localStorage** so the site remains usable.

## Local development

Vite dev server alone does **not** run the Azure Functions API.

To test the API locally you’d typically run Azure Functions Core Tools, or use Azure Static Web Apps CLI.

If you want, I can add the SWA CLI setup (`swa start`) next.

## Can we skip the API and email directly from the website?

Not recommended. Sending email requires **secrets** (API keys / connection strings). If you put those in the browser, they can be stolen. A serverless API keeps secrets on the server side (and can do spam checks + rate limiting).

## Key Vault

You can store secrets in **Azure Key Vault**, then expose them to the Function App / Static Web Apps environment via Key Vault references. The function reads them from `process.env.*` at runtime.

