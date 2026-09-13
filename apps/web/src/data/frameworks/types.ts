// Shared shape for the frameworks the framework viewer renders
// (components/FrameworkViewer.astro, pages/tools/[framework]/).
//
// Added 2026-09-13. A framework is a three-level reference: categories hold
// types, types hold tactics, and any type or tactic may carry public
// company examples. The Ten Types of Innovation is the first; the shape is
// deliberately generic (the nouns are data, see `labels`) so a supply-chain,
// operations or corporate-sustainability framework is a new record in this
// folder and an entry in ./index.ts, with no component change.

export interface FrameworkExample {
  /** The company or program the example is about. */
  who: string;
  /** One sentence on what it did. Public illustration, not client work. */
  what: string;
}

export interface FrameworkTactic {
  title: string;
  description: string;
  examples?: FrameworkExample[];
}

export interface FrameworkType {
  /** Stable, URL-safe id. Tactic ids are derived from it (`<type>--<tactic-slug>`). */
  id: string;
  /** Must match a `categories[].name`. */
  category: string;
  title: string;
  description: string;
  /** Hex colour. Data, not theme: types are tinted so they stay
   * individually identifiable while the category still reads across the
   * board. Light tints get dark text automatically. */
  color: string;
  examples?: FrameworkExample[];
  tactics: FrameworkTactic[];
}

export interface FrameworkCategory {
  name: string;
  /** Short line under the name on the board ("The internals of the business"). */
  focus: string;
  /** Two sentences shown in the detail rail. */
  blurb: string;
  /** Hex colour for the column header. */
  color: string;
  /** Optional aside rendered under the column's types. */
  note?: { label: string; text: string };
}

/** The nouns the viewer uses in its own copy, so a framework whose levels
 * are "drivers → value categories → levers" reads correctly without a
 * component change. */
export interface FrameworkLabels {
  group: string;
  groupPlural: string;
  type: string;
  typePlural: string;
  tactic: string;
  tacticPlural: string;
}

/** A worked example the play sheet can load when it is empty, as a way in. */
export interface FrameworkStarter {
  name: string;
  note: string;
  /** Tactic ids (`<type>--<tactic-slug>`), validated in ./index.ts. */
  tactics: string[];
}

export interface Framework {
  /** Route segment: /tools/<slug>/. */
  slug: string;
  name: string;
  /** For tight spaces (footer, rail). */
  shortName: string;
  eyebrow: string;
  /** Hero title on the tool page. */
  title: string;
  /** Hero lead on the tool page. */
  lead: string;
  metaTitle: string;
  metaDescription: string;
  /** One or two sentences above the board itself. */
  intro: string;
  labels: FrameworkLabels;
  /** Paragraphs rendered verbatim in the tool's attribution block. Owner
   * wording; see the record's provenance comment. */
  attribution: string[];
  categories: FrameworkCategory[];
  types: FrameworkType[];
  starter?: FrameworkStarter;
}
