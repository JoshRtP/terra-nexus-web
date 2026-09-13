// Capability family records, keyed by slug, plus the capability-to-expertise
// mapping. Mirrors data/expertise/index.ts.
//
// Added 2026-09-13 (Phase 1 of plans/capabilities-consolidation-plan.md). The
// five families were previously described in six places — four inline `data`
// objects, the bespoke Carbon & Ecosystem Services page, and `capabilityAreas`
// in ../lifecycle.ts — with nothing tying them together.
import { capabilityAreas } from '../lifecycle';
import { expertiseTopics } from '../expertise';
import { validationQuestions } from '../expertise/shared';
import type { CapabilityFamily, CapabilityFamilyRecord } from './types';
import { strategyAndInnovation } from './strategy-and-innovation';
import { financialInvestmentsAndNewVentureDevelopment } from './financial-investments-and-new-venture-development';
import { sustainableSupplyChainAndOperations } from './sustainable-supply-chain-and-operations';
import { corporateSustainability } from './corporate-sustainability';
import { carbonAndEcosystemServices } from './carbon-and-ecosystem-services';

const records: Record<string, CapabilityFamilyRecord> = {
  'strategy-and-innovation': strategyAndInnovation,
  'financial-investments-and-new-venture-development': financialInvestmentsAndNewVentureDevelopment,
  'sustainable-supply-chain-and-operations': sustainableSupplyChainAndOperations,
  'corporate-sustainability': corporateSustainability,
  'carbon-and-ecosystem-services': carbonAndEcosystemServices,
};

/** The five slugs in the site's canonical order: `capabilityAreas`' order,
 * which is also the homepage's. */
export const CAPABILITY_SLUGS: string[] = capabilityAreas.map((a) => a.slug);

/** Each family's record merged with its `capabilityAreas` entry, so name,
 * slug and summary have exactly one source. Throws at build if the two lists
 * ever disagree about which families exist. */
export const capabilityFamilies: Record<string, CapabilityFamily> = Object.fromEntries(
  capabilityAreas.map((area) => {
    const record = records[area.slug];
    if (!record) throw new Error(`No capability family record for '${area.slug}' (listed in lifecycle.ts capabilityAreas)`);
    return [area.slug, { ...record, slug: area.slug, name: area.title, summary: area.description }];
  }),
);
for (const slug of Object.keys(records)) {
  if (!capabilityFamilies[slug]) throw new Error(`Capability family '${slug}' has a record but no lifecycle.ts capabilityAreas entry`);
}

export const capabilityHref = (slug: string) => `/capabilities/${slug}/`;

// ─────────────────────────────────────────────────────────────────────────
// Capability → expertise, inverted from the expertise topics' own section-06
// mapping.
//
// Every expertise topic already says which capability family answers each of
// its decision-owner question groups (`validationQuestions[topic][].capHref`,
// lifted from each topic's approved `decisionGroups`). Inverting that gives
// each family the topics it is actually named on, without a second
// hand-maintained list — the same move `segmentsForExpertise` makes for
// audiences in ../who-we-work-with.ts.
//
// This replaces the four templated pages' previous `relatedExpertise`
// lists, which named all nine topics on every page and so distinguished
// nothing. Result at time of writing (measured on the built pages): Strategy
// & Innovation and Sustainable Supply Chain & Operations still name all nine
// (their teams appear in every topic's question groups), Carbon & Ecosystem
// Services eight, Corporate Sustainability seven, Financial Investments & New
// Venture Development three. The two all-nine families are what the data
// says, not a fallback; if the owner wants them narrower, the place to do it
// is the topics' own `decisionGroups`, not a list here.
// ─────────────────────────────────────────────────────────────────────────
export interface RelatedTopic {
  slug: string;
  name: string;
  href: string;
}

export const expertiseForCapability: Record<string, RelatedTopic[]> = (() => {
  const out: Record<string, RelatedTopic[]> = Object.fromEntries(CAPABILITY_SLUGS.map((s) => [s, []]));
  // Iterate in expertiseTopics' own order so each family lists topics the way
  // the Expertise index does: production topics first, then value chains.
  for (const [topicSlug, topic] of Object.entries(expertiseTopics)) {
    const groups = validationQuestions[topicSlug] ?? [];
    const seen = new Set<string>();
    for (const group of groups) {
      const capSlug = group.capHref.replace('/capabilities/', '').replace(/\/$/, '');
      if (!out[capSlug]) throw new Error(`validationQuestions['${topicSlug}'] links to unknown capability '${capSlug}'`);
      if (seen.has(capSlug)) continue;
      seen.add(capSlug);
      out[capSlug].push({ slug: topicSlug, name: topic.name, href: `/expertise/${topicSlug}/` });
    }
  }
  return out;
})();

export {
  strategyAndInnovation,
  financialInvestmentsAndNewVentureDevelopment,
  sustainableSupplyChainAndOperations,
  corporateSustainability,
  carbonAndEcosystemServices,
};
export * from './types';
export * from './approach';
