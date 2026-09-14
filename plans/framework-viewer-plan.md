# Ten Types of Innovation viewer — assessment and implementation plan

**Written** 2026-09-13, from the handover package in
`plans/Innovation framework viewer mockups.zip` (README, brief, the `.dc.html`
prototype, five data modules, deck design tokens).
**Status** Owner decisions taken 2026-09-13 (publish; Ten Types only for
now; no new top-level nav; compact board on the family page) and the owner
asked for the viewer to be reusable so further frameworks can be added as
data. Built the same day on `feature/framework-viewer`; see §8 for what
landed and how to add a framework.

---

## 1. What the package is

A working prototype of an interactive reference for Doblin's Ten Types of
Innovation, built in a design-canvas runtime (`support.js` interprets
`{{ holes }}`, `<sc-for>`, `<sc-if>`). It is roughly 2,000 lines of template
and logic plus 2,500 lines of data. Three views are client-facing:

| View | What it does |
|---|---|
| Board | Ten types in three category columns (Configuration, Offering, Experience). Click a category header to focus it and reveal the tactic chips. |
| Detail | One type: description, two or three real-company examples, 6–21 tactic cards, each with an "Add" button and a slide-in drawer with per-tactic examples. |
| Play sheet | The tactics a reader has added, grouped by type, with a ten-cell coverage strip, a "load the Method example" starter, and a print layout. |

Five other views (library, compare, editor, web-part preview, the WWF
"spread") are internal workshop tooling and are not for the public site.

The data is the valuable part: 10 types, 112 tactics with one-line
descriptions, 21 type-level and ~45 tactic-level company examples, and
Doblin's Method worked case. Four other frameworks (Sustainability Fusion,
Kearney's Chessboard, Deloitte's Enterprise Value Map, WWF 2050 Criteria)
ride along and account for 80% of the data bytes.

I served the prototype and rendered it. At 1440px the board is clean and
reads as a Terra Nexus artefact already (navy, burgundy, sage columns; gold
eyebrows). At 390px it does not adapt: the three columns stay fixed, the
copy wraps to one word per line and the page scrolls sideways. The only
breakpoints in the file are at 1150px and 1200px, so "port the responsive
breakpoints" in the brief overstates what exists.

---

## 2. Is it worth putting on the site?

**Yes, with two conditions.** The value case and the risks, honestly:

### For

- **It gives Strategy & Innovation something to show.** That family page is
  988 words and 40 one-line sub-offerings; the depth review in
  `capabilities-depth-seo-ux-plan.md` §1 called it a menu, not a service
  description. A working facilitation tool under "Product, Innovation &
  Design" demonstrates method in a way a paragraph cannot, and does it
  without inventing a capability claim.
- **It is a linkable asset.** A standalone route can be cited from Insights
  posts, sent to a client before a session, and used live in one. The brief
  is right that this is a page people will link to, which is rare on a
  consultancy site.
- **112 tactic descriptions are indexable content** if the detail panels are
  rendered as HTML rather than drawn by JavaScript after load. That is the
  one real SEO gain, and it depends on the build approach in §3.
- **The visual language is already close.** The category and type colours
  were derived from the Terra Nexus anchors. The remap onto site tokens is
  small (§5, step 3).

### Against

- **It is Doblin's framework, and "Ten Types of Innovation" is a Deloitte
  mark.** The type names and the 112 tactic names are their taxonomy; only
  the descriptions were rewritten for this project. Using it in a client
  session and publishing a complete reproduction on a commercial site are
  different things. The brief §8 flags this as the owner's call and asks
  that no agent write the attribution line. I agree, and I would add: get a
  view on whether publishing the full tactic list is acceptable at all
  before any build time is spent. This is the one item that can kill the
  project, so it goes first.
- **The company examples are public facts, not Terra Nexus work.** They are
  fine under `AGENTS.md` (no invented clients) as long as the page labels
  them as public illustrations. A handful cite specific figures (Blue River
  at $305M, LUSH's 6.5M bars, Danone's 17 subsidiaries) that should be
  spot-checked before they carry the Terra Nexus name.
- **Mobile is a rebuild, not a port.** Board, detail (a 270px rail beside a
  card grid), the 430px drawer and the play sheet all need a stacked layout
  designed, not just breakpoints added.
- **The prototype has real scaffolding to remove**: a fake Share button that
  copies a made-up URL, a play sheet that dies on reload, a footer that says
  "UI mockup", and clickable `div`s with a keyboard shim. The brief lists
  all four; none is hard, but none can ship.

### Verdict

Build it as one framework, three views, on a standalone route, with a compact
board embedded on the Strategy & Innovation family page. Do not build it
until the attribution question is answered. Estimated effort once unblocked:
two to three working sessions, most of it the mobile layout and the play
sheet.

---

## 3. Two things I would do differently from the brief

**No iframe.** The brief assumes the capabilities page will embed
`/tools/ten-types-of-innovation/?chrome=0` in an iframe, and specifies
`ResizeObserver` plus `postMessage` height reporting to make that work. That
was the right design when the viewer was a separate artefact. Inside one
Astro codebase it is the wrong one: the same component renders inline on any
page, sized by normal layout, with no cross-document messaging, no nested
scrollbar and no `chrome=0` mode to maintain. The three embed-contract items
in brief §4 fall away entirely. What survives is a `variant` prop on the
component: `full` for the tool route and `compact` for the family page (board
only, no play sheet, each type links to the full route at that type).

**Astro plus a vanilla script, not a React island.** Brief §7 says "one
island for the whole viewer". `CLAUDE.md` rule 1 and the `astro-architecture`
skill say React only where a component genuinely needs client state, and
today no public page uses React at all. The site's own precedent for exactly
this shape of thing is `StrategyFrameworkDVF.astro`: every state pre-rendered
as HTML, toggled with `[hidden]`, real buttons, one inline `<script>`. That
pattern fits here and is better for the site:

- Board and all ten detail panels are static HTML at build time. That is what
  makes the 112 tactics crawlable and makes the page usable before JS runs.
- The only genuinely dynamic surface is the play sheet, and it is a list of
  tactic keys rendered from an embedded JSON blob. That is a small amount of
  DOM work, not a reason to hydrate a framework.
- A React island would ship React to a site that has never shipped it, for
  one page.

If, during the build, the play sheet and drawer turn out to need more state
than a few hundred lines of TypeScript handle cleanly, that is the point to
revisit. Not before.

---

## 4. Owner decisions (blocking)

1. **Attribution and permission.** Is Terra Nexus comfortable publishing
   Doblin's full taxonomy (type names, tactic names) on terra.nexus? If yes,
   what attribution line goes in the tool's footer? Brief §8 asks that no
   agent write this line. Recommend a short legal read on the trademark
   before answering.
2. **One framework or more.** Recommend Ten Types only, per brief §2. The
   other four are internal workshop references with their own attribution
   questions (Deloitte, Kearney, WWF), and each would need the library view
   back. Confirm.
3. **Where it lives in navigation.** Recommend: no new top-level nav item.
   Route at `/tools/ten-types-of-innovation/`, reached from the Strategy &
   Innovation family page (compact board plus a link), a card on the
   `/capabilities/` hub, and the footer alongside Glossary. Brief §7
   explicitly makes this the owner's call.
4. **Compact board on the family page, or link only.** Recommend the compact
   board under the "Product, Innovation & Design" offering, since that page
   is the one that needs substance. The alternative is a single link card,
   which is cheaper but adds nothing to the page.

---

## 5. Implementation plan

Branch off `main` (or off `feature/pre-launch-batch` once it merges, since
that branch touches `design-system.css`, `SiteLayout.astro` and the header).
Invoke the `terra-nexus-design-system` and `astro-architecture` skills before
touching CSS or adding the route. Small commits, full gate before each
"done".

### Step 1 — Data module, no UI

Create `apps/web/src/data/frameworks/ten-types.ts` exporting typed data
assembled from `framework-data.js` (`frameworks['10types']` only) and
`framework-meta.js` (`typeExamples`, `tacticExamples`, `methodCase`). Drop
everything else: the four other frameworks, `savedFrameworks`,
`frameworkCoverage`, the Fusion examples. Keep the ten `typeColors`; they
are data, not theme. Header comment states the source, that tactic wording
was written for this project, and that examples are public illustrations.

Add `apps/web/test/ten-types-data.test.ts`: 10 types, 3 categories, 112
tactics, unique `type::tactic` keys, every example key and every Method case
key resolves to a real tactic, every type has a colour.

### Step 2 — Component

`apps/web/src/components/FrameworkViewer.astro`, props `variant: 'full' |
'compact'` and `toolHref`. Model on `StrategyFrameworkDVF.astro` (note its
frontmatter parser gotcha: union types on one line when the component has a
`<script>`).

Server-rendered:
- Board: three category columns, ten type rows, tactic chips (hidden until a
  category is focused).
- Ten detail panels, `[hidden]` until selected: rail of sibling types,
  description, type examples, tactic cards with an Add button. Every tactic
  card is real HTML with a stable id (`tactic-<type>-<slug>`), which is what
  makes it crawlable and deep-linkable.
- Tactic drawer as a `<dialog>`, content filled from the card the reader
  opened (title, description, examples already in the DOM under a hidden
  block on each card).
- Play sheet shell: header, actions, coverage strip, empty state, and a
  `<template>` for a play row. The rows are built client-side from a JSON
  `<script type="application/json">` carrying only key, title, type and
  description.
- `compact` variant renders the board only; type titles are links to
  `toolHref#type-<id>`.

Client script (TypeScript, one `<script>`):
- State: `view`, `focus`, `typeId`, `play[]`. `play` persists to
  `localStorage` under `tnx:ten-types:play` (precedent: the colourway key in
  `pages/digital-solutions/index.astro`). View and type mirror into the URL
  hash (`#type-network`, `#play`) so a link opens at a type and Back works.
- Share: encode the play keys into a `?play=` query on the current URL and
  copy it with the Clipboard API; show a real "Link copied" confirmation.
  On load, a `?play=` param seeds the sheet. This replaces the fake button
  and needs no backend.
- Every interactive element is a `<button>` or `<a>`; no `keyAct` shim.
- Print: `@media print` hides board, rail and actions, shows the play sheet
  only, keeps the coverage strip. First print rules in the site, so add them
  in the component, not globally.

Styling: classes, not inline styles. Reuse `.eyebrow`, `.tag`, `.btn`,
`.btn-secondary`, `.card`, `.section` and the token set. Map the
prototype's names once in the component's scoped style:

| Prototype token | Site token |
|---|---|
| `--tn-navy`, `--text-heading` | `--color-text` (#131f48) |
| `--text-body`, `--tn-gray-dark` | `--color-text-secondary` (#475569) |
| `--text-eyebrow`, `--tn-burgundy` | `--color-eyebrow` (#6a1b32) |
| `--tn-gold` (on dark) | `--c-accent-400` (#e7d77f) |
| `--tn-navy-16`, hairlines | `--color-border` (#e2e8f0) |
| `--surface-card-tint` | `--color-surface` (#f3f8fa) |
| `--tn-gray-light` | do not use `--color-text-muted` (fails AA); use `--c-secondary-400` on non-text only |
| `--font-display` | `--font-sans` for headings (site headings are Inter); `--font-serif` only for the three stat numerals, matching `.stat-group` |
| `--font-body` | `--font-sans` |
| `--radius-pill` | `--radius-full` |
| `#E63D2F` risk dot, `#3A4670`, `#C9CBD2`, `#F7F7F8` | only used by dropped views; delete |

Responsive, designed not patched: below 768px the board stacks to one column
with category headers as sticky bands; the detail rail becomes a horizontal
scroller of type chips above the content; the drawer becomes a bottom sheet;
the play sheet's coverage strip wraps to two rows of five.

### Step 3 — Route

`apps/web/src/pages/tools/ten-types-of-innovation/index.astro`: `SiteLayout`
with a 155-character description, breadcrumbs (Home › Capabilities › Ten
Types of Innovation), `canonical`, a page hero, the viewer in `full`
variant, and a short attribution block using the owner's wording from
decision 1. Add the route to the table in
`docs/architecture/web-platform-architecture.md` §3.

### Step 4 — Capabilities integration

- Add an optional `tool?: { eyebrow; title; lead; href }` field to
  `CapabilityFamilyRecord` in `data/capabilities/types.ts`; when present,
  `CapabilityPage.astro` renders a `tool` section (added to `sectionOrder`
  after `offerings`) containing the compact viewer. Populate it on
  `strategy-and-innovation.ts` only.
- On `/capabilities/index.astro`, add a link card to the tool in the
  `#families` Strategy & Innovation entry or in `ctaLinks`, per decision 3.
- Footer: add "Ten Types of Innovation" next to Glossary, per decision 3.
- `test/site-links.test.ts` already walks every built href and fragment, so
  a bad anchor fails the suite without new test code.

### Step 5 — Verification

- `npm run web:build`, `npm run web:typecheck`, `npm run web:test`,
  `npm run check`.
- Browser QA at 1440, 1024, 768, 390 for board, one detail, drawer open, and
  a populated play sheet; screenshots under `artifacts/qa/`. Print preview of
  the play sheet. Keyboard-only walk through board → detail → add → play →
  remove. Console clean.
- Confirm the built HTML for the route contains all 112 tactic titles (the
  SEO claim in §2 depends on it).
- Lighthouse on the new route; the earlier baseline put the hub in the 90s,
  and this page should not fall below that.

---

## 6. Things not to carry over from the package

- `support.js` and the `_ds/` deck tokens (Instrument Serif, Archivo). The
  site self-hosts Inter and Lora; do not add a third face.
- `framework-chessboard.js`, `framework-evm.js`, `framework-wwf.js`, and the
  Fusion framework: keep in the zip as internal references.
- The `library`, `compare`, `editor`, `embed` and `spread` views, the
  `lockedReference` and `embedFrameWidth` props, the "Add an example" button,
  and the footer mockup note.
- `assets/logos/terra-nexus-mark-gold.png`: the site has its own wordmark.

## 7. Referenced but absent

The README names a "task two" (`website-agent-prompt.md`,
`approach-and-capabilities-handoff.md`) covering an Approach & Capabilities
page that embeds this viewer. Neither file is in the zip or the repo. The
capabilities consolidation that did land (`capabilities-consolidation-plan.md`,
Phases 0–3 complete) was planned without the viewer, so §5 step 4 above is
the integration, not those files.

---

## 8. What landed (2026-09-13, `feature/framework-viewer`)

- `apps/web/src/data/frameworks/`: `types.ts` (the generic shape),
  `ten-types-of-innovation.ts` (generated from the prototype's data with no
  wording changed; now the source), `index.ts` (registry, `tacticId`,
  `validateFramework`, which throws at build on any inconsistency).
- `apps/web/src/components/FrameworkViewer.astro`: `full` and `compact`
  variants, Astro plus one vanilla script, every state pre-rendered.
- `apps/web/src/pages/tools/[framework]/index.astro`: one page per
  registered framework, breadcrumbed through the family that carries it.
- `CapabilityFamilyRecord.tool` and a `tool` section in
  `CapabilityPage.astro`; Strategy & Innovation carries the Ten Types.
- Hub family entry and footer link to the tool.
- `apps/web/test/framework-viewer.test.ts`.

**To add a framework:** write `data/frameworks/<slug>.ts` in the `Framework`
shape (categories → types → tactics, examples optional, colours as data,
`labels` for the nouns), add it to `records` in `index.ts`, and point a
family's `tool.framework` at it. The route, the viewer, the tests and the
breadcrumbs follow.

### 8.1 Second and third frameworks (2026-09-13, later the same day)

Owner: Deloitte provided the Value Map to Terra Nexus as a contractor, so
its attribution is a wording question, not a permission one; and the
Chessboard and the Value Map were asked for next.

- `sustainability-chessboard.ts` (Kearney; 4 quadrants on enablement ×
  ambition, 16 approaches, 64 levers, the "compliance climb" starter) and
  `sustainability-enterprise-value-map.ts` (Deloitte; 4 dimensions, 9
  improvement areas, 893 actions each tagged with its value line(s), a
  67-node shareholder-value tree with 40 lines, the "resource productivity"
  starter), both generated from the prototype's modules with no wording
  changed. Neither has examples in the source.
- The viewer gained a `matrix` layout, dense rows for large types, and a
  value-map view with a plays-by-value-line table on the play sheet. All
  three are record-driven; the Ten Types page is unchanged.
- `/tools/` index page; the footer links there rather than to each tool.
- Neither new framework is wired to a capability family page yet (a family
  carries one `tool`); which family, if any, is an owner call. Both have
  routes, breadcrumbs through Capabilities, and the index card.
- Not ported: the prototype's per-lever scoring panel (Fusion only) and the
  Value Map play sheet's opportunity/risk dot marking. The WWF 2050
  Criteria and Sustainability Fusion remain in the zip.

---

## 9. Where this stops (2026-09-13) and what remains

**Status.** Parked by owner decision after the third framework. Everything
is on `feature/framework-viewer`, pushed to GitHub, not merged, not deployed
to production. Full gate green at the stop (313 tests, typecheck clean,
validators and pytest passing; browser QA at 1440 / 1024 / 768 / 390 in
`artifacts/qa/2026-09-13-*`). The owner expects to come back for
formatting, label and copy work before this goes live.

**How to resume.** The branch is checked out as a git worktree at
`D:\2. Mirror Dev\Dev Projects\TNex-Web-framework-viewer` (sibling of the
main checkout), because the main checkout held the uncommitted pre-launch
batch at the time. From that folder: `npm install`, then
`npm run web:dev -- --port 4399`; the gate is `npm run web:build`,
`npm run web:typecheck`, `npm run web:test`, and `npm run check` with
`TNX_PYTHON` pointed at the main checkout's `.venv\Scripts\python.exe`.
Read §8 for what landed and how a framework is added.

### 9.1 Decisions (owner)

1. **Attribution wording**, one paragraph per framework, rendered under
   "About this framework" on each tool page. Current text is placeholder
   wording for review, not a legal position:
   - `apps/web/src/data/frameworks/ten-types-of-innovation.ts` (`attribution`)
   - `apps/web/src/data/frameworks/sustainability-chessboard.ts` (`attribution`)
   - `apps/web/src/data/frameworks/sustainability-enterprise-value-map.ts`
     (`attribution`; Deloitte provided the map to Terra Nexus as a
     contractor, per the owner, so say that however Deloitte would want it
     said). There is no copyright text anywhere in the repo.
2. **Which capability family carries the Chessboard and the Value Map** as
   a compact board, if any. Both fit Corporate Sustainability; a family
   record carries one `tool` today (see 9.2 if two are wanted). Until
   decided, both are reachable only from `/tools/`, the footer and by URL.
3. **Whether the Ten Types stays on Strategy & Innovation** in its current
   position (directly under the core question), and whether the tool is
   kept at all. Removing it is deleting the `tool` block in
   `strategy-and-innovation.ts`; the hub picks that up.
4. **Fusion and WWF 2050.** Both remain in the handover zip. Fusion is a
   data-only add (plus a scoring panel the prototype had and this viewer
   does not). WWF needs its own view. Neither is planned.
5. **Navigation.** No top-level nav item (owner decision). Whether
   `/tools/` deserves a Capabilities mega-menu entry is open.
6. **Company examples** on the Ten Types quote figures (Blue River, LUSH,
   Danone). Spot-check before they carry the Terra Nexus name.

### 9.2 Integration (developer)

- **Family page wiring.** `CapabilityFamilyRecord.tool` is a single object.
  If a family should carry two frameworks, change it to `tools?:
  ToolSection[]` in `data/capabilities/types.ts`, loop in
  `CapabilityPage.astro`'s tool section (ids `tool`, `tool-2`, or
  `tool-<slug>`), update the hub's "Interactive tool" line, the
  `sectionOrder` and the two tests that assert it
  (`capability-pages.test.ts`, `framework-viewer.test.ts`).
- **Merging with the pre-launch batch.** Both branches touch
  `Footer.astro` (this one adds a "Framework Tools" link) and the pre-launch
  branch adds `test/site-links.test.ts`, which walks every built href and
  fragment. Expect a one-line footer conflict; after the merge, run that
  test: every `#type-<id>`, `#tactic-<id>`, `#play-sheet`, `#value-map`
  and `#framework` fragment resolves to an id on its page, and `#tool` on
  Strategy & Innovation.
- **Page weight.** The Value Map page ships 893 actions as HTML plus a
  JSON blob of type and value-line codes (deliberate: crawlable, works
  before JS). Run Lighthouse on it before cutover; a DOM-size warning is
  expected, a performance score below the hub's 90s is not, and if it
  falls there the remedy is lazy-rendering the detail panels, not dropping
  the actions.
- **Sitemap and SEO.** The four `/tools/` routes are in the sitemap by
  default. Meta titles and descriptions are within the 70 / 155 limits the
  suite enforces; the copy itself needs the proofing in 9.3.
- **Redirects.** None needed; all routes are new.
- **Preview.** Pushing the branch triggers a Cloudflare Workers Builds
  preview version (unpromoted); nothing reaches production without a merge
  to `main`.

### 9.3 Formatting, labels and copy (owner + developer)

Owner's note at the stop: the pages read as inventories ("9 improvement
areas, 893 actions") rather than as descriptions of what each framework is
for. Places where copy is count-driven today, all in the records or the
two pages, none hard-wired in the component:

- Each record's `lead` (tool-page hero), `intro` (above the board) and
  `metaDescription`, and the `/tools/` index card text (which reuses
  `lead`) and card footer (counts).
- The "About this framework" heading on the tool page is built from
  counts (`pages/tools/[framework]/index.astro`).
- The toolbar's stat strip (types, tactics, in play) and the "N tactics"
  line under every type on the board (`FrameworkViewer.astro`). These are
  the component's own labels; if they go, they go for every framework.
- Labels the owner may want removed or renamed: the "focus / unfocus" hint
  in each column header, "Open one for detail. Use Add to build the play
  sheet.", "No examples yet", the path line under each Value Map action,
  the `Drill in / Filter to line` hints on the value map's column headers,
  and the "Open improvement area" links on its rows.
- The Value Map's per-area `description` is one short sentence from the
  prototype ("What you buy and who you buy it from."); the Chessboard's
  are fuller. Neither has been proofed as site copy.
- The Strategy & Innovation `tool` section lead (new copy, flagged in the
  record) and every `starter.note`.

Proof these as a set once the decisions above are made; the records are
plain TypeScript and every string is in one place.

