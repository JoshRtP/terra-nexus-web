// Shared shape for the five capability family records (./<slug>.ts).
//
// Added 2026-09-13 when the four CapabilityPage-based pages' inline `data`
// objects and the Carbon & Ecosystem Services page's local arrays were moved
// into one module per family, mirroring data/expertise/. The field names are
// CapabilityPage.astro's own so the move changed no copy.
//
// Extended later the same day with the fields the site's own service-page
// template (knowledge/website/page-templates/service-page.md) requires and
// the pages had never rendered: decision owners, core question and scope
// boundary at family level, and per-offering detail where an approved
// offering record exists.
import type { CapabilityArea } from '../lifecycle';

export interface Cta {
  label: string;
  href: string;
}

export interface SubOffering {
  name: string;
  description: string;
}

/** Offering-level narrative, in the shape of the approved offering records
 * in knowledge/services/<family>/<offering>.md: who decides, what they are
 * asking, what problems bring them, what they receive. Only Carbon &
 * Ecosystem Services carries these today (owner-approved 2026-09-13). */
export interface OfferingDetail {
  description: string;
  decisionOwners: string[];
  coreQuestion: string;
  problems: string[];
  deliverables: string[];
}

export interface Offering {
  name: string;
  description: string;
  subOfferings: SubOffering[];
  detail?: OfferingDetail;
}

/** A family's gloss on one of the six lifecycle stages. The stage's number
 * and title come from `stages` in ../lifecycle.ts; the family adds only what
 * that stage means for its work. */
export interface StageNote {
  title: string;
  body: string;
}

/** The market-mechanism section (Carbon & Ecosystem Services only). The four
 * mechanisms themselves render from ../market-mechanisms.ts; the family
 * authors only the section header. */
export interface MechanismsSection {
  eyebrow: string;
  heading: string;
  lead: string[];
}

/** The lifecycle section (Carbon & Ecosystem Services only): the six stages
 * from ../lifecycle.ts, each with this family's note under it. */
export interface LifecycleSection {
  eyebrow: string;
  heading: string;
  lead: string[];
  /** Keyed by stage id (`evaluate` through `commercialize`). */
  notes: Record<string, StageNote>;
}

/** An interactive framework tool from ../frameworks, rendered in its compact
 * form on the family page (Strategy & Innovation carries the Ten Types of
 * Innovation, 2026-09-13). The family authors the section header; the board
 * and the /tools/<slug>/ page render from the framework record itself. */
export interface ToolSection {
  eyebrow: string;
  heading: string;
  lead: string[];
  /** A slug in ../frameworks' FRAMEWORK_SLUGS; checked at build. */
  framework: string;
}

export interface ComparisonCell {
  label: string;
  body: string;
}

/** The "same performance, different market architecture" band (Carbon &
 * Ecosystem Services only). */
export interface ComparisonSection {
  heading: string;
  lead: string;
  cells: ComparisonCell[];
  quote: string;
}

/** What each family module authors. Name, slug and one-line summary are
 * deliberately NOT here: they come from `capabilityAreas` in ../lifecycle.ts,
 * which the homepage also renders, and ./index.ts merges them in, so a
 * family cannot be described one way on the homepage and another way here. */
export interface CapabilityFamilyRecord {
  eyebrow: string;
  title: string;
  lead: string;
  primaryCta: Cta;
  secondaryCta?: Cta;
  metaTitle: string;
  metaDescription: string;
  /** Overview paragraphs. Empty on Carbon & Ecosystem Services, whose
   * mechanism section carries the framing instead. */
  orientation: string[];
  /** From the family's overview.md (status: stable, owner-sourced): who in
   * the client organisation owns the decisions this family serves. */
  decisionOwners: string[];
  /** From overview.md `core_question`: the question, in the client's voice,
   * that this family exists to answer. */
  coreQuestion: string;
  /** From overview.md `scope_boundary`. */
  scopeBoundary: string;
  offerings: Offering[];
  callout?: string;
  proofNote?: string;
  proofLink?: Cta;
  ctaHeading: string;
  ctaBody: string;
  ctaButton: Cta;
  mechanisms?: MechanismsSection;
  lifecycle?: LifecycleSection;
  comparison?: ComparisonSection;
  tool?: ToolSection;
}

export type CapabilityFamily = CapabilityFamilyRecord & {
  slug: CapabilityArea['slug'];
  /** `capabilityAreas[].title`: the family's name. */
  name: string;
  /** `capabilityAreas[].description`: the one-line summary the homepage shows. */
  summary: string;
};
