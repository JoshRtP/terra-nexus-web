// Production contact-form endpoint. On-demand (prerender = false) under the
// Cloudflare Workers adapter — see docs/architecture/web-platform-
// architecture.md §6/§9 and plans/contact-form-production.md for why this
// is the one route (besides Keystatic's admin routes) that opts out of the
// site's default `output: 'static'` prerendering, and for the phased plan
// this implements.
//
// Unlike the Keystatic shim (src/lib/keystatic-cloudflare-shim.ts), this
// route is a normal src/pages/api file — it must exist in every production
// build (SKIP_KEYSTATIC=true or not), so it isn't gated behind
// includeKeystatic or injected via injectRoute().
//
// Env vars, all sourced from `cloudflare:workers` at request time (the same
// pattern the Keystatic shim uses, and for the same reason: these are
// Wrangler secrets/vars, only available inside the Workers runtime, never
// during the Node prerender step):
//   TURNSTILE_SECRET_KEY  — secret, from the Cloudflare Turnstile dashboard
//   RESEND_API_KEY        — secret, from the Resend dashboard
//   CONTACT_TO_EMAIL      — var, the inbox that should receive leads
//   CONTACT_FROM_EMAIL    — var, the Resend-verified sending address
// See plans/contact-form-production.md for what still needs to be created
// and where to set these.
import type { APIRoute } from 'astro';
import { validateContactPayload } from '../../lib/contact/validation.js';
import { verifyTurnstileToken } from '../../lib/contact/turnstile.js';
import { sendContactNotificationEmail } from '../../lib/contact/email.js';

export const prerender = false;

function json(data: unknown, status: number): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

async function parseRequestBody(request: Request): Promise<unknown> {
  const contentType = request.headers.get('content-type') ?? '';
  if (contentType.includes('application/json')) {
    return request.json();
  }
  if (contentType.includes('application/x-www-form-urlencoded') || contentType.includes('multipart/form-data')) {
    const form = await request.formData();
    return Object.fromEntries(form.entries());
  }
  // Best-effort fallback — try JSON, then give up cleanly rather than throw.
  try {
    return await request.json();
  } catch {
    return null;
  }
}

export const POST: APIRoute = async ({ request }) => {
  let rawBody: unknown;
  try {
    rawBody = await parseRequestBody(request);
  } catch {
    return json({ ok: false, message: 'Could not read request body.' }, 400);
  }

  const validation = validateContactPayload(rawBody);
  if (!validation.valid || !validation.data) {
    return json({ ok: false, message: 'Please correct the highlighted fields.', errors: validation.errors }, 400);
  }

  // cloudflare:workers only resolves inside the Workers runtime (workerd),
  // never during the Node prerender step — safe here because this route is
  // always on-demand (prerender = false above). See
  // src/lib/keystatic-cloudflare-shim.ts for the precedent.
  const { env } = await import('cloudflare:workers');
  const config = env as Record<string, string | undefined>;

  const turnstileSecret = config.TURNSTILE_SECRET_KEY;
  const resendApiKey = config.RESEND_API_KEY;
  const toEmail = config.CONTACT_TO_EMAIL;
  const fromEmail = config.CONTACT_FROM_EMAIL;

  if (!turnstileSecret || !resendApiKey || !toEmail || !fromEmail) {
    // Fail loudly in server logs (via the thrown-away detail below) but
    // give the visitor a generic message — a misconfigured deploy is an
    // operator problem, not something to expose to the public.
    console.error(
      '[api/contact] missing required config:',
      [
        !turnstileSecret && 'TURNSTILE_SECRET_KEY',
        !resendApiKey && 'RESEND_API_KEY',
        !toEmail && 'CONTACT_TO_EMAIL',
        !fromEmail && 'CONTACT_FROM_EMAIL',
      ]
        .filter(Boolean)
        .join(', ')
    );
    return json({ ok: false, message: 'The contact form is not yet configured. Please try again later.' }, 500);
  }

  const remoteIp = request.headers.get('cf-connecting-ip') ?? undefined;
  const turnstileResult = await verifyTurnstileToken(validation.data.turnstileToken, turnstileSecret, remoteIp);
  if (!turnstileResult.success) {
    return json(
      {
        ok: false,
        message: 'Spam-verification check failed. Please retry the form.',
        errors: { turnstileToken: turnstileResult.errorCodes.join(', ') || 'verification failed' },
      },
      400
    );
  }

  const sendResult = await sendContactNotificationEmail({
    apiKey: resendApiKey,
    from: fromEmail,
    to: toEmail,
    replyTo: validation.data.email,
    data: validation.data,
  });

  if (!sendResult.ok) {
    console.error('[api/contact] Resend send failed:', sendResult.error);
    return json({ ok: false, message: 'Could not send your message right now. Please try again shortly.' }, 502);
  }

  return json({ ok: true, message: 'Thank you — your message has been sent.' }, 200);
};
