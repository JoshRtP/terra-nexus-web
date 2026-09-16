import type { BuildMode } from './okf/types.js';

/**
 * Sections that have a route but are deliberately not publishing yet.
 *
 * Case Studies (owner decision, 2026-09-16): `knowledge/` holds exactly one
 * approved engagement write-up (the anonymized lower-emissions beef study).
 * A section entered for a single card reads thinner than no section at all,
 * so the index renders the same "not yet live" placeholder /insights/research/
 * already uses, the per-case-study routes are not generated, and every
 * contextual link that promised the reader a case study is suppressed.
 * Site navigation (header mega menu, footer) keeps its Case Studies entry —
 * the same treatment Research gets, since the page still exists and explains
 * itself.
 *
 * Gated on build mode rather than a bare constant so the approved case study
 * stays reviewable where that is useful and harmless: non-production branch
 * builds are `noindex, nofollow` behind a disallowing robots.txt (see
 * docs/architecture/web-platform-architecture.md §11.3), and they are what
 * keeps the OKF anonymization pipeline covered end to end in
 * test/astro-foundation.test.ts. `main` builds production, so the stable
 * site publishes nothing.
 *
 * To launch the section, make this return `true` unconditionally, then delete
 * it and its call sites once the placeholder copy has been replaced.
 */
export function caseStudiesArePublished(mode: BuildMode): boolean {
  return mode !== 'production';
}
