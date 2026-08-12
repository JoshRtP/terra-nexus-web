---
name: visual-qa
description: Browser QA matrix, screenshots, interaction/console checks, and completion criteria for UI changes. Use before reporting any meaningful UI work as done.
---

# Visual QA

## Required viewports (minimum)

- 1440px desktop
- 1024px desktop/tablet landscape
- 768px tablet
- 390px mobile

## Checklist for every meaningful UI change

- Horizontal overflow / clipped content at each viewport.
- Broken images/video (check network requests, not just visual glance).
- Navigation works (header/footer links, mobile menu if present).
- Hover/focus states behave.
- No layout shift on load.
- No console errors introduced by the change (pre-existing unrelated
  warnings can be noted but not treated as blocking).
- Animation behaves correctly; a `prefers-reduced-motion` pass is required
  whenever motion was touched (see `cinematic-ui` skill).

## For the cinematic homepage hero specifically

- Poster-first rendering (first paint doesn't wait on video decode).
- Autoplay behavior where permitted by the browser.
- Mobile fallback (separate media or poster + logo animation).
- Scroll choreography behaves at each required viewport.
- `prefers-reduced-motion` alternative confirmed.

## Artifacts

Store screenshots under `artifacts/qa/` (created at repo root). Name files
so they're traceable to the change (e.g. `artifacts/qa/2026-08-12-homepage-alt-1440.png`).

## Hard rule

A successful production build (`npm run web:build`) is necessary but never
sufficient to call UI work complete. Do not report a UI task done without
having actually run the browser checks above.
