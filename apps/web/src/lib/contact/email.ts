// Builds and sends the contact-form notification email via the Resend API
// (https://resend.com/docs/api-reference/emails/send-email, checked
// 2026-09-07) using a plain fetch call — no Resend SDK dependency, matching
// this repo's "smallest coherent change" / no-speculative-dependency
// convention. `fetchImpl` is injectable for unit tests
// (test/contact-email.test.ts); no test ever calls the real Resend API.
import type { ContactSubmission } from './validation.js';

const ORG_TYPE_LABELS: Record<string, string> = {
  'agricultural-producer': 'Agricultural Producer / Integrated Protein',
  'commodity-trader': 'Commodity Trader',
  'ingredient-processor': 'Ingredient & Feed Processor',
  'food-beverage': 'Food & Beverage Company',
  'retail-distribution': 'Food Retail & Distribution',
  'energy-biofuels': 'Energy & Biofuels Refiner',
  'food-waste': 'Food Waste Prevention / Diversion / Recovery',
  inputs: 'Inputs Company',
  'environmental-markets': 'Environmental Markets / Ecosystem Services',
  technology: 'Enabling Tech / Solution Provider',
  investor: 'Private Equity / Venture / Impact Investor',
  other: 'Other',
};

const ROUTING_LABELS: Record<string, string> = {
  strategy: 'Strategy, market, product, or growth',
  investment: 'Investment, venture, or diligence',
  sourcing: 'Sourcing, supply chain, or operations',
  sustainability: 'Corporate sustainability, accounting, or reporting',
  carbon: 'Carbon, ecosystem services, claims, or verification readiness',
  other: 'Other',
};

const TIMING_LABELS: Record<string, string> = {
  immediate: 'Immediate (within 30 days)',
  'near-term': 'Near-term (1-3 months)',
  quarter: 'This quarter',
  exploring: 'Exploring / no fixed timeline',
};

function label(map: Record<string, string>, value: string): string {
  if (!value) return '(not specified)';
  return map[value] ?? value;
}

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
    ['Organization type', label(ORG_TYPE_LABELS, data.orgType)],
    ['How can we help', label(ROUTING_LABELS, data.routing)],
    ['Desired timing', label(TIMING_LABELS, data.timing)],
    ['Optional link', data.link || '(not specified)'],
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
