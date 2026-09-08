// Who We Work With content for the homepage.
// Node = what this part of the value chain is. Opportunity = why environmental
// performance is worth money to them. Programs = the work Terra Nexus actually
// does, tagged by the posture the company is in.
// Lifecycle + capability content is re-exported from the sibling module so the
// homepage has one import and one source of truth.
export { stages, capabilities } from './lifecycle-and-segments.js';


// What the client is actually working on. A company is either creating
// outcomes to sell (a project, or a product that carries the performance) or
// reducing and accounting for its own footprint (a corporate inventory).
// The six lifecycle stages are the same; what each one asks is not.
export const objects = [
  { id: 'project', name: 'Value Chain Programs', short: 'Create verified outcomes upstream in the Scope 3 value chain' },
  { id: 'inventory', name: 'Corporate Inventory Improvements', short: 'Decarbonize your own Scope 1 and 2 footprint' },
  { id: 'product', name: 'Low Impact Products & Services', short: 'Sell a product carrying the performance characteristics buyers want' },
];

export const objectViews = {
  project: {
    evaluate: 'Whether a program of this type, in this geography, under this methodology, produces outcomes worth developing.',
    design: 'Methodology, boundary, participant terms, ownership of the outcome, and who gets paid for what.',
    build: 'Enrollment, data collection, MRV, quality control, and the record a verifier will have to reconstruct.',
    launch: 'First cohort through its first verification cycle, then expansion across acres, participants and geographies.',
    operate: 'Annual verification, issuance, participant management, and a ledger that holds up under audit.',
    commercialize: 'Sale, transfer or retirement of the outcome, and the price it clears at.',
  },
  product: {
    evaluate: 'Whether the performance can be attached to the product, and whether a customer pays for it once it is.',
    design: 'Specification, evidence requirements, allocation through processing, and the claim you intend to make.',
    build: 'Traceability, chain of custody, mass balance, and documentation that travels with the shipment.',
    launch: 'First qualified volumes, customer and verifier acceptance, then expansion across facilities and product lines.',
    operate: 'Ongoing qualification, sampling, batch records, and reporting to customers and regulators.',
    commercialize: 'Premium, contract terms, tax credit or regulatory value captured on the physical product.',
  },
  inventory: {
    evaluate: 'Which reductions in your own operations are worth funding first, and which ones you will actually be able to count.',
    design: 'Accounting boundary, the abatement sequence, project economics, and how each reduction gets reported.',
    build: 'Metering, activity data, calculation methods, controls, and the record an assurance provider will test.',
    launch: 'First projects delivered and accounted, then rollout across sites, facilities and fleets.',
    operate: 'Recurring energy and activity data, reconciliation, inventory updates, and assurance readiness.',
    commercialize: 'Target progress, disclosure, and the customer, lender or investor value the reduction supports.',
  },
};


// Market roles — the role-based classification the live site uses in the
// Industries mega menu. Titles, hrefs and descriptions are verbatim from
// apps/web/src/data/nav-data.ts (industriesMenu[].shortDescription).
// The opportunity line and activities are ours.
export const marketRoles = [
  {
    slug: 'producers',
    name: 'Developers & Producers',
    href: '/industries/producers/',
    node: 'Organizations that create, originate, quantify, certify, or supply environmentally differentiated products, verified outcomes, environmental attributes, and credible claims.',
    opportunity: 'Everything downstream depends on what gets created and documented here, which is also where the value is most often given away. Holding the data, the methodology and the ownership is what decides whether the premium reaches the party that changed how production happened.',
    activities: [
      { name: 'Build a program you own', desc: 'Set the design, participants, data requirements and terms so the outcome and its evidence stay yours.' },
      { name: 'Qualify supply under a methodology', desc: 'Meet the protocol, carbon intensity model or certification a buyer or regulator will hold you to.' },
      { name: 'Trace evidence and chain of custody', desc: 'Keep practice, origin and performance data attached through storage, blending, processing and transport.' },
      { name: 'Commercialize verified outcomes and attributes', desc: 'Sell the credit, inset, certificate or differentiated product at the price its evidence supports.' },
      { name: "Comply with a customer's program requirements", desc: 'Meet the reporting and audit terms buyers write into supply agreements without rebuilding your operation.' },
    ],
  },
  {
    slug: 'buyers',
    name: 'Buyers',
    href: '/industries/buyers/',
    node: 'Organizations procuring and using differentiated products, verified environmental outcomes, attributes, certifications, and claims to achieve commercial, sustainability, and decarbonization objectives.',
    opportunity: 'A purchase only counts if it survives your own accounting and an auditor years later, so the quality of the evidence becomes your exposure and not the seller\u2019s. The work is buying performance you can actually use, at a specification your supply base can meet.',
    activities: [
      { name: 'Build a supplier intervention or inset program', desc: 'Fund change in your own supply shed and account for the reduction against your target, with allocation nobody else is claiming.' },
      { name: 'Buy differentiated products and commodities', desc: 'Specify, source and pay for supply that carries the performance you need at a price the supply base can deliver on.' },
      { name: 'Buy credits and certificates beyond supplier reach', desc: 'Cover what supplier-level action cannot, with instruments whose quality survives later scrutiny.' },
      { name: 'Commercialize product and portfolio claims', desc: 'Turn footprint, sourcing and certification into claims a retailer, a regulator and a customer all accept.' },
      { name: 'Comply with disclosure and customer requirements', desc: 'Meet reporting obligations and retailer scorecards with evidence that reconciles to your inventory.' },
    ],
  },
  {
    slug: 'enablers',
    name: 'Enabling Infrastructure',
    href: '/industries/enablers/',
    node: 'Technology, capital, markets, assurance, and specialized services that make environmental value creation and procurement possible at scale.',
    opportunity: 'Programs stall on the infrastructure around them more often than on the science. Becoming the system of record, the capital or the assurance a program depends on turns a point solution into recurring revenue.',
    activities: [
      { name: 'Build the evidence infrastructure programs run on', desc: 'Turn a monitoring, modeling or traceability tool into the system of record a verifier and a buyer will both accept.' },
      { name: 'Get specified into operating programs', desc: 'Position the technology inside programs traders, refiners and brands already fund, instead of selling one pilot at a time.' },
      { name: 'Fund and structure programs', desc: 'Screen, value and structure the capital behind projects, ventures and offtake so the economics work for every party.' },
      { name: 'Support assurance and verification', desc: 'Prepare the methods, documentation and controls an independent reviewer needs to sign off.' },
      { name: 'Commercialize a repeatable market offer', desc: 'Package specialized advisory, brokerage or registry services around how clients actually buy.' },
    ],
  },
];

export const segments = [
  {
    slug: "inputs-companies",
    name: "Inputs Companies",
    node: "Seed, crop protection, biologicals, nutrients, animal health, feed additive and agricultural technology suppliers.",
    opportunity: "The environmental benefit of an input shows up on a customer's operation and usually gets claimed further downstream. Capturing it means proving the effect at field or herd level and connecting it to the economics of everyone who touches the result.",
    activities: [
      { name: "Build a practice-based program around your technology", desc: "Enroll customers, quantify what the product does in the field, and keep the resulting evidence instead of passing it downstream for free." },
      { name: "Position the product inside a downstream supplier program", desc: "Make a biological, additive or nutrient tool the intervention a trader or brand is already paying to fund upstream." },
      { name: "Substantiate product-level claims", desc: "Substantiate what the product does at the precision a customer’s auditor will test." },
      { name: "Comply with customer data requirements", desc: "Meet the evidence and reporting terms buyers write into supply agreements." },
      { name: "Buy attributes for manufacturing and logistics", desc: "Cover the footprint you do control while the field-level outcome is claimed by someone else." },
    ],
  },
  {
    slug: "agricultural-producers",
    name: "Agricultural Producers & Integrated Protein Companies",
    node: "Farms, ranches, aquaculture operations and integrated protein companies producing the raw material the rest of the chain depends on.",
    opportunity: "Most upstream environmental outcomes are produced here, and so is the evidence for them. The opportunity is getting paid for how production happened, on top of volume and grade, and keeping a share of what that outcome is worth downstream.",
    activities: [
      { name: "Build a producer-owned or co-op program", desc: "Aggregate acres or herds, hold the data, and sell the outcome instead of handing it over with the crop." },
      { name: "Qualify feedstock for a refiner's program", desc: "Meet a carbon intensity methodology, produce the required records, and keep a real share of the premium." },
      { name: "Commercialize differentiated crop, milk, beef or protein", desc: "Sell on how it was produced, with a practice and outcome record that holds up downstream." },
      { name: "Comply with a buyer's supplier program", desc: "Understand what you are being asked to change, what you get paid, and who ends up claiming the result." },
      { name: "Buy inputs, feed and technology on performance", desc: "Separate what measurably changes the outcome and the economics from what is only marketed that way." },
    ],
  },
  {
    slug: "commodity-traders",
    name: "Commodity Traders",
    node: "Originators, merchandisers and logistics operators moving grain, oilseed, oils and protein between producers and processors.",
    opportunity: "No other participant touches both the producer and the end buyer. That position turns origination scale into programs, and identity-preserved supply into something refiners, processors and brands will pay a premium for.",
    activities: [
      { name: "Build a supply-shed origination program", desc: "Enroll producers where the physical originates, so the attribute is created alongside it instead of reconstructed later." },
      { name: "Preserve identity and attributes through the chain", desc: "Keep carbon intensity, practice and origin data attached through commingling, storage, blending and transport." },
      { name: "Commercialize low-CI and certified commodities", desc: "Deliver differentiated bushels, oil or meal to refiners, processors and brands with the evidence attached." },
      { name: "Sell attributes as their own line", desc: "Separate the environmental attribute from the physical where the market supports it." },
      { name: "Operate producer incentives for a downstream buyer", desc: "Run the payments, enrollment and evidence for a brand's inset program." },
    ],
  },
  {
    slug: "ingredient-feed-processors",
    name: "Ingredient & Feed Processors",
    node: "Crush, mill, refining, rendering and feed operations converting raw commodities into ingredients, feed and co-products.",
    opportunity: "Volume concentrates here, which makes it the most efficient place in the chain to change upstream production. It is also where an attribute either survives conversion and allocation or disappears, which puts the operating decision and the commercial one in the same hands.",
    activities: [
      { name: "Build a supplier program at the first purchase point", desc: "Use the volume that concentrates at your plant to change production upstream, and hold the record that proves it." },
      { name: "Improve in-plant energy, water and yield", desc: "Reduce the footprint of conversion itself, with measurement solid enough that the reduction can be counted and claimed." },
      { name: "Commercialize lower-footprint ingredients, feed and co-products", desc: "Carry the attribute through your process with mass balance and allocation a buyer's verifier accepts." },
      { name: "Buy raw material and feed on performance", desc: "Source supply whose attribute can still be claimed after it passes through your process." },
      { name: "Comply with customer and regulatory reporting", desc: "Produce the plant-level data buyers and regulators ask for, on their schedule." },
    ],
  },
  {
    slug: "food-beverage-companies",
    name: "Food & Beverage Companies",
    node: "Branded and private-label manufacturers turning ingredients into consumer food and beverage products.",
    opportunity: "The targets, the customer relationship and the budget sit here, while most of the footprint sits two or three tiers upstream. The opportunity is converting that spend into supplier change that can be counted, claimed and defended.",
    activities: [
      { name: "Build a supplier intervention or inset program", desc: "Fund change in your own supply shed and account for the reduction against your target, with allocation nobody else is claiming." },
      { name: "Buy differentiated ingredients and commodities", desc: "Specify, source and pay for supply that carries the performance you need, at a specification the supply base can meet." },
      { name: "Buy credits and certificates beyond supplier reach", desc: "Cover what supplier-level action cannot, with instruments whose quality survives later scrutiny." },
      { name: "Commercialize product and portfolio claims", desc: "Turn footprint, sourcing and certification into claims a retailer, a regulator and a customer all accept." },
      { name: "Comply with disclosure and customer requirements", desc: "Meet reporting obligations and retailer scorecards with evidence that reconciles to your inventory." },
    ],
  },
  {
    slug: "food-retail-distribution",
    name: "Food Retail & Distribution",
    node: "Grocery, foodservice, wholesale and distribution businesses selling to the end customer.",
    opportunity: "A retail specification is the strongest demand signal in the food system. Turning it from a sourcing policy into a funded, evidenced program decides whether the supply base can afford to meet it.",
    activities: [
      { name: "Build a category or private-label supplier program", desc: "Turn a sourcing policy into a funded program the supply base can act on." },
      { name: "Buy responsibly by category", desc: "Set specifications suppliers can evidence, and pay in a way that makes the change viable." },
      { name: "Buy attributes across a fragmented footprint", desc: "Cover the part of the footprint physical traceability will never reach." },
      { name: "Commercialize private-label claims", desc: "Own the claim on products that carry your name, with the substantiation behind it." },
      { name: "Comply with reporting and scorecard obligations", desc: "Consolidate supplier data into disclosures that hold up to review." },
    ],
  },
  {
    slug: "energy-biofuels-refiners",
    name: "Energy & Biofuels Refiners",
    node: "Refiners, blenders and processors converting crops, oils, fats and residues into renewable diesel, sustainable aviation fuel, ethanol and biogas.",
    opportunity: "This is the one part of the food system where carbon intensity is already priced and enforceable. Demand is rarely the constraint. The hard parts are sourcing feedstock that can prove its carbon intensity and holding documentation that stands up when the value is claimed.",
    activities: [
      { name: "Build a low-CI feedstock origination program", desc: "Enroll growers and elevators, set the practice and data requirements, and secure verifiable low-carbon supply at volume." },
      { name: "Qualify for 45Z and clean fuel credits", desc: "Model carbon intensity, assemble the substantiation, and hold documentation the credit can be claimed on." },
      { name: "Trace feedstock evidence and chain of custody", desc: "Follow bushels and gallons through commingling, storage and transport so the carbon intensity score survives an audit." },
      { name: "Commercialize low-CI fuel on an attribute basis", desc: "Sell renewable diesel, SAF and ethanol to airlines, shippers and brands on evidence you produce." },
      { name: "Comply with an obligated party's or customer's program", desc: "Meet their requirements without rebuilding your operation around them." },
    ],
  },
  {
    slug: "food-waste-prevention-diversion-recovery",
    name: "Food Waste Prevention, Diversion & Recovery",
    node: "Prevention, redistribution, byproduct processing, rendering, anaerobic digestion and resource recovery operations.",
    opportunity: "Material treated as a disposal cost by one party is feedstock, feed or energy to another. The opportunity sits in the contracts, measurement and accounting that let both sides of that trade recognize the value.",
    activities: [
      { name: "Build a diversion and recovery program with countable outcomes", desc: "Put the measurement and contracts in place so prevented or recovered material can be counted, claimed and paid for." },
      { name: "Commercialize byproduct and recovered material", desc: "Sell into feed, feedstock, ingredient or energy markets priced on quality and environmental performance, not on disposal cost." },
      { name: "Buy material from generators", desc: "Secure consistent supply with the evidence the downstream user will be asked to produce." },
      { name: "Comply with diversion mandates and reporting", desc: "Meet local rules and customer commitments with measurement that stands up." },
    ],
  },
];
