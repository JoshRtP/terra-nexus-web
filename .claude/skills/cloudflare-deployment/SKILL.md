---
name: cloudflare-deployment
description: Workers/Wrangler/R2/Stream/D1 environment conventions, preview/production rules, deployment verification. Cloudflare Workers preview is live as of 2026-08-12 (M5); hosted Keystatic (M6) is fully working as of 2026-08-12 — compat shim, GitHub App/credentials, and publishing loop all verified. Repository-owned apps/web/wrangler.jsonc landed 2026-08-12 (M6 close-out, branch infra/m6-cloudflare-workers-builds) — resolves the Worker to terra-nexus-web-preview, verified via a real wrangler versions upload. Cloudflare Git auto-deploy still needs the owner to connect it in the dashboard — see docs/architecture/web-platform-architecture.md §11.
---

# Cloudflare Deployment

## Current state (audited 2026-08-12)

**M5 done.** Deployed via `wrangler deploy` (adapter-generated config, no
hand-written `wrangler.jsonc`) to a non-production Worker at
`https://terra-nexus-web-preview.josh-242.workers.dev`. `astro.config.ts` sets
`adapter: cloudflare({ prerenderEnvironment: 'node', imageService: 'passthrough' })`
— `imageService: 'passthrough'` avoids provisioning an unused Cloudflare
Images binding (no `astro:assets` usage anywhere in this repo). The adapter
still auto-provisions an unused `SESSION` KV namespace by default; no
supported way to disable that on this Astro/adapter version (`session:
false` is not a valid config shape) — harmless/free-tier, not a chosen
binding.

**M6 (hosted Keystatic) — Cloudflare compatibility blocker resolved
(2026-08-12).** The previously-confirmed upstream `@keystatic/astro@5.2.0`
bug (incompatible with `@astrojs/cloudflare`'s Astro 6 `locals.runtime`
removal) is worked around by `apps/web/src/lib/keystatic-cloudflare-shim.ts`,
wired in via a local Astro integration in `astro.config.ts` (not a plain
`src/pages` file — see the shim's own header comment and
`docs/architecture/web-platform-architecture.md` §6.1 for why). Verified
resolved under real `workerd` both locally (`wrangler dev`) and on the
deployed `terra-nexus-web-preview` Worker (`wrangler tail` shows Keystatic
core's own "Missing required config" error, not the original
`Astro.locals.runtime.env` throw). Building a GitHub-storage variant
requires `SKIP_KEYSTATIC=false PUBLIC_KEYSTATIC_STORAGE_KIND=github` (note
the `PUBLIC_` prefix — see `keystatic-mdx` skill). Default production
builds (`SKIP_KEYSTATIC=true`, i.e. `npm run web:build` unmodified) are
unaffected — still fully static, zero on-demand routes, regression-tested
in `apps/web/test/astro-foundation.test.ts`.

**Credentials + publishing loop (2026-08-12).** GitHub App
(`terra-nexus-keystatic`) created manually via `github.com/settings/apps/new`
— Keystatic's own guided create-app flow is dev-only (`NODE_ENV ===
'development'` gate, writes to a local `.env` via `fs`) and can never run on
a deployed Worker. Three secrets set via `wrangler secret put ... --name
terra-nexus-web-preview`. Full loop verified: GitHub OAuth login → collection
reads → edit + save → real commit on `main` → correct reflection back in the
editor. See `docs/architecture/web-platform-architecture.md` §6.2 for the
full record, including a monorepo `pathPrefix` bug and a content-component
image round-trip issue that were found and fixed along the way (neither was
a Keystatic defect). **Still outstanding:** Cloudflare Git auto-deploy, so
the public site rebuilds automatically on a CMS save instead of needing a
manual `wrangler deploy` — owner dashboard action, not yet done.

**M6 close-out — Workers Builds (Git integration), repository side done
(2026-08-12).** `apps/web/wrangler.jsonc` now pins `"name":
"terra-nexus-web-preview"` so Wrangler no longer needs a manual `--name`
flag — confirmed by inspecting `@astrojs/cloudflare`/`@cloudflare/vite-plugin`
source (a project-root wrangler config is read and merged, not ignored) and
by rebuilding and seeing the regenerated `dist/server/wrangler.json` pick
up the name. No Wrangler named environments — one flat config, one Worker,
`wrangler versions upload` (Workers Builds' default non-production deploy
command) gives the stable-vs-preview split without needing a second
environment. A real `wrangler versions upload` against the live account
proved the Worker targeting, bindings, and preview URL all work correctly
without touching the stable 100% deployment. The Workers Builds **build
command** (not the global build-variables panel, which cannot vary by
branch) needs to be branch-aware so only `main` gets the Keystatic admin
routes — see `docs/architecture/web-platform-architecture.md` §11 for the
exact command and why the naive global-variable approach was rejected
after independent security review. Owner still needs to connect Git in the
Cloudflare dashboard — see §11 for exact values.

## Setup sequence (when this milestone starts)

1. Check current Cloudflare Astro guidance before configuring anything —
   Wrangler can auto-detect Astro and generate config; don't hand-write
   `wrangler.jsonc` from memory.
2. Install the Cloudflare adapter only if on-demand rendering is actually
   needed; otherwise Cloudflare can serve the static `dist/` output directly
   via Workers static assets.
3. Prove a **preview** deployment first. Do not attempt production deploy
   or touch DNS without explicit owner authorization — this is a hard rule,
   not a default-to-ask judgment call.
4. R2 is for large/reusable assets that shouldn't bloat Git — e.g. the
   16MB `terranexus-colorway-palette-sheet.png` currently sitting in
   `apps/web/public/images/` is a candidate once R2 exists.
5. Stream is for substantial/adaptive video only — nothing today needs it
   (no video in the repo yet).
6. D1 only gets added when a real relational-data requirement exists. Do
   not add it speculatively.

## Hard gates (always require explicit owner approval)

- Production deployment.
- DNS changes of any kind.
- Domain transfer.
- Destructive production database operations.
- Resource deletion.
- Secret/credential rotation.

## Never

- Never put API keys/tokens/secrets in this file, other Skills, CLAUDE.md,
  or any tracked config. Use environment variables / Wrangler secrets.
