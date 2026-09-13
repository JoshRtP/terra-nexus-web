// Regenerative Agriculture — expertise topic record.
//
// PROVENANCE
//  * hero title/lead, heroImage and the pillar bullets (from the page's
//    approved `keyBenefits`) are lifted from the previous
//    pages/expertise/regenerative-agriculture/index.astro — approved copy, do
//    not reword.
//  * `potential.lead` is the approved "does not scale through agronomy alone"
//    paragraph. It belongs at the top of section 02, not the end of 01
//    (handover section 4).
//  * intervention `evidence` fields are verbatim from the ChatGPT extraction
//    pass and are deliberately hedged. They are the most technically
//    consequential copy on the page.
//  * pathway names, carriers and taglines follow src/data/market-mechanisms.ts.
//
// NEEDS OWNER REVIEW BEFORE PUBLISH
//  * `overview.stats` — four figures, uncited on the page (accepted as-is for
//    now, handover section 8, P2 08).
//  * `pathways[].examples` — named protocols and programs; confirm each is
//    current.
//  * `positioning` — authored for the new influence/incentive/mechanism band.
import type { ExpertiseTopic } from './types';
import { attachDefinitions, topicHeroImage } from './shared';

export const regenerativeAgriculture: ExpertiseTopic = {
  slug: 'regenerative-agriculture',
  name: 'Regenerative Agriculture',
  eyebrow: 'Regenerative Agriculture',

  hero: 'Scale Regenerative Agriculture from Field to Market',
  heroLead:
    'Terra Nexus helps commodity traders and food-system companies design, diligence, launch, and manage regenerative agriculture programs that align producer economics, supply-chain operations, environmental outcomes, and credible claims.',
  heroImage: topicHeroImage('regenerative-agriculture', 1600),
  heroImageAlt: 'Aerial view of cropland under regenerative management',

  meta: {
    title: 'Regenerative Agriculture | Terra Nexus',
    description:
      'Terra Nexus designs and runs regenerative agriculture programs that connect producer economics to credible claims, field to market.',
    canonical: '/expertise/regenerative-agriculture/',
  },

  cta: {
    heading: 'Invest in the Changes That Improve the Whole Value Equation',
    text: 'Terra Nexus can help identify the highest-value opportunities, build the adoption model, verify what matters and connect better production to markets that can fund it.',
  },

  links: {
    whoWeWorkWith: { label: 'See who we work with', href: '/who-we-work-with/' },
    markets: { label: 'See how each market pathway works', href: '/#our-markets' },
    capabilities: { label: 'Our Approach & Capabilities', href: '/capabilities/' },
    digital: { label: 'See all of our Digital Solutions', href: '/digital-solutions/' },
    expertise: { label: 'All expertise areas', href: '/expertise/' },
    caseStudies: { label: 'Case studies', href: '/case-studies/' },
  },

  // AUTHORED for the new influence/incentive/mechanism band (handover 3.3) —
  // there is no upstream source for these three, they are new copy for new
  // structure. Needs owner review before publish.
  positioning: {
    influence: 'Indirect: the grower decides what runs in the field, and a program reaches them through the originator or processor that already buys from them.',
    incentive: 'Input efficiency and yield stability on the farm; carbon intensity, sourcing commitments and regulated fuel incentives downstream.',
    mechanism: 'Product and commodity claims lead, because low carbon intensity becomes price at the elevator and the refinery.',
  },

  overview: {
    label: 'Overview',
    heading: 'Agriculture Is the Largest Lever We Are Not Pulling Properly',
    lead: 'Row crop agriculture feeds most of the planet and underwrites a large share of the rural economy. It is also the only major emitting sector that can move in both directions: agriculture and land-use change account for roughly a quarter of global greenhouse gas emissions, and agricultural soil is one of the largest available carbon sinks on Earth.',
    stats: [
      { figure: '~24%', label: 'of global greenhouse gas emissions come from agriculture and land-use change' },
      { figure: '~50%', label: 'of potentially vegetated land has been converted to cropland, pasture and rangeland' },
      { figure: '0.9-1.9', label: 'gigatonnes of carbon per year that cropland soils could sequester with better management' },
      { figure: '~47%', label: 'of agriculture’s climate mitigation potential sits in soil carbon' },
    ],
    body: [
      {
        title: 'The system is not optimized for the outcomes it produces',
        text: 'Conventional intensification was built to maximize yield per acre at the lowest input cost. It was never designed to account for soil condition, water quality, habitat, producer livelihood or the market value of how a crop was grown. Those outcomes are real, and most of them are currently unpriced.',
      },
      {
        title: 'Four things are being underwritten at once',
        text: 'People: the livelihoods of the growers who carry the operational and weather risk. Places: the soil, water and habitat that determine whether an acre keeps producing. Planet: the emissions and removals the sector is accountable for. Profits: the margin that has to exist for any of it to continue.',
      },
      {
        title: 'Margin pressure and evidence pressure arrived together',
        text: 'Input, land and capital costs rose while commodity prices stayed volatile. At the same time food companies, refiners and traders began requiring production data the supply base was never set up to produce. That combination is what makes this actionable now rather than aspirational.',
      },
    ],
  },

  potential: {
    label: 'The Potential',
    heading: 'Changing the Field Changes the Value Equation',
    lead: 'Regenerative agriculture begins with how crops are produced, but it does not scale through agronomy alone. Farmers decide what can work in a particular field and production system. Originators and processors connect producers to physical markets. Food, beverage, feed, fiber, and energy companies create demand and determine what evidence they need. Technology providers collect and analyze data. Accounting, certification, environmental-market, and assurance frameworks determine what can be reported or claimed. A successful program must connect all of those decisions without losing sight of the farm business that makes implementation possible.',
    transition: 'Done well, that connection changes the whole value equation.',
    pillars: [
      {
        tag: 'Resilient',
        title: 'An operation that survives the bad years',
        text: 'Soil that holds water, diversified rotations and lower input dependence reduce exposure to weather and price shocks.',
        bullets: [
          'Better water infiltration and drought tolerance',
          'More stable yields across variable seasons',
          'Lower dependence on purchased inputs',
          'Diversified revenue across crops and markets',
        ],
      },
      {
        tag: 'Sustainable',
        title: 'Lower impact per unit of production',
        text: 'Emissions, soil loss, nutrient runoff and habitat pressure all respond to the same set of field decisions.',
        bullets: [
          'Higher soil organic matter and better soil structure',
          'Lower nutrient loss, runoff, and sedimentation',
          'Reduced emissions per unit of production',
          'More habitat and pollinator support at field edges',
        ],
      },
      {
        tag: 'Prosperous',
        title: 'Better economics for the people doing the work',
        text: 'Input efficiency, yield stability and new revenue from how the crop was grown, not only from how much of it there is.',
        bullets: [
          'Lower input and operating costs per unit produced',
          'New revenue from environmental performance and differentiated products',
          'Stronger supplier relationships and preferred-supplier positioning',
          'Improved land value and long-term farm viability',
        ],
      },
    ],
    kicker: 'Once field performance is measured it can be priced, and that reaches further than any single practice change.',
  },

  correcting: {
    label: 'Course Correcting',
    heading: 'What Continuing Down This Path Actually Costs',
    lead: 'Conventional intensification eroded more than the land. It eroded the value and the optionality the land once represented. Five indicators show where that value went.',
    indicators: attachDefinitions([
      {
        key: 'climate',
        name: 'Climate',
        issues: [
          'Nitrous oxide from synthetic nitrogen',
          'Nitrogen leaching and volatilization',
          'Fuel burned across tillage and application passes',
          'Soil carbon released by disturbance',
        ],
      },
      {
        key: 'soil',
        name: 'Soil',
        issues: [
          'Organic matter decline',
          'Compaction and loss of structure',
          'Erosion from bare ground',
          'Reduced biological activity',
        ],
      },
      {
        key: 'water',
        name: 'Water',
        issues: [
          'Runoff and sedimentation',
          'Nutrient leaching below the root zone',
          'Poor infiltration after heavy rain',
          'Irrigation applied inefficiently',
        ],
      },
      {
        key: 'biodiversity',
        name: 'Land & biodiversity',
        issues: [
          'Simplified rotations',
          'Pollinator and beneficial-insect habitat lost',
          'Field margins and buffers removed',
          'Pressure to bring marginal ground into production',
        ],
      },
      {
        key: 'resilience',
        name: 'Resilience & productivity',
        issues: [
          'Low water-holding capacity going into a dry spell',
          'Narrow rotations concentrating pest and disease risk',
          'High dependence on purchased inputs',
          'Yield plateaus while input intensity per bushel rises',
          'Widening variability between fields and seasons',
        ],
      },
    ]),
  },

  investments: {
    label: 'Priority Investments',
    heading: 'Investments That Reverse the Cycle',
    lead: 'Every investment lands in one of three places: the producer who makes the decision, the practice they run, or the plot itself. Filter by the indicator you are trying to move.',
    frame: [
      { title: 'Producers', text: 'Capital, agronomic support, risk sharing and the records that let a grower participate at all.' },
      { title: 'Practices', text: 'What changes in the field: nutrient decisions, tillage, cover, rotation, timing and placement.' },
      { title: 'Plots', text: 'The land itself: infrastructure, water management, amendments and edge-of-field habitat.' },
    ],
    interventions: [
      {
        id: 'nutrient',
        group: 'Nutrients',
        name: 'Nutrient Management',
        impacts: ['climate', 'water', 'resilience'],
        mechanism: 'Improve rate, timing, source and placement of nitrogen and other nutrients using field-level agronomy and decision support.',
        value: 'Input efficiency, yield protection and lower nutrient loss',
        barrier: 'Data, agronomy, weather timing and perceived yield risk',
        evidence: 'Potential outcomes include direct and indirect N2O reductions, lower upstream fertilizer emissions and improved nutrient-use efficiency.',
        commercial: 'Scope 3 · low-CI product · supplier program',
      },
      {
        id: 'tillage',
        group: 'Soil management',
        name: 'Tillage & Residue Management',
        impacts: ['soil', 'climate', 'resilience'],
        mechanism: 'Reduce soil disturbance and manage residue to fit crop, soil and equipment constraints.',
        value: 'Fuel, labor, erosion control and soil structure benefits',
        barrier: 'Equipment, weed control, residue handling and yield risk',
        evidence: 'Carbon outcomes depend on soil depth, baseline, climate and methodology. Practice adoption alone does not prove a removal.',
        commercial: 'Practice claim · Scope 3 · carbon credit',
      },
      {
        id: 'cover',
        group: 'Soil management',
        name: 'Cover Crops & Living Roots',
        impacts: ['soil', 'water', 'climate', 'resilience'],
        mechanism: 'Add living cover between cash crops to protect soil, manage nutrients and diversify rotations.',
        value: 'Erosion control, nutrient capture, soil function and potential resilience',
        barrier: 'Seed, establishment, termination, moisture and management',
        evidence: 'GHG and yield outcomes vary by species, geography, timing and baseline.',
        commercial: 'Supplier program · certified product · Scope 3 · credit',
      },
      {
        id: 'rotation',
        group: 'Cropping system',
        name: 'Crop Rotation & Diversification',
        impacts: ['soil', 'resilience', 'biodiversity'],
        mechanism: 'Add crops or change rotation structure to improve agronomic resilience, pest management and soil function.',
        value: 'Risk diversification, soil function and pest management',
        barrier: 'Market access, equipment, agronomy and rotation economics',
        evidence: 'Environmental outcomes depend on the crops added and the displaced baseline.',
        commercial: 'Certified product · sourcing · Scope 3',
      },
      {
        id: 'water',
        group: 'Water',
        name: 'Water & Irrigation Management',
        impacts: ['water', 'climate', 'resilience'],
        mechanism: 'Improve irrigation efficiency, scheduling, pumping and field water management.',
        value: 'Water efficiency, energy savings and yield protection',
        barrier: 'Infrastructure cost, water rights and technology',
        evidence: 'The strongest business case may be water and energy rather than soil carbon.',
        commercial: 'Product claim · Scope 3 · water / resilience program',
      },
      {
        id: 'amendments',
        group: 'Soil management',
        name: 'Soil Amendments & Organic Inputs',
        impacts: ['soil', 'climate', 'resilience'],
        mechanism: 'Use manure, compost, biochar or other amendments where agronomically and economically appropriate.',
        value: 'Nutrient value, soil function and potentially water-holding capacity',
        barrier: 'Transport, application, nutrient accounting and cost',
        evidence: 'Outcome depends on amendment type, source, baseline and lifecycle boundary.',
        commercial: 'Product · Scope 3 · credit',
      },
      {
        id: 'precision',
        group: 'Data & agronomy',
        name: 'Precision Agronomy & Field Optimization',
        impacts: ['climate', 'water', 'resilience'],
        mechanism: 'Use field-level data, sensing and variable-rate decisions to target inputs and management more precisely.',
        value: 'Input efficiency, yield protection and better management information',
        barrier: 'Technology cost, interoperability, data quality and agronomic trust',
        evidence: 'Quantified outcomes require a clear baseline and documented management change.',
        commercial: 'Supplier program · low-CI product · Scope 3',
      },
      {
        id: 'edge',
        group: 'Landscape',
        name: 'Edge-of-Field, Habitat & Land Management',
        impacts: ['water', 'biodiversity', 'resilience'],
        mechanism: 'Use buffers, wetlands, drainage practices, habitat or other field-edge measures to manage water, nutrient and biodiversity outcomes.',
        value: 'Risk reduction, water management and habitat value',
        barrier: 'Land opportunity cost, maintenance and coordination',
        evidence: 'Often creates value outside a carbon-only frame.',
        commercial: 'Nature · sourcing · watershed program',
      },
    ],
  },

  adoption: {
    label: 'Accelerating Adoption',
    heading: 'Why Good Agronomy Still Needs a Program',
    lead: 'Because better production does not automatically produce a better investment proposition for the person being asked to change. The program has to fund the constraint at a level that makes adoption rational while preserving enough value for buyers and the rest of the chain. The intervention may benefit the farm, the environment, the buyer and the broader system on different timelines. Adoption slows when one participant carries the cost and risk while another captures the value.',
    constraintEyebrow: 'Fund the scaling constraint',
    constraintHeading: 'Build a proposition that lets everyone win.',
    constraintLead: 'The right mechanism depends on what is actually preventing adoption. Each constraint below names what blocks the decision and how a program relieves it.',
    constraints: [
      {
        n: '01',
        title: 'Derisk the transition cost',
        text: 'Seed, equipment, agronomy and new operating practices require cash before the benefit is certain. The program pays for the actual capital or working-capital constraint that is blocking adoption.',
      },
      {
        n: '02',
        title: 'Share the performance risk',
        text: 'The farmer carries the downside if a new practice affects establishment, weeds, moisture or timing. Guarantees, multi-year support, technical assistance or contract terms move part of that risk off the farm.',
      },
      {
        n: '03',
        title: 'Right size the management and implementation burden',
        text: 'Programs often ask producers to collect more evidence than the available payment justifies. Collect only what the intended buyer use requires, and make the data workflow part of the program rather than homework.',
      },
      {
        n: '04',
        title: 'Move value across the chain',
        text: 'Food companies may receive the Scope 3, sourcing or product value while the producer bears most of the change cost. Scope 3 budgets, product premiums, procurement commitments and environmental markets can close that gap.',
      },
      {
        n: '05',
        title: 'Reward continuous performance',
        text: 'One-time practice payments do not change long-run economics. Shift toward durable value where verified outcomes and real buyer demand can support it.',
      },
    ],
  },

  fit: { label: 'Validating Market Fit', heading: 'Where Does an Opportunity Sit?' },

  verifying: {
    label: 'Verifying What Matters Most',
    heading: 'Measure Twice Credit Once',
    lead: 'Evidence costs money, so the useful question is how much this particular claim requires. Five layers build on each other, and the claim decides how far up you need to go.',
    layers: [
      { n: '01', name: 'Practice', question: 'What changed?', examples: 'Nutrient plan, tillage, cover, rotation, timing, placement' },
      { n: '02', name: 'Outcome', question: 'What happened?', examples: 'Emissions, soil carbon, water quality, yield, input intensity' },
      { n: '03', name: 'Traceability', question: 'What is it connected to?', examples: 'Field, farm, load, elevator, processor, product' },
      { n: '04', name: 'Rights & Accounting', question: 'Who can use it?', examples: 'Ownership, allocation, transfer, retirement, inventory use' },
      { n: '05', name: 'Market Integrity', question: 'How can it be used?', examples: 'Permanence, reversals, leakage, uncertainty, double counting, claim language' },
    ],
  },

  pathways: {
    label: 'Market Pathways',
    heading: 'How the Performance Gets Paid For',
    lead: 'The same field outcome can reach a market four different ways. The route chosen changes what has to be measured, traced and transferred, which is why it belongs in program design rather than at the end.',
    items: [
      {
        id: 'm01',
        n: '01',
        name: 'Carbon & Ecosystem Credits',
        carrier: 'As a quantified environmental asset',
        tagline: 'Turn verified environmental outcomes into market-ready assets.',
        whenToUse: 'Use when acreage can be aggregated, a methodology fits the practice and geography, and the buyer wants a transferable unit rather than supply.',
        detail: 'Once a quantified outcome has been issued as a credit it can be owned, transferred, priced, retired and reported under defined market rules. For cropland the binding constraint is usually measurement and permanence: whether those requirements can be met at a cost the outcome supports, rather than whether anyone wants to buy.',
        examples: [
          'Verra VM0042, Improved Agricultural Land Management',
          'Climate Action Reserve Soil Enrichment Protocol',
          'Gold Standard Soil Organic Carbon Activity Module',
          'Nutrient management and nitrous oxide methodologies',
        ],
      },
      {
        id: 'm02',
        n: '02',
        name: 'Scope 3 & Insets',
        carrier: 'As an outcome connected to the value chain',
        tagline: 'Create and account for environmental value inside the value chain.',
        whenToUse: 'Use when the buyer sources from the same supply shed and needs the reduction inside its own inventory rather than as an offset.',
        detail: 'A reduction at the farm can count toward a corporate target if it stays attached to the chain that produced it. Generating the outcome is the straightforward half. Settling who may claim it, how it is allocated and how it enters the inventory is the work.',
        examples: [
          'GHG Protocol Land Sector and Removals Guidance',
          'SBTi FLAG target accounting',
          'Value Change Initiative intervention guidance',
          'Supplier intervention and supply-shed programs',
        ],
      },
      {
        id: 'm03',
        n: '03',
        name: 'Product & Commodity Claims',
        carrier: 'As an attribute of the physical product',
        tagline: 'Make environmental performance part of what is bought and sold.',
        whenToUse: 'Use when the performance can travel with the physical load and a specific customer pays a premium, or a regulated incentive applies.',
        detail: 'The useful claim is narrow: which characteristic can be demonstrated, how it was quantified, how it is tied to this product, and what the producer or buyer may say about it. For grain and oilseed this is where carbon intensity becomes price.',
        examples: [
          'Low-CI grain for 45Z and clean fuel programs, via GREET and CA-GREET',
          'Certified regenerative programs such as Regenified',
          'Leading Harvest Farmland Management Standard',
          'SAI Platform Farm Sustainability Assessment',
          'Product carbon footprints and responsible sourcing claims',
        ],
      },
      {
        id: 'm04',
        n: '04',
        name: 'Environmental Attribute Certificates',
        carrier: 'As a certificate conveying the attribute',
        tagline: 'Convey environmental value when physical supply alone cannot.',
        whenToUse: 'Use when segregation is impractical across a large supply base but the buyer still needs to procure differentiated production.',
        detail: 'An EAC carries a verified characteristic of how a commodity was produced, and in some markets transfers separately from the physical product. Separating the attribute from the molecule puts all the weight on the architecture: ownership, issuance, custody, transfer, retirement, exclusivity and claim language all have to agree.',
        examples: [
          'Low-carbon commodity and material certificates',
          'Agricultural environmental attribute registries',
          'Book-and-claim programs for feedstock and fuel',
          'Sustainable aviation fuel certificates',
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
    tools: [
      {
        id: 'soil-carbon-prediction',
        text:
          'Digital soil mapping and biogeochemical modeling that forecasts soil organic carbon trajectories and quantifies the carbon benefit of a practice change before it is implemented.',
      },
      {
        id: 'biofuels-origination',
        text:
          'Low-carbon-intensity feedstock evaluation that maps supply against processing capacity, so sourcing decisions start from where the qualifying material actually is.',
      },
      {
        id: 'crop-carbon-intensity',
        text:
          'Field-level greenhouse gas breakdowns and volume-weighted carbon intensity, benchmarked against GREET defaults.',
      },
      {
        id: 'dmrv-audit-verification',
        text:
          'Independent remote-sensing verification of practices and soil health indicators, with an audit-ready export a third-party reviewer can act on directly.',
      },
      {
        id: 'asset-pricing-optimization',
        text:
          'Optimizes bid allocation and development economics across a program, and surfaces the value left on the table when eligible supply goes undeveloped.',
      },
    ],
  },
};
