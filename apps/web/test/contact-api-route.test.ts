// Integration coverage for src/pages/api/contact.ts under a real `workerd`
// runtime (via Wrangler's programmatic `unstable_dev`) — mirrors the
// pattern established in test/keystatic-cloudflare-shim.test.ts. Scope is
// deliberately limited to request wiring (body parsing, validation
// short-circuiting, and the "not configured" path) — it does not call the
// real Cloudflare Turnstile siteverify endpoint or the real Resend API.
// Those integrations are covered in isolation with an injected fetch in
// test/contact-turnstile.test.ts and test/contact-email.test.ts. A true
// end-to-end test (real Turnstile dummy keys + a real Resend sandbox call)
// is a manual verification step in plans/contact-form-production.md, not an
// automated one — it needs real, provisioned credentials this repo doesn't
// have.
import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { rm } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { unstable_dev } from 'wrangler';

const TEST_DIRECTORY = dirname(fileURLToPath(import.meta.url));
const APP_ROOT = resolve(TEST_DIRECTORY, '..');
// Isolated output dir — same rationale as keystatic-cloudflare-shim.test.ts
// (Vitest runs test files in parallel; racing builds on one dist/ corrupts
// both on Windows).
const OUT_DIR = resolve(APP_ROOT, '.test-tmp/contact-api-dist');

function buildProduction(): void {
  const result = spawnSync(process.execPath, [resolve(APP_ROOT, 'scripts/run-astro.mjs'), 'build', '--outDir', OUT_DIR], {
    cwd: APP_ROOT,
    env: { ...process.env, ASTRO_TELEMETRY_DISABLED: '1' },
    encoding: 'utf8',
  });
  expect(result.status, `${result.error?.message ?? ''}\n${result.stdout}\n${result.stderr}`).toBe(0);
}

async function postJson(worker: Awaited<ReturnType<typeof unstable_dev>>, body: unknown) {
  return worker.fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

const VALID_PAYLOAD = {
  name: 'Ada Lovelace',
  email: 'ada@example.com',
  challenge: 'We need help scaling a pilot program.',
  consent: true,
  turnstileToken: 'test-token',
};

describe('/api/contact route — no env configured', () => {
  let worker: Awaited<ReturnType<typeof unstable_dev>>;

  beforeAll(async () => {
    buildProduction();
    const entry = resolve(OUT_DIR, 'server/entry.mjs');
    const wranglerConfig = resolve(OUT_DIR, 'server/wrangler.json');
    expect(existsSync(entry), 'expected dist/server/entry.mjs from a production build').toBe(true);

    worker = await unstable_dev(entry, { config: wranglerConfig, persist: false, vars: {} });
  }, 120_000);

  afterAll(async () => {
    await worker?.stop();
    await rm(OUT_DIR, { recursive: true, force: true });
  });

  it('rejects an invalid payload with 400 before touching env/Turnstile/Resend', async () => {
    const res = await postJson(worker, { name: '' });
    expect(res.status).toBe(400);
    const body = (await res.json()) as { ok: boolean; errors?: Record<string, string> };
    expect(body.ok).toBe(false);
    expect(body.errors?.name).toBeTruthy();
    expect(body.errors?.email).toBeTruthy();
  });

  it('rejects a non-object body with 400', async () => {
    const res = await worker.fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify('just a string'),
    });
    expect(res.status).toBe(400);
  });

  it('returns a clear 500 (not a crash) when required config is missing', async () => {
    const res = await postJson(worker, VALID_PAYLOAD);
    expect(res.status).toBe(500);
    const body = (await res.json()) as { ok: boolean; message: string };
    expect(body.ok).toBe(false);
    expect(body.message).toContain('not yet configured');
  });

  it('rejects GET (only POST is exported)', async () => {
    const res = await worker.fetch('/api/contact', { method: 'GET' });
    expect(res.status).toBe(404);
  });
});
