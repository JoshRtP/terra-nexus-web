// Acceptance checks for the framework viewer (components/FrameworkViewer.astro,
// pages/tools/[framework]/, data/frameworks/), added 2026-09-13 with the Ten
// Types of Innovation (plans/framework-viewer-plan.md).
//
// The data rules are asserted directly against the registry's validator.
// Everything a reader sees is asserted against the BUILT HTML, as the
// capability tests do, because the claims that matter are properties of the
// shipped page: every tactic is real HTML (crawlable, works before JS), the
// compact board on Strategy & Innovation links into the tool, and there is
// no inline styling anywhere.
import { readFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { beforeAll, describe, expect, it } from 'vitest';
import {
  frameworks,
  FRAMEWORK_SLUGS,
  tenTypesOfInnovation,
  flatTactics,
  tacticCount,
  tacticId,
  validateFramework,
  frameworkHref,
  type Framework,
} from '../src/data/frameworks';
import { capabilityFamilies } from '../src/data/capabilities';

const TEST_DIRECTORY = dirname(fileURLToPath(import.meta.url));
const APP_ROOT = resolve(TEST_DIRECTORY, '..');
const DIST = resolve(APP_ROOT, 'dist/client');
const SITE = 'https://terra.nexus';
const pageFor = (path: string) => resolve(DIST, path.replace(/^\//, ''), 'index.html');

const encode = (s: string) => s.replace(/&/g, '&amp;').replace(/'/g, '&#39;').replace(/"/g, '&quot;');
const count = (source: string, pattern: RegExp) => (source.match(pattern) ?? []).length;
const clone = (fw: Framework): Framework => JSON.parse(JSON.stringify(fw));

describe('framework records', () => {
  it('the Ten Types record has the published shape: 3 categories, 10 types, 112 tactics', () => {
    const fw = tenTypesOfInnovation;
    expect(fw.categories.map((c) => c.name)).toEqual(['Configuration', 'Offering', 'Experience']);
    expect(fw.types.length).toBe(10);
    expect(tacticCount(fw)).toBe(112);
    expect(fw.types.filter((t) => t.category === 'Configuration').length).toBe(4);
    expect(fw.types.filter((t) => t.category === 'Offering').length).toBe(2);
    expect(fw.types.filter((t) => t.category === 'Experience').length).toBe(4);
  });

  it('every type carries public examples, and the starter loads five real tactics', () => {
    const fw = tenTypesOfInnovation;
    for (const t of fw.types) expect(t.examples?.length, t.id).toBeGreaterThan(0);
    expect(fw.starter?.tactics.length).toBe(5);
    const ids = new Set(flatTactics(fw).map((x) => x.id));
    for (const id of fw.starter!.tactics) expect(ids.has(id), id).toBe(true);
  });

  it('tactic ids are unique, stable slugs prefixed by their type', () => {
    const all = flatTactics(tenTypesOfInnovation);
    expect(new Set(all.map((x) => x.id)).size).toBe(all.length);
    for (const x of all) expect(x.id).toMatch(new RegExp(`^${x.type.id}--[a-z0-9]+(-[a-z0-9]+)*$`));
    // The same tactic name under two types stays two ids.
    expect(tacticId('process', 'Process Automation')).not.toBe(tacticId('customer-engagement', 'Process Automation'));
    expect(tacticId('product-system', 'Extensions/Plug-ins')).toBe('product-system--extensions-plug-ins');
  });

  it('the validator rejects the mistakes a new framework record could make', () => {
    const base = tenTypesOfInnovation;
    expect(() => validateFramework(base)).not.toThrow();

    const unknownCategory = clone(base);
    unknownCategory.types[0].category = 'Nope';
    expect(() => validateFramework(unknownCategory)).toThrow(/unknown category/);

    const duplicateTactic = clone(base);
    duplicateTactic.types[0].tactics.push({ ...duplicateTactic.types[0].tactics[0] });
    expect(() => validateFramework(duplicateTactic)).toThrow(/two tactics that slug to/);

    const badStarter = clone(base);
    badStarter.starter!.tactics.push('profit-model--not-a-tactic');
    expect(() => validateFramework(badStarter)).toThrow(/unknown tactic/);

    const emptyCategory = clone(base);
    emptyCategory.categories.push({ name: 'Extra', focus: '', blurb: '', color: '#000000' });
    expect(() => validateFramework(emptyCategory)).toThrow(/has no types/);

    const badColour = clone(base);
    badColour.types[0].color = 'navy';
    expect(() => validateFramework(badColour)).toThrow(/not a six-digit hex/);
  });

  it('every registered framework is carried by at most one capability family', () => {
    const carriers = Object.values(capabilityFamilies).filter((f) => f.tool).map((f) => f.tool!.framework);
    for (const slug of carriers) expect(FRAMEWORK_SLUGS, slug).toContain(slug);
    expect(new Set(carriers).size).toBe(carriers.length);
  });
});

describe('built pages', () => {
  const html: Record<string, string> = {};

  beforeAll(async () => {
    const result = spawnSync(process.execPath, [resolve(APP_ROOT, 'scripts/run-astro.mjs'), 'build'], {
      cwd: APP_ROOT,
      env: {
        ...process.env,
        TNX_BUILD_MODE: 'production',
        PUBLIC_TNX_BUILD_MODE: 'production',
        ASTRO_TELEMETRY_DISABLED: '1',
      },
      encoding: 'utf8',
    });
    expect(result.status, `${result.error?.message ?? ''}\n${result.stdout}\n${result.stderr}`).toBe(0);
    for (const slug of FRAMEWORK_SLUGS) html[slug] = await readFile(pageFor(frameworkHref(slug)), 'utf8');
    html.strategy = await readFile(pageFor('/capabilities/strategy-and-innovation/'), 'utf8');
    html.hub = await readFile(pageFor('/capabilities/'), 'utf8');
  }, 240_000);

  describe.each(FRAMEWORK_SLUGS)('tool page: %s', (slug) => {
    const fw = () => frameworks[slug];
    const page = () => html[slug];

    it('renders every type as a linkable detail panel and every tactic as real HTML with a stable id', () => {
      for (const t of fw().types) {
        expect(page()).toContain(`id="type-${t.id}"`);
        expect(page()).toContain(`href="#type-${t.id}"`);
        expect(page()).toContain(`id="type-${t.id}-h"`);
      }
      for (const x of flatTactics(fw())) {
        expect(page()).toContain(`id="tactic-${x.id}"`);
        expect(page()).toContain(encode(x.tactic.description));
      }
      // One detail panel per type, all but the board hidden at load.
      expect(count(page(), /data-fw-view="detail"/g)).toBe(fw().types.length);
      expect(count(page(), /data-fw-view="board"/g)).toBe(1);
      expect(count(page(), /data-fw-view="play"/g)).toBe(1);
    });

    it('renders the company examples on the page, not only in the drawer', () => {
      for (const t of fw().types) for (const e of t.examples ?? []) expect(page()).toContain(encode(e.what));
      for (const x of flatTactics(fw())) for (const e of x.tactic.examples ?? []) expect(page()).toContain(encode(e.what));
    });

    it('uses real controls: buttons for every add, chip and drawer trigger, no keyboard shims, no fake share', () => {
      const tactics = tacticCount(fw());
      expect(count(page(), /<button type="button" class="fw-add"/g)).toBe(tactics);
      expect(count(page(), /<button type="button" class="fw-chip"/g)).toBe(tactics);
      expect(page()).not.toMatch(/role="button"/);
      expect(page()).not.toMatch(/tabindex="0"/);
      expect(page()).not.toMatch(/mockup/i);
      expect(page()).not.toMatch(/terra\.nexus\/frameworks\/play/);
      expect(page()).toContain('<dialog class="fw-drawer"');
    });

    it('carries the attribution, the meta, an absolute canonical and a breadcrumb through Capabilities', () => {
      for (const para of fw().attribution) expect(page()).toContain(encode(para));
      expect(page()).toContain(`<link rel="canonical" href="${SITE}${frameworkHref(slug)}">`);
      expect(page()).toContain(`<meta name="description" content="${encode(fw().metaDescription)}">`);
      const ld = page().match(/<script type="application\/ld\+json"[^>]*>(.*?)<\/script>/s);
      expect(ld).toBeTruthy();
      const graph = JSON.parse(ld![1])['@graph'];
      const bc = graph.find((n: any) => n['@type'] === 'BreadcrumbList');
      const names = bc.itemListElement.map((i: any) => i.name);
      expect(names[0]).toBe('Home');
      expect(names[1]).toBe('Capabilities');
      expect(names.at(-1)).toBe(fw().name);
      expect(bc.itemListElement.at(-1).item).toBe(`${SITE}${frameworkHref(slug)}`);
    });

    it('sets colours through a style element keyed by data attributes, never inline style attributes', () => {
      expect(count(page(), /\sstyle="/g)).toBe(0);
      for (const t of fw().types) expect(page()).toContain(`[data-fw-type="${t.id}"]{--fw-tint:${t.color}`);
      for (const [i, c] of fw().categories.entries()) expect(page()).toContain(`[data-fw-cat="${i}"]{--fw-cat:${c.color}`);
    });
  });

  it('Strategy & Innovation carries the compact board, each type linking into the tool, and the tool section in order', () => {
    const fw = frameworks[capabilityFamilies['strategy-and-innovation'].tool!.framework];
    const href = frameworkHref(fw.slug);
    expect(html.strategy).toContain('data-fw-variant="compact"');
    expect(html.strategy).toContain('id="tool"');
    for (const t of fw.types) expect(html.strategy).toContain(`href="${href}#type-${t.id}"`);
    expect(html.strategy).toContain(`href="${href}" class="btn btn-secondary"`);
    // Compact means the board only: no detail panels, no play sheet, no script data.
    expect(html.strategy).not.toContain('data-fw-view="detail"');
    expect(html.strategy).not.toContain('data-fw-data');
    expect(count(html.strategy, /\sstyle="/g)).toBe(0);
    // Section order: the tool sits directly after the offerings.
    const ids = Array.from(html.strategy.matchAll(/<section[^>]*\sid="([a-z-]+)"/g)).map((m) => m[1]);
    expect(ids.indexOf('tool')).toBe(ids.indexOf('offerings') + 1);
  });

  it('the hub and the footer link to the tool', () => {
    const href = frameworkHref('ten-types-of-innovation');
    expect(html.hub).toContain(`href="${href}" class="hub-offering-link"`);
    // Footer anchors carry Astro's scoped-style attribute, so match loosely.
    const footerLink = new RegExp(`<a href="${href}"[^>]*>Ten Types of Innovation</a>`);
    expect(html.hub).toMatch(footerLink);
    expect(html.strategy).toMatch(footerLink);
  });
});
