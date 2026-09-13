// Expertise topic records, keyed by slug.
//
// Three of the nine topics run on the ExpertiseTopicPage template today
// (Regenerative Rangeland, Regenerative Agriculture, Agroforestry). The other
// six still use components/ExpertisePage.astro; add them here as each migrates.
import type { ExpertiseTopic } from './types';
import { regenerativeRangeland } from './regenerative-rangeland';
import { regenerativeAgriculture } from './regenerative-agriculture';
import { agroforestry } from './agroforestry';

export const expertiseTopics: Record<string, ExpertiseTopic> = {
  'regenerative-rangeland': regenerativeRangeland,
  'regenerative-agriculture': regenerativeAgriculture,
  agroforestry,
};

export { regenerativeRangeland, regenerativeAgriculture, agroforestry };
export * from './types';
export * from './shared';
