---
name: astro-architecture
description: Astro-first rendering, routing, component boundaries, React-island criteria and hydration/performance rules for this repo. Use before adding pages, routes, or any interactive component.
---

# Astro Architecture

## Current state (audited 2026-08-12)

- Astro 6.4.6, `output: 'static'`, zero integrations registered, no adapter.
- No React/Vue/Svelte anywhere in the repo. Every page is plain `.astro` +
  vanilla JS/TS.
- Content is not Astro Content Collections — it's a bespoke OKF compiler
  (`apps/web/src/lib/okf/*`) reading `knowledge/` at build time. See
  `keystatic-mdx` skill and `docs/architecture/web-platform-architecture.md`
  §4 before assuming `src/content/` exists.
- Layouts: `FoundationLayout.astro` (base shell), `SiteLayout.astro`
  (primary, takes `title`/`description`/`preview` props).
- Components are flat in `apps/web/src/components/` (no layout/marketing/
  brand/editorial subfolders yet) — Header, Footer, PageHero,
  CapabilityPage, ExpertisePage, CaseStudyArticle, CaseStudyCard.

## Rules

1. Astro components by default. Reach for React only when a component
   genuinely needs client-side state or complex interaction (calculators,
   filters, maps, dashboards) — see the owner architecture doc §4 table.
   Adding `@astrojs/react` is itself a real step (new integration, new
   hydration cost) — don't do it for a component that could be plain HTML/CSS
   or a small vanilla `<script>`.
2. Default to static/pre-rendered output. Only reach for on-demand rendering
   (which requires an adapter — not installed yet) when a real requirement
   demands it (Keystatic admin auth, personalization).
3. New routes go through `src/pages/**` as file-based routing, consistent
   with the existing route table in
   `docs/architecture/web-platform-architecture.md` §3. Don't invent a
   parallel routing mechanism.
4. Route changes must preserve existing production URLs or come with
   explicit, documented redirects.
5. Don't build a heavier client framework or SPA just to get a cinematic
   effect — see `cinematic-ui` skill; GSAP/CSS on an Astro island covers it.
6. Before registering a new Astro integration (Tailwind, React, Cloudflare
   adapter, sitemap, etc.), check current Astro docs (Context7 or
   astro.build) — config surface changes between versions.
