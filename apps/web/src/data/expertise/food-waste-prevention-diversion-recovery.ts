// Food Waste: Prevention, Diversion & Recovery — expertise topic record.
//
// The one topic organised around a hierarchy rather than a system. The page
// copy is explicit that prevention beats every downstream pathway because the
// embedded value is already spent by the time material leaves its intended
// use, and the whole record is built to keep that ordering visible.
//
// PROVENANCE
//  * hero, eyebrow, CTA, `potential.lead` (from `orientation`) and the pillar
//    bullets (from `performanceCategories`) are lifted from the previous
//    pages/expertise/food-waste-prevention-diversion-recovery/index.astro —
//    approved copy.
//  * `investments.interventions` are the seven levers in "What Food Waste
//    Prevention, Diversion, and Recovery Includes", in the page copy's own
//    hierarchy order.
//  * `adoption.constraints` and the indicator issues follow that page copy's
//    own "Common Reasons Food-Waste Programs Struggle" list.
//  * The page copy's frameworks section names categories rather than
//    instruments and requires verification against current official and local
//    sources, so `pathways[].examples` are researched and flagged below.
//
// NEEDS OWNER REVIEW BEFORE PUBLISH
//  * `overview.stats` — 1.05 billion tonnes wasted in 2022, households at 60%
//    (631 million tonnes), 79 kg per person per year, and roughly a billion
//    meals a day are from the UNEP Food Waste Index Report 2024. The 11% / 5%
//    / 2% split across households, foodservice and retail is from the same
//    source. Uncited on the page, as on the other topics.
//  * Organics and landfill-diversion rules are state and municipal in the US
//    and national in the EU, so `pathways[].examples` is deliberately generic
//    about them. Recheck before publish if any specific mandate is named.
//  * `positioning` — authored for the influence/incentive/mechanism band.
//  * `enablers.tools` — empty pending owner assignment. The Food Waste
//    Platform render exists and is the obvious candidate for this topic, but
//    the assignment is the owner's call. See ./tools.ts.
import type { ExpertiseTopic } from './types';
import { attachDefinitions, topicHeroImage } from './shared';

export const foodWastePreventionDiversionRecovery: ExpertiseTopic = {
  slug: 'food-waste-prevention-diversion-recovery',
  name: 'Food Waste: Prevention, Diversion & Recovery',
  eyebrow: 'Prevent, Redistribute, Repurpose & Recover',

  hero: 'Keep Food and Resources at Their Highest Value',
  heroLead:
    'Terra Nexus helps food businesses prevent loss, redesign operations, create markets for surplus and byproducts, select recovery pathways, and build circular programs that improve economics and environmental performance.',
  heroImage: topicHeroImage('food-waste-prevention-diversion-recovery', 1600),
  heroImageAlt: 'Surplus produce being sorted for redistribution',

  meta: {
    title: 'Food Waste: Prevention, Diversion & Recovery | Terra Nexus',
    description:
      'Terra Nexus helps food businesses prevent loss, redesign operations, create markets for surplus and byproducts, select recovery pathways, and build circular programs that improve economics and environmental performance.',
    canonical: '/expertise/food-waste-prevention-diversion-recovery/',
  },

  cta: {
    heading: 'Build a Food-Waste Portfolio That Protects Value',
    text: 'Whether the starting point is operational loss, surplus food, a processing byproduct, a new technology, a recovery facility, a circular product, or a corporate target, Terra Nexus helps clients identify the highest-value practical path and build the systems needed to deliver it.',
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
    influence: 'Direct, and unusually so. Most of this loss happens inside operations the business already controls, which is why the returns are faster here than anywhere else in the set.',
    incentive: 'Avoided cost, mostly. Raw material, labour, energy, packaging and disposal that were already paid for, recovered by not losing them twice.',
    mechanism: 'Scope 3 and insets lead, because the reduction sits inside the company’s own inventory and value chain rather than being sold to anyone.',
  },

  overview: {
    label: 'Overview',
    heading: 'A Billion Tonnes, and Most of It Inside Operations You Control',
    lead: 'Around 1.05 billion tonnes of food was wasted in 2022 — roughly a fifth of all food available to consumers — while hundreds of millions of people went hungry. The number that matters commercially is where it sits: most of it is generated in places a business already owns the decisions for, which makes it the rare environmental problem that pays for itself.',
    stats: [
      { figure: '1.05B', label: 'tonnes of food wasted in 2022, about a fifth of what was available' },
      { figure: '60%', label: 'of that waste generated by households — 631 million tonnes' },
      { figure: '79 kg', label: 'of food wasted per person per year, globally' },
      { figure: '~1B', label: 'meals’ worth of edible food discarded every day' },
    ],
    body: [
      {
        title: 'The value is already spent',
        text: 'By the time material leaves its intended use, the business has already paid for raw materials, production, labour, energy, water, packaging, storage and transport. A recovery pathway can reduce disposal cost or earn revenue, but it rarely recovers what was embedded in the original product.',
      },
      {
        title: 'Four things are being underwritten at once',
        text: 'People: the food security that redistribution serves, and the operators whose workload the program changes. Places: the land and water that grew what is being thrown away. Planet: the emissions embedded in wasted food plus those from its disposal. Profits: the yield, disposal cost and side-stream revenue that move together.',
      },
      {
        title: 'Different stages, different problems',
        text: 'A forecasting problem is not a processing byproduct. An edible surplus is not contaminated material. Treating them as one waste stream is the most common way a valuable side stream ends up in the lowest-value outlet available.',
      },
    ],
  },

  potential: {
    label: 'The Potential',
    heading: 'Prevention First, Then the Highest Practical Use',
    lead: 'The most effective approach is to understand where food, nutrients, materials, energy, labor, and money are being lost and then prioritize the highest practical use. Terra Nexus helps clients treat food waste as an integrated portfolio of prevention, redistribution, product, operational, market, and recovery opportunities, and compare prevention with downstream pathways using the complete economics rather than only the disposal fee or revenue per tonne.',
    transition: 'Handled as a portfolio rather than a disposal contract, the gains land in three places.',
    pillars: [
      {
        tag: 'Resilient',
        title: 'More ways out, and better visibility',
        text: 'Optionality is what keeps a surplus from becoming a disposal problem on the day the usual outlet is full.',
        bullets: [
          'More flexible outlets for surplus and byproducts',
          'Stronger coordination among suppliers, operations, customers and recovery partners',
          'Reduced exposure to disposal capacity, commodity volatility and changing rules',
          'Better visibility into material flows and root causes',
          'Earlier identification of surplus, while it still has value',
        ],
      },
      {
        tag: 'Sustainable',
        title: 'Food kept in use, resources recovered',
        text: 'The environmental gain is mostly the waste that never happened, not the treatment applied afterwards.',
        bullets: [
          'Reduced embedded land, water, energy and emissions associated with wasted food',
          'Better matching of supply and demand across the chain',
          'Stronger donation, rescue, markdown and secondary-market pathways',
          'Recovery of nutrients, energy and materials from what remains',
          'Improved circularity and resource efficiency',
        ],
      },
      {
        tag: 'Prosperous',
        title: 'Cost out, yield up, new revenue',
        text: 'The only topic in this set where the business case is usually made on avoided cost alone.',
        bullets: [
          'Reduced raw-material loss, giveaway, overproduction, spoilage and rework',
          'Improved process yield, inventory turns and shelf life',
          'Lower hauling, treatment, disposal and compliance cost',
          'Sale of co-products and byproducts, and improved valuation of side streams',
          'New ingredients, feedstocks, products, feed, materials or services',
        ],
      },
    ],
    kicker: 'Prevention, redistribution, higher-value products, feed, biological recovery, energy — in that order, and disposal only for what has no practical higher use.',
  },

  correcting: {
    label: 'Course Correcting',
    heading: 'Why Value Leaks Before Anyone Measures It',
    lead: 'Food waste is usually managed as a disposal line item, which is the one view that cannot see where the value went. Five indicators show where the losses actually originate, and where a program either recovers them or re-sorts them into a cheaper bin.',
    indicators: attachDefinitions([
      {
        key: 'generation',
        name: 'Loss generation',
        definition:
          'How much material leaves its intended use, where in the operation it originates, and why — the root causes upstream of any outlet decision.',
        issues: [
          'The company beginning with disposal rather than root causes and prevention',
          'Loss attributed to a facility rather than a line, shift, product or supplier',
          'Forecasting, specification and scheduling causes treated as operating noise',
          'Giveaway, rework and overproduction not counted as waste at all',
        ],
      },
      {
        key: 'quality',
        name: 'Material quality',
        definition:
          'Composition, edibility, safety, contamination, consistency and shelf life — the attributes that decide which outlets a stream can legally and commercially reach.',
        issues: [
          'Materials grouped together despite different quality and market potential',
          'Edible surplus handled in the same stream as contaminated material',
          'Food safety, liability, quality and permitting addressed too late',
          'Variability and seasonality unprofiled before a pathway is committed to',
        ],
      },
      {
        key: 'outlet',
        name: 'Outlet value',
        definition:
          'What each available pathway actually returns once embedded product value, avoided cost, revenue and program cost are all counted — not the disposal fee or the price per tonne.',
        issues: [
          'Total embedded product value ignored in favour of hauling cost',
          'Technology selected before feedstock and output markets are validated',
          'Buyer and generator holding mismatched specifications or incentives',
          'Every material forced into one technology or outlet',
        ],
      },
      {
        key: 'logistics',
        name: 'Logistics feasibility',
        definition:
          'Whether the material can physically and economically reach the chosen outlet — collection, segregation, cold chain, storage, transport distance and frequency.',
        issues: [
          'Logistics consuming the value of the proposed pathway',
          'Segregation required at the line but never designed into the workflow',
          'Volume too small or too dispersed to support a dedicated route',
          'Recovery partner capacity assumed rather than contracted',
        ],
      },
      {
        key: 'accounting',
        name: 'Accounting integrity',
        definition:
          'Baselines, boundaries, diversion and emissions calculations, and who owns the resulting claim or environmental attribute.',
        issues: [
          'Waste and circularity claims using inconsistent boundaries',
          'Diversion reported without a defensible baseline',
          'Ownership of claims, credits and attributes unsettled between partners',
          'Pilots launching without recurring ownership, data or performance management',
        ],
      },
    ]),
  },

  investments: {
    label: 'Priority Investments',
    heading: 'Investments Across the Recovery Hierarchy',
    // Frame labels per the gap assessment for this topic.
    lead: 'Every investment lands in one of three places: stopping the loss, keeping the material in use, or extracting value from what remains. Filter by the indicator you are trying to move.',
    frame: [
      { title: 'Generation', text: 'Prevention: forecasting, specification, yield, shelf life, packaging and the operating causes upstream of any outlet.' },
      { title: 'Recovery', text: 'Keeping edible food and usable material in use — redistribution, secondary markets, upcycling and feed.' },
      { title: 'Second Use', text: 'Biological, energy and resource recovery for what remains, plus the measurement and claims that account for all of it.' },
    ],
    interventions: [
      {
        id: 'prevention',
        group: 'Generation',
        name: 'Prevention',
        impacts: ['generation', 'outlet'],
        mechanism: 'Change the causes: demand planning, forecasting, inventory, production scheduling, process control, yield, shelf life, packaging, handling and merchandising.',
        value: 'The full embedded value of material that never becomes waste — the highest return in the portfolio',
        barrier: 'Causes sit across planning, operations, quality and commercial teams with no single owner',
        evidence: 'Prevention is measured against a baseline of loss that no longer occurs. Set the baseline before the intervention, not after.',
        commercial: 'Avoided cost · yield · Scope 3',
      },
      {
        id: 'redistribution',
        group: 'Recovery',
        name: 'Edible-Food Redistribution',
        impacts: ['quality', 'logistics'],
        mechanism: 'Move surplus into secondary sales, markdown, donation and rescue channels, with the safety, liability and logistics coordination that requires.',
        value: 'Edible food kept as food, plus avoided disposal cost and a real community outcome',
        barrier: 'Cold-chain and timing constraints, liability concerns, and partner capacity that varies by region',
        evidence: 'Donation liability protections are jurisdictional. Confirm the applicable regime rather than assuming coverage.',
        commercial: 'Avoided cost · secondary market · community program',
      },
      {
        id: 'upcycling',
        group: 'Recovery',
        name: 'Upcycling & Product Development',
        impacts: ['outlet', 'quality'],
        mechanism: 'Turn byproducts, surplus and side streams into ingredients, food, beverages, feed or biomaterials with a defined customer and specification.',
        value: 'A side stream repriced as a product rather than a cost line',
        barrier: 'Specification consistency, volume reliability, capital for stabilization and processing, and finding the buyer first',
        evidence: 'A byproduct market works only if it works for both sides. Validate the buyer’s specification before the processing investment.',
        commercial: 'New product revenue · ingredient supply · licensing',
      },
      {
        id: 'feed',
        group: 'Recovery',
        name: 'Animal Feed & Agricultural Uses',
        impacts: ['outlet', 'quality', 'logistics'],
        mechanism: 'Route suitable material into feed, soil amendments, fertilizers, compost or other productive agricultural inputs within the applicable rules.',
        value: 'A reliable outlet that keeps nutrients in the food system at modest cost',
        barrier: 'Feed regulations on processed and animal-derived material, contamination risk and haul distance',
        evidence: 'Animal-feed eligibility is tightly regulated and varies by material and jurisdiction. Confirm before committing volume.',
        commercial: 'Avoided cost · feed supply · nutrient recovery',
      },
      {
        id: 'organics',
        group: 'Second Use',
        name: 'Organics Recycling & Biological Recovery',
        impacts: ['outlet', 'logistics'],
        mechanism: 'Compost, digest or biologically treat remaining organic material, including nutrient recovery and organic wastewater management.',
        value: 'Landfill diversion, nutrient return and compliance with organics rules where they apply',
        barrier: 'Local infrastructure availability, contamination thresholds and permitting timelines',
        evidence: 'Organics diversion mandates are state, provincial or municipal. Confirm the local rule and its compliance date.',
        commercial: 'Avoided disposal · compliance · nutrient products',
      },
      {
        id: 'energy',
        group: 'Second Use',
        name: 'Energy & Resource Recovery',
        impacts: ['outlet', 'logistics'],
        mechanism: 'Recover energy, fuels, heat, water, nutrients or materials from streams where no higher-value pathway is practical.',
        value: 'Value from residuals, and a defined floor under the portfolio',
        barrier: 'Capital intensity, feedstock consistency and output markets that have to exist locally',
        evidence: 'This is the bottom of the hierarchy for a reason. Compare it against prevention on complete economics, not per-tonne revenue.',
        commercial: 'Energy revenue · avoided disposal · low-CI feedstock',
      },
      {
        id: 'measurement',
        group: 'Second Use',
        name: 'Measurement, Reporting & Claims',
        impacts: ['accounting', 'generation'],
        mechanism: 'Build food-loss and waste accounting, material-flow analysis, baselines, targets, and the diversion, emissions and avoided-cost reporting behind them.',
        value: 'A baseline that makes prevention visible, and claims that hold a consistent boundary',
        barrier: 'Data capture at the point of loss, and boundaries that differ between operations, finance and sustainability',
        evidence: 'Diversion rate and waste reduction are different metrics and frequently reported as one. Define which is being claimed.',
        commercial: 'Corporate target · Scope 3 · circularity claim',
      },
    ],
  },

  adoption: {
    label: 'Accelerating Adoption',
    heading: 'Why the Cheapest Wins Are the Hardest to Start',
    lead: 'Because waste is nobody’s line item until it is everybody’s. The loss originates in planning, appears in operations, is paid for by finance and is reported by sustainability — and prevention requires all four to change something at once for a benefit that shows up as an absence. Downstream pathways are easier to approve precisely because they need only one signature.',
    constraintEyebrow: 'Fund the scaling constraint',
    constraintHeading: 'Make prevention as easy to approve as a hauling contract.',
    constraintLead: 'The right mechanism depends on what is actually preventing adoption. Each constraint below names what blocks the decision and how a program relieves it.',
    constraints: [
      {
        n: '01',
        title: 'Start with root causes, not the outlet',
        text: 'Beginning at disposal is the single most common failure here, and it locks in the lowest-value option. Measure where material originates and why before evaluating any pathway.',
      },
      {
        n: '02',
        title: 'Count the embedded value, not the hauling fee',
        text: 'Comparing a prevention project against a tipping fee understates it by everything already spent on the product. Build the comparison on complete economics.',
      },
      {
        n: '03',
        title: 'Segment the material before choosing a pathway',
        text: 'Grouping streams by convenience sends usable material to the cheapest outlet available. Separate by quality, edibility and market potential first.',
      },
      {
        n: '04',
        title: 'Validate the buyer before the technology',
        text: 'Equipment bought ahead of an output market becomes a stranded asset with a maintenance schedule. Confirm feedstock consistency and the buyer’s specification first.',
      },
      {
        n: '05',
        title: 'Give the program recurring ownership',
        text: 'Pilots without a named owner, a data routine and a performance review revert as soon as attention moves. Build the operating model before the pilot, not after it succeeds.',
      },
    ],
  },

  fit: { label: 'Validating Market Fit', heading: 'Where Does an Opportunity Sit?' },

  verifying: {
    label: 'Verifying What Matters Most',
    heading: 'Measure Twice Credit Once',
    lead: 'Evidence costs money, so the useful question is how much this particular claim requires. Five layers build on each other, and the claim decides how far up you need to go. An internal cost-reduction case stops low on the ladder; a public circularity claim does not.',
    layers: [
      { n: '01', name: 'Practice', question: 'What changed?', examples: 'Forecasting, specification, process control, segregation, packaging, outlet' },
      { n: '02', name: 'Outcome', question: 'What happened?', examples: 'Tonnes prevented, diverted, redistributed or recovered; yield; avoided cost' },
      { n: '03', name: 'Traceability', question: 'What is it connected to?', examples: 'Line, shift, product, facility, load, recovery partner' },
      { n: '04', name: 'Rights & Accounting', question: 'Who can use it?', examples: 'Material and output ownership, attribute allocation between generator and partner' },
      { n: '05', name: 'Market Integrity', question: 'How can it be used?', examples: 'Baseline and boundary definitions, diversion versus reduction, target and claim language' },
    ],
  },

  pathways: {
    label: 'Market Pathways',
    heading: 'How the Performance Gets Paid For',
    lead: 'The same outcome can reach a market four different ways. In this topic most of the value never goes to market at all — it stays inside the business as avoided cost — so the value-chain routes lead.',
    items: [
      {
        id: 'm02',
        n: '01',
        name: 'Scope 3 & Insets',
        carrier: 'As an outcome connected to the value chain',
        tagline: 'Create and account for environmental value inside the value chain.',
        whenToUse: 'Use for almost every prevention and diversion program, because the reduction belongs to the company’s own inventory.',
        detail: 'The dominant route here and the least complicated, since the material, the loss and the reduction all sit inside operations the company already reports on. The discipline is in the boundary: waste prevented upstream at a supplier is a different line from waste prevented in your own plant, and the two are often merged.',
        examples: [
          'Food Loss and Waste Accounting and Reporting Standard',
          'GHG Protocol Corporate Value Chain (Scope 3) Standard',
          'Corporate food-waste reduction targets and public commitments',
          'Supplier and customer joint waste-reduction programs',
        ],
      },
      {
        id: 'm03',
        n: '02',
        name: 'Product & Commodity Claims',
        carrier: 'As an attribute of the physical product',
        tagline: 'Make environmental performance part of what is bought and sold.',
        whenToUse: 'Use when a side stream becomes a product in its own right, or when circularity is part of what a customer is buying.',
        detail: 'Upcycled ingredients and recovered materials are sold on a claim about their origin, which puts them under the same environmental-marketing rules as any other product claim. The boundary question is sharper than usual: what counts as upcycled, and against what baseline.',
        examples: [
          'Upcycled ingredient and product certification',
          'Recycled and recovered content claims',
          'Packaging and circularity frameworks',
          'Environmental marketing and consumer-protection guidance',
        ],
      },
      {
        id: 'm01',
        n: '03',
        name: 'Carbon & Ecosystem Credits',
        carrier: 'As a quantified environmental asset',
        tagline: 'Turn verified environmental outcomes into market-ready assets.',
        whenToUse: 'Use where an external funder pays for a diversion or recovery outcome the business would not otherwise finance.',
        detail: 'A narrow fit. Avoided methane from diverted organics and biogas from digestion are the established cases; prevention is much harder to credit because the counterfactual is a business decision rather than a physical baseline. Most programs are better served by the avoided-cost case.',
        examples: [
          'Avoided methane and organic-waste diversion methodologies',
          'Anaerobic digestion and biogas project methodologies',
          'Registry issuance, transfer and retirement infrastructure',
        ],
      },
      {
        id: 'm04',
        n: '04',
        name: 'Environmental Attribute Certificates',
        carrier: 'As a certificate conveying the attribute',
        tagline: 'Convey environmental value when physical supply alone cannot.',
        whenToUse: 'Use when recovered energy or material is delivered into a pooled system and the attribute has to travel separately.',
        detail: 'Relevant mainly at the recovery end of the hierarchy, where biogas or recovered material enters a shared network and cannot be physically traced to a buyer. The certificate carries the attribute; the chain-of-custody rules decide what may then be said about it.',
        examples: [
          'Renewable natural gas and biogas attribute certificates',
          'Recovered material and recycled content certificates',
          'ISO 22095 chain of custody',
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
    // Awaiting owner tool assignment — see data/expertise/tools.ts. The Food
    // Waste Platform render is the obvious candidate for this topic.
    tools: [],
  },
};
