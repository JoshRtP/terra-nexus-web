// "Who We Work With" content for the homepage
// (src/pages/index.astro#who-we-work-with): the role-based view (3 market
// roles) and the value-chain-segment view (8 segments), both tabbable into
// one shared panel.
//
// `marketRoles` merges two sources rather than re-typing shared strings:
// `name`/`href`/`node` are derived from `industriesMenu` in `nav-data.ts`
// (the same Industries mega-menu data — `title`/`href`/`shortDescription`
// are verbatim from there, not retyped), while `opportunity`/`activities`
// are copied from
// plans/content/homepage-sections-2026-09/homepage-content.js's own
// `marketRoles` export (approved prototype content), matched to
// `industriesMenu` by `key`/`slug` (both use `producers`/`buyers`/`enablers`).
//
// `segments` slugs, in value-chain order, are copied EXACTLY from that same
// homepage-content.js `segments` export — they match `valueChainMenu`'s
// anchors in nav-data.ts and the live `id={slug}` targets on
// /who-we-work-with/food-and-agribusiness-value-chain/. Do not rename any
// segment slug here.
import { industriesMenu } from "./nav-data";

export interface Activity {
  name: string;
  desc: string;
}

export interface Category {
  title: string;
  description: string;
}

export interface MarketRole {
  slug: "producers" | "buyers" | "enablers";
  name: string;
  href: string;
  node: string;
  opportunity: string;
  activities: Activity[];
  /** Section heading on the deep page — from the retired /industries/<role>/ hero. */
  headline: string;
  /** What this role brings to, takes from, or provides the market. */
  categories: Category[];
}

export interface Segment {
  slug: string;
  name: string;
  node: string;
  opportunity: string;
  activities: Activity[];
  decisions: string[];
  expertise: string[];
  capabilities: string[];
  /** Illustrative only — see EXAMPLES_DISCLAIMER. Never a client claim. */
  examples: string[];
}

/** The three enabling groups. Same shape as a Segment, plus a scope note. */
export interface Enabler {
  slug: string;
  name: string;
  node: string;
  opportunity: string;
  activities: Activity[];
  capabilities: string[];
  examples: string[];
  /** Scope limit that must appear wherever this group is described. */
  note: string;
}

// opportunity/activities only — name/href/node come from industriesMenu.
const roleContent: Record<
  MarketRole["slug"],
  { opportunity: string; activities: Activity[] }
> = {
  producers: {
    opportunity:
      "Everything downstream depends on what gets created and documented here, which is also where the value is most often given away. Holding the data, the methodology and the ownership is what decides whether the premium reaches the party that changed how production happened.",
    activities: [
      {
        name: "Build a program you own",
        desc: "Set the design, participants, data requirements and terms so the outcome and its evidence stay yours.",
      },
      {
        name: "Qualify supply under a methodology",
        desc: "Meet the protocol, carbon intensity model or certification a buyer or regulator will hold you to.",
      },
      {
        name: "Trace evidence and chain of custody",
        desc: "Keep practice, origin and performance data attached through storage, blending, processing and transport.",
      },
      {
        name: "Commercialize verified outcomes and attributes",
        desc: "Sell the credit, inset, certificate or differentiated product at the price its evidence supports.",
      },
      {
        name: "Comply with a customer's program requirements",
        desc: "Meet the reporting and audit terms buyers write into supply agreements without rebuilding your operation.",
      },
    ],
  },
  buyers: {
    opportunity:
      "A purchase only counts if it survives your own accounting and an auditor years later, so the quality of the evidence becomes your exposure and not the seller's. The work is buying performance you can actually use, at a specification your supply base can meet.",
    activities: [
      {
        name: "Build a supplier intervention or inset program",
        desc: "Fund change in your own supply shed and account for the reduction against your target, with allocation nobody else is claiming.",
      },
      {
        name: "Buy differentiated products and commodities",
        desc: "Specify, source and pay for supply that carries the performance you need at a price the supply base can deliver on.",
      },
      {
        name: "Buy credits and certificates beyond supplier reach",
        desc: "Cover what supplier-level action cannot, with instruments whose quality survives later scrutiny.",
      },
      {
        name: "Commercialize product and portfolio claims",
        desc: "Turn footprint, sourcing and certification into claims a retailer, a regulator and a customer all accept.",
      },
      {
        name: "Comply with disclosure and customer requirements",
        desc: "Meet reporting obligations and retailer scorecards with evidence that reconciles to your inventory.",
      },
    ],
  },
  enablers: {
    opportunity:
      "Programs stall on the infrastructure around them more often than on the science. Becoming the system of record, the capital or the assurance a program depends on turns a point solution into recurring revenue.",
    activities: [
      {
        name: "Build the evidence infrastructure programs run on",
        desc: "Turn a monitoring, modeling or traceability tool into the system of record a verifier and a buyer will both accept.",
      },
      {
        name: "Get specified into operating programs",
        desc: "Position the technology inside programs traders, refiners and brands already fund, instead of selling one pilot at a time.",
      },
      {
        name: "Fund and structure programs",
        desc: "Screen, value and structure the capital behind projects, ventures and offtake so the economics work for every party.",
      },
      {
        name: "Support assurance and verification",
        desc: "Prepare the methods, documentation and controls an independent reviewer needs to sign off.",
      },
      {
        name: "Commercialize a repeatable market offer",
        desc: "Package specialized advisory, brokerage or registry services around how clients actually buy.",
      },
    ],
  },
};

const marketRoleBase = industriesMenu.map((role) => ({
  slug: role.key,
  name: role.title,
  href: role.href,
  node: role.shortDescription,
  ...roleContent[role.key],
}));

const segmentBase = [
  {
    slug: "inputs-companies",
    name: "Inputs Companies",
    node: "Seed, crop protection, biologicals, nutrients, animal health, feed additive and agricultural technology suppliers.",
    opportunity:
      "The environmental benefit of an input shows up on a customer's operation and usually gets claimed further downstream. Capturing it means proving the effect at field or herd level and connecting it to the economics of everyone who touches the result.",
    activities: [
      {
        name: "Build a practice-based program around your technology",
        desc: "Enroll customers, quantify what the product does in the field, and keep the resulting evidence instead of passing it downstream for free.",
      },
      {
        name: "Position the product inside a downstream supplier program",
        desc: "Make a biological, additive or nutrient tool the intervention a trader or brand is already paying to fund upstream.",
      },
      {
        name: "Substantiate product-level claims",
        desc: "Substantiate what the product does at the precision a customer's auditor will test.",
      },
      {
        name: "Comply with customer data requirements",
        desc: "Meet the evidence and reporting terms buyers write into supply agreements.",
      },
      {
        name: "Buy attributes for manufacturing and logistics",
        desc: "Cover the footprint you do control while the field-level outcome is claimed by someone else.",
      },
    ],
  },
  {
    slug: "agricultural-producers",
    name: "Agricultural Producers & Integrated Protein Companies",
    node: "Farms, ranches, aquaculture operations and integrated protein companies producing the raw material the rest of the chain depends on.",
    opportunity:
      "Most upstream environmental outcomes are produced here, and so is the evidence for them. The opportunity is getting paid for how production happened, on top of volume and grade, and keeping a share of what that outcome is worth downstream.",
    activities: [
      {
        name: "Build a producer-owned or co-op program",
        desc: "Aggregate acres or herds, hold the data, and sell the outcome instead of handing it over with the crop.",
      },
      {
        name: "Qualify feedstock for a refiner's program",
        desc: "Meet a carbon intensity methodology, produce the required records, and keep a real share of the premium.",
      },
      {
        name: "Commercialize differentiated crop, milk, beef or protein",
        desc: "Sell on how it was produced, with a practice and outcome record that holds up downstream.",
      },
      {
        name: "Comply with a buyer's supplier program",
        desc: "Understand what you are being asked to change, what you get paid, and who ends up claiming the result.",
      },
      {
        name: "Buy inputs, feed and technology on performance",
        desc: "Separate what measurably changes the outcome and the economics from what is only marketed that way.",
      },
    ],
  },
  {
    slug: "commodity-traders",
    name: "Commodity Traders",
    node: "Originators, merchandisers and logistics operators moving grain, oilseed, oils and protein between producers and processors.",
    opportunity:
      "No other participant touches both the producer and the end buyer. That position turns origination scale into programs, and identity-preserved supply into something refiners, processors and brands will pay a premium for.",
    activities: [
      {
        name: "Build a supply-shed origination program",
        desc: "Enroll producers where the physical originates, so the attribute is created alongside it instead of reconstructed later.",
      },
      {
        name: "Preserve identity and attributes through the chain",
        desc: "Keep carbon intensity, practice and origin data attached through commingling, storage, blending and transport.",
      },
      {
        name: "Commercialize low-CI and certified commodities",
        desc: "Deliver differentiated bushels, oil or meal to refiners, processors and brands with the evidence attached.",
      },
      {
        name: "Sell attributes as their own line",
        desc: "Separate the environmental attribute from the physical where the market supports it.",
      },
      {
        name: "Operate producer incentives for a downstream buyer",
        desc: "Run the payments, enrollment and evidence for a brand's inset program.",
      },
    ],
  },
  {
    slug: "ingredient-feed-processors",
    name: "Ingredient & Feed Processors",
    node: "Crush, mill, refining, rendering and feed operations converting raw commodities into ingredients, feed and co-products.",
    opportunity:
      "Volume concentrates here, which makes it the most efficient place in the chain to change upstream production. It is also where an attribute either survives conversion and allocation or disappears, which puts the operating decision and the commercial one in the same hands.",
    activities: [
      {
        name: "Build a supplier program at the first purchase point",
        desc: "Use the volume that concentrates at your plant to change production upstream, and hold the record that proves it.",
      },
      {
        name: "Improve in-plant energy, water and yield",
        desc: "Reduce the footprint of conversion itself, with measurement solid enough that the reduction can be counted and claimed.",
      },
      {
        name: "Commercialize lower-footprint ingredients, feed and co-products",
        desc: "Carry the attribute through your process with mass balance and allocation a buyer's verifier accepts.",
      },
      {
        name: "Buy raw material and feed on performance",
        desc: "Source supply whose attribute can still be claimed after it passes through your process.",
      },
      {
        name: "Comply with customer and regulatory reporting",
        desc: "Produce the plant-level data buyers and regulators ask for, on their schedule.",
      },
    ],
  },
  {
    slug: "food-beverage-companies",
    name: "Food & Beverage Companies",
    node: "Branded and private-label manufacturers turning ingredients into consumer food and beverage products.",
    opportunity:
      "The targets, the customer relationship and the budget sit here, while most of the footprint sits two or three tiers upstream. The opportunity is converting that spend into supplier change that can be counted, claimed and defended.",
    activities: [
      {
        name: "Build a supplier intervention or inset program",
        desc: "Fund change in your own supply shed and account for the reduction against your target, with allocation nobody else is claiming.",
      },
      {
        name: "Buy differentiated ingredients and commodities",
        desc: "Specify, source and pay for supply that carries the performance you need, at a specification the supply base can meet.",
      },
      {
        name: "Buy credits and certificates beyond supplier reach",
        desc: "Cover what supplier-level action cannot, with instruments whose quality survives later scrutiny.",
      },
      {
        name: "Commercialize product and portfolio claims",
        desc: "Turn footprint, sourcing and certification into claims a retailer, a regulator and a customer all accept.",
      },
      {
        name: "Comply with disclosure and customer requirements",
        desc: "Meet reporting obligations and retailer scorecards with evidence that reconciles to your inventory.",
      },
    ],
  },
  {
    slug: "food-retail-distribution",
    name: "Food Retail & Distribution",
    node: "Grocery, foodservice, wholesale and distribution businesses selling to the end customer.",
    opportunity:
      "A retail specification is the strongest demand signal in the food system. Turning it from a sourcing policy into a funded, evidenced program decides whether the supply base can afford to meet it.",
    activities: [
      {
        name: "Build a category or private-label supplier program",
        desc: "Turn a sourcing policy into a funded program the supply base can act on.",
      },
      {
        name: "Buy responsibly by category",
        desc: "Set specifications suppliers can evidence, and pay in a way that makes the change viable.",
      },
      {
        name: "Buy attributes across a fragmented footprint",
        desc: "Cover the part of the footprint physical traceability will never reach.",
      },
      {
        name: "Commercialize private-label claims",
        desc: "Own the claim on products that carry your name, with the substantiation behind it.",
      },
      {
        name: "Comply with reporting and scorecard obligations",
        desc: "Consolidate supplier data into disclosures that hold up to review.",
      },
    ],
  },
  {
    slug: "energy-biofuels-refiners",
    name: "Energy & Biofuels Refiners",
    node: "Refiners, blenders and processors converting crops, oils, fats and residues into renewable diesel, sustainable aviation fuel, ethanol and biogas.",
    opportunity:
      "This is the one part of the food system where carbon intensity is already priced and enforceable. Demand is rarely the constraint. The hard parts are sourcing feedstock that can prove its carbon intensity and holding documentation that stands up when the value is claimed.",
    activities: [
      {
        name: "Build a low-CI feedstock origination program",
        desc: "Enroll growers and elevators, set the practice and data requirements, and secure verifiable low-carbon supply at volume.",
      },
      {
        name: "Qualify for 45Z and clean fuel credits",
        desc: "Model carbon intensity, assemble the substantiation, and hold documentation the credit can be claimed on.",
      },
      {
        name: "Trace feedstock evidence and chain of custody",
        desc: "Follow bushels and gallons through commingling, storage and transport so the carbon intensity score survives an audit.",
      },
      {
        name: "Commercialize low-CI fuel on an attribute basis",
        desc: "Sell renewable diesel, SAF and ethanol to airlines, shippers and brands on evidence you produce.",
      },
      {
        name: "Comply with an obligated party's or customer's program",
        desc: "Meet their requirements without rebuilding your operation around them.",
      },
    ],
  },
  {
    slug: "food-waste-prevention-diversion-recovery",
    name: "Food Waste Prevention, Diversion & Recovery",
    node: "Prevention, redistribution, byproduct processing, rendering, anaerobic digestion and resource recovery operations.",
    opportunity:
      "Material treated as a disposal cost by one party is feedstock, feed or energy to another. The opportunity sits in the contracts, measurement and accounting that let both sides of that trade recognize the value.",
    activities: [
      {
        name: "Build a diversion and recovery program with countable outcomes",
        desc: "Put the measurement and contracts in place so prevented or recovered material can be counted, claimed and paid for.",
      },
      {
        name: "Commercialize byproduct and recovered material",
        desc: "Sell into feed, feedstock, ingredient or energy markets priced on quality and environmental performance, not on disposal cost.",
      },
      {
        name: "Buy material from generators",
        desc: "Secure consistent supply with the evidence the downstream user will be asked to produce.",
      },
      {
        name: "Comply with diversion mandates and reporting",
        desc: "Meet local rules and customer commitments with measurement that stands up.",
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────
// Deep-page detail. The homepage renders name/node/opportunity/activities;
// /who-we-work-with/ renders all of it. Merged on by slug rather than
// retyped so the approved copy above stays the single source.
//
// `expertise` and `capabilities` are lifted verbatim from the retired
// /who-we-work-with/food-and-agribusiness-value-chain/ page. `decisions` came
// from there too but were reworded on 2026-09-13 at the owner's request: they
// were first-person-plural questions ("Where should we play"), and on a page
// addressed to eight different audiences the reader cannot tell whether "we"
// means Terra Nexus or their own organization. They are now impersonal decision
// statements. Terra Nexus's own voice elsewhere on the page is unambiguous and
// was left alone.
// `examples` come from the owner-verified records in knowledge/audiences/,
// which carry `examples_are_illustrative: true` — see EXAMPLES_DISCLAIMER.
// ─────────────────────────────────────────────────────────────────────────

/** Must be rendered wherever `examples` are shown. Governance, not decoration. */
export const EXAMPLES_DISCLAIMER =
  "Illustrative examples of organizations in this category. Inclusion does not represent a client relationship, endorsement, partnership, or completed engagement.";

export const capabilityLinks: Record<string, string> = {
  "Strategy & Innovation": "/capabilities/strategy-and-innovation/",
  "Sustainable Supply Chain & Operations":
    "/capabilities/sustainable-supply-chain-and-operations/",
  "Carbon & Ecosystem Services": "/capabilities/carbon-and-ecosystem-services/",
  "Corporate Sustainability": "/capabilities/corporate-sustainability/",
  "Financial Investments & New Venture Development":
    "/capabilities/financial-investments-and-new-venture-development/",
};

export const expertiseLinks: Record<string, string> = {
  "Regenerative Agriculture": "/expertise/regenerative-agriculture/",
  "Regenerative Rangeland": "/expertise/regenerative-rangeland/",
  Agroforestry: "/expertise/agroforestry/",
  Aquaculture: "/expertise/aquaculture/",
  "Biodiversity & Ecosystem Resilience":
    "/expertise/biodiversity-and-ecosystem-resilience/",
  "Sustainable Supply Chains": "/expertise/sustainable-supply-chains/",
  "Low Carbon Energy & Biofuels": "/expertise/low-carbon-energy-and-biofuels/",
  "Purpose-Driven Food Brands & Retailers":
    "/expertise/purpose-driven-food-brands-and-retailers/",
  "Food Waste": "/expertise/food-waste-prevention-diversion-recovery/",
  "Food Waste Prevention, Diversion & Recovery":
    "/expertise/food-waste-prevention-diversion-recovery/",
};

const segmentDetail: Record<
  string,
  Pick<Segment, "decisions" | "expertise" | "capabilities" | "examples">
> = {
  "inputs-companies": {
    decisions: [
      "Where to play, and how to win, at the intersection of food and climate",
      "Which products, services and programs create differentiated growth",
      "How to translate sustainability ambition into commercial action",
    ],
    expertise: ["Regenerative Agriculture", "Regenerative Rangeland"],
    capabilities: [
      "Strategy & Innovation",
      "Sustainable Supply Chain & Operations",
    ],
    examples: [
      "Bayer",
      "Syngenta",
      "Corteva",
      "Nutrien",
      "BASF",
      "Beck’s Hybrids",
      "Yara",
      "WinField United",
    ],
  },
  "agricultural-producers": {
    decisions: [
      "Which programs and practices fit the land, the operation and its markets",
      "How producer economics and incentives align with buyer requirements",
      "How to measure, verify and commercialize environmental performance",
    ],
    expertise: [
      "Regenerative Agriculture",
      "Regenerative Rangeland",
      "Aquaculture",
    ],
    capabilities: [
      "Sustainable Supply Chain & Operations",
      "Carbon & Ecosystem Services",
    ],
    examples: [
      "JBS",
      "Tyson",
      "Smithfield",
      "Perdue Farms",
      "Pilgrim’s Pride",
      "Seaboard Foods",
      "Marfrig",
      "Wilmar",
      "SLC Agrícola",
      "Land O’Lakes",
    ],
  },
  "commodity-traders": {
    decisions: [
      "How to build traceable, credibly claimed supply without fragmenting liquidity",
      "How to engage producers and manage data across fragmented supply chains",
      "How to commercialize environmental attributes while controlling claims risk",
    ],
    expertise: [
      "Regenerative Agriculture",
      "Sustainable Supply Chains",
      "Low Carbon Energy & Biofuels",
    ],
    capabilities: [
      "Strategy & Innovation",
      "Sustainable Supply Chain & Operations",
      "Carbon & Ecosystem Services",
    ],
    examples: [
      "ADM",
      "Bunge/Viterra",
      "Cargill",
      "Louis Dreyfus Company",
      "CHS",
      "Scoular",
      "Gavilon",
      "The Andersons",
    ],
  },
  "ingredient-feed-processors": {
    decisions: [
      "How to source, process and verify lower-impact ingredients and feed",
      "How to turn process improvements and byproducts into commercial value",
      "How to build traceability and claims that buyers and regulators accept",
    ],
    expertise: ["Sustainable Supply Chains", "Aquaculture"],
    capabilities: [
      "Sustainable Supply Chain & Operations",
      "Corporate Sustainability",
    ],
    examples: [
      "Ingredion",
      "Ardent Mills",
      "Grain Craft",
      "Miller Milling",
      "Benson Hill",
      "Cargill Animal Nutrition",
      "ADM Animal Nutrition",
      "Purina Animal Nutrition",
      "Darling Ingredients",
      "BioMar",
    ],
  },
  "food-beverage-companies": {
    decisions: [
      "How to connect sustainability priorities to products, customers and growth",
      "How to build supplier programs that deliver Scope 3 and insetting outcomes",
      "How to manage claims, certification and commercialization across a portfolio",
    ],
    expertise: [
      "Sustainable Supply Chains",
      "Purpose-Driven Food Brands & Retailers",
      "Biodiversity & Ecosystem Resilience",
      "Food Waste",
    ],
    capabilities: ["Corporate Sustainability", "Strategy & Innovation"],
    examples: [
      "Nestlé",
      "Mars",
      "Danone",
      "General Mills",
      "McCain",
      "PepsiCo",
      "Coca-Cola",
      "Keurig Dr Pepper",
      "Kraft Heinz",
      "Mondelez",
      "Bimbo",
      "Conagra",
      "Diageo",
      "Suntory",
      "AB InBev",
    ],
  },
  "food-retail-distribution": {
    decisions: [
      "How to build responsible sourcing into category and private-label strategy",
      "How to reduce food waste and logistics impact while maintaining service",
      "How to collaborate with suppliers on traceability and credible claims",
    ],
    expertise: [
      "Purpose-Driven Food Brands & Retailers",
      "Food Waste",
      "Sustainable Supply Chains",
    ],
    capabilities: [
      "Sustainable Supply Chain & Operations",
      "Corporate Sustainability",
    ],
    examples: [
      "Walmart",
      "Kroger",
      "Ahold Delhaize",
      "ALDI",
      "Whole Foods Market",
      "Costco",
      "Target",
      "Sprouts",
      "Misfits Market",
      "Sysco",
      "Aramark",
      "US Foods",
      "Gordon Food Service",
    ],
  },
  "energy-biofuels-refiners": {
    decisions: [
      "How to source and verify low-carbon-intensity feedstock at scale",
      "How to build chain of custody and audit-ready program operations",
      "How to commercialize carbon-intensity outcomes and select the right partners",
    ],
    expertise: ["Low Carbon Energy & Biofuels", "Sustainable Supply Chains"],
    capabilities: [
      "Carbon & Ecosystem Services",
      "Sustainable Supply Chain & Operations",
    ],
    examples: [
      "POET",
      "Valero",
      "Green Plains",
      "Neste",
      "Marathon/Martinez Renewables",
      "Phillips 66",
      "Diamond Green Diesel",
      "Gevo",
    ],
  },
  "food-waste-prevention-diversion-recovery": {
    decisions: [
      "Where the highest-value opportunities to prevent, divert or recover waste sit",
      "Which technologies, partners and secondary markets are credible and scalable",
      "How to measure outcomes and build claims that stand up to scrutiny",
    ],
    expertise: [
      "Food Waste Prevention, Diversion & Recovery",
      "Sustainable Supply Chains",
    ],
    capabilities: [
      "Sustainable Supply Chain & Operations",
      "Corporate Sustainability",
    ],
    examples: [
      "Goodr",
      "Too Good To Go",
      "Flashfood",
      "Full Harvest",
      "Divert",
      "Feeding America",
      "WM",
      "Recology",
      "Republic Services",
    ],
  },
};

export const segments: Segment[] = segmentBase.map((s) => {
  const detail = segmentDetail[s.slug];
  // Spreading undefined is legal JS, so without this a renamed slug would
  // silently render a segment with no decisions, tags or examples.
  if (!detail) throw new Error(`No deep-page detail for value-chain segment '${s.slug}'`);
  return { ...s, ...detail };
});

// Role detail, lifted from the retired /industries/<role>/ pages — their hero
// headline and the four representative categories each carried. Those pages
// were explicitly marked "Lightweight prototype … demonstrates the IA only";
// this is the content worth keeping from them.
const roleDetail: Record<
  MarketRole["slug"],
  Pick<MarketRole, "headline" | "categories">
> = {
  producers: {
    headline: "Organizations That Create and Supply Value",
    categories: [
      {
        title: "Certified & Differentiated Products",
        description:
          "Certified agricultural commodities, ingredients, regenerative and low-carbon products, traceable low-CI fuels and feedstocks.",
      },
      {
        title: "Product-Level Evidence & Claims",
        description:
          "Product Carbon Footprints, LCAs, environmental product claims, carbon-intensity claims, certified sourcing claims.",
      },
      {
        title: "Supply-Chain Environmental Outcomes",
        description:
          "Verified Scope 3 reductions, insets, regenerative agriculture outcomes, traceable low-carbon sourcing.",
      },
      {
        title: "Environmental Assets",
        description:
          "Carbon offsets, Environmental Attribute Certificates, ecosystem-service credits, carbon removals, and other transferable attributes.",
      },
    ],
  },
  buyers: {
    headline: "Organizations That Procure and Use Value",
    categories: [
      {
        title: "Decarbonization & Scope 3 Progress",
        description:
          "Progress toward corporate climate targets, supply-chain reduction goals, and Scope 3 accounting.",
      },
      {
        title: "Certification & Product Differentiation",
        description:
          "Certified sourcing, product claims, and differentiated positioning that require credible, verifiable evidence.",
      },
      {
        title: "Regulatory Compliance & Reporting",
        description:
          "Regulatory obligations, environmental reporting requirements, and low-carbon fuel or product standards.",
      },
      {
        title: "Procurement Qualification",
        description:
          "Customer requirements, supplier qualification criteria, and category-specific sourcing standards.",
      },
    ],
  },
  enablers: {
    headline: "Infrastructure That Makes the System Work",
    categories: [
      {
        title: "Technology & Data",
        description:
          "MRV technology, data platforms, traceability systems, modeling providers, and digital solutions.",
      },
      {
        title: "Markets & Ecosystem Services",
        description:
          "Environmental markets, registries, marketplaces, and ecosystem-service infrastructure.",
      },
      {
        title: "Finance",
        description:
          "Financiers, investors, private equity, venture capital, project and climate finance.",
      },
      {
        title: "Assurance & Specialist Services",
        description:
          "Verification, certification infrastructure, and technical service providers.",
      },
    ],
  },
};

export const marketRoles: MarketRole[] = marketRoleBase.map((role) => ({
  ...role,
  // The /industries/<role>/ routes now redirect here, so the role's own link
  // is an anchor on this page rather than a separate page.
  href: `/who-we-work-with/#${role.slug}`,
  ...roleDetail[role.slug],
}));

// ─────────────────────────────────────────────────────────────────────────
// The three enabling groups.
//
// `node` is the definition from knowledge/audiences/, `capabilities` and
// `note` are lifted from the retired
// /who-we-work-with/enabling-markets-technology-and-capital/ page, and
// `examples` come from the same governed records as the segments'.
//
// `activities` reshape that page's approved "Terra Nexus supports …" lists
// into the same named-activity form the segments use; the `desc` lines and
// the `opportunity` paragraphs are AUTHORED (2026-09-13) and are the only
// genuinely new copy in this module. They need owner review before publish.
// ─────────────────────────────────────────────────────────────────────────
export const enablers: Enabler[] = [
  {
    slug: "environmental-markets",
    name: "Environmental Markets & Ecosystem Services",
    node: "Project developers, ecosystem service program operators, standards bodies, registries, verifiers, credit buyers, marketplaces, ratings providers, and other market infrastructure organizations that turn environmental outcomes into credible assets, claims, and incentives.",
    opportunity:
      "This group decides what everyone else is allowed to claim. Methodology, registry and assurance choices set the evidence bar every program upstream has to clear, which makes market infrastructure the highest-leverage position in the chain — and the most exposed when a standard moves.",
    activities: [
      {
        name: "Assess markets and methodologies",
        desc: "Work out which standard, methodology or program an outcome can realistically qualify under, and what it is worth once it does.",
      },
      {
        name: "Design the program, MRV and claims",
        desc: "Build the measurement, traceability and claim architecture a verifier and a buyer will both accept.",
      },
      {
        name: "Run diligence on assets and portfolios",
        desc: "Test whether credits, projects or portfolios hold up against the methodology they were issued under.",
      },
      {
        name: "Select partners and verifiers",
        desc: "Choose the developers, registries, verifiers and platforms a program will depend on, before they are hard to replace.",
      },
      {
        name: "Operate the program and stay audit-ready",
        desc: "Run governance, managed operations and reconciliation across project, product, inventory and disclosure systems.",
      },
    ],
    capabilities: ["Carbon & Ecosystem Services", "Corporate Sustainability"],
    examples: [
      "Indigo Ag",
      "Grassroots Carbon",
      "Kateri",
      "Agoro Carbon Alliance",
      "Truterra",
      "Soil and Water Outcomes Fund",
      "ESMC",
      "Native",
      "Verra",
      "Climate Action Reserve",
      "ACR",
      "Gold Standard",
      "BCarbon",
      "SustainCert",
      "EcoEngineers",
      "SCS Global Services",
      "DNV",
      "SGS",
      "LRQA",
      "Rubicon Carbon",
      "Carbon Direct",
      "Patch",
      "Xpansiv",
      "CME Group",
      "Calyx Global",
      "Sylvera",
      "BeZero Carbon",
    ],
    note: "Terra Nexus does not represent itself as an accredited validator or verifier.",
  },
  {
    slug: "enabling-tech",
    name: "Enabling Tech & Solution Providers",
    node: "MRV platforms, remote sensing providers, farm data systems, traceability tools, lifecycle assessment platforms, soil data companies, supplier engagement platforms, and sustainability software providers that make environmental performance measurable, reportable, and actionable.",
    opportunity:
      "Programs stall on infrastructure far more often than on science. The commercial question is rarely whether the product works — it is whether it becomes the system of record a verifier, a buyer and an operator all rely on. That is what turns a pilot into recurring revenue.",
    activities: [
      {
        name: "Enter the market and find the real buyer",
        desc: "Work out who actually holds the budget for this, and what they need to see before they will sign.",
      },
      {
        name: "Prove the product against a real workflow",
        desc: "Design pilots around what the buyer will be judged on, not around what the product does best.",
      },
      {
        name: "Stand up technical and data diligence",
        desc: "Produce the evidence a customer's technical team and their verifier will both ask for.",
      },
      {
        name: "Get specified into operating programs",
        desc: "Position the technology inside programs traders, refiners and brands already fund, instead of selling one pilot at a time.",
      },
      {
        name: "Support investor and buyer diligence",
        desc: "Prepare the commercial and technical case for a raise, a channel partnership or an acquisition.",
      },
    ],
    capabilities: [
      "Strategy & Innovation",
      "Financial Investments & New Venture Development",
    ],
    examples: [
      "Regrow",
      "CIBO",
      "Klim",
      "Habiterre",
      "Yard Stick",
      "EarthOptics",
      "Perennial",
      "Downforce Technologies",
      "Planet",
      "Satelligence",
      "Climate FieldView",
      "Bushel",
      "John Deere Operations Center",
      "Sourcemap",
      "Provenance",
      "BanQu",
      "HowGood",
      "Planet FWD",
      "Cool Farm Alliance / Cool Farm Tool",
      "Sphera",
      "Watershed",
      "Persefoni",
    ],
    note: "Treat vendor performance claims as self-reported until supported by appropriate evidence.",
  },
  {
    slug: "capital-providers",
    name: "Private Equity, Venture Capital & Impact Investors",
    node: "Capital providers, strategic investors, project finance partners, infrastructure investors, asset managers, institutional asset owners, sovereign investors, and impact funds that invest in food, agriculture, climate, nature, circular economy, and environmental market solutions.",
    opportunity:
      "Diligence in this sector fails on the same thing repeatedly: the environmental claim underwriting the business case is weaker than the model assumes. Capital able to test that claim early prices a risk the rest of the market is still discovering.",
    activities: [
      {
        name: "Map the market and build the thesis",
        desc: "Understand where value actually accrues along the chain before committing to where to play.",
      },
      {
        name: "Screen and qualify opportunities",
        desc: "Separate businesses with a defensible environmental claim from those with a well-marketed one.",
      },
      {
        name: "Run commercial and technical diligence",
        desc: "Test the methodology, the data and the route to market behind the revenue model.",
      },
      {
        name: "Plan value creation after the investment",
        desc: "Close the evidence, program and commercial gaps that limit what the asset can eventually be sold on.",
      },
      {
        name: "Design corporate-venture and portfolio strategy",
        desc: "Build the structure and the portfolio logic for investing across food, climate and nature.",
      },
    ],
    capabilities: [
      "Financial Investments & New Venture Development",
      "Strategy & Innovation",
    ],
    examples: [
      "Rabo Investments",
      "Paine Schwartz",
      "S2G Investments",
      "Astanor Ventures",
      "The Production Board",
      "AgFunder",
      "Acre Venture Partners",
      "Tenacious Ventures",
      "Fall Line Capital",
      "Flagship Pioneering",
      "TELUS Global Ventures",
      "KKR Global Impact",
      "TPG Rise Climate",
      "Generate Capital",
      "Nuveen Natural Capital",
      "Manulife Investment Management",
      "Climate Asset Management",
      "Temasek",
      "CalPERS",
    ],
    note: "Terra Nexus provides diligence and decision support, not regulated investment advice.",
  },
];
