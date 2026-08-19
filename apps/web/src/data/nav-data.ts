// Shared navigation data — Industries/Insights IA prototype
// (prototype/industries-insights-ia, 2026-08-17).
//
// Condensed menu-only copies of existing canonical content, so the mega
// menu doesn't hand-roll a 4th/5th copy of Expertise/Capabilities data.
// Titles and slugs here MUST match the canonical arrays in
// pages/expertise/index.astro and pages/capabilities/index.astro — this is
// a menu-scoped excerpt, not a new source of truth. Full descriptions and
// hero imagery stay on those pages.
//
// Industries (Producers/Buyers/Enablers) and the Insights grouping are new
// for this prototype — see CLAUDE.md's Industries/Insights IA brief.

export interface MenuItem {
  title: string;
  href: string;
  // Unused since the mega menu dropped item descriptions (owner feedback,
  // 2026-08-17) — kept optional rather than deleted so expertiseMenu/
  // capabilitiesMenu/insightsMenu's existing descriptions don't need
  // stripping, in case a denser menu treatment wants them back later.
  description?: string;
}

export const expertiseMenu: MenuItem[] = [
  { title: 'Regenerative Agriculture', href: '/expertise/regenerative-agriculture/', description: 'Crop-production systems, producer economics, and market value.' },
  { title: 'Regenerative Rangeland', href: '/expertise/regenerative-rangeland/', description: 'Resilient grazing and livestock systems.' },
  { title: 'Agroforestry', href: '/expertise/agroforestry/', description: 'Trees, crops, livestock, and long-term land value.' },
  { title: 'Aquaculture', href: '/expertise/aquaculture/', description: 'Aquatic production, traceability, and market access.' },
  { title: 'Biodiversity & Ecosystem Resilience', href: '/expertise/biodiversity-and-ecosystem-resilience/', description: 'Nature dependencies, risks, and opportunities.' },
  { title: 'Sustainable Supply Chains', href: '/expertise/sustainable-supply-chains/', description: 'Responsible production, sourcing, and traceability.' },
  { title: 'Low Carbon Energy & Biofuels', href: '/expertise/low-carbon-energy-and-biofuels/', description: 'Feedstock, carbon-intensity, and chain-of-custody.' },
  { title: 'Purpose-Driven Food Brands & Retailers', href: '/expertise/purpose-driven-food-brands-and-retailers/', description: 'Products, sourcing, and credible claims.' },
  { title: 'Food Waste: Prevention, Diversion & Recovery', href: '/expertise/food-waste-prevention-diversion-recovery/', description: 'Prevent loss, recover value, avoid waste.' },
];

export const capabilitiesMenu: MenuItem[] = [
  { title: 'Strategy & Innovation', href: '/capabilities/strategy-and-innovation/', description: 'Where to play, how to win, differentiated growth.' },
  { title: 'Financial Investments & New Venture Development', href: '/capabilities/financial-investments-and-new-venture-development/', description: 'Screen, fund, structure, and scale opportunities.' },
  { title: 'Sustainable Supply Chain & Operations', href: '/capabilities/sustainable-supply-chain-and-operations/', description: 'Reduce impact, risk, cost, and volatility.' },
  { title: 'Corporate Sustainability', href: '/capabilities/corporate-sustainability/', description: 'Ambition, action, accounting, and reporting.' },
  { title: 'Carbon & Ecosystem Services', href: '/capabilities/carbon-and-ecosystem-services/', description: 'Create, verify, and commercialize environmental assets.' },
];

export interface IndustryRole {
  key: 'producers' | 'buyers' | 'enablers';
  title: string;
  href: string;
  shortDescription: string;
  menuDescription: string;
}

// Menu display titles ("Developers & Producers" / "Buyers" / "Enabling
// Infrastructure") were renamed 2026-08-18 for the mega menu only — key,
// href, and shortDescription/menuDescription (used on the /industries/*
// pages themselves) intentionally kept as-is, matching how the Capabilities
// mega menu's "Markets & Claims" column rename didn't touch the underlying
// capability page content either.
export const industriesMenu: IndustryRole[] = [
  {
    key: 'producers',
    title: 'Developers & Producers',
    href: '/industries/producers/',
    shortDescription: 'Organizations that create, originate, quantify, certify, or supply environmentally differentiated products, verified outcomes, environmental attributes, and credible claims.',
    menuDescription: 'Organizations creating and supplying differentiated products, environmental outcomes, attributes, certifications, and claims.',
  },
  {
    key: 'buyers',
    title: 'Buyers',
    href: '/industries/buyers/',
    shortDescription: 'Organizations procuring and using differentiated products, verified environmental outcomes, attributes, certifications, and claims to achieve commercial, sustainability, and decarbonization objectives.',
    menuDescription: 'Organizations procuring and using those products and outcomes to meet commercial, sustainability, and decarbonization objectives.',
  },
  {
    key: 'enablers',
    title: 'Enabling Infrastructure',
    href: '/industries/enablers/',
    shortDescription: 'Technology, capital, markets, assurance, and specialized services that make environmental value creation and procurement possible at scale.',
    menuDescription: 'Technology, capital, markets, assurance, and services enabling the system.',
  },
];

export const insightsMenu: MenuItem[] = [
  { title: 'Blog', href: '/insights/', description: 'Current perspectives and practical analysis.' },
  { title: 'Research', href: '/insights/research/', description: 'Deeper research and technical analysis.' },
  { title: 'Case Studies', href: '/case-studies/', description: 'Applied examples of Terra Nexus work.' },
  { title: 'Digital Tools', href: '/digital-solutions/', description: 'Interactive tools, models, and applications.' },
];

// Value-chain segments — the Industries mega menu's second column. Titles
// and slugs (used as #anchors) MUST match the canonical Segment[] array in
// pages/who-we-work-with/food-and-agribusiness-value-chain/index.astro,
// where each segment card carries id={slug}.
export const valueChainMenu: MenuItem[] = [
  { title: 'Inputs Companies', href: '/who-we-work-with/food-and-agribusiness-value-chain/#inputs-companies' },
  { title: 'Agricultural Producers & Integrated Protein Companies', href: '/who-we-work-with/food-and-agribusiness-value-chain/#agricultural-producers' },
  { title: 'Commodity Traders', href: '/who-we-work-with/food-and-agribusiness-value-chain/#commodity-traders' },
  { title: 'Ingredient & Feed Processors', href: '/who-we-work-with/food-and-agribusiness-value-chain/#ingredient-feed-processors' },
  { title: 'Food & Beverage Companies', href: '/who-we-work-with/food-and-agribusiness-value-chain/#food-beverage-companies' },
  { title: 'Food Retail & Distribution', href: '/who-we-work-with/food-and-agribusiness-value-chain/#food-retail-distribution' },
  { title: 'Energy & Biofuels Refiners', href: '/who-we-work-with/food-and-agribusiness-value-chain/#energy-biofuels-refiners' },
  { title: 'Food Waste Prevention, Diversion & Recovery', href: '/who-we-work-with/food-and-agribusiness-value-chain/#food-waste-prevention-diversion-recovery' },
];

// Approach — the Capabilities mega menu's first column. Owner feedback
// (2026-08-18): the six individual stages read as too much for a menu
// column; collapsed to the one-line framing already used to describe the
// approach as a whole. Points at the Our Approach section on the
// standalone Capabilities page (no per-stage anchor exists).
export const approachMenu: MenuItem[] = [
  { title: 'Full Development Lifecycle', href: '/capabilities/#approach-heading' },
];

// Markets & Claims — the Capabilities mega menu's second column (renamed
// from "Claims", 2026-08-18). Mirrors the 4 market mechanisms on the
// Carbon & Ecosystem Services page's mechanism selector 1:1 (titles MUST
// match the `mechanisms` array in
// pages/capabilities/carbon-and-ecosystem-services/index.astro, in the
// same order), plus a 5th "Other Markets" catch-all. All five point at
// that capability page — no dedicated sub-pages exist yet.
export const claimsMenu: MenuItem[] = [
  { title: 'Carbon & Ecosystem Credits', href: '/capabilities/carbon-and-ecosystem-services/#mechanisms' },
  { title: 'Scope 3 & Insets', href: '/capabilities/carbon-and-ecosystem-services/#mechanisms' },
  { title: 'Product & Commodity Claims', href: '/capabilities/carbon-and-ecosystem-services/#mechanisms' },
  { title: 'Environmental Attribute Certificates', href: '/capabilities/carbon-and-ecosystem-services/#mechanisms' },
  { title: 'Other Markets', href: '/capabilities/carbon-and-ecosystem-services/#mechanisms' },
];
