// Carbon & Ecosystem Services — capability family record.
//
// PROVENANCE
//  * Hero title/lead, meta description, `offerings[].name/description`, the
//    mechanism and lifecycle section headers, `comparison` and the closing
//    CTA are lifted verbatim from
//    pages/capabilities/carbon-and-ecosystem-services/index.astro (the
//    2026-08-19 bespoke rebuild from a second designer's reference
//    prototype; see git history of that file for the prototype provenance),
//    moved here 2026-09-13 so all five families share one shape and one
//    template. No copy changed in the move.
//  * `decisionOwners`, `coreQuestion` and `scopeBoundary` are from
//    knowledge/services/carbon-and-ecosystem-services/overview.md
//    (status: stable, owner-sourced). Decision owners are sentence-cased;
//    the record lists them in lower case.
//  * `offerings[].detail` is from the seven offering records in
//    knowledge/services/carbon-and-ecosystem-services/<offering>.md:
//    the Draft Description, Primary Decision Owners, Core Client Question,
//    Representative Client Problems and Proposed Deliverables sections,
//    verbatim. Those records were agent drafts (2026-08-01) and were
//    APPROVED BY THE OWNER on 2026-09-13 in the Capabilities review session;
//    their publication blocks now say so. Scope, Boundary and Proposed
//    Capabilities sections are deliberately not rendered: scope duplicates
//    the one-liner, boundaries are internal taxonomy, and capabilities
//    restate deliverables.
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
// STILL OPEN — each offering record's "Information Requiring Owner Approval"
// list was not answered by the approval and nothing on the page depends on
// it. The recurring items: whether Terra Nexus advises only or also manages
// or operates (transactions, programs, procurement); which registries,
// methodologies, MRV platforms and verification bodies it has worked with;
// and any named engagements. None of those claims are rendered.
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

  decisionOwners: ['Environmental markets teams', 'Carbon desks', 'Trade desks', 'P&L owners', 'Program owners', 'Project developers', 'Portfolio managers'],
  coreQuestion: 'How are environmental assets, attributes, credits, insets, offsets, and claims created, accessed, valued, verified, accounted for, managed, and monetized?',
  scopeBoundary: 'Environmental asset and claims markets, program operations, verification, valuation, and accounting across inventory, product, project, and disclosure systems.',

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
    {
      name: 'VCM & Scope 3 Markets',
      description: 'Evaluate how organizations can access, buy, sell, develop, use, or participate in voluntary carbon, Scope 3, inset, and related markets.',
      subOfferings: [],
      detail: {
        description: 'This offering supports organizations seeking to participate in, benefit from, or structure positions in voluntary carbon markets (VCMs) and Scope 3 supply chain claims programs. It addresses the access and strategy decisions that environmental markets teams, carbon desks, and trade desks face before committing capital, contracts, or claims to a market mechanism.',
        decisionOwners: ['Environmental markets teams', 'Carbon desks and trade desks', 'P&L owners assessing market participation', 'Corporate development evaluating portfolio positions'],
        coreQuestion: 'How do we access, evaluate, structure, and benefit from voluntary carbon markets and Scope 3 supply chain claim programs — and what commitments, risks, and accounting implications come with each pathway?',
        problems: [
          'We need to understand which VCM credit types meet our buyer requirements and sustainability claims.',
          'We are a commodity trader evaluating inset programs — how do supply chain claims work, and what are the verification and contract requirements?',
          'We have a corporate net-zero commitment — what role should voluntary carbon credits play, and which registry and standard requirements apply?',
          'We want to establish a position in Scope 3 supply chain outcomes — what are the available program models and what do they require of us?',
        ],
        deliverables: ['Market access strategy memo', 'Credit-type and registry comparison matrix', 'Scope 3 claim pathway options analysis', 'Inset vs. offset decision framework', 'Counterparty and contract review checklist'],
      },
    },
    {
      name: 'Commercialization Pathways',
      description: 'Compare product claims, insets, credits, certifications, regulatory pathways, customer programs, and other market mechanisms using route-to-market, value, utilization, ownership, stacking, and risk analysis.',
      subOfferings: [],
      detail: {
        description: 'This offering supports organizations — including growers, processors, commodity companies, project developers, and program operators — in translating environmental performance into credible, monetizable claims, credits, or program revenue. It addresses the route-to-market decisions that come after the technical environmental work has been performed and before the asset or claim enters a market.',
        decisionOwners: ['Program owners and project developers', 'P&L owners with environmental performance assets', 'Environmental markets teams evaluating monetization options', 'Corporate development assessing new revenue streams'],
        coreQuestion: 'Given our environmental performance, program structure, or project outcomes, what commercialization pathway best meets our financial, strategic, reputational, and stakeholder requirements — and how do we execute it?',
        problems: [
          'We have a regenerative agriculture program producing verified GHG reductions — what are our commercialization options and what do they require?',
          'We want to sell Scope 3 insets to downstream customers — what structure, verification, and documentation do we need?',
          'We are evaluating whether to sell credits on a public registry, through a bilateral contract, or as a product attribute premium — how do we compare these routes?',
          'We have multiple environmental attributes (carbon, water, biodiversity) — can we stack them, and what are the commercial and accounting implications?',
        ],
        deliverables: ['Commercialization pathway options analysis', 'Commercial model and revenue scenario model', 'Buyer segmentation and outreach strategy', 'Claims documentation framework', 'Route-to-market plan'],
      },
    },
    {
      name: 'Asset & Portfolio Valuation',
      description: 'Assess the quality, risk, value, strategic fit, and portfolio role of environmental assets, projects, programs, and claims.',
      subOfferings: [],
      detail: {
        description: 'This offering supports organizations in valuing individual environmental assets, credit positions, or entire programs and portfolios of environmental attributes. It addresses the financial, risk, and strategic questions that portfolio managers, finance functions, investment committees, and environmental markets teams need to answer before making capital allocation, trading, or reporting decisions.',
        decisionOwners: ['Portfolio managers and environmental asset managers', 'Finance functions and investment committees', 'Environmental markets teams and carbon desks', 'Corporate development evaluating acquisitions or investments in carbon programs'],
        coreQuestion: 'What are our environmental assets, credit positions, or program outcomes worth — and how do we assess, manage, and report a portfolio of environmental value across different program types, registries, vintages, and markets?',
        problems: [
          'We have a portfolio of carbon credits across multiple registries and vintages — how do we value and manage it?',
          'We are acquiring a company with environmental program assets — what are they worth and what are the risks?',
          'We need to present our carbon asset position to our investment committee — what valuation framework should we use?',
          'We are evaluating which programs to prioritize for new investment based on risk-adjusted returns.',
        ],
        deliverables: ['Asset valuation report and methodology', 'Portfolio dashboard or tracking model', 'Risk and scenario analysis', 'Investment committee memo or presentation', 'Due diligence framework for environmental asset acquisitions'],
      },
    },
    {
      name: 'Pilot Development & Partner Selection',
      description: 'Design pilots that test critical technical, operational, commercial, and market assumptions before scale and select the partners and technologies required.',
      subOfferings: [],
      detail: {
        description: 'This offering supports organizations designing and launching pilots for environmental programs — including supply chain sustainability programs, carbon and ecosystem service programs, and inset or credit generation initiatives. It addresses the design, feasibility, and partner selection decisions that program owners face before committing to full-scale implementation.',
        decisionOwners: ['Program owners responsible for new environmental or sustainability program development', 'P&L owners and corporate development evaluating new initiatives', 'Supply chain and procurement leaders sponsoring supplier-facing programs', 'Project developers evaluating site, crop, geography, or technology selection'],
        coreQuestion: 'How do we design a viable pilot for an environmental program, select the right technology, methodology, and operating partners, and structure the program to scale — while managing risk and proving concept before full investment?',
        problems: [
          'We want to test a regenerative agriculture program with a subset of our supplier base — how do we design it and who are the right technology and verification partners?',
          'We need to choose between MRV platforms for our soil carbon program — what are the tradeoffs in data requirements, costs, and credit eligibility?',
          'We are evaluating three potential program geographies — how do we assess feasibility, baseline potential, and partnership ecosystem in each?',
          'We want to launch a pilot quickly but are uncertain about which standard or registry will best serve our long-term strategy.',
        ],
        deliverables: ['Pilot program design document', 'Feasibility and baseline assessment', 'Technology/MRV platform comparison and recommendation', 'Partner and verifier selection matrix', 'Pilot economics model', 'Scale-up pathway and decision criteria'],
      },
    },
    {
      name: 'Program Design & Operations',
      description: 'Build and manage program governance, workflows, data, contracts, controls, ledgers, chain of custody, partners, exceptions, and reporting.',
      subOfferings: [],
      detail: {
        description: 'This offering covers the end-to-end design and operational management of environmental programs — including supply chain sustainability programs, carbon and ecosystem service credit programs, insetting programs, and ecosystem service payment schemes. It supports program owners and operators who need to build, run, and continuously improve programs at scale.',
        decisionOwners: ['Program owners responsible for environmental program operations', 'P&L owners managing program economics and performance', 'Supply chain and procurement leaders running supplier engagement programs', 'Operations teams responsible for program delivery'],
        coreQuestion: 'How do we design a program that meets technical, commercial, stakeholder, and verification requirements — and how do we operate it efficiently, improve it over time, and scale it without losing integrity?',
        problems: [
          'We are operating a supply chain carbon program across hundreds of growers — how do we improve data quality, reduce operational costs, and increase credit issuance rates?',
          'We need to scale from 50 to 500 enrolled suppliers — how do we do it without losing program integrity?',
          'Our program has failed two consecutive verification audits — what needs to change in our data management and measurement protocols?',
          'We want to add a biodiversity or water metric to our existing soil carbon program — how do we integrate it without disrupting existing operations?',
        ],
        deliverables: ['Program design document and protocol', 'Enrollment materials and participant onboarding framework', 'MRV system configuration and data dictionary', 'Verification readiness checklist and audit preparation package', 'Program performance dashboard', 'Scale-up operational plan'],
      },
    },
    {
      name: 'Impact Verification & Claims Translation',
      description: 'Prepare evidence and programs for independent scrutiny and translate supportable outcomes into claims that match the intended user and market. Terra Nexus does not represent itself as an accredited validator or verifier.',
      subOfferings: [],
      detail: {
        description: 'This offering supports organizations in preparing for, executing, and communicating third-party verification of environmental performance — and in translating verified outcomes into defensible, audience-appropriate claims for customers, investors, regulators, and other stakeholders. It addresses the final step between operational environmental performance and credible public claims.',
        decisionOwners: ['Program owners managing verification and claims processes', 'Environmental markets teams responsible for claims communication', 'Corporate sustainability and ESG teams managing disclosure claims', 'Legal and compliance teams reviewing claim defensibility', 'Communications and marketing teams translating technical outcomes'],
        coreQuestion: 'How do we prepare for verification, ensure our environmental performance is credibly audited, and then translate verified outcomes into claims that meet stakeholder expectations, legal standards, and market requirements?',
        problems: [
          'Our verification body identified non-conformances — how do we address them before our next audit?',
          'We have a verified Scope 3 reduction from our supply chain program — how do we communicate it to customers without creating legal exposure?',
          'We want to make a climate claim on our packaging — what verification, substantiation, and legal review do we need?',
          'We need to respond to a CDP questionnaire about our supply chain program outcomes — how do we structure the response?',
        ],
        deliverables: ['Verification readiness assessment and gap report', 'Pre-audit documentation package', 'Claims communication hierarchy', 'Customer-facing and investor-facing claim summaries', 'Greenwashing risk review memo', 'Substantiation file'],
      },
    },
    {
      name: 'Full-Service GHG Accounting',
      description: 'Connect inventory, product, project, program, and disclosure accounting so performance is calculated, allocated, reported, and claimed consistently.',
      subOfferings: [],
      detail: {
        description: 'This offering addresses the cross-cutting GHG accounting challenge of correctly normalizing and reconciling emissions and removals across the four accounting systems that food and agribusiness organizations must manage simultaneously: corporate inventory (Scope 1/2/3), product-level footprint, project-level or program-level accounting, and additional disclosure systems (reporting frameworks, claims programs, regulatory programs). It is designed to prevent double-counting, claim inconsistency, and disclosure errors that arise when these systems are managed in silos.',
        decisionOwners: ['Environmental markets teams and carbon accounting functions', 'Corporate sustainability and ESG teams responsible for Scope 1/2/3 accounting', 'Finance and legal functions responsible for the accuracy of public disclosures', 'Program owners needing alignment between program-level and enterprise-level accounting'],
        coreQuestion: 'How do we account for GHG emissions and removals consistently — and without errors, double-counting, or inconsistencies — across our corporate inventory, product footprints, environmental program accounting, and disclosure obligations?',
        problems: [
          'We have a supply chain carbon program generating credits — how do we account for the same reductions in our Scope 3 inventory and in our credit portfolio without double-counting?',
          'Our product-level carbon footprints are inconsistent with our corporate Scope 3 inventory — how do we reconcile them?',
          'We are required to report under CSRD and also maintain a Verra-registered program — how do we ensure the accounting is consistent?',
          'We have land assets that generate both biogenic carbon removals and scope 3 reductions — how do we account for them correctly under GHG Protocol and land-sector guidance?',
        ],
        deliverables: ['GHG accounting framework gap analysis', 'Multi-system accounting protocol and decision tree', 'Scope 3 data sourcing plan', 'Land sector accounting methodology selection memo', 'Double-counting register and prevention protocol', 'Disclosure reconciliation report'],
      },
    },
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
