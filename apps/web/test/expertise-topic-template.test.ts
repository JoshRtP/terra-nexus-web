// Acceptance checks for the expertise topic template
// (components/ExpertiseTopicPage.astro), built 2026-09-12 from the design
// prototype in plans/ExpertiseTemplate-Upgrade.zip.
//
// These assert against the BUILT HTML rather than the source, because the two
// requirements most likely to regress are both properties of what actually
// ships: every selector panel present with `hidden` on the inactive ones (the
// filter must hide, never remove — it is roughly three times the indexable
// body copy), and no inline styles surviving the port from the inline-styled
// prototype. A source-level test would pass while the served page was wrong.
import { readFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { beforeAll, describe, expect, it } from 'vitest';
import { stages } from '../src/data/lifecycle';
import {
  expertiseTopics,
  TOOL_WIDTHS,
  topicHeroPhotoIds,
  validationRows,
  categoryToRegion,
} from '../src/data/expertise';
import { expertiseTools } from '../src/data/expertise/tools';

const TEST_DIRECTORY = dirname(fileURLToPath(import.meta.url));
const APP_ROOT = resolve(TEST_DIRECTORY, '..');
const DIST = resolve(APP_ROOT, 'dist/client');

const TOPIC_SLUGS = [
  'regenerative-rangeland',
  'regenerative-agriculture',
  'agroforestry',
  'aquaculture',
  'biodiversity-and-ecosystem-resilience',
] as const;
/** astro.config.ts's `site`. Canonical, og:url and og:image all resolve against it. */
const SITE = 'https://terra.nexus';
const html: Record<string, string> = {};

/** Builds production output. Deliberately not reusing whatever dist/ happens
 * to be on disk: astro-foundation.test.ts leaves a PREVIEW build behind, and a
 * stale dist from an earlier branch would make these assertions meaningless. */
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
  for (const slug of TOPIC_SLUGS) {
    html[slug] = await readFile(resolve(DIST, `expertise/${slug}/index.html`), 'utf8');
  }
}, 240_000);

/** Counts non-overlapping matches. */
const count = (source: string, pattern: RegExp) => (source.match(pattern) ?? []).length;

describe.each(TOPIC_SLUGS)('expertise topic template: %s', (slug) => {
  const topic = () => expertiseTopics[slug];

  it('renders the ten sections in the fixed order, each labelled by its own h2', () => {
    const ids = Array.from(html[slug].matchAll(/<section[^>]*\sid="([a-z]+)"[^>]*aria-labelledby="([a-z-]+)"/g));
    const order = [
      'overview',
      'potential',
      'correcting',
      'investments',
      'adoption',
      'fit',
      'verifying',
      'pathways',
      'approach',
      'enablers',
    ];
    expect(ids.map((m) => m[1])).toEqual(
      topic().enablers.tools.length > 0 ? order : order.filter((id) => id !== 'enablers'),
    );
    // Each section points at its own heading, and that id exists.
    for (const [, id, labelledBy] of ids) {
      expect(labelledBy).toBe(`${id}-h`);
      expect(html[slug]).toContain(`id="${labelledBy}"`);
    }
  });

  // The acceptance item that was a live bug in the prototype: panels must be
  // in the served HTML with `hidden` on the inactive ones, never rendered
  // conditionally. Exactly one of each set is visible.
  it.each([
    ['pathway', /data-mech-detail="m\d+"/g, /data-mech-detail="m\d+" hidden/g, 4],
    ['lifecycle stage', /data-stage-panel="[a-z]+"/g, /data-stage-panel="[a-z]+" hidden/g, 6],
    ['framework region', /data-dvf-panel="[a-z-]+"/g, /data-dvf-panel="[a-z-]+" hidden/g, 5],
  ])('ships every %s panel with hidden on the inactive ones', (_label, all, hidden, expected) => {
    expect(count(html[slug], all)).toBe(expected);
    expect(count(html[slug], hidden)).toBe(expected - 1);
  });

  it('ships every intervention panel with hidden on the inactive ones', () => {
    const total = topic().investments.interventions.length;
    expect(total).toBeGreaterThan(0);
    expect(count(html[slug], /data-iv-panel="[a-z]+"/g)).toBe(total);
    expect(count(html[slug], /data-iv-panel="[a-z]+" hidden/g)).toBe(total - 1);
    // The tab list is complete too — the filter hides tabs, it does not omit them.
    expect(count(html[slug], /data-iv="[a-z]+"/g)).toBe(total);
  });

  it('takes its hero photo from the shared registry, not a second literal', () => {
    // The same photo used to be declared in the topic record and again in the
    // /expertise/ index tile, with nothing keeping the two in step.
    const id = topicHeroPhotoIds[slug];
    expect(id, `no hero photo registered for ${slug}`).toBeTruthy();
    expect(html[slug]).toContain(`photos/${id}/pexels-photo-${id}.jpeg`);
  });

  it('uses the site section rhythm and shared primitives, not a parallel set', () => {
    // Full-bleed .section / .section-alt with .container inside, as on every
    // other page — the prototype banded everything inside one container.
    // Ten sections, or nine for a topic whose tools are not assigned yet —
    // section 10 is omitted rather than rendered empty.
    const expectedSections = topic().enablers.tools.length > 0 ? 10 : 9;
    expect(count(html[slug], /<section class="section[^"]*" id="/g)).toBe(expectedSections);
    expect(count(html[slug], /<div class="container"/g)).toBeGreaterThanOrEqual(expectedSections);
    // The M7 primitives rather than local near-misses.
    for (const primitive of ['class="eyebrow', 'class="section-lead', 'class="section-header', 'class="card-grid', 'class="stat-value']) {
      expect(html[slug], primitive).toContain(primitive);
    }
    // Section numbers belong to the rail, not the section headings (owner,
    // 2026-09-12): ahead of a heading they read as an ordinal to track.
    expect(html[slug]).not.toContain('class="numbered-index');
    // One rail entry per rendered section — nine where section 10 is omitted.
    expect(count(html[slug], /class="journey-rail-num"/g)).toBe(expectedSections);
  });

  it('exposes the indicator filter as a radio group with one tab stop', () => {
    // Exactly one indicator is ever active, which is what aria-checked on a
    // radio says and what aria-pressed on six independent toggles does not.
    expect(html[slug]).toContain('role="radiogroup"');
    // One chip per indicator this topic defines, plus All. Five indicators on
    // the production topics, six on Agroforestry.
    expect(count(html[slug], /role="radio"/g)).toBe(topic().correcting.indicators.length + 1);
    expect(count(html[slug], /aria-checked="true"/g)).toBe(1);
    expect(count(html[slug], /data-impact="[a-z]+"[^>]*tabindex="0"|tabindex="0"[^>]*data-impact="[a-z]+"/g)).toBe(1);
    // The visible count must not be a live region — it changes when the reader
    // arrows through the intervention list too, and re-announcing it on every
    // keypress is noise. A separate status region announces filter changes.
    expect(html[slug]).not.toMatch(/class="xp-iv-count"[^>]*aria-live/);
    expect(html[slug]).toMatch(/data-iv-status/);
  });

  it('carries the empty state for a filter that matches nothing', () => {
    expect(html[slug]).toMatch(/data-iv-empty/);
    expect(html[slug]).toContain('No interventions in this topic are tagged to that indicator');
  });

  // Fourteen phrases that were spans in the old pages, outside the document
  // outline and invisible to search.
  it('promotes the fourteen search-relevant phrases to h3', () => {
    const h3s = Array.from(html[slug].matchAll(/<h3[^>]*>([^<]+)<\/h3>/g)).map((m) =>
      m[1].replace(/&amp;/g, '&').trim(),
    );
    const expected = [
      ...topic().correcting.indicators.map((i) => i.name),
      ...topic().verifying.layers.map((l) => l.name),
      ...topic().pathways.items.filter((p) => p.applicable !== false).map((p) => p.name),
    ];
    // Fourteen on a five-indicator topic, fifteen on Agroforestry's six. The
    // count follows the topic's own indicator set rather than a fixed number.
    expect(expected.length).toBe(topic().correcting.indicators.length + 9);
    for (const phrase of expected) expect(h3s).toContain(phrase);
  });

  it('introduces no inline style attributes of its own', () => {
    const inline = Array.from(html[slug].matchAll(/style="([^"]*)"/g)).map((m) => m[1]);
    // PageHero's media variant sets the hero background-image inline because
    // the URL is per topic. That one is the production component's, not this
    // template's, and is the only inline style allowed through.
    expect(inline.filter((s) => !s.startsWith('background-image: url('))).toEqual([]);
  });

  it('links out from sections 04, 06, 08, 09, 10 and the closing CTA row', () => {
    const links = topic().links;
    expect(html[slug]).toContain(`href="${links.whoWeWorkWith.href}"`); // 04 + CTA
    expect(html[slug]).toContain(`href="${links.markets.href}"`); // 08
    expect(html[slug]).toContain(`href="${links.capabilities.href}"`); // 09 + CTA
    expect(html[slug]).toContain(`href="${links.digital.href}"`); // 10 + CTA
    expect(html[slug]).toContain(`href="${links.expertise.href}"`); // CTA
    expect(html[slug]).toContain(`href="${links.caseStudies.href}"`); // CTA
    // The closing band is the site-wide ClosingCta, not a page-local one, so
    // all 18 pages that close with a CTA close the same way.
    expect(html[slug]).toMatch(/<section class="section section-dark"/);
    expect(html[slug]).toMatch(/class="cta-links"/);
    // 06 — one capability link per functional-fit card.
    for (const group of ['strategy-and-innovation', 'corporate-sustainability', 'carbon-and-ecosystem-services']) {
      expect(html[slug]).toContain(`href="/capabilities/${group}/"`);
    }
  });

  it('renders lifecycle stage copy identical to the homepage source', () => {
    for (const stage of stages) {
      expect(html[slug]).toContain(`data-stage-panel="${stage.id}"`);
      // Entity-encoded the same way Astro escapes it — including the
      // apostrophes in "the company's footprint", which become &#39;.
      const escaped = stage.description
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
      expect(html[slug]).toContain(escaped);
    }
  });

  it('emits an absolute per-topic canonical, and an og:image that exists', async () => {
    // Absolute, not the root-relative path the record stores: a relative
    // canonical is legal but absolute is the recommendation, and og:url has to
    // be absolute to work at all. SITE comes from astro.config.ts.
    expect(html[slug]).toContain(`<link rel="canonical" href="${SITE}${topic().meta.canonical}">`);
    expect(html[slug]).toContain(`<meta property="og:url" content="${SITE}${topic().meta.canonical}">`);
    // The handover specified /images/live-site/og-<slug>.jpg for both topics
    // and neither file was ever created, so the pages shipped a 404 social
    // preview. Whatever og:image the page emits has to resolve to a real file.
    const og = html[slug].match(/property="og:image" content="([^"]+)"/)?.[1];
    expect(og, 'og:image missing').toBeTruthy();
    expect(og!.startsWith(SITE), 'og:image must be absolute').toBe(true);
    await expect(readFile(resolve(DIST, og!.slice(SITE.length + 1)))).resolves.toBeDefined();
  });

  it('points every tool screenshot at an unframed render that exists', async () => {
    for (const ref of topic().enablers.tools) {
      const tool = expertiseTools[ref.id];
      expect(tool, `unknown tool id '${ref.id}'`).toBeTruthy();
      // The brand kit's unframed 16:9 heroes — Digital Solutions owns the
      // device-mockup treatment, so these deliberately are not the framed set.
      expect(tool.asset, tool.name).toMatch(/-16x9-dark$/);
      for (const width of TOOL_WIDTHS) {
        const file = resolve(DIST, `images/product-ui/${tool.asset}-${width}w.webp`);
        await expect(readFile(file)).resolves.toBeDefined();
      }
    }
  });

  // The indicator list is the single source for section 03's accordion and
  // section 04's filter chips. Before 2026-09-12 those were two structures that
  // happened to agree, because the first two topics shipped with the same five
  // production indicators; an intervention tagged to a key the topic does not
  // define would render a chip that filters everything away.
  it('tags every intervention with indicator keys this topic actually defines', () => {
    const keys = new Set(topic().correcting.indicators.map((i) => i.key));
    expect(keys.size).toBe(topic().correcting.indicators.length);
    for (const iv of topic().investments.interventions) {
      for (const key of iv.impacts) {
        expect(keys.has(key), `${iv.name} is tagged '${key}', not an indicator of ${slug}`).toBe(true);
      }
    }
  });

  // An empty framework region renders a panel with a heading and nothing under
  // it. Rangeland needed one row authored for exactly this reason.
  it('covers all four framework regions in its validation rows', () => {
    const covered = new Set((validationRows[slug] ?? []).map((r) => categoryToRegion[r.category]));
    for (const region of ['desirable', 'viable', 'feasible', 'strategic-fit'] as const) {
      expect(covered.has(region), `${slug} has no ${region} row — section 06 would show an empty panel`).toBe(true);
    }
  });

  // Section 10 is omitted for a topic with no tools assigned yet, so the rail
  // must drop it too rather than linking at a missing #enablers.
  it('lists only sections that actually render in the section rail', () => {
    const railIds = Array.from(html[slug].matchAll(/data-rail-item="([a-z]+)"/g)).map((m) => m[1]);
    const sectionIds = Array.from(html[slug].matchAll(/<section class="section[^"]*" id="([a-z]+)"/g)).map((m) => m[1]);
    expect(railIds).toEqual(sectionIds);
  });
});

describe('expertise topic data model', () => {
  it('keeps the five per-topic fields that let one template serve all nine topics', () => {
    // Handover section 3.3: these must differ per record, not be shared, or a
    // later link in the same chain (supply chains, biofuels, brands, food
    // waste) would need a second template.
    const [rr, ag] = TOPIC_SLUGS.map((slug) => expertiseTopics[slug]);
    const names = (t: (typeof rr)['correcting']['indicators']) => t.map((i) => i.name).join();
    expect(rr.correcting.indicators.map((i) => i.issues.join())).not.toEqual(
      ag.correcting.indicators.map((i) => i.issues.join()),
    );
    expect(names(rr.correcting.indicators)).toBe(names(ag.correcting.indicators)); // same five indicator set
    expect(rr.adoption.constraints.map((c) => c.text)).not.toEqual(ag.adoption.constraints.map((c) => c.text));
    expect(rr.investments.frame.map((f) => f.title)).not.toEqual(ag.investments.frame.map((f) => f.title));
    expect(rr.enablers.tools.length).not.toBe(ag.enablers.tools.length);
    // The influence / incentive / mechanism triplet — what actually varies
    // across the nine when the practices are shared.
    for (const topic of [rr, ag]) {
      expect(topic.positioning.influence).toBeTruthy();
      expect(topic.positioning.incentive).toBeTruthy();
      expect(topic.positioning.mechanism).toBeTruthy();
    }
    expect(rr.positioning.mechanism).not.toBe(ag.positioning.mechanism);
  });

  it('attaches each indicator definition from the one shared source', () => {
    for (const slug of TOPIC_SLUGS) {
      for (const indicator of expertiseTopics[slug].correcting.indicators) {
        expect(indicator.definition, `${slug} / ${indicator.name}`).toBeTruthy();
      }
    }
    // Same indicator name, same definition string, across topics.
    const [rr, ag] = TOPIC_SLUGS.map((slug) => expertiseTopics[slug]);
    for (const indicator of rr.correcting.indicators) {
      const match = ag.correcting.indicators.find((i) => i.name === indicator.name);
      expect(match?.definition).toBe(indicator.definition);
    }
  });
});
