// Acceptance checks for the capability pages: the /capabilities/ hub and the
// five family pages rendered by components/CapabilityPage.astro, rebuilt
// 2026-09-13 (plans/capabilities-consolidation-plan.md).
//
// Asserted against the BUILT HTML, as test/expertise-topic-template.test.ts
// does, because what regressed before was a property of what shipped: the
// six lifecycle stages named one way on the homepage and another way here, a
// photo placeholder on a crawlable page, and five mega-menu links pointing at
// one anchor.
import { readFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { beforeAll, describe, expect, it } from 'vitest';
import { stages } from '../src/data/lifecycle';
import { marketMechanisms } from '../src/data/market-mechanisms';
import { capabilityFamilies, CAPABILITY_SLUGS, expertiseForCapability, stageDetails, offeringAnchor } from '../src/data/capabilities';
import { approachMenu, claimsMenu, capabilitiesMenu } from '../src/data/nav-data';
import { segmentsForCapability } from '../src/data/who-we-work-with';

const TEST_DIRECTORY = dirname(fileURLToPath(import.meta.url));
const APP_ROOT = resolve(TEST_DIRECTORY, '..');
const DIST = resolve(APP_ROOT, 'dist/client');
const SITE = 'https://terra.nexus';

const html: Record<string, string> = {};
const pageFor = (path: string) => resolve(DIST, path.replace(/^\//, ''), 'index.html');

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
  html.hub = await readFile(pageFor('/capabilities/'), 'utf8');
  for (const slug of CAPABILITY_SLUGS) {
    html[slug] = await readFile(pageFor(`/capabilities/${slug}/`), 'utf8');
  }
}, 240_000);

const decode = (s: string) => s.replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"');
const encode = (s: string) => s.replace(/&/g, '&amp;');
const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const sectionIds = (source: string) =>
  Array.from(source.matchAll(/<section[^>]*\sid="([a-z-]+)"/g)).map((m) => m[1]);
const h3s = (source: string) =>
  Array.from(source.matchAll(/<h3[^>]*>(.*?)<\/h3>/gs)).map((m) => decode(m[1].replace(/<[^>]+>/g, '').trim()));
const count = (source: string, pattern: RegExp) => (source.match(pattern) ?? []).length;
// Astro appends a scoped-style attribute to every element in a template with
// a <style> block, so opening tags are matched loosely.
const openTag = (tag: string, attrs: string) => new RegExp(`<${tag} ${escapeRe(attrs)}[^>]*>`);

// The stage names the old hub and the old C&ES page used instead of the
// canonical ones. None may survive anywhere in the capabilities section.
const RETIRED_STAGE_NAMES = [
  'Design the Program',
  'Build the Operating Infrastructure',
  'Manage Client-Owned Programs',
  'Connect Performance to Claims and Market Value',
  'Manage & Verify',
  'Unlock Shared Value',
];

describe('capabilities hub', () => {
  it('names the six lifecycle stages the way lifecycle.ts does, with each stage’s detail list', () => {
    const headings = h3s(html.hub);
    for (const stage of stages) {
      expect(headings).toContain(stage.title);
      expect(html.hub).toContain(`id="stage-${stage.id}"`);
      for (const item of stageDetails[stage.id]) expect(html.hub).toContain(item);
    }
    for (const retired of RETIRED_STAGE_NAMES) expect(html.hub).not.toContain(retired);
  });

  it('carries the four market mechanisms and links into the deep selector', () => {
    for (const m of marketMechanisms) expect(html.hub).toContain(`data-mech-select="${m.id}"`);
    expect(html.hub).toContain('href="/capabilities/carbon-and-ecosystem-services/#mechanisms"');
  });

  it('lists all five families with their offerings, each linking to its page', () => {
    const headings = h3s(html.hub);
    for (const slug of CAPABILITY_SLUGS) {
      const family = capabilityFamilies[slug];
      expect(html.hub).toContain(`id="${slug}"`);
      expect(headings).toContain(family.name);
      expect(html.hub).toContain(`href="/capabilities/${slug}/"`);
      for (const offering of family.offerings) expect(html.hub).toContain(encode(offering.name));
    }
  });

  it('has a section rail whose entries all resolve to an id on the page', () => {
    const railTargets = Array.from(html.hub.matchAll(/data-rail-item="([a-z-]+)"/g)).map((m) => m[1]);
    expect(railTargets).toEqual(['approach', 'markets', ...CAPABILITY_SLUGS]);
    for (const id of railTargets) expect(html.hub).toContain(`id="${id}"`);
  });

  it('emits an absolute canonical and no inline styles', () => {
    expect(html.hub).toContain(`<link rel="canonical" href="${SITE}/capabilities/">`);
    expect(count(html.hub, /\sstyle="/g)).toBe(0);
  });
});

describe.each(CAPABILITY_SLUGS)('capability page: %s', (slug) => {
  const family = () => capabilityFamilies[slug];

  it('renders its sections in the fixed order, each present only when the record carries it', () => {
    const f = family();
    const expected = [
      ...(f.orientation.length > 0 ? ['overview'] : []),
      'decisions',
      ...(f.tool ? ['tool'] : []),
      ...(f.mechanisms ? ['mechanisms'] : []),
      ...(f.lifecycle ? ['lifecycle'] : []),
      'offerings',
      ...((expertiseForCapability[slug]?.length ?? 0) > 0 || (segmentsForCapability[slug]?.length ?? 0) > 0 ? ['expertise'] : []),
      ...(f.proofNote ? ['proof'] : []),
    ];
    expect(sectionIds(html[slug])).toEqual(expected);
  });

  it('renders every offering as an h3 and every sub-offering as a disclosure row', () => {
    const f = family();
    const headings = h3s(html[slug]);
    for (const offering of f.offerings) expect(headings).toContain(offering.name);
    const subOfferings = f.offerings.flatMap((o) => o.subOfferings);
    expect(count(html[slug], /<details class="disclosure"/g)).toBe(subOfferings.length);
    for (const sub of subOfferings) {
      expect(html[slug]).toMatch(new RegExp(`<span class="disclosure-name"[^>]*>${escapeRe(encode(sub.name))}</span>`));
    }
  });

  it('links to exactly the expertise topics derived from the topics’ own capability mapping', () => {
    const related = expertiseForCapability[slug] ?? [];
    const links = Array.from(html[slug].matchAll(/<a href="(\/expertise\/[a-z-]+\/)" class="tag"[^>]*>/g)).map((m) => m[1]);
    expect(links).toEqual(related.map((t) => t.href));
  });

  it('renders the core question, scope boundary and decision owners from the stable record', () => {
    const f = family();
    expect(html[slug]).toContain(`id="decisions-h"`);
    expect(html[slug]).toContain(encode(f.coreQuestion));
    expect(html[slug]).toContain(encode(f.scopeBoundary));
    for (const owner of f.decisionOwners) expect(html[slug]).toContain(encode(owner));
  });

  it('links to the audiences derived from the segments’ own capability lists', () => {
    const expected = (segmentsForCapability[slug] ?? []).map((a) => `/who-we-work-with/#${a.slug}`);
    const links = Array.from(html[slug].matchAll(/<a href="(\/who-we-work-with\/#[a-z-]+)" class="tag"[^>]*>/g)).map((m) => m[1]);
    expect(links).toEqual(expected);
    expect(expected.length).toBeGreaterThan(0);
  });

  it('renders every approved offering detail: description, question, problems, deliverables', () => {
    for (const offering of family().offerings) {
      if (!offering.detail) continue;
      expect(html[slug]).toContain(encode(offering.detail.description));
      expect(html[slug]).toContain(encode(offering.detail.coreQuestion));
      for (const item of [...offering.detail.decisionOwners, ...offering.detail.problems, ...offering.detail.deliverables]) {
        expect(html[slug]).toContain(encode(item));
      }
    }
  });

  it('closes with the onward links, including the glossary', () => {
    for (const href of ['/capabilities/', '/expertise/', '/who-we-work-with/', '/digital-solutions/', '/glossary/']) {
      expect(html[slug]).toContain(`href="${href}"`);
    }
  });

  it('emits an absolute canonical, no inline styles, and no placeholder artwork', () => {
    expect(html[slug]).toContain(`<link rel="canonical" href="${SITE}/capabilities/${slug}/">`);
    expect(count(html[slug], /\sstyle="/g)).toBe(0);
    expect(html[slug]).not.toMatch(/placeholder/i);
    for (const retired of RETIRED_STAGE_NAMES) expect(html[slug]).not.toContain(retired);
  });
});

describe('capability page: carbon-and-ecosystem-services', () => {
  const slug = 'carbon-and-ecosystem-services';

  it('carries an approved detail block on every one of its seven offerings', () => {
    const offerings = capabilityFamilies[slug].offerings;
    expect(offerings.length).toBe(7);
    for (const o of offerings) expect(o.detail, o.name).toBeDefined();
  });

  it('renders the interactive mechanism selector with a deep-linkable id per mechanism', () => {
    expect(html[slug]).toContain('id="mechanisms"');
    for (const m of marketMechanisms) {
      expect(html[slug]).toMatch(openTag('li', `id="${m.id}"`));
      // Every detail panel is in the served HTML, hidden on the inactive ones.
      expect(html[slug]).toContain(`data-mech-detail="${m.id}"`);
    }
    expect(count(html[slug], /data-mech-detail="m\d+" hidden/g)).toBe(marketMechanisms.length - 1);
  });

  it('labels its lifecycle notes with the canonical stage numbers and titles', () => {
    const f = capabilityFamilies[slug];
    for (const stage of stages) {
      expect(html[slug]).toContain(encode(stage.title));
      const note = f.lifecycle?.notes[stage.id];
      expect(note, `note for ${stage.id}`).toBeDefined();
      expect(h3s(html[slug])).toContain(note!.title);
    }
  });

  it('renders the comparison band directly before the closing band', () => {
    const comparisonAt = html[slug].indexOf('class="cap-comparison"');
    const closingAt = html[slug].indexOf('id="final-cta-heading"');
    expect(comparisonAt).toBeGreaterThan(0);
    expect(closingAt).toBeGreaterThan(comparisonAt);
    for (const cell of capabilityFamilies[slug].comparison!.cells) expect(html[slug]).toContain(cell.label);
  });
});

// ── Structured data, meta lengths, stable anchors (2026-09-13, Tier 1 of
// plans/capabilities-depth-seo-ux-plan.md) ────────────────────────────────
const jsonLd = (source: string): any[] => {
  const m = source.match(/<script type="application\/ld\+json"[^>]*>(.*?)<\/script>/s);
  expect(m, 'ld+json script present').toBeTruthy();
  const parsed = JSON.parse(m![1]);
  expect(parsed['@context']).toBe('https://schema.org');
  return parsed['@graph'];
};
const ofType = (graph: any[], type: string) => graph.filter((n) => n['@type'] === type);

describe('structured data', () => {
  it('homepage carries Organization and WebSite', async () => {
    const graph = jsonLd(await readFile(pageFor('/'), 'utf8'));
    const org = ofType(graph, 'Organization')[0];
    expect(org?.url).toBe(`${SITE}/`);
    expect(org?.logo?.url).toMatch(/^https:\/\/terra\.nexus\/brand\//);
    expect(ofType(graph, 'WebSite')[0]?.publisher?.['@id']).toBe(org['@id']);
  });

  it('hub carries a two-item breadcrumb', () => {
    const bc = ofType(jsonLd(html.hub), 'BreadcrumbList')[0];
    expect(bc.itemListElement.map((i: any) => i.name)).toEqual(['Home', 'Capabilities']);
    expect(bc.itemListElement.at(-1).item).toBe(`${SITE}/capabilities/`);
  });

  it.each(CAPABILITY_SLUGS)('%s carries breadcrumbs and a Service with one Offer per offering', (slug) => {
    const family = capabilityFamilies[slug];
    const graph = jsonLd(html[slug]);
    const bc = ofType(graph, 'BreadcrumbList')[0];
    expect(bc.itemListElement.map((i: any) => i.name)).toEqual(['Home', 'Capabilities', family.name]);
    const svc = ofType(graph, 'Service')[0];
    expect(svc.name).toBe(family.name);
    expect(svc.provider['@id']).toBe(`${SITE}/#organization`);
    const offers = svc.hasOfferCatalog.itemListElement;
    expect(offers.map((o: any) => o.itemOffered.name)).toEqual(family.offerings.map((o) => o.name));
    // Every offer url is an anchor that exists on the page.
    for (const o of offers) {
      const [, hash] = o.itemOffered.url.split('#');
      expect(html[slug], hash).toContain(`id="${hash}"`);
    }
  });
});

describe('meta lengths, every built page', () => {
  const walk = async (dir: string): Promise<string[]> => {
    const { readdir } = await import('node:fs/promises');
    const out: string[] = [];
    for (const e of await readdir(dir, { withFileTypes: true })) {
      const p = resolve(dir, e.name);
      if (e.isDirectory()) out.push(...(await walk(p)));
      else if (e.name === 'index.html') out.push(p);
    }
    return out;
  };

  it('keeps every description at 155 characters or fewer and every title at 70 or fewer', async () => {
    const pages = await walk(DIST);
    expect(pages.length).toBeGreaterThan(20);
    const over: string[] = [];
    for (const p of pages) {
      const source = await readFile(p, 'utf8');
      const desc = source.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '';
      const title = source.match(/<title>([^<]*)<\/title>/)?.[1] ?? '';
      // The one case-study route builds its title and description from the
      // owner-approved OKF proof record (title 90, description 208 on
      // 2026-09-13). Trimming it means editing an approved record, so it is
      // flagged for the owner and excluded here; everything else is
      // site-authored and held to the limit.
      if (p.includes('case-studies')) continue;
      if (desc.length > 155 || title.length > 70) over.push(`${p} title=${title.length} desc=${desc.length}`);
    }
    expect(over).toEqual([]);
  });
});

describe('stable offering anchors', () => {
  it.each(CAPABILITY_SLUGS)('%s: anchors are unique slugs of the offering names', (slug) => {
    const anchors = capabilityFamilies[slug].offerings.map((o) => offeringAnchor(o.name));
    expect(new Set(anchors).size).toBe(anchors.length);
    for (const a of anchors) {
      expect(a).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
      expect(html[slug]).toContain(`id="${a}"`);
    }
    expect(html[slug]).not.toContain('id="offering-1"');
  });

  it('the hub links every offering name to its anchor on the family page', () => {
    for (const slug of CAPABILITY_SLUGS) {
      for (const o of capabilityFamilies[slug].offerings) {
        expect(html.hub).toContain(`href="/capabilities/${slug}/#${offeringAnchor(o.name)}"`);
      }
    }
  });
});

describe('capabilities mega-menu', () => {
  // Every menu entry with a fragment must land on an element with that id on
  // the page it names. The /who-we-work-with/ session added the same check
  // for the Industries menu after a 570px anchor miss; this is the
  // Capabilities equivalent.
  const entries = [...approachMenu, ...claimsMenu, ...capabilitiesMenu];

  it.each(entries.map((e) => [e.title, e.href] as const))('%s → %s resolves', async (_title, href) => {
    const [path, hash] = href.split('#');
    const page = await readFile(pageFor(path), 'utf8');
    if (hash) expect(page, `#${hash} on ${path}`).toContain(`id="${hash}"`);
  });

  it('gives the Markets & Claims column one distinct destination per mechanism, in selector order', () => {
    expect(claimsMenu.map((e) => e.title)).toEqual(marketMechanisms.map((m) => m.title));
    expect(new Set(claimsMenu.map((e) => e.href)).size).toBe(claimsMenu.length);
    for (const e of claimsMenu) expect(e.href).toMatch(/#m0\d$/);
  });
});
