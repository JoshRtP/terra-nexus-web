// Expertise topic records, keyed by slug.
//
// Two of the nine topics run on the ExpertiseTopicPage template today
// (Regenerative Rangeland and Regenerative Agriculture). The other seven still
// use components/ExpertisePage.astro; add them here as each one migrates.
import type { ExpertiseTopic } from './types';
import { regenerativeRangeland } from './regenerative-rangeland';
import { regenerativeAgriculture } from './regenerative-agriculture';

export const expertiseTopics: Record<string, ExpertiseTopic> = {
  'regenerative-rangeland': regenerativeRangeland,
  'regenerative-agriculture': regenerativeAgriculture,
};

export { regenerativeRangeland, regenerativeAgriculture };
export * from './types';
export * from './shared';
