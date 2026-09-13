// Aquaculture — expertise topic record.
//
// PROVENANCE
//  * hero title/lead, eyebrow, CTA, `potential.lead` (from `orientation`) and
//    the pillar bullets (from `performanceCategories`) are lifted from the
//    previous pages/expertise/aquaculture/index.astro — approved copy.
//  * `investments.interventions` are verbatim from the ChatGPT extraction pass
//    (handover bundle, reference/chatgpt-expertise-content.json). The hedging
//    in `evidence` is deliberate.
//  * `validationRows` / `validationQuestions` are lifted from the same page's
//    `validationRows` and `decisionGroups`; the capability mapping follows the
//    brief's "How Terra Nexus helps".
//  * `adoption.constraints` follow "Common Reasons Aquaculture Initiatives
//    Struggle" and "Why Feed Is a Strategic Aquaculture Decision" in
//    plans/content/aquaculture-page-copy.md.
//
// NEEDS OWNER REVIEW BEFORE PUBLISH
//  * `overview.stats` — four figures, uncited on the page, same treatment as
//    the other topics. Source: FAO SOFIA 2026 (aquaculture at 53% of aquatic
//    animal production; over 100 million tonnes in 2024 at USD 371 billion
//    farm gate; capture fisheries held in the 86–94 million tonne range since
//    the late 1980s).
//  * `pathways[].examples` — named certification and feed standards. The BAP
//    Feed Mill Standard is under revision from 2026 and its fishmeal/fish oil
//    sourcing threshold rises to 90% by end-2027; recheck before publish.
//  * `positioning` — authored for the influence/incentive/mechanism band.
//  * `correcting.indicators[].issues` — authored from the page copy's own
//    struggle list and the feed section.
//  * `enablers.tools` — empty pending owner assignment. See ./tools.ts.
//
// NOTE: the brief proposes the eyebrow "CULTIVATED BELOW WATER" where the live
// page uses "Aquatic Production". The live page wins under "never rewrite
// approved copy"; flagging rather than resolving.
import type { ExpertiseTopic } from './types';
import { attachDefinitions, topicHeroImage } from './shared';

export const aquaculture: ExpertiseTopic = {
  slug: 'aquaculture',
  name: 'Aquaculture',
  eyebrow: 'Aquatic Production',

  hero: 'Build More Resilient Aquatic Food Systems',
  heroLead:
    'Terra Nexus helps aquaculture producers, integrated protein companies, feed and ingredient businesses, buyers, retailers, technology providers, and investors connect production performance, environmental impact, traceability, product strategy, and market access.',
  heroImage: topicHeroImage('aquaculture', 1600),
  heroImageAlt: 'Aquaculture pens on open water',

  meta: {
    title: 'Aquaculture | Terra Nexus',
    description:
      'Terra Nexus connects aquaculture production performance, feed strategy, environmental impact and traceability to certification and market access.',
    canonical: '/expertise/aquaculture/',
  },

  cta: {
    heading: 'Connect Aquaculture Performance to Market Value',
    text: 'Whether the starting point is a production challenge, feed strategy, technology, new product, sourcing program, investment, certification, or environmental objective, Terra Nexus helps clients connect aquatic-system performance with the commercial and operating decisions required to create durable value.',
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
    influence: 'Direct over the animal and the water, but most of the footprint is bought in: feed is both the largest operating cost and the largest share of the impact.',
    incentive: 'Survival, growth and feed conversion pay immediately. Certification and customer qualification decide whether the product reaches the market at all.',
    mechanism: 'Product and commodity claims lead, because in seafood a recognised certification is the condition of market access rather than a premium on top of it.',
  },

  overview: {
    label: 'Overview',
    heading: 'Farming Passed Fishing, and the Constraints Moved With It',
    lead: 'More than half of the world’s aquatic animal production now comes from farms rather than from the wild. Capture fisheries have held roughly flat for three decades, so every additional tonne of seafood has to be grown. That shifts the hard questions from how much can be caught to what the growing costs: the feed it consumes, the water it shares, and the evidence a buyer needs before it reaches a shelf.',
    stats: [
      { figure: '53%', label: 'of the world’s aquatic animal production now comes from farms rather than wild capture' },
      { figure: '100M', label: 'tonnes farmed in 2024, the first year aquaculture passed that mark' },
      { figure: '$371B', label: 'farm-gate value of that production' },
      { figure: '86-94M', label: 'tonnes, the range wild capture has stayed within since the late 1980s' },
    ],
    body: [
      {
        title: 'Growth has to come from farming now',
        text: 'Wild capture has been stable since the late 1980s, which reflects ecological limits rather than a lack of effort. Any growth in aquatic food supply is growth in aquaculture, and that puts the sector’s feed, water and siting decisions on the critical path for the whole category.',
      },
      {
        title: 'Four things are being underwritten at once',
        text: 'People: the producers and coastal communities whose livelihoods depend on the farm and the water around it. Places: the receiving water, the benthos and the habitat the site shares. Planet: the feed footprint, the energy and the emissions per kilogram of saleable product. Profits: the margin that has to survive mortality, disease and a volatile ingredient market.',
      },
      {
        title: 'The footprint is mostly bought, not made',
        text: 'For most fed species the majority of the lifecycle impact arrives in the feed bag, not on the farm. That makes ingredient strategy an environmental decision and a commercial one at the same time, and it means a farm-level improvement can be undone upstream without anyone noticing.',
      },
    ],
  },

  potential: {
    label: 'The Potential',
    heading: 'Changing the System Changes the Value Equation',
    lead: 'Aquaculture is often discussed as a farm-level production activity. In practice, commercial performance depends on a much wider system. Species biology, genetics, hatchery quality, feed, water, stocking, animal health, farm management, infrastructure, energy, processing, cold chain, traceability, certification, market access, and customer expectations all shape the outcome. A change that improves one part of the system may create cost or risk elsewhere. A lower-impact feed may affect growth, availability, or price. A new production technology may improve control but require more energy, capital, or operational capability.',
    transition: 'Done well, that connection changes the whole value equation.',
    pillars: [
      {
        tag: 'Resilient',
        title: 'A farm that survives a bad cycle',
        text: 'Health, genetics and biosecurity decide how much of what is stocked is ever harvested, and how the operation handles a shock.',
        bullets: [
          'Improved survival, growth, feed conversion, consistency, or harvest quality',
          'Better control of water quality, stocking, and production conditions',
          'Improved animal health, welfare, and biosecurity',
          'Reduced mortality, escapes, disease exposure, or production variability',
          'Improved resilience to heat, storms, drought, flooding, salinity, or supply disruption',
        ],
      },
      {
        tag: 'Sustainable',
        title: 'Lower impact per kilogram landed',
        text: 'Water, nutrients, energy and ingredients are where the environmental performance of a farmed product is actually decided.',
        bullets: [
          'Improved water use, treatment, and discharge management',
          'Reduced nutrient loss or local environmental pressure',
          'Better siting and carrying-capacity decisions',
          'Stronger habitat, benthic, coastal, or watershed management where relevant',
          'Improved energy efficiency and reduced lifecycle emissions where supported by evidence',
          'Beneficial use of processing co-products, nutrients, or organic material',
        ],
      },
      {
        tag: 'Prosperous',
        title: 'A product the market will take',
        text: 'Feed efficiency protects the margin; traceability and certification protect the access.',
        bullets: [
          'Reduced feed waste and improved feed conversion',
          'More resilient and responsibly sourced ingredient portfolios',
          'Reduced exposure to scarce, volatile, or high-impact inputs',
          'Certification or customer qualification',
          'Differentiated products and sourcing propositions',
          'Access to new markets, channels, customers, or investment',
        ],
      },
    ],
    kicker: 'Every improvement here has to survive two tests at once: the biology on the farm, and the accounting boundary a customer will accept.',
  },

  correcting: {
    label: 'Course Correcting',
    heading: 'What the Growth Has Cost So Far',
    lead: 'Aquaculture grew faster than the systems built to evidence it. Five indicators show where that gap sits, and where a program either closes it or does not.',
    indicators: attachDefinitions([
      {
        key: 'water',
        name: 'Water',
        // Inline: the shared definition is written for land, where water moves
        // through the system. Here it is the system.
        definition:
          'The water the farm grows in and the water it returns. In aquaculture this is not a resource passing through the operation, it is the operating environment, shared with everything downstream of it.',
        issues: [
          'Nutrient and solids loading on the receiving water',
          'Exchange and treatment designed for throughput rather than discharge',
          'Siting decisions made without local carrying capacity',
          'Cumulative pressure from neighbouring sites left unassessed',
        ],
      },
      {
        key: 'climate',
        name: 'Climate',
        definition:
          'Greenhouse gases across the whole product lifecycle, most of which arrive in the feed rather than on the farm. Energy for aeration, pumping and temperature control is the part the operator controls directly.',
        issues: [
          'Feed footprint carried from ingredients nobody on the farm sources',
          'Energy-intensive aeration, pumping and temperature control',
          'Lower-impact ingredients claimed without a consistent accounting boundary',
          'Emissions per tonne unnormalised for mortality and actual saleable output',
        ],
      },
      {
        key: 'biodiversity',
        name: 'Biodiversity',
        definition:
          'The species and habitat around the site, and the wild stocks the feed depends on. Aquaculture touches biodiversity twice: once where the farm sits and once where its ingredients are caught or grown.',
        issues: [
          'Escapes and genetic interaction with wild populations',
          'Disease and parasite transfer to wild stocks',
          'Habitat converted or degraded at the site',
          'Pressure on wild stocks through marine ingredient demand',
        ],
      },
      {
        key: 'resilience',
        name: 'Resilience',
        definition:
          'The capacity to absorb a disease event, a heat event or an ingredient shock and keep producing. In a biological system with a long cycle, most of that capacity has to be built before it is needed.',
        issues: [
          'Disease and mortality events with no contingency in the plan',
          'Single-ingredient or single-supplier exposure in the feed',
          'Heat, storm, salinity and oxygen events outside the design envelope',
          'Working capital and ramp time underestimated against the production cycle',
        ],
      },
      {
        key: 'productivity',
        name: 'Production',
        definition:
          'What the system actually yields against what it consumes: survival, growth and feed conversion, measured on saleable product rather than on what was stocked.',
        issues: [
          'Feed lost to overfeeding and imprecise ration delivery',
          'Biomass estimates too uncertain to manage against',
          'Mortality treated as a cost line rather than a design problem',
          'Farm gains not carried through processing and cold chain',
        ],
      },
    ]),
  },

  investments: {
    label: 'Priority Investments',
    heading: 'Investments That Improve the Whole System',
    lead: 'Every investment lands in one of three places: the animals themselves, the inputs they consume, or the site and water the farm shares. Filter by the indicator you are trying to move.',
    frame: [
      { title: 'Animals', text: 'Genetics, health, husbandry and survival — the biology that decides how much saleable product each input produces.' },
      { title: 'Inputs', text: 'Feed, energy and water: the largest operating costs and the largest share of the product footprint.' },
      { title: 'Sites', text: 'Siting, carrying capacity, effluent, containment and the receiving water the farm shares with everything downstream.' },
    ],
    interventions: [
      {
        id: 'feed',
        group: 'Feed',
        name: 'Feed Formulation & Sourcing',
        impacts: ['climate', 'water', 'biodiversity', 'productivity'],
        mechanism: 'Change feed ingredients, formulation and sourcing to reduce upstream footprint while preserving nutrition, growth and feed conversion.',
        value: 'Feed efficiency, ingredient flexibility, performance and lower product footprint',
        barrier: 'Ingredient price, performance risk, availability, formulation constraints and supplier data',
        evidence: 'Feed footprint depends on ingredient origin, allocation, processing and formulation data. A lower-impact ingredient does not automatically lower the final product footprint unless the accounting boundary is consistent.',
        commercial: 'Product footprint · Scope 3 · certified / lower-impact seafood',
      },
      {
        id: 'fcr',
        group: 'Production efficiency',
        name: 'Feed Conversion & Feeding Management',
        impacts: ['climate', 'water', 'productivity'],
        mechanism: 'Improve feeding accuracy, behavior monitoring, ration delivery and biomass estimates to reduce feed loss and improve conversion.',
        value: 'Lower feed cost, better growth and reduced nutrient loading',
        barrier: 'Sensors, management, biomass uncertainty and operational discipline',
        evidence: 'Improved FCR can reduce footprint per unit of product, but baseline, mortality and production output must be handled consistently.',
        commercial: 'Product footprint · Scope 3 · operating-value program',
      },
      {
        id: 'health',
        group: 'Animal performance',
        name: 'Animal Health, Survival & Genetics',
        impacts: ['productivity', 'resilience', 'climate'],
        mechanism: 'Improve health management, genetics, vaccination, husbandry and survival to reduce losses and improve productive output per unit of input.',
        value: 'Survival, growth, feed efficiency and production stability',
        barrier: 'Biological variability, disease pressure, technology or veterinary access and proof of attribution',
        evidence: 'Environmental benefit is usually expressed through lower impact per kilogram of saleable product rather than a stand-alone environmental unit.',
        commercial: 'Product footprint · sourcing program · supplier performance',
      },
      {
        id: 'energy',
        group: 'Farm operations',
        name: 'Energy, Aeration & Pumping Efficiency',
        impacts: ['climate', 'productivity'],
        mechanism: 'Improve aeration, pumping, temperature management, power supply and other energy-intensive farm operations.',
        value: 'Energy savings, operating reliability and lower direct emissions',
        barrier: 'Capital, downtime, equipment life and local energy economics',
        evidence: 'Direct energy savings are measurable, but product-level value requires allocation across output.',
        commercial: 'Product footprint · Scope 3 · corporate decarbonization',
      },
      {
        id: 'water',
        group: 'Water & nutrients',
        name: 'Water Quality & Effluent Management',
        impacts: ['water', 'biodiversity', 'resilience', 'productivity'],
        mechanism: 'Manage nutrient discharge, water exchange, solids, treatment and receiving-water impacts while protecting animal performance.',
        value: 'Permit and compliance value, health, water quality and reduced ecosystem risk',
        barrier: 'Infrastructure, monitoring, treatment cost and local hydrology',
        evidence: 'Water and nutrient outcomes can be more decision-useful than carbon. Claims require clear receiving-water boundaries and monitoring.',
        commercial: 'Certification · sourcing claim · water / nature program',
      },
      {
        id: 'density',
        group: 'Husbandry',
        name: 'Stocking, Husbandry & Production Optimization',
        impacts: ['productivity', 'resilience', 'water'],
        mechanism: 'Optimize stocking density, grading, handling, cycle timing and farm management to improve health and productive output.',
        value: 'Growth, survival, throughput and risk management',
        barrier: 'Biological variability, operational constraints and customer or welfare requirements',
        evidence: 'Environmental improvement generally comes through resource efficiency per unit of output and must be normalized to production.',
        commercial: 'Certified product · product footprint · supplier program',
      },
      {
        id: 'ras',
        group: 'Production systems',
        name: 'Recirculating & Controlled Systems',
        impacts: ['water', 'climate', 'resilience', 'productivity'],
        mechanism: 'Use recirculation, filtration and controlled production to reduce water exchange and improve control over growing conditions.',
        value: 'Biosecurity, location flexibility, water control and potentially higher survival',
        barrier: 'High capex, energy demand, technology risk and operational complexity',
        evidence: 'Lower water use does not guarantee lower climate impact because electricity and infrastructure can be material.',
        commercial: 'Product claim · sourcing · footprint differentiation',
      },
      {
        id: 'bio',
        group: 'Biosecurity',
        name: 'Escapes, Biosecurity & Ecosystem Risk',
        impacts: ['biodiversity', 'resilience', 'productivity'],
        mechanism: 'Improve barriers, containment, disease prevention, site practices and contingency planning to reduce ecological and operational risk.',
        value: 'Reduced loss, regulatory risk, ecosystem impact and reputation risk',
        barrier: 'Infrastructure, surveillance, coordination and low-frequency, high-impact events',
        evidence: 'Value is often risk reduction and certification performance rather than a carbon metric.',
        commercial: 'Certification · responsible sourcing · product claim',
      },
    ],
  },

  adoption: {
    label: 'Accelerating Adoption',
    heading: 'Why Better Farming Still Needs a Program',
    lead: 'Because the improvement and the reward sit in different places. A farm carries the biological risk of a change while the value often lands with a processor, a brand or a retailer further down the chain. Feed is the clearest case: the largest share of the footprint is bought from someone the farm does not control, and the customer asking for a lower footprint is rarely the one paying for the switch.',
    constraintEyebrow: 'Fund the scaling constraint',
    constraintHeading: 'Build a proposition that survives a production cycle.',
    constraintLead: 'The right mechanism depends on what is actually preventing adoption. Each constraint below names what blocks the decision and how a program relieves it.',
    constraints: [
      {
        n: '01',
        title: 'Prove the biology before the technology',
        text: 'Systems get selected before the production problem is defined, and the operating assumptions behind them are rarely stress-tested. Establish what the biology and the site can actually support, then choose equipment against that rather than the reverse.',
      },
      {
        n: '02',
        title: 'Carry the ramp and the mortality risk',
        text: 'A production cycle is long, working capital is committed early and a single disease event can remove the margin. Share that exposure through contracts, staged capital or guarantees instead of leaving it entirely with the operator.',
      },
      {
        n: '03',
        title: 'De-risk the feed switch',
        text: 'A lower-impact ingredient can change growth, availability and price at the same time. Fund the trial, hold the performance risk while it is tested, and price the result on saleable product rather than on the ingredient alone.',
      },
      {
        n: '04',
        title: 'Align the claim with processing and custody',
        text: 'A strong farm standard supports nothing if the product loses its identity at the processor. Design the traceability and chain of custody to the level the intended claim needs, before the certification is bought.',
      },
      {
        n: '05',
        title: 'Resource the program after the pilot',
        text: 'Recurring data collection, audits, corrective actions and reporting continue for as long as the claim does. Fund the ongoing management, or the certification lapses and the market access goes with it.',
      },
    ],
  },

  fit: { label: 'Validating Market Fit', heading: 'Where Does an Opportunity Sit?' },

  verifying: {
    label: 'Verifying What Matters Most',
    heading: 'Measure Twice Credit Once',
    lead: 'Evidence costs money, so the useful question is how much this particular claim requires. Five layers build on each other, and the claim decides how far up you need to go.',
    layers: [
      { n: '01', name: 'Practice', question: 'What changed?', examples: 'Feed formulation, stocking, husbandry, treatments, energy and water management' },
      { n: '02', name: 'Outcome', question: 'What happened?', examples: 'Feed conversion, survival, nutrient load, energy use, product footprint' },
      { n: '03', name: 'Traceability', question: 'What is it connected to?', examples: 'Batch, pen or pond, farm, processor, product' },
      { n: '04', name: 'Rights & Accounting', question: 'Who can use it?', examples: 'Ownership, allocation across farm and processing, inventory use' },
      { n: '05', name: 'Market Integrity', question: 'How can it be used?', examples: 'Accounting boundaries, uncertainty, double counting, welfare and origin claim language' },
    ],
  },

  pathways: {
    label: 'Market Pathways',
    heading: 'How the Performance Gets Paid For',
    lead: 'The same farm improvement can reach a market four different ways. The route chosen changes what has to be measured, traced and transferred, which is why it belongs in program design rather than at the end.',
    // Certification leads on this topic, unlike the land-based topics: in
    // seafood a recognised standard is the condition of shelf access, and the
    // credit route is the least developed of the four.
    items: [
      {
        id: 'm03',
        n: '01',
        name: 'Product & Commodity Claims',
        carrier: 'As an attribute of the physical product',
        tagline: 'Make environmental performance part of what is bought and sold.',
        whenToUse: 'Use when a retailer or foodservice buyer requires a recognised standard before the product is listed at all, which in most seafood categories they now do.',
        detail: 'Certification in seafood functions as market access rather than a premium. The practical consequence is that the standard, the feed it accepts and the chain of custody through processing all have to be chosen together, because a farm-level certificate that cannot survive the processor is worth nothing at the shelf.',
        examples: [
          'Aquaculture Stewardship Council (ASC) farm and feed standards',
          'Best Aquaculture Practices (BAP), Global Seafood Alliance',
          'GLOBALG.A.P. aquaculture and chain of custody',
          'MarinTrust and MSC for marine ingredient sourcing',
          'Product carbon footprints and responsible sourcing claims',
        ],
      },
      {
        id: 'm02',
        n: '02',
        name: 'Scope 3 & Insets',
        carrier: 'As an outcome connected to the value chain',
        tagline: 'Create and account for environmental value inside the value chain.',
        whenToUse: 'Use when a buyer sources from the farm or the feed mill and needs the reduction inside its own inventory rather than as a separate unit.',
        detail: 'Because most of the footprint sits in feed, the highest-leverage intervention is usually one supplier removed from the farm. That makes allocation the central question: whose inventory a feed reformulation lands in, and how far down the chain it can still be claimed.',
        examples: [
          'GHG Protocol and product-footprinting standards',
          'SBTi FLAG target accounting',
          'ISO 14040/44 lifecycle assessment',
          'Feed supplier intervention programs',
        ],
      },
      {
        id: 'm04',
        n: '03',
        name: 'Environmental Attribute Certificates',
        carrier: 'As a certificate conveying the attribute',
        tagline: 'Convey environmental value when physical supply alone cannot.',
        whenToUse: 'Use when a lower-impact feed ingredient cannot be segregated through the mill but the buyer still needs to procure the attribute.',
        detail: 'Feed mills blend, which is exactly the condition book-and-claim exists for. The architecture has to be explicit about what is being conveyed, because an ingredient attribute and a finished product claim are not the same thing and conflating them is the common failure.',
        examples: [
          'Book-and-claim programs for feed ingredients',
          'Low-carbon commodity and material certificates',
          'Agricultural environmental attribute registries',
        ],
      },
      {
        id: 'm01',
        n: '04',
        name: 'Carbon & Ecosystem Credits',
        carrier: 'As a quantified environmental asset',
        tagline: 'Turn verified environmental outcomes into market-ready assets.',
        whenToUse: 'Use where the activity genuinely creates a measurable environmental asset, such as restorative or extractive systems, rather than where it reduces an existing footprint.',
        detail: 'The least developed of the four routes for aquaculture. Most farm improvements lower impact per kilogram rather than creating a transferable unit, and the methodologies that do apply sit around habitat and extractive species instead of fed production.',
        examples: [
          'Blue carbon methodologies for tidal wetland and seagrass systems',
          'Restorative shellfish and seaweed frameworks, still forming',
          'Nature and biodiversity frameworks, including TNFD',
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
