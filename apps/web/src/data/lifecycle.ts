// The six-stage development lifecycle ("How We Work") plus the five
// capability areas that support it. Canonical source of truth for both —
// consumed by the homepage's "How We Work" section
// (src/pages/index.astro#capabilities) and the standalone Capabilities page
// (src/pages/capabilities/index.astro), so the five capability descriptions
// exist in exactly one place in the codebase.
//
// Content provenance: `stages` is copied from
// plans/content/homepage-sections-2026-09/lifecycle-and-segments.js's own
// `stages` export (approved prototype content), with the retired
// `core`/`developer`/`buyer` per-role fields dropped — the homepage no
// longer distinguishes a Commercial Developer / Corporate Buyer lens.
// `capabilityAreas` is copied from the capabilities array that used to be
// defined independently in both index.astro and capabilities/index.astro.
export interface Stage {
  id: string;
  n: string;
  title: string;
  description: string;
  short: string;
}

export interface CapabilityArea {
  title: string;
  slug: string;
  description: string;
}

export const stages: Stage[] = [
  {
    id: 'evaluate',
    n: '01',
    title: 'Evaluate the Opportunity',
    description: "Decide where the next dollar goes before committing to a path. A real environmental opportunity still has to fit the company's footprint, its influence over suppliers, what customers require, where the accounting boundary sits, and what the organization can actually execute.",
    short: 'Evaluate',
  },
  {
    id: 'design',
    n: '02',
    title: 'Design the Structure & Value Architecture',
    description: 'Settle how the value is created, who owns it, and how it moves. Methodology, boundary, participant terms, ownership, commercial model and route to market all get decided together, because changing one of them later forces the others to change with it.',
    short: 'Design',
  },
  {
    id: 'build',
    n: '03',
    title: 'Build the Operating & Evidence Infrastructure',
    description: 'Stand up the system that makes the outcome usable and audit-ready. A methodology on its own does not operate a program. Data, MRV, chain of custody, allocation, contracts and controls have to work together from the participant all the way through to the final customer.',
    short: 'Build',
  },
  {
    id: 'launch',
    n: '04',
    title: 'Launch & Scale',
    description: 'Prove the program with a first cohort, then expand without breaking what worked. Pilot performance, verification cycles and partner economics all get tested before volume, geographies, participants or product lines are added.',
    short: 'Scale',
  },
  {
    id: 'operate',
    n: '05',
    title: 'Operate, Verify & Improve',
    description: 'Run the program as a recurring operation with an owner, a calendar and a budget. Verification cycles, participant management, reconciliation and improvement continue year over year, with the ledger and evidence maintained so results still hold up long after the first sale.',
    short: 'Operate',
  },
  {
    id: 'commercialize',
    n: '06',
    title: 'Connect Performance to Specific Claims & Market Value',
    description: 'Convert verified performance into the specific claim, credit, premium or incentive it supports. This step closes the loop by connecting performance back to the original opportunity, driving continuous improvement toward best-in-class performance and profitability.',
    short: 'Claim',
  },
];

export const capabilityAreas: CapabilityArea[] = [
  { title: 'Strategy & Innovation', slug: 'strategy-and-innovation', description: 'Determine where to play, how to win, and how to create differentiated growth at the intersection of food and climate.' },
  { title: 'Financial Investments & New Venture Development', slug: 'financial-investments-and-new-venture-development', description: 'Screen, value, fund, structure, incubate, acquire, and scale food, agriculture, climate, nature, and circularity opportunities.' },
  { title: 'Sustainable Supply Chain & Operations', slug: 'sustainable-supply-chain-and-operations', description: 'Reduce impact, risk, cost, and volatility by changing what is sourced and how it is produced, moved, processed, used, and recovered.' },
  { title: 'Corporate Sustainability', slug: 'corporate-sustainability', description: 'Set enterprise ambition, prioritize action, account for progress, govern claims, engage stakeholders, and report performance.' },
  { title: 'Carbon & Ecosystem Services', slug: 'carbon-and-ecosystem-services', description: 'Create, access, value, verify, account for, manage, and commercialize environmental assets, attributes, credits, insets, offsets, and claims.' },
];
