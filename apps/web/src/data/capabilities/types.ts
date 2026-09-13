// Shared shape for the five capability family records (./<slug>.ts).
//
// Added 2026-09-13 when the four CapabilityPage-based pages' inline `data`
// objects and the Carbon & Ecosystem Services page's local arrays were moved
// into one module per family, mirroring data/expertise/. The field names are
// CapabilityPage.astro's own so the move changed no copy.
import type { CapabilityArea } from '../lifecycle';

export interface Cta {
  label: string;
  href: string;
}

export interface SubOffering {
  name: string;
  description: string;
}

export interface Offering {
  name: string;
  description: string;
  subOfferings: SubOffering[];
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
}

export type CapabilityFamily = CapabilityFamilyRecord & {
  slug: CapabilityArea['slug'];
  /** `capabilityAreas[].title`: the family's name. */
  name: string;
  /** `capabilityAreas[].description`: the one-line summary the homepage shows. */
  summary: string;
};
