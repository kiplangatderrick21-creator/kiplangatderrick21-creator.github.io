// ---------------------------------------------------------------------------
// Cloudflare Pages Function — POST /api/contact
//
// The site is a static Next.js export (output: 'export' in next.config.mjs),
// so it has no API routes of its own. Cloudflare Pages turns every file in the
// repository's /functions directory into a route, which gives the contact form
// a server endpoint without adding a runtime framework. This file is served at
// /api/contact locally (`npx wrangler pages dev out`) and on the deployed
// Pages project.
//
// It validates the submission and emails it to info@nivavale.com through the
// Resend REST API.
//
// Required configuration
//   RESEND_API_KEY   Resend API key (https://resend.com/api-keys). Set it as a
//                    secret under Workers & Pages -> <project> -> Settings ->
//                    Variables and Secrets, or in .dev.vars locally.
//
// Optional configuration
//   CONTACT_TO       Delivery address. Default: info@nivavale.com
//   CONTACT_FROM     From header. Default: Nivavale Website <info@nivavale.com>
//                    Must be an address on a domain verified with Resend.
//   ALLOWED_ORIGIN   Enables CORS for exactly one extra origin, for example
//                    https://kiplangatderrick21-creator.github.io
//
// If RESEND_API_KEY is missing, the function answers 503 with
// { ok: false, error: 'not-configured' } and the form shows its
// "not connected" notice instead of pretending to send.
// ---------------------------------------------------------------------------

export type Env = {
  RESEND_API_KEY?: string;
  CONTACT_TO?: string;
  CONTACT_FROM?: string;
  ALLOWED_ORIGIN?: string;
};

type FunctionContext = {
  request: Request;
  env: Env;
};

type Submission = {
  name: string;
  email: string;
  organization: string;
  subject: string;
  message: string;
};

type OutgoingEmail = {
  to: string;
  from: string;
  replyTo: string;
  subject: string;
  text: string;
  html: string;
};

const DEFAULT_TO = 'info@nivavale.com';
const DEFAULT_FROM = 'Nivavale Website <info@nivavale.com>';
const RESEND_ENDPOINT = 'https://api.resend.com/emails';
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Field length caps, kept in step with the form's own expectations. */
const LIMITS = {
  name: 120,
  email: 200,
  organization: 160,
  subject: 200,
  message: 5000,
} as const;

/** Reject anything absurd before parsing it. */
const MAX_BODY_BYTES = 20000;

/**
 * CORS is off by default: the form and the function normally share an origin.
 * Setting ALLOWED_ORIGIN opts exactly one other origin in, which is needed only
 * when the static site is hosted somewhere else (for example GitHub Pages).
 */
function corsHeaders(request: Request, env: Env): Record<string, string> {
  const allowedOrigin = env.ALLOWED_ORIGIN?.trim();
  if (!allowedOrigin || request.headers.get('Origin') !== allowedOrigin) {
    return {};
  }
  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    Vary: 'Origin',
  };
}

function json(body: unknown, status: number, headers: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      ...headers,
    },
  });
}

function readField(value: unknown, maxLength: number): string {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function validate(payload: Record<string, unknown>): {
  errors: Record<string, string>;
  value: Submission;
} {
  const value: Submission = {
    name: readField(payload.name, LIMITS.name),
    email: readField(payload.email, LIMITS.email),
    organization: readField(payload.organization, LIMITS.organization),
    subject: readField(payload.subject, LIMITS.subject),
    message: readField(payload.message, LIMITS.message),
  };

  const errors: Record<string, string> = {};
  if (!value.name) errors.name = 'Please enter your name.';
  if (!value.email) {
    errors.email = 'Please enter your email address.';
  } else if (!EMAIL_PATTERN.test(value.email)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!value.message) errors.message = 'Please enter a message.';
  return { errors, value };
}

function buildEmail(submission: Submission, options: { to: string; from: string }): OutgoingEmail {
  const rows: Array<[string, string]> = [
    ['Name', submission.name],
    ['Email', submission.email],
    ['Organization', submission.organization || 'Not provided'],
    ['Subject', submission.subject || 'Not provided'],
  ];

  const text = [
    'New message from the Nivavale website contact form.',
    '',
    ...rows.map(([label, value]) => `${label}: ${value}`),
    '',
    'Message:',
    submission.message,
  ].join('\n');

  const html = [
    '<h2 style="font-family:sans-serif">New website enquiry</h2>',
    '<table cellpadding="6" style="border-collapse:collapse;font-family:sans-serif;font-size:14px">',
    ...rows.map(
      ([label, value]) =>
        `<tr><th align="left" style="color:#555;font-weight:600">${escapeHtml(label)}</th>` +
        `<td>${escapeHtml(value)}</td></tr>`,
    ),
    '</table>',
    '<p style="font-family:sans-serif;font-size:14px">Message:</p>',
    `<pre style="font-family:sans-serif;font-size:14px;white-space:pre-wrap;margin:0">${escapeHtml(
      submission.message,
    )}</pre>`,
    `<p style="font-family:sans-serif;font-size:12px;color:#666">Reply directly to this email to answer ${escapeHtml(
      submission.name,
    )} at ${escapeHtml(submission.email)}.</p>`,
  ].join('\n');

  return {
    to: options.to,
    from: options.from,
    replyTo: submission.email,
    subject: `[Website] ${submission.subject || 'New enquiry'} - ${submission.name}`.slice(0, 200),
    text,
    html,
  };
}

async function sendWithResend(apiKey: string, email: OutgoingEmail): Promise<void> {
  const response = await fetch(RESEND_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: email.from,
      to: [email.to],
      reply_to: email.replyTo,
      subject: email.subject,
      text: email.text,
      html: email.html,
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => '');
    throw new Error(`Resend responded with ${response.status}: ${detail.slice(0, 300)}`);
  }
}

export function onRequestOptions(context: FunctionContext): Response {
  return new Response(null, { status: 204, headers: corsHeaders(context.request, context.env) });
}

export async function onRequestPost(context: FunctionContext): Promise<Response> {
  const { request, env } = context;
  const cors = corsHeaders(request, env);

  const declaredLength = Number(request.headers.get('content-length') ?? '0');
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
    return json({ ok: false, error: 'payload-too-large' }, 413, cors);
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return json({ ok: false, error: 'invalid-json' }, 400, cors);
  }

  if (typeof payload !== 'object' || payload === null || Array.isArray(payload)) {
    return json({ ok: false, error: 'invalid-payload' }, 400, cors);
  }

  const raw = payload as Record<string, unknown>;

  // Honeypot: people never fill this hidden field, careless bots usually do.
  // Answer 200 so the bot moves on, but send nothing.
  if (readField(raw.company, 200)) {
    return json({ ok: true }, 200, cors);
  }

  const { errors, value } = validate(raw);
  if (Object.keys(errors).length > 0) {
    return json({ ok: false, error: 'validation', fieldErrors: errors }, 400, cors);
  }

  const apiKey = env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    return json({ ok: false, error: 'not-configured' }, 503, cors);
  }

  const email = buildEmail(value, {
    to: env.CONTACT_TO?.trim() || DEFAULT_TO,
    from: env.CONTACT_FROM?.trim() || DEFAULT_FROM,
  });

  try {
    await sendWithResend(apiKey, email);
  } catch (error) {
    // Log the failure without echoing the submission (it holds personal data)
    // and without ever returning the API key.
    console.error('[contact] Failed to send contact email:', error);
    return json({ ok: false, error: 'send-failed' }, 502, cors);
  }

  return json({ ok: true }, 200, cors);
}
