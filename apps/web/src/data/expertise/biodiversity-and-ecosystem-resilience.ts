// Biodiversity & Ecosystem Resilience — expertise topic record.
//
// The first cross-cutting topic on the template. It is not a production system:
// it explains how changes in the production topics interact with landscape,
// community and business outcomes. That shows up most in the indicator set,
// which is nature domains rather than the five biophysical indicators the
// production topics share — the clearest demonstration so far of why the
// taxonomy had to become per-record.
//
// PROVENANCE
//  * hero title/lead, eyebrow, CTA, `potential.lead` (from `orientation`) and
//    the pillar bullets (from `performanceCategories`) are lifted from the
//    previous pages/expertise/biodiversity-and-ecosystem-resilience/index.astro
//    — approved copy.
//  * `investments.interventions` are derived from "What Biodiversity and
//    Ecosystem Resilience Includes" and "How a Nature Strategy Moves from
//    Assessment to Action" in the page copy. Unlike Agroforestry and
//    Aquaculture there is no ChatGPT extraction for this topic, so the eight
//    fields per intervention are written here and need owner review.
//  * `adoption.constraints` and the indicator issues follow "Common Reasons
//    Nature Strategies Struggle" and "Why Nature Strategy Requires
//    Prioritization".
//
// NEEDS OWNER REVIEW BEFORE PUBLISH
//  * `overview.stats` — four figures, uncited on the page. Sources: WEF (USD 44
//    trillion, over half of global GDP, moderately or highly dependent on
//    nature; agriculture second and food and beverage third among dependent
//    sectors), World Bank (USD 2.7 trillion a year off global GDP by 2030),
//    and the pollination value estimate.
//  * `pathways[].examples` — TNFD's framework is final as of September 2023;
//    SBTN validation opened February 2025; ESRS E4 scope was revised by EU
//    Omnibus I (Directive 2026/470, February 2026). Biodiversity credit
//    frameworks are still forming and are described as such. Recheck all four.
//  * `investments.interventions` — authored here rather than extracted.
//  * `validationRows` — the Desirability row is AUTHORED (see shared.ts); this
//    topic had none upstream, which would have left section 06's Desirable
//    panel empty.
//  * `positioning` — authored for the influence/incentive/mechanism band.
//  * `enablers.tools` — empty pending owner assignment. See ./tools.ts.
import type { ExpertiseTopic } from './types';
import { attachDefinitions, topicHeroImage } from './shared';

export const biodiversityAndEcosystemResilience: ExpertiseTopic = {
  slug: 'biodiversity-and-ecosystem-resilience',
  name: 'Biodiversity & Ecosystem Resilience',
  eyebrow: 'Nature Across the Value Chain',

  hero: 'Turn Nature-Related Risk into Resilient Business Value',
  heroLead:
    'Terra Nexus helps food and agribusinesses understand where they depend on nature, prioritize material risks and opportunities, design landscape and supply-chain interventions, measure outcomes, and connect nature strategy to credible business decisions and claims.',
  heroImage: topicHeroImage('biodiversity-and-ecosystem-resilience', 1600),
  heroImageAlt: 'Mixed habitat at the edge of a production landscape',

  meta: {
    title: 'Biodiversity & Ecosystem Resilience | Terra Nexus',
    description:
      'Terra Nexus helps food and agribusinesses prioritize nature-related risk, design landscape interventions and connect outcomes to credible claims.',
    canonical: '/expertise/biodiversity-and-ecosystem-resilience/',
  },

  cta: {
    heading: 'Build a Nature Strategy Connected to Real Decisions',
    text: 'Whether the starting point is a sourcing risk, corporate target, landscape program, water challenge, product opportunity, environmental asset, or investment decision, Terra Nexus helps clients translate nature-related complexity into prioritized action and durable business value.',
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
    influence: 'Indirect and shared. Nature outcomes are produced by whoever manages the land or water, across property and supplier boundaries no single company controls.',
    incentive: 'Avoided disruption first — sourcing, water, yield and licence to operate — then disclosure obligations, and only after that a market that pays directly.',
    mechanism: 'Credits and nature finance lead, because a landscape outcome is easier to fund as a discrete asset than to attribute to one company’s inventory.',
  },

  overview: {
    label: 'Overview',
    heading: 'Nature Is an Operating Dependency, Not a Reporting Topic',
    lead: 'More than half of global economic value depends moderately or highly on nature, and food and agriculture sit near the top of that list. The dependency is usually invisible until it is not: a sourcing region that stops yielding, a watershed that runs short, a pollinator decline that shows up in a contract. The work is deciding which of those exposures are material enough to act on, and at what scale.',
    stats: [
      { figure: '$44T', label: 'of economic value, more than half of global GDP, depends moderately or highly on nature' },
      { figure: '2nd', label: 'agriculture ranks second only to construction among the most nature-dependent sectors' },
      { figure: '$2.7T', label: 'a year off global GDP by 2030 if key ecosystem services decline' },
      { figure: '$235B', label: 'a year in crops that depend on pollinators' },
    ],
    body: [
      {
        title: 'The dependency runs both ways',
        text: 'Production depends on soil, water, pollination and climate regulation, and it is also among the largest pressures on them. That makes nature a topic a food business cannot address purely by reducing its own impact, because the condition it depends on is produced by everyone operating in the same landscape.',
      },
      {
        title: 'Four things are being underwritten at once',
        text: 'People: the producers and communities who manage and live in the landscapes the business sources from. Places: the habitat, water and ecological function that determine whether those landscapes keep producing. Planet: the biodiversity and ecosystem services the sector is accountable for. Profits: the sourcing continuity and licence to operate that depend on both.',
      },
      {
        title: 'Prioritisation is the whole discipline',
        text: 'No company can measure every species, service and landscape with equal depth, and the ones that try produce a reporting exercise rather than a decision. The useful question is narrow: which regions, products and ecosystems are material, and what evidence is sufficient to act.',
      },
    ],
  },

  potential: {
    label: 'The Potential',
    heading: 'Managing Nature Changes the Value Equation',
    lead: 'Food and agricultural businesses depend on functioning soils, water systems, pollination, climate regulation, healthy ecosystems, genetic diversity, and the communities that manage and live within production landscapes. These dependencies are often treated as background conditions until they become a sourcing disruption, production loss, regulatory issue, investment risk, customer concern, or reputation problem. A credible nature strategy begins by understanding where the business depends on and affects ecosystems. It then connects those findings to sourcing, operations, capital allocation, supplier programs, product strategy, risk management, measurement, governance, and claims.',
    transition: 'Done well, that connection changes the whole value equation.',
    pillars: [
      {
        tag: 'Resilient',
        title: 'Landscapes that keep producing',
        text: 'Ecological function is what lets a sourcing region absorb a drought, a fire or a pest year and still deliver.',
        bullets: [
          'Improved soil, water, habitat, and ecological function',
          'Reduced vulnerability to drought, erosion, flooding, heat, fire, pests, or disease',
          'Stronger capacity to recover from disturbance',
          'Improved long-term productive capacity and supply reliability',
          'More resilient sourcing strategies and reduced concentration in high-risk landscapes',
        ],
      },
      {
        tag: 'Sustainable',
        title: 'Ecological outcomes that hold up',
        text: 'Habitat, water and species outcomes measured where they happen, at the scale the ecology actually works at.',
        bullets: [
          'Improved habitat quality and connectivity',
          'Reduced pressure on sensitive ecosystems',
          'Restoration or protection of riparian, wetland, grassland, forest, coastal, or marine systems',
          'Improved water quality, infiltration, or watershed function',
          'Stronger pollinator, wildlife, and biological diversity',
        ],
      },
      {
        tag: 'Prosperous',
        title: 'Value the business can actually use',
        text: 'Better information for capital and procurement decisions, and outcomes that survive disclosure and assurance.',
        bullets: [
          'Better understanding of material nature dependencies and impacts',
          'More informed capital, procurement, and portfolio decisions',
          'Decision-useful nature metrics and risk information',
          'Support for corporate targets and disclosures',
          'Access to partnerships, incentives, environmental markets, or nature finance',
          'Clearer roles and benefits for producers, land managers, communities, and local partners',
        ],
      },
    ],
    kicker: 'Nature outcomes are produced in places, by people, across boundaries no single company owns. That is what makes this a coordination problem before it is a measurement one.',
  },

  correcting: {
    label: 'Course Correcting',
    heading: 'What the Loss Is Already Costing',
    lead: 'Nature has been treated as a background condition rather than an input with a balance sheet. Five indicators show where that assumption is being tested, and where a program either holds the line or does not.',
    // Nature domains, not the production topics' biophysical five. This topic
    // is cross-cutting, so the things it tracks are habitat, water, species,
    // communities and resilience.
    indicators: attachDefinitions([
      {
        key: 'habitat',
        name: 'Habitat',
        definition:
          'The extent, condition and connectivity of natural and semi-natural habitat inside and around production landscapes. Connectivity matters as much as area: fragments that cannot exchange species behave like much smaller habitat than they measure.',
        issues: [
          'Conversion at the frontier of sourcing regions',
          'Fragmentation that leaves habitat too isolated to function',
          'Riparian, wetland and margin habitat cultivated to the edge',
          'Restoration counted by area planted rather than by condition achieved',
        ],
      },
      {
        key: 'water',
        name: 'Water',
        definition:
          'Availability, quality, recharge and watershed condition, alongside the competing uses and community needs in the same catchment. A watershed is the unit the business shares whether or not it manages at that scale.',
        issues: [
          'Abstraction assessed per site rather than per catchment',
          'Nutrient and sediment loading from upstream production',
          'Recharge and flood regulation lost with wetland and floodplain',
          'Community and downstream needs excluded from the water balance',
        ],
      },
      {
        key: 'species',
        name: 'Species',
        definition:
          'The diversity of species a landscape supports, including the pollinators, soil organisms and natural enemies that production quietly depends on, and the genetic diversity inside the crops and breeds themselves.',
        issues: [
          'Pollinator decline in landscapes with no forage or nesting habitat',
          'Beneficial and soil organisms lost to input intensity',
          'Genetic narrowing across crops, breeds and stock',
          'Biodiversity reduced to a single index with no ecological context',
        ],
      },
      {
        key: 'communities',
        name: 'Communities',
        definition:
          'The producers, landowners and communities who manage production landscapes and live in them. Nature outcomes are delivered by these people or not at all, which makes their capacity and their share of the benefit a material condition.',
        issues: [
          'Interventions designed without producer or community capacity',
          'Benefit sharing left undefined until after the program starts',
          'Coordination costs across properties carried by nobody',
          'Local knowledge excluded from priority setting',
        ],
      },
      {
        key: 'resilience',
        name: 'Resilience',
        definition:
          'The capacity of a landscape and the business that sources from it to absorb disturbance and recover. It is the outcome the other four indicators combine into, and the one a sourcing team feels first.',
        issues: [
          'Sourcing concentrated in landscapes already under pressure',
          'Climate, water and nature programs run in separate silos',
          'Contingency planning that assumes historical conditions hold',
          'Project benefits never connected to enterprise risk',
        ],
      },
    ]),
  },

  investments: {
    label: 'Priority Investments',
    heading: 'Investments That Reverse the Cycle',
    lead: 'Every investment lands in one of three places: the landscape itself, the supply chain that draws on it, or the decisions that direct capital toward either. Filter by the indicator you are trying to move.',
    frame: [
      { title: 'Landscapes', text: 'The places themselves: habitat, water, connectivity and the restoration or protection that changes their condition.' },
      { title: 'Supply chains', text: 'What the business buys, from where, and the supplier programs and sourcing decisions that follow from that.' },
      { title: 'Decisions', text: 'Assessment, prioritisation, measurement and governance — the work that decides where the first two go.' },
    ],
    interventions: [
      {
        id: 'assess',
        group: 'Decisions',
        name: 'Dependency & Impact Assessment',
        impacts: ['habitat', 'water', 'species', 'resilience'],
        mechanism: 'Map where the business depends on and affects ecosystems, by sourcing region, asset and product, at a resolution that supports a decision.',
        value: 'A defensible basis for prioritising spend, and an early view of sourcing exposure',
        barrier: 'Spatial and supply-chain data quality, boundary definition and the cost of precision nobody needs',
        evidence: 'Screening establishes where to look. It does not by itself evidence an outcome, and should not be presented as one.',
        commercial: 'Risk management · disclosure · capital allocation',
      },
      {
        id: 'priority',
        group: 'Decisions',
        name: 'Priority Landscape Selection',
        impacts: ['habitat', 'water', 'resilience', 'communities'],
        mechanism: 'Translate global targets into a short list of places where action is material to the business and feasible on the ground.',
        value: 'Concentrated effort where it changes both ecological condition and sourcing risk',
        barrier: 'Competing internal priorities, incomplete supplier visibility and political sensitivity of naming regions',
        evidence: 'Prioritisation is a judgement supported by data, not a measurement. State the criteria rather than implying precision.',
        commercial: 'Sourcing strategy · landscape program · disclosure',
      },
      {
        id: 'habitat',
        group: 'Landscapes',
        name: 'Habitat Protection & Restoration',
        impacts: ['habitat', 'species', 'resilience'],
        mechanism: 'Protect intact habitat and restore degraded areas within and adjacent to production, targeting condition and connectivity rather than area alone.',
        value: 'Ecological function, species outcomes, and a defensible nature claim where rights allow',
        barrier: 'Land opportunity cost, long timescales, tenure and maintenance beyond the first planting',
        evidence: 'Outcomes depend on baseline condition and reference state. Area restored is an input, not a result.',
        commercial: 'Nature credit · landscape program · sourcing claim',
      },
      {
        id: 'water',
        group: 'Landscapes',
        name: 'Water & Watershed Programs',
        impacts: ['water', 'habitat', 'communities', 'resilience'],
        mechanism: 'Work at catchment scale on quality, recharge, riparian condition and shared allocation with other users.',
        value: 'Supply security, compliance headroom and measurable reductions in local pressure',
        barrier: 'Coordination across users, hydrological complexity and benefits that accrue to the catchment rather than the funder',
        evidence: 'Water outcomes are often more decision-useful than carbon here, and require clear catchment boundaries.',
        commercial: 'Water stewardship · sourcing claim · nature program',
      },
      {
        id: 'landscape',
        group: 'Landscapes',
        name: 'Landscape & Seascape Collaboration',
        impacts: ['habitat', 'communities', 'water', 'species'],
        mechanism: 'Coordinate multiple producers, companies, agencies and communities around shared outcomes in one place.',
        value: 'Scale no single participant can reach alone, and shared cost across beneficiaries',
        barrier: 'Governance, free riding, attribution between participants and the time collaboration takes',
        evidence: 'Attribution is the hard part: a shared outcome cannot be claimed in full by each contributor.',
        commercial: 'Landscape program · pre-competitive platform · nature finance',
      },
      {
        id: 'supplier',
        group: 'Supply chains',
        name: 'Supplier & Producer Nature Programs',
        impacts: ['habitat', 'species', 'communities', 'water'],
        mechanism: 'Take nature priorities into supplier requirements, producer support, incentives and contracts.',
        value: 'Change where the impact actually occurs, with a route for the cost to travel there',
        barrier: 'Supplier capacity, fragmented supply base and the gap between the buyer asking and the producer paying',
        evidence: 'Practice adoption at the supplier is not an ecological outcome. The two need separate evidence.',
        commercial: 'Supplier program · Scope 3 · sourcing claim',
      },
      {
        id: 'monitoring',
        group: 'Decisions',
        name: 'Nature Measurement & Monitoring',
        impacts: ['habitat', 'species', 'water', 'resilience'],
        mechanism: 'Build proportionate indicators, spatial monitoring and reporting that match the decision and the claim they support.',
        value: 'Evidence that survives assurance, at a cost the program can actually carry',
        barrier: 'Method choice, ecological variability, baseline availability and precision that outruns the budget',
        evidence: 'Data precision beyond what the decision requires is a cost, not a safeguard.',
        commercial: 'Disclosure · assurance · credit issuance',
      },
      {
        id: 'finance',
        group: 'Supply chains',
        name: 'Nature Finance & Market Access',
        impacts: ['habitat', 'communities', 'resilience'],
        mechanism: 'Structure blended finance, offtake, incentive or market mechanisms so landscape work has a funder beyond a single corporate budget.',
        value: 'Durable funding for outcomes that outlast an annual sustainability budget',
        barrier: 'Immature markets, unclear rights, high transaction cost relative to deal size',
        evidence: 'Biodiversity market frameworks are still forming. Treat pricing and demand as uncertain rather than assumed.',
        commercial: 'Nature credit · blended finance · incentive program',
      },
    ],
  },

  adoption: {
    label: 'Accelerating Adoption',
    heading: 'Why a Nature Ambition Still Needs a Program',
    lead: 'Because the outcome is produced across boundaries the company does not control, by people who need a reason to participate. A nature commitment made at headquarters becomes real only when a producer, a landowner or a community changes something in a specific place, and they carry the cost and the coordination burden of doing it. Adoption slows when the ambition is global and the action has to be local.',
    constraintEyebrow: 'Fund the scaling constraint',
    constraintHeading: 'Build a proposition that works in one place at a time.',
    constraintLead: 'The right mechanism depends on what is actually preventing adoption. Each constraint below names what blocks the decision and how a program relieves it.',
    constraints: [
      {
        n: '01',
        title: 'Start from the decision, not the framework',
        text: 'Programs that begin with a disclosure standard produce reporting rather than change. Name the business decision the work has to inform, then choose the framework that serves it.',
      },
      {
        n: '02',
        title: 'Translate the target into places',
        text: 'A global commitment cannot be acted on. Convert it into a short list of priority landscapes with named suppliers, so the work has an owner and a budget rather than a percentage.',
      },
      {
        n: '03',
        title: 'Pay for the coordination',
        text: 'Landscape outcomes require multiple parties to act together, and coordination is real work that usually has no owner. Fund the convening, the governance and the facilitation explicitly.',
      },
      {
        n: '04',
        title: 'Right-size the evidence',
        text: 'Precision beyond what the decision needs consumes the budget that should have gone into the landscape. Match the method to the claim, and say plainly what the data can and cannot support.',
      },
      {
        n: '05',
        title: 'Settle attribution before the claim',
        text: 'A shared outcome cannot be claimed in full by every contributor, and a corporate claim without clear rights will not survive assurance. Agree who may say what, in writing, before the work starts.',
      },
    ],
  },

  fit: { label: 'Validating Market Fit', heading: 'Where Does an Opportunity Sit?' },

  verifying: {
    label: 'Verifying What Matters Most',
    heading: 'Measure Twice Credit Once',
    lead: 'Evidence costs money, so the useful question is how much this particular claim requires. Five layers build on each other, and the claim decides how far up you need to go.',
    layers: [
      { n: '01', name: 'Practice', question: 'What changed?', examples: 'Area protected or restored, management change, supplier requirement, catchment action' },
      { n: '02', name: 'Outcome', question: 'What happened?', examples: 'Habitat condition, connectivity, species indicators, water quality and flow' },
      { n: '03', name: 'Traceability', question: 'What is it connected to?', examples: 'Parcel, catchment, sourcing region, supplier, product' },
      { n: '04', name: 'Rights & Accounting', question: 'Who can use it?', examples: 'Land rights, attribution between contributors, transfer, retirement' },
      { n: '05', name: 'Market Integrity', question: 'How can it be used?', examples: 'Baselines, permanence, leakage, double counting across contributors, claim language' },
    ],
  },

  pathways: {
    label: 'Market Pathways',
    heading: 'How the Performance Gets Paid For',
    lead: 'The same landscape outcome can reach a market four different ways. The route chosen changes what has to be measured, attributed and transferred, which is why it belongs in program design rather than at the end.',
    // Credits lead here, per the gap assessment: a landscape outcome is easier
    // to fund as a discrete asset than to attribute into one company's
    // inventory across boundaries it does not control.
    items: [
      {
        id: 'm01',
        n: '01',
        name: 'Carbon & Ecosystem Credits',
        carrier: 'As a quantified environmental asset',
        tagline: 'Turn verified environmental outcomes into market-ready assets.',
        whenToUse: 'Use when the outcome happens in a defined place with clear rights, and needs a funder who is not already sourcing from that landscape.',
        detail: 'A discrete, located outcome is the easiest thing to fund, which is why habitat and watershed work reaches market this way first. Biodiversity units are considerably less mature than carbon: the methods, the demand and the pricing are all still forming, and a program should be built so it stands up without that revenue.',
        examples: [
          'Carbon methodologies for restoration, avoided conversion and wetlands',
          'Biodiversity and habitat credit frameworks, still forming',
          'Water quality and quantity trading programs where they exist',
          'Mitigation and habitat banking under national regimes',
        ],
      },
      {
        id: 'm02',
        n: '02',
        name: 'Scope 3 & Insets',
        carrier: 'As an outcome connected to the value chain',
        tagline: 'Create and account for environmental value inside the value chain.',
        whenToUse: 'Use when the priority landscape is also a sourcing region, so the outcome can be tied to the chain that depends on it.',
        detail: 'The strongest version of this topic commercially: the company funding the landscape is the one exposed to its decline. Nature reporting is converging on the same value-chain boundary climate uses, which makes a sourcing-region program legible to both.',
        examples: [
          'TNFD recommendations, final framework published September 2023',
          'Science Based Targets for Nature, validation open since February 2025',
          'ESRS E4 under CSRD, scope revised by EU Omnibus I (Directive 2026/470)',
          'GHG Protocol Land Sector and Removals Guidance for the carbon overlap',
        ],
      },
      {
        id: 'm03',
        n: '03',
        name: 'Product & Commodity Claims',
        carrier: 'As an attribute of the physical product',
        tagline: 'Make environmental performance part of what is bought and sold.',
        whenToUse: 'Use when the outcome can be tied to a specific product and a buyer will pay for verified origin or place-based sourcing.',
        detail: 'Nature claims on product are the hardest of the four to substantiate, because the outcome is landscape-scale and the claim is unit-scale. Certification and place-based sourcing programs are the practical route; a direct biodiversity claim on a package rarely survives scrutiny.',
        examples: [
          'Landscape and commodity certification programs',
          'Place-based and origin-verified sourcing claims',
          'Deforestation and conversion-free sourcing requirements',
          'Product footprints covering nature alongside carbon',
        ],
      },
      {
        id: 'm04',
        n: '04',
        name: 'Environmental Attribute Certificates',
        carrier: 'As a certificate conveying the attribute',
        tagline: 'Convey environmental value when physical supply alone cannot.',
        whenToUse: 'Use when the outcome cannot be tied to physical supply at all, but a buyer still needs to fund and account for it.',
        detail: 'Least developed for nature, and the one where double counting is most likely. A landscape outcome with several contributors and a certificate that transfers to one of them has to reconcile those two facts explicitly, or the same hectare is claimed more than once.',
        examples: [
          'Water stewardship and replenishment certificates',
          'Emerging biodiversity attribute registries',
          'Book-and-claim structures adapted from other markets',
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
