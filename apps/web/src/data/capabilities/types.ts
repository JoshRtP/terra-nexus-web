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

export interface ComparisonCell {
  label: string;
  body: string;
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
  orientation: string[];
  offerings: Offering[];
  callout?: string;
  proofNote?: string;
  proofLink?: Cta;
  ctaHeading: string;
  ctaBody: string;
  ctaButton: Cta;
  /** Keyed by stage id from ../lifecycle.ts (`evaluate` through
   * `commercialize`). Only Carbon & Ecosystem Services carries these today. */
  stageNotes?: Record<string, StageNote>;
  /** Carbon & Ecosystem Services only: the "same performance, different
   * market architecture" comparison band. */
  comparison?: ComparisonCell[];
}

export type CapabilityFamily = CapabilityFamilyRecord & {
  slug: CapabilityArea['slug'];
  /** `capabilityAreas[].title`: the family's name. */
  name: string;
  /** `capabilityAreas[].description`: the one-line summary the homepage shows. */
  summary: string;
};
