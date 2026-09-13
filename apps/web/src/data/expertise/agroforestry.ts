// Agroforestry — expertise topic record.
//
// Third topic onto the template, and the first built from the repo's own
// sources rather than the handover bundle. Assembled, not authored, wherever
// approved copy already existed:
//
// PROVENANCE
//  * hero title/lead, meta title, CTA, `potential.lead` (from `orientation`)
//    and the pillar bullets (from `performanceCategories`) are lifted from the
//    previous pages/expertise/agroforestry/index.astro — approved copy.
//  * `investments.interventions` are verbatim from the ChatGPT extraction pass
//    (handover bundle, reference/chatgpt-expertise-content.json), which covers
//    this topic. The hedging in `evidence` is deliberate.
//  * `validationRows` / `validationQuestions` are lifted from the same page's
//    `validationRows` and `decisionGroups`; the capability mapping follows the
//    brief's "How Terra Nexus helps" (knowledge/expertise/briefs/).
//  * `adoption.constraints` follow "Why Long Time Horizons Change the
//    Commercial Model" in plans/content/agroforestry-page-copy.md.
//  * `positioning` and `overview` are written from the brief's market thesis
//    and value-chain position.
//  * pathway names, carriers and taglines follow src/data/market-mechanisms.ts.
//
// NEEDS OWNER REVIEW BEFORE PUBLISH
//  * `overview.stats` — four figures, uncited on the page, same treatment as
//    the two live topics. Sources: FAO (agroforestry on ~43% of agricultural
//    land, ~900M rural people), IPCC (0.1–5.7 GtCO2/yr removal potential),
//    and the tree-cover synthesis behind the 10% / 18 PgC figure.
//  * `pathways[].examples` — named methodologies and programs. VM0047 is at
//    v1.1 (active 14 May 2025, ICVCM-approved); EUDR applies from 30 December
//    2026. Both date fast and should be rechecked before publish.
//  * `positioning` — authored for the influence/incentive/mechanism band.
//  * `correcting.indicators[].issues` — authored from the page copy's own
//    "Common Reasons Agroforestry Programs Struggle" list plus the system
//    design constraints.
//  * `enablers.tools` — intentionally empty pending the owner's tool
//    assignment. See data/expertise/tools.ts. Section 10 and its rail entry
//    are omitted while it is.
//
// NOTE: the brief proposes the eyebrow "CULTIVATED ON LAND" where the live page
// uses "Agricultural Production". The live page wins under "never rewrite
// approved copy"; flagging the divergence rather than resolving it here.
import type { ExpertiseTopic } from './types';
import { attachDefinitions, topicHeroImage } from './shared';

export const agroforestry: ExpertiseTopic = {
  slug: 'agroforestry',
  name: 'Agroforestry',
  eyebrow: 'Agricultural Production',

  hero: 'Integrate Trees, Production, and Long-Term Value',
  heroLead:
    'Terra Nexus helps producers, integrated agricultural companies, traders, brands, technology providers, and investors evaluate and build agroforestry systems that align production economics, land use, climate and nature outcomes, supply-chain demand, and credible market pathways.',
  heroImage: topicHeroImage('agroforestry', 1600),
  heroImageAlt: 'Rows of trees integrated into cropland',

  meta: {
    title: 'Agroforestry | Terra Nexus',
    description:
      'Terra Nexus helps producers, traders and investors build agroforestry systems that align production economics, land use and credible market pathways.',
    canonical: '/expertise/agroforestry/',
  },

  cta: {
    heading: 'Build an Agroforestry Pathway from Land Design to Market',
    text: 'Whether the starting point is a farm or ranch opportunity, a new ingredient or product, a sourcing objective, a landscape program, a carbon or nature pathway, or an investment thesis, Terra Nexus helps clients connect long-term biological change with practical execution and market value.',
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
    influence: 'Direct but exercised once: the planting design fixes the system for decades, and the producer lives with that decision long after the program that funded it.',
    incentive: 'Diversified product revenue, shelter and erosion control first; certification, removals and land value later, once the trees are established.',
    mechanism: 'Carbon and ecosystem credits lead, because trees are the production change whose removals are durable enough to sell as a unit.',
  },

  overview: {
    label: 'Overview',
    heading: 'Agroforestry Already Covers Nearly Half the World’s Farmland',
    lead: 'Trees on working land are not a new idea. Some form of agroforestry is already present on more than two fifths of the world’s agricultural land, supporting the livelihoods of hundreds of millions of rural people. What is rare is agroforestry designed as a commercial system, with the establishment cost funded, the route to market settled and the environmental value owned by someone who can use it.',
    stats: [
      { figure: '~43%', label: 'of the world’s agricultural land already carries some form of agroforestry' },
      { figure: '0.1-5.7', label: 'gigatonnes of CO2 a year, the IPCC’s range for agroforestry’s removal potential' },
      { figure: '~900M', label: 'rural people living on land where agroforestry is already practised' },
      { figure: '10%', label: 'more tree cover on agricultural land would store over 18 petagrams of carbon' },
    ],
    body: [
      {
        title: 'Trees are a production decision, not a conservation feature',
        text: 'Adding woody perennials changes the biological cycle, the capital requirement, the equipment layout, the labour calendar, the product mix and the route to market. Treating it as a conservation add-on to an otherwise unchanged farm is the most common reason an agroforestry concept never reaches commercial scale.',
      },
      {
        title: 'Four things are being underwritten at once',
        text: 'People: the producers who commit land for decades and carry the establishment risk. Places: the soil, water and habitat that the planting design either protects or degrades. Planet: the removals and nature outcomes the system is credited with. Profits: the margin that has to exist across a much longer payback than a one-season practice change.',
      },
      {
        title: 'The time horizon is the commercial problem',
        text: 'Trees take years to produce a return while costs land immediately, and the environmental value they create is claimed over decades by whoever holds the rights. Almost every failure mode in agroforestry is a timing or ownership problem rather than an agronomic one.',
      },
    ],
  },

  potential: {
    label: 'The Potential',
    heading: 'Designing the System Changes the Value Equation',
    lead: 'Agroforestry intentionally combines trees or woody perennials with crops, livestock, or both. The result is not simply a conservation feature added to a farm. It is a redesigned production system with different biological cycles, capital needs, operating requirements, products, risks, and routes to market. Trees may take years to establish and begin producing commercial returns. Crops or livestock may continue generating income during that transition. The system may also create shade, shelter, water, habitat, soil, carbon, resilience, or other environmental benefits whose value depends on how they are measured, owned, financed, and used.',
    transition: 'Done well, that connection changes the whole value equation.',
    pillars: [
      {
        tag: 'Resilient',
        title: 'A farm that holds up under stress',
        text: 'Shelter, shade and deeper rooting reduce exposure to wind, heat and drought, and diversified biology spreads the risk.',
        bullets: [
          'Shade and shelter for livestock or crops',
          'Reduced wind exposure and erosion',
          'Improved water infiltration, moisture retention, or microclimate',
          'Diversified biological and income risk',
          'Greater capacity to manage heat, drought, storms, or other production stress',
        ],
      },
      {
        tag: 'Sustainable',
        title: 'Outcomes the land keeps',
        text: 'Woody cover changes soil, water and habitat function in ways an annual rotation cannot, and stores carbon in biomass as well as soil.',
        bullets: [
          'Deeper and more diverse root systems',
          'Improved nutrient cycling and soil cover',
          'Reduced runoff or erosion in appropriate locations',
          'Increased structural and habitat diversity',
          'Potential carbon storage in biomass and soils',
          'Improved riparian, pollinator, or wildlife functions',
        ],
      },
      {
        tag: 'Prosperous',
        title: 'More than one thing to sell',
        text: 'Multiple products on the same acre, on different cycles, plus the sourcing and environmental value the system supports.',
        bullets: [
          'New tree, crop, livestock, biomass, ingredient, or specialty-product revenue',
          'Multiple harvest cycles and product streams',
          'Improved use of land, light, water, and vertical space',
          'Greater flexibility when one crop or market underperforms',
          'Potential long-duration asset value from established trees',
          'Access to certification, customer programs, incentives, or environmental markets',
        ],
      },
    ],
    kicker: 'The asset being created is biological and it takes years. That is what makes the commercial design matter more here than anywhere else.',
  },

  correcting: {
    label: 'Course Correcting',
    heading: 'What Leaving the Trees Out Actually Costs',
    lead: 'Removing woody cover from working land was rational field by field and expensive in aggregate. Six indicators show where that value went, and where a planting design either recovers it or does not.',
    indicators: attachDefinitions([
      {
        key: 'climate',
        name: 'Climate',
        // Inline rather than the shared production definition: on this topic the
        // carbon is in standing biomass as much as in soil.
        definition:
          'Greenhouse gases released and removed across the production system, held in standing biomass as well as in soil. Trees are the one change on working land that accumulates carbon in a stock you can see, and the one where permanence and reversal have to be answered.',
        issues: [
          'Tree biomass counted without a defined land-use baseline',
          'Soil disturbance during establishment releasing stored carbon',
          'Permanence and reversal risk over a multi-decade horizon',
          'Tree, soil and livestock outcomes assumed to be additive',
        ],
      },
      {
        key: 'soil',
        name: 'Soil',
        issues: [
          'Compaction and disturbance during planting',
          'Erosion on newly established rows before cover closes',
          'Nutrient competition between trees and the cash crop',
          'Organic matter gains assumed rather than measured',
        ],
      },
      {
        key: 'water',
        name: 'Water',
        issues: [
          'Runoff and sediment where riparian buffers are absent',
          'Competition for soil moisture in dry years',
          'Riparian function lost to cultivation up to the bank',
          'Drainage and irrigation designed around annual crops only',
        ],
      },
      {
        key: 'biodiversity',
        name: 'Biodiversity',
        definition:
          'The extent, structure and connectivity of habitat on working land, and the species it supports. Woody cover is what gives a farmed landscape vertical structure, and structure is most of what habitat value depends on.',
        issues: [
          'Field boundaries simplified and connectivity lost',
          'Single-species plantings with little structural diversity',
          'Pollinator and beneficial-insect habitat removed',
          'Remaining woody cover cleared for equipment access',
        ],
      },
      {
        key: 'resilience',
        name: 'Resilience',
        definition:
          'The capacity of the operation to absorb a shock and keep producing through it. On a farm with trees this is bought years in advance, which is what makes it easy to defer and expensive to retrofit.',
        issues: [
          'Wind, heat and drought exposure with no shelter',
          'Establishment failure and mortality with no replanting provision',
          'Single-product exposure when one market underperforms',
          'Long payback with no interim revenue for the producer',
        ],
      },
      {
        key: 'productivity',
        name: 'Production',
        definition:
          'What the land yields across every product it carries, not just the headline crop. An agroforestry system is only working when the combined output justifies the land, labour and capital it uses.',
        issues: [
          'Light, water and nutrient competition left unmanaged',
          'Equipment layout fighting the planting design',
          'Harvest timing and labour peaks colliding',
          'Yield drag accepted as permanent rather than designed out',
        ],
      },
    ]),
  },

  investments: {
    label: 'Priority Investments',
    heading: 'Investments That Make the System Work',
    // Frame labels are per-record (handover 3.3). Producers / practices / plots
    // does not fit a system that is designed once and lived with for decades.
    lead: 'Every investment lands in one of three places: the producer who commits the land, the system that gets designed and planted, or the land itself. Filter by the indicator you are trying to move.',
    frame: [
      { title: 'Producers', text: 'Capital, technical support, risk sharing and the interim revenue that makes a decades-long commitment possible.' },
      { title: 'Systems', text: 'What actually gets planted and how: species, density, layout, rotation with the existing crop or herd, and maintenance.' },
      { title: 'Land', text: 'The place itself: tenure and succession, water, marginal ground, field boundaries and the rights to future products.' },
    ],
    interventions: [
      {
        id: 'alley',
        group: 'Tree + crop',
        name: 'Alley Cropping',
        impacts: ['climate', 'soil', 'biodiversity', 'resilience'],
        mechanism: 'Plant rows of trees or shrubs within crop fields so woody production and annual or perennial crops share the same land base.',
        value: 'Diversified revenue, wind protection, soil protection and long-term woody value',
        barrier: 'Establishment cost, machinery layout, time to revenue and market access',
        evidence: 'Carbon and biodiversity outcomes depend on species, density, baseline land use and how biomass and soil are quantified.',
        commercial: 'Product claim · Scope 3 · carbon / nature credit',
      },
      {
        id: 'silvo',
        group: 'Tree + livestock',
        name: 'Silvopasture',
        impacts: ['climate', 'resilience', 'biodiversity', 'productivity'],
        mechanism: 'Integrate trees, forage and livestock in a managed system designed for animal, forage and woody-product performance.',
        value: 'Animal comfort, forage resilience, diversified revenue and potential timber or tree-crop value',
        barrier: 'Fencing, establishment, tree protection, grazing management and long payback',
        evidence: 'Tree biomass can be material, but livestock, soil and tree outcomes should not be assumed additive without a defined method.',
        commercial: 'Differentiated livestock product · Scope 3 · carbon / nature credit',
      },
      {
        id: 'wind',
        group: 'Protection',
        name: 'Windbreaks & Shelterbelts',
        impacts: ['resilience', 'soil', 'biodiversity', 'climate'],
        mechanism: 'Establish woody barriers around fields, farmsteads or livestock areas to manage wind, erosion and microclimate.',
        value: 'Erosion protection, crop and animal shelter, reduced wind stress and habitat',
        barrier: 'Land footprint, establishment, maintenance and delayed benefit',
        evidence: 'Commercial value may come from resilience and habitat even when carbon volume is modest.',
        commercial: 'Sourcing program · Scope 3 · nature / carbon outcome',
      },
      {
        id: 'riparian',
        group: 'Water + habitat',
        name: 'Riparian Forest Buffers',
        impacts: ['water', 'biodiversity', 'climate', 'resilience'],
        mechanism: 'Restore or establish woody vegetation along waterways to manage nutrients, sediment, shade and habitat connectivity.',
        value: 'Water-quality protection, bank stability, habitat and potential avoided-risk value',
        barrier: 'Land opportunity cost, maintenance, fencing and coordination across parcels',
        evidence: 'Water and biodiversity outcomes may be more decision-useful than a carbon-only metric.',
        commercial: 'Water / nature program · sourcing claim · Scope 3 · carbon',
      },
      {
        id: 'forestfarm',
        group: 'Understory products',
        name: 'Forest Farming',
        impacts: ['biodiversity', 'resilience', 'productivity'],
        mechanism: 'Produce food, medicinal, specialty or other crops under an existing or developing forest canopy.',
        value: 'High-value niche products, diversified income and retained canopy',
        barrier: 'Market development, specialized production knowledge and harvest timing',
        evidence: 'Environmental claims depend on baseline forest condition, management and product traceability.',
        commercial: 'Premium product · sourcing claim · nature value',
      },
      {
        id: 'hedge',
        group: 'Landscape',
        name: 'Hedgerows & Living Fences',
        impacts: ['biodiversity', 'resilience', 'soil'],
        mechanism: 'Use woody field boundaries or living fences to provide habitat, shelter, erosion control and landscape connectivity.',
        value: 'Fencing function, habitat, beneficial-insect support and wind protection',
        barrier: 'Establishment, maintenance, land use and uncertain direct revenue',
        evidence: 'Often strongest as part of a sourcing, biodiversity or landscape program rather than a stand-alone carbon project.',
        commercial: 'Nature · sourcing · product program',
      },
      {
        id: 'treecrop',
        group: 'Perennial production',
        name: 'Tree Crops & Multi-Strata Systems',
        impacts: ['climate', 'resilience', 'productivity', 'biodiversity'],
        mechanism: 'Develop perennial food or commodity systems with multiple canopy layers or integrated tree-crop production.',
        value: 'Perennial revenue, diversified production, soil cover and long-term asset value',
        barrier: 'High establishment cost, delayed cash flow, labor and market access',
        evidence: 'Product and carbon claims require careful baselines because new perennial production changes both land cover and commodity output.',
        commercial: 'Premium product · Scope 3 · carbon · certification',
      },
      {
        id: 'restore',
        group: 'Landscape transition',
        name: 'Tree Establishment on Marginal or Degraded Areas',
        impacts: ['climate', 'biodiversity', 'water', 'resilience'],
        mechanism: 'Establish woody cover on portions of working lands where tree cover can complement rather than displace the highest-value agricultural use.',
        value: 'Land stabilization, habitat, carbon and possible future woody revenue',
        barrier: 'Land-use tradeoff, permanence, establishment failure and long horizon',
        evidence: 'Additionality, land-use baseline and permanence become especially important if transferable credits are created.',
        commercial: 'Carbon / nature credit · Scope 3 · landscape program',
      },
    ],
  },

  adoption: {
    label: 'Accelerating Adoption',
    heading: 'Why a Good Land Design Still Needs a Program',
    lead: 'Because the costs arrive years before the returns, and the person carrying that gap is rarely the one who captures the value. Agroforestry combines short production cycles with long-lived biological assets, which makes it a financing and rights problem before it is an agronomic one. Adoption slows when a producer is asked to commit land for decades against a benefit that accrues to a buyer, a landowner or a successor.',
    constraintEyebrow: 'Fund the scaling constraint',
    constraintHeading: 'Build a proposition that survives the establishment years.',
    constraintLead: 'The right mechanism depends on what is actually preventing adoption. Each constraint below names what blocks the decision and how a program relieves it.',
    constraints: [
      {
        n: '01',
        title: 'Fund the establishment gap',
        text: 'Site preparation, stock, planting, protection and infrastructure all land in the first seasons, while the trees produce nothing. The program pays for the years between the cost and the return rather than assuming the producer can carry them.',
      },
      {
        n: '02',
        title: 'Protect the interim income',
        text: 'The crop or herd has to keep earning while the woody system establishes. Design the layout, rotation and stocking so existing revenue is preserved, and price the yield effect honestly rather than treating it as noise.',
      },
      {
        n: '03',
        title: 'Settle the rights before planting',
        text: 'Tenure, leases, succession, harvesting rights and ownership of environmental attributes all outlast the people who agree them. Anything unresolved at planting becomes unresolvable once the trees are in the ground.',
      },
      {
        n: '04',
        title: 'Build the route to market before the harvest',
        text: 'A new tree crop with no processing, aggregation or logistics behind it is a cost with a long tail. Establish the buyer, the specification and the path to them while the system is still being designed.',
      },
      {
        n: '05',
        title: 'Resource the full horizon',
        text: 'Mortality, replanting, pruning, maintenance, monitoring and verification recur for as long as the trees stand. Fund the recurring management, or the asset quietly degrades and the claim degrades with it.',
      },
    ],
  },

  fit: { label: 'Validating Market Fit', heading: 'Where Does an Opportunity Sit?' },

  verifying: {
    label: 'Verifying What Matters Most',
    heading: 'Measure Twice Credit Once',
    lead: 'Evidence costs money, so the useful question is how much this particular claim requires. Five layers build on each other, and the claim decides how far up you need to go.',
    layers: [
      { n: '01', name: 'Practice', question: 'What changed?', examples: 'Species, density, planting design, establishment, maintenance' },
      { n: '02', name: 'Outcome', question: 'What happened?', examples: 'Biomass, soil carbon, water quality, habitat, yield across the system' },
      { n: '03', name: 'Traceability', question: 'What is it connected to?', examples: 'Parcel, planting block, farm, processor, product' },
      { n: '04', name: 'Rights & Accounting', question: 'Who can use it?', examples: 'Tenure, harvesting rights, ownership, transfer, retirement' },
      { n: '05', name: 'Market Integrity', question: 'How can it be used?', examples: 'Permanence, reversals, leakage, uncertainty, double counting, claim language' },
    ],
  },

  pathways: {
    label: 'Market Pathways',
    heading: 'How the Performance Gets Paid For',
    lead: 'The same planting can reach a market four different ways. The route chosen changes what has to be measured, traced and transferred, which is why it belongs in the land design rather than at the end.',
    // Credits lead on this topic, unlike Regen Ag: trees are the production
    // change whose removals are durable enough to issue as a transferable unit.
    items: [
      {
        id: 'm01',
        n: '01',
        name: 'Carbon & Ecosystem Credits',
        carrier: 'As a quantified environmental asset',
        tagline: 'Turn verified environmental outcomes into market-ready assets.',
        whenToUse: 'Use when the planting genuinely changes land cover against a defensible baseline, and the buyer wants a durable removal rather than supply.',
        detail: 'Trees are the production change most readily issued as a credit, because the carbon accumulates in a stock that can be measured directly. That also makes the baseline and the permanence commitment the whole argument: a removal claimed over decades has to survive mortality, harvest and a change of landowner.',
        examples: [
          'Verra VM0047, Afforestation, Reforestation and Revegetation',
          'Verra VM0042, Improved Agricultural Land Management',
          'Gold Standard afforestation and reforestation requirements',
          'Plan Vivo, for smallholder and community systems',
          'Biodiversity and nature credit frameworks still forming',
        ],
      },
      {
        id: 'm03',
        n: '02',
        name: 'Product & Commodity Claims',
        carrier: 'As an attribute of the physical product',
        tagline: 'Make environmental performance part of what is bought and sold.',
        whenToUse: 'Use when the system produces a differentiated tree crop and the buyer already pays for verified origin, as in coffee, cocoa and specialty ingredients.',
        detail: 'For tree crops this is usually the nearest-term route, because the certification and traceability infrastructure already exists and buyers already ask. Deforestation-free requirements have made plot-level origin data a condition of market access rather than a premium.',
        examples: [
          'EU Deforestation Regulation, applying from 30 December 2026',
          'Rainforest Alliance certification and its EUDR alignment',
          'Organic and Regenerative Organic Certified for perennial systems',
          'Fairtrade and origin-verified specialty programs',
          'Product carbon footprints and responsible sourcing claims',
        ],
      },
      {
        id: 'm02',
        n: '03',
        name: 'Scope 3 & Insets',
        carrier: 'As an outcome connected to the value chain',
        tagline: 'Create and account for environmental value inside the value chain.',
        whenToUse: 'Use when a buyer sources the crop the trees sit alongside and needs the removal inside its own land-sector inventory.',
        detail: 'Land-sector accounting now has a removals pathway, which is what makes a planting inside a supply shed countable rather than merely good. The work is allocation: deciding whose inventory a multi-decade removal enters, and in which year.',
        examples: [
          'GHG Protocol Land Sector and Removals Guidance',
          'SBTi FLAG target accounting',
          'Value Change Initiative intervention guidance',
          'Supplier intervention and supply-shed programs',
        ],
      },
      {
        id: 'm04',
        n: '04',
        name: 'Environmental Attribute Certificates',
        carrier: 'As a certificate conveying the attribute',
        tagline: 'Convey environmental value when physical supply alone cannot.',
        whenToUse: 'Use when the tree crop cannot be segregated to the buyer but the environmental attribute still needs to transfer.',
        detail: 'Least developed of the four for agroforestry, and the one where the architecture matters most. A removal that lasts decades and a certificate that transfers in a season have to be reconciled explicitly, or the same tree is claimed more than once.',
        examples: [
          'Book-and-claim structures for tree-crop commodities',
          'Agricultural environmental attribute registries',
          'Low-carbon commodity and material certificates',
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
    // Awaiting the owner's tool assignment — see data/expertise/tools.ts. While
    // this is empty the template omits section 10 and drops it from the rail,
    // rather than showing a thin or borrowed list.
    tools: [],
  },
};
