# Handover: Contact Form Production Setup

Paste this whole file's contents as your first message in the new session.

## Context

I'm continuing work on turning the Terra Nexus contact form from a
prototype into a production form. Full design doc and current status:
**`plans/contact-form-production.md`** — read that first, it has the
complete architecture, what's implemented, and what's left.

Also check memory: there's a saved memory file
`contact-form-production-decisions.md` in this project's memory directory
covering the locked decisions — re-read it if it's not already in your
context.

## Decisions already made (do not re-litigate)

- Delivery: email notification only. No CRM, no Cloudflare D1 log.
- Email provider: **Resend**.
- Spam protection: **Cloudflare Turnstile**.

## What's already done (code complete, all checks passing)

- `apps/web/src/lib/contact/validation.ts`, `turnstile.ts`, `email.ts`
- `apps/web/src/pages/api/contact.ts` (on-demand Cloudflare Worker route)
- `apps/web/src/pages/contact/index.astro` updated (prototype notice
  removed, Turnstile widget embedded, client-side submit handling)
- 4 new test files under `apps/web/test/contact-*.test.ts`
- `docs/architecture/web-platform-architecture.md` §3 updated
- Verified: `npm run web:build`, `web:typecheck` (0 errors), `web:test`
  (51 tests passing), full `npm run check` — all green. Also manually
  verified via a real `wrangler dev` run against the built Worker with a
  live `curl` POST to `/api/contact`.

**Nothing here needs to be redone.** Start from "what's left."

## FIRST STEP: verify the Cloudflare MCP server is actually connected

Status as of the end of the prior session (2026-09-07, later that day): the
`cloudflare` MCP server was connected but showed "Needs authentication."
The user then completed the OAuth consent flow and confirmed authentication
succeeded — **but that happened mid-conversation in the prior session**,
which (same as the original `claude mcp add` issue) does not hot-reload the
tool list. `ToolSearch` in that session, including an exact-name lookup for
`plugin:cloudflare:cloudflare`, still found zero Cloudflare tools after the
user reported authenticating. This handover exists so a fresh session can
pick up a tool list that (should) already include working, authenticated
Cloudflare tools.

**Check it like this:**

1. Run `/mcp` as your very first action. You should see a `cloudflare`
   entry among the connected servers, and it should NOT say "Needs
   authentication" (the user already did this — do not re-trigger the
   OAuth flow unless it genuinely still shows unauthenticated).
2. Do a trivial read-only call first (e.g. list zones or accounts) to
   confirm the token actually works.
3. If it's authenticated and the read-only call works: **skip straight to
   "1. Cloudflare Turnstile widget" below** — do not re-verify or
   re-explain the MCP setup further, just proceed.
4. If `cloudflare` still shows "Needs authentication" or doesn't appear at
   all: something regressed. Ask the user whether they authenticated in
   this same VSCode window/session or a different one, and whether they've
   fully restarted the extension/window since — a stale extension process
   can also fail to pick up a completed OAuth grant. Don't guess further;
   surface what you see and ask.

**Also check:** confirm this session still has the `cloudflare-deployment`
skill available (it should — it's a repo-level skill under
`.claude/skills/`, unrelated to the MCP server). Load it via the Skill
tool before doing any Cloudflare-related work; it has hard-gate rules
(production deploy, DNS changes, secret rotation all require explicit
owner approval) that still apply even with MCP access.

## Remaining work, in order

### 1. Cloudflare Turnstile widget

Manual dashboard attempts hit a UI bug: the domain "chip" field wasn't
reliably accepting `terra.nexus` (worked for `localhost` only, which
Cloudflare adds automatically). Confirmed via Cloudflare's own docs that
this is **not** a real restriction — Turnstile widgets don't require the
domain to be a Cloudflare zone or DNS-verified at all. Likely just a
dashboard chip-entry bug others have also hit.

- **If the Cloudflare MCP server is connected:** try creating the widget
  via the API instead of the dashboard — this should sidestep the buggy
  UI entirely. Register these hostnames: `terra.nexus`, `www.terra.nexus`
  (if used), `localhost`.
- **If MCP isn't available yet:** have the user retry the dashboard,
  explicitly pressing Enter after typing each domain to confirm it
  becomes a chip before submitting, or try "Add widget manually" instead
  of "Set up with Spin."
- Either way, get back: the **sitekey** (public) and **secret key**
  (private — never put it in chat; have the user set it directly via
  `wrangler secret put TURNSTILE_SECRET_KEY --name terra-nexus-web-preview`
  from `apps/web/`).
- Note: `apps/web/src/pages/contact/index.astro` already falls back to
  Cloudflare's official "always passes" test sitekey
  (`1x00000000000000000000AA`) whenever `PUBLIC_TURNSTILE_SITE_KEY` isn't
  set — so testing against the live preview Worker
  (`terra-nexus-web-preview.josh-242.workers.dev`) works today without
  waiting on the real widget at all. There is no hard dependency forcing
  Turnstile to be finished before other steps.

### 2. Resend

Not started yet as of this handover. Needs:
- Resend account created.
- A sending **subdomain** verified (e.g. `send.terra.nexus`) — deliberately
  a subdomain, not the root domain, so it doesn't interact with the
  existing Microsoft 365 mail on `terra.nexus` (confirmed in this
  project's history: DNS records are scoped per-hostname, so this is safe
  and doesn't require solving the Bluehost→Cloudflare cutover first).
  Verifying the subdomain means adding 3 DNS records (MX, SPF TXT, DKIM
  TXT) wherever `terra.nexus` DNS is currently managed (today: Bluehost).
  **Do not add these yourself under any circumstances, even with
  in-session approval.** The owner manages a genuinely tangled multi-
  provider DNS setup (Bluehost/Namecheap/Microsoft 365) and has said
  explicitly: stop and hand off the exact record values (type, host,
  value) whenever DNS is involved — they will add every record
  themselves. Once Resend generates the real values (after the owner
  creates the account and starts domain verification), just relay them
  clearly; do not use any tool, including Cloudflare MCP, to write them.
- An API key (`RESEND_API_KEY`, Wrangler secret).
- Decide + set `CONTACT_FROM_EMAIL` (must be on the verified subdomain)
  and `CONTACT_TO_EMAIL` (the real inbox that should receive leads) as
  Wrangler vars.

### 3. Consent copy review

`apps/web/src/pages/contact/index.astro` has a `TODO(owner)` comment on
the consent checkbox label — current placeholder copy doesn't reference a
privacy policy because none exists in this repo yet. Flag this to the
owner; don't silently finalize copy on their behalf.

### 4. End-to-end verification once config is set

- Real test submission against the preview Worker
  (`terra-nexus-web-preview.josh-242.workers.dev`), confirming an actual
  email lands in the target inbox.
- Browser QA at 1440/1024/768/390px (CLAUDE.md rule 8) — screenshots to
  `artifacts/qa/`. This was skipped in the prior session because the
  Playwright browser instance was already in use by another process;
  retry it now.
- Console-clean check.

### 5. Ship it

- Normal PR from the feature branch, merged to `main` — the existing
  Cloudflare Workers Builds Git integration auto-deploys/promotes from
  there (no manual `wrangler deploy` to production; see
  `docs/architecture/web-platform-architecture.md` §11).

## Hard gates — do not cross without explicit owner approval

- **DNS records: never add or modify these directly, full stop — not even
  with in-session approval.** The owner manages a genuinely complex setup
  across Bluehost (current DNS/site host), Namecheap, and Microsoft 365
  (mail), and does not want an agent touching any of it, low-risk/additive
  or not. This is stricter than a normal "ask first" hard gate: **the
  correct behavior is to hand the owner the exact record(s) to add
  (type, host/name, value) and stop there** — they will add every DNS
  record themselves, in whichever provider's panel is correct, on their
  own timeline. Do not use Cloudflare MCP (or any other tool) to create,
  edit, or delete a DNS record even if asked to "just do it" in the
  moment — surface the request back to the owner as a to-do instead.
  This applies to the Resend sending-subdomain records and to anything
  else that comes up later (e.g. eventual `terra.nexus` cutover to
  Cloudflare, M10) — always hand off values, never execute.
- Any production deploy / promotion.
- Any secret creation/rotation the owner hasn't explicitly asked you to
  set (setting values *they* provide is fine; generating or rotating
  credentials on your own is not).
