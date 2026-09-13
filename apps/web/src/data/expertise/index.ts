// Expertise topic records, keyed by slug.
//
// All nine topics now run on the ExpertiseTopicPage template: the five
// production topics (Regenerative Rangeland, Regenerative Agriculture,
// Agroforestry, Aquaculture, and the cross-cutting Biodiversity & Ecosystem
// Resilience) and the four value-chain topics (Sustainable Supply Chains,
// Low Carbon Energy & Biofuels, Purpose-Driven Food Brands & Retailers, and
// Food Waste). components/ExpertisePage.astro no longer has any callers.
import type { ExpertiseTopic } from './types';
import { regenerativeRangeland } from './regenerative-rangeland';
import { regenerativeAgriculture } from './regenerative-agriculture';
import { agroforestry } from './agroforestry';
import { aquaculture } from './aquaculture';
import { biodiversityAndEcosystemResilience } from './biodiversity-and-ecosystem-resilience';
import { sustainableSupplyChains } from './sustainable-supply-chains';
import { lowCarbonEnergyAndBiofuels } from './low-carbon-energy-and-biofuels';
import { purposeDrivenFoodBrandsAndRetailers } from './purpose-driven-food-brands-and-retailers';
import { foodWastePreventionDiversionRecovery } from './food-waste-prevention-diversion-recovery';

export const expertiseTopics: Record<string, ExpertiseTopic> = {
  'regenerative-rangeland': regenerativeRangeland,
  'regenerative-agriculture': regenerativeAgriculture,
  agroforestry,
  aquaculture,
  'biodiversity-and-ecosystem-resilience': biodiversityAndEcosystemResilience,
  'sustainable-supply-chains': sustainableSupplyChains,
  'low-carbon-energy-and-biofuels': lowCarbonEnergyAndBiofuels,
  'purpose-driven-food-brands-and-retailers': purposeDrivenFoodBrandsAndRetailers,
  'food-waste-prevention-diversion-recovery': foodWastePreventionDiversionRecovery,
};

export {
  regenerativeRangeland,
  regenerativeAgriculture,
  agroforestry,
  aquaculture,
  biodiversityAndEcosystemResilience,
  sustainableSupplyChains,
  lowCarbonEnergyAndBiofuels,
  purposeDrivenFoodBrandsAndRetailers,
  foodWastePreventionDiversionRecovery,
};
export * from './types';
export * from './shared';
