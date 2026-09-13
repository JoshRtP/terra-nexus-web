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

import { marketMechanisms } from './market-mechanisms';

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
    href: '/who-we-work-with/#producers',
    shortDescription: 'Organizations that create, originate, quantify, certify, or supply environmentally differentiated products, verified outcomes, environmental attributes, and credible claims.',
    menuDescription: 'Organizations creating and supplying differentiated products, environmental outcomes, attributes, certifications, and claims.',
  },
  {
    key: 'buyers',
    title: 'Buyers',
    href: '/who-we-work-with/#buyers',
    shortDescription: 'Organizations procuring and using differentiated products, verified environmental outcomes, attributes, certifications, and claims to achieve commercial, sustainability, and decarbonization objectives.',
    menuDescription: 'Organizations procuring and using those products and outcomes to meet commercial, sustainability, and decarbonization objectives.',
  },
  {
    key: 'enablers',
    title: 'Enabling Infrastructure',
    href: '/who-we-work-with/#enablers',
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
  { title: 'Inputs Companies', href: '/who-we-work-with/#inputs-companies' },
  { title: 'Agricultural Producers & Integrated Protein Companies', href: '/who-we-work-with/#agricultural-producers' },
  { title: 'Commodity Traders', href: '/who-we-work-with/#commodity-traders' },
  { title: 'Ingredient & Feed Processors', href: '/who-we-work-with/#ingredient-feed-processors' },
  { title: 'Food & Beverage Companies', href: '/who-we-work-with/#food-beverage-companies' },
  { title: 'Food Retail & Distribution', href: '/who-we-work-with/#food-retail-distribution' },
  { title: 'Energy & Biofuels Refiners', href: '/who-we-work-with/#energy-biofuels-refiners' },
  { title: 'Food Waste Prevention, Diversion & Recovery', href: '/who-we-work-with/#food-waste-prevention-diversion-recovery' },
];

// Approach — the Capabilities mega menu's first column. Owner feedback
// (2026-08-18): the six individual stages read as too much for a menu
// column; collapsed to the one-line framing already used to describe the
// approach as a whole. Points at the hub's approach section, which since
// the 2026-09-13 rebuild carries all six stages at depth (each stage also
// has its own `#stage-<id>` anchor should the menu ever want them back).
export const approachMenu: MenuItem[] = [
  { title: 'Full Development Lifecycle', href: '/capabilities/#approach' },
];

// Markets & Claims — the Capabilities mega menu's second column (renamed
// from "Claims", 2026-08-18). One entry per market mechanism, deep-linking
// to that mechanism's own id on the Carbon & Ecosystem Services page:
// MechanismSelector reads the URL hash on load and selects the matching
// card, so each link lands with its mechanism open rather than on the
// section top. Until 2026-09-13 all five entries pointed at the one
// `#mechanisms` anchor (finding F4, a launch blocker), and the fifth,
// "Other Markets", was dropped then: it had no content anywhere on the
// site to land on (owner decision, 2026-09-13).
//
// Derived from data/market-mechanisms.ts rather than retyped so the menu
// cannot disagree with the selector on names, order or ids.
export const claimsMenu: MenuItem[] = marketMechanisms.map((m) => ({
  title: m.title,
  href: `/capabilities/carbon-and-ecosystem-services/#${m.id}`,
}));
