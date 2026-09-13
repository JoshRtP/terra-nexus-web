// Expertise topic page content model.
//
// One template (components/ExpertiseTopicPage.astro) renders ten sections in a
// fixed order from one record per topic. Two topics are built today
// (Regenerative Rangeland, Regenerative Agriculture); the shape is designed for
// all nine — see EXPERTISE-TEMPLATE-HANDOVER.md §3.3 and the "scales to nine"
// comments below for the five fields that carry a topic which is a later link
// in the same chain (supply chains, biofuels, brands, food waste) rather than a
// production topic.
//
// Content provenance and what still needs owner review before publish are
// recorded in ./shared.ts.

/** An indicator key, e.g. 'climate'. Not a fixed union: the five production
 * indicators are only the production topics' set. Agroforestry adds Production,
 * Aquaculture drops Soil, and a refiner runs carbon intensity, feedstock
 * quality, regulatory qualification, chain of custody and facility performance
 * instead. Each topic's own `correcting.indicators` is the authority. */
export type ImpactKey = string;

export interface TopicLink {
  label: string;
  href: string;
}

export interface TopicMeta {
  title: string;
  description: string;
  canonical: string;
  /** Optional per-topic social preview. Unset on both topics today: the
   * handover specified /images/live-site/og-<slug>.jpg and neither file was
   * ever created, so setting it produced a 404 preview where the site-wide
   * /brand/og-image.png default works. Set it once real per-topic art
   * exists. */
  ogImage?: string;
}

export interface OverviewStat {
  /** Short figure, e.g. "~24%". Unsourced on the page by owner decision. */
  figure: string;
  label: string;
}

export interface TitledBlock {
  title: string;
  text: string;
}

export interface Pillar {
  /** Resilient | Sustainable | Prosperous — the order is the argument. */
  tag: string;
  title: string;
  text: string;
  bullets: string[];
}

/** One indicator, and the single source for both section 03's accordion and
 * section 04's filter chips. Those were two parallel structures that happened
 * to agree on the first two topics, because both shipped with the same five
 * production indicators; they cannot stay in step across nine. */
export interface Indicator {
  /** Stable key referenced by `Intervention.impacts`. */
  key: string;
  /** Display name, used as the accordion heading and the chip label. */
  name: string;
  issues: string[];
  /** Filled at module load from shared.ts's `indicatorDefinitions` when the
   * name is one of the recurring production indicators, so those strings exist
   * in exactly one place. Supply it inline for an indicator that is specific to
   * one topic. */
  definition?: string;
}

export interface Intervention {
  id: string;
  group: string;
  name: string;
  /** Indicator keys, every one of which must exist in this topic's own
   * `correcting.indicators` — asserted by the template test suite. */
  impacts: ImpactKey[];
  mechanism: string;
  value: string;
  barrier: string;
  /** Deliberately hedged ("practice adoption alone does not prove a removal").
   * The most technically consequential copy on the page — do not tighten. */
  evidence: string;
  commercial: string;
}

export interface Constraint {
  n: string;
  title: string;
  text: string;
}

export interface EvidenceLayer {
  n: string;
  name: string;
  question: string;
  examples: string;
}

export interface Pathway {
  /** Matches a market-mechanisms.ts id (m01–m04) so names, taglines and
   * carriers stay tied to that canonical source. */
  id: string;
  n: string;
  name: string;
  carrier: string;
  tagline: string;
  whenToUse: string;
  detail: string;
  /** Named protocols/programs. Owner tracks these; confirm currency before
   * publish (handover §7). */
  examples: string[];
  /** Scales to nine: all four mechanisms exist everywhere, but relevance order
   * differs sharply by topic and one may not apply at all. Order the array;
   * set `applicable: false` to render the card as unavailable for this topic. */
  applicable?: boolean;
}

/** A tool shown in section 10, referenced by id from the catalogue in
 * ./tools.ts so the asset path and alt text are written once rather than
 * retyped per topic. `text` overrides the catalogue's default where a topic
 * describes the same tool differently — Regen Ag says "practice change" where
 * Rangeland says "management change". */
export interface ToolRef {
  id: string;
  text?: string;
}

/** Section 00 band. Scales to nine: what actually varies across the topics is
 * how much influence the actor has over production, what incentive pays them,
 * and which market mechanism they prefer. This is the honest answer to "why
 * does this topic need its own page when the practices are the same". */
export interface Positioning {
  influence: string;
  incentive: string;
  mechanism: string;
}

export interface ExpertiseTopic {
  slug: string;
  name: string;
  eyebrow: string;

  hero: string;
  heroLead: string;
  heroImage: string;
  heroImageAlt: string;

  meta: TopicMeta;
  cta: { heading: string; text: string };
  links: {
    whoWeWorkWith: TopicLink;
    markets: TopicLink;
    capabilities: TopicLink;
    digital: TopicLink;
    expertise: TopicLink;
    caseStudies: TopicLink;
  };

  positioning: Positioning;

  overview: {
    label: string;
    heading: string;
    lead: string;
    stats: OverviewStat[];
    body: TitledBlock[];
  };

  potential: {
    label: string;
    heading: string;
    lead: string;
    transition: string;
    pillars: Pillar[];
    kicker: string;
  };

  correcting: {
    label: string;
    heading: string;
    lead: string;
    /** Scales to nine: biophysical for production topics; for a refiner these
     * become carbon intensity, feedstock availability, regulatory
     * qualification, chain of custody, facility performance. Per-record. */
    indicators: Indicator[];
  };

  investments: {
    label: string;
    heading: string;
    lead: string;
    /** Scales to nine: producers/practices/plots for production topics;
     * procurement/transport/transformation for supply chains;
     * feedstock/conversion/qualification for biofuels; product/claim/channel
     * for brands; generation/recovery/second use for food waste. */
    frame: TitledBlock[];
    interventions: Intervention[];
  };

  adoption: {
    label: string;
    heading: string;
    lead: string;
    constraintEyebrow: string;
    constraintHeading: string;
    constraintLead: string;
    /** Scales to nine: "why good agronomy still needs a program" assumes
     * producer adoption. For a brand or refiner the constraint is supplier
     * capability and willingness to qualify. Same five-row shape, new rows. */
    constraints: Constraint[];
  };

  fit: { label: string; heading: string };

  verifying: {
    label: string;
    heading: string;
    lead: string;
    layers: EvidenceLayer[];
  };

  pathways: {
    label: string;
    heading: string;
    lead: string;
    items: Pathway[];
  };

  approach: { label: string; heading: string; lead: string };

  enablers: {
    label: string;
    heading: string;
    lead: string;
    leadTwo: string;
    /** Scales to nine: regen ag has five tools, rangeland four, several topics
     * will have one or none. An empty array is a defined state — the template
     * omits section 10 entirely and drops it from the section rail, rather than
     * rendering an empty grid or a rail entry pointing at nothing. */
    tools: ToolRef[];
  };
}
