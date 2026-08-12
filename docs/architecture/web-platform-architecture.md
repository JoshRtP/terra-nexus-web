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

**Canonical CMS decision (2026-08-12):** Keystatic + MDX is the target
canonical content-management architecture for Terra Nexus. The existing
OKF/`knowledge/` pipeline is retained temporarily as a migration and
reference system — a source for content still being migrated, a record of
validation rules worth preserving, and a rollback point — and should be
retired once required content and useful validation behavior have moved to
Keystatic. See [`okf-migration-inventory.md`](okf-migration-inventory.md)
for what has migrated and what remains.

## 1. Current state (audited, not aspirational)

| Layer | Today | Target |
| --- | --- | --- |
| Frontend | Astro 6.4.6, static output, zero integrations | Astro (unchanged) |
| Interactive UI | None — no React/Vue/Svelte in the repo | React islands, added only where a component needs client state |
| Styling | Hand-written CSS (`design-system.css`, `foundation.css`) | Tailwind CSS backed by the same design tokens |
| Motion | Plain CSS transitions only | GSAP for cinematic/scroll sequences; CSS for simple motion |
| Content | Keystatic + MDX (local storage) for Posts/Authors/Topics, live under `apps/web/src/content/`, bridged via Astro Content Collections. Bespoke OKF pipeline reading `knowledge/` (repo root) still powers Case Studies only — retained temporarily as migration source, see `AGENTS.md` | Keystatic + MDX as the sole canonical CMS; OKF retired once remaining content/validation logic migrates |
| Repo/source of truth | GitHub (`JoshRtP/terra-nexus-web`, branch `main`; legacy history preserved read-only at `JoshRtP/Webservices`) | Unchanged |
| Hosting | `@astrojs/cloudflare@13.7.0` adapter installed, static output, `wrangler dev` verified locally; not yet deployed (owner Cloudflare auth pending) | Cloudflare Workers (preview live) |
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
      pages/                  file-based routes (see route table below);
                               insights/ + keystatic/[...params].astro added M3
      layouts/                FoundationLayout.astro, SiteLayout.astro
      components/             flat: Header, Footer, PageHero, CapabilityPage,
                               ExpertisePage, CaseStudyArticle, CaseStudyCard
      components/mdx/         Keystatic MDX content components (Figure,
                               Callout, PullQuote, Stat, CTA, etc.) — added M3
      content/                Keystatic-managed collections (posts, authors,
                               topics, caseStudies) + config.ts — added M3
      styles/                 design-system.css, foundation.css
      lib/okf/                governed-content compiler (reads knowledge/, schemas/)
    keystatic.config.ts       Keystatic collections/singletons — added M3
    scripts/                  run-astro.mjs, content-cli.ts, repository-check.ts
    test/                     vitest suite + fixtures
  knowledge/                  OKF governed content bundle (source of truth for copy; legacy — see §4)
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
- `/insights`, `/insights/[slug]` (added M3 — Keystatic `posts` collection,
  `getStaticPaths()` from Astro Content Collections, `prerender = true`)
- `/robots.txt` (dynamic; emits `noindex,nofollow` + disallow when `TNX_BUILD_MODE=preview`)
- `/keystatic` (admin UI; dev-only, mounted only when `SKIP_KEYSTATIC` is
  unset — not present in production builds)

Any route restructuring must preserve these paths or add explicit redirects
before cutover — see §7.

## 4. Content system: Keystatic (canonical), OKF (temporary/legacy)

**Keystatic + MDX** (`apps/web/keystatic.config.ts`, local storage mode) is
the canonical CMS. Collections live under `apps/web/src/content/` and are
bridged to Astro pages via Astro Content Collections
(`apps/web/src/content/config.ts`), per current Astro/Keystatic guidance.
Implemented collections: `posts` (Insights/blog, MDX body, fully wired to
`/insights` routes), `authors`, `topics`. `caseStudies` is defined
(schema-only) as the designed future replacement for OKF's Case Study type
but is not yet populated or routed. The `/keystatic` admin route is mounted
only when `SKIP_KEYSTATIC` is unset (local dev), and excluded from
production builds — it needs server rendering, which the site's static
output doesn't otherwise require; see `.claude/skills/keystatic-mdx/SKILL.md`
and `cloudflare-deployment` for the adapter implications once GitHub-mode
Keystatic (deployed editing) is tackled.

`apps/web/src/lib/okf/*` still compiles `knowledge/` into build-time route
data, but only **Case Studies** are actually wired to it today (the other
record types the compiler supports — Service Family, Service Offering,
Expertise Topic, Audience Segment, Insight, Team Member/Bio/Profile — have
no consuming Astro pages). OKF is retained temporarily as a migration source
and reference, not as a permanent second publishing architecture. Full
rules: `AGENTS.md` + `knowledge/governance/source-precedence.md`. See
[`okf-migration-inventory.md`](okf-migration-inventory.md) for the
folder-by-folder migration status and what validation concepts are worth
preserving before OKF is retired.

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

**Adapter installed, preview deployment not yet proven (as of 2026-08-12).**
`@astrojs/cloudflare` is pinned to `13.7.0` in `apps/web/package.json` — the
last release whose peer range (`astro@^6.3.0`) covers this repo's Astro
`6.4.6`; `@astrojs/cloudflare@14+` requires Astro 7 and is an explicit
non-goal until an Astro 7 upgrade is its own deliberate milestone. `astro.config.ts`
sets `output: 'static'` (the site stays fully prerendered — no route is
server-rendered yet) with `adapter: cloudflare({ prerenderEnvironment: 'node' })`;
the `prerenderEnvironment` override is required because the OKF compiler
(`apps/web/src/lib/okf/compiler.ts`) uses Node built-ins (`node:fs/promises`,
`node:crypto`, `node:path`, `node:url`) at build time, which the adapter's
default `workerd` prerender runtime doesn't provide.

No hand-written `wrangler.jsonc` exists — the adapter auto-generates one
into `dist/client/wrangler.json` at build time (worker name derived as
`terra-nexus-web`), which is current recommended practice for a project
with no custom bindings yet. Verified locally: `astro build` succeeds,
`npx wrangler dev` serves the built worker correctly under `workerd`
(spot-checked `/`, `/insights`, `/case-studies`, `/robots.txt`, a 404
route). Deploying an actual preview (`wrangler deploy`) requires
`wrangler login` against an owner Cloudflare account — not yet
authenticated in this environment; see the session record for exact
instructions. GitHub-mode Keystatic (M6) will need on-demand ("prerender:
false") routes once implemented — those would run under `workerd`
regardless of `prerenderEnvironment`, which only affects the static
prerender step.

## 7. Migration phases (do these in order; each ends with a working build)

| Phase | Exit criteria |
| --- | --- |
| M0 — Baseline (done 2026-08-12) | Repo copied to new path with git history intact; install/build/typecheck/test/check all run; issues logged in `CLAUDE.md` |
| M1 — Green baseline + architecture docs (done 2026-08-12) | Known TS error + stale inventory fixed; `CLAUDE.md`/architecture doc/skills updated to state Keystatic is canonical, OKF is temporary |
| M2 — Keystatic + MDX + editorial content architecture (done 2026-08-12) | Keystatic installed (local storage), `posts`/`authors`/`topics` collections live, `caseStudies` schema designed, 12 MDX content components built |
| M3 — Browser CMS proof of concept (done 2026-08-12) | `/keystatic` works locally end-to-end; one representative Insight article renders through Astro at `/insights/[slug]`; build/typecheck/test/check green; browser QA at 4 viewports |
| M4 — Progressive Tailwind/design-system normalization | Tailwind installed, `design-system.css` tokens ported to Tailwind config/tokens, no visual regression (Playwright QA at 4 viewports) |
| M5 — Cloudflare Workers preview deployment (adapter done 2026-08-12; deploy pending owner Cloudflare auth) | `@astrojs/cloudflare@13.7.0` adapter installed and configured, build/typecheck/test/check all green, `wrangler dev` verified locally; **preview deployment itself blocked on owner `wrangler login`**; no production DNS touched |
| M6 — GitHub-backed production Keystatic workflow | Deployed CMS editing works end-to-end (requires GitHub App/OAuth credentials + Cloudflare env — owner action required) |
| M7 — Expanded reusable visual/design system | Reusable component vocabulary for sections/editorial blocks |
| M8 — Cinematic homepage hero | GSAP hero (desktop/mobile/reduced-motion) passes performance + visual QA |
| M9 — WordPress content migration + SEO migration | WordPress content/URLs/metadata migrated where relevant; redirects validated; remaining OKF content (Expertise/Services/Audiences) migrated to Keystatic and OKF retired |
| M10 — Production cutover | DNS moved — requires explicit owner authorization, never automatic |

## 8. Reference

Full owner-supplied source document:
`Terra_Nexus_Astro_Keystatic_Cloudflare_Architecture.md` (attached in
session, not yet copied into the repo — copy it into `docs/architecture/`
verbatim if the owner wants it preserved as the original reference).
