---
name: cloudflare-deployment
description: Workers/Wrangler/R2/Stream/D1 environment conventions, preview/production rules, deployment verification. Use before any Cloudflare setup or deploy — no Cloudflare config exists in this repo yet.
---

# Cloudflare Deployment

## Current state (audited 2026-08-12)

**Zero Cloudflare configuration exists.** No `wrangler.jsonc`/`.toml`, no
`@astrojs/cloudflare` adapter, no environment bindings, no `.env`/
`.env.example`. The app currently builds to a plain static `dist/` and could
be hosted anywhere. Setting up Cloudflare is milestone M4 — entirely new
infrastructure, not a migration of anything existing.

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
