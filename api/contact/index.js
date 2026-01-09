/**
 * Azure Functions (Static Web Apps compatible) contact endpoint
 * Route: POST /api/contact
 *
 * Features:
 * - Honeypot spam protection
 * - Basic per-IP rate limiting (in-memory)
 * - Payload validation and normalization
 * - Optional Cloudflare Turnstile verification (if TURNSTILE_SECRET_KEY is set)
 * - Email delivery via Azure Communication Services Email
 *
 * Env vars:
 * - ACS_EMAIL_CONNECTION_STRING
 * - ACS_EMAIL_SENDER
 * - CONTACT_TO_EMAIL
 * - CONTACT_SUBJECT_PREFIX (optional)
 * - TURNSTILE_SECRET_KEY (optional)
 */

const { EmailClient } = require("@azure/communication-email");

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX = 6; // max submissions per IP per window

/** @type {Map<string, {count: number, resetAt: number}>} */
const rateLimitStore = new Map();

function json(res, status, body) {
  res.status = status;
  res.headers = {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store"
  };
  res.body = JSON.stringify(body);
  return res;
}

function getClientIp(req) {
  const xf = req.headers?.["x-forwarded-for"] || req.headers?.["X-Forwarded-For"];
  if (typeof xf === "string" && xf.length > 0) return xf.split(",")[0].trim();
  return req.headers?.["x-client-ip"] || req.headers?.["X-Client-Ip"] || "unknown";
}

function isEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || "").trim());
}

function stripControlChars(s) {
  return String(s || "").replace(/[\u0000-\u001F\u007F]/g, "").trim();
}

function countUrls(text) {
  const matches = String(text || "").match(/https?:\/\/\S+/gi);
  return matches ? matches.length : 0;
}

function rateLimitOk(ip) {
  const now = Date.now();
  const existing = rateLimitStore.get(ip);
  if (!existing || now > existing.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { ok: true, remaining: RATE_LIMIT_MAX - 1, resetAt: now + RATE_LIMIT_WINDOW_MS };
  }
  if (existing.count >= RATE_LIMIT_MAX) {
    return { ok: false, remaining: 0, resetAt: existing.resetAt };
  }
  existing.count += 1;
  return { ok: true, remaining: RATE_LIMIT_MAX - existing.count, resetAt: existing.resetAt };
}

async function verifyTurnstile(token, ip) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return { enabled: false, ok: true };
  if (!token) return { enabled: true, ok: false, error: "missing_turnstile_token" };

  try {
    const params = new URLSearchParams();
    params.set("secret", secret);
    params.set("response", token);
    if (ip && ip !== "unknown") params.set("remoteip", ip);

    const resp = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: params.toString()
    });
    const data = await resp.json();
    if (data && data.success) return { enabled: true, ok: true };
    return { enabled: true, ok: false, error: "turnstile_failed", details: data };
  } catch (e) {
    return { enabled: true, ok: false, error: "turnstile_error" };
  }
}

async function sendEmailACS({ to, sender, subject, text, html }) {
  const cs = process.env.ACS_EMAIL_CONNECTION_STRING;
  if (!cs) return { ok: false, error: "missing_ACS_EMAIL_CONNECTION_STRING" };
  if (!sender) return { ok: false, error: "missing_ACS_EMAIL_SENDER" };

  try {
    const client = new EmailClient(cs);
    const poller = await client.beginSend({
      senderAddress: sender,
      content: {
        subject,
        plainText: text,
        html
      },
      recipients: {
        to: [{ address: to }]
      }
    });

    const result = await poller.pollUntilDone();
    if (result && result.status === "Succeeded") return { ok: true, messageId: result.id };
    return { ok: false, error: "acs_failed", details: result };
  } catch (e) {
    return { ok: false, error: "acs_error", details: String(e && e.message ? e.message : e).slice(0, 500) };
  }
}

module.exports = async function (context, req) {
  // CORS preflight (only needed if API is hosted on different domain)
  if ((req.method || "").toUpperCase() === "OPTIONS") {
    context.res = {
      status: 204,
      headers: {
        "access-control-allow-origin": "*",
        "access-control-allow-methods": "POST, OPTIONS",
        "access-control-allow-headers": "content-type"
      }
    };
    return;
  }

  const ip = getClientIp(req);
  const rl = rateLimitOk(ip);
  if (!rl.ok) {
    context.res = json({}, 429, {
      ok: false,
      error: "rate_limited",
      resetAt: rl.resetAt
    });
    return;
  }

  let body = req.body;
  if (!body && req.rawBody) {
    try {
      body = JSON.parse(req.rawBody);
    } catch {
      // ignore
    }
  }
  if (!body || typeof body !== "object") {
    context.res = json({}, 400, { ok: false, error: "invalid_json" });
    return;
  }

  // Honeypot: bots fill hidden fields
  const honeypot = stripControlChars(body.website || body.hp || "");
  if (honeypot) {
    // Return success-ish to avoid signaling bot detection
    context.res = json({}, 202, { ok: true });
    return;
  }

  const name = stripControlChars(body.name);
  const company = stripControlChars(body.company);
  const email = stripControlChars(body.email);
  const role = stripControlChars(body.role);
  const phone = stripControlChars(body.phone);
  const freightModes = Array.isArray(body.freightModes)
    ? body.freightModes.map(stripControlChars).filter(Boolean)
    : stripControlChars(body.freightModes || "")
        .split(",")
        .map((s) => stripControlChars(s))
        .filter(Boolean);
  const approximateSpend = stripControlChars(body.approximateSpend);
  const message = stripControlChars(body.message || "");
  const turnstileToken = stripControlChars(body.turnstileToken || "");

  const errors = [];
  if (!name) errors.push("name");
  if (!company) errors.push("company");
  if (!email || !isEmail(email)) errors.push("email");
  if (!freightModes || freightModes.length === 0) errors.push("freightModes");

  const msgLen = message.length;
  if (msgLen > 5000) errors.push("message_too_long");
  if (countUrls(message) > 3) errors.push("too_many_links");

  if (errors.length > 0) {
    context.res = json({}, 400, { ok: false, error: "validation_failed", fields: errors });
    return;
  }

  const turnstile = await verifyTurnstile(turnstileToken, ip);
  if (!turnstile.ok) {
    context.res = json({}, 400, { ok: false, error: turnstile.error || "turnstile_failed" });
    return;
  }

  const to = process.env.CONTACT_TO_EMAIL;
  const sender = process.env.ACS_EMAIL_SENDER;
  const prefix = process.env.CONTACT_SUBJECT_PREFIX || "[Orca Lead]";

  const missing = [];
  if (!to) missing.push("CONTACT_TO_EMAIL");
  if (!sender) missing.push("ACS_EMAIL_SENDER");
  if (!process.env.ACS_EMAIL_CONNECTION_STRING) missing.push("ACS_EMAIL_CONNECTION_STRING");
  if (missing.length > 0) {
    context.res = json({}, 500, {
      ok: false,
      error: "missing_env",
      missing
    });
    return;
  }

  const subject = `${prefix} Demo request from ${name} (${company})`;
  const text = [
    `New demo request`,
    ``,
    `Name: ${name}`,
    `Company: ${company}`,
    role ? `Role: ${role}` : null,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : null,
    freightModes.length ? `Freight modes: ${freightModes.join(", ")}` : null,
    approximateSpend ? `Spend: ${approximateSpend}` : null,
    ``,
    `Message:`,
    message || "(none)",
    ``,
    `Meta:`,
    `IP: ${ip}`
  ]
    .filter(Boolean)
    .join("\n");

  const html = `
    <h2>New demo request</h2>
    <ul>
      <li><strong>Name:</strong> ${escapeHtml(name)}</li>
      <li><strong>Company:</strong> ${escapeHtml(company)}</li>
      ${role ? `<li><strong>Role:</strong> ${escapeHtml(role)}</li>` : ""}
      <li><strong>Email:</strong> ${escapeHtml(email)}</li>
      ${phone ? `<li><strong>Phone:</strong> ${escapeHtml(phone)}</li>` : ""}
      ${
        freightModes.length
          ? `<li><strong>Freight modes:</strong> ${escapeHtml(freightModes.join(", "))}</li>`
          : ""
      }
      ${approximateSpend ? `<li><strong>Spend:</strong> ${escapeHtml(approximateSpend)}</li>` : ""}
    </ul>
    <h3>Message</h3>
    <pre style="white-space:pre-wrap;font-family:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;">${escapeHtml(
      message || "(none)"
    )}</pre>
    <p style="color:#64748b;font-size:12px">IP: ${escapeHtml(ip)}</p>
  `;

  const sendResult = await sendEmailACS({ to, sender, subject, text, html });
  if (!sendResult.ok) {
    context.log.warn("contact_send_failed", sendResult);
    context.res = json({}, 502, { ok: false, error: sendResult.error, details: sendResult.details });
    return;
  }

  context.res = json({}, 200, { ok: true });
};

function escapeHtml(input) {
  return String(input || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

