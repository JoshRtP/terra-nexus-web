// Regenerative Rangeland — expertise topic record.
//
// Built first, deliberately: rangeland is a development cycle behind
// Regenerative Agriculture, so it is the honest test of whether the ten-section
// structure carries a topic that is not already built out (Josh, 2026-09-12).
//
// PROVENANCE
//  * hero title/lead, heroImage and the pillar bullets (from the page's
//    approved `keyBenefits`) are lifted from the previous
//    pages/expertise/regenerative-rangeland/index.astro — approved copy, do not
//    reword.
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
import { attachDefinitions } from './shared';

export const regenerativeRangeland: ExpertiseTopic = {
  slug: 'regenerative-rangeland',
  name: 'Regenerative Rangeland',
  eyebrow: 'Regenerative Rangeland',

  hero: 'Create More Value from Resilient Grazing Systems',
  heroLead:
    'Terra Nexus helps livestock producers, protein companies, traders, and buyers design and manage regenerative rangeland programs that connect grazing management, producer economics, livestock performance, environmental outcomes, supply-chain value, and credible claims.',
  heroImage: 'https://images.pexels.com/photos/29474130/pexels-photo-29474130.jpeg?auto=compress&cs=tinysrgb&w=1600',
  heroImageAlt: 'Cattle grazing managed rangeland at sunset',

  meta: {
    title: 'Regenerative Rangeland | Terra Nexus',
    description:
      'Terra Nexus helps producers, protein companies and buyers design and manage rangeland programs connecting grazing management to supply-chain value and credible claims.',
    canonical: '/expertise/regenerative-rangeland/',
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
    influence: 'Direct control of the land and the herd, exercised ranch by ranch across many independent operations.',
    incentive: 'Ranch productivity and drought resilience first; buyer programs, premiums and environmental payments after.',
    mechanism: 'Scope 3 and insets lead, because beef and dairy buyers source from the same regions and need the reduction inside their own inventory.',
  },

  overview: {
    label: 'Overview',
    heading: 'Grazing Land Is the Largest Working Landscape on Earth',
    lead: 'Grazing lands cover more of the planet than any other agricultural use, and most of them sit where nothing else can be produced. They are also where the climate ledger runs in both directions at once: enteric methane is one of agriculture’s largest single emission sources, while grassland soil holds one of the largest terrestrial carbon stocks we can still manage.',
    stats: [
      { figure: '~24%', label: 'of global greenhouse gas emissions come from agriculture and land-use change' },
      { figure: '~50%', label: 'of potentially vegetated land has been converted to cropland, pasture and rangeland' },
      { figure: '>25%', label: 'of agricultural sector emissions come from enteric fermentation alone' },
      { figure: '~47%', label: 'of agriculture’s climate mitigation potential sits in soil carbon' },
    ],
    body: [
      {
        title: 'The system is not optimized for the outcomes it produces',
        text: 'Grazing operations are paid for pounds and grade. They are not paid for ground cover, water function, habitat, herd resilience or the methane intensity of what they produce. Those outcomes decide whether the land keeps working, and almost none of them currently carry a price.',
      },
      {
        title: 'Four things are being underwritten at once',
        text: 'People: the ranch families who carry the drought and market risk. Places: the range, water and habitat that determine carrying capacity for the next generation. Planet: the methane and soil carbon the sector is accountable for. Profits: the margin that has to exist for the land to stay in grazing at all.',
      },
      {
        title: 'The pressure is arriving from every direction',
        text: 'Drought resets the economics and each cycle removes operations permanently. Appreciating land values and succession pressure push toward sale or conversion. Beef and dairy buyers now need a footprint story from operations that never had to report one.',
      },
    ],
  },

  potential: {
    label: 'The Potential',
    heading: 'Changing the Ranch Changes the Value Equation',
    lead: 'Regenerative rangeland begins with grazing and herd management, but it does not scale through good stewardship alone. Ranchers decide what is possible on a particular landscape. Feeders, processors, and packers connect the animal to physical markets. Beef, dairy, and retail companies create demand and set the evidence they need. Technology providers collect and analyze data. Accounting, certification, environmental-market, and assurance frameworks determine what can be reported or claimed. A successful program must connect all of those decisions without losing sight of the ranch business that makes implementation possible.',
    transition: 'Done well, that connection changes the whole value equation.',
    pillars: [
      {
        tag: 'Resilient',
        title: 'An operation that can absorb a dry year',
        text: 'Deeper forage reserves, better water distribution and stocking flexibility reduce forced destocking.',
        bullets: [
          'More diverse and functional plant communities',
          'Stronger riparian and watershed function',
          'Reduced vulnerability to selected drought, flood, erosion, and wildfire risks',
          'Improved capacity of working lands to recover from disturbance',
          'More stable feed resources through variable conditions',
        ],
      },
      {
        tag: 'Sustainable',
        title: 'Lower impact per pound produced',
        text: 'Methane intensity, soil carbon, water function and habitat all respond to grazing and herd decisions.',
        bullets: [
          'Improved soil cover and reduced erosion risk',
          'Stronger root systems and soil structure',
          'Improved infiltration and water retention',
          'Better nutrient cycling and manure distribution',
          'Maintenance or improvement of soil organic matter and soil carbon where supported by conditions and evidence',
        ],
      },
      {
        tag: 'Prosperous',
        title: 'Better economics for the people on the land',
        text: 'Forage use, animal performance and drought flexibility improve before any environmental payment is counted.',
        bullets: [
          'Greater forage utilization and recovery',
          'Better alignment of stocking and forage availability',
          'Potential improvements in livestock vigor, performance, or reduced purchased-feed dependence',
          'Potential customer programs, product differentiation, incentives, or environmental markets',
          'Stronger supply relationships and long-term access to livestock production',
        ],
      },
    ],
    kicker: 'Keeping working land in production is the outcome underneath all three. Conversion is the loss that cannot be reversed.',
  },

  correcting: {
    label: 'Course Correcting',
    heading: 'What Continuing Down This Path Actually Costs',
    lead: 'Decades of pressure eroded more than range condition. They eroded the economic case for keeping land in grazing at all. Five indicators show where that value went.',
    indicators: attachDefinitions([
      {
        name: 'Climate',
        issues: [
          'Enteric methane from ruminant digestion',
          'Soil carbon lost to continuous heavy grazing',
          'Manure and handling-area emissions',
          'Emissions released when grassland is converted',
        ],
      },
      {
        name: 'Soil',
        issues: [
          'Reduced ground cover',
          'Shallower root systems',
          'Compaction near water and handling areas',
          'Erosion on degraded range',
        ],
      },
      {
        name: 'Water',
        issues: [
          'Use concentrated around limited water points',
          'Riparian areas degraded',
          'Reduced infiltration and recharge',
          'Sediment moving downstream',
        ],
      },
      {
        name: 'Land & biodiversity',
        issues: [
          'Grassland converted to cropland',
          'Woody species encroaching on open range',
          'Habitat fragmented by land use change',
          'Native plant diversity declining',
        ],
      },
      {
        name: 'Resilience & productivity',
        issues: [
          'Thin forage reserves entering a drought',
          'Forced destocking and slow herd rebuilding',
          'Dependence on a single water source',
          'Animal performance plateaus while feed and labor costs rise',
          'Long recovery after a dry year',
        ],
      },
    ]),
  },

  investments: {
    label: 'Priority Investments',
    heading: 'Investments That Reverse the Cycle',
    lead: 'Every investment lands in one of three places: the producer who makes the decision, the practice they run, or the land itself. Filter by the indicator you are trying to move.',
    frame: [
      { title: 'Producers', text: 'Capital, grazing expertise, risk sharing and the records that let a rancher participate at all.' },
      { title: 'Practices', text: 'What changes in management: grazing plan, stocking, rest, herd decisions, feed.' },
      { title: 'Land', text: 'The place itself: water points, fencing, riparian areas and the choice not to convert.' },
    ],
    interventions: [
      {
        id: 'amp',
        group: 'Grazing & land',
        name: 'Adaptive / AMP Grazing',
        impacts: ['soil', 'climate', 'water', 'resilience'],
        mechanism: 'Actively manage timing, intensity, recovery and livestock movement to fit forage and landscape conditions.',
        value: 'Forage use, flexibility, drought response and grazing distribution',
        barrier: 'Fence, water, labor, management skill and transition risk',
        evidence: 'Carbon response is highly site-specific. Use local evidence and methodology rules rather than a universal tCO2e/acre factor.',
        commercial: 'Supplier program · certified product · Scope 3 · credit · nature',
      },
      {
        id: 'stocking',
        group: 'Grazing & land',
        name: 'Stocking & Forage Optimization',
        impacts: ['soil', 'resilience'],
        mechanism: 'Better match forage supply, animal demand, stocking rates, grazing duration and recovery.',
        value: 'Feed allocation, animal performance and drought flexibility',
        barrier: 'Data, forecasting and herd flexibility',
        evidence: 'Often has a direct operating case even before environmental value is counted.',
        commercial: 'Supplier program · product · Scope 3',
      },
      {
        id: 'infra',
        group: 'Grazing & land',
        name: 'Grazing Distribution Infrastructure',
        impacts: ['water', 'resilience', 'soil'],
        mechanism: 'Use fencing, water systems, access and paddock design to improve livestock distribution and management flexibility.',
        value: 'Access to forage, better distribution and more management options',
        barrier: 'Up-front capital, maintenance and land tenure',
        evidence: 'Often an enabling intervention rather than the environmental claim itself.',
        commercial: 'Supplier finance · product · Scope 3 · credit',
      },
      {
        id: 'riparian',
        group: 'Landscape',
        name: 'Water, Riparian & Habitat Management',
        impacts: ['water', 'biodiversity', 'resilience'],
        mechanism: 'Improve water access, crossings, riparian protection, grazing timing and habitat management.',
        value: 'Water reliability, distribution and reduced operating risk',
        barrier: 'Infrastructure, permits and long payback',
        evidence: 'Value may be water, habitat and resilience rather than a standalone carbon number.',
        commercial: 'Supplier program · nature · product · co-benefit',
      },
      {
        id: 'forage',
        group: 'Grazing & land',
        name: 'Forage & Pasture Improvement',
        impacts: ['soil', 'resilience'],
        mechanism: 'Improve forage diversity, establishment, seasonal availability and pasture condition.',
        value: 'Feed quality, seasonal forage and productivity',
        barrier: 'Establishment cost, rainfall and time to payoff',
        evidence: 'Response varies sharply by site and management.',
        commercial: 'Supplier · product · Scope 3 · credit',
      },
      {
        id: 'animal',
        group: 'Animal & feed',
        name: 'Animal Health, Welfare & Genetics',
        impacts: ['resilience', 'climate'],
        mechanism: 'Improve health, reproduction, growth, mortality, longevity and herd management.',
        value: 'More output per animal and fewer production losses',
        barrier: 'Data, genetics and multi-year management',
        evidence: 'Primarily an emissions-intensity and productivity lever.',
        commercial: 'Product · Scope 3 · supplier program',
      },
      {
        id: 'feed',
        group: 'Animal & feed',
        name: 'Feed & Forage Digestibility',
        impacts: ['resilience', 'climate'],
        mechanism: 'Improve feed quality, ration design and energy capture where the production system allows.',
        value: 'Feed efficiency and potentially better animal performance',
        barrier: 'Forage quality, ration design and local availability',
        evidence: 'Economics depend on the actual production system.',
        commercial: 'Low-carbon product · Scope 3',
      },
      {
        id: 'methane',
        group: 'Animal & feed',
        name: 'Methane-Reducing Feed Strategies',
        impacts: ['climate', 'resilience'],
        mechanism: 'Use feed formulation, supplements or other strategies to reduce enteric methane where delivery and intake can be controlled.',
        value: 'Productivity value depends on the intervention',
        barrier: 'Recurring cost, delivery and intake consistency',
        evidence: 'Extensive grazing can make delivery difficult even when technical efficacy is strong.',
        commercial: 'Low-carbon product · Scope 3 · credit',
      },
      {
        id: 'conversion',
        group: 'Protection',
        name: 'Avoided Conversion & Land Protection',
        impacts: ['biodiversity', 'climate', 'resilience'],
        mechanism: 'Keep intact grasslands in production and avoid conversion where credible conversion pressure exists.',
        value: 'Long-term land and conservation value',
        barrier: 'Opportunity cost, long commitments and legal structure',
        evidence: 'Commercial value depends on credible conversion risk and rights.',
        commercial: 'Credit · nature · product',
      },
    ],
  },

  adoption: {
    label: 'Accelerating Adoption',
    heading: 'Why Good Management Still Needs a Program',
    lead: 'Because better management does not automatically produce a better investment proposition for the person being asked to change. The program has to fund the constraint at a level that makes adoption rational while preserving enough value for buyers and the rest of the chain. The intervention may benefit the ranch, the landscape, the buyer and the broader system on different timelines. Adoption slows when one participant carries the cost and risk while another captures the value.',
    constraintEyebrow: 'Fund the scaling constraint',
    constraintHeading: 'Build a proposition that lets everyone win.',
    constraintLead: 'The right mechanism depends on what is actually preventing adoption. Each constraint below names what blocks the decision and how a program relieves it.',
    constraints: [
      {
        n: '01',
        title: 'Derisk the transition cost',
        text: 'Fence, water infrastructure, equipment and working capital arrive well before the operating benefit does. The program pays for the actual constraint that is blocking adoption.',
      },
      {
        n: '02',
        title: 'Share the performance risk',
        text: 'Weather, forage response and animal performance are not guaranteed, and the rancher carries that downside. Guarantees, multi-year support, technical assistance or contract terms move part of it off the ranch.',
      },
      {
        n: '03',
        title: 'Right size the management and implementation burden',
        text: 'Planning, movement, records and coordination can consume a modest operating gain. Collect only what the intended buyer use requires, and resource the coordination rather than assuming it.',
      },
      {
        n: '04',
        title: 'Move value across the chain',
        text: 'Beef, dairy and retail buyers may receive the Scope 3 or product value while the ranch bears the change cost. Scope 3 budgets, product premiums, procurement commitments and environmental markets can close that gap.',
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
    lead: 'Evidence is a cost, so the question is never how much can we measure. It is how much does this specific claim require. Five layers, and the claim decides how far up you have to go.',
    layers: [
      { n: '01', name: 'Practice', question: 'What changed?', examples: 'Grazing plan, stocking, infrastructure, feed, management' },
      { n: '02', name: 'Outcome', question: 'What happened?', examples: 'Soil, methane, water, habitat, productivity' },
      { n: '03', name: 'Traceability', question: 'What is it connected to?', examples: 'Ranch, herd, animal, processor, product' },
      { n: '04', name: 'Rights & Accounting', question: 'Who can use it?', examples: 'Ownership, allocation, transfer, retirement, inventory use' },
      { n: '05', name: 'Market Integrity', question: 'How can it be used?', examples: 'Permanence, reversals, leakage, uncertainty, double counting, claim language' },
    ],
  },

  pathways: {
    label: 'Market Pathways',
    heading: 'How the Performance Gets Paid For',
    lead: 'The same land outcome can reach a market four different ways. The route chosen changes what has to be measured, traced and transferred, which is why it belongs in program design rather than at the end.',
    // Order and numbering are the prototype's, unchanged. The type supports
    // per-topic reordering and an `applicable: false` flag (handover 3.3);
    // rangeland needs neither yet. Its Scope 3 detail copy already says in
    // words that it is the main route for beef and dairy.
    items: [
      {
        id: 'm01',
        n: '01',
        name: 'Carbon & Ecosystem Credits',
        carrier: 'As a quantified environmental asset',
        tagline: 'Turn verified environmental outcomes into market-ready assets.',
        whenToUse: 'Use when a methodology fits the site, the outcome can be measured against local variability, and avoided conversion or soil carbon is the primary outcome.',
        detail: 'On rangeland the credit case is site-specific. Soil carbon response varies widely, which makes local evidence and methodology rules more important than any universal per-acre factor. Avoided conversion is often the more defensible outcome.',
        examples: [
          'Climate Action Reserve Grassland Protocol, avoided conversion',
          'Verra VM0026, Sustainable Grassland Management',
          'Verra VM0032, Adjustment of Fire and Grazing',
          'Verra VM0042 applied to grazing lands',
          'Enteric methane reduction methodologies',
        ],
      },
      {
        id: 'm02',
        n: '02',
        name: 'Scope 3 & Insets',
        carrier: 'As an outcome connected to the value chain',
        tagline: 'Create and account for environmental value inside the value chain.',
        whenToUse: 'Use when a beef or dairy buyer sources from the same region and needs the reduction inside its own inventory.',
        detail: 'This is the main route for beef and dairy. Enteric methane and land conversion sit at the center of buyer targets, and the data lives on operations that never had to report it. Allocation across a long animal path is the hard part.',
        examples: [
          'GHG Protocol Land Sector and Removals Guidance',
          'SBTi FLAG target accounting',
          'Beef and dairy supplier intervention programs',
          'Value Change Initiative intervention guidance',
        ],
      },
      {
        id: 'm03',
        n: '03',
        name: 'Product & Commodity Claims',
        carrier: 'As an attribute of the physical product',
        tagline: 'Make environmental performance part of what is bought and sold.',
        whenToUse: 'Use when the claim follows the animal and a retailer, brand or foodservice buyer pays for the difference.',
        detail: 'A differentiated beef claim needs product connection, not only a land outcome. That raises the traceability requirement through feeding, processing and packing, and it is where most rangeland programs underestimate the work.',
        examples: [
          'Land to Market Ecological Outcome Verification',
          'Audubon Conservation Ranching',
          'Certified Regenerative by A Greener World',
          'Global Animal Partnership',
          'Grassfed and third-party certified beef programs',
        ],
      },
      {
        id: 'm04',
        n: '04',
        name: 'Environmental Attribute Certificates',
        carrier: 'As a certificate conveying the attribute',
        tagline: 'Convey environmental value when physical supply alone cannot.',
        whenToUse: 'Use when herd and processing paths cannot be segregated but the buyer still needs to procure the outcome.',
        detail: 'Where the animal cannot be traced to the buyer, the attribute can still transfer on its own. The architecture carries all the risk: exclusivity, allocation and retirement have to be airtight or the same reduction gets claimed twice.',
        examples: [
          'Livestock and beef environmental attribute certificates',
          'Book-and-claim structures for differentiated protein',
          'Agricultural environmental attribute registries',
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
        name: 'Soil Carbon Prediction',
        text: 'Digital soil mapping and biogeochemical modeling that forecasts soil organic carbon trajectories and quantifies the carbon benefit of a management change before it is implemented.',
        asset: 'terranexus-soil-carbon-prediction-tablet',
        shape: 'tablet',
      },
      {
        name: 'Enteric Emissions',
        text: 'Herd-level methane accounting built around composition, feed and management, so the largest part of the footprint is measured where it is produced.',
        asset: 'terranexus-enteric-emissions-tablet-portrait',
        shape: 'tablet-portrait',
      },
      {
        name: 'Grazing Practice Detection',
        text: 'Remote-sensing detection of grazing events, rest periods and biomass response, so a rotational grazing claim carries evidence a reviewer can test.',
        asset: 'terranexus-grazing-detection-phone',
        shape: 'phone',
      },
      {
        name: 'Environmental Asset Pricing & Stranded Claims Optimization',
        text: 'Optimizes bid allocation and development economics across a program, and surfaces the value left on the table when eligible supply goes undeveloped.',
        asset: 'terranexus-asset-pricing-optimization-tablet',
        shape: 'tablet',
      },
    ],
  },
};
