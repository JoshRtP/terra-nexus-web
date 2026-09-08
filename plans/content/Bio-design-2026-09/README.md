# Handoff: About-page bio roster — aligned expand (option 1A)

## Overview
The `/about/` Leadership section keeps its existing "closed roster row → one expanded
profile" interaction, but the expanded profile is re-laid-out so it uses horizontal space
efficiently and the portrait **never moves when a tile is clicked**:

- Name, specific title, contact icons, and Focus Areas & Expertise stack in a left rail
  directly under the picture.
- The bordered frame wraps the whole profile area (picture + rail + bio), not just the bio.
- The bio runs in two columns to the right of the rail.
- Opening a profile looks like the frame fades in around the picture and the bio expands out
  from behind it. A tile opened from the second column slides left into the rail slot.

Implementation target: `apps/web/src/components/ProfileRoster.astro` in
`JoshRtP/terra-nexus-web`. **Only that component changes.** `about/index.astro` (data,
section header, group wiring), `Header.astro`, `ClosingCta.astro`, and
`design-system.css` are unchanged.

## About the design files
`About Page - Leadership Section.dc.html` and `Bio Section Redesign.dc.html` in this bundle
are **design references written as standalone HTML prototypes** — they show intended look
and behavior. Do not copy their markup into the codebase. They are inline-styled with
literal hex values because the prototype environment has no access to the site's CSS
custom properties; in the real component **use the existing `var(--*)` tokens from
`apps/web/src/styles/design-system.css`** (the mapping is given in "Design tokens" below)
and the component's existing scoped-`<style>` conventions.

The site chrome in the page-context prototype (navy header bar, closing CTA band) exists
only to show the section in situ. It is a simplified stand-in for `Header.astro` /
`ClosingCta.astro` — ignore it.

## Fidelity
**High fidelity.** Colors, type, spacing, geometry, and transition timings below are exact
and were measured in the prototype. The alignment invariant (below) is the point of the
change — verify it with real measurements, not by eye.

---

## The alignment invariant (most important part)

The portrait's bounding rect must be **pixel-identical** in the closed and open states.
This is achieved structurally, not with animation: **both** states are wrapped in a frame
box with the same padding, border width, and radius. The frame is transparent when closed
and becomes a white bordered card when open, so nothing in the portrait's box model
changes.

```
frame (both states):  padding: var(--space-6) /* 24px */
                      border: 1px solid transparent | var(--color-border)
                      border-radius: var(--radius-lg) /* 14px */
                      background: transparent | var(--color-surface-elevated)

closed:  frame > row (display:flex; flex-wrap:wrap; gap: var(--space-6))
                     > tile-wrap (width: 18rem)
                       > button > portrait (width:100%; aspect-ratio:3/4; radius: var(--radius-lg))

open:    frame > panel (display:flex; flex-wrap:wrap; gap: var(--space-6))
                     > rail (flex: 0 0 18rem)
                       > button.portrait (width:100%; aspect-ratio:3/4; radius: var(--radius-lg))
                     > bio  (flex: 1 1 22rem)
```

Because the rail is `flex: 0 0 18rem` — the same width as the closed tile — and both live
inside the same padded frame, the portrait's x/y/width/height are unchanged. Verified in
the prototype: closed `{x:49.097, y:325.052, w:287.986, h:383.976}` → open
`{x:49.097, y:325.052, w:287.986, h:383.976}`.

**Do not** put padding only on the open card, and do not change the rail to a
percentage/`minmax()` width — either breaks the invariant. If the frame padding is ever
changed, change it in both states.

### Regression test worth adding
```js
const before = tile.querySelector('.roster-portrait').getBoundingClientRect();
tile.click();
const after = panel.querySelector('.roster-expanded-portrait').getBoundingClientRect();
// expect equal within 0.5px on x, y, width, height
```

---

## Layout spec — expanded panel

Frame/panel (`.roster-expanded`)
- `display:flex; flex-wrap:wrap; gap: var(--space-6)`; `padding: var(--space-6)`;
  `border:1px solid var(--color-border)`; `border-radius: var(--radius-lg)`;
  `background: var(--color-surface-elevated)`; `position:relative`.
- Wraps to a single column naturally at narrow widths (no media query needed). The existing
  `@media (max-width: 40rem)` block's `grid-template-columns: 1fr` rule is no longer needed —
  flex-wrap covers it. Keep the narrow-width tile-width override if you still want it.

Left rail
- `flex: 0 0 18rem; max-width:100%; display:flex; flex-direction:column; gap: var(--space-5)` (20px).
- `position:relative; z-index:2` — keeps the sliding portrait above the bio column during the
  open transition.
- Children, in order:
  1. **Portrait button** — `width:100%; aspect-ratio:3/4; border-radius: var(--radius-lg);
     overflow:hidden; background: var(--gradient-dark); padding:0; border:none; cursor:pointer`.
     Photo: `position:absolute; inset:0; width:100%; height:100%; object-fit:cover`
     (full color in the open state — no grayscale). Network variant: `object-fit:contain;
     padding: var(--space-4)`. Hover: `box-shadow: var(--shadow-md)`. Click closes (existing
     `data-roster-portrait-close` behavior).
  2. **Identity block** — name `font-family: var(--font-serif); font-size:26px;
     font-weight: var(--font-semibold); letter-spacing:-0.01em; line-height:1.15`.
     Title on the next line, `margin-top:5px; font-size: var(--text-sm);
     font-weight: var(--font-medium); color: var(--c-sky-700)`.
     The title is the person's **specific** title (see "Content" below), not the roster
     group role.
  3. **Gold rule** — `height:2px; background: var(--c-accent-400)`.
  4. **Contact icon row** (people only) — `display:flex; align-items:center; gap: var(--space-3)`.
     Three 32px circular icon links: LinkedIn, Email, Office. There is **no "Contact" text
     link** — it was removed deliberately.
     Each: `width:32px; height:32px; border-radius: var(--radius-full);
     background: var(--color-surface-alt); color: var(--color-link)`;
     hover `background: var(--c-sky-300)`; `display:flex; align-items:center; justify-content:center`.
     Icons are 15–16px inline SVG, `currentColor`.
  5. **Focus Areas & Expertise** (only when the member has tags) —
     `margin-top: var(--space-4)` (14px in the prototype; `var(--space-4)` = 16px is fine),
     `display:flex; flex-direction:column; gap:9px`.
     Label: `font-size:11px; font-weight: var(--font-semibold); letter-spacing:0.1em;
     text-transform:uppercase; color: var(--color-eyebrow)`; copy exactly
     `Focus Areas & Expertise`.
     Each tag is a link (not a pill): `display:block; font-size:13px; line-height:1.4;
     color: var(--color-text-secondary); padding-left: var(--space-3);
     border-left:2px solid var(--c-sky-300)`; hover `color: var(--c-sky-700);
     border-left-color: var(--c-sky-600)`. Hrefs unchanged from the member data.
     `tagsCaption`, when present: `font-size:11px; font-style:italic; line-height:1.5;
     color: var(--color-text-muted); margin-top:2px`.

Bio column
- `flex: 1 1 22rem; min-width:0; border-left:1px solid var(--color-border);
  padding-left: var(--space-6); padding-right:48px`.
- `padding-right:48px` is **required clearance for the close ×** — without it the button's
  circle sits on the first line of text. Do not remove it, and do not move the × off-card.
- Paragraph container: `columns: 19rem 2; column-gap:34px` — two columns at desktop width,
  collapsing to one when the column can't hold 19rem. Do **not** use `column-count:2` alone
  (it forces two narrow columns on mobile), and do not set `break-inside: avoid-column` on
  the paragraphs (it pushed text outside the frame).
- Paragraphs: `font-size:15px; line-height: var(--line-relaxed); color: var(--color-text-secondary);
  margin-bottom: var(--space-4)` (14px).
- The old `STUDIO EXECUTIVES` eyebrow above the bio was **removed** (duplicative — the group
  heading above the roster already says it).

Close ×
- Unchanged from the current component: `position:absolute; top: var(--space-4);
  right: var(--space-4)`; 32px circle; `background: var(--color-bg);
  border:1px solid var(--color-border); border-radius: var(--radius-full);
  color: var(--color-text-secondary)`; hover `background: var(--color-surface-alt);
  color: var(--color-text)`. Add `z-index:1`.

## Layout spec — closed row
Unchanged from today except that it now sits inside the transparent frame:
- Frame: `padding: var(--space-6); border:1px solid transparent;
  border-radius: var(--radius-lg)`.
- Row: `display:flex; flex-wrap:wrap; gap: var(--space-6)`.
- Tile wrap: `width:18rem; max-width:100%; position:relative`.
- Portrait: as above; photo `filter: grayscale(100%)` transitioning to `grayscale(0%)` on
  hover/focus (closed state only — keep the existing rule).
- Name under the tile: `font-family: var(--font-serif); font-size: var(--text-base)`.
  Role under that: `font-size: var(--text-xs); color: var(--color-text-muted);
  margin-top: var(--space-1)` — this stays the **group role**, not the specific title.
- Hover-revealed LinkedIn badge in the portrait's top-right: keep exactly as-is, including
  the `@media (hover: hover) and (pointer: fine)` hidden-until-hover scoping and the
  always-visible fallback on touch. (The prototype shows it always visible — that is a
  prototype limitation, not a design change.)

---

## Interactions & behavior

Preserve every existing action:
- Click a tile → row hides, that member's panel opens (`aria-expanded`, `aria-controls`,
  `hidden` toggling, focus moves to the close button) — all current script behavior.
- Click the × **or** the opened portrait, or press Escape → closes and returns focus to the
  originating tile.
- LinkedIn badge/icon opens the real profile in a new tab (`showLinkedIn:false` still hides it).
- Capability tag links navigate as before.
- No-JS/SSR: panels render visible and stacked, exactly as now.

New: the open transition.
1. **Frame fade-in** — `@keyframes` from `background: rgba(255,255,255,0); border-color: transparent`
   to the card's real background/border. `animation: 260ms ease` on the panel.
2. **Bio expand** — `@keyframes` from `opacity:0; transform: translateX(-14px)` to
   `opacity:1; transform:none`. `animation: 340ms cubic-bezier(0.16,1,0.3,1) 90ms both` on the
   bio column.
3. **Portrait slide** — a tile opened from column *N* renders its rail at
   `translateX(N * pitch)` and then transitions to `0`:
   - `pitch = 312px` (18rem tile = 288px + 24px gap).
   - `transition: transform 380ms cubic-bezier(0.16,1,0.3,1)` on the rail.
   - Set the offset in the same tick that opens the panel, then clear it on the next frame.
     In the Astro client script: read the tile's index in its row, set
     `rail.style.transform = 'translateX(' + index * 312 + 'px)'` with the transition
     temporarily disabled, force layout (`rail.offsetWidth`), re-enable, then set
     `rail.style.transform = ''`.
   - Include a `setTimeout(settle, 80)` fallback alongside the rAF path — under frame
     throttling the rAF-only version can leave the rail parked at its offset.
   - For column 0 (the common case) the offset is 0, so nothing slides — the bio simply
     expands out of the picture, which is the intended read.
4. Everything above must be skipped under `prefers-reduced-motion: reduce`
   (`design-system.css` already forces `transition-duration`/`animation-duration` to ~0, so
   the CSS side is covered; make sure the JS slide degrades to no offset).

If a row ever holds more than two tiles, the pitch math still holds as long as the row does
not wrap. If it wraps, compute the offset from the tile's live
`getBoundingClientRect()` relative to the rail slot instead of the constant.

## State
Same as today plus one value:
- `open[groupId]` — id of the open member, or null. One open panel per roster group.
- `slideOffset[groupId]` — px offset for the rail, set on open, cleared on the next frame.
  Transient presentation state only; nothing persists.

No data fetching. All content comes from the `members` prop already assembled in
`about/index.astro`.

## Content
- Bios, tags, tag hrefs, LinkedIn URLs, group headings: unchanged from
  `about/index.astro`.
- **Specific titles** shown under the picture — currently placeholders in the prototype and
  need owner confirmation before ship:
  - Laura Klein — "Chief Executive Officer" (from the live preview site)
  - Josh Mellinger — "Technical Engagement Leader" (from brand material)
  - Isaac Carroo — "Studio Executive in Residence"
  If the `role` field is meant to stay the only title, add a separate `title` field to the
  member type rather than overloading `role` (the closed tile still shows `role`).
- **Email routing** — the prototype uses `/contact/?re=<member-id>` for the mail icon rather
  than a `mailto:`, to avoid publishing harvestable addresses. If you switch to real
  addresses, prefer Cloudflare Email Routing aliases over personal mailboxes; the contact
  form should read the `re` parameter and preselect the recipient.
- **Office icon** links to `https://maps.google.com/?q=Boulder,%20Colorado`. Confirm the
  office string before ship.
- Isaac has no capability tags in the current data, so his rail renders photo → identity →
  contact only. Expert Network has tags + caption but no person contact row.

## Design tokens (prototype literal → codebase token)
| Prototype value | Token in `design-system.css` |
|---|---|
| `#131f48` | `--color-text` / `--color-dark` |
| `#475569` | `--color-text-secondary` |
| `#94a3b8` | `--color-text-muted` |
| `#e2e8f0` | `--color-border` |
| `#f3f8fa` | `--color-surface` |
| `#e9f2f5` | `--color-surface-alt` |
| `#ffffff` | `--color-surface-elevated` / `--color-bg` |
| `#6a1b32` | `--color-eyebrow` |
| `#1b2c5c` | `--color-link` / `--color-dark-surface` |
| `#315f6c` | `--c-sky-700` |
| `#427e90` | `--c-sky-600` |
| `#a8d0db` | `--c-sky-300` |
| `#e7d77f` | `--c-accent-400` |
| `linear-gradient(160deg,#131f48,#1b2c5c)` | `--gradient-dark` |
| 14px radius | `--radius-lg` |
| 999px radius | `--radius-full` |
| 4/8/12/16/20/24px | `--space-1` … `--space-6` |
| `'Lora'` | `--font-serif` |
| `'Inter'` | `--font-sans` |
| line-height 1.7 | `--line-relaxed` |

Fixed values with no token (use as literals): rail width `18rem`, bio basis `22rem`,
`columns: 19rem 2`, column-gap `34px`, bio `padding-right:48px`, icon circles `32px`,
name `26px`, tag links `13px`, eyebrow/caption `11px`, bio text `15px`, gold rule `2px`,
slide pitch `312px`.

## Assets
All already in the repo — nothing new to add:
- `apps/web/public/images/team/{laura-klein,josh-mellinger,isaac}/photo.jpg`
- `apps/web/public/images/team/expert-network/logo.png`
- `apps/web/public/brand/logo-wordmark-dark.png` (header only; prototype context)

Icons are inline SVG in the component: the existing LinkedIn glyph and × path, plus two new
line icons (envelope, map pin) drawn at `viewBox="0 0 24 24"`, `fill:none`,
`stroke:currentColor`, `stroke-width:1.8` to match. If a value-chain/brand icon set is
preferred over these two, swap them for brand assets.

## Files
In this bundle:
- `About Page - Leadership Section.dc.html` — the section in page context, all three roster
  groups, with the open/close transition. **Primary reference.**
- `Bio Section Redesign.dc.html` — the isolated option 1A layout (Studio Executives only).
- `support.js` — runtime needed for the two HTML files to render when opened locally.

The agent also needs these repo files (they stay where they are — do not copy them into
`plans/content/bio-design-2026-09/`):
- `apps/web/src/components/ProfileRoster.astro` — the file to modify.
- `apps/web/src/pages/about/index.astro` — member data, group wiring, section header.
- `apps/web/src/styles/design-system.css` — tokens referenced throughout this doc.

## Out of scope
Header, hero, Origin Story, Track Record, and closing CTA sections; the ProfileRoster
public props contract (unchanged apart from an optional `title` per member); promoting
ProfileRoster into the shared design-system vocabulary (it is still page-local with one
consumer).
