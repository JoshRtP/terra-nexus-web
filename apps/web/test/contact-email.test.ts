import { describe, expect, it, vi } from 'vitest';
import { buildContactNotificationEmail, sendContactNotificationEmail } from '../src/lib/contact/email.js';
import type { ContactSubmission } from '../src/lib/contact/validation.js';

const SUBMISSION: ContactSubmission = {
  name: 'Ada Lovelace',
  email: 'ada@example.com',
  organization: 'Analytical Engines Inc.',
  role: 'Founder',
  orgType: 'technology',
  routing: 'strategy',
  challenge: 'We need help scaling a pilot <program> & rollout.',
  timing: 'quarter',
  link: 'https://example.com',
  consent: true,
  turnstileToken: 'token',
};

describe('buildContactNotificationEmail', () => {
  it('includes the submitter name and organization in the subject', () => {
    const { subject } = buildContactNotificationEmail(SUBMISSION);
    expect(subject).toBe('Contact form: Ada Lovelace (Analytical Engines Inc.)');
  });

  it('maps coded enum values to human-readable labels', () => {
    const { text } = buildContactNotificationEmail(SUBMISSION);
    expect(text).toContain('Enabling Tech / Solution Provider');
    expect(text).toContain('Strategy, market, product, or growth');
    expect(text).toContain('This quarter');
  });

  it('falls back to "(not specified)" for blank optional fields', () => {
    const { text } = buildContactNotificationEmail({ ...SUBMISSION, organization: '', role: '', link: '' });
    expect(text).toContain('Organization: (not specified)');
    expect(text).toContain('Role: (not specified)');
    expect(text).toContain('Optional link: (not specified)');
  });

  it('HTML-escapes user-supplied text', () => {
    const { html } = buildContactNotificationEmail(SUBMISSION);
    expect(html).toContain('&lt;program&gt;');
    expect(html).toContain('&amp;');
    expect(html).not.toContain('<program>');
  });
});

describe('sendContactNotificationEmail', () => {
  it('posts to the Resend API with the expected shape', async () => {
    const fetchImpl = vi.fn(async (url: string, init?: RequestInit) => {
      expect(url).toBe('https://api.resend.com/emails');
      expect(init?.headers).toMatchObject({ Authorization: 'Bearer test-key' });
      const body = JSON.parse(init?.body as string);
      expect(body.from).toBe('Terra Nexus <contact@terra.nexus>');
      expect(body.to).toEqual(['leads@terra.nexus']);
      expect(body.reply_to).toBe('ada@example.com');
      return new Response(JSON.stringify({ id: 'abc' }), { status: 200 });
    }) as unknown as typeof fetch;

    const result = await sendContactNotificationEmail(
      { apiKey: 'test-key', from: 'Terra Nexus <contact@terra.nexus>', to: 'leads@terra.nexus', replyTo: SUBMISSION.email, data: SUBMISSION },
      fetchImpl
    );
    expect(result.ok).toBe(true);
  });

  it('reports failure on a non-2xx Resend response', async () => {
    const fetchImpl = vi.fn(async () => new Response('bad request', { status: 422 })) as unknown as typeof fetch;
    const result = await sendContactNotificationEmail(
      { apiKey: 'test-key', from: 'a@b.com', to: 'c@d.com', replyTo: SUBMISSION.email, data: SUBMISSION },
      fetchImpl
    );
    expect(result.ok).toBe(false);
    expect(result.error).toContain('422');
  });

  it('reports failure on a network error', async () => {
    const fetchImpl = vi.fn(async () => {
      throw new Error('offline');
    }) as unknown as typeof fetch;
    const result = await sendContactNotificationEmail(
      { apiKey: 'test-key', from: 'a@b.com', to: 'c@d.com', replyTo: SUBMISSION.email, data: SUBMISSION },
      fetchImpl
    );
    expect(result.ok).toBe(false);
    expect(result.error).toContain('offline');
  });
});
