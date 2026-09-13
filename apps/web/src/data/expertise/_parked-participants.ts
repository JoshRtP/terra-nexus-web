// PARKED, NOT DELETED — the "Who We Support" participant band.
//
// The Regenerative Agriculture page used to render this as a SegmentSlider:
// seven participant types, each expanding to all five Terra Nexus capabilities
// with that capability's own real offering names. The expertise topic template
// (components/ExpertiseTopicPage.astro) has a fixed ten-section order that Josh
// set and that carries the argument, and there is no participant band in it —
// so this content has no home on a topic page as of 2026-09-12.
//
// It is kept here rather than deleted because the content itself was approved
// and may return on another page (a Who We Work With expansion is the obvious
// candidate). The capability links themselves did not disappear from the topic
// pages: section 06's functional-fit question cards each link to the relevant
// /capabilities/<slug>/ page.
//
// Provenance: lifted verbatim from the pre-template
// pages/expertise/regenerative-agriculture/index.astro. `offerings` are each
// capability's own top-level offering names, copied from that capability's own
// page, not paraphrased.
//
// Nothing imports this file today. That is intentional.

export interface ParkedCapability {
  name: string;
  href: string;
  offerings: string[];
}

export interface ParkedParticipant {
  title: string;
  description: string;
  image: string;
  note?: string;
}

export const parkedCapabilities: Record<string, ParkedCapability> = {
  strategy: {
    name: 'Strategy & Innovation',
    href: '/capabilities/strategy-and-innovation/',
    offerings: [
      'Corporate & Business Unit Strategy',
      'Market Entry & Competitive Strategy',
      'Business Model & Growth Strategy',
      'Customer Experience',
      'Product, Innovation & Design',
      'Sustainability & Climate Change Strategy',
    ],
  },
  investment: {
    name: 'Financial Investments & New Venture Development',
    href: '/capabilities/financial-investments-and-new-venture-development/',
    offerings: [
      'Financial Planning & Analysis',
      'Business Case & Initiative Prioritization',
      'Corporate Ventures',
      'Investor Due Diligence',
    ],
  },
  supplyChain: {
    name: 'Sustainable Supply Chain & Operations',
    href: '/capabilities/sustainable-supply-chain-and-operations/',
    offerings: [
      'Digital Supply Chain Strategy',
      'Value Chain Interventions (Influence-to-Impact)',
      'Responsible Sourcing & Procurement',
      'Resource Efficiency & Lean Operations',
      'Low Impact Logistics',
      'Joint Business Planning & Supply Chain Collaboration',
      'Circular Economy, Waste & Diversion',
    ],
  },
  corporateSustainability: {
    name: 'Corporate Sustainability',
    href: '/capabilities/corporate-sustainability/',
    offerings: [
      'Sustainability Strategy',
      'Measurement, Impact & Disclosure',
      'Stakeholder Engagement',
      'Building Purpose-Driven Products & Services',
      'Sustainable Supply Chain & Operations',
    ],
  },
  carbon: {
    name: 'Carbon & Ecosystem Services',
    href: '/capabilities/carbon-and-ecosystem-services/',
    offerings: [
      'VCM & Scope 3 Markets',
      'Commercialization Pathways',
      'Asset & Portfolio Valuation',
      'Pilot Development & Partner Selection',
      'Program Design & Operations',
      'Impact Verification & Claims Translation',
      'Full-Service GHG Accounting',
    ],
  },
};

/** Every participant showed all five capabilities, not a per-participant
 * subset: Terra Nexus can bring any of them to bear for any participant, and
 * singling some out as "not applicable" read as more definitive than intended. */
export const parkedParticipants: ParkedParticipant[] = [
  {
    title: 'Commodity Traders & Originators',
    description:
      'Identify attractive crops, geographies, customers, and supply sheds; assess whether to build, buy, partner, or participate; design regenerative commodity and environmental-attribute offerings; structure producer enrollment, incentives, evidence, and contracts; establish origination, aggregation, traceability, and chain-of-custody controls; model premiums, program costs, value sharing, and margin; select technology, agronomy, MRV, and assurance partners; manage data quality; prepare customer documentation, reporting, and audit packages; and scale programs across producers, locations, crops, and buyers.',
    image: 'https://images.pexels.com/photos/38514489/pexels-photo-38514489.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    title: 'Food, Beverage, Feed, Fiber & Consumer-Product Companies',
    description:
      'Sourcing strategy, supply-shed prioritization, supplier programs, Scope 3 and land-sector accounting, investment planning, product strategy, claims controls, and managed value-chain execution.',
    image: 'https://images.pexels.com/photos/15455017/pexels-photo-15455017.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    title: 'Agricultural Producers & Integrated Agricultural Companies',
    description:
      'Evaluate program opportunities, commercial structures, data and evidence requirements, partner choices, implementation burdens, and routes to market. Specialized agronomic recommendations are developed with qualified local experts.',
    image: 'https://images.pexels.com/photos/29474130/pexels-photo-29474130.jpeg?auto=compress&cs=tinysrgb&w=1200',
    note: 'Specialized agronomic recommendations are developed with qualified local experts.',
  },
  {
    title: 'Inputs Companies',
    description:
      'Connect input products, services, agronomy, producer programs, outcome measurement, channel strategy, customer partnerships, and credible product or program claims.',
    image: 'https://images.pexels.com/photos/17475325/pexels-photo-17475325.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    title: 'Ingredient & Feed Processors',
    description:
      'Supplier engagement, traceable sourcing, processing and allocation controls, customer reporting, product differentiation, and integration with broader sourcing or environmental programs.',
    image: 'https://images.pexels.com/photos/4487383/pexels-photo-4487383.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    title: 'Enabling Technology & Solution Providers',
    description:
      'Market strategy, customer discovery, methodology alignment, technology and model diligence, enterprise-program requirements, data architecture, pilot design, partner selection, and integration into real commodity and corporate workflows.',
    image: 'https://images.pexels.com/photos/5230957/pexels-photo-5230957.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    title: 'Investors & Environmental-Market Participants',
    description:
      'Market assessment, commercial and technical diligence, project or program economics, methodology review, value-creation planning, portfolio assessment, and operating-risk evaluation.',
    image: 'https://images.pexels.com/photos/9261334/pexels-photo-9261334.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
];
