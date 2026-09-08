# Paste this to your Claude Code agent

Implement the About-page bio roster redesign described in
`plans/content/bio-design-2026-09/README.md`.

All design references for this task live in `plans/content/bio-design-2026-09/`.

Read first, in this order:
1. `plans/content/bio-design-2026-09/README.md` — the full spec. The section "The alignment invariant" is the requirement
   that matters most; treat it as a hard constraint.
2. `apps/web/src/components/ProfileRoster.astro` — the only file you should modify.
3. `apps/web/src/pages/about/index.astro` — member data and group wiring (do not change the
   copy).
4. `apps/web/src/styles/design-system.css` — use these `var(--*)` tokens, not the literal
   hex values from the prototypes.

The two `.dc.html` files in `plans/content/bio-design-2026-09/` are design references only — recreate their look and behavior in
Astro with the site's existing tokens and scoped-`<style>` conventions. Do not copy their
inline styles.

Hard requirements:
- The portrait's bounding rect must be pixel-identical between the closed tile and the open
  panel. Achieve it structurally (identical frame padding/border/radius in both states plus
  a `flex: 0 0 18rem` rail), not with animation. Verify with `getBoundingClientRect()`
  before and after a click.
- Preserve every existing action: tile click to open, × / portrait click / Escape to close,
  focus return to the originating tile, `aria-expanded` / `aria-controls` / `hidden`
  wiring, no-JS stacked fallback, closed-tile grayscale-to-color hover, hover-revealed
  LinkedIn badge with its `(hover: hover)` scoping, `showLinkedIn:false`, network variant
  `object-fit: contain`, and `tagsCaption`.
- Keep `padding-right: 48px` on the bio column (close-× clearance) and
  `columns: 19rem 2` (not `column-count: 2`) on the bio text.
- Respect `prefers-reduced-motion`: no slide offset, no entrance animations.

Flag rather than invent: the three specific titles, the email routing strategy, and the
office location string are unconfirmed placeholders — see "Content" in the README.

When done, report the measured before/after portrait rects and confirm each preserved action.
