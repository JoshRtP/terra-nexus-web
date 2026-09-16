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
  sustainabilityChessboard,
  sustainabilityEnterpriseValueMap,
  flatTactics,
  flatValueTree,
  codeUnder,
  tacticCount,
  tacticId,
  validateFramework,
  frameworkHref,
  TOOLS_INDEX_PATH,
  type Framework,
} from '../src/data/frameworks';
import { capabilityFamilies } from '../src/data/capabilities';
import { boardCss, boardRowCount, boardMatrixRows, onTint } from '../src/lib/framework-board-css';

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

  it('the Chessboard is a 2×2 matrix: 4 quadrants with distinct cells, 16 approaches, 64 levers', () => {
    const fw = sustainabilityChessboard;
    expect(fw.layout).toBe('matrix');
    expect(fw.matrix).toBeDefined();
    expect(fw.categories.length).toBe(4);
    expect(new Set(fw.categories.map((c) => c.cell!.join(','))).size).toBe(4);
    expect(fw.types.length).toBe(16);
    expect(tacticCount(fw)).toBe(64);
    for (const c of fw.categories) expect(fw.types.filter((t) => t.category === c.name).length).toBe(4);
  });

  it('the Value Map crosses 9 areas with a 40-line tree; every action sits on a real line', () => {
    const fw = sustainabilityEnterpriseValueMap;
    expect(fw.types.length).toBe(9);
    expect(tacticCount(fw)).toBe(893);
    const nodes = flatValueTree(fw.valueMap!.tree);
    const codes = new Set(nodes.map((n) => n.node.code));
    expect(nodes.filter((n) => !n.node.children).length).toBe(40);
    expect(fw.valueMap!.tree.map((r) => r.code)).toEqual(['rg', 'om', 'ae', 'ex']);
    for (const x of flatTactics(fw)) {
      expect(x.tactic.at!.length).toBeGreaterThan(0);
      for (const code of x.tactic.at!) expect(codes.has(code), code).toBe(true);
    }
    // Every action reaches a root, so the root-level map has no orphan.
    const roots = fw.valueMap!.tree.map((r) => r.code);
    for (const x of flatTactics(fw)) expect(x.tactic.at!.some((c) => roots.some((r) => codeUnder(c, r)))).toBe(true);
  });

  it('the validator rejects matrix and value-map mistakes', () => {
    const noCell = clone(sustainabilityChessboard);
    delete noCell.categories[0].cell;
    expect(() => validateFramework(noCell)).toThrow(/has no cell/);

    const sharedCell = clone(sustainabilityChessboard);
    sharedCell.categories[1].cell = [...sharedCell.categories[0].cell!];
    expect(() => validateFramework(sharedCell)).toThrow(/share matrix cell/);

    const badLine = clone(sustainabilityEnterpriseValueMap);
    badLine.types[0].tactics[0].at = ['rg.nope'];
    expect(() => validateFramework(badLine)).toThrow(/unknown value line/);

    const noLine = clone(sustainabilityEnterpriseValueMap);
    noLine.types[0].tactics[0].at = [];
    expect(() => validateFramework(noLine)).toThrow(/sits on no value line/);
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
    html.tools = await readFile(pageFor(TOOLS_INDEX_PATH), 'utf8');
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
      // Chips only on types with 30 tactics or fewer; larger types are dense rows.
      const chipTactics = fw().types.filter((t) => t.tactics.length <= 30).reduce((n, t) => n + t.tactics.length, 0);
      expect(count(page(), /<button type="button" class="fw-add" data-fw-toggle=/g)).toBe(tactics);
      expect(count(page(), /<button type="button" class="fw-chip"/g)).toBe(chipTactics);
      for (const t of fw().types) {
        if (t.tactics.length >= 25) expect(page()).toMatch(new RegExp(`id="type-${t.id}"[\\s\\S]*?class="fw-tactics fw-tactics-dense"`));
      }
      expect(page()).not.toMatch(/role="button"/);
      expect(page()).not.toMatch(/tabindex="0"/);
      expect(page()).not.toMatch(/mockup/i);
      expect(page()).not.toMatch(/terra\.nexus\/frameworks\/play/);
      expect(page()).toContain('<dialog class="fw-drawer"');
    });

    it('carries the meta, an absolute canonical and a breadcrumb through Capabilities, and no About section', () => {
      expect(page()).not.toContain('id="about"');
      expect(page()).not.toContain('About this framework');
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

  it('Strategy & Innovation embeds a board that drills down in place and still links into the tool', () => {
    const fw = frameworks[capabilityFamilies['strategy-and-innovation'].tool!.framework];
    const href = frameworkHref(fw.slug);
    expect(html.strategy).toContain('data-fw-variant="compact"');
    expect(html.strategy).toContain('id="tool"');
    // Every type link is a real link to the full tool (what happens with no
    // JS) and the script drills down in place instead.
    for (const t of fw.types) expect(html.strategy).toContain(`href="${href}#type-${t.id}"`);
    expect(html.strategy).toContain(`href="${href}" class="btn btn-secondary"`);
    // One detail panel per type, plus the drawer and the data the script needs.
    expect(count(html.strategy, /data-fw-view="detail"/g)).toBe(fw.types.length);
    for (const t of fw.types) expect(html.strategy).toContain(`id="type-${t.id}"`);
    for (const x of flatTactics(fw)) expect(html.strategy).toContain(`id="tactic-${x.id}"`);
    expect(html.strategy).toContain('data-fw-data');
    expect(html.strategy).toContain('<dialog class="fw-drawer"');
    // No play sheet in the embed: no add buttons, no sheet, no toolbar.
    expect(html.strategy).not.toContain('data-fw-view="play"');
    expect(html.strategy).not.toContain('class="fw-add"');
    expect(html.strategy).not.toContain('data-fw-toggle=');
    // Headings sit under the host section's h2.
    expect(html.strategy).toMatch(new RegExp(`<h3[^>]*id="type-${fw.types[0].id}-h"`));
    expect(count(html.strategy, /\sstyle="/g)).toBe(0);
    // Section order: the tool sits directly after the core question, before
    // the offerings. Page sections only — the viewer's own panels are not
    // `.section` elements.
    const ids = Array.from(html.strategy.matchAll(/<section class="section[^"]*" id="([a-z-]+)"/g)).map((m) => m[1]);
    expect(ids.indexOf('tool')).toBe(ids.indexOf('decisions') + 1);
    expect(ids.indexOf('offerings')).toBeGreaterThan(ids.indexOf('tool'));
  });

  it('every board column subgrids onto one set of rows, so the types line up', () => {
    for (const slug of FRAMEWORK_SLUGS) {
      const fw = frameworks[slug];
      // Header + the longest category's types + a note row, times the matrix
      // rows. Every column spans them, so row N lines up across the board.
      const tracks = boardRowCount(fw) * boardMatrixRows(fw);
      expect(boardRowCount(fw)).toBe(1 + Math.max(...fw.categories.map((c) => fw.types.filter((t) => t.category === c.name).length)) + (fw.categories.some((c) => c.note) ? 1 : 0));
      expect(html[slug]).toContain('@supports (grid-template-rows:subgrid)');
      expect(html[slug]).toContain(`.fw-board{grid-template-rows:repeat(${tracks},auto)}`);
      expect(html[slug]).toContain('.fw-board>.fw-col{display:grid;grid-template-rows:subgrid}');
    }
  });

  it('board colours come from the record and only ever reach the page as a style element', () => {
    const css = boardCss(tenTypesOfInnovation);
    for (const t of tenTypesOfInnovation.types) expect(css).toContain(`[data-fw-type="${t.id}"]{--fw-tint:${t.color}`);
    // The lightest tint takes navy text, the darkest white.
    expect(onTint('#9AA89B')).toBe('#131f48');
    expect(onTint('#131F48')).toBe('#ffffff');
  });

  it('the Ten Types board carries no category note', () => {
    expect(tenTypesOfInnovation.categories.every((c) => !c.note)).toBe(true);
    expect(html['ten-types-of-innovation']).not.toContain('WHY ONLY TWO');
    expect(html.strategy).not.toContain('WHY ONLY TWO');
  });

  it('the hub links to the Strategy tool and the footer links to the tools index', () => {
    const href = frameworkHref('ten-types-of-innovation');
    expect(html.hub).toContain(`href="${href}" class="hub-offering-link"`);
    // Footer anchors carry Astro's scoped-style attribute, so match loosely.
    const footerLink = new RegExp(`<a href="${TOOLS_INDEX_PATH}"[^>]*>Framework Tools</a>`);
    expect(html.hub).toMatch(footerLink);
    expect(html.strategy).toMatch(footerLink);
  });

  it('the tools index lists every framework with its counts and links to its page', () => {
    expect(html.tools).toContain(`<link rel="canonical" href="${SITE}${TOOLS_INDEX_PATH}">`);
    for (const slug of FRAMEWORK_SLUGS) {
      const fw = frameworks[slug];
      expect(html.tools).toContain(`href="${frameworkHref(slug)}"`);
      expect(html.tools).toContain(encode(fw.name));
      expect(html.tools).toContain(`${tacticCount(fw)} ${fw.labels.tacticPlural}`);
    }
    expect(count(html.tools, /\sstyle="/g)).toBe(0);
  });

  it('the Chessboard renders as a matrix with its axis labels, and the Value Map with its root grid', () => {
    const cb = sustainabilityChessboard;
    const cbPage = html[cb.slug];
    expect(cbPage).toContain('class="fw-board fw-board-matrix"');
    for (const label of [cb.matrix!.xLabel, cb.matrix!.yLabel, cb.matrix!.xLow, cb.matrix!.xHigh, cb.matrix!.yLow, cb.matrix!.yHigh]) {
      expect(cbPage).toContain(encode(label));
    }
    expect(cbPage).not.toContain('data-fw-view="map"');

    const vm = sustainabilityEnterpriseValueMap;
    const vmPage = html[vm.slug];
    expect(vmPage).toContain('data-fw-view="map"');
    expect(vmPage).toContain('href="#value-map"');
    expect(vmPage).toContain(`data-fw-map-cols="${vm.valueMap!.tree.length}"`);
    for (const root of vm.valueMap!.tree) expect(vmPage).toContain(`data-fw-map-col="${root.code}"`);
    // One root cell per area per driver; counts sum to at least the action
    // total (an action on two lines counts twice).
    expect(count(vmPage, /data-fw-map-cell="/g)).toBe(vm.types.length * vm.valueMap!.tree.length);
    const cellTotal = Array.from(vmPage.matchAll(/data-fw-map-cell="[^"]+"[^>]*>\s*(\d+|—)\s*</g))
      .map((m) => (m[1] === '—' ? 0 : Number(m[1])))
      .reduce((a, b) => a + b, 0);
    expect(cellTotal).toBeGreaterThanOrEqual(tacticCount(vm));
    // The Value Map has no examples, so no example furniture renders.
    expect(vmPage).not.toContain('No examples yet');
    expect(vmPage).not.toContain('In the field');
  });
});
