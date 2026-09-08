---
title: Contact Form — Prototype to Production
status: code complete, blocked on owner-provisioned credentials
owner_decisions_locked:
  - "Delivery target: email notification only (no CRM, no D1) — 2026-09-07"
  - "Email provider: Resend — 2026-09-07"
  - "Spam protection: Cloudflare Turnstile — 2026-09-07"
---

# Contact Form — Prototype to Production

## Why this doc exists

`apps/web/src/pages/contact/index.astro` shipped as a deliberate, labeled
prototype: `novalidate`, a disabled submit button, and an on-page notice
stating submissions are not processed or stored. `docs/architecture/web-
platform-architecture.md` and `plans/website-foundation.md` both flagged
forms/CRM as an owner decision that was never made. This doc records that
decision and the implementation that followed. It does not touch
Keystatic, the OKF pipeline, or any of the M7–M10 content/motion
milestones — this is an orthogonal workstream.

**Status (2026-09-07): all code is written, tested, and passing every
required check. Nothing will actually send an email until the owner
provisions three things — see "What's left" below.** Everything Claude
Code could do without live, owner-owned credentials is done.

## Decisions (owner-confirmed, 2026-09-07)

| Question | Decision |
| --- | --- |
| Where do submissions go? | Email notification only. No CRM webhook, no Cloudflare D1 log. Revisit if volume/tracking needs grow. |
| Email delivery provider | [Resend](https://resend.com) — REST API, Worker-compatible, no SMTP. |
| Spam/bot protection | Cloudflare Turnstile. |

These can change later, but changing them means editing this doc and
re-running the plan below, not silently drifting.

## Architecture (as built)

The site stays `output: 'static'` (`apps/web/astro.config.ts`). One route
opts into on-demand (SSR) rendering under the Cloudflare Workers adapter,
the same pattern already proven for `/api/keystatic`
(`apps/web/src/lib/keystatic-cloudflare-shim.ts`, M6):

```text
apps/web/src/pages/api/contact.ts   (export const prerender = false)
```

Unlike the Keystatic shim, this route is a normal `src/pages/api` file, so
it's present in every production build, not gated behind
`SKIP_KEYSTATIC` — a public contact form has to work in every deploy.

Request flow:

1. Browser submits the form (`apps/web/src/pages/contact/index.astro`) via
   a client-side `fetch` to `/api/contact` as JSON, including the
   Turnstile widget's token. A real `action`/`method` on the `<form>`
   remains as a fallback if the JS handler fails to attach.
2. `/api/contact` validates the payload
   (`apps/web/src/lib/contact/validation.ts`) — required fields, email
   shape, known enum values, consent, presence of a Turnstile token.
3. It verifies the Turnstile token server-side against Cloudflare's
   siteverify endpoint (`apps/web/src/lib/contact/turnstile.ts`).
4. On success, it sends a notification email via the Resend API
   (`apps/web/src/lib/contact/email.ts`) to the configured inbox, with
   `reply_to` set to the submitter's own address.
5. The route returns a JSON result; the page's inline handler shows a
   success/error message in an `aria-live` region.

No CRM call, no database write, no new Cloudflare bindings beyond what
Turnstile/Resend require: one public env var
(`PUBLIC_TURNSTILE_SITE_KEY`, baked in at build time like
`PUBLIC_TNX_BUILD_MODE`) and, read at request time from
`cloudflare:workers` env exactly like the Keystatic shim does, four
values — two secrets (`TURNSTILE_SECRET_KEY`, `RESEND_API_KEY`) and two
plain vars (`CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`).

## What's implemented (2026-09-07)

- `apps/web/src/lib/contact/validation.ts` — dependency-free payload
  validation (no schema library added; matches this repo's convention of
  not pulling in a dependency where a small hand-rolled function does the
  job).
- `apps/web/src/lib/contact/turnstile.ts` — server-side Turnstile
  verification against Cloudflare's siteverify endpoint, fails closed on
  any network/HTTP error.
- `apps/web/src/lib/contact/email.ts` — builds the notification email
  (text + HTML, HTML-escaped, human-readable labels for the coded
  `org_type`/`routing`/`timing` values) and sends it via a plain `fetch`
  call to the Resend API (no SDK dependency).
- `apps/web/src/pages/api/contact.ts` — the on-demand route wiring the
  above together, with a clear (non-crashing) 500 response when required
  config is missing.
- `apps/web/src/pages/contact/index.astro` — prototype notice removed,
  submit button enabled, Turnstile widget added, client-side
  fetch/success/error handling added, consent copy reviewed and approved
  by the owner 2026-09-08 (no privacy-policy link — none exists yet;
  revisit when one is published).
- Tests: `test/contact-validation.test.ts`, `test/contact-turnstile.test.ts`,
  `test/contact-email.test.ts` (pure unit tests, mocked `fetch`, no network
  calls) and `test/contact-api-route.test.ts` (real `workerd` via Wrangler's
  `unstable_dev`, same pattern as `test/keystatic-cloudflare-shim.test.ts` —
  covers request validation and the "missing config" path, deliberately
  does not call the real Turnstile/Resend APIs).
- `docs/architecture/web-platform-architecture.md` §3 updated with the new
  route.
- Verified locally: production build (`npm run web:build`), a real
  `wrangler dev` run against the built Worker, a live `curl` POST to
  `/api/contact` returning the expected "not yet configured" response
  (proving the whole chain runs end-to-end short of live credentials), and
  the full required check suite:

  ```text
  npm run web:build        # pass
  npm run web:typecheck    # pass, 0 errors/warnings/hints
  npm run web:test         # pass, 10 files / 51 tests
  npm run check            # pass
  ```

## Status as of 2026-09-08: all owner-action items complete

Everything previously listed here as "What's left" is done:

1. **Cloudflare Turnstile widget created** — sitekey `0x4AAAAAAEsSvlqhjaeljHYZ`,
   scoped to `localhost` only for now (owner's deliberate choice — the live
   `terra.nexus`/`www.terra.nexus` sites are still on a different host and
   not yet connected to Cloudflare; real domains can be added to this same
   widget later without recreating it). `TURNSTILE_SECRET_KEY` set as a
   Wrangler secret on `terra-nexus-web-preview`; `PUBLIC_TURNSTILE_SITE_KEY`
   set in `apps/web/.env` (local dev, gitignored) and on the preview
   Workers Builds trigger's build-time environment variables (not the
   production/`main` trigger, deliberately — see the same domain-scoping
   reasoning above).
2. **Resend account + sending subdomain (`send.terra.nexus`) verified.**
   Notable gotcha hit and resolved along the way: `terra.nexus`'s DNS
   records were being edited in Bluehost's hosting-panel DNS editor, but
   the domain's actual authoritative nameservers are Microsoft 365's
   (`ns{1-4}.bdm.microsoftonline.com`) — Bluehost's panel is a
   disconnected, non-live zone editor. The four Resend records (DKIM TXT,
   two SPF CNAMEs, DMARC TXT) had to be re-entered in the Microsoft 365
   admin center instead; confirmed live via direct authoritative-nameserver
   DNS queries before Resend's own verification passed. Also corrected an
   assumption of mine mid-session: DMARC's `_dmarc` record is published at
   the **organizational root** (`_dmarc.terra.nexus`), not under the
   sending subdomain — that's what Resend's own dashboard specified, and
   it's correct (DMARC is a whole-domain concept, unlike DKIM/SPF which
   are per-sending-hostname).
3. **`RESEND_API_KEY`** set as a Wrangler secret (owner ran `wrangler
   secret put` directly, to keep the raw key out of any AI-agent
   conversation — see the incident note below for why that mattered).
   **`CONTACT_FROM_EMAIL`** (`contact@send.terra.nexus`) and
   **`CONTACT_TO_EMAIL`** (`experts@terra.nexus`) committed as plain
   (non-secret) `vars` in `apps/web/wrangler.jsonc`, applying uniformly to
   local dev, Workers Builds, and manual deploys — same "one committed
   source of truth" reasoning as the file's existing `name`/
   `compatibility_date` fields.
4. All four values confirmed bound on `terra-nexus-web-preview` via
   `wrangler secret list` / the generated `wrangler.json` bindings output
   before any live test.
5. **Consent checkbox copy reviewed and approved by the owner
   (2026-09-08)** — kept as originally written ("I agree that Terra Nexus
   may use the information above to respond to my inquiry"), since it's
   already accurate to what the form actually does (email notification
   only, no CRM/database storage) and doesn't overclaim a privacy policy
   that doesn't exist. `TODO(owner)` comment resolved in
   `apps/web/src/pages/contact/index.astro`; revisit with a real link once
   a privacy policy page is published.
6. **Real end-to-end test performed and verified**, not just built: a
   genuine Turnstile challenge was solved via Playwright on `localhost`
   (matching the widget's domain scope) to get a real, non-test passing
   token, then POSTed directly to the live `terra-nexus-web-preview`
   preview-version Worker's `/api/contact` — returned
   `{"ok":true,...}`, and the owner confirmed the notification email
   actually arrived at `experts@terra.nexus` (landed in spam on this
   first-ever send from the new domain — expected sender-reputation
   warm-up behavior for a brand-new sending domain, not a misconfiguration;
   SPF/DKIM/DMARC all independently confirmed passing).
7. **Browser QA passed at all four required viewports** (1440/1024/768/390)
   via the `visual-qa` agent against the local dev server (Turnstile's
   `localhost`-only scope means the public preview URL can't render a
   passing widget right now) — zero app-caused console errors, no layout
   defects, labels/focus states/tab order all correct. Screenshots:
   `artifacts/qa/2026-09-08-contact-form-production-{1440,1024,768,390}.png`.

**Remaining before merge:** none identified. Normal PR from the feature
branch to `main`; the existing Cloudflare Workers Builds Git integration
auto-deploys/promotes from there (see
`docs/architecture/web-platform-architecture.md` §11) — no manual
`wrangler deploy` to production.

**Follow-up, not a blocker:** the `visual-qa` agent could not verify what
Turnstile's interactive checkbox UI looks like for a real visitor, since
every automated Playwright run auto-passed silently (Turnstile's normal
"managed mode" behavior for trusted/automation traffic) — worth a manual
spot-check in an ordinary browser session at some point, but doesn't block
shipping since the client-side wiring (script load, widget init, token
generation, hidden-input population) is already confirmed correct.

## Explicit non-goals (for now)

- No CRM integration.
- No Cloudflare D1 submissions log.
- No rate-limiting beyond what Turnstile provides — revisit if abuse is
  observed post-launch.
- No change to `output: 'static'` for any route other than
  `/api/contact`.
