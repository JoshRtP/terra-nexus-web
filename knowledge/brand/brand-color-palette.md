---
type: Reference
title: Terra Nexus Brand Color Palette
description: Approved hex values for the Terra Nexus brand, cross-checked against
  the live production site's implementation.
tags:
- brand
- color
- reference
status: stable
sources:
- id: brand-palette-image
  resource: user-supplied brand palette graphic (2026-08-09)
  title: Terra Nexus Brand & Logo Colors
  author: human:terra-nexus-owner
- id: live-site-css
  resource: https://terra.nexus/ (Elementor global kit CSS, fetched 2026-08-09)
  title: Terra Nexus live site — computed --e-global-color-* custom properties
  author: process:live-site-inspection
---

# Primary Brand & Logo Colors

| Swatch | Hex | Notes |
|---|---|---|
| Red | `#e63d2f` | Logo wordmark red (artwork). The *live-site button fill* is a darker, more literal maroon — see below. |
| Light blue | `#9AD1DC` | Matches live site `--e-global-color-secondary: #A8D0DB` (nav hover/menu accent). |
| Navy | `#131f48` | Exact match to live site `--e-global-color-e476e9d: #131F48`. Used site-wide as the dark background. |
| Maroon | `#6A1B32` | Matches live site `--e-global-color-b4afd4e: #6A1B32`. |
| Gold | `#e8d77e` | Exact match to live site `--e-global-color-accent: #E8D77E`. Star-mark color. |

# Live-Site Verified Values (source of truth for UI color decisions)

Pulled directly from the Elementor global kit CSS at terra.nexus (not just the logo artwork):

- `--e-global-color-primary: #CC4100` — burnt orange-red, used for lighter display/headline accents.
- `--e-global-color-secondary: #A8D0DB` — light blue, nav hover state.
- `--e-global-color-accent: #E8D77E` — gold.
- `--e-global-color-text: #7A7A7A` — neutral gray body text.
- `--e-global-color-b4afd4e: #6A1B32` — maroon.
- `--e-global-color-e476e9d: #131F48` — navy.
- **Literal button fill: `#4E0110`** — the actual `background-color` applied to every `button`, `input[type=button]`, `input[type=submit]`, and `.elementor-button` on the live site (Elementor kit default). This is darker/more oxblood than the `#6A1B32` maroon swatch — treat this as *the* button color, not the lighter maroon or the bright logo red.

When matching site UI to the brand, prefer these live-site values over re-deriving colors from the logo PNG — the logo artwork uses a brighter red for legibility on a light mark, but the actual site chrome (buttons, CTAs) uses the much darker `#4E0110`.

# Extended Secondary

Cool grays/purples:
`#B4B4B4` · `#7E8287` · `#8B7E8B` · `#49475B`

Greens:
`#B0BC85` · `#5B6C5D` · `#658B46` · `#425316`

Deep navy-black:
`#061927`

# Other Approved Colors

`#9DA39A` (sage gray) · `#53494B` (charcoal plum) · `#B58389` (dusty rose) · `#E9EB9E` (pale chartreuse) · `#4E818A` (teal) · `#A0BEBB` (pale teal)

These extended/other colors are not currently used in the web design system — they're available for future data-viz, illustration, or secondary UI accents if a wider palette is needed. See [[brand-usage-rules]] for editorial constraints and [[brand-platform]] for positioning.
