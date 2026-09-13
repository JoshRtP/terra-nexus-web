// Corporate Sustainability — capability family record.
//
// PROVENANCE
//  * Every field below is lifted verbatim from
//    pages/capabilities/corporate-sustainability/index.astro — the `data` object that page
//    passed to CapabilityPage.astro since 2026-08-04 — moved here on
//    2026-09-13 so all five families share one shape and one index
//    (./index.ts), mirroring data/expertise/. No copy changed in the move.
//  * The page's previous `relatedExpertise` list is NOT carried over. It
//    named all nine expertise topics, and the same nine on all four
//    templated pages, so it distinguished nothing. Related topics are now
//    derived per family in ./index.ts from the expertise topics' own
//    section-06 team-to-capability mapping (`validationQuestions` in
//    data/expertise/shared.ts).
//  * Name, slug and the one-line summary come from `capabilityAreas` in
//    ../lifecycle.ts, merged in by ./index.ts.
//
// NEEDS OWNER REVIEW
//  * The derived related-expertise set is narrower than the previous
//    all-nine list — see `expertiseForCapability` in ./index.ts.
import type { CapabilityFamilyRecord } from './types';

export const corporateSustainability: CapabilityFamilyRecord = {
  eyebrow: 'Capabilities',
  title: 'Set Ambition, Prioritize Action, Account for Progress, and Report Credibly',
  lead: 'Terra Nexus helps sustainability, climate, and reporting leaders set enterprise ambition, prioritize action, account for progress, govern claims, engage stakeholders, and report performance — connecting sustainability strategy with operational reality.',
  primaryCta: { label: 'Discuss Your Sustainability Priorities', href: '/contact/' },
  secondaryCta: { label: 'Explore Our Expertise', href: '/expertise/' },
  metaTitle: 'Corporate Sustainability | Terra Nexus',
  metaDescription: 'Terra Nexus helps sustainability, climate, and reporting leaders set enterprise ambition, prioritize action, account for progress, govern claims, engage stakeholders, and report performance — connecting sustainability strategy with operational reality.',

  orientation: [
    'Corporate Sustainability addresses the enterprise-level decisions that determine how a company sets environmental and social goals, prioritizes action, measures progress, manages claims, engages stakeholders, and reports performance. This capability connects high-level ambition with the operational, accounting, and governance systems that make commitments credible.',
    'Sustainability strategy is not a standalone exercise. Goals set at the enterprise level must connect to sourcing decisions, product strategy, supply-chain operations, investment choices, and environmental-market participation. Claims made externally must be supportable by evidence, accounting, and controls. Reporting must satisfy multiple frameworks while remaining accurate and defensible.',
    'Terra Nexus helps clients build the complete system — from ambition and materiality through measurement, governance, claims control, and disclosure — so sustainability performance is strategic, measurable, and credible.',
  ],
  callout: 'Sustainability commitments are only as credible as the systems behind them. Terra Nexus helps clients connect ambition to action, evidence, accounting, and reporting so goals translate into defensible performance.',
  offerings: [
    {
      name: 'Sustainability Strategy',
      description: 'Align environmental and social impacts with business success by integrating sustainability into the core of corporate strategy and business operations.',
      subOfferings: [
        { name: 'Defining Corporate Ambition & Leadership', description: 'Set a clear sustainability vision and demonstrate leadership commitment, laying the foundation for transformative action.' },
        { name: 'Purpose-to-Profit Alignment', description: "Ensure sustainability is a key driver of business success by aligning the company's purpose with its profit-making mechanisms." },
        { name: 'Materiality Assessment', description: 'Identify and prioritize sustainability issues most significant to the business and stakeholders.' },
        { name: 'Performance Benchmarking & Best Practices', description: 'Compare current sustainability performance against peers and identify best practices for improvement.' },
        { name: 'Corporate Narrative & Comms Strategy', description: 'Develop an authentic and cohesive narrative for communicating achievements.' },
        { name: 'Opportunity Identification & Analytics', description: 'Utilize detailed company data to create a prioritized list of opportunities for delivering impact, growth, and efficiencies.' },
        { name: 'Goals, Targets, Commitments & Policies', description: 'Set clear, measurable sustainability goals and develop policies and commitments to achieve them.' },
        { name: 'Operating Model & Governance', description: 'Design an operating model and governance structure that defines decision authority, reporting lines, budgets, resourcing, and innovative funding mechanisms.' },
        { name: 'Roadmap & Action Plans', description: 'Create detailed action plans and roadmap to achieve sustainability goals, outlining specific steps, timelines, and responsibilities.' },
      ],
    },
    {
      name: 'Measurement, Impact & Disclosure',
      description: 'Quantify and report progress through transparent disclosure.',
      subOfferings: [
        { name: 'Climate Risk, Adaptation & Resilience', description: 'Assess climate-related risks and develop strategies for adaptation and resilience.' },
        { name: 'Risk Management & Mitigation Testing', description: 'Proactively manage risks and implement mitigation plans that involve key market influencers.' },
        { name: 'Verified Emissions Reduction & Carbon Asset Procurement', description: 'Identify and acquire high-quality carbon assets, energy credits, offsets, removals, and verified emission reductions, including insets.' },
        { name: 'On-Demand Disclosure — Third-Party Response', description: 'Utilize third party to sense and respond to ongoing inquiries, including documentation and scientific backing of market-facing programs and claims.' },
        { name: 'Product & Services Footprinting', description: 'Measure the environmental footprint of products and services using life cycle analysis and accepted GHG accounting estimates.' },
        { name: 'Corporate Reporting', description: 'Manage external reporting requirements and common frameworks.' },
      ],
    },
    {
      name: 'Stakeholder Engagement',
      description: 'Engage internal and external stakeholder groups.',
      subOfferings: [
        { name: 'External Stakeholder & Ecosystem Engagement', description: 'Build relationships and partnerships with external stakeholders to support sustainability objectives.' },
        { name: 'Internal Talent Engagement', description: 'Foster internal culture that engages employees and supports sustainability initiatives.' },
        { name: 'Leadership & Board Coaching', description: 'Provide coaching for leaders and boards to enhance understanding and governance.' },
      ],
    },
    {
      name: 'Building Purpose-Driven Products & Services',
      description: 'Commercialize sustainable products and services.',
      subOfferings: [
        { name: 'Market Entry & Competitive Strategy', description: 'Analyze market opportunities and the competitive landscape for new sustainable products.' },
        { name: 'New Game Business Models & Growth', description: 'Develop innovative business models for accelerated growth.' },
        { name: 'Customer Discovery, Acquisition, Experience & Retention', description: 'Enhance the connection between purpose-driven solutions and customers.' },
        { name: 'New Product Development', description: 'Incubate new, sustainable products from concept through launch, ensuring they meet market needs.' },
      ],
    },
    {
      name: 'Sustainable Supply Chain & Operations',
      description: 'Reduce cost and improve operational efficiencies by implementing sustainability in supply chain and operations.',
      subOfferings: [
        { name: 'Value Chain Interventions (Influence-to-Impact)', description: 'Create clear expectations for reducing environmental impact across the value chain.' },
        { name: 'Responsible Sourcing & Procurement', description: 'Increase resilience through ethical sourcing and procurement practices.' },
        { name: 'Resource Efficiency & Lean Operations', description: 'Optimize resource use and streamline operations to reduce waste and improve environmental performance.' },
        { name: 'Joint Business Planning & Supply Chain Collaboration', description: 'Collaborate with suppliers to improve overall supply chain performance.' },
        { name: 'Low Impact Logistics', description: 'Implement logistics and transportation strategies that minimize environmental impact.' },
        { name: 'Circular Economy, Waste & Diversion', description: 'Promote circular economy principles, reducing waste and encouraging the reuse and recycling of materials.' },
      ],
    },
  ],
  proofNote: 'The approved lower-emissions beef case study supports target-setting, Scope 3 accounting, claims governance, verification readiness, and reporting.',
  proofLink: { label: 'Read the Case Study', href: '/case-studies/' },
  ctaHeading: 'Discuss Your Sustainability Priorities',
  ctaBody: 'Tell us what you are committing to, measuring, or reporting.',
  ctaButton: { label: 'Discuss Your Sustainability Priorities', href: '/contact/' },
};
