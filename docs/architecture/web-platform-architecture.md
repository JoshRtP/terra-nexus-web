---
title: "Terra Nexus Web Platform Architecture (repo-native)"
status: "Target architecture, adopted incrementally"
updated: "2026-08-16 (M6 closeout)"
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
| Styling | Hand-written CSS (`design-system.css`, `foundation.css`) plus Tailwind CSS v4 (M4, this session) bridged to the same design tokens via a CSS-first `@theme` layer | Tailwind coverage expands progressively (M7); `design-system.css` remains the token source of truth |
| Motion | Plain CSS transitions only | GSAP for cinematic/scroll sequences; CSS for simple motion |
| Content | Keystatic + MDX (GitHub storage mode live, M6) for Posts/Authors/Topics, live under `apps/web/src/content/`, bridged via Astro Content Collections. Bespoke OKF pipeline reading `knowledge/` (repo root) still powers Case Studies only — retained temporarily as migration source, see `AGENTS.md` | Keystatic + MDX as the sole canonical CMS; OKF retired once remaining content/validation logic migrates |
| Repo/source of truth | GitHub (`JoshRtP/terra-nexus-web`, branch `main`; legacy history preserved read-only at `JoshRtP/Webservices`) | Unchanged |
| Hosting | `@astrojs/cloudflare@13.7.0` adapter installed and deployed (M5, 2026-08-12) to the non-production Worker `terra-nexus-web-preview`; repository-owned `apps/web/wrangler.jsonc` pins the Worker name (M6 close-out). Cloudflare Workers Builds Git integration is connected and verified end-to-end (M6, 2026-08-16): `main` pushes/merges auto-deploy via `wrangler deploy` to stable `terra-nexus-web-preview`; non-production branches auto-build a `wrangler versions upload` preview without touching stable. See §11 for the verification record | Cloudflare Workers (M5 preview + M6 Git auto-deploy both live). Future: separate production `terra-nexus-web` Worker/environment, not yet implemented |
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

- `/` — homepage (the former `/homepage-alt` draft layout, canonicalized 2026-08-12)
- `/homepage-alt` — redirects to `/` (kept for anyone who bookmarked the
  pre-canonicalization draft-review URL; not a live page, not linked from nav)
- `/about` — includes a "Studio Executives" team section with two
  placeholder layout options for owner/team review (reconciled onto main
  2026-08-16 — see the review-stop note below and CLAUDE.md §5)
- `/capabilities`, `/capabilities/{5 offering slugs}`
- `/case-studies`, `/case-studies/[slug]` (dynamic, `getStaticPaths()` from OKF graph, `prerender = true`)
- `/expertise`, `/expertise/{9 topic slugs}`
- `/who-we-work-with`, `/who-we-work-with/{2 segment slugs}`
- `/digital-solutions` — placeholder product page (reconciled onto main
  2026-08-16); the homepage's "See our Digital Solutions" button points
  here instead of the earlier `/capabilities/` stand-in
- `/contact`
- `/insights`, `/insights/[slug]` (added M3 — Keystatic `posts` collection,
  `getStaticPaths()` from Astro Content Collections, `prerender = true`)
- `/robots.txt` (dynamic; emits `noindex,nofollow` + disallow when `TNX_BUILD_MODE=preview`)
- `/keystatic` (admin UI; dev-only, mounted only when `SKIP_KEYSTATIC` is
  unset — not present in production builds)

Any route restructuring must preserve these paths or add explicit redirects
before cutover — see §7.

**Top-nav anchor trial (owner review pending, reconciled onto main
2026-08-16).** The top nav's Expertise, Capabilities, and Who We Work With
links currently point at homepage sections (`/#expertise`, `/#capabilities`,
`/#who-we-work-with`) instead of their standalone pages — the idea being
those standalone pages don't yet have enough independent depth, and the
homepage's own tiles already cover onward navigation. **This is a trial,
not a decision:** the standalone `/expertise/`, `/capabilities/`,
`/who-we-work-with/` pages and all their sub-pages are still live and still
linked from the homepage itself — only the top-nav entry points changed.
Do not remove those pages/routes until the owner confirms the anchor-nav
approach (keep / revert / hybrid — see the review-stop note below). Also
reconciled: a global "Back to Top" button (`BackToTop.astro`, mounted once
in `SiteLayout.astro`) restoring the legacy WordPress site's own
back-to-top behavior — on the homepage it lands at `#expertise` (past the
photo/hero section) rather than the true top; every other page falls back
to `scrollY 0`.

**Owner review stop point (2026-08-16):** the nav-anchor trial and the two
`/about` Studio Executives layout options are both explicitly undecided —
first developed on `feature/homepage-nav-trial-and-team-review` (PR #3,
kept open as historical reference) and reconciled onto the current
M4/M6 architecture on `feature/reconcile-pr3-site-developments` for a
fresh preview. Do not treat either as approved IA/design direction until
the owner decides keep/revert/hybrid for the nav trial and picks an
executives layout (or a hybrid).

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
  starts on the homepage hero (M9, reordered after M8 content/SEO migration
  — see §9), not preemptively.

### 5.1 Tailwind v4 (M4, 2026-08-16) — integration, token strategy, CSS inventory

**Integration.** `tailwindcss@4.3.3` + `@tailwindcss/vite@4.3.3`, wired into
`astro.config.ts` via `vite.plugins` — the current official integration
path for Astro `>=5.2.0`/Vite-based projects (confirmed against current
Astro and Tailwind docs, not memorized syntax); it replaces the older
`@astrojs/tailwind` integration, which is deprecated for Tailwind v4. No
`astro.config` integrations-array entry is needed; Tailwind hooks in purely
through Vite plus a plain `@import "tailwindcss"` in a stylesheet.

**Token strategy — CSS-first bridge, not a second source of truth.**
`apps/web/src/styles/tailwind.css` uses Tailwind v4's `@theme inline` to
*alias* existing `design-system.css` custom properties into Tailwind's
theme namespace, all prefixed `tn-` (e.g. `--color-tn-accent: var(--color-accent)`)
so generated utilities (`bg-tn-accent`, `text-tn-primary-500`, `rounded-tn-lg`,
`shadow-tn-md`, `font-tn-serif`, …) resolve to the exact same CSS custom
property `design-system.css` already defines — no raw values are
duplicated. `design-system.css` remains the single source of design-token
truth; a new token is always added there first, then optionally exposed in
`tailwind.css` if a component actually needs the utility form. The `tn-`
prefix is deliberate: it keeps bridged tokens visually distinct from
Tailwind's own built-in scale and prevents silently redefining defaults
other future Tailwind usage might assume (`rounded-lg`, `shadow-md`, etc.
still mean Tailwind's own defaults, not Terra Nexus's).

Two scales are deliberately **not** bridged, because they already interop
without one: spacing (`design-system.css`'s `--space-*` scale is
numerically identical to Tailwind's default spacing scale at every shared
step — `--space-4`/Tailwind's `4` are both `1rem`, confirmed value-by-value)
and max-widths (still served by the existing `.container`/`.text-container`/
`.narrow-container` classes — Tailwind v4's `--container-*` namespace has
different semantics from a plain max-width scale; real utility coverage
here is M7 scope, not guessed at now).

**Representative migration.** `PageHero.astro` — shared by the
`/capabilities`, `/expertise`, `/insights`, `/about`, `/contact`,
`/case-studies`, and `/who-we-work-with` index pages (individual
Capability/Expertise sub-pages use the separate `CapabilityPage.astro`/
`ExpertisePage.astro` components, not `PageHero`) — was converted from a
scoped `<style>` block to Tailwind utilities backed by the `tn-` bridge,
proving the pattern with a pixel-identical visual result (including using
`leading-[var(--line-relaxed)]` instead of Tailwind's built-in
`leading-relaxed`, because Tailwind's value, 1.625, differs from
`design-system.css`'s `--line-relaxed`, 1.7). No other component/page was
migrated in M4 — see CLAUDE.md/this session's boundary discussion; wider
coverage is M7 scope.

**Cascade-layer correction (post-PR-#4-review, same day).** The first pass
above used plain `mb-4`/`mb-5` utilities on the eyebrow/h1, which is
wrong: Tailwind v4 emits every utility inside `@layer utilities`, and per
the CSS cascade-layers spec, any unlayered declaration always beats any
layered one for the same property — regardless of selector specificity or
source order. `design-system.css` has two unlayered rules that collide
here (`.eyebrow`'s own `margin-bottom: var(--space-3)`, and the global
`h1,h2,...{ margin: 0 }` reset), so those utilities were silently losing.
Confirmed with real computed styles, not inferred: pre-M4 `main` had
`margin-bottom: 16px`/`20px` on `/capabilities`; this branch had `12px`/
`0px` at every viewport (1440/1024/768/390) before the fix. Fixed by
reintroducing a two-rule scoped `<style>` block in `PageHero.astro` for
just those two properties (the same mechanism — Astro's unlayered,
higher-specificity scoping attribute — the pre-M4 component already used
to win against the same global rules); `!important` and moving all of
`design-system.css` into layers were both rejected as the wrong general
pattern or too large a change for this fix. A second review claim (that
the component also lost `design-system.css`'s `@media (max-width: 48rem)
{ .page-hero { padding-block: ... } }` mobile padding reduction) was
checked the same way and found **false**: the pre-M4 scoped style had
already been winning that same media query via the identical specificity
mechanism, so mobile padding was unconditionally `80px`/`64px` on `main`
too — not a regression, left unchanged, documented in a code comment.
This is a real gotcha any further Tailwind-utility migration in this repo
can hit wherever `design-system.css` has an existing unlayered rule for
the same element/property — M7 should check for it systematically rather
than rediscovering it per-component.

**CSS inventory (`design-system.css`, 627 lines; `foundation.css`, 211
lines) — classified, not purged:**

- **A. Canonical design tokens** — `design-system.css` `:root` block
  (color ramps, semantic colors, typography, spacing, radii, shadows,
  transitions, gradients). Now also the source the Tailwind `tn-` bridge
  reads from. Keep indefinitely; this is the token source of truth.
- **B. Global/base rules still needed** — `design-system.css`'s
  `*`/`html`/`body`/heading/link/`img`/list resets, `.sr-only`,
  `.skip-link`, reduced-motion block. Still load on every page via
  `SiteLayout.astro`; not superseded by Tailwind's preflight (which loads
  in a CSS layer and always loses to this unlayered CSS — see the
  `SiteLayout.astro` import comment). Keep.
- **C. Reusable component patterns (candidates for M7 Tailwind coverage)**
  — `.container`/`.text-container`/`.narrow-container`, `.section`/
  `.section-alt`/`.section-dark`, `.eyebrow`, `.btn`/`.btn-primary`/
  `.btn-secondary`, `.card`/`.card-grid`, `.accordion*`, `.stat-group`/
  `.stat-value`/`.stat-label`, `.page-hero` (now only referenced by
  `PageHero.astro`'s wrapper classes, not its own scoped styles),
  `.diagram-container`. All still actively used across the site (Header,
  Footer, CapabilityPage, ExpertisePage, CaseStudyArticle,
  CaseStudyCard, MDX components) — not touched in M4, real candidates for
  M7's expanded component vocabulary.
- **D. Page-specific/legacy CSS (later migration)** — none found as bare
  page-level `<style>` blocks outside components; page-specific styling in
  this repo already lives in per-component scoped `<style>` blocks
  (`Header.astro`, `Footer.astro`, etc.), which is consistent with rule 2
  in CLAUDE.md, not legacy debt. Revisit these component-scoped blocks
  individually as M7 candidates, the same way `PageHero.astro` was handled
  in M4.
- **E. Genuinely dead CSS** — `apps/web/src/styles/foundation.css`
  (211 lines) is imported by exactly one file, `FoundationLayout.astro`,
  which is itself imported by zero pages or components (confirmed via
  repo-wide search). Both appear to predate `design-system.css`/
  `SiteLayout.astro` and are dead code today. **Not removed in M4** — this
  is unrelated to the Tailwind migration and removing a whole
  layout+stylesheet deserves its own reviewed change, not a drive-by
  deletion inside an M4 commit. Flagged here for a future cleanup pass
  (M7 or sooner, owner's call).

No CSS was deleted in M4. `design-system.css` and `foundation.css` are both
retained exactly as they were before this session, other than the new
`tailwind.css` file and `PageHero.astro`'s style-to-utility conversion.

## 6. Cloudflare direction

**Adapter installed and deployed (M5, 2026-08-12); repository-owned Wrangler
config landed at M6 close-out; Cloudflare Workers Builds Git integration
connected and verified end-to-end (M6, 2026-08-16) — current as of
2026-08-16.**
`@astrojs/cloudflare` is pinned to `13.7.0` in `apps/web/package.json` — the
last release whose peer range (`astro@^6.3.0`) covers this repo's Astro
`6.4.6`; `@astrojs/cloudflare@14+` requires Astro 7 and is an explicit
non-goal until an Astro 7 upgrade is its own deliberate milestone. `astro.config.ts`
sets `output: 'static'` (the site stays fully prerendered by default — the
only on-demand routes are the Keystatic admin/API routes, gated out of
production builds) with
`adapter: cloudflare({ prerenderEnvironment: 'node', imageService: 'passthrough' })`;
the `prerenderEnvironment` override is required because the OKF compiler
(`apps/web/src/lib/okf/compiler.ts`) uses Node built-ins (`node:fs/promises`,
`node:crypto`, `node:path`, `node:url`) at build time, which the adapter's
default `workerd` prerender runtime doesn't provide.

`apps/web/wrangler.jsonc` is now a hand-written, repository-owned file (see
§11) — it pins the Worker name to `terra-nexus-web-preview` and a fixed
`compatibility_date`, deliberately minimal otherwise (main entrypoint,
assets binding, and the auto-provisioned `SESSION` KV namespace are left to
the adapter's own generation). Verified locally and against the real
Cloudflare account: `astro build` succeeds, `npx wrangler dev` serves the
built worker correctly under `workerd`, and `wrangler deploy` /
`wrangler versions upload` both resolve to this file and deploy correctly
(see §11 for the full verification record). GitHub-mode Keystatic (M6) adds
on-demand (`prerender: false`) routes only when `SKIP_KEYSTATIC=false` is
set at build time — those run under `workerd` regardless of
`prerenderEnvironment`, which only affects the static prerender step.

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
including image fields uploaded through the UI. Cloudflare Git auto-deploy
(so the public site rebuilds automatically on a CMS save, without a manual
`wrangler deploy`) was outstanding at the time this paragraph was written
(2026-08-12) and is now connected and verified end-to-end as of
2026-08-16 — see §11.1–§11.3.

## 7. Branch model (adopted 2026-08-12)

`main` is the canonical baseline for the new site — reconciled from
`origin/main` (legitimate hosted-Keystatic CMS commits) and
`homepage-alt-draft` (homepage/application work, M5/M6 Cloudflare setup)
via a normal merge (`homepage-alt-draft` merged `origin/main`, then that
branch PR'd into `main` — no history rewrite; `homepage-alt-draft` had
already been pushed/shared, so rebasing it was avoided). See the session
record for the exact commit range.

Going forward:

- `main` — canonical new Terra Nexus website. Cloudflare Workers Builds'
  production branch (see §11).
- `feature/*` — Claude/owner development branches.
- `fix/*` — bug fixes.
- `content/*` — editorial drafts/review, when a change is large enough to
  warrant review before landing on `main` (routine Keystatic saves commit
  straight to `main` today — see §10).

`homepage-alt-draft` is retired once its work lands on `main` — it was a
temporary integration branch for the homepage-promotion + M5/M6 Cloudflare
work, not a permanent parallel-development branch, and CLAUDE.md no longer
references it as a development baseline.

## 8. Publication model (adopted 2026-08-12)

Two independent fields on the `posts` collection (`keystatic.config.tsx`
and `src/content.config.ts`, kept in lockstep per that file's own header
comment), replacing the earlier `draft` checkbox + date-only `publishDate`:

- `editorialStatus`: `'draft' | 'approved'` — has an editor signed off?
- `publishAt`: Keystatic `fields.datetime`, a naive `YYYY-MM-DDTHH:mm`
  string with no timezone offset — earliest time it may go public.

Derived state (never stored — computed on every read):

```text
draft     = editorialStatus is 'draft'
scheduled = editorialStatus is 'approved' AND publishAt > now
published = editorialStatus is 'approved' AND publishAt <= now
```

Implemented once, in `src/lib/publication.ts`
(`getPublicationState`/`isPubliclyVisible`), and consumed by every route
that lists or serves a post — currently `src/pages/insights/index.astro`
and `src/pages/insights/[slug].astro`.

**Timezone policy:** `publishAt` is entered and interpreted as **America/Denver**
(Mountain Time — the owner's timezone) wall-clock time. Keystatic's
`fields.datetime` input has no timezone selector of its own — this is a
deliberate, documented site-wide convention, not an ambiguity left
unresolved. `zonedWallClockToUtc()` in `src/lib/publication.ts` converts
that naive string to a real UTC instant, correctly across the MST/MDT
boundary (a fixed UTC offset would be wrong roughly half the year).
Covered by `test/publication.test.ts`.

**Automatic, not decorative:** `/insights` and `/insights/[slug]` are
`prerender: false` (on-demand, served by the Cloudflare Worker) instead of
build-time static, specifically so `isPubliclyVisible()` is evaluated
against the actual request time. Once `main` contains an approved post
with a future `publishAt`, no further action — no rebuild, no manual
deploy, no one needing to be online — is required for it to become public
exactly at that moment; the very next request after `publishAt` passes
sees it. This is the smallest change that satisfies that requirement
without moving the rest of the (fully static) site to server rendering —
see §6 for why the site otherwise stays `output: 'static'`.

**Gating behavior:**

- `/insights/[slug]` 404s uniformly for a nonexistent slug, a draft, and
  an approved-but-not-yet-published post — no signal distinguishes "this
  doesn't exist" from "this isn't public yet."
- `/insights` silently omits anything not `published`.
- Preview deployments (`PUBLIC_TNX_BUILD_MODE=preview`, mirroring the
  existing `TNX_BUILD_MODE` convention used by `robots.txt` — see
  `src/lib/build-mode.ts`) bypass gating entirely, so an editor can review
  drafts/scheduled posts via the preview URL. Preview responses already
  carry `noindex,nofollow` and `robots.txt` disallows the whole preview
  site, so this never leaks into search.
- No RSS feed or sitemap exists yet (confirmed absent, not overlooked);
  either would need to reuse `isPubliclyVisible()` if/when added.

## 9. Migration phases (do these in order; each ends with a working build)

| Phase | Exit criteria |
| --- | --- |
| M0 — Baseline (done 2026-08-12) | Repo copied to new path with git history intact; install/build/typecheck/test/check all run; issues logged in `CLAUDE.md` |
| M1 — Green baseline + architecture docs (done 2026-08-12) | Known TS error + stale inventory fixed; `CLAUDE.md`/architecture doc/skills updated to state Keystatic is canonical, OKF is temporary |
| M2 — Keystatic + MDX + editorial content architecture (done 2026-08-12) | Keystatic installed (local storage), `posts`/`authors`/`topics` collections live, `caseStudies` schema designed, 12 MDX content components built |
| M3 — Browser CMS proof of concept (done 2026-08-12) | `/keystatic` works locally end-to-end; one representative Insight article renders through Astro at `/insights/[slug]`; build/typecheck/test/check green; browser QA at 4 viewports |
| M4 — Progressive Tailwind/design-system normalization (**done 2026-08-16**) | Tailwind v4 installed via `@tailwindcss/vite`; CSS-first `@theme inline` bridge (`apps/web/src/styles/tailwind.css`) aliases existing `design-system.css` tokens under a `tn-` prefix, no values duplicated; `PageHero.astro` migrated as the representative component proving the pattern; full `design-system.css`/`foundation.css` inventory classified (§5.1); `build`/`typecheck`/`test`/`check` all green; independent `visual-qa` browser pass at 1440/1024/768/390 across 5 representative routes found zero console errors, zero broken requests, and no visual differences vs. the pre-M4 baseline. See `log.md`'s 2026-08-16 entry and §5.1 for full detail |
| M5 — Cloudflare Workers preview deployment (done 2026-08-12) | Deployed to `https://terra-nexus-web-preview.josh-242.workers.dev` via `wrangler deploy`; adapter `imageService` set to `'passthrough'` (no `astro:assets` usage in this repo, avoids provisioning an unused Cloudflare Images binding); build/typecheck/test/check all green; browser QA at 4 viewports, zero console errors; no production DNS touched |
| M6 — GitHub-backed production Keystatic workflow + Cloudflare Git auto-deploy (**COMPLETE, 2026-08-16**) | Compatibility shim resolves the upstream `@keystatic/astro@5.2.0`/Cloudflare-adapter blocker (§6.1). GitHub App created manually (§6.2), Wrangler secrets set, `pathPrefix` monorepo bug fixed, content-component image round-trip bug fixed, repository-owned `apps/web/wrangler.jsonc` landed (§11). Hosted publishing loop proved end-to-end: GitHub OAuth login → collection reads → edit + save → real commit on `main` → correct reflection back in the editor, including uploaded images. **Git auto-deploy connected and proven end-to-end 2026-08-16** (owner completed the Cloudflare dashboard connection; this session verified it, not assumed): merging PR #4 to `main` at commit `07e80a7` triggered a real GitHub check run (`Workers Builds: terra-nexus-web-preview`, Cloudflare's own GitHub App, `conclusion: success`) that deployed Version ID `3aee1200` and promoted it to the stable `terra-nexus-web-preview` Worker at 100% — confirmed via `wrangler deployments list` and live routes (`/`, `/insights`, `/keystatic` all 200; `/homepage-alt` 301→`/`). A throwaway branch (`test/m6-workers-build-preview`, deleted after the test) proved the non-production path separately: its build produced a distinct, unpromoted Version ID (`107b0bf4`) with its own preview URL (`noindex` `robots.txt`, confirmed serving), while `wrangler deployments list` showed no new 100% entry — the stable deployment (`3aee1200`) and its `robots.txt` (indexable) were unchanged throughout. Full record: §11 |
| M6.1 — Repository reconciliation + homepage canonicalization + publication model (done 2026-08-12) | `origin/main` (CMS commits) and `homepage-alt-draft` (M5/M6 app work) reconciled via merge, not rewrite (§7). The `/homepage-alt` draft promoted to be the one canonical `/` homepage — no more parallel "real" vs. "draft" homepage (§3, CLAUDE.md §5). Real editorial approval + scheduled-publication model implemented end-to-end, not decorative metadata (§8): `editorialStatus`/`publishAt` schema, America/Denver timezone policy, on-demand gating on `/insights`/`/insights/[slug]`, unit-tested MST/MDT handling. `build/typecheck/test/check` all green; browser QA at 4 viewports on the new `/`, zero console errors |
| M7 — Expanded reusable visual/design system (**NEXT**) | Reusable component vocabulary for sections/editorial blocks, built on the M4 Tailwind foundation |
| M8 — WordPress content + SEO + remaining CMS/OKF migration (reordered ahead of M9, 2026-08-16) | Real production content inventory, URL/redirect preservation, SEO metadata/structured data/sitemap, real Insights content, Case Studies migrated from OKF to Keystatic, remaining website-facing OKF dependency retired or explicitly accounted for. Deliberately sequenced before cinematic polish so M9 responds to real final content/IA, not placeholders — see the M4 session record for the full reasoning |
| M9 — Cinematic homepage hero + GSAP/motion system (reordered after M8, 2026-08-16) | GSAP hero (desktop/mobile/reduced-motion) passes performance + visual QA, applied to the settled post-M8 content/IA |
| M10 — Production cutover | DNS moved — requires explicit owner authorization, never automatic |

## 10. CMS editorial workflow

Two authoring paths, both landing in the same place (Git-backed MDX under
`src/content/`, read by both Astro and Keystatic):

- **Claude-first:** Claude creates/edits MDX directly on a branch → push →
  Cloudflare branch preview (§11) → owner reviews the preview URL and, if
  they want to touch formatting/images visually, opens hosted `/keystatic`
  against that same branch (Keystatic supports GitHub branch selection in
  its UI) → approves/merges. The owner is never required to open Keystatic
  just to make Claude-created content visible — the files are already the
  source of truth the moment they're committed.
- **Keystatic-first:** owner opens hosted `/keystatic`, creates/edits an
  article, saves → Keystatic commits directly to `main` (current default;
  no `branchPrefix` configured — see §14 discussion in the session record
  for why one wasn't added: it would force every hosted edit onto a
  per-session branch the owner would then have to separately merge, adding
  Git mechanics without a clear benefit today) → Cloudflare Workers Builds
  rebuilds and redeploys `main` automatically (§11, verified 2026-08-16) —
  no manual `wrangler deploy` needed for a routine Keystatic save to go
  live.

**Save vs. approval vs. publication** (draft/scheduled/published mechanics
in §8):

- *Save* = persisted to GitHub. Nothing more.
- *Content/feature branch* = work in progress, not yet approved.
- *Merge to `main`* = approved for the canonical site/deployment — but
  **not necessarily immediately visible**, if `publishAt` is still future.
- *`publishAt`* = earliest time public visitors may see it, independent of
  when it merged.

Claude automates the Git/PR/merge mechanics when the owner asks to
publish/approve content — the owner should not need to run Git commands to
move a piece from draft to live.

## 11. Cloudflare Workers Builds — Git integration COMPLETE and verified end-to-end (M6, closed 2026-08-16)

**Repository-owned config landed:** `apps/web/wrangler.jsonc` (branch
`infra/m6-cloudflare-workers-builds`). Verified by inspecting
`@astrojs/cloudflare`'s and `@cloudflare/vite-plugin`'s actual source (not
assumed): a project-root `wrangler.jsonc`/`.json`/`.toml` is read via
Wrangler's own `unstable_readConfig` and merged with the adapter's
generated defaults via `defu`, with the committed file's values winning.
Rebuilding after adding the file regenerates `dist/server/wrangler.json`
with `"name": "terra-nexus-web-preview"` (previously the unset default,
`"terra-nexus-web"`, derived from the `package.json` name) — confirmed by
direct inspection of the regenerated file, not just by reading docs.

**No Wrangler named environments used, deliberately.** This repo only ever
targets one Worker (`terra-nexus-web-preview`) for both the stable `main`
deploy and non-production branch previews of that same Worker — Wrangler
environments would add Worker-name-expansion risk (e.g. an accidental
`terra-nexus-web-preview-staging`) for no benefit here, since
`wrangler versions upload` already gives the stable-vs-preview split
without a second environment/Worker. `@cloudflare/vite-plugin`'s generated
output is always a single flat config regardless — it does not preserve
multiple `[env.*]` sections even if the source file had them, confirmed
from its `getOutputConfig()` source.

**Verified end-to-end against the real Cloudflare account (2026-08-12),
not just locally:**

- `wrangler deploy --dry-run` and `wrangler versions upload --dry-run`
  from `apps/web` both resolve to the committed `wrangler.jsonc` (Wrangler
  reports "Using redirected Wrangler configuration... Original user's
  configuration: wrangler.jsonc") and produce the correct bindings
  (`env.SESSION` KV, `env.ASSETS`) with no errors.
- A real `wrangler versions upload` was run (owner-approved) — it uploaded
  a new, unpromoted version of `terra-nexus-web-preview`
  (`Worker Version ID: 6d01fcd8-...`, preview URL
  `https://6d01fcd8-terra-nexus-web-preview.josh-242.workers.dev`).
  Confirmed via `wrangler deployments list` that the Worker's live 100%
  deployment (`bf5afb61-...`) was unaffected — the new version was never
  promoted. Confirmed via `curl` that the preview URL serves `/` (200,
  correct `<title>`), `/insights` (200), and `/homepage-alt` (301 → `/`)
  correctly.
- This test build used the plain `npm run build` (no env overrides), which
  — per `apps/web/scripts/run-astro.mjs`'s own default — sets
  `SKIP_KEYSTATIC=true` for anything other than `astro dev` unless the
  caller overrides it. So `/keystatic` correctly 404'd on that specific
  preview version. **This is expected for that build, not a config bug**
  — see the Workers Builds variable requirement below, which is the actual
  thing that must be set correctly to reproduce the currently-live
  Keystatic-enabled build.

**What Workers Builds needs, confirmed against current Cloudflare docs
(fetched 2026-08-12, not from memory):**

- **Root directory:** `apps/web` — confirmed correct (this is where
  `package.json`, `astro.config.ts`, and now `wrangler.jsonc` live).
- **Deploy command (production branch):** leave the Workers Builds
  default, `npx wrangler deploy` — no override needed now that
  `wrangler.jsonc` pins the correct name.
- **Non-production branch deploy command:** leave the Workers Builds
  default, `npx wrangler versions upload` — uploads a preview version of
  the same `terra-nexus-web-preview` Worker without promoting it, exactly
  matching the required "does NOT replace stable staging" behavior. No
  separate Worker, no environments, nothing further to configure here.
- **Production branch:** `main`.
- **Non-production branch builds:** enable (checkbox) so `feature/*`,
  `fix/*`, `content/*` get preview builds/URLs.
- **GitHub repository:** `JoshRtP/terra-nexus-web` — confirmed correct.

**Build command must be branch-aware — a plain global `npm run build` is
wrong here, found by independent security review before connecting Git.**
Workers Builds' "Build variables and secrets" panel is confirmed global
(no per-branch override) from live Cloudflare docs. The first draft of
this plan set `SKIP_KEYSTATIC=false` there to reproduce the
currently-live Keystatic-enabled `main` build — but because that panel
applies to every branch, it would have shipped the Keystatic admin UI and
`/api/keystatic/*` into every `feature/*`/`fix/*`/`content/*` preview
version too, not just `main`. That contradicts `astro.config.ts`'s own
stated intent (only `main`/stable should ever carry the on-demand admin
routes) and needlessly expands attack surface on throwaway preview
versions. Cloudflare does inject a real, documented per-build variable
that isn't subject to the global-panel limitation —
`WORKERS_CI_BRANCH` — so the **Build command** field itself (not a
dashboard variable) branches on it:

```sh
if [ "$WORKERS_CI_BRANCH" = "main" ]; then export SKIP_KEYSTATIC=false PUBLIC_KEYSTATIC_STORAGE_KIND=github PUBLIC_KEYSTATIC_GITHUB_APP_SLUG=terra-nexus-keystatic TNX_BUILD_MODE=production PUBLIC_TNX_BUILD_MODE=production; else export TNX_BUILD_MODE=preview PUBLIC_TNX_BUILD_MODE=preview; fi && npm run build
```

Verified locally by simulating both branches (`WORKERS_CI_BRANCH=main` vs
`WORKERS_CI_BRANCH=feature/test` set before invoking the same build
script): the `main` simulation's `dist/server/` contains the
`keystatic-*` chunks and both builds still resolve
`dist/server/wrangler.json`'s `name` to `terra-nexus-web-preview`
correctly; the non-`main` simulation's `dist/server/` has none — no
`/keystatic` or `/api/keystatic/*` route, matching the existing
`SKIP_KEYSTATIC=true` default and its regression test
(`apps/web/test/astro-foundation.test.ts`). Nothing in this changes
application source — it's purely how Workers Builds invokes the existing
build script. `PUBLIC_KEYSTATIC_GITHUB_APP_SLUG=terra-nexus-keystatic`
above is the GitHub App's name from §6.2; **confirm the exact slug against
the app's own settings page URL** (`github.com/settings/apps/<slug>`)
before entering this — the name and slug usually match but haven't been
independently re-verified in this session.

No Workers Builds "Build variables and secrets" panel entries are needed
at all with this approach — the build command sets everything itself,
per branch, correctly.

**Runtime secrets — already set, not touched by this change, do not
re-enter:** `KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET`,
`KEYSTATIC_SECRET` (all three set via `wrangler secret put ... --name
terra-nexus-web-preview`, confirmed still present and independent of the
Git connection — Cloudflare's own docs confirm secrets persist across
redeploys unless explicitly overwritten with `--secrets-file` or deleted).
`KEYSTATIC_GITHUB_CLIENT_ID` is currently treated as a secret (not a var)
even though the value itself isn't inherently sensitive — preserved as-is,
matching current working behavior; no reason found to change it.

**Owner completed the Cloudflare dashboard Git connection between
2026-08-16's M4 PR merge and this verification pass.** The remainder of
this section (as of the M6 close-out session record above, 2026-08-12)
predates that connection and is retained for the exact configuration it
specifies — the connection was made using those values. What follows is
this session's (2026-08-16) end-to-end proof that it actually works, not
an assumption.

### 11.1 Verification — `main` → stable staging (2026-08-16)

Proof commit: PR #4 (M4 Tailwind foundation) merged to `main` at
`07e80a753ff5fd3d138702500b17c2ccfeea8baa`.

- **GitHub check run** on that exact commit SHA: `Workers Builds:
  terra-nexus-web-preview`, app `cloudflare-workers-and-pages` (Cloudflare's
  own GitHub App — not a manual status, not a generic CI job),
  `status: completed`, `conclusion: success`, output: `Version ID:
  3aee1200-8fdd-491a-b4a5-3870a2712920`. Started ~2 minutes after the merge
  commit's timestamp (`2026-08-16T20:21:45Z` merge → `20:23:33Z` build
  start), consistent with a push-triggered build, not a coincidental
  unrelated deploy.
- **`wrangler deployments list --name terra-nexus-web-preview`** confirms
  the same Version ID, `3aee1200-8fdd-491a-b4a5-3870a2712920`, at **100%**
  — i.e. promoted to the live, stable deployment, exactly matching the
  build command's `wrangler deploy` (not `versions upload`) for the
  production branch.
- **Live routes verified** against `https://terra-nexus-web-preview.josh-242.workers.dev`:
  `/` → 200, correct `<title>`; `/insights` → 200, correct `<title>`;
  `/keystatic` → 200 (confirms the branch-aware build command correctly
  set `SKIP_KEYSTATIC=false` for `main`, matching §11's documented
  build-command logic); `/homepage-alt` → 301 → `/`. `robots.txt` on the
  stable domain returns `Disallow:` (empty — indexable), confirming this
  is the production build mode, not a preview build.
- **No production DNS or WordPress production touched** — this Worker is
  `terra-nexus-web-preview` on its `*.workers.dev` subdomain, unrelated to
  the `terra.nexus` production domain (verified still resolving to its
  existing production host, unaffected, `200`).

### 11.2 Verification — non-production branch → preview only, stable unaffected (2026-08-16)

A throwaway branch, `test/m6-workers-build-preview`, was created from
`main` at the M4 merge commit with one harmless, non-application commit
(a new standalone Markdown file, no source/config changes) and pushed,
then deleted after the test. Not merged to `main`.

- **GitHub check run** on that branch's commit: same
  `Workers Builds: terra-nexus-web-preview` app, `conclusion: success`,
  output: `Version ID: 107b0bf4-55bc-4ea0-b094-09be9a65bf35`, **`Preview
  URL: https://107b0bf4-terra-nexus-web-preview.josh-242.workers.dev`**,
  **`Preview Alias URL: https://test-m6-workers-build-preview-terra-nexus-web-preview.josh-242.workers.dev`**
  — a distinct Version ID and a dedicated preview URL is exactly the
  `wrangler versions upload` shape (an uploaded-but-unpromoted version),
  not `wrangler deploy`.
- **Preview URL verified live:** `/` → 200, correct `<title>`; `robots.txt`
  → `Disallow: /` (fully noindexed — correct preview-build behavior, not
  the production build).
- **Stable deployment unaffected:** `wrangler deployments list` immediately
  after this branch's build still ends at `3aee1200-...` at 100% — **no
  new entry appears** for the branch build, proving it never touched the
  promoted/stable deployment. The stable domain's `robots.txt` was
  re-checked and still returns the indexable (production) `Disallow:`
  (empty) value throughout, unchanged.
- Branch deleted (`git push origin --delete test/m6-workers-build-preview`)
  after the proof; the uploaded Cloudflare version itself (`107b0bf4-...`)
  was left as-is (harmless, unpromoted, no cleanup required for an
  unpromoted Worker version).

### 11.3 Final deployment model (confirmed, not aspirational)

```text
main
  → Cloudflare Workers Builds (Git push/merge trigger)
  → wrangler deploy
  → stable terra-nexus-web-preview (100% deployment)

non-production branches (feature/*, fix/*, content/*, test/*, ...)
  → Cloudflare Workers Builds (Git push trigger)
  → wrangler versions upload
  → preview/version URL (noindex, unpromoted)
  → stable terra-nexus-web-preview deployment unchanged

future production
  → separate terra-nexus-web Worker/environment
  → NOT implemented yet — no production DNS, no production Worker exists
```

### 11.4 Rollback

- **Disable Git auto-deploy:** Worker → Settings → Builds → disconnect the
  repository. Manual `wrangler deploy` / `wrangler versions upload` from a
  local authenticated shell continues to work exactly as before —
  `wrangler.jsonc` now makes that simpler (no `--name` flag needed).
- **Revert to a known-good version:** `wrangler versions list --name
  terra-nexus-web-preview` (or the dashboard's Deployments tab) to find a
  prior version ID, then `wrangler rollback --name terra-nexus-web-preview
  --version-id <id>` (or "Rollback" in the dashboard) to restore it as the
  live 100% deployment without a rebuild.
- **Revert the repository config:** `git revert` the commit that adds
  `apps/web/wrangler.jsonc` (or delete the file) — the adapter falls back
  to its prior auto-generated config; the next *manual* deploy would then
  need `--name terra-nexus-web-preview` again, as before this change.
- **Runtime secrets are never affected by any of the above** — they live
  on the Worker independent of Git connection state, code version, or this
  config file.
- **WordPress production (`terra.nexus`) is never in the blast radius** —
  nothing in this rollback path touches DNS, a custom domain, or the
  production `terra-nexus-web` Worker (not yet created).

## 12. Reference

Full owner-supplied source document:
`Terra_Nexus_Astro_Keystatic_Cloudflare_Architecture.md` (attached in
session, not yet copied into the repo — copy it into `docs/architecture/`
verbatim if the owner wants it preserved as the original reference).
