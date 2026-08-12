---
title: "Terra Nexus Web Platform Architecture (repo-native)"
status: "Target architecture, adopted incrementally"
updated: "2026-08-12"
supersedes_reference: "Terra_Nexus_Astro_Keystatic_Cloudflare_Architecture.md (owner-supplied source doc)"
---

This is the repository-native, condensed version of the owner-supplied
architecture document. It reflects what the repository actually contains
today (audited 2026-08-12) plus the target direction. Read [`CLAUDE.md`](../../CLAUDE.md)
first for operating rules; this doc is the "why" and the phased plan.

## 1. Current state (audited, not aspirational)

| Layer | Today | Target |
| --- | --- | --- |
| Frontend | Astro 6.4.6, static output, zero integrations | Astro (unchanged) |
| Interactive UI | None — no React/Vue/Svelte in the repo | React islands, added only where a component needs client state |
| Styling | Hand-written CSS (`design-system.css`, `foundation.css`) | Tailwind CSS backed by the same design tokens |
| Motion | Plain CSS transitions only | GSAP for cinematic/scroll sequences; CSS for simple motion |
| Content | Bespoke OKF governed-content pipeline reading `knowledge/` (repo root) at build time — see `AGENTS.md` | Keystatic + MDX for editorial/blog content, introduced *alongside* OKF, not as a replacement, unless a later decision says otherwise |
| Repo/source of truth | GitHub (`JoshRtP/Webservices`, branch `homepage-alt-draft`) | Unchanged |
| Hosting | None configured — no `wrangler.jsonc`, no adapter, static `dist/` only | Cloudflare Workers |
| Large files | Everything in `public/`, including a 16MB reference PNG | Cloudflare R2 for large/reusable assets |
| Video | None in repo yet | Cloudflare Stream for substantial video |
| App data | None | Cloudflare D1, only if/when a real relational-data need appears |

The owner-supplied architecture doc assumed a green-field "offline Astro
site" needing full normalization. In practice `apps/web` is already a
tested, working static Astro app with its own governed content system. The
migration work here is smaller than a full rebuild: add the missing layers
(Tailwind, GSAP, Keystatic, Cloudflare) as discrete phases without disturbing
what already works.

## 2. Repository layout (actual)

```
terra-nexus-website/          (npm workspace root)
  apps/web/                   Astro app (@terra-nexus/web)
    src/
      pages/                  file-based routes (see route table below)
      layouts/                FoundationLayout.astro, SiteLayout.astro
      components/             flat: Header, Footer, PageHero, CapabilityPage,
                               ExpertisePage, CaseStudyArticle, CaseStudyCard
      styles/                 design-system.css, foundation.css
      lib/okf/                governed-content compiler (reads knowledge/, schemas/)
    scripts/                  run-astro.mjs, content-cli.ts, repository-check.ts
    test/                     vitest suite + fixtures
  knowledge/                  OKF governed content bundle (source of truth for copy)
  schemas/                    OKF schema definitions
  scripts/                    repo-root Python validators (validate_okf.py, tnx_validate.py, ...)
  tests/                      pytest suite for the Python validators
  brand/, public/             brand assets referenced across apps/web and knowledge
  docs/architecture/          this file
  artifacts/qa/               Playwright QA screenshots (created, currently empty)
  AGENTS.md                   content-governance rules (authoritative for knowledge/)
  CLAUDE.md                   code/architecture operating rules (this file's companion)
```

No `docs/migration/`, `docs/content-model/`, or `.claude/skills` existed
before this session; skills and this doc were added as part of establishing
the baseline.

## 3. Current route table

Fully static, no server rendering, no API routes besides a dynamic
`robots.txt`.

- `/` — homepage
- `/homepage-alt` — draft alternate homepage (this branch only; not linked from nav)
- `/about`
- `/capabilities`, `/capabilities/{5 offering slugs}`
- `/case-studies`, `/case-studies/[slug]` (dynamic, `getStaticPaths()` from OKF graph, `prerender = true`)
- `/expertise`, `/expertise/{9 topic slugs}`
- `/who-we-work-with`, `/who-we-work-with/{2 segment slugs}`
- `/contact`
- `/robots.txt` (dynamic; emits `noindex,nofollow` + disallow when `TNX_BUILD_MODE=preview`)

Any route restructuring must preserve these paths or add explicit redirects
before cutover — see §7.

## 4. Content system: OKF, not (yet) Keystatic

`apps/web/src/lib/okf/*` compiles `knowledge/` into build-time route data.
Only specific record types are route-eligible (Service Family, Service
Offering, Expertise Topic, Audience Segment, Case Study, Qualification
Module, Insight, Team Member/Bio/Profile). Publication requires explicit
`publication.approved_by`; the compiler never writes back to `knowledge/`.
Full rules: `AGENTS.md` + `knowledge/governance/source-precedence.md`.

**Decision needed before Keystatic work starts:** does Keystatic (a) run
alongside OKF for a genuinely new editorial/blog surface (e.g. a future blog
that isn't part of the governed service/expertise/case-study graph), or (b)
eventually replace OKF for some content types? This has not been decided —
flag it back to the owner when Keystatic work begins (M3 below); don't
assume.

## 5. Styling and motion direction

- `apps/web/src/styles/design-system.css` already documents Terra Nexus's
  color ramps (reverse-engineered from the live WordPress Elementor kit),
  typography (Inter + Lora), spacing. Treat these values as the source of
  design tokens when Tailwind is introduced — port the values, don't
  reinvent them. See also `knowledge` brand references and
  `brand/brand-color-palette.md` if present.
- GSAP is not installed. Add it only when cinematic/scroll work actually
  starts (homepage hero, `homepage-alt` refinement), not preemptively.

## 6. Cloudflare direction

No Cloudflare configuration exists yet — no `wrangler.jsonc`, no adapter.
Adding `@astrojs/cloudflare` + `wrangler.jsonc` and proving a preview
deployment is a discrete milestone (M4). Until then this app builds to a
plain static `dist/` and could be hosted anywhere; do not assume Cloudflare
bindings exist in code today.

## 7. Migration phases (do these in order; each ends with a working build)

| Phase | Exit criteria |
| --- | --- |
| M0 — Baseline (done 2026-08-12) | Repo copied to new path with git history intact; install/build/typecheck/test/check all run; issues logged in `CLAUDE.md` |
| M1 — Docs + tooling scaffold (this session) | `CLAUDE.md`, `docs/architecture/`, `.claude/skills/*`, subagent scaffolds in place |
| M2 — Tailwind adoption | Tailwind installed, `design-system.css` tokens ported to Tailwind config/tokens, no visual regression (Playwright QA at 4 viewports) |
| M3 — Keystatic proof | Keystatic local mode + one real MDX collection proven end-to-end; explicit decision recorded on OKF-vs-Keystatic scope |
| M4 — Cloudflare proof | `@astrojs/cloudflare` adapter + `wrangler.jsonc`; preview deployment verified; no production DNS touched |
| M5 — Keystatic GitHub mode | Deployed CMS editing works end-to-end (requires GitHub write access + Cloudflare env) |
| M6 — Design system hardening | Reusable component vocabulary for sections/editorial blocks |
| M7 — Cinematic hero | GSAP hero (desktop/mobile/reduced-motion) passes performance + visual QA |
| M8 — Content/SEO migration | WordPress content/URLs/metadata migrated where relevant; redirects validated |
| M9 — Launch readiness | Redirects, sitemap, analytics, forms, perf, accessibility validated |
| M10 — Cutover | DNS moved — requires explicit owner authorization, never automatic |

## 8. Reference

Full owner-supplied source document:
`Terra_Nexus_Astro_Keystatic_Cloudflare_Architecture.md` (attached in
session, not yet copied into the repo — copy it into `docs/architecture/`
verbatim if the owner wants it preserved as the original reference).
