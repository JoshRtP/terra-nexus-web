---
name: cloudflare-deployment
description: Workers/Wrangler/R2/Stream/D1 environment conventions, preview/production rules, deployment verification. Cloudflare Workers preview is live as of 2026-08-12 (M5); hosted Keystatic's Cloudflare compatibility blocker is resolved via a compat shim as of 2026-08-12 (M6), GitHub App/credentials pending owner action.
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
in `apps/web/test/astro-foundation.test.ts`. **Still outstanding:** the
GitHub App itself doesn't exist yet — creating it and its Wrangler secrets
is an owner action (guided flow from the hosted `/keystatic` UI); until
then hosted Keystatic will 500 with a "Missing required config" error,
which is expected, not a regression.

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
