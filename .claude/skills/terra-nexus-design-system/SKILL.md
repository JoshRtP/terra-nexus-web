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

## Component vocabulary (M7, 2026-08-16)

M7 audited every page family (Capabilities, Expertise, Digital Solutions,
About, Case Studies, Insights, homepage, Header/Footer) and consolidated
patterns that had been independently reimplemented 2-5 times. Reuse these
before writing new component-local CSS — a new local reimplementation of
any of these is exactly the M7 audit found and fixed:

- **Layout**: `.container` / `.text-container` / `.narrow-container`,
  `.section` / `.section-alt` / `.section-dark` (the last is the light-blue
  CTA-banner treatment, not a dark/navy background — name kept for
  compatibility), `.section-header` / `.section-lead`, `.eyebrow` /
  `.eyebrow-light` (light variant for dark/photo surfaces). All pre-M7;
  confirmed still canonical, no changes.
- **Buttons**: `.btn` + `.btn-primary` / `.btn-secondary` / `.btn-ghost`
  (new M7 — third variant for CTAs directly on a dark photo/gradient hero,
  promoted from a single ExpertisePage-local copy).
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
  - `.card-link` wraps an `<a>` around a `.card` for a fully-clickable card
    (pre-M7, still correct — don't nest another interactive control inside
    it).
- **Tags/pills**: `.tag` (works on `<span>` or `<a>`) — new M7, consolidated
  from four near-identical local implementations (segment-tag, pathway-tag,
  exec-tags, tag).
- **Numbered index**: `.numbered-index` — the large serif index-numeral
  treatment (`01`, `02`...) used for offering/step lists. New M7,
  consolidated from two identical local copies.
- **Stats**: `.stat-group` / `.stat-value` / `.stat-label` is the canonical
  pair (pre-M7). `.stat-value-accent` (sky instead of navy) and `.stat-type`
  (small uppercase label above the value, for case-study-style stat bands)
  are new M7 additions covering the two real variations found — don't fork
  a fourth stat implementation; extend this pair instead.
- **CTA**: end-of-page CTA is still a hand-authored `.section.section-dark`
  block per page (h2 + `.cta-description` + `.hero-actions` + `.btn-primary`)
  — this repeats across ~8 pages with identical structure but wasn't
  extracted into a component in M7 (would need an Astro component, not just
  a CSS class; flagged as a real M8-adjacent opportunity, not done). Do
  reuse the exact class combination above rather than inventing new markup
  for it. `.cta-description` is global — never override it locally
  per-page (ExpertisePage did, silently rendering that page's CTA copy in
  the wrong color; fixed in M7 — see the M7 PR/log entry).
- **MDX/editorial**: 13 components in `components/mdx/` (Figure,
  FullBleedImage, Video, PullQuote, Stat, Callout, SourceBox, DataTable,
  Gallery, Download, RelatedContent, CTA, InteractiveEmbed) are the
  canonical editorial vocabulary — do not duplicate under new names. `Video`
  was registered in Keystatic but missing from `insights/[slug].astro`'s
  `mdxComponents` render map until M7; if you add a new MDX component,
  register it in BOTH `keystatic.content-components.tsx` AND every route
  that renders MDX bodies, or it silently fails to render.
- **Confirmed dead, removed in M7**: `foundation.css` and
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
