---
name: cinematic-ui
description: GSAP/CSS motion conventions, SVG animation, scroll choreography, hero video behavior, reduced-motion alternatives. Use for any cinematic/scroll-linked motion work, especially the homepage hero.
---

# Cinematic UI / Motion

## Current state (audited 2026-08-12)

No GSAP or animation library is installed. Existing motion is plain CSS
`transition:` properties only (in `design-system.css`, `Header.astro`,
`Footer.astro`). `apps/web/src/pages/index.astro` is the live homepage (the
former `/homepage-alt` draft layout, canonicalized 2026-08-12) — it already
carries the photo-hero scroll effects (star drift, header transparency)
described below in plain CSS/JS; GSAP work on it is future M8 scope, not
something to stage on a separate draft page.

## Rules

1. CSS for lightweight transitions. GSAP only for deliberate cinematic
   sequences: homepage hero, scroll-linked storytelling, pinned sections,
   SVG logo animation, complex reveal choreography. Don't reach for GSAP for
   a simple hover/fade — that's CSS.
2. **Never bake critical typography or the final Terra Nexus logo into
   video.** The hero is layered: media (video) → contrast/gradient overlay →
   real SVG brand mark → real HTML copy/CTA → GSAP/CSS motion controller on
   top. Four independent layers, not a single baked composite.
3. Poster-first: first paint must not wait on video decode. Always ship a
   poster frame.
4. Separate desktop and mobile media — either a separately encoded/cropped
   mobile video or a poster + lightweight logo animation on mobile. Don't
   ship a 4K desktop master to mobile viewports.
5. Always respect `prefers-reduced-motion` — define the reduced alternative
   at the same time as the motion, not as an afterthought.
6. Video is progressive enhancement: the page must remain coherent and
   legible if video fails to load or is blocked.
7. Any GSAP/scroll work is a UI change — verify with the `visual-qa` skill
   at all four required viewports, including a reduced-motion pass, before
   calling it done.
