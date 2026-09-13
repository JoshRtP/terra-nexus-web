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
