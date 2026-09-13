// Low Carbon Energy & Biofuels — expertise topic record.
//
// The topic where the gap assessment's point about value-chain topics is most
// literal: a refiner asking for a low-CI origination program is buying
// regenerative agriculture practice change, and the five indicators are not
// biophysical at all. They are the ones the assessment named — carbon
// intensity, feedstock quality, regulatory qualification, chain of custody and
// facility performance.
//
// PROVENANCE
//  * hero, eyebrow, CTA, `potential.lead` (from `orientation`) and the pillar
//    bullets (from `performanceCategories`) are lifted from the previous
//    pages/expertise/low-carbon-energy-and-biofuels/index.astro — approved copy.
//  * `investments.interventions` derive from "What Low-Carbon Energy and
//    Biofuels Includes" in the page copy.
//  * `adoption.constraints` and the indicator issues follow that page copy's
//    own "Common Reasons ... Struggle" list.
//  * The standards in `pathways` are the ones the brief records as direct Terra
//    Nexus experience: USDA FD-CIC, GREET and 45ZCF-GREET, Section 45Z, the
//    Renewable Fuel Standard and RINs, state LCFS programs, ISCC, RED II and
//    RED III, ISO 14064, ISO 22095 and the GHG Protocol. That is the one topic
//    where the instrument list is owner-approved rather than researched.
//
// PUBLICATION GATE — LIFTED by the owner, 2026-09-12. The brief had blocked
// the public page until authoritative source citations were packaged,
// time-sensitive regulatory claims rechecked, and the final public copy
// approved. The owner has waived that gate, so this topic now publishes on the
// same terms as the other eight — which today means it is still waiting on the
// tool-to-topic assignment that all nine share, not on anything specific to
// biofuels.
//
// The regulatory-currency concern behind the gate is NOT waived and is not a
// gate — it is recurring maintenance. This page's regulatory content dates
// faster than any other topic's, so the items in the review list below should
// be rechecked before publish and on a standing basis afterwards.
//
// NEEDS OWNER REVIEW BEFORE PUBLISH
//  * `overview.stats` — corn farming's ~50% share of corn ethanol's total GHG
//    emissions and the ~29.6 gCO2e/MJ central estimate come from the published
//    literature; the 2030 date and the three-country feedstock restriction come
//    from Section 45Z as amended. Uncited on the page, as on the other topics.
//  * Regulatory currency is the live risk here and moves fastest of any topic:
//    45Z applies to fuel produced after 31 December 2024 and sold before
//    1 January 2030 (extended two years by OBBBA 2025); DOE released a revised
//    45ZCF-GREET in June 2026 which removes indirect land-use change and limits
//    qualifying feedstock to the US, Mexico and Canada for fuel produced after
//    31 December 2025; IRS Notice 2026-53 carries the 2026 emissions rate table
//    and guidance on manure-derived fuels. All of this should be rechecked
//    immediately before publish.
//  * `validationRows` — the Desirability row is AUTHORED (see shared.ts); this
//    topic had none upstream.
//  * `positioning` — authored for the influence/incentive/mechanism band.
//  * `enablers.tools` — empty pending owner assignment. See ./tools.ts.
import type { ExpertiseTopic } from './types';
import { attachDefinitions, topicHeroImage } from './shared';

export const lowCarbonEnergyAndBiofuels: ExpertiseTopic = {
  slug: 'low-carbon-energy-and-biofuels',
  name: 'Low Carbon Energy & Biofuels',
  eyebrow: 'Soil to Cash',

  hero: 'Create More Value from Low-Carbon Feedstocks',
  heroLead:
    'Terra Nexus helps biofuel producers and commodity traders create value at every step, from field-level carbon-intensity analysis and origination through program design, commercialization, recurring management, and verification readiness.',
  heroImage: topicHeroImage('low-carbon-energy-and-biofuels', 1600),
  heroImageAlt: 'Biofuel production facility at dusk',

  meta: {
    title: 'Low Carbon Energy & Biofuels | Terra Nexus',
    description:
      'Terra Nexus connects field-level carbon intensity, feedstock origination and chain of custody to fuel pathway economics and verification readiness.',
    canonical: '/expertise/low-carbon-energy-and-biofuels/',
  },

  cta: {
    heading: 'Start Your Soil-to-Cash Journey',
    text: 'Whether the starting point is a feedstock strategy, a carbon-intensity question, a program build, a transaction, or a verification deadline, Terra Nexus helps clients connect what happens in the field to what the fuel pathway and the incentive will actually pay for.',
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
    influence: 'None over the field directly, and total dependence on it. The refiner cannot farm, but roughly half its carbon intensity is decided before the load arrives.',
    incentive: 'A priced, regulated number. Carbon intensity converts into credit value per gallon, which is the clearest direct payment for practice change anywhere in the food system.',
    mechanism: 'Product and commodity claims lead, because low carbon intensity is a specification the fuel is bought on rather than a claim made about it.',
  },

  overview: {
    label: 'Overview',
    heading: 'Half the Carbon Intensity Is Decided Before the Load Arrives',
    lead: 'In corn ethanol, farming accounts for roughly half of total greenhouse gas emissions and the plant accounts for most of the rest. That single fact is what makes this topic different from the rest of the fuel sector: the cheapest remaining reductions are upstream, in fields a refiner does not own, and the incentive programs now price them explicitly.',
    stats: [
      { figure: '~50%', label: 'of corn ethanol’s greenhouse gas emissions come from farming, not the plant' },
      { figure: '29.6', label: 'grams of CO2e per megajoule, a central estimate for corn ethanol’s carbon intensity' },
      { figure: '2030', label: 'the year Section 45Z stops applying to qualifying fuel sold' },
      { figure: '3', label: 'countries whose feedstock now qualifies: the US, Mexico and Canada' },
    ],
    body: [
      {
        title: 'Carbon intensity is a price, not a disclosure',
        text: 'Unlike most of the food system, this sector already converts a carbon number into money per gallon through tax credits and fuel programs. That makes the evidence requirement unusually concrete: the number has to survive a model, an auditor and in some cases a tax position.',
      },
      {
        title: 'Four things are being underwritten at once',
        text: 'People: the growers whose practice change produces the lower-CI bushel. Places: the soil and water in the supply shed the facility draws from. Planet: the lifecycle emissions the fuel is credited against. Profits: the margin left after origination, evidence, assurance and the premium paid upstream.',
      },
      {
        title: 'The rules move faster than the assets',
        text: 'Facilities are financed over decades and the qualifying rules change between model versions. Recent changes removed indirect land-use change from the calculation and limited qualifying feedstock to North America, either of which can move a project’s economics more than any operational improvement.',
      },
    ],
  },

  potential: {
    label: 'The Potential',
    heading: 'Connecting Field to Fuel Changes the Value Equation',
    lead: 'Low-carbon fuel value is created across a chain that starts in a field and ends in a tax or compliance position. Field practice determines feedstock carbon intensity. Origination determines whether enough qualifying volume can actually be bought. Chain of custody determines whether it stays qualifying. The facility pathway determines what the fuel scores, and the regulatory program determines what that score is worth. A weakness at any one of those points removes the value created at all the others.',
    transition: 'Done well, that connection changes the whole value equation.',
    pillars: [
      {
        tag: 'Resilient',
        title: 'A position that survives a rule change',
        text: 'Programs built on documented evidence and flexible sourcing absorb a model revision; programs built on one assumption do not.',
        bullets: [
          'Feedstock sourcing that is not dependent on a single region or practice',
          'Source documentation that survives a change of model version',
          'Contracts that allocate regulatory risk explicitly',
          'Verification readiness maintained continuously rather than assembled late',
          'Sensitivity to incentive value tested before commitments are made',
        ],
      },
      {
        tag: 'Sustainable',
        title: 'Real reductions, properly counted',
        text: 'The practice change is genuine agronomy, and the accounting has to reflect what actually happened in the field.',
        bullets: [
          'Lower feedstock carbon intensity from documented practice change',
          'Reduced nutrient, fuel and tillage emissions per bushel',
          'Facility emissions and process improvements captured in the pathway',
          'Co-products allocated consistently rather than opportunistically',
          'Uncertainty and missing data handled explicitly rather than assumed away',
        ],
      },
      {
        tag: 'Prosperous',
        title: 'Margin that actually lands',
        text: 'The difference between nominal credit value and realizable margin is where most of these programs are won or lost.',
        bullets: [
          'More valuable feedstock origination and producer premiums that pencil',
          'Improved facility and transaction economics',
          'Stronger program controls and lower cost of assurance',
          'Greater market and verification readiness at the point of sale',
          'Clear allocation of environmental attributes in contracts',
        ],
      },
    ],
    kicker: 'The number has to be defensible to an auditor, not just favourable in a model. That is the discipline this topic runs on.',
  },

  correcting: {
    label: 'Course Correcting',
    heading: 'What an Undocumented Bushel Actually Costs',
    lead: 'The industry built origination for volume and quality, not for evidence, and the incentive programs now ask for both. Five indicators show where that gap opens, and where a program either closes it or discovers it at verification.',
    // The five the gap assessment specified for this topic: not biophysical.
    indicators: attachDefinitions([
      {
        key: 'ci',
        name: 'Carbon intensity',
        definition:
          'The lifecycle emissions of the fuel, expressed per unit of energy, built up from field practice, transport, facility operation and co-product allocation. It is the number the incentive pays against, so it is the number that has to survive review.',
        issues: [
          'Field inputs accepted without adequate source documentation',
          'Feedstock CI analysed separately from the facility pathway',
          'Model version changes moving the result after commitments are made',
          'Uncertainty and missing data filled with favourable defaults',
        ],
      },
      {
        key: 'feedstock',
        name: 'Feedstock quality',
        definition:
          'Whether enough qualifying material, with the documentation attached, can actually be bought in the supply shed a facility draws on — as distinct from how much material exists.',
        issues: [
          'Business cases assuming every sourced bushel is traceable',
          'Qualifying acres concentrated in a narrow geography',
          'Practice adoption unverified at the point of delivery',
          'Seasonal and yield variability treated as noise rather than supply risk',
        ],
      },
      {
        key: 'regulatory',
        name: 'Regulatory qualification',
        definition:
          'Whether the fuel, the feedstock and the producer meet the conditions of the specific program being claimed under, which change between versions and between jurisdictions.',
        issues: [
          'Eligibility assessed against a superseded model or guidance',
          'Origin restrictions disqualifying supply mid-program',
          'Stacking assumptions across programs that do not permit it',
          'Tax and transaction positions taken before the evidence supports them',
        ],
      },
      {
        key: 'custody',
        name: 'Chain of custody',
        definition:
          'Segregation, mass balance, inventory and transaction records that keep eligible volume eligible from the field through to the fuel, and prevent the same attribute being sold twice.',
        issues: [
          'Mass-balance rules that do not match real delivery and storage',
          'Attributes and representations unallocated in contracts',
          'Ledger, platform and lifecycle-model boundaries that disagree',
          'Exceptions, corrections and version changes ungoverned',
        ],
      },
      {
        key: 'facility',
        name: 'Facility performance',
        definition:
          'The plant’s own energy, process efficiency, co-products and emissions — the half of the carbon intensity the operator directly controls, and the part a capital decision can move.',
        issues: [
          'Process energy improvements unmodelled in the pathway',
          'Co-product credits claimed inconsistently with the accounting boundary',
          'Capital decisions made against nominal rather than realizable credit value',
          'Recurring operations underestimated after the initial pilot',
        ],
      },
    ]),
  },

  investments: {
    label: 'Priority Investments',
    heading: 'Investments That Move the Number',
    // Frame labels per the gap assessment for this topic.
    lead: 'Every investment lands in one of three places: the feedstock and how it is originated, the conversion itself, or the qualification that turns the result into value. Filter by the indicator you are trying to move.',
    frame: [
      { title: 'Feedstock', text: 'Field practice, carbon intensity, origination, premiums and the documentation that has to arrive with the load.' },
      { title: 'Conversion', text: 'The facility pathway: process energy, co-products, lifecycle modelling and the emissions the operator controls.' },
      { title: 'Qualification', text: 'Chain of custody, program eligibility, contracts, controls and verification readiness — what makes the number bankable.' },
    ],
    interventions: [
      {
        id: 'fieldci',
        group: 'Feedstock',
        name: 'Feedstock Carbon-Intensity Analysis',
        impacts: ['ci', 'feedstock'],
        mechanism: 'Quantify field-level CI from location, yield, nutrient management, energy and practice data, with documented inputs and explicit uncertainty.',
        value: 'A defensible starting number and a map of where the cheapest reductions actually are',
        barrier: 'Producer data availability, record quality and the cost of collecting inputs at field level',
        evidence: 'A modelled field CI is only as good as its source documentation. Practice attestation without records will not survive verification.',
        commercial: 'Low-CI product · 45Z · LCFS · premium origination',
      },
      {
        id: 'origination',
        group: 'Feedstock',
        name: 'Feedstock Strategy & Origination',
        impacts: ['feedstock', 'ci', 'regulatory'],
        mechanism: 'Match sourcing regions, producers, delivery points and eligible practices against facility requirements and realistic commercial volume.',
        value: 'Qualifying volume that can actually be bought, at a premium that still leaves margin',
        barrier: 'Competition for the same acres, producer willingness, and premiums bid against nominal credit value',
        evidence: 'Available acreage and contractable qualifying volume are different numbers. Plan against the second.',
        commercial: 'Low-CI feedstock · supplier program · Scope 3',
      },
      {
        id: 'practice',
        group: 'Feedstock',
        name: 'Producer Practice Programs',
        impacts: ['ci', 'feedstock'],
        mechanism: 'Fund and support the agronomic change — nutrient management, tillage, cover — that lowers feedstock CI, with the record-keeping built into the workflow.',
        value: 'Real CI reduction at source, and a producer relationship that persists across seasons',
        barrier: 'Producer economics, agronomic risk and the data burden landing on the farm',
        evidence: 'This is regenerative agriculture with a fuel buyer attached. The same hedging applies: practice adoption alone does not prove a reduction.',
        commercial: 'Low-CI product · inset · supplier program',
      },
      {
        id: 'custody',
        group: 'Qualification',
        name: 'Chain of Custody & Eligible-Volume Control',
        impacts: ['custody', 'regulatory'],
        mechanism: 'Operate segregation or mass balance against real delivery, storage and inventory, with reconciliation that prevents over-allocation.',
        value: 'Eligible volume that reconciles, and attributes that can only be sold once',
        barrier: 'Elevator and facility reality, seasonal throughput and legacy inventory systems',
        evidence: 'Reconciliation is the control that catches over-claiming. Its absence is usually discovered at verification.',
        commercial: 'Qualifying volume · certification · transaction diligence',
      },
      {
        id: 'pathway',
        group: 'Conversion',
        name: 'Fuel Pathway & Facility Economics',
        impacts: ['facility', 'ci'],
        mechanism: 'Model feedstock inputs, facility emissions, coproducts and process improvements together, and test margin sensitivity to incentive value.',
        value: 'A pathway score and a business case that move together rather than separately',
        barrier: 'Model complexity, commercially sensitive plant data and assumptions that change between versions',
        evidence: 'Nominal credit value and realizable margin differ substantially. Model the second.',
        commercial: '45Z · RFS · LCFS · facility investment case',
      },
      {
        id: 'regpath',
        group: 'Qualification',
        name: 'Regulatory & Market Pathway Selection',
        impacts: ['regulatory', 'ci'],
        mechanism: 'Assess federal and state fuel programs, tax incentives, certification and international market access against the actual fuel, feedstock and facility.',
        value: 'A route to value that the fuel genuinely qualifies for, and a view of what happens if it changes',
        barrier: 'Pace of regulatory change, jurisdictional differences and stacking rules that are easy to misread',
        evidence: 'Eligibility is version-specific and dated. State the program, the version and the date the assessment was made.',
        commercial: '45Z · RIN · LCFS credit · international access',
      },
      {
        id: 'operations',
        group: 'Qualification',
        name: 'Program Operations & Assurance',
        impacts: ['custody', 'regulatory', 'facility'],
        mechanism: 'Run the recurring work: producer evidence, calculations, quality control, ledgers, exceptions, record retention and verification readiness.',
        value: 'A program that passes verification as a matter of routine rather than as an annual emergency',
        barrier: 'Staffing, system integration and the tendency to treat verification as a documentation exercise',
        evidence: 'Verification readiness is a design property of the program. It cannot be added at the end.',
        commercial: 'Verification · tax position · transaction diligence',
      },
    ],
  },

  adoption: {
    label: 'Accelerating Adoption',
    heading: 'Why a Priced Carbon Number Still Needs a Program',
    lead: 'Because the money is at the facility and the change is in the field, and the two are separated by an originator, an elevator and a contract. The grower carries the agronomic risk and the record-keeping burden for a benefit that materialises somewhere else, months later, as a tax position. Adoption depends on how much of that value travels back upstream, and how early.',
    constraintEyebrow: 'Fund the scaling constraint',
    constraintHeading: 'Build a proposition that reaches the field.',
    constraintLead: 'The right mechanism depends on what is actually preventing adoption. Each constraint below names what blocks the decision and how a program relieves it.',
    constraints: [
      {
        n: '01',
        title: 'Pay the premium against realizable margin',
        text: 'Premiums bid on nominal credit value do not survive the first model revision. Price the offer on margin the facility can actually realize, and say plainly what happens to it if the rules change.',
      },
      {
        n: '02',
        title: 'Take the record-keeping off the farm',
        text: 'Source documentation is the binding constraint on qualifying volume, and it is being asked of people with no reason to hold it. Build the data workflow into the origination relationship instead of issuing a template.',
      },
      {
        n: '03',
        title: 'Allocate regulatory risk in the contract',
        text: 'Eligibility can change between when the crop is grown and when the fuel is sold. Say who carries that in writing, because silence allocates it to whoever is least able to argue.',
      },
      {
        n: '04',
        title: 'Commit beyond a single season',
        text: 'Practice change takes more than one year to establish and the grower is choosing between buyers annually. Multi-year terms are what turn a premium into an agronomic decision.',
      },
      {
        n: '05',
        title: 'Design for verification from the start',
        text: 'Treating assurance as a document exercise at year end is how programs discover their volume does not reconcile. Build the controls into the operating model before the first load moves.',
      },
    ],
  },

  fit: { label: 'Validating Market Fit', heading: 'Where Does an Opportunity Sit?' },

  verifying: {
    label: 'Verifying What Matters Most',
    heading: 'Measure Twice Credit Once',
    lead: 'Evidence costs money, so the useful question is how much this particular claim requires. Five layers build on each other, and the claim decides how far up you need to go. In this topic the top of the ladder is a tax or compliance position, which sets the standard for everything below it.',
    layers: [
      { n: '01', name: 'Practice', question: 'What changed?', examples: 'Nutrient management, tillage, cover, energy use, process change at the facility' },
      { n: '02', name: 'Outcome', question: 'What happened?', examples: 'Field carbon intensity, facility emissions, pathway score, co-product yield' },
      { n: '03', name: 'Traceability', question: 'What is it connected to?', examples: 'Field, farm, load, elevator, facility, fuel batch' },
      { n: '04', name: 'Rights & Accounting', question: 'Who can use it?', examples: 'Attribute ownership, contractual representations, transfer, retirement' },
      { n: '05', name: 'Market Integrity', question: 'How can it be used?', examples: 'Program eligibility and version, stacking rules, double counting, claim and tax language' },
    ],
  },

  pathways: {
    label: 'Market Pathways',
    heading: 'How the Performance Gets Paid For',
    lead: 'The same field outcome can reach a market four different ways. In this topic one route dominates, because the regulated fuel programs already price carbon intensity directly.',
    // Product & commodity claims lead: here the attribute is a fuel
    // specification with a regulated price, not a marketing claim.
    items: [
      {
        id: 'm03',
        n: '01',
        name: 'Product & Commodity Claims',
        carrier: 'As an attribute of the physical product',
        tagline: 'Make environmental performance part of what is bought and sold.',
        whenToUse: 'Use whenever the fuel qualifies under a regulated program, which is the central case for this topic and the reason the sector exists commercially.',
        detail: 'Carbon intensity here is a specification the fuel is bought and credited on, not a claim made about it afterwards. That makes the evidence bar higher than anywhere else in the food system: the number supports a tax position or a compliance obligation, and it is examined accordingly.',
        examples: [
          'Section 45Z Clean Fuel Production Credit, for fuel sold before 1 January 2030',
          '45ZCF-GREET and GREET lifecycle modelling; USDA FD-CIC for feedstock',
          'Renewable Fuel Standard and RINs',
          'State Low Carbon Fuel Standard programs',
          'ISCC, and RED II / RED III for European market access',
        ],
      },
      {
        id: 'm04',
        n: '02',
        name: 'Environmental Attribute Certificates',
        carrier: 'As a certificate conveying the attribute',
        tagline: 'Convey environmental value when physical supply alone cannot.',
        whenToUse: 'Use when qualifying feedstock cannot be physically segregated to the facility but the attribute still has to transfer with integrity.',
        detail: 'Grain systems commingle, so mass balance and book-and-claim structures do most of the work of keeping eligible volume eligible. The architecture is the control: issuance, custody, transfer and retirement have to reconcile, or the same low-CI bushel supports two claims.',
        examples: [
          'Book-and-claim programs for feedstock and fuel',
          'ISO 22095 chain of custody',
          'Low-carbon commodity and material certificates',
          'Sustainable aviation fuel certificates',
        ],
      },
      {
        id: 'm02',
        n: '03',
        name: 'Scope 3 & Insets',
        carrier: 'As an outcome connected to the value chain',
        tagline: 'Create and account for environmental value inside the value chain.',
        whenToUse: 'Use when a corporate buyer downstream of the fuel needs the reduction in its own inventory, typically for transport or logistics emissions.',
        detail: 'The same field reduction can be claimed by the fuel program or by a corporate inventory, and it cannot be both. Deciding which, before the volume is contracted, is the practical work; the accounting is straightforward once the allocation is settled.',
        examples: [
          'GHG Protocol Corporate Value Chain (Scope 3) Standard',
          'ISO 14064 for organisation-level quantification',
          'Book-and-claim structures for corporate fuel buyers',
          'Value Change Initiative intervention guidance',
        ],
      },
      {
        id: 'm01',
        n: '04',
        name: 'Carbon & Ecosystem Credits',
        carrier: 'As a quantified environmental asset',
        tagline: 'Turn verified environmental outcomes into market-ready assets.',
        whenToUse: 'Use where the field outcome is not being claimed through a fuel pathway, and a separate funder wants a transferable unit.',
        detail: 'Structurally the alternative to the fuel route rather than a complement to it: an acre’s reduction cannot support a credit and a fuel carbon-intensity score at the same time. Worth modelling as a comparison when acreage exceeds what the facility can qualify.',
        examples: [
          'Agricultural land-management carbon methodologies',
          'Nutrient management and nitrous oxide methodologies',
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
    // Awaiting owner tool assignment — see data/expertise/tools.ts. Biofuels
    // Origination Economics and Crop Carbon Intensity are the obvious
    // candidates, but the assignment is the owner's call.
    tools: [],
  },
};
