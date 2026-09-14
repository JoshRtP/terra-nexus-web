// Shared shape for the frameworks the framework viewer renders
// (components/FrameworkViewer.astro, pages/tools/[framework]/).
//
// Added 2026-09-13. A framework is a three-level reference: categories hold
// types, types hold tactics, and any type or tactic may carry public
// company examples. The Ten Types of Innovation is the first; the shape is
// deliberately generic (the nouns are data, see `labels`) so a supply-chain,
// operations or corporate-sustainability framework is a new record in this
// folder and an entry in ./index.ts, with no component change.
//
// Two optional extensions, added the same day for the second and third
// frameworks: a 2×2 `matrix` layout (the Sustainability Chessboard places
// its four strategies on enablement × ambition) and a `valueMap` (the
// Enterprise Value Map crosses its improvement areas with a shareholder-
// value tree; each action says which value line(s) it sits on via `at`).

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
  /** Value-line codes in the framework's `valueMap.tree` this tactic sits
   * on. Only meaningful when the framework has a value map. */
  at?: string[];
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
  /** Optional sub-labels shown under the type's title in its detail panel
   * (the Value Map's themes per improvement area). Not a filter. */
  themes?: string[];
  tactics: FrameworkTactic[];
}

export interface FrameworkCategory {
  name: string;
  /** Short form for the column header and rail (`INPUTS` for "Business
   * Inputs"). Defaults to `name`. */
  short?: string;
  /** Short line under the name on the board ("The internals of the business"). */
  focus: string;
  /** Two sentences shown in the detail rail. */
  blurb: string;
  /** Hex colour for the column header. */
  color: string;
  /** Optional aside rendered under the column's types. */
  note?: { label: string; text: string };
  /** `[row, column]` on the matrix, zero-based. Required when the
   * framework's `layout` is `matrix`. */
  cell?: [number, number];
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

/** Axis labels for a `matrix` layout. Rows run top (`yHigh`) to bottom
 * (`yLow`); columns run left (`xLow`) to right (`xHigh`). */
export interface FrameworkMatrix {
  xLabel: string;
  yLabel: string;
  xLow: string;
  xHigh: string;
  yLow: string;
  yHigh: string;
}

/** A node in a value tree. Codes are dotted paths (`rg.vol.acquire`), so a
 * tactic tagged with a leaf is also under every ancestor. */
export interface ValueNode {
  code: string;
  name: string;
  children?: ValueNode[];
}

/** A second hierarchy the viewer crosses with the types: the Value Map's
 * shareholder-value tree against its improvement areas. Enables the value
 * map view on the tool page and the "where these plays land" strip on the
 * play sheet. */
export interface FrameworkValueMap {
  /** Tab label ("Value map"). */
  title: string;
  /** The tree's axis ("Shareholder value"). */
  xLabel: string;
  /** The types' axis ("Stakeholder value"). */
  yLabel: string;
  /** Sub-label under `yLabel` ("Improvement area"). */
  ySub: string;
  /** Breadcrumb root ("All value drivers"). */
  rootCrumb: string;
  tree: ValueNode[];
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
  /** Attribution paragraphs, owner wording. Not rendered since 2026-09-13
   * (the owner removed the tool page's About section); kept in the data
   * for when and where attribution is wanted. */
  attribution?: string[];
  /** `columns` (default): one column per category. `matrix`: categories
   * placed by `cell` on a grid with `matrix` axis labels. */
  layout?: 'columns' | 'matrix';
  matrix?: FrameworkMatrix;
  valueMap?: FrameworkValueMap;
  categories: FrameworkCategory[];
  types: FrameworkType[];
  starter?: FrameworkStarter;
}
