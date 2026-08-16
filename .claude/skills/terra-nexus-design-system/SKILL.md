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
