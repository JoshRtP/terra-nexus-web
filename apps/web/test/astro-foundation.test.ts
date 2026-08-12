import { createHash } from 'node:crypto';
import { readdir, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const TEST_DIRECTORY = dirname(fileURLToPath(import.meta.url));
const APP_ROOT = resolve(TEST_DIRECTORY, '..');
const REPOSITORY_ROOT = resolve(APP_ROOT, '../..');

async function fingerprint(directory: string): Promise<string> {
  const hash = createHash('sha256');
  const visit = async (current: string): Promise<void> => {
    const entries = await readdir(current, { withFileTypes: true });
    for (const entry of entries.sort((left, right) => left.name.localeCompare(right.name))) {
      const path = resolve(current, entry.name);
      if (entry.isDirectory()) {
        await visit(path);
      } else {
        hash.update(resolve(directory, path));
        hash.update(await readFile(path));
      }
    }
  };
  await visit(directory);
  return hash.digest('hex');
}

function build(mode: 'production' | 'preview'): void {
  const result = spawnSync(process.execPath, [resolve(APP_ROOT, 'scripts/run-astro.mjs'), 'build'], {
    cwd: APP_ROOT,
    env: { ...process.env, TNX_BUILD_MODE: mode, ASTRO_TELEMETRY_DISABLED: '1' },
    encoding: 'utf8',
  });
  expect(result.status, `${result.error?.message ?? ''}\n${result.stdout}\n${result.stderr}`).toBe(0);
}

describe('Astro static foundation', () => {
  it('builds production and preview safely with no source mutation', { timeout: 120_000 }, async () => {
    const beforeKnowledge = await fingerprint(resolve(REPOSITORY_ROOT, 'knowledge'));
    const beforeSchemas = await fingerprint(resolve(REPOSITORY_ROOT, 'schemas'));
    // The Cloudflare adapter (added 2026-08-12) splits build output into
    // dist/client (the deployable static assets Wrangler serves) and
    // dist/server (worker/prerender internals) — even with output: 'static'.
    // dist/client is the equivalent of the old flat dist/ this test checks.
    const dist = resolve(APP_ROOT, 'dist/client');
    const pilotRoute = 'commercial-pathways-lower-emissions-beef-2025';

    build('production');
    // The Keystatic/Cloudflare compat shim (src/lib/keystatic-cloudflare-shim.ts,
    // see docs/architecture/web-platform-architecture.md §6.1) is injected
    // only when Keystatic itself is mounted (SKIP_KEYSTATIC unset/false).
    // Default production builds (SKIP_KEYSTATIC=true, as here) must stay
    // fully static with zero on-demand routes — dist/server exists as an
    // (empty) build-internals directory even for pure static builds, but
    // entry.mjs (the actual worker script) must not — identical to pre-M6
    // build output.
    expect(existsSync(resolve(APP_ROOT, 'dist/server/entry.mjs'))).toBe(false);
    const productionIndex = await readFile(resolve(dist, 'index.html'), 'utf8');
    const productionRobots = await readFile(resolve(dist, 'robots.txt'), 'utf8');
    const productionCaseStudies = await readFile(resolve(dist, 'case-studies/index.html'), 'utf8');
    const productionDetail = await readFile(resolve(dist, `case-studies/${pilotRoute}/index.html`), 'utf8');

    expect(productionIndex).toContain('Terra Nexus');
    expect(productionIndex).toContain('Impact at the Intersection of Food');
    expect(productionIndex).not.toContain('noindex, nofollow');
    expect(productionRobots).toBe('User-agent: *\nDisallow:\n');

    expect(existsSync(resolve(dist, 'case-studies/index.html'))).toBe(true);
    expect(existsSync(resolve(dist, `case-studies/${pilotRoute}/index.html`))).toBe(true);
    expect(existsSync(resolve(dist, 'expertise/index.html'))).toBe(true);
    expect(existsSync(resolve(dist, 'capabilities/index.html'))).toBe(true);
    expect(existsSync(resolve(dist, 'who-we-work-with/index.html'))).toBe(true);
    expect(existsSync(resolve(dist, 'about/index.html'))).toBe(true);
    expect(existsSync(resolve(dist, 'contact/index.html'))).toBe(true);

    expect(productionCaseStudies).toContain(`href="/case-studies/${pilotRoute}"`);
    expect(productionDetail).toContain('Evaluating Commercial Pathways for Lower-Emissions Beef from Optimized Diets');
    expect(productionDetail).toContain('$12.5 million');
    expect(productionDetail).toContain('8.25%');
    expect(productionDetail).toContain('<table>');
    expect(productionDetail.match(/<h1(?:\s[^>]*)?>/g) ?? []).toHaveLength(1);
    for (const confidentialIdentifier of [
      ['Car', 'gill'].join(''),
      ['Beef', 'Max'].join(''),
    ]) {
      expect(productionDetail).not.toContain(confidentialIdentifier);
    }

    build('preview');
    const previewIndex = await readFile(resolve(dist, 'index.html'), 'utf8');
    const previewRobots = await readFile(resolve(dist, 'robots.txt'), 'utf8');
    const previewCaseStudies = await readFile(resolve(dist, 'case-studies/index.html'), 'utf8');
    const previewDetail = await readFile(resolve(dist, `case-studies/${pilotRoute}/index.html`), 'utf8');
    const previewGraph = await readFile(resolve(APP_ROOT, '.generated/content-graph.preview.json'), 'utf8');
    const previewGraphData = JSON.parse(previewGraph) as {
      mode: string;
      records: Array<{ body: unknown }>;
    };
    expect(previewIndex).toContain('noindex, nofollow');
    expect(previewCaseStudies).toContain('noindex, nofollow');
    expect(previewDetail).toContain('noindex, nofollow');
    expect(previewRobots).toBe('User-agent: *\nDisallow: /\n');
    expect(previewGraphData.mode).toBe('preview');
    expect(Array.isArray(previewGraphData.records)).toBe(true);
    expect(
      previewGraphData.records.every((record) => typeof record.body === 'string'),
    ).toBe(true);
    expect(previewGraph).not.toContain('proposal-only');

    expect(await fingerprint(resolve(REPOSITORY_ROOT, 'knowledge'))).toBe(beforeKnowledge);
    expect(await fingerprint(resolve(REPOSITORY_ROOT, 'schemas'))).toBe(beforeSchemas);
  });
});
