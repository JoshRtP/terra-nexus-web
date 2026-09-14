// Site-wide link and anchor check against the built output (pre-launch plan
// §E, 2026-09-13). Every internal href on every page must resolve to a built
// page, a served file, or a configured redirect, and every fragment must
// resolve to an id on its target page. The capability test does this for one
// mega-menu; this does it for everything, so a renamed section id or a
// retired route fails the build rather than shipping a dead link.
//
// Also holds served images to a size budget, since the 16 MB palette sheet
// listed as a known issue in CLAUDE.md sat in public/ for a month unnoticed.
import { readFile, readdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { dirname, resolve, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { beforeAll, describe, expect, it } from 'vitest';

const TEST_DIRECTORY = dirname(fileURLToPath(import.meta.url));
const APP_ROOT = resolve(TEST_DIRECTORY, '..');
const DIST = resolve(APP_ROOT, 'dist/client');

/** Redirect sources from astro.config.ts. Read from the config file's text
 * rather than importing it, so this test needs no Astro runtime. */
const redirectSources = async (): Promise<Set<string>> => {
  const config = await readFile(resolve(APP_ROOT, 'astro.config.ts'), 'utf8');
  const block = config.match(/redirects:\s*\{([\s\S]*?)\n\s*\},/)?.[1] ?? '';
  return new Set(Array.from(block.matchAll(/'(\/[^']*)':/g)).map((m) => m[1]));
};

const walk = async (dir: string): Promise<string[]> => {
  const out: string[] = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = resolve(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else out.push(p);
  }
  return out;
};

/** Routes rendered on demand by the Worker (`export const prerender = false`)
 * have no file in dist/client. Derived from the page sources so a new
 * on-demand route is picked up without editing this test: `insights/index.astro`
 * covers `/insights/`, `insights/[slug].astro` would cover `/insights/<anything>`. */
const onDemandPrefixes = async (): Promise<string[]> => {
  const pagesDir = resolve(APP_ROOT, 'src/pages');
  const out: string[] = [];
  for (const f of await walk(pagesDir)) {
    if (!/\.(astro|ts)$/.test(f)) continue;
    const source = await readFile(f, 'utf8');
    if (!/export const prerender = false/.test(source)) continue;
    const rel = f.slice(pagesDir.length + 1).split('\\').join('/').replace(/\.(astro|ts)$/, '');
    const route = '/' + rel.replace(/\/?index$/, '').replace(/\[[^\]]+\]$/, '');
    out.push(route.endsWith('/') ? route : `${route}/`);
  }
  return out;
};

const pages: Record<string, string> = {};
let redirects: Set<string>;
let onDemand: string[];
let files: string[];

beforeAll(async () => {
  const result = spawnSync(process.execPath, [resolve(APP_ROOT, 'scripts/run-astro.mjs'), 'build'], {
    cwd: APP_ROOT,
    env: { ...process.env, TNX_BUILD_MODE: 'production', PUBLIC_TNX_BUILD_MODE: 'production', ASTRO_TELEMETRY_DISABLED: '1' },
    encoding: 'utf8',
  });
  expect(result.status, `${result.error?.message ?? ''}\n${result.stdout}\n${result.stderr}`).toBe(0);
  files = await walk(DIST);
  for (const f of files.filter((f) => f.endsWith('.html'))) {
    const route = '/' + f.slice(DIST.length + 1).split('\\').join('/');
    pages[route] = await readFile(f, 'utf8');
  }
  redirects = await redirectSources();
  onDemand = await onDemandPrefixes();
}, 240_000);

/** Resolves an internal path to the built file it would be served from. */
const served = (path: string): boolean => {
  const clean = path.split('?')[0];
  if (redirects.has(clean.replace(/\/$/, '')) || redirects.has(clean)) return true;
  if (onDemand.some((prefix) => clean === prefix || clean.startsWith(prefix))) return true;
  const candidates = clean.endsWith('/')
    ? [`${clean}index.html`]
    : extname(clean)
      ? [clean]
      : [`${clean}/index.html`, `${clean}.html`];
  return candidates.some((c) => existsSync(resolve(DIST, c.replace(/^\//, ''))));
};

const idsOf = (html: string) => new Set(Array.from(html.matchAll(/\sid="([^"]+)"/g)).map((m) => m[1]));

describe('site-wide links', () => {
  it('builds more than twenty pages plus a 404', () => {
    expect(Object.keys(pages).length).toBeGreaterThan(20);
    expect(pages['/404.html']).toBeDefined();
  });

  it('every internal href resolves to a built page, a served file or a redirect', () => {
    const broken: string[] = [];
    for (const [route, html] of Object.entries(pages)) {
      for (const m of html.matchAll(/\shref="(\/[^"#]*)(#[^"]*)?"/g)) {
        const path = m[1];
        // Keystatic's admin and the contact API are runtime routes, not files.
        if (path.startsWith('/keystatic') || path.startsWith('/api/')) continue;
        if (!served(path)) broken.push(`${route} → ${path}`);
      }
    }
    expect(broken).toEqual([]);
  });

  it('every fragment resolves to an id on its target page', () => {
    const missing: string[] = [];
    for (const [route, html] of Object.entries(pages)) {
      const ownIds = idsOf(html);
      for (const m of html.matchAll(/\shref="([^"]*)#([^"]+)"/g)) {
        const [, base, hash] = m;
        if (!hash || hash === 'main-content') continue;
        let targetIds = ownIds;
        if (base && base !== '' && base.startsWith('/')) {
          const clean = base.split('?')[0];
          const targetRoute = clean.endsWith('/') ? `${clean}index.html` : clean;
          const target = pages[targetRoute];
          if (!target) {
            // A redirect source with a fragment is resolved by the browser
            // against the destination; the redirect's own test covers it. An
            // on-demand route has no built HTML to check ids against.
            if (redirects.has(clean.replace(/\/$/, ''))) continue;
            if (onDemand.some((prefix) => clean === prefix || clean.startsWith(prefix))) continue;
            missing.push(`${route} → ${base}#${hash} (no such page)`);
            continue;
          }
          targetIds = idsOf(target);
        } else if (base && !base.startsWith('/')) {
          continue; // external
        }
        if (!targetIds.has(hash)) missing.push(`${route} → ${base}#${hash}`);
      }
    }
    expect(missing).toEqual([]);
  });

  it('serves no image over 1.5 MB', async () => {
    const over: string[] = [];
    for (const f of files) {
      if (!/\.(png|jpe?g|webp|gif|avif|svg)$/i.test(f)) continue;
      const { size } = await stat(f);
      if (size > 1.5 * 1024 * 1024) over.push(`${f.slice(DIST.length + 1)} ${Math.round(size / 1024)} KB`);
    }
    expect(over).toEqual([]);
  });
});
