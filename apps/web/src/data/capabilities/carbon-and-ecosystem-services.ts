// Carbon & Ecosystem Services — capability family record.
//
// PROVENANCE
//  * Hero title/lead, meta description, `offerings`, `comparison` and the
//    closing CTA are lifted verbatim from
//    pages/capabilities/carbon-and-ecosystem-services/index.astro (the
//    2026-08-19 bespoke rebuild from a second designer's reference
//    prototype; see that file's own header for the prototype provenance),
//    moved here 2026-09-13 so all five families share one shape. No copy
//    changed in the move.
//  * `offerings` are the same seven the CapabilityPage-based version of
//    the page rendered before the rebuild (restored by owner feedback,
//    2026-08-19). They have no sub-offerings.
//  * `stageNotes` are the page's local `lifecycle` array re-keyed by the
//    canonical stage ids in ../lifecycle.ts. The array's own labels
//    ("05 — Manage & Verify", "06 — Unlock Shared Value") are dropped: they
//    were a third naming of the six stages, after the homepage's and the
//    old /capabilities/ hub's. The one-line title and body under each stage
//    are unchanged.
//  * The mechanism content itself lives in ../market-mechanisms.ts and is
//    not duplicated here.
//  * The hero's "Photo — working landscape / supply chain" placeholder is
//    not data and is not carried over (owner decision, 2026-09-13: remove
//    it and restructure the hero without a photo).
//
// NEEDS OWNER REVIEW
//  * The lifecycle grid now shows the canonical stage titles above the
//    C&ES one-liners, e.g. "05 Operate, Verify & Improve" rather than
//    "05 — Manage & Verify".
import type { CapabilityFamilyRecord } from './types';

export const carbonAndEcosystemServices: CapabilityFamilyRecord = {
  eyebrow: 'Carbon & Ecosystem Services',
  title: 'Turn environmental performance into value the market will recognize.',
  lead: 'Terra Nexus works with carbon, trade, finance, program, and sustainability teams to build environmental outcomes into assets and claims that can be measured, verified, accounted for, transacted, and defended.',
  primaryCta: { label: 'Explore the market mechanisms →', href: '#mechanisms' },
  metaTitle: 'Carbon & Ecosystem Services | Terra Nexus',
  metaDescription: 'Terra Nexus works with carbon, trade, finance, program, and sustainability teams to build environmental outcomes into assets and claims that can be measured, verified, accounted for, transacted, and defended.',

  // The bespoke page has no orientation block; the mechanism selector's own
  // header carries the framing instead.
  orientation: [],
  offerings: [
    { name: 'VCM & Scope 3 Markets', description: 'Evaluate how organizations can access, buy, sell, develop, use, or participate in voluntary carbon, Scope 3, inset, and related markets.', subOfferings: [] },
    { name: 'Commercialization Pathways', description: 'Compare product claims, insets, credits, certifications, regulatory pathways, customer programs, and other market mechanisms using route-to-market, value, utilization, ownership, stacking, and risk analysis.', subOfferings: [] },
    { name: 'Asset & Portfolio Valuation', description: 'Assess the quality, risk, value, strategic fit, and portfolio role of environmental assets, projects, programs, and claims.', subOfferings: [] },
    { name: 'Pilot Development & Partner Selection', description: 'Design pilots that test critical technical, operational, commercial, and market assumptions before scale and select the partners and technologies required.', subOfferings: [] },
    { name: 'Program Design & Operations', description: 'Build and manage program governance, workflows, data, contracts, controls, ledgers, chain of custody, partners, exceptions, and reporting.', subOfferings: [] },
    { name: 'Impact Verification & Claims Translation', description: 'Prepare evidence and programs for independent scrutiny and translate supportable outcomes into claims that match the intended user and market. Terra Nexus does not represent itself as an accredited validator or verifier.', subOfferings: [] },
    { name: 'Full-Service GHG Accounting', description: 'Connect inventory, product, project, program, and disclosure accounting so performance is calculated, allocated, reported, and claimed consistently.', subOfferings: [] },
  ],
  // offeringsCallout ("The highest nominal price is not always...") was
  // removed per owner feedback, 2026-08-19, and stays removed.

  stageNotes: {
    evaluate: { title: 'Find where the opportunity actually is.', body: 'Test outcomes, mechanisms, standards, eligibility, claims, economics, buyers, incentives, and risk before committing to a route.' },
    design: { title: 'Decide how the mechanism will work.', body: 'Set the program structure, the asset or claim, the methodology, chain of custody, ownership model, incentives, and commercial approach.' },
    build: { title: 'Stand up what it takes to operate.', body: 'MRV, data, workflows, contracts, registries, controls, traceability, accounting, and assurance — built to run, not to demonstrate.' },
    launch: { title: 'Move from design into the market.', body: 'Onboard suppliers, buyers, and partners, run the first transactions, integrate operations, and widen participation.' },
    operate: { title: 'Hold performance and credibility over time.', body: 'Data, counterparties, verification, audits, registries, accounting, claims, reporting, and the obligations that never stop arriving.' },
    commercialize: { title: 'Convert verified performance into return.', body: 'Monetize assets, capture incentives, improve procurement economics, differentiate product, meet targets, and move value back down the supply chain.' },
  },

  comparison: [
    { label: 'Carbon or Ecosystem Credit', body: 'The quantified outcome becomes an independently issued environmental asset.' },
    { label: 'Scope 3 Reduction or Inset', body: "The outcome stays inside a company's value chain and counts toward its performance there." },
    { label: 'Product or Commodity Claim', body: 'The characteristic remains attributable to the physical product being bought or sold.' },
    { label: 'Environmental Attribute Certificate', body: 'The characteristic is conveyed by certificate and can be transacted apart from the product.' },
  ],

  ctaHeading: 'Choose the right mechanism. Build it to last.',
  ctaBody: 'Environmental markets get difficult where science, standards, supply chains, accounting, claims, and commercial objectives all have to agree at once. Terra Nexus helps clients pick the mechanism, build what sits behind it, keep it standing through verification and market change, and turn credible performance into value that lasts.',
  ctaButton: { label: 'Turn environmental performance into value →', href: '/contact/' },
};
