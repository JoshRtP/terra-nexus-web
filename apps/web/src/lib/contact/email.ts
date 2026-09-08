// Builds and sends the contact-form notification email via the Resend API
// (https://resend.com/docs/api-reference/emails/send-email, checked
// 2026-09-07) using a plain fetch call — no Resend SDK dependency, matching
// this repo's "smallest coherent change" / no-speculative-dependency
// convention. `fetchImpl` is injectable for unit tests
// (test/contact-email.test.ts); no test ever calls the real Resend API.
import type { ContactSubmission } from './validation.js';

// Organization type, routing, desired timing, and an optional link were
// removed from the contact form 2026-09-08 (owner request) — the label
// maps that used to render those coded values in this email were removed
// along with them. See validation.ts for the current field list.

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export interface ContactEmailContent {
  subject: string;
  text: string;
  html: string;
}

export function buildContactNotificationEmail(data: ContactSubmission): ContactEmailContent {
  const subject = `Contact form: ${data.name}${data.organization ? ` (${data.organization})` : ''}`;

  const rows: Array<[string, string]> = [
    ['Name', data.name],
    ['Work email', data.email],
    ['Organization', data.organization || '(not specified)'],
    ['Role', data.role || '(not specified)'],
  ];

  const text = [
    ...rows.map(([k, v]) => `${k}: ${v}`),
    '',
    'Challenge or objective:',
    data.challenge,
  ].join('\n');

  const html = [
    '<table cellpadding="4" cellspacing="0">',
    ...rows.map(
      ([k, v]) =>
        `<tr><td><strong>${escapeHtml(k)}</strong></td><td>${escapeHtml(v)}</td></tr>`
    ),
    '</table>',
    '<p><strong>Challenge or objective:</strong></p>',
    `<p>${escapeHtml(data.challenge).replace(/\n/g, '<br />')}</p>`,
  ].join('\n');

  return { subject, text, html };
}

export interface SendContactEmailParams {
  apiKey: string;
  from: string;
  to: string;
  replyTo: string;
  data: ContactSubmission;
}

export interface SendContactEmailResult {
  ok: boolean;
  error?: string;
}

export async function sendContactNotificationEmail(
  params: SendContactEmailParams,
  fetchImpl: typeof fetch = fetch
): Promise<SendContactEmailResult> {
  const { subject, text, html } = buildContactNotificationEmail(params.data);

  let response: Response;
  try {
    response = await fetchImpl('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${params.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: params.from,
        to: [params.to],
        reply_to: params.replyTo,
        subject,
        text,
        html,
      }),
    });
  } catch (error) {
    return { ok: false, error: `Network error calling Resend: ${(error as Error).message}` };
  }

  if (!response.ok) {
    const body = await response.text().catch(() => '');
    return { ok: false, error: `Resend API returned ${response.status}: ${body}` };
  }

  return { ok: true };
}
