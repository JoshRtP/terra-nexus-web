import { describe, expect, it } from 'vitest';
import { validateContactPayload } from '../src/lib/contact/validation.js';

const VALID_PAYLOAD = {
  name: 'Ada Lovelace',
  email: 'ada@example.com',
  organization: 'Analytical Engines Inc.',
  role: 'Founder',
  challenge: 'We need help scaling a pilot program.',
  consent: true,
  turnstileToken: 'test-token',
};

describe('validateContactPayload', () => {
  it('accepts a fully valid payload and normalizes field names', () => {
    const result = validateContactPayload(VALID_PAYLOAD);
    expect(result.valid).toBe(true);
    expect(result.errors).toEqual({});
    expect(result.data).toMatchObject({
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      challenge: 'We need help scaling a pilot program.',
      consent: true,
    });
  });

  it('accepts optional fields left blank', () => {
    const result = validateContactPayload({
      ...VALID_PAYLOAD,
      organization: '',
      role: '',
    });
    expect(result.valid).toBe(true);
  });

  it('rejects a non-object body', () => {
    expect(validateContactPayload(null).valid).toBe(false);
    expect(validateContactPayload('a string').valid).toBe(false);
    expect(validateContactPayload(undefined).valid).toBe(false);
  });

  it('requires name, email, challenge, consent, and a Turnstile token', () => {
    const result = validateContactPayload({});
    expect(result.valid).toBe(false);
    expect(result.errors.name).toBeTruthy();
    expect(result.errors.email).toBeTruthy();
    expect(result.errors.challenge).toBeTruthy();
    expect(result.errors.consent).toBeTruthy();
    expect(result.errors.turnstileToken).toBeTruthy();
  });

  it('rejects a malformed email address', () => {
    const result = validateContactPayload({ ...VALID_PAYLOAD, email: 'not-an-email' });
    expect(result.valid).toBe(false);
    expect(result.errors.email).toBeTruthy();
  });

  it('treats consent as required unless explicitly true/"true"/"on"', () => {
    expect(validateContactPayload({ ...VALID_PAYLOAD, consent: false }).valid).toBe(false);
    expect(validateContactPayload({ ...VALID_PAYLOAD, consent: 'on' }).valid).toBe(true);
    expect(validateContactPayload({ ...VALID_PAYLOAD, consent: 'true' }).valid).toBe(true);
  });

  it('accepts the raw cf-turnstile-response field name (native form-encoded fallback)', () => {
    const { turnstileToken: _omit, ...rest } = VALID_PAYLOAD;
    const result = validateContactPayload({ ...rest, 'cf-turnstile-response': 'raw-widget-token' });
    expect(result.valid).toBe(true);
    expect(result.data?.turnstileToken).toBe('raw-widget-token');
  });
});
