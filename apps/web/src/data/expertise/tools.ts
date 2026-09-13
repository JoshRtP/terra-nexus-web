// Section 10 tool catalogue — every product screen a topic page can show.
//
// One entry per render that actually exists in
// brand/product-ui/09-web-export/04-hero-16x9 (unframed 16:9, dark), copied
// into public/images/product-ui/ at 960w and 1440w. Topics reference these by
// id (`enablers.tools: [{ id: 'soil-carbon-prediction' }]`) so the asset path
// and alt text are written once rather than retyped per topic, and a tool can
// be renamed or re-rendered in one place.
//
// `text` here is the default description. A topic may override it where it
// genuinely describes the same tool differently — Regen Ag's soil carbon entry
// says "practice change" where Rangeland says "management change".
//
// ─────────────────────────────────────────────────────────────────────────────
// ASSIGNING TOOLS TO TOPICS — owner input needed (2026-09-12)
//
// Which tools honestly serve which topic is a product-truth call, not one the
// website agent should make. Seven topics are being migrated onto the topic
// template; each starts with `tools: []`, which omits section 10 and drops it
// from the section rail rather than showing a thin or wrong list.
//
// To assign, add ids to that topic's `enablers.tools`, e.g.
//
//     tools: [
//       { id: 'soil-carbon-prediction' },
//       { id: 'asset-pricing-optimization' },
//     ],
//
// Available ids are the keys of `expertiseTools` below. Current assignments:
//
//   regenerative-agriculture  soil-carbon-prediction, biofuels-origination,
//                             crop-carbon-intensity, dmrv-audit-verification,
//                             asset-pricing-optimization
//   regenerative-rangeland    soil-carbon-prediction, enteric-emissions,
//                             grazing-detection, asset-pricing-optimization
//   agroforestry              (none yet — awaiting owner assignment)
//   the remaining six         not migrated yet
//
// `food-waste-platform` has no topic using it yet and is the obvious candidate
// for Food Waste; `biofuels-origination` likewise for Low Carbon Energy &
// Biofuels. Both are listed here so the render is already wired when those
// topics are built.
// ─────────────────────────────────────────────────────────────────────────────

export interface ToolDefinition {
  name: string;
  /** Default description. Overridable per topic via `ToolRef.text`. */
  text: string;
  /** Asset base name under /images/product-ui/, without the width suffix.
   * Widths come from TOOL_WIDTHS in ./shared.ts. */
  asset: string;
  /** What the screen actually shows. Adapted from the brand kit's own
   * descriptions (brand/product-ui/09-web-export/alt-text.md), with its
   * "as a product hero" framing dropped — that describes the asset's role in
   * the kit, not what a reader would see. */
  alt: string;
}

export const expertiseTools: Record<string, ToolDefinition> = {
  'soil-carbon-prediction': {
    name: 'Soil Carbon Prediction',
    text: 'Digital soil mapping and biogeochemical modeling that forecasts soil organic carbon trajectories and quantifies the carbon benefit of a management change before it is implemented.',
    asset: 'terranexus-soil-carbon-prediction-16x9-dark',
    alt: 'Soil Carbon Prediction dashboard showing a 50-year six-model ensemble with 1,000 Monte Carlo iterations, SOC trajectories, and benefit and economic-value distributions.',
  },
  'biofuels-origination': {
    name: 'Biofuels Origination Economics',
    text: 'Low-carbon-intensity feedstock evaluation that maps supply against processing capacity, so sourcing decisions start from where the qualifying material actually is.',
    asset: 'terranexus-biofuels-origination-16x9-dark',
    alt: 'Biofuels Origination Economics dashboard showing a US county choropleth of carbon-intensity impact for corn under cover crop and no till, with the county results table.',
  },
  'crop-carbon-intensity': {
    name: 'Crop Carbon Intensity',
    text: 'Field-level greenhouse gas breakdowns and volume-weighted carbon intensity, benchmarked against GREET defaults.',
    asset: 'terranexus-crop-carbon-intensity-16x9-dark',
    alt: 'Crop Carbon Intensity dashboard showing GREET volume-weighted carbon intensity for corn with a seven-line greenhouse gas breakdown.',
  },
  'dmrv-audit-verification': {
    name: 'Practice Detection, Audit & Due Diligence',
    text: 'Independent remote-sensing verification of practices and soil health indicators, with an audit-ready export a third-party reviewer can act on directly.',
    asset: 'terranexus-dmrv-audit-verification-16x9-dark',
    alt: 'Audit and diligence verification dashboard showing cover-crop and tillage classification over a Sentinel-2 field polygon, with a 24-frame MODIS NDVI season curve.',
  },
  'asset-pricing-optimization': {
    name: 'Environmental Asset Pricing & Stranded Claims Optimization',
    text: 'Optimizes bid allocation and development economics across a program, and surfaces the value left on the table when eligible supply goes undeveloped.',
    asset: 'terranexus-asset-pricing-optimization-16x9-dark',
    alt: "Environmental Asset Pricing and Stranded Claims Optimization dashboard showing a supply-to-demand insetting allocation with the unenrolled farm's stranded claim broken out.",
  },
  'enteric-emissions': {
    name: 'Enteric Emissions',
    text: 'Herd-level methane accounting built around composition, feed and management, so the largest part of the footprint is measured where it is produced.',
    asset: 'terranexus-enteric-emissions-16x9-dark',
    alt: 'Enteric Emissions dashboard showing VM0042 herd methane for 350 head across two cohorts, with the emission-factor adjustment.',
  },
  'grazing-detection': {
    name: 'Grazing Practice Detection',
    text: 'Remote-sensing detection of grazing events, rest periods and biomass response, so a rotational grazing claim carries evidence a reviewer can test.',
    asset: 'terranexus-grazing-detection-16x9-dark',
    alt: 'Grazing Detection dashboard showing a rotational grazing event on an NDVI paddock map with a 10-week biomass recovery curve.',
  },
  // Not yet used by any topic. Wired here so Food Waste can reference it the
  // moment that topic is built.
  'food-waste-platform': {
    name: 'Food Waste Platform',
    text: 'Tracks prevention, diversion and recovery across sites and streams, so the highest practical use of each material is visible before it is written off.',
    asset: 'terranexus-food-waste-platform-16x9-dark',
    alt: 'Food Waste Platform dashboard showing prevention, diversion and recovery volumes by stream with the resulting diversion rate.',
  },
};

export type ToolId = keyof typeof expertiseTools;
