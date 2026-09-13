// Topic-agnostic exports for the expertise topic page template.
//
// PROVENANCE
//  * `dvfRegions` descriptions are verbatim from StrategyFrameworkDVF.astro's
//    DEFAULT_CONTENT; `categoryToRegion` is production's own mapping, lifted
//    from the regenerative-agriculture page.
//  * `validationRows` and `validationQuestions` are lifted per topic from each
//    topic's previous index.astro (`validationRows` / `decisionGroups`), not
//    retyped — except the one row marked AUTHORED below.
//  * Pathway names, taglines and carriers follow src/data/market-mechanisms.ts.
//  * `lifecycle` is re-exported from src/data/lifecycle.ts so stage copy has a
//    single source shared with the homepage Approach band. Do not copy it here.
//
// NEEDS OWNER REVIEW BEFORE PUBLISH (handover section 7)
//  * `indicatorDefinitions` — authored here, not the WWF indicator set.
//  * the rangeland Desirability row in `validationRows` — marked AUTHORED.
//  * each topic's `overview.stats` and `pathways[].examples` (see the topic
//    record files).
import { stages, type Stage } from '../lifecycle';
import type { Indicator, ExpertiseTopic } from './types';

/** The six development lifecycle stages, section 09. Single source of truth
 * lives in ../lifecycle.ts and is shared with the homepage Approach band —
 * re-exported rather than copied so the two cannot drift. */
export const lifecycle: Stage[] = stages;
export type { Stage };

/** The label for the section 04 filter chip that clears the filter. The other
 * chips are the topic's own indicators, so there is no shared chip list: that
 * was the thing keeping section 03 and section 04 in two parallel structures. */
export const ALL_INDICATORS_LABEL = 'All';

/** Definitions for the indicators that recur across the production topics, so
 * Regen Ag, Rangeland and Agroforestry do not each retype them. A topic with
 * an indicator of its own supplies `definition` inline on that indicator
 * instead; `attachDefinitions` leaves anything already set alone.
 * AUTHORED — needs owner review before publish. */
export const indicatorDefinitions: Record<string, string> = {
  Climate:
    'Greenhouse gases released and removed across the production system, and how much of it each unit of output carries. Agriculture and land-use change account for roughly a quarter of global emissions, and soil is one of the few sinks large enough to matter.',
  Soil:
    'The physical, chemical and biological condition of the soil, including organic matter, structure, and its capacity to hold water and nutrients. It is the asset that determines whether every other outcome is achievable.',
  Water:
    'The quantity and quality of water moving through the system, from infiltration and storage on site to what leaves it and what that does downstream.',
  'Land & biodiversity':
    'The extent and condition of habitat, the diversity of species it supports, and whether land is being converted or held in production. Converted land does not return to habitat on any useful timescale.',
  'Resilience & productivity':
    'The capacity of the operation to absorb a shock, keep producing through it and recover afterward, and the output it achieves relative to the land, inputs and labor required. Productivity is a function of resilience: an operation that cannot withstand the shifting climate cannot produce reliably through it.',
};

/** Attaches the shared definition to each of a topic's indicators, so the
 * definition strings live here only. Applied by each topic record module. */
export function attachDefinitions(indicators: Indicator[]): Indicator[] {
  return indicators.map((i) => ({
    ...i,
    definition: i.definition ?? indicatorDefinitions[i.name] ?? '',
  }));
}

export interface DvfRegion {
  id: 'desirable' | 'feasible' | 'viable' | 'strategic-fit' | 'desirable-feasible-viable';
  label: string;
  description: string;
}

/** Verbatim from StrategyFrameworkDVF.astro's DEFAULT_CONTENT. */
export const dvfRegions: DvfRegion[] = [
  {
    id: 'desirable',
    label: 'Desirable',
    description: 'What do customers and stakeholders actually need or want?',
  },
  {
    id: 'feasible',
    label: 'Feasible',
    description: 'Can we realistically deliver it: technically, operationally, and organizationally?',
  },
  {
    id: 'viable',
    label: 'Viable',
    description: 'Can it create sustainable value, whether commercially, financially, or in some other way?',
  },
  {
    id: 'strategic-fit',
    label: 'Strategic Fit Only',
    description:
      'Does this direction advance where the organization is actually trying to go? Strategic Fit is the boundary within which desirability, feasibility, and viability get evaluated, not a fourth criterion sitting beside them.',
  },
  {
    id: 'desirable-feasible-viable',
    label: 'All Three',
    description:
      'Great opportunities sit at the intersection of what people want, what we can deliver, and what creates value. All of that gets weighed within Strategic Fit.',
  },
];

/** Production's own mapping, from the regenerative-agriculture page. */
export const categoryToRegion: Record<string, DvfRegion['id']> = {
  Desirability: 'desirable',
  Viability: 'viable',
  Feasibility: 'feasible',
  'Strategic Fit': 'strategic-fit',
};

export const validationLead =
  'A customer-centric approach, starting with desirability, then validating viability, feasibility, and strategic fit, prevents the most common reasons programs struggle. Select any region of the framework below to explore that combination and the practices that keep a program on track.';

/** Right-hand section rail. Labels are the short menu names Josh chose; the
 * section headings themselves keep their longer titles. */
export const sectionRail: Array<{ id: string; n: string; label: string }> = [
  { id: 'overview', n: '01', label: 'Overview' },
  { id: 'potential', n: '02', label: 'Potential' },
  { id: 'correcting', n: '03', label: 'Challenges' },
  { id: 'investments', n: '04', label: 'Investments' },
  { id: 'adoption', n: '05', label: 'Incentives' },
  { id: 'fit', n: '06', label: 'Program Fit' },
  { id: 'verifying', n: '07', label: 'Performance' },
  { id: 'pathways', n: '08', label: 'Market Access' },
  { id: 'approach', n: '09', label: 'Delivery Approach' },
  { id: 'enablers', n: '10', label: 'Tools & Enablers' },
];

export interface ValidationRow {
  category: string;
  pitfall: string;
  validation: string;
}

export interface QuestionGroup {
  team: string;
  questions: string[];
  capHref: string;
  capName: string;
}

/** Keyed by topic slug rather than nested in each record: these already
 * existed per topic in the previous pages and are lifted from them verbatim,
 * except the one row marked AUTHORED. */
export const validationRows: Record<string, ValidationRow[]> = {
  'food-waste-prevention-diversion-recovery': [
    {
      category: 'Desirability',
      pitfall: 'The company begins with disposal rather than root causes and prevention.',
      validation: 'Start with root-cause analysis and prevention before evaluating disposal options.',
    },
    {
      category: 'Viability',
      pitfall: 'Total embedded product value is ignored in favor of hauling cost.',
      validation: 'Account for total embedded product value, not just hauling cost, in the business case.',
    },
    {
      category: 'Viability',
      pitfall: 'Materials are grouped together despite different quality and market potential.',
      validation: 'Segment materials by quality and market potential to capture the highest value pathway.',
    },
    {
      category: 'Desirability',
      pitfall: 'Technology is selected before feedstock and output markets are validated.',
      validation: 'Validate feedstock availability and output market demand before selecting technology.',
    },
    {
      category: 'Feasibility',
      pitfall: 'Expected volume is inconsistent, seasonal, contaminated, or unavailable.',
      validation: 'Profile volume, seasonality, contamination, and availability before committing to a pathway.',
    },
    {
      category: 'Feasibility',
      pitfall: 'Food safety, liability, quality, and permitting are addressed too late.',
      validation: 'Address food safety, liability, quality, and permitting early in the design phase.',
    },
    {
      category: 'Viability',
      pitfall: 'Logistics consume the value of the proposed pathway.',
      validation: 'Model logistics costs against pathway value before committing to a location.',
    },
    {
      category: 'Strategic Fit',
      pitfall: 'The buyer and generator have mismatched specifications or incentives.',
      validation: 'Align buyer and generator specifications and incentives before contracting.',
    },
    {
      category: 'Strategic Fit',
      pitfall: 'Waste and circularity claims use inconsistent boundaries.',
      validation: 'Define consistent boundaries for waste and circularity claims from the outset.',
    },
    {
      category: 'Feasibility',
      pitfall: 'Pilots launch without recurring ownership, data, or performance management.',
      validation: 'Establish recurring ownership, data, and performance management before pilot launch.',
    },
  ],
  'purpose-driven-food-brands-and-retailers': [
    {
      category: 'Desirability',
      pitfall: 'The proposition begins with a sustainability message rather than a customer need.',
      validation: 'Start with the customer need, then translate sustainability into a product that meets it.',
    },
    {
      category: 'Desirability',
      pitfall: 'The upstream benefit is not translated into a clear product advantage.',
      validation: 'Translate upstream benefits into clear, tangible product advantages customers can see.',
    },
    {
      category: 'Strategic Fit',
      pitfall: 'The claim is broader than the evidence or supply supports.',
      validation: 'Match claims to the evidence and supply volume that actually supports them.',
    },
    {
      category: 'Feasibility',
      pitfall: 'Procurement and suppliers cannot deliver the required volume consistently.',
      validation: 'Validate that procurement and suppliers can deliver required volume consistently before launch.',
    },
    {
      category: 'Feasibility',
      pitfall: 'Product, sourcing, footprint, and marketing boundaries do not align.',
      validation: 'Align product, sourcing, footprint, and marketing boundaries before going to market.',
    },
    {
      category: 'Desirability',
      pitfall: 'Certification is treated as the complete value proposition.',
      validation: 'Build the value proposition around customer benefit, using certification as proof rather than the proposition itself.',
    },
    {
      category: 'Viability',
      pitfall: 'Willingness to pay and total program cost are not tested.',
      validation: 'Test willingness to pay against total program cost before committing to launch.',
    },
    {
      category: 'Strategic Fit',
      pitfall: 'Legal, marketing, sustainability, and operations interpret the promise differently.',
      validation: 'Align legal, marketing, sustainability, and operations on a shared interpretation of the promise.',
    },
    {
      category: 'Feasibility',
      pitfall: 'Launch materials are ready before operational controls and evidence.',
      validation: 'Complete operational controls and evidence before finalizing launch materials.',
    },
    {
      category: 'Feasibility',
      pitfall: 'Commercial and impact performance are not reviewed together after launch.',
      validation: 'Review commercial and impact performance together on a recurring basis after launch.',
    },
  ],
  'low-carbon-energy-and-biofuels': [
    {
      category: 'Desirability',
      pitfall: 'The program is designed around the incentive rather than around a proposition growers would accept.',
      validation: 'Design the grower offer first, then check that the incentive supports it rather than defines it.',
    },
    {
      category: 'Feasibility',
      pitfall: 'The business case assumes every sourced bushel or tonne is traceable.',
      validation: 'Test traceability assumptions against real sourcing conditions before building the business case.',
    },
    {
      category: 'Feasibility',
      pitfall: 'Field inputs are accepted without adequate source documentation.',
      validation: 'Require adequate source documentation for field inputs before accepting them.',
    },
    {
      category: 'Viability',
      pitfall: 'Feedstock CI is analyzed separately from the facility pathway and commercial volume.',
      validation: 'Analyze feedstock CI alongside facility pathway and commercial volume as one integrated model.',
    },
    {
      category: 'Viability',
      pitfall: 'Premiums are based on nominal credit value rather than realizable margin.',
      validation: 'Base premiums on realizable margin, not nominal credit value, before pricing transactions.',
    },
    {
      category: 'Strategic Fit',
      pitfall: 'Producer, originator, intermediary, and facility responsibilities are unclear.',
      validation: 'Clarify producer, originator, intermediary, and facility responsibilities before contracting.',
    },
    {
      category: 'Feasibility',
      pitfall: 'Mass-balance rules do not match actual delivery, storage, and inventory operations.',
      validation: 'Design mass-balance rules to match actual delivery, storage, and inventory operations.',
    },
    {
      category: 'Strategic Fit',
      pitfall: 'Contracts do not allocate environmental attributes and representations clearly.',
      validation: 'Allocate environmental attributes and representations clearly in every contract.',
    },
    {
      category: 'Feasibility',
      pitfall: 'Spreadsheet, platform, tax, and lifecycle-model boundaries are inconsistent.',
      validation: 'Align spreadsheet, platform, tax, and lifecycle-model boundaries before launch.',
    },
    {
      category: 'Feasibility',
      pitfall: 'Exceptions, corrections, version changes, and unsupported supply are not governed.',
      validation: 'Establish governance for exceptions, corrections, version changes, and unsupported supply.',
    },
    {
      category: 'Strategic Fit',
      pitfall: 'Verification is treated as a final document exercise rather than a program-design requirement.',
      validation: 'Design verification into the program from the start, not as a final document exercise.',
    },
    {
      category: 'Feasibility',
      pitfall: 'Recurring operations are underestimated after the initial pilot.',
      validation: 'Resource recurring operations adequately beyond the initial pilot phase.',
    },
  ],
  'sustainable-supply-chains': [
    {
      category: 'Desirability',
      pitfall: 'The claim is selected before the physical and commercial flow is understood.',
      validation: 'Understand the physical and commercial flow before selecting the claim it will support.',
    },
    {
      category: 'Viability',
      pitfall: 'Suppliers receive requirements without a viable economic proposition.',
      validation: 'Give suppliers a viable economic proposition alongside sustainability requirements.',
    },
    {
      category: 'Viability',
      pitfall: 'Traceability is more complex than the value it protects.',
      validation: 'Match traceability complexity to the value it protects — no more, no less.',
    },
    {
      category: 'Feasibility',
      pitfall: 'Chain-of-custody rules do not match actual storage, mixing, or processing.',
      validation: 'Design chain-of-custody rules to match actual storage, mixing, and processing operations.',
    },
    {
      category: 'Feasibility',
      pitfall: 'Technology is purchased before roles and workflows are defined.',
      validation: 'Define roles and workflows before purchasing technology.',
    },
    {
      category: 'Feasibility',
      pitfall: 'Product, inventory, carbon, certification, and financial systems use different boundaries.',
      validation: 'Align product, inventory, carbon, certification, and financial systems on shared boundaries.',
    },
    {
      category: 'Strategic Fit',
      pitfall: 'Contracts do not clearly allocate attributes, representations, or liabilities.',
      validation: 'Allocate attributes, representations, and liabilities clearly in every contract.',
    },
    {
      category: 'Feasibility',
      pitfall: 'Processing conversion and co-product allocation are poorly controlled.',
      validation: 'Control processing conversion and co-product allocation before making claims.',
    },
    {
      category: 'Feasibility',
      pitfall: 'Reconciliation and exception management are underestimated.',
      validation: 'Resource reconciliation and exception management as core operating costs.',
    },
    {
      category: 'Feasibility',
      pitfall: 'The pilot is designed but recurring operations are not staffed or governed.',
      validation: 'Staff and govern recurring operations before scaling beyond the pilot.',
    },
  ],
  'biodiversity-and-ecosystem-resilience': [
    {
      category: 'Desirability',
      pitfall: 'The program starts from a disclosure framework rather than a business decision anyone is waiting on.',
      validation: 'Start from the decision the business actually needs to make, then choose the framework that serves it.',
    },
    {
      category: 'Strategic Fit',
      pitfall: 'The company begins with a disclosure framework rather than a business decision.',
      validation: 'Start with the business decision the program must support, then map disclosure frameworks to it.',
    },
    {
      category: 'Strategic Fit',
      pitfall: 'Global targets are not translated into place-based priorities.',
      validation: 'Translate global targets into specific, place-based priorities before acting.',
    },
    {
      category: 'Feasibility',
      pitfall: 'Biodiversity is reduced to one metric without ecological context.',
      validation: 'Use ecologically contextual metrics rather than a single proxy for biodiversity.',
    },
    {
      category: 'Feasibility',
      pitfall: 'Climate, water, sourcing, and nature programs operate in separate silos.',
      validation: 'Integrate climate, water, sourcing, and nature programs under a shared strategy.',
    },
    {
      category: 'Feasibility',
      pitfall: 'Spatial and supply-chain boundaries are inconsistent.',
      validation: 'Align spatial and supply-chain boundaries across all program components.',
    },
    {
      category: 'Viability',
      pitfall: 'Interventions are selected without producer, community, or landscape capacity.',
      validation: 'Assess producer, community, and landscape capacity before selecting interventions.',
    },
    {
      category: 'Viability',
      pitfall: 'Data precision exceeds what is necessary or affordable for the decision.',
      validation: 'Match data precision to what the decision actually requires and can afford.',
    },
    {
      category: 'Strategic Fit',
      pitfall: 'Claims are made without clear attribution, ownership, or assurance.',
      validation: 'Establish attribution, ownership, and assurance before making claims.',
    },
    {
      category: 'Viability',
      pitfall: 'Project-level benefits are not connected to enterprise risk or commercial value.',
      validation: 'Connect project-level benefits to enterprise risk and commercial value explicitly.',
    },
    {
      category: 'Feasibility',
      pitfall: 'The program lacks long-term governance and adaptive management.',
      validation: 'Build long-term governance and adaptive management into the program from the start.',
    },
  ],
  'aquaculture': [
    {
      category: 'Desirability',
      pitfall: 'Technology is selected before the production and commercial problem is clear.',
      validation: 'Define the production and commercial problem first, then select technology that fits it.',
    },
    {
      category: 'Feasibility',
      pitfall: 'Biological and operating assumptions are not stress-tested.',
      validation: 'Stress-test biological and operating assumptions under realistic conditions before investing.',
    },
    {
      category: 'Viability',
      pitfall: 'Feed availability, cost, performance, and sourcing risks are evaluated separately.',
      validation: 'Evaluate feed availability, cost, performance, and sourcing risks together as an integrated model.',
    },
    {
      category: 'Strategic Fit',
      pitfall: 'Farm improvements are not connected to processing or market requirements.',
      validation: 'Connect farm improvements directly to processing and market requirements from the start.',
    },
    {
      category: 'Feasibility',
      pitfall: 'Data systems do not align farm, feed, product, and claims boundaries.',
      validation: 'Align data systems across farm, feed, product, and claims boundaries before launch.',
    },
    {
      category: 'Desirability',
      pitfall: 'Certification is treated as a substitute for customer value or operating performance.',
      validation: 'Validate customer value and operating performance independently of certification.',
    },
    {
      category: 'Strategic Fit',
      pitfall: 'Environmental claims lack appropriate local or lifecycle evidence.',
      validation: 'Gather local and lifecycle evidence before making environmental claims.',
    },
    {
      category: 'Viability',
      pitfall: 'Capital needs, ramp time, mortality, and working capital are underestimated.',
      validation: 'Model capital needs, ramp time, mortality, and working capital under realistic scenarios.',
    },
    {
      category: 'Strategic Fit',
      pitfall: 'Ownership across farms, processors, brands, and technology partners is unclear.',
      validation: 'Clarify ownership across farms, processors, brands, and technology partners before launch.',
    },
    {
      category: 'Feasibility',
      pitfall: 'Recurring program management is insufficient after pilot launch.',
      validation: 'Resource recurring program management adequately from pilot through scale.',
    },
  ],
  agroforestry: [
    {
      category: 'Desirability',
      pitfall: 'A compelling land concept lacks a reliable product market.',
      validation: 'Validate end-market demand and pricing for the land concept before establishing it.',
    },
    {
      category: 'Viability',
      pitfall: 'Establishment costs and delayed cash flows are underestimated.',
      validation: 'Model establishment costs and cash-flow timing under realistic assumptions before committing.',
    },
    {
      category: 'Feasibility',
      pitfall: 'Tree, crop, or livestock interactions are not evaluated locally.',
      validation: 'Test tree, crop, and livestock interactions under local conditions before scaling.',
    },
    {
      category: 'Viability',
      pitfall: 'Producers carry long-term risk without durable commercial support.',
      validation: 'Structure durable commercial support so producers do not carry long-term risk alone.',
    },
    {
      category: 'Strategic Fit',
      pitfall: 'Land tenure and rights to future products or attributes are unclear.',
      validation: 'Clarify land tenure and rights to future products and attributes before planting.',
    },
    {
      category: 'Feasibility',
      pitfall: 'Processing, aggregation, and logistics are addressed after planting.',
      validation: 'Plan processing, aggregation, and logistics alongside the planting timeline.',
    },
    {
      category: 'Feasibility',
      pitfall: 'Monitoring systems are not designed for long-duration assets.',
      validation: 'Design monitoring systems for the full life of long-duration assets from the start.',
    },
    {
      category: 'Feasibility',
      pitfall: 'Mortality, replacement, harvesting, and reversals lack clear treatment.',
      validation: 'Define how mortality, replacement, harvesting, and reversals will be handled before launch.',
    },
    {
      category: 'Strategic Fit',
      pitfall: 'Environmental claims are planned without contractual ownership or assurance.',
      validation: 'Secure contractual ownership and assurance before making environmental claims.',
    },
    {
      category: 'Feasibility',
      pitfall: 'The program lacks recurring management over its full time horizon.',
      validation: 'Commit to recurring management across the program’s full time horizon.',
    },
  ],
  'regenerative-agriculture': [
    {
      category: 'Desirability',
      pitfall: 'The program starts with a practice list rather than a clear business objective.',
      validation: 'Start with the customer or commercial problem the program must solve, then map practices to that objective.',
    },
    {
      category: 'Viability',
      pitfall: 'Producer costs, risk, timing, and operational burden are underestimated.',
      validation: 'Build a producer economics model that quantifies cost, risk, timing, and operational burden before committing.',
    },
    {
      category: 'Feasibility',
      pitfall: 'A technology platform is selected before the operating model and evidence requirements are defined.',
      validation: 'Define the operating model and evidence requirements first, then select technology that fits them.',
    },
    {
      category: 'Feasibility',
      pitfall: 'Models, field data, contracts, commodity flows, and claims use different boundaries.',
      validation: 'Align all program boundaries (models, data, contracts, commodity flows, and claims) from the outset.',
    },
    {
      category: 'Feasibility',
      pitfall: 'Traceability is not sufficient for the intended accounting or product claim.',
      validation: 'Design traceability to match the accounting or claim level the program intends to support.',
    },
    {
      category: 'Strategic Fit',
      pitfall: 'Environmental attributes and usage rights are unclear or allocated more than once.',
      validation: 'Establish clear ownership and single-use allocation of environmental attributes before commercialization.',
    },
    {
      category: 'Viability',
      pitfall: 'The customer proposition does not cover the cost of origination, data, assurance, and management.',
      validation: 'Validate that the customer proposition fully covers origination, data, assurance, and management costs.',
    },
    {
      category: 'Strategic Fit',
      pitfall: 'Pilot success criteria do not test the assumptions required for commercial scale.',
      validation: 'Design pilot success criteria that explicitly test the assumptions needed for commercial-scale decisions.',
    },
    {
      category: 'Feasibility',
      pitfall: 'Ongoing program management, corrections, exceptions, and verification readiness are not adequately resourced.',
      validation: 'Resource recurring management, exception handling, and verification readiness as core program costs.',
    },
  ],
  'regenerative-rangeland': [
    // AUTHORED, not lifted: rangeland has no Desirability row upstream, which
    // left that region of the framework empty. Phrased from the live page's
    // producer-proposition language. Review before publishing.
    {
      category: 'Desirability',
      pitfall: 'The program is designed around the buyer requirement without testing whether ranchers will participate.',
      validation: 'Start with the rancher decision and the buyer use case together, then design the program around what both will accept.',
    },
    {
      category: 'Viability',
      pitfall: 'The program is positioned as carbon-only and overlooks ranch economics and livestock performance.',
      validation: 'Position the program around ranch economics and livestock performance, with carbon as one component.',
    },
    {
      category: 'Feasibility',
      pitfall: 'One grazing practice is treated as universally appropriate.',
      validation: 'Match grazing practices to local conditions rather than applying one approach universally.',
    },
    {
      category: 'Viability',
      pitfall: 'Infrastructure, labor, water, fencing, and transition costs are underestimated.',
      validation: 'Quantify infrastructure, labor, water, fencing, and transition costs before committing.',
    },
    {
      category: 'Viability',
      pitfall: 'Ranchers are asked to carry risk without a clear long-term value proposition.',
      validation: 'Build a clear long-term value proposition so ranchers do not carry risk without reward.',
    },
    {
      category: 'Feasibility',
      pitfall: 'Livestock emissions, soil outcomes, product flows, and claims are evaluated in separate systems.',
      validation: 'Integrate livestock emissions, soil outcomes, product flows, and claims into one evidence system.',
    },
    {
      category: 'Feasibility',
      pitfall: 'Baseline condition and ranch-to-ranch variability are not reflected in program design.',
      validation: 'Reflect baseline conditions and ranch-to-ranch variability in program design from the start.',
    },
    {
      category: 'Feasibility',
      pitfall: 'Soil sampling, models, remote sensing, and management records are not governed as one evidence system.',
      validation: 'Govern soil sampling, models, remote sensing, and management records as one integrated evidence system.',
    },
    {
      category: 'Strategic Fit',
      pitfall: 'Animals or products cannot be traced or allocated at the level required for the intended claim.',
      validation: 'Design traceability and allocation to match the level the intended claim requires.',
    },
    {
      category: 'Strategic Fit',
      pitfall: 'Permanence, leakage, reversals, uncertainty, and overlapping claims are addressed after commercialization.',
      validation: 'Address permanence, leakage, reversals, uncertainty, and overlapping claims before commercialization.',
    },
    {
      category: 'Feasibility',
      pitfall: 'Ongoing field coordination, data review, exceptions, and assurance are not adequately resourced.',
      validation: 'Resource ongoing field coordination, data review, exceptions, and assurance as core program costs.',
    },
  ],
};

/** Section 06 functional-fit question cards, in the site's Offerings order:
 * Strategy & Innovation, Financial Investments & New Venture Development,
 * Sustainable Supply Chain & Operations, Corporate Sustainability, Carbon &
 * Ecosystem Services. Questions are each topic's approved `decisionGroups`,
 * lifted verbatim from its previous index.astro. */
export const validationQuestions: Record<string, QuestionGroup[]> = {
  'food-waste-prevention-diversion-recovery': [
    {
      team: 'Assessment & Prevention',
      questions: [
        'Where is food or material value being lost and why?',
        'Which losses can be prevented rather than managed downstream?',
        'What is edible, safe, stable, and commercially usable?',
      ],
      capHref: '/capabilities/strategy-and-innovation/',
      capName: 'Strategy & Innovation',
    },
    {
      team: 'Pathway & Commercial Decisions',
      questions: [
        'Which outlet preserves the highest practical value?',
        'Is the material consistent enough to support a customer or technology?',
        'What quality, safety, legal, logistics, and liability requirements apply?',
        'What are the complete economics, including embedded value and avoided cost?',
      ],
      capHref: '/capabilities/sustainable-supply-chain-and-operations/',
      capName: 'Sustainable Supply Chain & Operations',
    },
    {
      team: 'Technology, Partners & Scale',
      questions: [
        'Which technologies and partners fit the operating environment?',
        'Who owns the material, output, claim, and environmental attribute?',
        'How will the program scale without shifting cost or impact elsewhere?',
      ],
      capHref: '/capabilities/carbon-and-ecosystem-services/',
      capName: 'Carbon & Ecosystem Services',
    },
  ],
  'purpose-driven-food-brands-and-retailers': [
    {
      team: 'Strategy & Commercial Leaders',
      questions: [
        'Which customer problem or category opportunity should the proposition address?',
        'Is the sustainability or purpose benefit material to customer choice?',
        'What price and margin are supportable?',
        'Who funds upstream performance and who captures downstream value?',
      ],
      capHref: '/capabilities/strategy-and-innovation/',
      capName: 'Strategy & Innovation',
    },
    {
      team: 'Product, Sourcing & Operations',
      questions: [
        'Which product, sourcing, packaging, or service changes are required?',
        'Can suppliers and operations deliver the promise at the required scale?',
      ],
      capHref: '/capabilities/sustainable-supply-chain-and-operations/',
      capName: 'Sustainable Supply Chain & Operations',
    },
    {
      team: 'Claims, Evidence & Communication',
      questions: [
        'What evidence, traceability, certification, or assurance supports the claim?',
        'How should the claim differ by market, channel, customer, or product format?',
      ],
      capHref: '/capabilities/carbon-and-ecosystem-services/',
      capName: 'Carbon & Ecosystem Services',
    },
    {
      team: 'Governance & Organizational Alignment',
      questions: [
        'How will legal, marketing, sustainability, procurement, product, and sales share accountability?',
        'What happens when supply, evidence, regulation, or customer expectations change?',
      ],
      capHref: '/capabilities/corporate-sustainability/',
      capName: 'Corporate Sustainability',
    },
  ],
  'low-carbon-energy-and-biofuels': [
    {
      team: 'Strategy & Value',
      questions: [
        'Which feedstock, geography, and facility opportunities fit the strategy?',
        'What value is available per unit and at total commercial volume?',
        'What premium can be paid and how should value be shared?',
        'Who owns the attribute and makes each representation?',
      ],
      capHref: '/capabilities/strategy-and-innovation/',
      capName: 'Strategy & Innovation',
    },
    {
      team: 'Supply, Evidence & Traceability',
      questions: [
        'How much supply is commercially available and verifiable?',
        'Which producer data must be direct, documented, modeled, or independently reviewed?',
        'How should existing practices, new adoption, and untraceable supply be treated?',
        'What chain-of-custody and eligible-volume controls apply at each delivery point?',
      ],
      capHref: '/capabilities/sustainable-supply-chain-and-operations/',
      capName: 'Sustainable Supply Chain & Operations',
    },
    {
      team: 'Pathway & Operations',
      questions: [
        'How does feedstock CI connect to the applicable fuel pathway and facility assumptions?',
        'What recurring operating model is required for tax, customer, regulatory, and assurance scrutiny?',
      ],
      capHref: '/capabilities/carbon-and-ecosystem-services/',
      capName: 'Carbon & Ecosystem Services',
    },
  ],
  'sustainable-supply-chains': [
    {
      team: 'Strategy, Sourcing & Commercial Leaders',
      questions: [
        'Which products, suppliers, sourcing regions, and impacts should be prioritized?',
        'What level of traceability is required for the decision or claim?',
        'Which chain-of-custody model fits the product and market?',
        'How should supplier costs, premiums, incentives, and value be allocated?',
      ],
      capHref: '/capabilities/strategy-and-innovation/',
      capName: 'Strategy & Innovation',
    },
    {
      team: 'Operations, Data & Claims Teams',
      questions: [
        'Which data must originate upstream and which can be calculated downstream?',
        'How will materials, attributes, and claims be reconciled through processing?',
        'Who owns each attribute and who may use it?',
        'What evidence and controls are proportionate to the commercial value?',
      ],
      capHref: '/capabilities/sustainable-supply-chain-and-operations/',
      capName: 'Sustainable Supply Chain & Operations',
    },
    {
      team: 'Governance & Risk Teams',
      questions: [
        'How should procurement, sustainability, operations, finance, technology, legal, and sales share accountability?',
        'How will the program manage exceptions, unsupported supply, and changing requirements?',
      ],
      capHref: '/capabilities/corporate-sustainability/',
      capName: 'Corporate Sustainability',
    },
  ],
  'biodiversity-and-ecosystem-resilience': [
    {
      team: 'Strategy & Nature Assessment',
      questions: [
        'Where does the business depend on ecosystems and natural capital?',
        'Which impacts and risks are material enough to act on?',
        'At what geographic and value-chain level should priorities be set?',
      ],
      capHref: '/capabilities/strategy-and-innovation/',
      capName: 'Strategy & Innovation',
    },
    {
      team: 'Integration & Measurement',
      questions: [
        'How should climate, water, biodiversity, sourcing, and resilience be integrated?',
        'Which indicators are proportionate and decision-useful?',
      ],
      capHref: '/capabilities/sustainable-supply-chain-and-operations/',
      capName: 'Sustainable Supply Chain & Operations',
    },
    {
      team: 'Implementation, Communities & Claims',
      questions: [
        'Which actions belong inside the company, with suppliers, through partnerships, or in markets?',
        'How should communities and local stakeholders participate and benefit?',
        'What outcomes can be attributed and claimed credibly?',
      ],
      capHref: '/capabilities/corporate-sustainability/',
      capName: 'Corporate Sustainability',
    },
    {
      team: 'Allocation & Governance',
      questions: [
        'How should carbon, water, biodiversity, and community benefits be allocated without double counting?',
        'What governance is required as ecological conditions and stakeholder expectations change?',
      ],
      capHref: '/capabilities/carbon-and-ecosystem-services/',
      capName: 'Carbon & Ecosystem Services',
    },
  ],
  'aquaculture': [
    {
      team: 'Strategy & Commercial Leaders',
      questions: [
        'Which species, systems, geographies, and products fit the strategy?',
        'Which farm-performance and environmental indicators matter commercially?',
        'What must be validated before capital, partnership, acquisition, or scale?',
      ],
      capHref: '/capabilities/strategy-and-innovation/',
      capName: 'Strategy & Innovation',
    },
    {
      team: 'Feed, Technology & Operations',
      questions: [
        'How should feed performance, cost, availability, and footprint be balanced?',
        'Which technologies are ready for the intended operating environment?',
        'Which processing and cold-chain requirements determine market access?',
      ],
      capHref: '/capabilities/sustainable-supply-chain-and-operations/',
      capName: 'Sustainable Supply Chain & Operations',
    },
    {
      team: 'Health, Risk & Ecosystem Governance',
      questions: [
        'How will disease, mortality, escapes, water, and ecosystem risks be governed?',
      ],
      capHref: '/capabilities/corporate-sustainability/',
      capName: 'Corporate Sustainability',
    },
    {
      team: 'Data, Evidence & Claims',
      questions: [
        'What data are decision-useful and what evidence supports a public claim?',
        'How should farm, feed, processing, and product impacts be allocated?',
        'Which certification, chain-of-custody, food-safety, welfare, or customer systems apply?',
      ],
      capHref: '/capabilities/carbon-and-ecosystem-services/',
      capName: 'Carbon & Ecosystem Services',
    },
  ],
  agroforestry: [
    {
      team: 'System Design & Business Fit',
      questions: [
        'Which agroforestry system fits the land, production system, and business objective?',
        'Which product and environmental outcomes are realistic within the time horizon?',
      ],
      capHref: '/capabilities/strategy-and-innovation/',
      capName: 'Strategy & Innovation',
    },
    {
      team: 'Finance, Risk & Producer Support',
      questions: [
        'How will establishment costs and delayed returns be financed?',
        'Which participants carry mortality, production, price, and market risk?',
        'What interim revenue supports the producer during establishment?',
      ],
      capHref: '/capabilities/financial-investments-and-new-venture-development/',
      capName: 'Financial Investments & New Venture Development',
    },
    {
      team: 'Markets & Routes to Value',
      questions: [
        'Which products and co-products have a reliable route to market?',
      ],
      capHref: '/capabilities/sustainable-supply-chain-and-operations/',
      capName: 'Sustainable Supply Chain & Operations',
    },
    {
      team: 'Governance, Rights & Long-Term Viability',
      questions: [
        'How will land tenure, succession, harvesting rights, and permanence be governed?',
        'Who owns the physical products and environmental attributes?',
        'How will the program remain viable when ownership, markets, or ecological conditions change?',
      ],
      capHref: '/capabilities/corporate-sustainability/',
      capName: 'Corporate Sustainability',
    },
    {
      team: 'Evidence & Assurance',
      questions: [
        'Which data, models, measurements, and assurance are needed?',
      ],
      capHref: '/capabilities/carbon-and-ecosystem-services/',
      capName: 'Carbon & Ecosystem Services',
    },
  ],
  'regenerative-agriculture': [
    {
      team: 'Strategy & Commercial Leaders',
      questions: [
        'Which regenerative opportunities fit the business strategy and customer demand?',
        'Which crops, supply sheds, products, and outcomes offer a credible business case?',
        'Should the company build, buy, partner, invest, or participate?',
        'How should value, transition costs, and risk be shared?',
      ],
      capHref: '/capabilities/strategy-and-innovation/',
      capName: 'Strategy & Innovation',
    },
    {
      team: 'Finance, Investment & Risk Teams',
      questions: [
        'What is the expected cost and value per acre, tonne, supplier, or product unit?',
        'How sensitive is the business case to participation, outcomes, market demand, and assurance cost?',
        'What methodology, counterparty, operational, fraud, and claims risks exist?',
        'Is the program, platform, project, or portfolio investment supportable?',
      ],
      capHref: '/capabilities/financial-investments-and-new-venture-development/',
      capName: 'Financial Investments & New Venture Development',
    },
    {
      team: 'Origination, Procurement & Operations',
      questions: [
        'Which producers and suppliers are ready to participate?',
        'How should volumes be sourced, aggregated, contracted, and reconciled?',
        'How should existing adopters and incomplete traceability be treated?',
        'What evidence must move with the commodity or environmental attribute?',
      ],
      capHref: '/capabilities/sustainable-supply-chain-and-operations/',
      capName: 'Sustainable Supply Chain & Operations',
    },
    {
      team: 'Sustainability, Climate & Claims Teams',
      questions: [
        'Is the program intended for inventory progress, Scope 3, insetting, certification, product claims, carbon credits, resilience, water, biodiversity, or a combination?',
        'Which accounting, target, certification, or market framework applies?',
        'How should reductions, removals, avoided emissions, and broader outcomes be separated?',
        'What may be reported credibly, by whom, and at what level of assurance?',
      ],
      capHref: '/capabilities/corporate-sustainability/',
      capName: 'Corporate Sustainability',
    },
    {
      team: 'Program, Technology & Data Teams',
      questions: [
        'What data must be collected directly and what may be modeled?',
        'Which systems, vendors, models, field evidence, and ledgers must connect?',
        'How will data quality, versioning, corrections, exceptions, and access be managed?',
        'Which activities belong internally, with partners, or in a managed service?',
      ],
      capHref: '/capabilities/carbon-and-ecosystem-services/',
      capName: 'Carbon & Ecosystem Services',
    },
  ],
  'regenerative-rangeland': [
    {
      team: 'Producers and Program Sponsors',
      questions: [
        'Which ranches, geographies, and grazing systems fit the objective?',
        'What transition costs, infrastructure, technical support, and management change are required?',
        'How will ranchers be compensated for participation, performance, evidence, and risk?',
        'How will ranch-specific flexibility be preserved within a consistent program?',
      ],
      capHref: '/capabilities/strategy-and-innovation/',
      capName: 'Strategy & Innovation',
    },
    {
      team: 'Finance, Commercial, and Risk Teams',
      questions: [
        'What is the cost and expected value per ranch, acre, animal, product unit, or environmental outcome?',
        'Which capital investments are required and who owns them?',
        'How durable and scalable are the expected production and environmental benefits?',
        'Does the value justify the program, measurement, assurance, and transaction costs?',
      ],
      capHref: '/capabilities/financial-investments-and-new-venture-development/',
      capName: 'Financial Investments & New Venture Development',
    },
    {
      team: 'Livestock, Sourcing, and Operations Teams',
      questions: [
        'How will participating animals and products be identified or allocated?',
        'What happens when animals move through multiple owners, grazing systems, feedyards, or processors?',
        'Which records must travel with the animal, product, or environmental attribute?',
        'How will supply commitments, quality, timing, and customer requirements be maintained?',
      ],
      capHref: '/capabilities/sustainable-supply-chain-and-operations/',
      capName: 'Sustainable Supply Chain & Operations',
    },
    {
      team: 'Sustainability and Environmental-Market Teams',
      questions: [
        'Is the intended outcome a sourcing claim, Scope 3 reduction, inset, carbon credit, certification, nature outcome, or combination?',
        'How should livestock emissions and land-based removals or reductions be considered together?',
        'Which methodology, accounting, certification, or assurance framework applies?',
        'How will additionality, uncertainty, leakage, permanence, reversals, and double counting be addressed where relevant?',
      ],
      capHref: '/capabilities/corporate-sustainability/',
      capName: 'Corporate Sustainability',
    },
    {
      team: 'Program, Data, and Technology Teams',
      questions: [
        'What data must be recorded at ranch, pasture, herd, animal, product, or landscape level?',
        'Which outcomes require direct measurement and which may use models or indicators?',
        'How will grazing records, soil data, remote sensing, livestock data, ledgers, and contracts connect?',
        'How will corrections, missing data, nonconformance, and version changes be managed?',
      ],
      capHref: '/capabilities/carbon-and-ecosystem-services/',
      capName: 'Carbon & Ecosystem Services',
    },
  ],
};

/** Hero photography, keyed by topic slug — one source for the /expertise/
 * index tiles and each topic page's hero. They were separate literals that
 * happened to hold the same photo, with nothing keeping them in step. Pexels
 * ids only: the width is applied per use, because a tile and a full-bleed
 * hero want different sizes. Covers all nine topics, including the seven
 * still on the older ExpertisePage component. */
export const topicHeroPhotoIds: Record<string, number> = {
  'regenerative-agriculture': 38514489,
  'regenerative-rangeland': 29474130,
  'agroforestry': 5838949,
  'aquaculture': 14992906,
  'biodiversity-and-ecosystem-resilience': 17475325,
  'sustainable-supply-chains': 4487383,
  'low-carbon-energy-and-biofuels': 35284297,
  'purpose-driven-food-brands-and-retailers': 15455017,
  'food-waste-prevention-diversion-recovery': 36751332,
};

export function topicHeroImage(slug: string, width: number): string {
  const id = topicHeroPhotoIds[slug];
  if (!id) throw new Error(`No hero photo registered for expertise topic '${slug}'`);
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`;
}
// ── Product screenshots ──
// The brand kit's unframed 16:9 hero renders, copied from
// brand/product-ui/09-web-export/04-hero-16x9 into public/images/product-ui/.
// Every tool uses the same framing and the same 16:9 aspect, so unlike
// digital-solutions/index.astro's `assetFor` there is no per-device shape to
// carry — the card can let the image bleed to its edges the way .card-media
// expects. The widths are the two the brand kit exports that this page needs;
// a 22rem card is 352px, so 960w already covers a 2x display.
export const TOOL_WIDTHS = [960, 1440] as const;
const TOOL_ASPECT = { width: 1440, height: 810 };

export function toolAsset(asset: string) {
  const srcset = TOOL_WIDTHS.map((w) => `/images/product-ui/${asset}-${w}w.webp ${w}w`).join(', ');
  const src = `/images/product-ui/${asset}-${TOOL_WIDTHS[TOOL_WIDTHS.length - 1]}w.webp`;
  return { src, srcset, ...TOOL_ASPECT };
}

/** Every topic record, keyed by slug. Populated by ./index.ts. */
export type TopicRecord = ExpertiseTopic;
