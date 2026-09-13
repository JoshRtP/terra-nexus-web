// Expertise topic records, keyed by slug.
//
// Five of the nine topics run on the ExpertiseTopicPage template today — the
// production topics: Regenerative Rangeland, Regenerative Agriculture,
// Agroforestry, Aquaculture, and the cross-cutting Biodiversity & Ecosystem
// Resilience. The four value-chain topics (Sustainable Supply Chains, Low
// Carbon Energy & Biofuels, Purpose-Driven Food Brands & Retailers, Food Waste)
// still use components/ExpertisePage.astro; add them here as each migrates.
import type { ExpertiseTopic } from './types';
import { regenerativeRangeland } from './regenerative-rangeland';
import { regenerativeAgriculture } from './regenerative-agriculture';
import { agroforestry } from './agroforestry';
import { aquaculture } from './aquaculture';
import { biodiversityAndEcosystemResilience } from './biodiversity-and-ecosystem-resilience';

export const expertiseTopics: Record<string, ExpertiseTopic> = {
  'regenerative-rangeland': regenerativeRangeland,
  'regenerative-agriculture': regenerativeAgriculture,
  agroforestry,
  aquaculture,
  'biodiversity-and-ecosystem-resilience': biodiversityAndEcosystemResilience,
};

export {
  regenerativeRangeland,
  regenerativeAgriculture,
  agroforestry,
  aquaculture,
  biodiversityAndEcosystemResilience,
};
export * from './types';
export * from './shared';
