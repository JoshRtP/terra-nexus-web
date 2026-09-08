// "Focus" content for the homepage's "How We Work" section
// (src/pages/index.astro#capabilities, Band 2). A company is either
// creating outcomes to sell (a project, or a product that carries the
// performance) or reducing and accounting for its own footprint (a
// corporate inventory) — the six lifecycle stages (see lifecycle.ts) are
// the same either way, but what each stage asks is not.
//
// Content provenance: copied from
// plans/content/homepage-sections-2026-09/homepage-content.js's `objects`
// and `objectViews` exports (approved prototype content). `label` (the
// column header shown above each card — Suppliers / Internal / Customers)
// is not present in that source file; it comes from the approved prototype
// markup (Terra Nexus Homepage.dc.html), which pairs id `project` with
// "Suppliers", `inventory` with "Internal", and `product` with "Customers".
export interface FocusObject {
  id: 'project' | 'inventory' | 'product';
  /** Eyebrow shown inside the focus card (e.g. "Value Chain Programs"). */
  name: string;
  /** Column header shown above the card (e.g. "Suppliers"). */
  label: string;
  short: string;
}

export const focusObjects: FocusObject[] = [
  { id: 'project', name: 'Value Chain Programs', label: 'Suppliers', short: 'Create verified outcomes upstream in the Scope 3 value chain' },
  { id: 'inventory', name: 'Corporate Inventory Improvements', label: 'Internal', short: 'Decarbonize your own Scope 1 and 2 footprint' },
  { id: 'product', name: 'Low Impact Products & Services', label: 'Customers', short: 'Sell a product carrying the performance characteristics buyers want' },
];

/** focusViews[objectId][stageId] -> one line describing what that stage asks for that object. */
export type FocusViews = Record<string, Record<string, string>>;

export const focusViews: FocusViews = {
  project: {
    evaluate: 'Whether a program of this type, in this geography, under this methodology, produces outcomes worth developing.',
    design: 'Methodology, boundary, participant terms, ownership of the outcome, and who gets paid for what.',
    build: 'Enrollment, data collection, MRV, quality control, and the record a verifier will have to reconstruct.',
    launch: 'First cohort through its first verification cycle, then expansion across acres, participants and geographies.',
    operate: 'Annual verification, issuance, participant management, and a ledger that holds up under audit.',
    commercialize: 'Sale, transfer or retirement of the outcome, and the price it clears at.',
  },
  inventory: {
    evaluate: 'Which reductions in your own operations are worth funding first, and which ones you will actually be able to count.',
    design: 'Accounting boundary, the abatement sequence, project economics, and how each reduction gets reported.',
    build: 'Metering, activity data, calculation methods, controls, and the record an assurance provider will test.',
    launch: 'First projects delivered and accounted, then rollout across sites, facilities and fleets.',
    operate: 'Recurring energy and activity data, reconciliation, inventory updates, and assurance readiness.',
    commercialize: 'Target progress, disclosure, and the customer, lender or investor value the reduction supports.',
  },
  product: {
    evaluate: 'Whether the performance can be attached to the product, and whether a customer pays for it once it is.',
    design: 'Specification, evidence requirements, allocation through processing, and the claim you intend to make.',
    build: 'Traceability, chain of custody, mass balance, and documentation that travels with the shipment.',
    launch: 'First qualified volumes, customer and verifier acceptance, then expansion across facilities and product lines.',
    operate: 'Ongoing qualification, sampling, batch records, and reporting to customers and regulators.',
    commercialize: 'Premium, contract terms, tax credit or regulatory value captured on the physical product.',
  },
};
