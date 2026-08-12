# Terra Nexus — Root Operating Rules

This file governs how Claude Code works in this repository. It sits alongside,
and does not override, [`AGENTS.md`](AGENTS.md) (content-governance rules for
the OKF knowledge bundle in `knowledge/`). If the two ever appear to conflict,
`AGENTS.md` wins on content/governance questions and this file wins on
code/architecture questions — surface the conflict rather than guessing.

Full architecture rationale lives in [`docs/architecture/web-platform-architecture.md`](docs/architecture/web-platform-architecture.md).
Read it before any structural change (new integration, new rendering mode,
new top-level dependency, deployment target changes).

## What this repository actually is today

Do not assume this is a greenfield scaffold. As of the last audit
(2026-08-12), `apps/web` is a working, tested, static Astro 6 site with:

- **No React, no Tailwind, no GSAP, no Keystatic, no Cloudflare adapter yet.**
  These are target-architecture additions, not existing infrastructure to
  "normalize." Introduce them deliberately, one milestone at a time, per
  §Migration phases below — not all at once.
- A bespoke, well-tested **OKF governed-content pipeline**
  (`apps/web/src/lib/okf/*`) that compiles `knowledge/` (repo root) into
  routes at build time. This is NOT Astro Content Collections and is NOT
  Keystatic. It has its own eligibility/approval rules — see `AGENTS.md`.
  Do not route around it or duplicate its job with a second content system
  without an explicit decision to replace it.
- Plain CSS design tokens in `apps/web/src/styles/design-system.css`
  (already reverse-engineered from the live WordPress brand kit) plus an
  older `foundation.css`. Treat `design-system.css` as the current source of
  brand truth until/unless it is deliberately migrated into Tailwind tokens.
- A real Vitest + pytest test suite, and a non-mutating check harness
  (`npm run check`) that runs Python OKF validators, pytest, and inventory
  freshness checks. Run it before considering backend/content-pipeline work
  done.

## Non-negotiable rules

1. **Astro first.** React is only for components that genuinely need
   client-side state/interaction. There is currently zero React in the repo —
   adding it is a real architectural step, not a default.
2. **No page-specific one-off styling** when an existing design-system
   pattern in `design-system.css` (or its future Tailwind-token replacement)
   can be extended instead.
3. **Content stays in `knowledge/` via the OKF pipeline** until a deliberate,
   owner-approved decision is made to introduce Keystatic/MDX alongside or in
   place of it. Do not hand-write blog/editorial content directly into page
   components.
4. **Use current official documentation** (Context7 and/or official project
   docs) before implementing or changing configuration for Astro, Tailwind,
   React, GSAP, Keystatic, Cloudflare, or Wrangler — these move fast; do not
   rely on memorized syntax.
5. **Preserve the current visual implementation** unless a task explicitly
   calls for redesign. `homepage-alt-draft` (a new draft page reachable only
   at `/homepage-alt`, not linked from nav) is the sanctioned place for
   homepage redesign exploration — it does not touch `index.astro`.
6. **Never bake critical copy or final Terra Nexus logo artwork into
   cinematic video.** Logo = real SVG layer. Copy = real HTML. Video = media
   layer only.
7. **Preserve production URLs**, or implement and document explicit
   redirects. The current route table lives in
   `docs/architecture/web-platform-architecture.md`.
8. **Browser-based responsive QA is required** for meaningful UI work, at
   minimum 1440px, 1024px, 768px, 390px. Store screenshots under
   `artifacts/qa/`. A production build succeeding is not sufficient to call
   UI work complete.
9. **Never report success with known build, type, lint, test, or console
   errors.** If something is known-broken, say so explicitly.
10. **Production deploys, DNS changes, domain transfer, destructive database
    actions, resource deletion, and secret rotation always require explicit
    owner approval.** Local dev, feature branches, commits, PR prep, and
    preview/staging config (once credentials exist) are broad-autonomy.
11. **Never commit secrets/API keys** to this file, Skills, or any tracked
    config. Use environment variables / Wrangler secrets.
12. Content-specific rules (service families, approval gating, no invented
    case studies/clients, etc.) are governed by `AGENTS.md` — read it before
    touching anything under `knowledge/`.

## Before any structural change

1. Read `docs/architecture/web-platform-architecture.md`.
2. Check whether an existing Skill under `.claude/skills/` already covers the
   work (`terra-nexus-design-system`, `astro-architecture`, `keystatic-mdx`,
   `cinematic-ui`, `seo-content`, `cloudflare-deployment`, `visual-qa`,
   `migration-rules`).
3. Retrieve current docs for any framework/API involved if it's plausible the
   remembered syntax is stale.
4. Implement the smallest coherent change.

## Required checks before calling work done

```
npm run web:build        # production Astro build must succeed
npm run web:typecheck    # astro check — zero errors (warnings tolerable, flag them)
npm run web:test         # vitest — must pass
npm run check            # OKF/python validators + pytest + inventory freshness
```

For UI-affecting changes, also run Playwright browser QA at the four
required viewports and inspect console output before reporting completion.

## Known pre-existing issues (not introduced by this migration, not yet fixed)

- `apps/web/src/pages/homepage-alt.astro:575` — `astro check` reports
  `'hero' is possibly 'null'` (TS 18047). One error, pre-existing on
  `homepage-alt-draft`.
- `knowledge/bundle-inventory.json` and `knowledge/TREE.txt` are stale
  relative to current `knowledge/` content — `npm run check` fails on the
  inventory-freshness step until `python scripts/generate_inventory.py
  knowledge --tree` is run and the results committed.
- `apps/web/public/images/terranexus-colorway-palette-sheet.png` is a 16MB
  design-reference file sitting in the static `public/` output path — it
  ships to production as-is today. Worth moving to R2 or `docs/` once media
  strategy work starts (§9 of the architecture doc).
- `apps/web/public/images/image.png` and `image copy.png` have generic,
  undescriptive filenames — worth renaming/removing when touched.

## Milestone-scoped work (do not skip ahead)

See `docs/architecture/web-platform-architecture.md` §Migration phases for
the full sequence. Do not install Tailwind, Keystatic, GSAP, or a Cloudflare
adapter speculatively — introduce each as its own reviewable phase with a
working build/test/QA loop before and after.
