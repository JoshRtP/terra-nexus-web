// Glossary of the terms the site uses without stopping to define them.
//
// Added 2026-09-13. The Expertise and Who We Work With sections both assume
// fluency in vocabulary that is genuinely specialist — "inset", "book-and-claim",
// "carbon intensity", "chain of custody", "additionality" all appear unglossed —
// which narrows who can actually read the site.
//
// PROVENANCE: definitions are written to match how this site already uses each
// term, drawn from the expertise topics' pathway `detail` text, the verification
// ladder in section 07, and `indicatorDefinitions` in data/expertise/shared.ts.
// They are deliberately descriptive rather than authoritative: where a term is
// contested in the market, the entry says so instead of picking a side.
//
// NEEDS OWNER REVIEW BEFORE PUBLISH — this is new copy, and several entries
// touch regulatory instruments whose detail dates quickly (45Z, LCFS, RIN).

export type GlossaryCategory =
  | 'Markets & instruments'
  | 'Evidence & assurance'
  | 'Accounting'
  | 'Production & sourcing';

export interface GlossaryTerm {
  term: string;
  slug: string;
  /** Expansions or common alternative names, shown beside the term. */
  also?: string[];
  definition: string;
  category: GlossaryCategory;
}

export const glossaryCategories: GlossaryCategory[] = [
  'Markets & instruments',
  'Evidence & assurance',
  'Accounting',
  'Production & sourcing',
];

export const glossary: GlossaryTerm[] = [
  // ── Markets & instruments ──
  {
    term: 'Carbon credit',
    slug: 'carbon-credit',
    definition:
      'A transferable unit representing one tonne of carbon dioxide equivalent reduced or removed, issued by a registry against a published methodology. The unit is only as good as the methodology behind it and the verification applied to it, which is why two credits with the same face value can be worth very different amounts.',
    category: 'Markets & instruments',
  },
  {
    term: 'Environmental attribute certificate',
    slug: 'environmental-attribute-certificate',
    also: ['EAC'],
    definition:
      'A certificate that carries an environmental property separately from the physical product it came from. Used where the physical supply cannot be kept separate — commingled grain, shared pipelines, pooled electricity — so the attribute travels on paper while the molecules travel as normal.',
    category: 'Markets & instruments',
  },
  {
    term: 'Inset',
    slug: 'inset',
    definition:
      'A reduction funded and claimed inside a company’s own value chain, rather than bought from outside it. The boundary is contested: what counts as "inside" depends on the accounting rules being applied, and the same field-level reduction cannot be claimed as both an inset and a credit.',
    category: 'Markets & instruments',
  },
  {
    term: 'Offset',
    slug: 'offset',
    definition:
      'A credit bought from outside a company’s value chain to compensate for emissions it has not reduced. Most product-level neutrality claims built on offsets have been curtailed by marketing rules in several major markets, which is why the distinction from an inset now matters commercially and not just technically.',
    category: 'Markets & instruments',
  },
  {
    term: 'Book-and-claim',
    slug: 'book-and-claim',
    definition:
      'A chain-of-custody model where the environmental attribute is decoupled from the physical product entirely and sold to a buyer who may never receive the material. It solves the problem of commingled supply, and it limits what the buyer may say: a book-and-claim attribute supports a sourcing claim, not a statement about the contents of a particular package.',
    category: 'Markets & instruments',
  },
  {
    term: 'Mass balance',
    slug: 'mass-balance',
    definition:
      'A chain-of-custody model that allows certified and uncertified material to mix physically, while tracking the certified proportion through the system so no more is sold than entered. The control that makes it credible is reconciliation; without it, over-allocation is the normal failure.',
    category: 'Markets & instruments',
  },
  {
    term: 'Registry',
    slug: 'registry',
    definition:
      'The system of record that issues units against a methodology, holds them in accounts, and retires them when they are used. Issuance, transfer and retirement all have to reconcile, or the same outcome can support two claims.',
    category: 'Markets & instruments',
  },
  {
    term: 'Low Carbon Fuel Standard',
    slug: 'low-carbon-fuel-standard',
    also: ['LCFS'],
    definition:
      'A state or provincial program that sets a declining carbon-intensity target for transport fuel and lets fuels below the target generate tradable credits. Programs differ by jurisdiction in how they model carbon intensity and what feedstocks qualify.',
    category: 'Markets & instruments',
  },
  {
    term: 'Section 45Z',
    slug: 'section-45z',
    definition:
      'A US federal tax credit for clean fuel production, calculated from the fuel’s carbon intensity. Its qualifying rules, model version and eligible feedstock origins have all moved since it took effect, so any specific figure should be checked against current guidance before it is relied on.',
    category: 'Markets & instruments',
  },
  {
    term: 'Renewable Identification Number',
    slug: 'renewable-identification-number',
    also: ['RIN'],
    definition:
      'The tradable compliance unit generated under the US Renewable Fuel Standard when qualifying renewable fuel is produced or imported. Obligated parties acquire and retire them to meet their volume obligations.',
    category: 'Markets & instruments',
  },

  // ── Evidence & assurance ──
  {
    term: 'MRV',
    slug: 'mrv',
    also: ['Measurement, reporting and verification'],
    definition:
      'The combined system for measuring an environmental outcome, reporting it consistently, and having it checked by someone independent. Programs are far more often constrained by their MRV than by the science of the intervention itself.',
    category: 'Evidence & assurance',
  },
  {
    term: 'Validation',
    slug: 'validation',
    definition:
      'An independent check, before a program runs, that its design and methodology are capable of producing what they claim. Distinct from verification, which happens afterwards and checks what actually occurred.',
    category: 'Evidence & assurance',
  },
  {
    term: 'Verification',
    slug: 'verification',
    definition:
      'An independent check that a reported outcome actually happened, against the methodology and evidence the program committed to. Readiness for it is a design property: it cannot usefully be added at the end.',
    category: 'Evidence & assurance',
  },
  {
    term: 'Chain of custody',
    slug: 'chain-of-custody',
    definition:
      'The records and controls that keep an environmental attribute attached to material as it moves, is stored, blended, processed and sold. Segregation, mass balance and book-and-claim are the three models, in descending order of physical strictness.',
    category: 'Evidence & assurance',
  },
  {
    term: 'Traceability',
    slug: 'traceability',
    definition:
      'The ability to connect a product back to where it came from and how it was produced. Commonly conflated with supplier attestation, which is a statement rather than a trace.',
    category: 'Evidence & assurance',
  },
  {
    term: 'Additionality',
    slug: 'additionality',
    definition:
      'Whether an outcome would have happened anyway without the program or the payment. It is the hardest property to demonstrate and the one most often challenged, because it requires an argument about a world that did not occur.',
    category: 'Evidence & assurance',
  },
  {
    term: 'Permanence',
    slug: 'permanence',
    also: ['Reversal'],
    definition:
      'How long a stored outcome stays stored, and what happens if it is released. Soil and biomass carbon can be reversed by a change of practice, a fire or a drought, so programs handle the risk with buffer pools, monitoring periods or discounting.',
    category: 'Evidence & assurance',
  },
  {
    term: 'Baseline',
    slug: 'baseline',
    definition:
      'The reference point an improvement is measured against. Most disputes about the size of a result are really disputes about the baseline, which is why stating it — and what it excluded — matters as much as the result.',
    category: 'Evidence & assurance',
  },

  // ── Accounting ──
  {
    term: 'Scope 1, 2 and 3',
    slug: 'scope-1-2-and-3',
    definition:
      'The three tiers of corporate greenhouse gas accounting: direct emissions from owned operations (1), purchased energy (2), and everything else across the value chain (3). For food and agriculture companies the great majority sits in Scope 3, upstream of anything they directly control.',
    category: 'Accounting',
  },
  {
    term: 'Carbon intensity',
    slug: 'carbon-intensity',
    also: ['CI'],
    definition:
      'Lifecycle emissions expressed per unit of output — per megajoule of fuel, per kilogram of product. In regulated fuel markets it is a priced number rather than a disclosure, which sets a much higher evidence bar than most environmental reporting.',
    category: 'Accounting',
  },
  {
    term: 'Life cycle assessment',
    slug: 'life-cycle-assessment',
    also: ['LCA'],
    definition:
      'A structured accounting of the environmental impacts of a product across its life, within a stated boundary. The boundary and the allocation rules do most of the work, so two studies of the same product can differ substantially and both be defensible.',
    category: 'Accounting',
  },
  {
    term: 'Product carbon footprint',
    slug: 'product-carbon-footprint',
    also: ['PCF'],
    definition:
      'The greenhouse gas emissions attributed to a single product across a defined boundary. Distinct from a corporate inventory, and the two rarely reconcile without deliberate effort.',
    category: 'Accounting',
  },
  {
    term: 'Allocation',
    slug: 'allocation',
    definition:
      'How the impacts of a shared process are divided between the products that come out of it — crushing a soybean yields oil and meal, and both carry a share. Allocation choices are a common source of results that look better than they are.',
    category: 'Accounting',
  },
  {
    term: 'Double counting',
    slug: 'double-counting',
    definition:
      'The same environmental outcome being claimed more than once — by the producer and the buyer, or in a fuel pathway and a corporate inventory at the same time. Preventing it is an allocation and record-keeping problem, settled before volume is contracted rather than after.',
    category: 'Accounting',
  },

  // ── Production & sourcing ──
  {
    term: 'Regenerative agriculture',
    slug: 'regenerative-agriculture',
    definition:
      'An outcomes-oriented approach to production focused on soil function, water, biodiversity and resilience, rather than a fixed list of practices. Because it is defined by outcomes, practice adoption alone does not demonstrate it.',
    category: 'Production & sourcing',
  },
  {
    term: 'Agroforestry',
    slug: 'agroforestry',
    definition:
      'Deliberately combining trees with crops or livestock on the same land, for shade, fodder, fruit, timber, soil protection or carbon. The long establishment period is the central commercial problem: costs land years before returns do.',
    category: 'Production & sourcing',
  },
  {
    term: 'Supply shed',
    slug: 'supply-shed',
    definition:
      'The geography a facility or buyer actually draws material from. Programs are designed against the supply shed rather than a whole country, because that is where enrolment, logistics and qualifying volume are genuinely determined.',
    category: 'Production & sourcing',
  },
  {
    term: 'Feedstock',
    slug: 'feedstock',
    definition:
      'The raw material converted into something else — grain into ethanol, fats and oils into renewable diesel, residues into biogas. In low-carbon fuels its origin and production method determine most of the finished fuel’s carbon intensity.',
    category: 'Production & sourcing',
  },
];
