// What each of the six lifecycle stages covers, as the /capabilities/ hub
// lists it. Keyed by stage id from ../lifecycle.ts so the stage number,
// title and description render from the same record the homepage Approach
// band and every expertise topic use.
//
// PROVENANCE
//  * The six bullet lists are lifted verbatim from the `workstreams` array
//    that pages/capabilities/index.astro carried from 2026-08-09 (commit
//    82e9c8c, generalised from the regenerative agriculture and rangeland
//    expertise pages' six-stage workstreams). Only the keys changed.
//  * The array's own stage TITLES are dropped, not moved: four of the six
//    disagreed with `stages` in ../lifecycle.ts ("Design the Program" vs
//    "Design the Structure & Value Architecture", "Manage Client-Owned
//    Programs" vs "Operate, Verify & Improve", and so on), so the firm's
//    method was named one way on the homepage and every expertise topic and
//    another way on the page whose job is to explain it. Finding F1 in
//    plans/capabilities-consolidation-plan.md.
import { stages } from '../lifecycle';

export const stageDetails: Record<string, string[]> = {
  evaluate: [
    'Market, customer, competitor, and landscape analysis',
    'Business cases, economics, scenarios, and value allocation',
    'Technology, methodology, partner, project, and transaction diligence',
    'Build-buy-partner and investment decisions',
    'Risk, feasibility, and strategic-fit assessment',
  ],
  design: [
    'Objectives, boundaries, outcomes, and participation criteria',
    'Commercial model, incentives, contracts, and risk allocation',
    'Practice-based, outcome-based, or hybrid architecture',
    'Governance, roles, controls, and assurance strategy',
    'Routes to market and stakeholder alignment',
  ],
  build: [
    'Workflows, roles, and process design',
    'Data requirements and system architecture',
    'Measurement, calculation, and quality-control processes',
    'Traceability, chain of custody, and attribute controls',
    'Ledgers, documentation, reporting, and exception management',
  ],
  launch: [
    'Pilot design and success criteria',
    'Partner and technology selection',
    'Implementation planning and change management',
    'Coordination across producers, partners, and customers',
    'Expansion across geographies, products, and customers',
  ],
  operate: [
    'Recurring operational and evidence workflows',
    'Data review and calculation processes',
    'Program and attribute ledgers',
    'Vendor and partner coordination',
    'Exception resolution and management reporting',
    'Audit and verification preparation',
    'Continuous program improvement',
  ],
  commercialize: [
    'Corporate inventory and target alignment',
    'Certification and sourcing claims',
    'Product, customer, and commercial propositions',
    'Scope 3 and inset pathways',
    'Carbon and ecosystem-service market assessment',
    'Low-carbon and regulatory opportunities',
    'Claims governance and communication boundaries',
  ],
};

// Fail the build, not the page, if a stage is renamed or added without its
// detail list following.
for (const stage of stages) {
  if (!stageDetails[stage.id]) throw new Error(`stageDetails has no entry for lifecycle stage '${stage.id}'`);
}
for (const id of Object.keys(stageDetails)) {
  if (!stages.some((s) => s.id === id)) throw new Error(`stageDetails key '${id}' is not a lifecycle stage id`);
}
