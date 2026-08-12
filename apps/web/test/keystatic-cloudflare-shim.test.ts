// Compatibility coverage for the Keystatic/Cloudflare Astro-6 shim
// (src/pages/api/keystatic/[...params].ts). See
// docs/architecture/web-platform-architecture.md §6.1 for the upstream
// bug this works around.
//
// Scope: this repository owns sourcing env vars from `cloudflare:workers`
// and forwarding the request/response to Keystatic's public
// `makeGenericAPIRouteHandler`. These tests assert *that* boundary — that
// the route no longer throws on env access, and that env values reach the
// handler — under a real `workerd` runtime (via Wrangler's programmatic
// `unstable_dev`), not Keystatic's own OAuth/session behavior, which stays
// out of scope per CLAUDE.md/§7 of the M6 session brief.
import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { rm } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { unstable_dev } from 'wrangler';

const TEST_DIRECTORY = dirname(fileURLToPath(import.meta.url));
const APP_ROOT = resolve(TEST_DIRECTORY, '..');
// Isolated from the default dist/ — astro-foundation.test.ts builds there
// concurrently (Vitest runs test files in parallel by default), and two
// builds racing on the same output directory corrupts both on Windows.
// .test-tmp/ is this repo's existing gitignored scratch convention.
const OUT_DIR = resolve(APP_ROOT, '.test-tmp/keystatic-shim-dist');

// The Keystatic integration (and this shim's target route pattern) is only
// registered when SKIP_KEYSTATIC is unset, and the shim only becomes
// meaningful with GitHub storage selected — mirrors the real preview build
// invocation documented in .claude/skills/keystatic-mdx/SKILL.md.
function buildForGithubStorage(): void {
  const result = spawnSync(
    process.execPath,
    [resolve(APP_ROOT, 'scripts/run-astro.mjs'), 'build', '--outDir', OUT_DIR],
    {
      cwd: APP_ROOT,
      env: {
        ...process.env,
        SKIP_KEYSTATIC: 'false',
        PUBLIC_KEYSTATIC_STORAGE_KIND: 'github',
        ASTRO_TELEMETRY_DISABLED: '1',
      },
      encoding: 'utf8',
    }
  );
  expect(result.status, `${result.error?.message ?? ''}\n${result.stdout}\n${result.stderr}`).toBe(0);
}

describe('Keystatic/Cloudflare compatibility shim', () => {
  let worker: Awaited<ReturnType<typeof unstable_dev>>;

  beforeAll(async () => {
    buildForGithubStorage();
    const entry = resolve(OUT_DIR, 'server/entry.mjs');
    const wranglerConfig = resolve(OUT_DIR, 'server/wrangler.json');
    expect(existsSync(entry), 'expected dist/server/entry.mjs from a GitHub-storage build').toBe(true);

    worker = await unstable_dev(entry, {
      config: wranglerConfig,
      persist: false,
      // Intentionally no KEYSTATIC_GITHUB_CLIENT_ID/SECRET/KEYSTATIC_SECRET
      // here — the first test below asserts the pre-credentials-check
      // behavior. A second `unstable_dev` instance with dummy vars covers
      // the "credentials reach the handler" assertion.
      vars: {},
    });
  }, 120_000);

  afterAll(async () => {
    await worker?.stop();
  });

  it('no longer throws the removed Astro.locals.runtime.env error', async () => {
    const res = await worker.fetch('/api/keystatic/session');
    const body = await res.text();
    expect(body).not.toContain('Astro.locals.runtime.env has been removed');
    expect(body).not.toContain('locals.runtime.env');
  });

  it('reaches the generic Keystatic handler (fails on missing GitHub config, not a runtime crash)', async () => {
    const res = await worker.fetch('/api/keystatic/session');
    // No credentials configured: Keystatic core's own config validation is
    // what throws here (visible in the worker's own log as "Missing
    // required config in Keystatic API setup... KEYSTATIC_GITHUB_CLIENT_ID"
    // — Astro/Workers doesn't leak that message into the HTTP response body
    // by design, so we assert on status + the absence of the original
    // crash, not on response body content). Still 500, but a *different*
    // 500 than the one this shim exists to fix — proof the request made it
    // past env access into makeGenericAPIRouteHandler.
    expect(res.status).toBe(500);
    const body = await res.text();
    expect(body).not.toContain('Astro.locals.runtime.env');
  });
});

describe('Keystatic/Cloudflare compatibility shim — with credentials configured', () => {
  let worker: Awaited<ReturnType<typeof unstable_dev>>;

  beforeAll(async () => {
    const entry = resolve(OUT_DIR, 'server/entry.mjs');
    const wranglerConfig = resolve(OUT_DIR, 'server/wrangler.json');

    worker = await unstable_dev(entry, {
      config: wranglerConfig,
      persist: false,
      vars: {
        // Test-only placeholder values — never real credentials. Proves the
        // shim's cloudflare:workers env values reach
        // makeGenericAPIRouteHandler's config, not that GitHub OAuth itself
        // succeeds (out of scope — see file header).
        KEYSTATIC_GITHUB_CLIENT_ID: 'test-client-id-not-real',
        KEYSTATIC_GITHUB_CLIENT_SECRET: 'test-client-secret-not-real',
        KEYSTATIC_SECRET: 'test-secret-value-not-real-xxxxxxxxxxxxxxxx',
      },
    });
  }, 120_000);

  afterAll(async () => {
    await worker?.stop();
    await rm(OUT_DIR, { recursive: true, force: true });
  });

  it('passes configured env values through to the handler (no longer a config error, no runtime crash)', async () => {
    const res = await worker.fetch('/api/keystatic/session');
    const body = await res.text();
    expect(body).not.toContain('Astro.locals.runtime.env has been removed');
    expect(body).not.toContain('Missing required config');
    // Keystatic's own routing takes over from here (this path isn't a real
    // sub-route) — a clean 404 from Keystatic core, not a 500 crash.
    expect(res.status).not.toBe(500);
  });
});
