// Carbon & Ecosystem Services — capability family record.
//
// PROVENANCE
//  * Hero title/lead, meta description, `offerings`, the mechanism and
//    lifecycle section headers, `comparison` and the closing CTA are lifted
//    verbatim from pages/capabilities/carbon-and-ecosystem-services/index.astro
//    (the 2026-08-19 bespoke rebuild from a second designer's reference
//    prototype; see git history of that file for the prototype provenance),
//    moved here 2026-09-13 so all five families share one shape and one
//    template. No copy changed in the move.
//  * `offerings` are the same seven the CapabilityPage-based version of
//    the page rendered before the rebuild (restored by owner feedback,
//    2026-08-19). They have no sub-offerings.
//  * `lifecycle.notes` are the page's local `lifecycle` array re-keyed by the
//    canonical stage ids in ../lifecycle.ts. The array's own labels
//    ("05 — Manage & Verify", "06 — Unlock Shared Value") are dropped: they
//    were a third naming of the six stages, after the homepage's and the
//    old /capabilities/ hub's. The one-line title and body under each stage
//    are unchanged.
//  * `mechanisms.eyebrow` ("Four Routes to Market") was the hero's small
//    caption beside the primary button; it now labels the section it
//    described. `lifecycle.eyebrow` reuses the hub's "Our Approach".
//  * The mechanism content itself lives in ../market-mechanisms.ts and is
//    not duplicated here.
//  * The hero's "Photo — working landscape / supply chain" placeholder is
//    gone (owner decision, 2026-09-13: remove it and restructure the hero
//    without a photo). The hero is now the site-standard PageHero.
//
// NEEDS OWNER REVIEW
//  * `secondaryCta` is new: the bespoke hero had only the in-page
//    "Explore the market mechanisms" button, so the page had no route to
//    contact until its foot. The label is the /capabilities/ hub's own
//    "Discuss Your Challenge".
//  * The lifecycle grid now shows the canonical stage titles above the
//    C&ES one-liners, e.g. "05 Operate, Verify & Improve" rather than
//    "05 — Manage & Verify".
//  * A Related Areas of Expertise section now renders on this page, as on
//    the other four (the 2026-08-19 rebuild had dropped it and flagged the
//    omission). Topics are derived, see ./index.ts.
import type { CapabilityFamilyRecord } from './types';

export const carbonAndEcosystemServices: CapabilityFamilyRecord = {
  eyebrow: 'Carbon & Ecosystem Services',
  title: 'Turn environmental performance into value the market will recognize.',
  lead: 'Terra Nexus works with carbon, trade, finance, program, and sustainability teams to build environmental outcomes into assets and claims that can be measured, verified, accounted for, transacted, and defended.',
  primaryCta: { label: 'Explore the market mechanisms', href: '#mechanisms' },
  secondaryCta: { label: 'Discuss Your Challenge', href: '/contact/' },
  metaTitle: 'Carbon & Ecosystem Services | Terra Nexus',
  metaDescription: 'Terra Nexus works with carbon, trade, finance, program, and sustainability teams to build environmental outcomes into assets and claims that can be measured, verified, accounted for, transacted, and defended.',

  // The bespoke page had no overview block; the mechanism section's own
  // header carries the framing instead.
  orientation: [],

  mechanisms: {
    eyebrow: 'Four Routes to Market',
    heading: 'One outcome. Different paths to value.',
    lead: [
      'Environmental performance can reach the market by more than one route. Which route fits depends on what actually changed, where it happened, who holds the right to claim it, how it was quantified, how the attribute moves, and what the buyer at the end needs to purchase, report, or say in public.',
      'Most programs come apart at the joints between those answers rather than on the science. Connecting them is the work.',
    ],
  },

  lifecycle: {
    eyebrow: 'Our Approach',
    heading: 'Managed across the full development lifecycle',
    lead: [
      'Choosing the mechanism is the first decision, not the last one.',
      'Terra Nexus stays with a program across its whole life, holding strategy, technical requirements, operating infrastructure, assurance, and commercialization on the same track.',
    ],
    notes: {
      evaluate: { title: 'Find where the opportunity actually is.', body: 'Test outcomes, mechanisms, standards, eligibility, claims, economics, buyers, incentives, and risk before committing to a route.' },
      design: { title: 'Decide how the mechanism will work.', body: 'Set the program structure, the asset or claim, the methodology, chain of custody, ownership model, incentives, and commercial approach.' },
      build: { title: 'Stand up what it takes to operate.', body: 'MRV, data, workflows, contracts, registries, controls, traceability, accounting, and assurance — built to run, not to demonstrate.' },
      launch: { title: 'Move from design into the market.', body: 'Onboard suppliers, buyers, and partners, run the first transactions, integrate operations, and widen participation.' },
      operate: { title: 'Hold performance and credibility over time.', body: 'Data, counterparties, verification, audits, registries, accounting, claims, reporting, and the obligations that never stop arriving.' },
      commercialize: { title: 'Convert verified performance into return.', body: 'Monetize assets, capture incentives, improve procurement economics, differentiate product, meet targets, and move value back down the supply chain.' },
    },
  },

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

  comparison: {
    heading: 'Same performance. Different market architecture.',
    lead: 'A reduction at a farm, a supplier, a factory, or a production facility does not belong to any single mechanism by nature.',
    cells: [
      { label: 'Carbon or Ecosystem Credit', body: 'The quantified outcome becomes an independently issued environmental asset.' },
      { label: 'Scope 3 Reduction or Inset', body: "The outcome stays inside a company's value chain and counts toward its performance there." },
      { label: 'Product or Commodity Claim', body: 'The characteristic remains attributable to the physical product being bought or sold.' },
      { label: 'Environmental Attribute Certificate', body: 'The characteristic is conveyed by certificate and can be transacted apart from the product.' },
    ],
    quote: 'The performance may begin in the same place. The architecture decides how the value is carried, who can claim it, and where it finally accrues.',
  },

  ctaHeading: 'Choose the right mechanism. Build it to last.',
  ctaBody: 'Environmental markets get difficult where science, standards, supply chains, accounting, claims, and commercial objectives all have to agree at once. Terra Nexus helps clients pick the mechanism, build what sits behind it, keep it standing through verification and market change, and turn credible performance into value that lasts.',
  ctaButton: { label: 'Turn environmental performance into value', href: '/contact/' },
};
