// Server-side Cloudflare Turnstile verification for the contact form.
// See https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
// (checked 2026-09-07). `fetchImpl` is injectable so unit tests never make a
// real network call — see test/contact-turnstile.test.ts.

const SITEVERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

export interface TurnstileVerification {
  success: boolean;
  errorCodes: string[];
}

export async function verifyTurnstileToken(
  token: string,
  secretKey: string,
  remoteIp: string | undefined,
  fetchImpl: typeof fetch = fetch
): Promise<TurnstileVerification> {
  const body = new URLSearchParams({ secret: secretKey, response: token });
  if (remoteIp) body.set('remoteip', remoteIp);

  let response: Response;
  try {
    response = await fetchImpl(SITEVERIFY_URL, { method: 'POST', body });
  } catch {
    // Network failure talking to Cloudflare's own siteverify endpoint —
    // fail closed (treat as verification failure), not open.
    return { success: false, errorCodes: ['siteverify-network-error'] };
  }

  if (!response.ok) {
    return { success: false, errorCodes: [`siteverify-http-${response.status}`] };
  }

  const result = (await response.json()) as { success?: boolean; 'error-codes'?: string[] };
  return {
    success: result.success === true,
    errorCodes: result['error-codes'] ?? [],
  };
}
