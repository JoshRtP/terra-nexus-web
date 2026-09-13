// The Sustainability Chessboard — framework record for the framework viewer.
//
// PROVENANCE
//  * Structure and names (four strategies on a 2×2 of organisational
//    enablement against sustainability ambition, sixteen approaches, 64
//    levers) follow Kearney's published Sustainability Chessboard.
//  * Every description was written for Terra Nexus's own session tool,
//    not reproduced from Kearney's material. Generated 2026-09-13 from the
//    prototype's data module with no wording changed; this file is now
//    the source.
//  * No examples in the source; the detail panels show the levers only.
//
// The `attribution` paragraph below is rendered verbatim on the tool page
// and is for the owner to word.
import type { Framework } from './types';

export const sustainabilityChessboard: Framework = {
  slug: 'sustainability-chessboard',
  name: 'Sustainability Chessboard',
  shortName: 'Chessboard',
  eyebrow: 'Sustainability Framework',
  title: 'The Sustainability Chessboard',
  lead: 'Where a company sits on organisational enablement against sustainability ambition, and the sixteen approaches and 64 levers that move it. Open a quadrant, add levers to a play sheet, and print it for the session.',
  metaTitle: 'Sustainability Chessboard Framework Tool | Terra Nexus',
  metaDescription: 'Interactive Sustainability Chessboard: four strategies on a 2×2 of enablement against ambition, 16 approaches, 64 levers, and a printable play sheet.',
  intro: 'Four strategies on a 2×2 of organizational enablement against sustainability ambition. Each strategy holds four approaches, and each approach four levers — 64 in all.',
  labels: { group: 'quadrant', groupPlural: 'quadrants', type: 'approach', typePlural: 'approaches', tactic: 'lever', tacticPlural: 'levers' },
  layout: 'matrix',
  matrix: { xLabel: 'SUSTAINABILITY AMBITION', yLabel: 'ORGANIZATIONAL ENABLEMENT', xLow: 'Compliant', xHigh: 'Pioneering', yLow: 'Low', yHigh: 'High' },
  attribution: [
    'The Sustainability Chessboard, its four strategies, sixteen approaches and 64 levers are Kearney\'s framework. The descriptions on this page were written by Terra Nexus for use in sustainability strategy sessions.',
  ],
  categories: [
    { name: 'Leverage sustainability data', short: 'LEVERAGE DATA', cell: [0, 0], focus: 'Strong systems, limited ambition', blurb: 'Robust processes, defined roles and good analytics, without a strong sustainability commitment. The raw material of a future leader — held back by direction, not capability.', color: '#131F48' },
    { name: 'Lead sustainability innovation', short: 'LEAD INNOVATION', cell: [0, 1], focus: 'The pioneers', blurb: 'Ambition and system readiness in balance. These firms carry change beyond their own walls — to partners, peers, customers and regulation.', color: '#6A1B32' },
    { name: 'Ensure sustainability compliance', short: 'ENSURE COMPLIANCE', cell: [1, 0], focus: 'Sustainability as a hygiene factor', blurb: 'Minimum legal requirements met, value creation not attempted. The usual starting point — and the advice is to move up before moving right.', color: '#5C5C5C' },
    { name: 'Create value through sustainability', short: 'CREATE VALUE', cell: [1, 1], focus: 'High ambition, thin enablement', blurb: 'Publicly seen as leaders, internally short of data and systems to prove it. The quadrant where greenwashing accusations land.', color: '#5B6C5D' },
  ],
  types: [
    {
      id: 'holistic-data-governance',
      category: 'Leverage sustainability data',
      title: 'Holistic data governance',
      color: '#131F48',
      description: 'Getting sustainability data into one place, at a quality and granularity people can act on. Needs no sustainability ambition at all — which is exactly why it is such a strong enabler.',
      tactics: [
        { title: 'Holistic database', description: 'One company-wide store of processed sustainability KPIs, not raw feeds — the precondition for the advanced levers.' },
        { title: 'Sustainability risk management framework', description: 'A standing process for identifying sustainability risk and deciding whether to mitigate, insure, evade or accept it.' },
        { title: 'Sustainability data governance', description: 'Named ownership for collecting, cleaning, storing and analysing sustainability data.' },
        { title: 'Internal information sharing', description: 'Deliberate routines that move data across functions and break silo thinking.' },
      ],
    },
    {
      id: 'sustainability-data-integration',
      category: 'Leverage sustainability data',
      title: 'Sustainability data integration',
      color: '#22315E',
      description: 'Putting good data to work — in decisions, in scenario planning, and in the screening of the partners you take on.',
      tactics: [
        { title: 'Sustainability data application', description: 'Sustainability data used in scenario modelling and everyday decisions, not just by the sustainability team.' },
        { title: 'Sustainability due diligence', description: 'Partners pass a sustainability audit before a business relationship starts.' },
        { title: 'Advanced sustainability certification', description: 'Certifications well beyond ISO — B Corp, Cradle to Cradle — with graded achievement levels.' },
        { title: 'E2E sustainability footprint', description: 'Footprint tracked from raw material to end-consumer impact, including Scope 3 and social impact.' },
      ],
    },
    {
      id: 'data-driven-enablement',
      category: 'Leverage sustainability data',
      title: 'Data-driven sustainability enablement',
      color: '#334278',
      description: 'Sustainability metrics in business decisions without a sustainability agenda — kept for compliance and for spotting business risk.',
      tactics: [
        { title: 'Sustainability toolbox', description: 'The tools that capture data, assess supplier maturity and model scenarios — plus the methods and frameworks around them.' },
        { title: 'Routine sustainability reviews', description: 'Standardised reviews in the corporate calendar, run by a dedicated function rather than self-assessed.' },
        { title: 'Sustainability risk awareness', description: 'Sustainability checks in every decision maker\'s process, with risk raised bottom-up from operations.' },
        { title: 'Sustainability reporting', description: 'Structured, centralised reporting — GRI, CDP, science-based commitments — run like financial reporting.' },
      ],
    },
    {
      id: 'data-driven-collaboration',
      category: 'Leverage sustainability data',
      title: 'Data-driven collaboration',
      color: '#47558C',
      description: 'Costing the trade-offs internally and connecting the data outward to suppliers, so collaboration runs on facts rather than intent.',
      tactics: [
        { title: 'Supplier activation', description: 'Tier-1 transparency and joint work with strategic suppliers, starting where sustainability impact is largest.' },
        { title: 'Collaboration mindset', description: 'Sustainability problems solved across units and functions, with a framework that makes the commitment mutual.' },
        { title: 'Sustainability cost-impact calculation', description: 'Total cost of ownership for sustainability initiatives, including the cost of noncompliance versus the cost of compliance.' },
        { title: 'ESG TCO calculation', description: 'Costing extended to every step and to externalities, hard as some of them are to price.' },
      ],
    },
    {
      id: 'holistic-sustainability-thinking',
      category: 'Lead sustainability innovation',
      title: 'Holistic sustainability thinking',
      color: '#6A1B32',
      description: 'Data pulled from the whole organisation, opened to every function, and resolved into few enough KPIs for leadership to act on.',
      tactics: [
        { title: 'Value chain sustainability risk management', description: 'Risk identified and addressed up and downstream — your suppliers\' suppliers, your customers\' customers.' },
        { title: 'Sustainability data lake', description: 'Raw data from every department in one repository, for big-data analysis and pattern finding.' },
        { title: 'Product life-cycle sustainability tracking', description: 'Impact followed through sourcing, production, distribution, use, disposal and recycling.' },
        { title: 'Social ROI', description: 'A quantified return on social initiatives, so they can be compared and prioritised like any other spend.' },
      ],
    },
    {
      id: 'sustainability-innovation-driver',
      category: 'Lead sustainability innovation',
      title: 'Sustainability innovation driver',
      color: '#7E2B43',
      description: 'Frontrunners that use their systems and culture to shape their industry, not just their own performance.',
      tactics: [
        { title: 'Sustainability-enabling products', description: 'Products that make the customer more sustainable in use, not just responsibly made.' },
        { title: 'Value chain circularity', description: 'Circularity advocated and coordinated across every value-chain partner — the endgame position.' },
        { title: 'Sustainability educator', description: 'Advocacy and education aimed at regulators, industry and consumers — only credible once your own house is in order.' },
        { title: 'Holistic sustainability culture', description: 'Sustainability in the DNA of the organisation, with ownership and accountability at every level.' },
      ],
    },
    {
      id: 'cross-functional-ownership',
      category: 'Lead sustainability innovation',
      title: 'Cross-functional sustainability ownership',
      color: '#914756',
      description: 'Sustainability goals owned per unit and function, coordinated by a CSO, with shared KPIs across the interfaces.',
      tactics: [
        { title: 'Cross-functional integration', description: 'Clear ownership of targets across departments, with KPIs, metrics and goals held in common.' },
        { title: 'Partnership knowledge exchange', description: 'Partnerships deepened into data, technology and expert exchange — with care about what you share.' },
        { title: 'Value chain transparency', description: 'Visibility of sustainability effects from Tier 1 and beyond, through to how consumers use and discard the product.' },
        { title: 'Sustainability pricing', description: 'The true cost of sustainability carried into pricing strategy, backed by traceable input costs.' },
      ],
    },
    {
      id: 'circularity',
      category: 'Lead sustainability innovation',
      title: 'Circularity',
      color: '#A3616D',
      description: 'Products, portfolios and business models aligned to reduce, reuse and recycle — which only works with cross-departmental data and dedication.',
      tactics: [
        { title: 'Circular operations', description: 'Waste designed out of operations — reusable packaging, refurbishment, metal recovery, degradable materials.' },
        { title: 'Circular business models', description: 'Repair, take-back, secondhand and refill models, with the revenue consequences understood up front.' },
        { title: 'Sustainable product portfolio', description: 'Products that are sustainable in themselves or let the customer live more sustainably — screened against greenwashing risk.' },
        { title: 'Design for sustainability', description: 'Sustainability designed in from the first concept, where the design space is still open.' },
      ],
    },
    {
      id: 'data-collection',
      category: 'Ensure sustainability compliance',
      title: 'Data collection',
      color: '#3E3E3E',
      description: 'Knowing which data is actually needed for regulatory compliance, and which of it can realistically be produced.',
      tactics: [
        { title: 'Materiality assessment', description: 'The environmental and social topics that matter most to the business and its stakeholders — assessed both ways.' },
        { title: 'Sustainability benchmarking', description: 'Regular comparison against peers and best-in-class, as a trend barometer for the industry.' },
        { title: 'Sustainability baseline', description: 'The starting point — holistic, and the step most organisations skip before launching initiatives.' },
        { title: 'Basic sustainability certification', description: 'Common certifications (ISO 14001, FSC, Fairtrade, LEED) validated by an external body.' },
      ],
    },
    {
      id: 'data-driven-targets',
      category: 'Ensure sustainability compliance',
      title: 'Data-driven sustainability targets',
      color: '#4E4E4E',
      description: 'Transparency turned into unit-specific, quantifiable targets that reach past the regulatory floor.',
      tactics: [
        { title: 'Sustainability roadmap', description: 'The strategic document: which actions, funded how, owned by whom, and when.' },
        { title: 'Science-based targets', description: 'Scope 1, 2 and 3 targets on a timeline, monitored like any other corporate commitment.' },
        { title: 'Metrics database', description: 'A tracked, tool-integrated set of metrics with a defined chain of command around it.' },
        { title: 'Sustainability KPIs', description: 'Group, unit and function KPIs, gathered the same way every time so they compare over time.' },
      ],
    },
    {
      id: 'legal-compliance',
      category: 'Ensure sustainability compliance',
      title: 'Legal compliance',
      color: '#5C5C5C',
      description: 'Sustainability as a checkbox. Minimum requirements treated as hygiene, with no attempt at value creation — and no voice in shaping the rules.',
      tactics: [
        { title: 'Regulatory audits', description: 'Externally triggered audits and quality stamps, used to tick a box rather than to develop the organisation.' },
        { title: 'Code of conduct', description: 'The document that carries the company\'s minimum sustainability commitments to partners and staff.' },
        { title: 'Legal standards', description: 'The minimum national and international requirements the business has to meet, unit by unit.' },
        { title: 'Compliance training', description: 'Standard training that gets the legal requirements in front of the people who have to meet them.' },
      ],
    },
    {
      id: 'vision-and-goals',
      category: 'Ensure sustainability compliance',
      title: 'Vision and goals',
      color: '#6E6E6E',
      description: 'A stated commitment from the top, made tangible as company-wide goals and unit-level targets.',
      tactics: [
        { title: 'Sustainability vision', description: 'A stated view of why sustainability matters here and where the business intends to be in ten, twenty, thirty years.' },
        { title: 'Unit-specific sustainability goals', description: 'The corporate ambition translated into targets a unit or function can actually own.' },
        { title: 'C-suite commitment', description: 'Visible top-down commitment — without it the rest of the board stays theoretical.' },
        { title: 'Company-wide sustainability targets', description: 'Group-level targets that make the vision tangible before it is broken down.' },
      ],
    },
    {
      id: 'sustainability-entrepreneurship',
      category: 'Create value through sustainability',
      title: 'Sustainability entrepreneurship',
      color: '#3B4A3D',
      description: 'Setting the frame so sustainability arrives as a real metric in business discussion — then tapping champions inside and partners outside.',
      tactics: [
        { title: 'Sustainability business case', description: 'Business-case logic adjusted for long-term sustainability impact and the cost of inaction.' },
        { title: 'Sustainability partnership', description: 'A network of partners with shared vision, concrete measures and defined roles.' },
        { title: 'Trade-off guidelines', description: 'Stated decision priorities for when social, environmental and economic aims conflict.' },
        { title: 'Internal sustainability funding', description: 'A fund employees can apply to for sustainability ideas — good for innovation and for retention.' },
      ],
    },
    {
      id: 'sustainability-driven-incentives',
      category: 'Create value through sustainability',
      title: 'Sustainability-driven incentives',
      color: '#4B5C4E',
      description: 'Internal incentives and external positioning aligned to the sustainability agenda, with outside eyes to keep it honest.',
      tactics: [
        { title: 'External sustainability board', description: 'Outside experts as a sounding board on targets, activities and the annual report.' },
        { title: 'Brand positioning', description: 'Sustainability carried into brand position — only after due diligence, or the backlash is severe.' },
        { title: 'Sustainable initiatives', description: 'Deliberate external sponsorship of social and environmental initiatives, properly funded and owned.' },
        { title: 'Sustainability-linked compensation', description: 'Management pay tied to sustainability targets, including middle management.' },
      ],
    },
    {
      id: 'dedicated-sustainability-team',
      category: 'Create value through sustainability',
      title: 'Dedicated sustainability team',
      color: '#5B6C5D',
      description: 'The team that implements the vision — who it reports to, and how it deals with the world outside.',
      tactics: [
        { title: 'Regulatory exchange', description: 'A working relationship with regulators rather than a reactive one.' },
        { title: 'Chief sustainability officer', description: 'A named owner in the C-suite who can carry sustainability into leadership decisions.' },
        { title: 'Group sustainability team', description: 'The central team that implements the vision and grows with the journey.' },
        { title: 'Stakeholder dialogue', description: 'Structured conversation with the parties your operations affect.' },
      ],
    },
    {
      id: 'sustainability-knowledge-exchange',
      category: 'Create value through sustainability',
      title: 'Sustainability knowledge exchange',
      color: '#71836C',
      description: 'Structured, long-term exchange rather than ad hoc conversation — internally as training and coaching, externally with NGOs and stakeholders.',
      tactics: [
        { title: 'Sustainability committee', description: 'A standing body that takes knowledge exchange and stakeholder dialogue beyond ad hoc meetings.' },
        { title: 'Dedicated training curriculum', description: 'A real curriculum that spreads sustainability skills through the organisation.' },
        { title: 'NGO cooperation', description: 'Regular work with NGOs to test your position and build trust both ways.' },
        { title: 'Sustainability-driven standards', description: 'Sustainability built into the design of new standards and processes, so the default gets better.' },
      ],
    },
  ],
  starter: {
    name: 'compliance climb',
    note: 'Kearney\'s own advice for firms in the compliance quadrant: move up the enablement axis before widening ambition. This loads that first climb.',
    tactics: [
      'legal-compliance--regulatory-audits',
      'legal-compliance--code-of-conduct',
      'data-collection--sustainability-baseline',
      'data-collection--materiality-assessment',
      'data-driven-targets--metrics-database',
      'data-driven-targets--sustainability-kpis',
    ],
  },
};
