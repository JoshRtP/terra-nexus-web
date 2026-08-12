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

### 6.1 Hosted Keystatic (GitHub storage) blocker — confirmed 2026-08-12

**Finding:** `@keystatic/astro@5.2.0`'s bundled `/api/keystatic/*` route handler
(`keystatic-astro-api.js`) unconditionally reads
`context.locals.runtime.env` to source `KEYSTATIC_GITHUB_CLIENT_ID` /
`KEYSTATIC_GITHUB_CLIENT_SECRET` / `KEYSTATIC_SECRET`. As of
`@astrojs/cloudflare@13.x` (the whole major line that targets Astro 6, not
just 13.7.0 — confirmed by inspecting `dist/utils/cf-helpers.js`), the
adapter deliberately defines `locals.runtime.env` as a getter that **throws**
(`"Astro.locals.runtime.env has been removed in Astro v6. Use 'import { env }
from \"cloudflare:workers\"' instead."`) rather than returning `undefined`.
Keystatic's optional chaining (`locals?.runtime?.env`) does not protect
against this, because `locals.runtime` itself exists — only `.env` throws —
so every `/api/keystatic/*` request 500s as soon as the handler is invoked,
**before** GitHub credentials even come into play.

**Verified empirically** (not from docs) by building with
`SKIP_KEYSTATIC=` (Keystatic included) and `KEYSTATIC_STORAGE_KIND=github`,
then running the built Worker under real `workerd` via `wrangler dev`: `/keystatic`
itself renders fine (200, dashboard shell loads), but
`GET /api/keystatic/tree` 500s with the exact error above.

**This is not an Astro 7 problem.** The mixed static + on-demand rendering
approach described in §12 of the original session brief works correctly on
Astro 6.4.6 with the pinned adapter — confirmed by the same `wrangler dev`
test: `/keystatic` and `/api/keystatic/*` are correctly served as on-demand
(`prerender: false`) routes alongside the fully static public site, with no
adapter/runtime errors of their own. The blocker is purely an unpatched gap
in `@keystatic/astro` (already on its latest published version, `5.2.0`, as
of this audit) that hasn't been updated for `@astrojs/cloudflare`'s Astro 6
`locals.runtime` removal. Downgrading the adapter within the Astro-6-compatible
13.x line does not help — the throwing behavior is present across that whole
major version, not a late 13.7.0 addition.

**Fixed 2026-08-12 (M6).** `apps/web/src/lib/keystatic-cloudflare-shim.ts`
implements the workaround: it calls `@keystatic/core/api/generic`'s
`makeGenericAPIRouteHandler` directly (the same public function
`@keystatic/astro` itself calls) and sources
`KEYSTATIC_GITHUB_CLIENT_ID`/`KEYSTATIC_GITHUB_CLIENT_SECRET`/`KEYSTATIC_SECRET`
from `cloudflare:workers`'s `env` export instead of the broken
`locals.runtime.env` path. Request/response/cookie forwarding is copied
near-verbatim from `@keystatic/astro`'s own `keystatic-astro-api.js`; all
OAuth, token exchange, CSRF/state, session, and cookie-signing logic remains
inside Keystatic core — this shim owns none of it.

It is wired in via a small local Astro integration
(`keystaticCloudflareCompatShim()` in `astro.config.ts`) that calls
`injectRoute()` for `/api/keystatic/[...params]`, listed **before**
`keystatic()` in the `integrations` array — Astro's router matches routes in
registration order, so this project-registered route wins over the
integration-injected (broken) one for the same pattern; confirmed by
inspecting the generated route manifest (`origin: "project"`-equivalent
entry ordered first) and, conclusively, by request tracing in
`wrangler dev`/`wrangler tail` (see below). **Important:** this is
deliberately *not* a plain `src/pages/api/keystatic/[...params].ts` file —
a plain file is scanned into the route graph on every build regardless of
whether Keystatic is mounted, which would force even default production
builds (`SKIP_KEYSTATIC=true`) from a pure static-assets deploy into a
Worker-fronted "server" build. The local integration is only added to
`integrations` under the same `includeKeystatic` condition that gates
`keystatic()` itself, so default production builds stay fully static with
zero on-demand routes — verified via `apps/web/test/astro-foundation.test.ts`,
which now asserts `dist/server/entry.mjs` does not exist after a default
build.

A related latent bug surfaced while wiring this up: `keystatic.config.tsx`'s
GitHub-vs-local storage selector previously read `process.env.KEYSTATIC_STORAGE_KIND`,
which Vite never statically inlines for either the browser Keystatic UI
bundle or the on-demand `workerd` SSR bundle (only for Node-prerendered
pages, which this config isn't). It now reads
`import.meta.env.PUBLIC_KEYSTATIC_STORAGE_KIND`, Astro/Vite's supported
mechanism for a value baked into both bundles at build time — verified by
inspecting both bundles for the literal resolved `storage` object post-build.
This makes `PUBLIC_KEYSTATIC_STORAGE_KIND=github` (not the previous
`KEYSTATIC_STORAGE_KIND=github`) the correct build-time flag for a
GitHub-storage build; see `.claude/skills/keystatic-mdx/SKILL.md`.

**Compatibility tests:** `apps/web/test/keystatic-cloudflare-shim.test.ts`
builds a GitHub-storage variant and runs it under real `workerd` via
Wrangler's `unstable_dev`, asserting (a) the route no longer throws the
removed `Astro.locals.runtime.env` error, (b) without credentials configured
it fails with Keystatic core's own "Missing required config" error (not a
runtime crash) — proof the request reaches `makeGenericAPIRouteHandler`, and
(c) with dummy credentials configured via `vars`, the response is no longer
a config error or a crash. Cookie/header forwarding is copied from
Keystatic's own tested code and isn't independently re-tested here.

**Runtime verification (2026-08-12):** confirmed under three environments —
local `wrangler dev` without credentials (500, Keystatic's own "Missing
required config" error), local `wrangler dev` with dummy `.dev.vars`
credentials (moves past the config check into Keystatic's own routing —
404 on a non-existent sub-path, not a crash), and the **deployed**
`terra-nexus-web-preview` Worker (`wrangler tail` shows the same "Missing
required config" error, stack-traced through
`chunks/keystatic-cloudflare-shim_*.mjs`, not the original
`Astro.locals.runtime.env` throw). The original blocker is resolved; the
GitHub App/credentials boundary (§15/§16 below) is the only remaining step.

**Delete this shim** once a future `@keystatic/astro` release sources env
from `cloudflare:workers` (or an equivalent non-throwing path) itself —
check the installed `keystatic-astro-api.js` on every `@keystatic/astro`
upgrade and remove `src/lib/keystatic-cloudflare-shim.ts` +
`keystaticCloudflareCompatShim()` in `astro.config.ts` if the upstream route
is fixed.

**Prepared and unaffected by this blocker:**
`apps/web/keystatic.config.tsx` now selects `storage: { kind: 'github', repo:
{ owner: 'JoshRtP', name: 'terra-nexus-web' } }` when
`KEYSTATIC_STORAGE_KIND=github` is set (a Cloudflare env var, opt-in), and
falls back to `local` storage otherwise — local development keeps working
exactly as before with no env vars set. The GitHub App creation itself (an
owner action, independent of the bug above) can proceed at any time using
the real preview URL; see the session record for exact steps.

### 6.2 GitHub App credentials + hosted publishing loop (2026-08-12)

**GitHub App created manually, not via Keystatic's guided flow.** Keystatic's
"Create GitHub App" manifest flow (the one its own docs describe) is
hard-gated to Node dev environments: `@keystatic/core`'s
`createdGithubApp()` returns `400` unless `process.env.NODE_ENV ===
'development'`, and on success it writes credentials straight to a local
`.env` file via `fs.writeFile` — it can never run in a deployed `workerd`
Worker (no filesystem, `NODE_ENV` isn't `'development'` there). The app
(`terra-nexus-keystatic`) was created directly via
`github.com/settings/apps/new` instead — homepage/callback URLs pointed at
`terra-nexus-web-preview`, `Contents: Read & write` + `Metadata: Read-only`
permissions, installed on `JoshRtP/terra-nexus-web`. The three secrets
(`KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET`,
`KEYSTATIC_SECRET`) are set via `wrangler secret put ... --name
terra-nexus-web-preview`; `PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` and
`PUBLIC_KEYSTATIC_STORAGE_KIND=github` are build-time env vars baked in via
`import.meta.env.PUBLIC_*` (same mechanism as storage kind, see §6.1) —
confirmed the app slug is correctly inlined into the client bundle; the
server-side `slugEnvName` option Keystatic core also accepts is effectively
dead code in production (only consumed by the dev-only create-app route
above), so no fix was needed there.

**Monorepo path bug, found and fixed:** `keystatic.config.tsx`'s github
storage config was missing `pathPrefix: 'apps/web'`. Without it, GitHub
storage mode reads from the literal repo root (`JoshRtP/terra-nexus-web`),
not `apps/web/` where all content actually lives — the hosted dashboard
showed every collection as 0 entries despite real committed content.
Local storage mode never surfaced this because it resolves paths relative
to `process.cwd()` instead. Fixed in commit `13af8b7`.

**Content-component image round-trip bug, investigated and fixed —
confirmed NOT a Keystatic defect.** Opening the sample Insight article in
the hosted editor and saving (even an unrelated field) silently dropped the
`image` prop off its `<Figure>` component. Root cause, confirmed by tracing
the real upstream source (`Thinkmill/keystatic`, installed `0.6.5` verified
identical to current `main` for the relevant code) and by replaying the
actual discovery algorithm (`collectDirectoriesUsedInSchema` /
`getDirectoriesForTreeKey` / `getTreeNodeAtPath`, all in
`packages/keystatic/src/app/tree-key.tsx`) against real GitHub tree data:
Keystatic's own upload mechanism (`getSrcPrefix` in
`packages/keystatic/src/form/fields/image/getSrcPrefix.tsx`) always writes
`fields.image()` values — top-level fields and content-component-nested
fields alike — to a slug-scoped path,
`{publicPath}/{entry-slug}/{filename}`. GitHub-mode's directory-prefetch
correctly expects that shape (it's the only shape Keystatic's own writes
ever produce) since, unlike local mode, it can't lazily stat arbitrary
paths — it has to know in advance which directories to fetch. The sample
article's Figure image was hand-placed at a flat path
(`/images/mdx/soil-sample-cross-section.png`, no slug folder) when the
article was originally authored, bypassing the upload control — so
GitHub-mode found nothing there and the field silently parsed to `null`.
Directory discovery for component-nested image fields is itself correctly
implemented (an earlier theory blaming `kind: 'child'` handling in
`collectDirectoriesUsedInSchemaInner` was wrong and retracted after reading
the real source — `fields.mdx()` is `kind: 'form', formKind: 'content'`
with its own `directories` array explicitly populated from every
registered content-component's schema).

Confirmed fixed: moved the image to its slug-scoped path, updated the
article's `<Figure image=...>` reference, removed the old flat file — the
same shape Keystatic's own upload would have produced — and verified the
Figure now shows its thumbnail correctly in the hosted editor.
Live-verified the actual fix mechanism too: uploading a brand-new image
through a Figure's own "Choose file" control produces a correctly
slug-scoped path and round-trips cleanly through save + reload.

**Binding rule going forward:** any `fields.image()` value inside an MDX
content component (Figure, FullBleedImage, Video poster, Gallery) must be
populated through Keystatic's own upload control — local or hosted —
never hand-typed as a path string into MDX source. Hand-typed asset paths
work fine in local storage mode (no directory prefetch needed) but will
silently fail to round-trip in GitHub storage mode.

**Separate, unrelated finding — not investigated further:** local dev
(`npm run dev`) currently fails to open Keystatic collection-item pages at
all (`/keystatic/collection/<name>/item/<slug>`), independent of storage
mode, with a `module is not defined` error from Astro 6.4.6's dev-mode SSR
module runner. Reproduced consistently, including after a clean `.astro`
cache wipe and dev-server restart. Likely an `@keystatic/astro@5.2.0` /
Astro 6.4.6 dev-mode incompatibility, distinct from the M6 Cloudflare
compat shim's own known route-collision warning
(`/api/keystatic/[...params]` registered by both the shim and
`@keystatic/astro`'s own route). Not chased down this session — flagging
so it isn't mistaken for a regression from this work, and isn't
rediscovered from scratch next time someone needs local Keystatic editing.

**Publishing loop proved end-to-end:** hosted `/keystatic` → GitHub OAuth
login → dashboard/collection reads (after the `pathPrefix` fix) → edit +
save an existing Insight → real commit lands on `JoshRtP/terra-nexus-web`
`main` → content correctly reflects in the hosted editor on reload,
including image fields uploaded through the UI. Cloudflare Git
auto-deploy (so the public site rebuilds automatically on a CMS save,
without a manual `wrangler deploy`) is still outstanding — see the session
record for exact owner-facing dashboard steps.

## 7. Migration phases (do these in order; each ends with a working build)

| Phase | Exit criteria |
| --- | --- |
| M0 — Baseline (done 2026-08-12) | Repo copied to new path with git history intact; install/build/typecheck/test/check all run; issues logged in `CLAUDE.md` |
| M1 — Green baseline + architecture docs (done 2026-08-12) | Known TS error + stale inventory fixed; `CLAUDE.md`/architecture doc/skills updated to state Keystatic is canonical, OKF is temporary |
| M2 — Keystatic + MDX + editorial content architecture (done 2026-08-12) | Keystatic installed (local storage), `posts`/`authors`/`topics` collections live, `caseStudies` schema designed, 12 MDX content components built |
| M3 — Browser CMS proof of concept (done 2026-08-12) | `/keystatic` works locally end-to-end; one representative Insight article renders through Astro at `/insights/[slug]`; build/typecheck/test/check green; browser QA at 4 viewports |
| M4 — Progressive Tailwind/design-system normalization | Tailwind installed, `design-system.css` tokens ported to Tailwind config/tokens, no visual regression (Playwright QA at 4 viewports) |
| M5 — Cloudflare Workers preview deployment (done 2026-08-12) | Deployed to `https://terra-nexus-web-preview.josh-242.workers.dev` via `wrangler deploy`; adapter `imageService` set to `'passthrough'` (no `astro:assets` usage in this repo, avoids provisioning an unused Cloudflare Images binding); build/typecheck/test/check all green; browser QA at 4 viewports, zero console errors; no production DNS touched |
| M6 — GitHub-backed production Keystatic workflow (credentials + publishing loop done; Cloudflare Git auto-deploy pending) | Compatibility shim resolves the upstream `@keystatic/astro@5.2.0`/Cloudflare-adapter blocker (§6.1). GitHub App created manually (Keystatic's guided flow is dev-only, can't run on a deployed Worker — §6.2), Wrangler secrets set, `pathPrefix` monorepo bug fixed, content-component image round-trip bug investigated and fixed (not a Keystatic defect — a content-authoring convention mismatch, §6.2). Hosted publishing loop proved end-to-end: GitHub OAuth login → collection reads → edit + save → real commit on `main` → correct reflection back in the editor, including uploaded images. **Remaining before M6 is complete:** Cloudflare Git auto-deploy so the public site rebuilds automatically on a CMS save — see §6.2 and the session record |
| M7 — Expanded reusable visual/design system | Reusable component vocabulary for sections/editorial blocks |
| M8 — Cinematic homepage hero | GSAP hero (desktop/mobile/reduced-motion) passes performance + visual QA |
| M9 — WordPress content migration + SEO migration | WordPress content/URLs/metadata migrated where relevant; redirects validated; remaining OKF content (Expertise/Services/Audiences) migrated to Keystatic and OKF retired |
| M10 — Production cutover | DNS moved — requires explicit owner authorization, never automatic |

## 8. Reference

Full owner-supplied source document:
`Terra_Nexus_Astro_Keystatic_Cloudflare_Architecture.md` (attached in
session, not yet copied into the repo — copy it into `docs/architecture/`
verbatim if the owner wants it preserved as the original reference).
