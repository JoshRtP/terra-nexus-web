---
name: terra-nexus-design-system
description: Brand tokens, typography, spacing, imagery and component vocabulary for Terra Nexus. Use before styling any new UI or touching CSS/design tokens.
---

# Terra Nexus Design System

## Source of truth (as of 2026-08-12)

- `apps/web/src/styles/design-system.css` — the real token system. Colors were
  reverse-engineered from the live WordPress site's Elementor global kit; do
  not invent new brand colors without checking here first.
- `apps/web/src/styles/foundation.css` — an older, more minimal base reset
  (system-ui stack, basic link/focus states). Treat as legacy; prefer
  `design-system.css` for anything brand-specific.
- Typography: Inter (body/UI) + Lora (editorial/display), loaded via Google
  Fonts import in `design-system.css`.
- Live-site button color `#4E0110` is the source of truth for brand red — the
  logo's brighter red is not what ships. See `knowledge/` brand references
  and `brand/` at repo root for the fuller palette.

## Rules

1. Never hardcode a hex value in a component when a token in
   `design-system.css` already covers it. If a needed token doesn't exist,
   add it to the shared stylesheet, don't invent a local one-off.
2. No page-specific style blocks that duplicate an existing pattern (card,
   stat, CTA, callout). Extend the shared component/class instead.
3. Tailwind v4 landed in M4 (2026-08-16), via `@tailwindcss/vite` and a
   CSS-first `@theme inline` bridge in `apps/web/src/styles/tailwind.css`
   that aliases existing `design-system.css` custom properties into
   Tailwind's theme namespace (prefixed `tn-` to avoid colliding with
   Tailwind's own default scale) — no token values are duplicated.
   `design-system.css` stays the single source of truth for raw values; add
   new tokens there first, then expose them in `tailwind.css` only if a
   utility is actually needed. Adoption is progressive (M4 proved the
   pattern on one representative component; M7 expands coverage) — most
   existing plain-CSS component/page styles are untouched and that's
   expected, not a gap.
4. Responsive behavior is a component-level decision — design each
   surface's desktop/tablet/mobile behavior explicitly, don't rely on
   generic breakpoints copy-pasted from elsewhere without checking they fit.
5. Motion tokens (durations/easing) don't exist yet — when GSAP work starts
   (`cinematic-ui` skill), define them once and reuse, not per-component.

## When touching brand color specifically

Check the `terra-nexus-brand-colors` memory / `knowledge/brand/` docs before
assuming a value — the logo's colors and the live site's actual rendered
colors have drifted from each other before.

## Component vocabulary (M7, 2026-08-16 — sessions 1 and 2)

M7 audited every page family (Capabilities, Expertise, Digital Solutions,
About, Case Studies, Insights, homepage, Header/Footer) and consolidated
patterns that had been independently reimplemented 2-5 times. Reuse these
before writing new component-local CSS — a new local reimplementation of
any of these is exactly what the M7 audit found and fixed. This is the
answer to "what should a future agent reuse to build a Terra Nexus page?" —
don't go copy CSS from an old page; start here.

- **Layout**: `.container` / `.text-container` / `.narrow-container`,
  `.section` / `.section-alt` / `.section-dark` (the last is the light-blue
  CTA-banner treatment, not a dark/navy background — name kept for
  compatibility), `.section-header` / `.section-lead`, `.eyebrow` /
  `.eyebrow-light` (light variant for dark/photo surfaces) /
  `.eyebrow-sky` (sky-blue variant, M7 session 2 — promoted from a
  CaseStudyCard-local one-off). All confirmed still canonical across both
  M7 sessions; no narrow/wide/compact/split-section primitive was needed —
  real page-family work never exposed a gap here.
- **PageHero** (`components/PageHero.astro`): `eyebrow?`, `title`,
  `lead?`, `primaryCta?`, `secondaryCta?`, plus (M7 session 2)
  `variant?: 'standard' | 'media'` (default `'standard'`) and
  `heroImage?`/`heroImageAlt?`. `variant="media"` renders a full-bleed
  background-image + scrim treatment — use it for any Capability/Expertise
  detail-style page with a representative photo; use `'standard'` (the
  default, no image) for ordinary marketing/informational pages. Deliberately
  NOT extended to cover the Insights or Case Study hero — those carry
  structural elements (breadcrumb, byline/meta, stat band) that don't fit a
  small hero prop API; they remain intentionally hand-rolled rather than
  forcing a giant prop matrix. The homepage's cinematic photo hero is out of
  scope entirely (M9).
- **`ClosingCta.astro`** (`components/ClosingCta.astro`, M7 session 2):
  `heading`, `description?`, `primaryCta`, `secondaryCta?`, `headingId?`.
  Use this for any end-of-page CTA banner instead of hand-authoring the
  `.section.section-dark` block — it now covers 10 real consumers across
  every page family. `.cta-description` is still the global description
  class it renders — never override it locally per-page (ExpertisePage did
  once, silently rendering that page's CTA copy in the wrong color; fixed
  in M7 session 1). One legitimate exception left hand-rolled:
  `who-we-work-with/index.astro`'s lighter single-button variant, which has
  no heading/description — a genuinely different structural pattern, not
  the same one duplicated.
- **Buttons**: `.btn` + `.btn-primary` / `.btn-secondary` / `.btn-ghost`
  (M7 session 1 — third variant for CTAs directly on a dark photo/gradient
  hero, promoted from a single ExpertisePage-local copy).
- **Cards**: `.card` is the base recipe (surface-elevated background, 1px
  border, radius-lg, top accent-bar + hover-lift) — use it plus a modifier,
  don't reimplement the recipe:
  - `.card` alone — default, for clickable/interactive cards.
  - `.card-static` — no hover-lift, no accent bar. Static info panels
    (e.g. case-study sidebar facts).
  - `.card-accent-start` — left accent border instead of top bar, no lift.
    Dense benefit/outcome lists.
  - `.card-plain` — the recipe minus the accent bar, with hover-lift kept.
    Was called `.workstream-card`, byte-for-byte duplicated in two files;
    now one class.
  - `.card-media` (M7 session 2) — the recipe minus padding and the accent
    bar, for cards whose image should bleed to the card edge (used by the
    Insights card grid).
  - `.card-link` wraps an `<a>` around a `.card` for a fully-clickable card
    (pre-M7, still correct — don't nest another interactive control inside
    it).
  - `.card-grid` / `.card-grid-3` is the canonical grid wrapper — reuse it
    for any new card grid rather than a page-local grid (Insights migrated
    onto it in M7 session 2; Capabilities/Digital-Solutions/Who-We-Work-With
    already did in session 1).
- **Tags/pills**: `.tag` (works on `<span>` or `<a>`) — M7 session 1,
  consolidated from four near-identical local implementations (segment-tag,
  pathway-tag, exec-tags, tag).
- **Numbered index**: `.numbered-index` — the large serif index-numeral
  treatment (`01`, `02`...) used for offering/step lists. M7 session 1,
  consolidated from two identical local copies.
- **Stats**: `.stat-group` / `.stat-value` / `.stat-label` is the canonical
  pair. `.stat-value-accent` (sky instead of navy) and `.stat-type` (small
  uppercase label above the value, for case-study-style stat bands) cover
  the two real color/label variations. `.stat-value-md` / `.stat-value-fluid`
  (M7 session 2) cover the two real size variations found when the
  homepage's local `.stat-strip` and CaseStudyArticle's local `.stat-item`/
  `.stat-number` were consolidated onto this one primitive set — there is
  now exactly one stat-band implementation in the codebase, not three.
  Don't fork a fourth; extend this set instead.
- **MDX/editorial**: 13 components in `components/mdx/` (Figure,
  FullBleedImage, Video, PullQuote, Stat, Callout, SourceBox, DataTable,
  Gallery, Download, RelatedContent, CTA, InteractiveEmbed) are the
  canonical editorial vocabulary — do not duplicate under new names. `Video`
  was registered in Keystatic but missing from `insights/[slug].astro`'s
  `mdxComponents` render map until M7 session 1; if you add a new MDX
  component, register it in BOTH `keystatic.content-components.tsx` AND
  every route that renders MDX bodies, or it silently fails to render.
  Article-body typography (`insights/[slug].astro`'s `.insight-body`
  rules) now uses `--max-width-text` and consistent `--space-*` rhythm for
  H2/H3/lists/paragraphs (M7 session 2) — extend those rules for any new
  prose-level styling, don't add page-local overrides. **Cascade gotcha
  confirmed in M7 session 2**: a blanket `.insight-body :global(p)` rule
  will beat an MDX component's own more-specific-in-source-but-lower-
  specificity color rule (found with `CTA.astro`'s navy-on-navy text bug) —
  any future blanket prose selector must exclude MDX components that set
  their own text color on a `<p>`, e.g. via `:not(.some-component-class)`.
  `DataTable.astro`'s horizontal-scroll wrapper is keyboard-accessible
  (`role="region"`, `tabindex="0"`, `aria-label`, focus-visible outline) —
  copy that pattern for any future wide/scrollable content.
- **Header/Footer**: `Header.astro`'s `.nav-link`/`.nav-toggle` and
  `Footer.astro`'s links now have `:focus-visible` outlines using
  `--color-focus` (M7 session 2 — none existed before, a real a11y gap).
  The homepage anchor-nav trial (`Expertise`/`Capabilities`/
  `Who We Work With` linking to `/#section` instead of their standalone
  routes) is still an intentional TRIAL, not settled IA — don't treat it
  as permanent, and don't build a mega-menu on top of it.
- **BackToTop**: `components/BackToTop.astro` — functional behavior
  (homepage → `#expertise`, elsewhere → true top, reduced-motion aware) is
  correct and intentional (see its own header comment); its visual tokens
  already matched the rest of the system as of M7 session 2 — no changes
  were needed.
- **Confirmed dead, removed in M7 session 1**: `foundation.css` and
  `FoundationLayout.astro` (zero consumers, a completely separate unused
  palette). Do not resurrect without a real reason.
- **Cascade rule** (from M4, still true): Tailwind utilities live in
  `@layer utilities`; any unlayered CSS (all of `design-system.css`, all
  component-scoped `<style>` blocks) beats any layered utility for the same
  property regardless of specificity/source order. Pure-CSS-to-CSS
  primitive consolidation (as in M7) doesn't hit this; it only matters when
  a Tailwind utility class competes with an existing unlayered rule for the
  same element/property — verify computed styles when that happens, don't
  assume the utility wins.
- **`!important` in `design-system.css`**: 4 occurrences, all confined to
  the universal `@media (prefers-reduced-motion: reduce)` override block —
  a standard, necessary a11y pattern (needed to beat component-level
  transition/animation declarations regardless of specificity), not a
  component-specific hack. Confirmed unchanged across both M7 sessions —
  don't add more `!important` anywhere else without a similarly strong
  reason.
