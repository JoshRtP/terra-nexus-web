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

- **Keystatic + MDX is the canonical target content-management
  architecture** (decided 2026-08-12). React and MDX were introduced
  specifically to support the Keystatic admin UI and MDX editorial
  content — not as general-purpose additions. Tailwind, GSAP, and a
  Cloudflare adapter are still not installed; introduce them deliberately,
  one milestone at a time, per §Migration phases below — not all at once.
- A bespoke, well-tested **OKF governed-content pipeline**
  (`apps/web/src/lib/okf/*`) that compiles `knowledge/` (repo root) into
  routes at build time. This is NOT Astro Content Collections and is NOT
  Keystatic. It has its own eligibility/approval rules — see `AGENTS.md`.
  **It is retained temporarily** as a migration source, a reference for
  existing structured content, and a source of validation concepts worth
  preserving — not as a second permanent publishing architecture. It powers
  Case Studies today (the only content type actually wired to it); it
  should be retired once its remaining content and useful validation
  behavior have migrated to Keystatic. See
  `docs/architecture/okf-migration-inventory.md`.
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
   client-side state/interaction, plus the Keystatic admin UI itself (its
   one sanctioned use today). Do not add React to ordinary page components
   as a default.
2. **No page-specific one-off styling** when an existing design-system
   pattern in `design-system.css` (or its future Tailwind-token replacement)
   can be extended instead.
3. **Keystatic + MDX is the canonical content-management architecture.**
   New editorial content (blog/Insights, and eventually Case Studies,
   Expertise, Services, Audiences) is authored through Keystatic collections
   in `apps/web/src/content/`, not hand-written into page components and not
   added to `knowledge/`. The OKF/`knowledge/` pipeline is retained
   temporarily as a migration source and reference — see
   `docs/architecture/okf-migration-inventory.md` for what has migrated and
   what remains. Do not invest further in OKF as primary publishing
   infrastructure; do not build a second competing content system alongside
   it without cause.
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

- `apps/web/public/images/terranexus-colorway-palette-sheet.png` is a 16MB
  design-reference file sitting in the static `public/` output path — it
  ships to production as-is today. Worth moving to R2 or `docs/` once media
  strategy work starts (§9 of the architecture doc).
- `apps/web/public/images/image.png` and `image copy.png` have generic,
  undescriptive filenames — worth renaming/removing when touched.

## Milestone-scoped work (do not skip ahead)

See `docs/architecture/web-platform-architecture.md` §Migration phases for
the full sequence. Keystatic + MDX (local storage mode) landed as of
2026-08-12 (M2/M3); the admin UI is dev-only via `SKIP_KEYSTATIC` (see
`.claude/skills/keystatic-mdx/SKILL.md`) and is excluded from production
builds until Cloudflare (M4/M6) is addressed. Do not install Tailwind, GSAP,
a Cloudflare adapter, or GitHub-storage Keystatic mode speculatively —
introduce each as its own reviewable phase with a working build/test/QA loop
before and after.
