// Sustainable Supply Chains — expertise topic record.
//
// First of the four value-chain topics. These are later links in the same
// Cultivation-to-Claim chain the production topics start: the practice change
// still happens on a farm, but this page is about whether the buyer can see it,
// move it and say something about it. That changes three fields the gap
// assessment flagged — the indicator set, the section 04 frame, and the
// adoption constraints, which are about supplier capability and willingness to
// qualify rather than on-farm cash flow.
//
// PROVENANCE
//  * hero, eyebrow, CTA, `potential.lead` (from `orientation`) and the pillar
//    bullets (from `performanceCategories`) are lifted from the previous
//    pages/expertise/sustainable-supply-chains/index.astro — approved copy.
//  * `investments.interventions` derive from "What Sustainable Supply Chains
//    Includes" in plans/content/sustainable-supply-chains-page-copy.md.
//  * `adoption.constraints` and the indicator issues follow that page copy's
//    own "Common Reasons ... Struggle" list.
//
// NEEDS OWNER REVIEW BEFORE PUBLISH
//  * `overview.stats` — CDP figures for the food, beverage and tobacco sector
//    (over 87% of emissions in Scope 3; supply-chain emissions ~23x direct
//    operations; raw materials 40–60% of product emissions; 15% of disclosing
//    corporates with a Scope 3 target). Uncited on the page, as on the other
//    topics.
//  * `pathways[].examples` — named standards and programs.
//  * `investments.interventions` — authored from the page copy rather than
//    extracted; no ChatGPT pass covers this topic.
//  * `positioning` — authored for the influence/incentive/mechanism band.
//  * `enablers.tools` — empty pending owner assignment. See ./tools.ts.
import type { ExpertiseTopic } from './types';
import { attachDefinitions, topicHeroImage } from './shared';

export const sustainableSupplyChains: ExpertiseTopic = {
  slug: 'sustainable-supply-chains',
  name: 'Sustainable Supply Chains',
  eyebrow: 'From Source to Delivery',

  hero: 'Connect Responsible Production to Credible Products and Claims',
  heroLead:
    'Terra Nexus helps commodity traders, processors, food companies, retailers, and their partners design sustainable supply chains that align sourcing, supplier engagement, traceability, operations, commercial value, environmental accounting, and customer expectations.',
  heroImage: topicHeroImage('sustainable-supply-chains', 1600),
  heroImageAlt: 'Grain handling and logistics at a processing facility',

  meta: {
    title: 'Sustainable Supply Chains | Terra Nexus',
    description:
      'Terra Nexus aligns sourcing, supplier programs, traceability and environmental accounting so a supply chain can substantiate what it claims.',
    canonical: '/expertise/sustainable-supply-chains/',
  },

  cta: {
    heading: 'Build a Supply Chain That Can Deliver and Substantiate Value',
    text: 'Whether the starting point is a sourcing commitment, a supplier program, a traceability requirement, a customer claim, or an environmental target, Terra Nexus helps clients connect the physical flow with the evidence and the commercial model that has to travel alongside it.',
  },

  links: {
    whoWeWorkWith: { label: 'See who we work with', href: '/who-we-work-with/' },
    markets: { label: 'See how each market pathway works', href: '/#our-markets' },
    capabilities: { label: 'Our Approach & Capabilities', href: '/capabilities/' },
    digital: { label: 'See all of our Digital Solutions', href: '/digital-solutions/' },
    expertise: { label: 'All expertise areas', href: '/expertise/' },
    caseStudies: { label: 'Case studies', href: '/case-studies/' },
  },

  // AUTHORED for the influence/incentive/mechanism band. Needs owner review.
  positioning: {
    influence: 'Concentrated but indirect. A handful of buyers sit above thousands of producers, which is leverage — exercised through a purchase order rather than a management decision.',
    incentive: 'Supply security and customer requirements first. Most of the emissions sit in Scope 3, so the target the buyer is held to is produced by someone else.',
    mechanism: 'Scope 3 and insets lead, because the buyer needs the reduction inside its own inventory rather than as a unit it purchased from elsewhere.',
  },

  overview: {
    label: 'Overview',
    heading: 'Almost Everything a Food Company Is Accountable For Happens Somewhere Else',
    lead: 'For food, beverage and tobacco companies the overwhelming majority of emissions sit in Scope 3 — in the fields, mills, plants and trucks of other businesses. That is also where the sourcing risk, the quality risk and the claim risk live. A supply chain strategy is really a strategy for changing things you do not own, and then being able to show that it happened.',
    stats: [
      { figure: '87%', label: 'of food, beverage and tobacco sector emissions sit in Scope 3' },
      { figure: '23x', label: 'the size of supply-chain emissions against direct operations for food and drink' },
      { figure: '40-60%', label: 'of a product’s emissions come from raw materials alone' },
      { figure: '15%', label: 'of disclosing corporates have actually set a Scope 3 target' },
    ],
    body: [
      {
        title: 'Leverage is real, and it is indirect',
        text: 'A small number of buyers sit above a very large number of producers, which is genuine influence. It is exercised through specifications, contracts and purchase orders rather than through management decisions, so every change has to be worth making for the supplier as well as for the buyer.',
      },
      {
        title: 'Four things are being underwritten at once',
        text: 'People: the producers and suppliers asked to change how they operate. Places: the landscapes those suppliers draw on. Planet: the footprint of everything bought, which is most of the total. Profits: the margin that has to survive the cost of origination, evidence and assurance.',
      },
      {
        title: 'The evidence has to move with the product',
        text: 'A commodity is aggregated, commingled, transformed and re-sold, and each of those steps can sever the link between what happened upstream and what may be said downstream. Most supply-chain programs fail at that join rather than at the practice change itself.',
      },
    ],
  },

  potential: {
    label: 'The Potential',
    heading: 'Connecting the Chain Changes the Value Equation',
    lead: 'A sustainable supply chain is not a certificate or a platform. It is the alignment of sourcing strategy, supplier economics, physical flow, data, contracts and claims so that what happens at origin can be relied on at the point of sale. Any one of those working alone produces cost without value: traceability with no commercial use, a supplier program with no buyer, or a claim the physical flow cannot support.',
    transition: 'Done well, that connection changes the whole value equation.',
    pillars: [
      {
        tag: 'Resilient',
        title: 'Supply that holds under pressure',
        text: 'Knowing where volume comes from, and having a relationship with the people producing it, is what makes a disruption survivable.',
        bullets: [
          'Reduced concentration in single origins, suppliers, or routes',
          'Earlier visibility of production, quality, and delivery risk',
          'Stronger supplier relationships and long-term access to volume',
          'More options when a region, crop, or counterparty fails',
          'Contingency planning grounded in real supply-shed knowledge',
        ],
      },
      {
        tag: 'Sustainable',
        title: 'Impact reduced where it happens',
        text: 'The footprint is upstream, so the reduction has to be too, with the accounting to carry it back down the chain.',
        bullets: [
          'Scope 3 reductions attributable to a specific supply shed',
          'Product footprints built from primary data rather than averages',
          'Deforestation and conversion risk managed at source',
          'Water, soil and biodiversity outcomes tied to sourcing regions',
          'Environmental attributes controlled rather than assumed',
        ],
      },
      {
        tag: 'Prosperous',
        title: 'Value the chain can actually collect',
        text: 'Evidence that survives an auditor, and a commercial model where the cost sits with someone who benefits.',
        bullets: [
          'Producer and supplier economics that justify participation',
          'Premiums, qualification, or preferred-supplier status that pay for the program',
          'Customer reporting and assurance packages that hold up',
          'Reduced cost of audit, exception handling, and rework',
          'Differentiated products supported by defensible evidence',
        ],
      },
    ],
    kicker: 'The physical flow and the evidence flow have to be designed as one system, because the market only pays when both arrive intact.',
  },

  correcting: {
    label: 'Course Correcting',
    heading: 'What the Gaps in the Chain Actually Cost',
    lead: 'Supply chains were optimised for cost, speed and volume, and the information that would now be valuable was never worth keeping. Five indicators show where that shows up, and where a program either closes the gap or adds cost without closing it.',
    indicators: attachDefinitions([
      {
        key: 'continuity',
        name: 'Continuity',
        definition:
          'The ability to keep getting the volume, quality and specification the business has promised its own customers, through a bad season, a disrupted route or a failed counterparty.',
        issues: [
          'Volume concentrated in a single origin, supplier or route',
          'No visibility of production conditions until delivery fails',
          'Climate and nature exposure in the supply shed unmapped',
          'Contingency plans built on historical availability',
        ],
      },
      {
        key: 'supplier',
        name: 'Supplier economics',
        definition:
          'Whether participating in the program is a rational business decision for the supplier or producer being asked. Requirements without a proposition are the most reliable way to get non-compliance.',
        issues: [
          'Requirements issued with no economic proposition attached',
          'Cost of data collection carried entirely by the supplier',
          'Premiums that do not survive contact with actual volumes',
          'Short contracts against changes that take years to pay back',
        ],
      },
      {
        key: 'traceability',
        name: 'Traceability',
        definition:
          'The controls that connect a product or an attribute to an origin, producer, practice, facility, batch or supply shed — at the level of precision the intended claim actually needs, and no more.',
        issues: [
          'Chain-of-custody rules that do not match real storage and mixing',
          'Traceability more complex and costly than the value it protects',
          'Conversion and co-product allocation poorly controlled at processing',
          'Records that break at the first transfer of ownership',
        ],
      },
      {
        key: 'emissions',
        name: 'Emissions',
        definition:
          'The greenhouse gas footprint of everything bought, which for most food businesses is the overwhelming majority of the total and the part they do not directly control.',
        issues: [
          'Category averages standing in for primary supplier data',
          'Boundaries that differ between product, inventory and certification',
          'Supplier reductions with no route into the buyer’s inventory',
          'Reductions claimed by more than one party in the same chain',
        ],
      },
      {
        key: 'integrity',
        name: 'Integrity',
        definition:
          'Whether what is asserted about the product survives scrutiny: the accuracy of the underlying records, the rights to make the claim, and the controls that would catch a problem before a customer or an auditor does.',
        issues: [
          'Contracts that do not allocate attributes, representations or liabilities',
          'Claims broader than the physical flow or the evidence supports',
          'Fraud and misrepresentation risk in long, fragmented chains',
          'Exception handling and reconciliation treated as an afterthought',
        ],
      },
    ]),
  },

  investments: {
    label: 'Priority Investments',
    heading: 'Investments That Close the Gaps',
    // Frame labels per the gap assessment: this is a value-chain topic, so the
    // three places investment lands are the stages of the chain itself.
    lead: 'Every investment lands in one of three places: what gets bought and from whom, how it moves and is transformed, or the evidence that travels alongside it. Filter by the indicator you are trying to move.',
    frame: [
      { title: 'Procurement', text: 'Supplier and category strategy, requirements, incentives and contracts — what is bought, from whom, and on what terms.' },
      { title: 'Transformation', text: 'Origination, aggregation, processing and allocation: where product characteristics are preserved or lost.' },
      { title: 'Evidence', text: 'Traceability, accounting, controls and assurance — what can still be substantiated at the point of sale.' },
    ],
    interventions: [
      {
        id: 'sourcing',
        group: 'Procurement',
        name: 'Responsible Sourcing & Procurement',
        impacts: ['continuity', 'supplier', 'emissions'],
        mechanism: 'Set supplier and category strategy, procurement requirements, incentives and contract terms that make the intended outcome a condition of doing business.',
        value: 'Leverage applied where the impact occurs, with a defined route for cost to travel upstream',
        barrier: 'Supplier capacity, fragmented supply base and internal misalignment between procurement and sustainability',
        evidence: 'A requirement in a contract is not an outcome. Adoption, verification and the resulting change each need separate evidence.',
        commercial: 'Scope 3 · sourcing claim · supplier program',
      },
      {
        id: 'supplierprog',
        group: 'Procurement',
        name: 'Supplier & Producer Programs',
        impacts: ['supplier', 'continuity', 'emissions'],
        mechanism: 'Build the technical support, cost sharing, data workflow and contract terms that make participation viable for the supplier.',
        value: 'Actual adoption rather than nominal compliance, and a supply base that stays',
        barrier: 'Cost allocation, multi-year commitment against annual budgets, and suppliers serving several buyers with different asks',
        evidence: 'Participation rates and verified practice change are different measures. Report them separately.',
        commercial: 'Scope 3 · inset · preferred supplier',
      },
      {
        id: 'traceability',
        group: 'Evidence',
        name: 'Traceability & Chain of Custody',
        impacts: ['traceability', 'integrity'],
        mechanism: 'Design the model — identity preserved, segregated, mass balance or book and claim — to the level the intended claim requires, and control it through each transfer.',
        value: 'A claim that survives the processor, the trader and the auditor',
        barrier: 'Commingling in real operations, cost of segregation, and system boundaries that differ by function',
        evidence: 'The chain-of-custody model determines what may be said. Choosing it after the claim is the common and expensive error.',
        commercial: 'Product claim · certification · Scope 3',
      },
      {
        id: 'origination',
        group: 'Transformation',
        name: 'Origination & Aggregation Controls',
        impacts: ['traceability', 'continuity', 'integrity'],
        mechanism: 'Control eligible volume through delivery, commingling, segregation, mass balance and reconciliation at the point product changes hands.',
        value: 'Eligible volume that reconciles, and attributes that are not over-allocated',
        barrier: 'Elevator and facility practicality, seasonal peaks and legacy inventory systems',
        evidence: 'Volume reconciliation is the control that catches over-claiming. Without it the rest of the system is assertion.',
        commercial: 'Low-CI product · certified volume · Scope 3',
      },
      {
        id: 'processing',
        group: 'Transformation',
        name: 'Processing & Allocation',
        impacts: ['traceability', 'emissions', 'integrity'],
        mechanism: 'Govern conversion factors, co-product allocation and attribute handling through transformation so impacts and characteristics follow the right output.',
        value: 'Defensible product footprints and co-product treatment that does not double count',
        barrier: 'Multi-output plants, allocation method choice and commercially sensitive yield data',
        evidence: 'Allocation method materially changes the result. State it, and keep it consistent with the accounting boundary.',
        commercial: 'Product footprint · Scope 3 · certified product',
      },
      {
        id: 'logistics',
        group: 'Transformation',
        name: 'Logistics & Delivery',
        impacts: ['continuity', 'emissions'],
        mechanism: 'Manage transport, storage, handling, cold chain and reverse logistics alongside the movement of the records that describe them.',
        value: 'Service reliability, loss reduction and a transport footprint built on real movements',
        barrier: 'Third-party carriers, modal constraints and data that lives in someone else’s system',
        evidence: 'Transport is usually a small share of a food footprint. Report it accurately, but do not let it crowd out the material sources.',
        commercial: 'Product footprint · service · cost to serve',
      },
      {
        id: 'accounting',
        group: 'Evidence',
        name: 'Environmental Accounting & Claims',
        impacts: ['emissions', 'integrity', 'traceability'],
        mechanism: 'Align Scope 3 inventory, product footprints, insets, certification and customer reporting to one set of boundaries and one set of records.',
        value: 'One version of the number, usable for disclosure, customers and assurance',
        barrier: 'Functions with different reporting calendars, methods and definitions of the same thing',
        evidence: 'Inconsistent boundaries between systems is the most common finding in assurance. Fix the boundary before the calculation.',
        commercial: 'Scope 3 · product claim · disclosure',
      },
      {
        id: 'resilience',
        group: 'Procurement',
        name: 'Resilience & Risk Management',
        impacts: ['continuity', 'integrity', 'supplier'],
        mechanism: 'Assess concentration, climate and nature exposure, fraud, human rights, quality and counterparty risk across the supply base and plan for continuity.',
        value: 'Fewer surprises, and a defensible answer when one arrives',
        barrier: 'Visibility beyond tier one, cost of dual sourcing and the difficulty of pricing a low-frequency event',
        evidence: 'Risk assessment informs decisions. It does not by itself demonstrate an outcome to a customer.',
        commercial: 'Supply security · compliance · customer assurance',
      },
    ],
  },

  adoption: {
    label: 'Accelerating Adoption',
    heading: 'Why a Sourcing Commitment Still Needs a Program',
    lead: 'Because the change has to happen at a supplier who did not make the commitment. A buyer announcing a target creates an obligation for itself and a cost for someone else, and the supplier is usually serving several buyers whose requirements do not agree. Adoption stalls where the asking is easy and the qualifying is expensive.',
    constraintEyebrow: 'Fund the scaling constraint',
    constraintHeading: 'Build a proposition a supplier can say yes to.',
    constraintLead: 'The right mechanism depends on what is actually preventing adoption. Each constraint below names what blocks the decision and how a program relieves it.',
    constraints: [
      {
        n: '01',
        title: 'Pay for the qualification, not just the outcome',
        text: 'Getting audit-ready costs a supplier real money and management time before any premium exists. Fund the qualification step itself, or only the suppliers who least need the business will bother.',
      },
      {
        n: '02',
        title: 'Match the ask to the supplier’s capability',
        text: 'A requirement written for a large integrated supplier is unmeetable for a smaller one, and excluding them narrows the supply base. Tier the requirement to capacity and provide the support that closes the gap.',
      },
      {
        n: '03',
        title: 'Right-size the traceability',
        text: 'Identity preservation costs more than mass balance and is not always needed. Choose the chain-of-custody model from the claim you intend to make, then build only to that level.',
      },
      {
        n: '04',
        title: 'Commit for longer than a season',
        text: 'Suppliers will not invest against an annual purchase order. Multi-year volume, floor prices or preferred-supplier status turn a compliance burden into an asset worth building.',
      },
      {
        n: '05',
        title: 'Resource the recurring operation',
        text: 'Reconciliation, exceptions, corrections and audit preparation continue every cycle, and the pilot budget never includes them. Staff and govern the ongoing program before scaling it.',
      },
    ],
  },

  fit: { label: 'Validating Market Fit', heading: 'Where Does an Opportunity Sit?' },

  verifying: {
    label: 'Verifying What Matters Most',
    heading: 'Measure Twice Credit Once',
    lead: 'Evidence costs money, so the useful question is how much this particular claim requires. Five layers build on each other, and the claim decides how far up you need to go.',
    layers: [
      { n: '01', name: 'Practice', question: 'What changed?', examples: 'Supplier requirement, production practice, process or routing change' },
      { n: '02', name: 'Outcome', question: 'What happened?', examples: 'Emissions per unit, deforestation risk, water and quality outcomes, loss rates' },
      { n: '03', name: 'Traceability', question: 'What is it connected to?', examples: 'Producer, load, elevator, facility, batch, supply shed, product' },
      { n: '04', name: 'Rights & Accounting', question: 'Who can use it?', examples: 'Contractual ownership, allocation, transfer, retirement, inventory use' },
      { n: '05', name: 'Market Integrity', question: 'How can it be used?', examples: 'Double counting across the chain, uncertainty, substantiation, claim language' },
    ],
  },

  pathways: {
    label: 'Market Pathways',
    heading: 'How the Performance Gets Paid For',
    lead: 'The same upstream improvement can reach a market four different ways. The route chosen changes what has to be traced and transferred, which is why it belongs in the sourcing design rather than at the end.',
    // Scope 3 leads: the buyer's own inventory is the reason the program exists.
    items: [
      {
        id: 'm02',
        n: '01',
        name: 'Scope 3 & Insets',
        carrier: 'As an outcome connected to the value chain',
        tagline: 'Create and account for environmental value inside the value chain.',
        whenToUse: 'Use when the buyer sources from the supply shed where the change happens, which for a supply-chain program is the usual case.',
        detail: 'This is the native route for the topic. Most of a food company’s footprint is bought, so the reduction has to stay attached to the chain that produced it rather than being purchased separately. The difficulty is allocation across a chain where several parties contributed and each would like to report it.',
        examples: [
          'GHG Protocol Corporate Value Chain (Scope 3) Standard',
          'GHG Protocol Land Sector and Removals Guidance',
          'SBTi FLAG and Scope 3 target accounting',
          'Value Change Initiative intervention guidance',
        ],
      },
      {
        id: 'm03',
        n: '02',
        name: 'Product & Commodity Claims',
        carrier: 'As an attribute of the physical product',
        tagline: 'Make environmental performance part of what is bought and sold.',
        whenToUse: 'Use when the characteristic can travel with the physical product to a customer who will pay for it, or where a regulation requires it.',
        detail: 'Certification and origin claims are the established route, and increasingly a condition of access rather than a premium. What decides feasibility is the chain-of-custody model: a claim that requires identity preservation through a commingled system will not survive.',
        examples: [
          'EU Deforestation Regulation, applying from 30 December 2026',
          'Commodity certification and responsible sourcing programs',
          'SAI Platform Farm Sustainability Assessment',
          'Product carbon footprints under ISO 14067 and the GHG Protocol Product Standard',
        ],
      },
      {
        id: 'm04',
        n: '03',
        name: 'Environmental Attribute Certificates',
        carrier: 'As a certificate conveying the attribute',
        tagline: 'Convey environmental value when physical supply alone cannot.',
        whenToUse: 'Use when segregation is impractical across a large supply base but the buyer still needs to procure differentiated production.',
        detail: 'Commodity systems commingle by design, which is exactly the problem book-and-claim exists to solve. The architecture carries all the risk: issuance, custody, transfer, retirement and exclusivity have to agree, and the claim language has to be honest about what was bought.',
        examples: [
          'Book-and-claim programs for agricultural commodities',
          'Low-carbon commodity and material certificates',
          'Agricultural environmental attribute registries',
          'ISO 22095 chain of custody',
        ],
      },
      {
        id: 'm01',
        n: '04',
        name: 'Carbon & Ecosystem Credits',
        carrier: 'As a quantified environmental asset',
        tagline: 'Turn verified environmental outcomes into market-ready assets.',
        whenToUse: 'Use where the upstream outcome is better funded as a transferable unit than carried through the chain, typically outside the buyer’s own supply shed.',
        detail: 'Least aligned with the topic, because a credit deliberately detaches the outcome from the chain that produced it. It is the right structure when the funder is not the buyer, and the wrong one when the point of the program was the buyer’s own inventory.',
        examples: [
          'Agricultural and land-management carbon methodologies',
          'Nature and water credit frameworks where they apply',
          'Registry issuance, transfer and retirement infrastructure',
        ],
      },
    ],
  },

  approach: {
    label: 'Our Approach',
    heading: 'Terra Nexus Manages the Full Development Lifecycle',
    lead: 'Whatever the topic, the work runs the same six stages. Most clients join partway along, and we carry it from there through to the point the market value is captured.',
  },

  enablers: {
    label: 'Digital Enablers',
    heading: 'Turning Program Design into Operating Infrastructure',
    lead: 'Our tools support commercial developers and corporate buyers across the same lifecycle: finding high-value opportunities, prioritizing investments, accelerating adoption, measuring impact and maximizing value through the market pathways that fit the program.',
    leadTwo: 'We build fit-for-purpose tools where they are required the most. The operating infrastructure that supports recurring data, calculations, evidence, traceability or reconciliation that often constrain the success of a program to profitably scale.',
    // Awaiting owner tool assignment — see data/expertise/tools.ts.
    tools: [],
  },
};
