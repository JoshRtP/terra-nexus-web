// Purpose-Driven Food Brands & Retailers — expertise topic record.
//
// The most downstream topic in the set, and the one where the indicators stop
// being about production at all. What is being managed here is whether a
// customer chooses the product, whether the claim on it survives scrutiny, and
// whether the supply behind it can be delivered twice.
//
// PROVENANCE
//  * hero, eyebrow, CTA, `potential.lead` (from `orientation`) and the pillar
//    bullets (from `performanceCategories`) are lifted from the previous
//    pages/expertise/purpose-driven-food-brands-and-retailers/index.astro —
//    approved copy.
//  * `investments.interventions` derive from the seven levers in "What
//    Purpose-Driven Food Brands and Retailers Includes" in the page copy.
//  * `adoption.constraints` and the indicator issues follow that page copy's
//    own "Common Reasons Purpose-Driven Propositions Struggle" list.
//  * The page copy's frameworks section is deliberately generic — it names
//    categories, not instruments, and closes by requiring verification against
//    current official sources. The named instruments in `pathways` are
//    therefore researched, and flagged below.
//
// NEEDS OWNER REVIEW BEFORE PUBLISH
//  * `overview.stats` — the 23.8% sales share for sustainability-marketed
//    products, the 2.3x growth rate over 2019–2024, the 9.7% average premium
//    and the gap between a carbon-neutral premium (6.8%) and a "no harmful
//    chemicals" premium (11.2%) are from published consumer-market research.
//    Uncited on the page, as on the other topics.
//  * `pathways[].examples` — environmental-marketing guidance is jurisdictional
//    and moving. The EU Green Claims and Empowering Consumers directives and
//    the FTC Green Guides should each be rechecked for current status before
//    publish, as should the claim language they permit.
//  * `positioning` — authored for the influence/incentive/mechanism band.
//  * `enablers.tools` — empty pending owner assignment. See ./tools.ts.
import type { ExpertiseTopic } from './types';
import { attachDefinitions, topicHeroImage } from './shared';

export const purposeDrivenFoodBrandsAndRetailers: ExpertiseTopic = {
  slug: 'purpose-driven-food-brands-and-retailers',
  name: 'Purpose-Driven Food Brands & Retailers',
  eyebrow: 'Food, Beverage & Retail',

  hero: 'Turn Better Products and Sourcing into Trusted Market Value',
  heroLead:
    'Terra Nexus helps food brands, manufacturers, retailers, and their partners connect purpose, product design, sourcing, evidence, claims, customer experience, and commercial performance.',
  heroImage: topicHeroImage('purpose-driven-food-brands-and-retailers', 1600),
  heroImageAlt: 'Fresh produce on display in a grocery retail aisle',

  meta: {
    title: 'Purpose-Driven Food Brands & Retailers | Terra Nexus',
    description:
      'Terra Nexus helps food brands, manufacturers, retailers, and their partners connect purpose, product design, sourcing, evidence, claims, customer experience, and commercial performance.',
    canonical: '/expertise/purpose-driven-food-brands-and-retailers/',
  },

  cta: {
    heading: 'Build Purpose into Products Customers Can Trust',
    text: 'Whether the starting point is a sourcing program, product renovation, customer request, new ingredient, certification, private-label strategy, or environmental claim, Terra Nexus helps clients connect better food-system performance with a credible and commercially valuable proposition.',
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
    influence: 'Strong, and mostly indirect. The brand writes the specification the supply chain organises around, but rarely touches the field itself.',
    incentive: 'Customer choice. Unlike every other topic here, the payment arrives one purchase at a time, which makes it the most sensitive to whether the benefit is actually relevant.',
    mechanism: 'Product and commodity claims lead, because the claim on the pack is the mechanism. Everything else exists to make it supportable.',
  },

  overview: {
    label: 'Overview',
    heading: 'The Shelf Is Where the Whole Chain Gets Priced',
    lead: 'Sustainability-marketed products now account for roughly a quarter of consumer packaged goods sales and have grown more than twice as fast as conventional equivalents. That is a real market, not a niche. What it is not is a uniform one: the average premium conceals claims customers will pay a double-digit premium for and claims they barely price at all.',
    stats: [
      { figure: '23.8%', label: 'of consumer packaged goods sales carry a sustainability marketing claim' },
      { figure: '2.3x', label: 'the growth rate of those products versus conventional equivalents, 2019–2024' },
      { figure: '9.7%', label: 'average price premium across sustainability-marketed products' },
      { figure: '11.2%', label: 'premium for a "no harmful chemicals" claim, against 6.8% for carbon-neutral' },
    ],
    body: [
      {
        title: 'Relevance beats virtue',
        text: 'Claims about direct personal benefit consistently price higher than claims about distant systemic benefit. That does not make the systemic work less valuable, but it does determine which pocket pays for it and how the proposition has to be built.',
      },
      {
        title: 'Four things are being underwritten at once',
        text: 'People: the producers and workers whose conditions the sourcing standard sets. Places: the landscapes the ingredients come from. Planet: the product footprint and the packaging that follows it. Profits: the margin left after premiums, evidence, certification and the cost of being right.',
      },
      {
        title: 'The claim is the exposed surface',
        text: 'Every weakness upstream — thin evidence, unreliable supply, boundaries that do not match — becomes visible at the point where the claim is made. It is the cheapest place to make a promise and the most expensive place to be wrong.',
      },
    ],
  },

  potential: {
    label: 'The Potential',
    heading: 'When Product, Evidence and Price Reinforce Each Other',
    lead: 'A compelling story is not enough. The sourcing model, product design, evidence, price, channel, operations and claims must all reinforce the same proposition. A product can have meaningful upstream environmental performance and still fail in the market if the benefit is not relevant to the customer, the price is unsupported, the claim is confusing, the supply is unreliable, or the organization cannot deliver the promise consistently.',
    transition: 'When those pieces do line up, the gains show up in three places.',
    pillars: [
      {
        tag: 'Resilient',
        title: 'A promise that can be delivered repeatedly',
        text: 'Purpose that survives a supply shock, a reformulation and a change of buyer is a different asset from a campaign.',
        bullets: [
          'Product promises that can be delivered repeatedly',
          'Lower exposure to climate, nature, quality or availability risk',
          'Stronger integration of purpose with business strategy',
          'Clearer governance and accountability across functions',
          'A portfolio approach balancing impact, value, feasibility and scale',
        ],
      },
      {
        tag: 'Sustainable',
        title: 'Sourcing and product performance that stand up',
        text: 'The upstream change has to be real, and the evidence has to be proportionate to what is being said about it.',
        bullets: [
          'Improved ingredient, supplier and production choices',
          'Improved product footprint or circularity where supported by evidence',
          'Stronger evidence, traceability and assurance',
          'Clear, supportable and understandable claims',
          'Reduced risk of overstatement, inconsistency or customer confusion',
        ],
      },
      {
        tag: 'Prosperous',
        title: 'Growth the category actually rewards',
        text: 'Differentiation that customers recognise, at a price the economics can carry.',
        bullets: [
          'More differentiated products and portfolios',
          'Premiums or margin supported by customer value',
          'Stronger retailer, foodservice and business-to-business propositions',
          'Improved customer retention, loyalty and category performance',
          'More effective use of environmental attributes and supplier investment',
        ],
      },
    ],
    kicker: 'The test is not whether the story is good. It is whether the product, the evidence and the price tell the same one.',
  },

  correcting: {
    label: 'Course Correcting',
    heading: 'Where Purpose-Driven Propositions Come Apart',
    lead: 'The failures are consistent enough to be predictable, and they are rarely failures of intent. Five indicators show where a proposition either holds together or quietly stops being true.',
    indicators: attachDefinitions([
      {
        key: 'relevance',
        name: 'Customer relevance',
        definition:
          'Whether the benefit being offered is one the target customer actually weighs when choosing, as opposed to one the company considers important.',
        issues: [
          'The proposition beginning with a sustainability message rather than a customer need',
          'Upstream benefit never translated into a clear product advantage',
          'Certification treated as the complete value proposition',
          'Benefit hierarchy set by internal priorities rather than buying criteria',
        ],
      },
      {
        key: 'claim',
        name: 'Claim integrity',
        definition:
          'Whether what is said on pack, in channel and to customers is supported by evidence of the right kind, at the right boundary, in language the regulator and the customer both read the same way.',
        issues: [
          'Claims broader than the evidence or supply supports',
          'Product, sourcing, footprint and marketing boundaries that do not align',
          'Legal, marketing, sustainability and operations interpreting the promise differently',
          'Launch materials finished before the operational controls and evidence',
        ],
      },
      {
        key: 'supply',
        name: 'Supply reliability',
        definition:
          'Whether procurement and suppliers can deliver the qualifying volume, to specification, consistently enough to keep the claim true across a full listing period.',
        issues: [
          'Procurement and suppliers unable to deliver required volume consistently',
          'Qualifying supply concentrated in too few producers or regions',
          'Traceability holding at pilot scale but not at listing scale',
          'No defined position for what happens when qualifying supply runs short',
        ],
      },
      {
        key: 'footprint',
        name: 'Product performance',
        definition:
          'The measured environmental and quality attributes of the product itself — footprint, packaging, circularity, shelf life, waste — and whether they improved in the way the claim implies.',
        issues: [
          'Footprint calculated on a boundary that flatters the result',
          'Packaging and end-of-life excluded from a product-level claim',
          'Reformulation trade-offs unmeasured across attributes',
          'Improvement asserted without a defensible baseline',
        ],
      },
      {
        key: 'economics',
        name: 'Program economics',
        definition:
          'The margin remaining after supplier premiums, certification, evidence, assurance, launch and the recurring cost of keeping the claim current — not the visible shelf premium.',
        issues: [
          'Willingness to pay and total program cost not tested together',
          'Program cost allocated to one product rather than across the portfolio it serves',
          'Cannibalization inside the portfolio unmodelled',
          'Commercial and impact performance not reviewed together after launch',
        ],
      },
    ]),
  },

  investments: {
    label: 'Priority Investments',
    heading: 'Investments That Make the Proposition Hold',
    // Frame labels per the gap assessment for this topic.
    lead: 'Every investment lands in one of three places: the product itself, the claim made about it, or the channel it reaches customers through. Filter by the indicator you are trying to move.',
    frame: [
      { title: 'Product', text: 'Portfolio, formulation, ingredients, sourcing, packaging and the supplier programs behind them.' },
      { title: 'Claim', text: 'Evidence, traceability, certification, substantiation, language and the governance that keeps them aligned.' },
      { title: 'Channel', text: 'Pricing, customer economics, retailer requirements, assortment, launch and private-label structure.' },
    ],
    interventions: [
      {
        id: 'portfolio',
        group: 'Product',
        name: 'Product & Portfolio Strategy',
        impacts: ['relevance', 'economics'],
        mechanism: 'Set category roles, innovation and renovation priorities, and where purpose actually belongs in the growth strategy rather than alongside it.',
        value: 'A portfolio where the sustainability investment sits on the products that can carry it',
        barrier: 'Internal ownership split across brand, category and sustainability teams with different scorecards',
        evidence: 'Portfolio effects matter more than single-product economics. A premium won by cannibalizing an adjacent line is not a gain.',
        commercial: 'Premium positioning · category growth · portfolio strategy',
      },
      {
        id: 'proposition',
        group: 'Product',
        name: 'Purpose & Customer Proposition',
        impacts: ['relevance'],
        mechanism: 'Define the customer problem, buying criteria, benefit hierarchy and reasons to believe before the message is written.',
        value: 'A benefit customers weigh at the shelf, rather than one the company values internally',
        barrier: 'Research cost, and the pull toward messaging the organization finds motivating',
        evidence: 'Stated preference overstates willingness to pay. Test against actual choice wherever the decision is expensive.',
        commercial: 'Premium positioning · customer retention · differentiation',
      },
      {
        id: 'design',
        group: 'Product',
        name: 'Sustainable Product & Ingredient Design',
        impacts: ['footprint', 'relevance'],
        mechanism: 'Change the things that actually move performance — ingredient selection, formulation, production, packaging, shelf life and waste.',
        value: 'A measurable product improvement rather than a sourcing claim attached to an unchanged product',
        barrier: 'Cost, quality, shelf life and consumer-acceptance trade-offs that rarely all improve together',
        evidence: 'Improvement is relative to a baseline. State the baseline, the boundary and what was excluded.',
        commercial: 'Product footprint · circularity · category access',
      },
      {
        id: 'sourcing',
        group: 'Product',
        name: 'Responsible Sourcing & Supplier Programs',
        impacts: ['supply', 'footprint'],
        mechanism: 'Engage producers and suppliers with standards, traceability, incentives and chain of custody that arrive with the volume.',
        value: 'Qualifying supply that can be repeated, and upstream investment connected to product value',
        barrier: 'Supplier capability, the cost of qualification, and premiums that stop at the first tier',
        evidence: 'Supplier attestation is not traceability. The two are commonly conflated in program design.',
        commercial: 'Supplier program · certification · Scope 3 · inset',
      },
      {
        id: 'claims',
        group: 'Claim',
        name: 'Claims, Certification & Communication',
        impacts: ['claim', 'relevance'],
        mechanism: 'Define the precise claim, audience, boundary, substantiation, certification and qualifying language, with governance for changes.',
        value: 'A claim that survives regulatory scrutiny and still means something to a customer',
        barrier: 'Regulatory divergence between markets, and the gap between legally safe and commercially useful language',
        evidence: 'Environmental-marketing rules differ by jurisdiction and are being tightened. Record the market, the rule and the date.',
        commercial: 'Product claim · certification · channel access',
      },
      {
        id: 'pricing',
        group: 'Channel',
        name: 'Pricing, Channel & Commercialization',
        impacts: ['economics', 'relevance'],
        mechanism: 'Model willingness to pay, margin, customer economics, retailer requirements, assortment and launch against total program cost.',
        value: 'A price the customer will pay that still covers what the program actually costs',
        barrier: 'Retailer margin expectations, promotional pressure and program costs that land unevenly across the portfolio',
        evidence: 'The visible premium is not the margin. Allocate certification, evidence and assurance cost before concluding.',
        commercial: 'Premium positioning · preferred supplier · channel economics',
      },
      {
        id: 'retail',
        group: 'Channel',
        name: 'Retail & Private-Label Programs',
        impacts: ['supply', 'claim', 'economics'],
        mechanism: 'Build category strategy, supplier requirements, private-label propositions, merchandising, traceability and food-waste programs jointly with the retailer.',
        value: 'Category-level change that reaches further than a single branded line can',
        barrier: 'Joint business planning cycles, supplier fragmentation and retailer-owned claim liability',
        evidence: 'Private label puts the claim risk on the retailer. Evidence requirements rise accordingly.',
        commercial: 'Private label · preferred supplier · joint business planning',
      },
    ],
  },

  adoption: {
    label: 'Accelerating Adoption',
    heading: 'Why Good Products Still Stall',
    lead: 'Because the proposition is assembled by functions that are measured differently. Marketing is rewarded for distinctiveness, legal for defensibility, procurement for cost, sustainability for ambition and sales for velocity — and the claim on the pack is where all five meet. Adoption depends less on conviction than on whether those incentives were reconciled before launch.',
    constraintEyebrow: 'Fund the scaling constraint',
    constraintHeading: 'Build a proposition the whole business can deliver.',
    constraintLead: 'The right mechanism depends on what is actually preventing adoption. Each constraint below names what blocks the decision and how a program relieves it.',
    constraints: [
      {
        n: '01',
        title: 'Start from the customer need, not the message',
        text: 'Propositions that begin with a sustainability story and look for a customer afterwards are the most common failure here. Establish the need first, then decide which sustainability work serves it.',
      },
      {
        n: '02',
        title: 'Size the claim to the supply',
        text: 'A claim that outruns qualifying volume becomes a delisting or a correction. Set the claim against the volume procurement can deliver in a bad year, not a good one.',
      },
      {
        n: '03',
        title: 'Settle the promise across functions before launch',
        text: 'Legal, marketing, sustainability, procurement and operations routinely hold different readings of the same sentence. Write the shared interpretation down and make it the approval record.',
      },
      {
        n: '04',
        title: 'Test willingness to pay against total program cost',
        text: 'Premium and margin are not the same number once certification, evidence, assurance and supplier premiums are allocated. Model the second before committing to the first.',
      },
      {
        n: '05',
        title: 'Review commercial and impact performance together',
        text: 'Programs reviewed on sales alone drift away from the claim; programs reviewed on impact alone lose their funding. One review, both sets of numbers.',
      },
    ],
  },

  fit: { label: 'Validating Market Fit', heading: 'Where Does an Opportunity Sit?' },

  verifying: {
    label: 'Verifying What Matters Most',
    heading: 'Measure Twice Credit Once',
    lead: 'Evidence costs money, so the useful question is how much this particular claim requires. Five layers build on each other, and the claim decides how far up you need to go. A product claim made to consumers sits near the top, because it is read by a regulator as well as a shopper.',
    layers: [
      { n: '01', name: 'Practice', question: 'What changed?', examples: 'Ingredient, formulation, sourcing standard, packaging, supplier program' },
      { n: '02', name: 'Outcome', question: 'What happened?', examples: 'Product footprint, recycled content, waste, supplier participation, upstream reduction' },
      { n: '03', name: 'Traceability', question: 'What is it connected to?', examples: 'Farm, lot, ingredient, SKU, batch, listing' },
      { n: '04', name: 'Rights & Accounting', question: 'Who can use it?', examples: 'Attribute ownership, supplier agreements, allocation across products, double counting' },
      { n: '05', name: 'Market Integrity', question: 'How can it be used?', examples: 'On-pack language, qualifying statements, jurisdictional marketing rules, substantiation file' },
    ],
  },

  pathways: {
    label: 'Market Pathways',
    heading: 'How the Performance Gets Paid For',
    lead: 'The same upstream outcome can reach a market four different ways. In this topic the product claim leads, because the customer is the one paying.',
    items: [
      {
        id: 'm03',
        n: '01',
        name: 'Product & Commodity Claims',
        carrier: 'As an attribute of the physical product',
        tagline: 'Make environmental performance part of what is bought and sold.',
        whenToUse: 'Use when the benefit is relevant enough to the customer to influence choice, and the evidence can carry a public claim.',
        detail: 'The dominant route here, and the most exposed. The claim is read by shoppers, retail buyers and regulators simultaneously, and marketing rules in several major markets are being tightened specifically around environmental language. Precision in the claim is what makes the premium durable.',
        examples: [
          'Product certification and on-pack labelling schemes',
          'FTC Green Guides for US environmental marketing claims',
          'EU Green Claims and Empowering Consumers directives',
          'Product environmental footprint and lifecycle-assessment standards',
          'Packaging and circularity frameworks',
        ],
      },
      {
        id: 'm02',
        n: '02',
        name: 'Scope 3 & Insets',
        carrier: 'As an outcome connected to the value chain',
        tagline: 'Create and account for environmental value inside the value chain.',
        whenToUse: 'Use when the upstream reduction is needed in the company’s own inventory, or a retail customer requires it in theirs.',
        detail: 'Most food companies hold the great majority of their emissions upstream, which makes supplier investment the only route to a real reduction. The accounting question is whether the same intervention is also supporting an on-pack claim, because it cannot do both without disclosure.',
        examples: [
          'GHG Protocol Corporate Value Chain (Scope 3) Standard',
          'Land Sector and Removals Guidance',
          'Value Change Initiative intervention guidance',
          'Supplier engagement and preferred-supplier programs',
        ],
      },
      {
        id: 'm04',
        n: '03',
        name: 'Environmental Attribute Certificates',
        carrier: 'As a certificate conveying the attribute',
        tagline: 'Convey environmental value when physical supply alone cannot.',
        whenToUse: 'Use when the qualifying ingredient cannot be physically segregated to the finished product but the attribute still needs to transfer.',
        detail: 'Standard practice for commodities that commingle in processing — the certificate does the work the physical flow cannot. It also sets a limit on what the pack can say: a book-and-claim attribute supports a sourcing claim, not a statement about the ingredient in that jar.',
        examples: [
          'Mass balance and book-and-claim certification models',
          'ISO 22095 chain of custody',
          'Commodity certification programs and their claim rules',
        ],
      },
      {
        id: 'm01',
        n: '04',
        name: 'Carbon & Ecosystem Credits',
        carrier: 'As a quantified environmental asset',
        tagline: 'Turn verified environmental outcomes into market-ready assets.',
        whenToUse: 'Use where a funder outside the product’s own supply chain is paying for the outcome, and the product claim does not depend on it.',
        detail: 'The weakest fit of the four for this topic. Credits bought outside the value chain no longer support most product-level neutrality claims, and the marketing rules moving through several jurisdictions restrict the language further. Treat them as a separate corporate decision rather than part of the proposition.',
        examples: [
          'Registry-issued credits and retirement infrastructure',
          'Corporate claim codes governing offset-based statements',
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
