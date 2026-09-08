import { describe, expect, it, vi } from 'vitest';
import { verifyTurnstileToken } from '../src/lib/contact/turnstile.js';

function mockFetch(response: { success: boolean; 'error-codes'?: string[] }, status = 200) {
  return vi.fn(async () =>
    new Response(JSON.stringify(response), { status, headers: { 'Content-Type': 'application/json' } })
  ) as unknown as typeof fetch;
}

describe('verifyTurnstileToken', () => {
  it('returns success on a passing siteverify response', async () => {
    const fetchImpl = mockFetch({ success: true });
    const result = await verifyTurnstileToken('token', 'secret', '203.0.113.1', fetchImpl);
    expect(result.success).toBe(true);
    expect(result.errorCodes).toEqual([]);
  });

  it('sends secret, response, and remoteip as form-encoded fields', async () => {
    const fetchImpl = vi.fn(async (_url: string, init?: RequestInit) => {
      const body = init?.body as URLSearchParams;
      expect(body.get('secret')).toBe('secret');
      expect(body.get('response')).toBe('token');
      expect(body.get('remoteip')).toBe('203.0.113.1');
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    }) as unknown as typeof fetch;
    await verifyTurnstileToken('token', 'secret', '203.0.113.1', fetchImpl);
  });

  it('omits remoteip when not provided', async () => {
    const fetchImpl = vi.fn(async (_url: string, init?: RequestInit) => {
      const body = init?.body as URLSearchParams;
      expect(body.has('remoteip')).toBe(false);
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    }) as unknown as typeof fetch;
    await verifyTurnstileToken('token', 'secret', undefined, fetchImpl);
  });

  it('returns failure with error codes on a failing siteverify response', async () => {
    const fetchImpl = mockFetch({ success: false, 'error-codes': ['invalid-input-response'] });
    const result = await verifyTurnstileToken('bad-token', 'secret', undefined, fetchImpl);
    expect(result.success).toBe(false);
    expect(result.errorCodes).toEqual(['invalid-input-response']);
  });

  it('fails closed on a non-2xx HTTP response', async () => {
    const fetchImpl = mockFetch({ success: true }, 500);
    const result = await verifyTurnstileToken('token', 'secret', undefined, fetchImpl);
    expect(result.success).toBe(false);
    expect(result.errorCodes[0]).toContain('siteverify-http-500');
  });

  it('fails closed on a network error', async () => {
    const fetchImpl = vi.fn(async () => {
      throw new Error('network down');
    }) as unknown as typeof fetch;
    const result = await verifyTurnstileToken('token', 'secret', undefined, fetchImpl);
    expect(result.success).toBe(false);
    expect(result.errorCodes).toEqual(['siteverify-network-error']);
  });
});
