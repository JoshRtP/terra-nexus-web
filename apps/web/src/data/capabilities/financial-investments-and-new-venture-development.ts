// Financial Investments & New Venture Development — capability family record.
//
// PROVENANCE
//  * Every field below is lifted verbatim from
//    pages/capabilities/financial-investments-and-new-venture-development/index.astro — the `data` object that page
//    passed to CapabilityPage.astro since 2026-08-04 — moved here on
//    2026-09-13 so all five families share one shape and one index
//    (./index.ts), mirroring data/expertise/. No copy changed in the move.
//  * The page's previous `relatedExpertise` list is NOT carried over. It
//    named all nine expertise topics, and the same nine on all four
//    templated pages, so it distinguished nothing. Related topics are now
//    derived per family in ./index.ts from the expertise topics' own
//    section-06 team-to-capability mapping (`validationQuestions` in
//    data/expertise/shared.ts).
//  * `decisionOwners`, `coreQuestion` and `scopeBoundary` are from the
//    family's overview.md in knowledge/services/ (status: stable).
//  * Name, slug and the one-line summary come from `capabilityAreas` in
//    ../lifecycle.ts, merged in by ./index.ts.
//
// NEEDS OWNER REVIEW
//  * The derived related-expertise set is narrower than the previous
//    all-nine list — see `expertiseForCapability` in ./index.ts.
import type { CapabilityFamilyRecord } from './types';

export const financialInvestmentsAndNewVentureDevelopment: CapabilityFamilyRecord = {
  eyebrow: 'Capabilities',
  title: 'Screen, Fund, Structure, and Scale Food-and-Climate Opportunities',
  lead: 'Terra Nexus helps finance, venture, and corporate development leaders evaluate, structure, fund, and scale food, agriculture, climate, nature, and circularity investments — connecting commercial diligence with deep domain knowledge.',
  primaryCta: { label: 'Discuss Your Investment', href: '/contact/' },
  secondaryCta: { label: 'Explore Our Expertise', href: '/expertise/' },
  // 65 characters with the full family name; trimmed to 52 for the tab and
  // the result snippet. The h1 and every in-page use keep the full name.
  metaTitle: 'Investments & New Venture Development | Terra Nexus',
  metaDescription: 'Terra Nexus helps finance, venture, and corporate development leaders evaluate, structure, fund, and scale food, agriculture, climate, and nature deals.',

  // From knowledge/services/financial-investments-and-new-venture-development/overview.md (status: stable,
  // owner-sourced). Rendered since 2026-09-13; the pages had never shown
  // them although the service-page template requires them. Decision owners
  // are sentence-cased; the record lists them in lower case.
  decisionOwners: ['Finance', 'Corporate venture', 'Corporate development', 'Strategy', 'Investment committees', 'Private equity, venture, and impact investors'],
  coreQuestion: 'Which food-and-climate ideas, ventures, investments, assets, partnerships, or facilities should be screened, funded, incubated, acquired, or scaled?',
  scopeBoundary: 'Capital allocation, venture development, and diligence for food, agriculture, climate, nature, and circularity opportunities.',

  orientation: [
    'Financial Investments & New Venture Development addresses the capital allocation, venture development, and diligence decisions that food and agribusiness companies face when evaluating food-and-climate opportunities. This capability connects strategic direction with financial discipline — ensuring that ideas, ventures, assets, and partnerships are evaluated against both commercial returns and domain-specific risk.',
    'Investment decisions in this space require more than standard financial analysis. A food-and-climate venture may involve biological risk, regulatory uncertainty, supply-chain complexity, environmental-market dynamics, technology readiness, and stakeholder expectations that traditional diligence frameworks do not fully capture. Terra Nexus brings domain-specific technical, commercial, and operating knowledge into the investment process.',
    'Whether screening a new venture, structuring a project investment, evaluating an acquisition, building a corporate venture portfolio, or performing investor due diligence, Terra Nexus helps clients make confident capital decisions grounded in how food and climate systems actually work.',
  ],
  callout: 'Investment decisions in food and climate require domain-specific diligence. Terra Nexus connects financial analysis with technical, commercial, operational, and environmental-market expertise so capital decisions reflect the real risk and value drivers of the opportunity.',
  offerings: [
    {
      name: 'Financial Planning & Analysis',
      description: 'Implement strategic financial planning and analysis to guide budgeting, optimize profitability, and manage cash flow effectively.',
      subOfferings: [
        { name: 'Budgeting & Forecasting', description: 'Develop accurate budgets and forecasts to plan financial operations and anticipate future needs.' },
        { name: 'Profitability Analysis', description: 'Analyze product or service profitability to inform strategic decisions and drive financial success.' },
        { name: 'Cash Flow Management', description: 'Manage cash flow meticulously to ensure operational stability and financial health.' },
      ],
    },
    {
      name: 'Business Case & Initiative Prioritization',
      description: 'Evaluate and prioritize business initiatives and investments based on strategic value and potential returns.',
      subOfferings: [
        { name: 'Project Investment & Deal Structuring', description: 'Structure investments to increase viability and derisk project economics.' },
        { name: 'Investment Diversification', description: 'Diversify investments to mitigate risks and capitalize on opportunities across different markets or sectors.' },
        { name: 'Asset Allocation Models', description: 'Develop asset allocation models to optimize investment portfolios based on risk tolerance and financial objectives.' },
        { name: 'Return on Investment Analysis', description: 'Prioritize investments for maximum return.' },
      ],
    },
    {
      name: 'Corporate Ventures',
      description: 'Launch corporate venture initiatives for new markets, technologies, and strategic opportunities.',
      subOfferings: [
        { name: 'Identifying Strategic Focus Areas', description: 'Identify key strategic areas for venture investments.' },
        { name: 'Alignment with Corporate Strategy', description: 'Ensure venture initiatives align seamlessly with the overall corporate strategy and objectives.' },
        { name: 'Market Trend Analysis', description: 'Analyze market trends to inform the direction of venture initiatives and capitalize on emerging opportunities.' },
        { name: 'Innovation Ecosystem Mapping', description: 'Identify potential partners, investments, and collaboration opportunities across the innovation ecosystem.' },
        { name: 'CVC Strategy Development', description: 'Develop comprehensive corporate venture capital strategies to support innovation and strategic growth.' },
        { name: 'Designing CVC Fund Structures', description: 'Design fund structures for internal corporate venture capital programs.' },
        { name: 'Portfolio Strategy & Investment Thesis', description: 'Develop investment theses and portfolio strategies for CVC.' },
      ],
    },
    {
      name: 'Investor Due Diligence',
      description: 'Perform comprehensive due diligence on potential investments to assess financial, technical, and strategic fit.',
      subOfferings: [
        { name: 'Identifying Investment Opportunities', description: 'Identify and screen potential investment opportunities.' },
        { name: 'Financial, Technical & Strategic Diligence', description: 'Evaluate potential investments across financial, technical, and strategic dimensions.' },
        { name: 'Startup Valuation & Investment Terms', description: 'Assess exit opportunities, valuation, and terms for investment.' },
      ],
    },
  ],
  proofNote: 'The approved lower-emissions beef case study supports project economics, diligence frameworks, commercialization pathways, and value-creation planning.',
  proofLink: { label: 'Read the Case Study', href: '/case-studies/' },
  ctaHeading: 'Discuss Your Investment or Venture Opportunity',
  ctaBody: 'Tell us what you are evaluating, funding, or scaling.',
  ctaButton: { label: 'Discuss Your Investment', href: '/contact/' },
};
