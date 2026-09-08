// Lifecycle, capability and value-chain segment content for the homepage
// "How We Work" and "Who We Work With" sections.
// Stage names, capability slugs and segment names match the approved live site;
// the per-stage / per-segment detail is the reviewed prototype content.
export const roles = {
  "developer": {
    "id": "developer",
    "label": "As a Commercial Developer",
    "short": "Create and commercialize environmental value",
    "desc": "Develop, aggregate or supply a differentiated product, environmental outcome, credit, inset, certificate or other verified attribute."
  },
  "buyer": {
    "id": "buyer",
    "label": "As a Corporate Buyer",
    "short": "Procure and use environmental value",
    "desc": "Evaluate, procure, finance and use differentiated supply, Scope 3 outcomes, credits, certificates, claims or supplier programs."
  }
};

export const stages = [
  {
    "id": "evaluate",
    "n": "01",
    "title": "Evaluate the Opportunity",
   "description": "Decide where the next dollar goes before committing to a path. A real environmental opportunity still has to fit the company's footprint, its influence over suppliers, what customers require, where the accounting boundary sits, and what the organization can actually execute.",
    "short": "Evaluate",
    "core": "Where can the company create the most useful combination of environmental and commercial value?",
    "developer": "Find where to create a product, outcome, credit, certificate or differentiated supply that customers will actually buy.",
    "buyer": "Compare internal investments, supplier programs, differentiated supply, credits and attributes based on what the company can actually use."
  },
  {
    "id": "design",
    "n": "02",
    "title": "Design the Structure & Value Architecture",
   "description": "Settle how the value is created, who owns it, and how it moves. Methodology, boundary, participant terms, ownership, commercial model and route to market all get decided together, because changing one of them later forces the others to change with it.",
    "short": "Design",
    "core": "What should change, who has to act, and how should value move through the system?",
    "developer": "Design supply, participant economics, evidence and a commercial product that can be contracted, delivered and monetized.",
    "buyer": "Design the procurement or supplier program around the company's accounting use, sourcing needs, quality threshold and willingness to pay."
  },
  {
    "id": "build",
    "n": "03",
    "title": "Build the Operating & Evidence Infrastructure",
   "description": "Stand up the system that makes the outcome usable and audit-ready. A methodology on its own does not operate a program. Data, MRV, chain of custody, allocation, contracts and controls have to work together from the participant all the way through to the final customer.",
    "short": "Build",
    "core": "What has to exist for the environmental result, transaction and claim to hold up?",
    "developer": "Build enrollment, MRV, custody, issuance, ownership and buyer-delivery infrastructure that can support a sale.",
    "buyer": "Build procurement controls, evidence intake, allocation, accounting and claims governance that can support use of the result."
  },
  {
    "id": "launch",
    "n": "04",
    "title": "Launch & Scale",
   "description": "Prove the program with a first cohort, then expand without breaking what worked. Pilot performance, verification cycles and partner economics all get tested before volume, geographies, participants or product lines are added.",
    "short": "Scale",
    "core": "Can participants deliver, can evidence move, can the buyer use it, and do the economics still work?",
    "developer": "Recruit supply, deliver the first product or outcome and prove that the commercial proposition survives real operating costs.",
    "buyer": "Pilot procurement or investment, integrate the result into internal processes and test whether it can be accounted for or claimed as intended."
  },
  {
    "id": "operate",
    "n": "05",
    "title": "Operate, Verify & Improve",
   "description": "Run the program as a recurring operation with an owner, a calendar and a budget. Verification cycles, participant management, reconciliation and improvement continue year over year, with the ledger and evidence maintained so results still hold up long after the first sale.",
    "short": "Operate",
    "core": "How do we deliver repeatedly without letting cost, evidence quality, partner performance or claim integrity drift?",
    "developer": "Operate supply, evidence, issuance, buyer delivery, producer payments and partner performance as a repeatable commercial program.",
    "buyer": "Monitor suppliers, reconcile results, govern claims and manage portfolio quality, delivery and ongoing value."
  },
  {
    "id": "commercialize",
    "n": "06",
    "title": "Connect Performance to Specific Claims & Market Value",
   "description": "Convert verified performance into the specific claim, credit, premium or incentive it supports. This step closes the loop by connecting performance back to the original opportunity, driving continuous improvement toward best-in-class performance and profitability.",
    "short": "Claim",
    "core": "What can the customer count, claim, sell, retire or otherwise use, and what is that use worth?",
    "developer": "Sell or contract the product, outcome, credit, certificate or differentiated supply into the buyer use that creates the most value.",
    "buyer": "Use the result in Scope 3, procurement, products, targets, regulation, retirement or customer propositions without overstating what the evidence supports."
  }
];

export const capabilities = [
  {
    "slug": "strategy-and-innovation",
    "title": "Strategy & Innovation",
    "tag": "Where to play and how to win",
    "byStage": {
      "evaluate": [
        "Market and customer landscape",
        "Strategic opportunity prioritization",
        "Growth and differentiation thesis"
      ],
      "design": [
        "Business-model architecture",
        "Customer proposition and route to market",
        "Portfolio and partner strategy"
      ],
      "build": [
        "Commercial requirements translated into controls",
        "Customer documentation design",
        "Operating governance"
      ],
      "launch": [
        "Pilot success criteria",
        "Go-to-market and customer learning",
        "Expansion roadmap"
      ],
      "operate": [
        "Performance reviews",
        "Commercial optimization",
        "Program evolution"
      ],
      "commercialize": [
        "Pricing and proposition",
        "Market selection",
        "Portfolio optimization"
      ]
    }
  },
  {
    "slug": "financial-investments-and-new-venture-development",
    "title": "Financial Investments & New Venture Development",
    "tag": "Value, fund and structure",
    "byStage": {
      "evaluate": [
        "Investment and transaction diligence",
        "Valuation and scenario analysis",
        "Capital-allocation case"
      ],
      "design": [
        "Capital stack and transition finance",
        "Offtake and commercial structuring",
        "Risk allocation"
      ],
      "build": [
        "Financial controls and funding milestones",
        "Contract economics",
        "Investment governance"
      ],
      "launch": [
        "Pilot funding and deployment capital",
        "Partner economics",
        "Scale financing"
      ],
      "operate": [
        "Unit economics and margin monitoring",
        "Funding / contract performance",
        "Investment performance"
      ],
      "commercialize": [
        "Revenue model and transaction economics",
        "Offtake / buyer structure",
        "Value-sharing and monetization"
      ]
    }
  },
  {
    "slug": "sustainable-supply-chain-and-operations",
    "title": "Sustainable Supply Chain & Operations",
    "tag": "Change what is sourced and how it moves",
    "byStage": {
      "evaluate": [
        "Supply-shed and sourcing analysis",
        "Operational baseline",
        "Supplier opportunity screen"
      ],
      "design": [
        "Supplier / producer proposition",
        "Procurement and sourcing architecture",
        "Operational workflows"
      ],
      "build": [
        "Traceability and chain of custody",
        "Participant workflows",
        "Data handoffs and operating controls"
      ],
      "launch": [
        "Supplier onboarding",
        "Implementation planning",
        "Partner coordination"
      ],
      "operate": [
        "Recurring supplier workflows",
        "Partner / vendor management",
        "Exceptions and reconciliation"
      ],
      "commercialize": [
        "Product and sourcing connection",
        "Customer delivery requirements",
        "Attribute flow through the supply chain"
      ]
    }
  },
  {
    "slug": "corporate-sustainability",
    "title": "Corporate Sustainability",
    "tag": "Connect action to enterprise use",
    "byStage": {
      "evaluate": [
        "Target and inventory alignment",
        "Materiality and prioritization",
        "Accounting-use screen"
      ],
      "design": [
        "Governance and decision rights",
        "Target contribution and claims boundaries",
        "Supplier-program requirements"
      ],
      "build": [
        "Inventory and reporting controls",
        "Claims governance",
        "Data and evidence requirements"
      ],
      "launch": [
        "Internal stakeholder integration",
        "First accounting / reporting use",
        "Governance test"
      ],
      "operate": [
        "Recurring reporting and reconciliation",
        "Claims oversight",
        "Audit support"
      ],
      "commercialize": [
        "Scope 3 / inset accounting",
        "Certification and sourcing claims",
        "Product claims"
      ]
    }
  },
  {
    "slug": "carbon-and-ecosystem-services",
    "title": "Carbon & Ecosystem Services",
    "tag": "Quantify, verify and commercialize environmental value",
    "byStage": {
      "evaluate": [
        "Protocol / methodology screen",
        "Credit, inset and EAC quality diligence",
        "Environmental-market alternatives"
      ],
      "design": [
        "Methodology and project architecture",
        "MRV and quantification strategy",
        "Environmental-asset ownership"
      ],
      "build": [
        "MRV, modeling and sampling",
        "Verification / validation preparation",
        "Registry and attribute ledgers"
      ],
      "launch": [
        "First quantification cycle",
        "First verification / assurance event",
        "Registry / buyer delivery test"
      ],
      "operate": [
        "Monitoring and recalculation",
        "Verification management",
        "Issuance / retirement controls"
      ],
      "commercialize": [
        "Credit / inset / EAC market strategy",
        "Pricing and transaction support",
        "Buyer quality package"
      ]
    }
  }
];

export const segments = [
  {
    "slug": "inputs-companies",
    "name": "Inputs Companies",
    "internal": "Manufacturing efficiency, raw-material sourcing, energy, water, logistics and product footprint.",
    "upstream": "Supplier requirements for raw materials, chemicals, biological inputs, feed ingredients and manufacturing inputs.",
    "downstream": "Products whose environmental value occurs at the farm or ranch, such as nutrient-efficiency tools, biologicals and methane-reduction technologies.",
    "developer": {
      "cell": "Commercialize products whose environmental value occurs downstream.",
      "objective": "Grow sales and differentiation by proving that an input or technology creates valuable environmental performance for customers and their downstream buyers.",
      "proof": "Efficacy, fit-for-place use, baseline, environmental outcome and a credible connection between product use and the downstream claim.",
      "markets": "Product claims · Scope 3 supplier programs · Low-carbon products · Eligible environmental assets",
      "help": "Terra Nexus connects technical efficacy to customer economics, downstream accounting, incentives, claims and routes to market so the party buying the input has a reason to adopt it."
    },
    "buyer": {
      "cell": "Improve the footprint and resilience of what the company buys.",
      "objective": "Reduce enterprise or product footprint through lower-impact raw materials, energy, packaging, logistics or suppliers.",
      "proof": "Supplier data, product footprints, chain of custody, procurement specifications and claims boundaries.",
      "markets": "Responsible sourcing · Product footprints · Scope 3 · Supplier interventions",
      "help": "Terra Nexus screens supply options, builds procurement criteria, validates supplier claims and connects improvements to enterprise or product accounting."
    }
  },
  {
    "slug": "agricultural-producers",
    "name": "Agricultural Producers & Integrated Protein Companies",
    "internal": "Land, feed, fertilizer, herd, energy, water, genetics, equipment and production management.",
    "upstream": "Feed, fertilizer, seed, technology, genetics, contractors, infrastructure and capital.",
    "downstream": "Differentiated crops, beef, dairy, protein, environmental outcomes and attributes.",
    "developer": {
      "cell": "Create the physical outcome and supply differentiated products or attributes.",
      "objective": "Implement production changes that improve ranch or farm economics while producing something downstream buyers are willing to value.",
      "proof": "Practice or outcome evidence, field / ranch linkage, product connection, ownership and qualification under the chosen claim or methodology.",
      "markets": "Regenerative products · Scope 3 · Low-CI commodities · Credits · Certificates",
      "help": "Terra Nexus designs fit-for-place interventions, producer economics, evidence, contracts and buyer pathways that make adoption rational."
    },
    "buyer": {
      "cell": "Buy inputs, technology and services that improve production performance.",
      "objective": "Choose feed, seed, fertilizer, equipment, technology, energy or services that improve economics, resilience or environmental performance.",
      "proof": "Operational fit, performance evidence, ROI, compatibility with buyer programs and any resulting claims.",
      "markets": "Supplier programs · Low-carbon production · Product differentiation",
      "help": "Terra Nexus evaluates solutions, economics, claims and downstream value so the producer is not asked to absorb cost for value captured elsewhere."
    }
  },
  {
    "slug": "commodity-traders",
    "name": "Commodity Traders",
    "internal": "Terminals, freight, storage, inventory, energy, working capital and operational efficiency.",
    "upstream": "Producer programs, sourcing regions, incentives, origination, aggregation and traceability.",
    "downstream": "Differentiated commodities, Scope 3 outcomes, low-CI feedstocks, environmental assets and customer programs.",
    "developer": {
      "cell": "Originate and commercialize differentiated commodities, outcomes and environmental assets.",
      "objective": "Turn producer access and origination infrastructure into new products and attributes that solve specific customer needs.",
      "proof": "Producer eligibility, aggregation, MRV, chain of custody, allocation, rights and buyer-specific claim requirements.",
      "markets": "Regenerative commodities · Scope 3 · Low-CI feedstocks · Credits · EACs",
      "help": "Terra Nexus helps decide what to originate, where, under which evidence architecture, for which buyers, with what custody model and at what economics."
    },
    "buyer": {
      "cell": "Procure lower-impact supply and environmental value for the enterprise or customers.",
      "objective": "Buy differentiated supply, credits or attributes at the right quality and price while preserving the ability to use or resell the environmental value.",
      "proof": "Developer / supplier diligence, eligibility, rights, chain of custody, accounting treatment and claim restrictions.",
      "markets": "Scope 3 · Credits · Certified supply · Low-CI commodities · EACs",
      "help": "Terra Nexus supports diligence, procurement specifications, pricing, portfolio design, claim eligibility and transaction controls."
    }
  },
  {
    "slug": "ingredient-feed-processors",
    "name": "Ingredient & Feed Processors",
    "internal": "Plant energy, water, waste, throughput, process yield, byproducts and product footprint.",
    "upstream": "Feedstocks, commodities, ingredients, supplier data and lower-impact sourcing.",
    "downstream": "Lower-carbon ingredients, feed, product footprints, customer specifications and claims.",
    "developer": {
      "cell": "Create lower-footprint ingredients, feed and customer-ready products.",
      "objective": "Use sourcing, formulation and plant performance to build differentiated offerings customers can value and substantiate.",
      "proof": "Product footprint, allocation, ingredient / feed data, chain of custody, certification and customer claim rules.",
      "markets": "Low-carbon ingredients · Feed claims · Product footprints · Scope 3 · Certified products",
      "help": "Terra Nexus links sourcing, operations, LCA / footprinting, custody and commercialization into a defensible product proposition."
    },
    "buyer": {
      "cell": "Source differentiated feedstocks, commodities and environmental attributes.",
      "objective": "Reduce product or enterprise footprint and meet customer specifications through upstream procurement.",
      "proof": "Supplier eligibility, CI / footprint data, custody, allocation, contract rights and audit-ready records.",
      "markets": "Low-CI feedstocks · Scope 3 · Certified commodities · EACs",
      "help": "Terra Nexus evaluates sourcing options, supplier programs, evidence quality and the economics of alternative procurement pathways."
    }
  },
  {
    "slug": "food-beverage-companies",
    "name": "Food & Beverage Companies",
    "internal": "Manufacturing, energy, packaging, logistics, waste, product formulation and portfolio decisions.",
    "upstream": "Supplier programs, regenerative sourcing, lower-carbon ingredients, value-chain investments and procurement standards.",
    "downstream": "Product claims, brand propositions, customer commitments, pricing and new products.",
    "developer": {
      "cell": "Build supplier programs, differentiated products and environmental outcomes.",
      "objective": "Create products or programs that connect upstream environmental performance to brand, customer or corporate value.",
      "proof": "Supplier evidence, product connection, allocation, certification, footprinting and claims substantiation.",
      "markets": "Regenerative products · Low-carbon products · Scope 3 · Product claims",
      "help": "Terra Nexus designs supplier economics, evidence, product architecture, pricing and claims so upstream performance becomes a usable commercial proposition."
    },
    "buyer": {
      "cell": "Procure credible supply, Scope 3 outcomes, credits and attributes.",
      "objective": "Meet climate, sourcing, product and customer objectives with assets or supply that are credible, usable and cost-effective.",
      "proof": "Supplier / developer diligence, inventory eligibility, ownership, allocation, quality, claim rules and audit documentation.",
      "markets": "Scope 3 · Credits · Certified supply · EACs · Responsible sourcing",
      "help": "Terra Nexus compares internal and value-chain alternatives, conducts diligence, designs procurement and ensures the result can enter the intended accounting or claim."
    }
  },
  {
    "slug": "food-retail-distribution",
    "name": "Food Retail & Distribution",
    "internal": "Stores, refrigeration, warehouses, logistics, fleet, packaging and food waste.",
    "upstream": "Category strategy, private label, sourcing standards, supplier investment and value-chain interventions.",
    "downstream": "Premium assortment, private-label differentiation, customer propositions and claims.",
    "developer": {
      "cell": "Create private-label and category programs that carry environmental value.",
      "objective": "Turn upstream improvements into products, assortments and customer propositions that can create margin, loyalty or category leadership.",
      "proof": "Supplier qualification, product / category connection, certification, footprint data and consumer-claim substantiation.",
      "markets": "Regenerative products · Low-carbon products · Sourcing claims · Private label",
      "help": "Terra Nexus connects upstream program design to category economics, product positioning, evidence and claims."
    },
    "buyer": {
      "cell": "Fund and procure environmental performance across the supply chain.",
      "objective": "Choose where to invest for Scope 3, sourcing, resilience or product objectives when most impact occurs outside retailer operations.",
      "proof": "Value-chain connection, supplier performance, allocation, inventory use, credit quality, sourcing evidence and claim rights.",
      "markets": "Scope 3 · Certified supply · Credits · EACs · Responsible sourcing",
      "help": "Terra Nexus compares internal and upstream investments, evaluates assets and supplier programs, and determines which results the retailer can actually use."
    }
  },
  {
    "slug": "energy-biofuels-refiners",
    "name": "Energy & Biofuels Refiners",
    "internal": "Process energy, heat, power, yield, carbon capture, logistics and facility CI.",
    "upstream": "Feedstock CI, farm practices, origination, chain of custody and supplier data.",
    "downstream": "Lower-CI fuels, certificates, regulatory value, product claims and customer value.",
    "developer": {
      "cell": "Produce and commercialize lower-CI fuels, feedstock attributes and environmental products.",
      "objective": "Combine facility and feedstock interventions to create products with better CI and higher regulatory or customer value.",
      "proof": "CI model, eligible feedstock, custody, facility data, verification, regulatory documentation and claim boundaries.",
      "markets": "Low-CI fuels · Fuel attributes · Regulatory incentives · EACs",
      "help": "Terra Nexus connects CI strategy, feedstock sourcing, program design, evidence and commercialization across the full fuel pathway."
    },
    "buyer": {
      "cell": "Procure lower-CI feedstocks, RNG, attributes and environmental outcomes.",
      "objective": "Lower product CI or meet regulatory / customer requirements by buying the most cost-effective qualified upstream inputs and attributes.",
      "proof": "Feedstock eligibility, CI values, supplier records, chain of custody, verification and regulatory treatment.",
      "markets": "Low-CI feedstocks · EACs · RNG attributes · Scope 3 · Credits",
      "help": "Terra Nexus evaluates feedstock and attribute options, pricing, custody, supplier programs and audit readiness."
    }
  },
  {
    "slug": "food-waste-prevention-diversion-recovery",
    "name": "Food Waste Prevention, Diversion & Recovery",
    "internal": "Prevention, inventory, yield, disposal, collection, processing and recovery operations.",
    "upstream": "Packaging, specifications, supply planning and material inputs.",
    "downstream": "Secondary products, feedstocks, food rescue, energy, compost, credits and recovered-resource markets.",
    "developer": {
      "cell": "Create new products, feedstocks, energy and environmental value from material flows.",
      "objective": "Move waste and byproducts into higher-value uses with credible economics and measurable environmental benefits.",
      "proof": "Material flow, additional processing, product specifications, environmental calculation and customer / market requirements.",
      "markets": "Secondary products · Feedstocks · Energy · Credits · Circularity claims",
      "help": "Terra Nexus evaluates pathways, technologies, partners and end markets to identify the highest practical commercial use."
    },
    "buyer": {
      "cell": "Procure technology, services and outlets that improve recovery economics.",
      "objective": "Reduce cost, waste and environmental impact by choosing the right prevention, diversion and recovery partners.",
      "proof": "Material volumes, operating performance, destination, environmental benefit and claims substantiation.",
      "markets": "Waste reduction · Circularity · Scope 3 · Resource-efficiency claims",
      "help": "Terra Nexus supports vendor diligence, business cases, contracting, measurement and claims."
    }
  }
];
