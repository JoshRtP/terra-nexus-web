# Handover prompt — pre-launch work after the Capabilities session

Paste everything below the line into a new session.

---

I need you to pick up the Terra Nexus site (`JoshRtP/terra-nexus-web`, Astro 6
+ Cloudflare Workers) exactly where the 2026-09-13 session left it and work the
pre-launch plan with me.

## Read these first, in this order

1. `CLAUDE.md` — operating rules. Never report success with known build, type,
   lint, test or console errors; browser QA at 1440/1024/768/390 with screenshots
   in `artifacts/qa/`; production deploys, DNS and secrets need my explicit
   approval; never commit secrets.
2. `AGENTS.md` — content governance. No invented case studies, clients,
   credentials or capability claims. Owner approval is recorded in a record's
   `publication` block, never assumed.
3. **`plans/pre-launch-plan.md`** — the plan for this work: launch blockers (A),
   content readiness (B), the Digital Solutions assessment for our joint
   session (C), Lighthouse follow-ups (D), verification (E), and the suggested
   order (F) with a status line saying what is already done.
4. `log.md`, the three entries dated 2026-09-13: the Capabilities consolidation,
   the Tier 1 SEO and Lighthouse baseline, and the pre-launch batch. They record
   what changed, what was measured, what was corrected, and what is still open.
5. `docs/architecture/web-platform-architecture.md` §5.4–§5.6 — the expertise
   template, the capability template and hub, and the pre-launch hardening.
6. `plans/capabilities-depth-seo-ux-plan.md` — the depth assessment and peer
   comparison behind the offering-narrative work; Tier 1b lists the Lighthouse
   findings still open.
7. Invoke the `terra-nexus-design-system` skill before writing any CSS.

## Where things stand

- `main` is at the merge of **PR #21** (`feature/pre-launch-batch`: 404 page,
  asset cleanup, self-hosted fonts, WebP wordmarks, homepage image fixes,
  site-wide link test, and the docs closing the two `CLAUDE.md` known
  issues), merged 2026-09-13 at my word on top of **PR #20** (Who We Work
  With consolidation, Capabilities rebuild, Tier 1 SEO; 31 commits).
- Branch **`plans/pre-launch`** (this plan and this prompt) was merged to
  `main` right after. Nothing is left on a side branch; start from `main`.
- Full gate at the tip of PR #21: build clean, typecheck 0 errors 0 warnings,
  290 tests, `npm run check` exit 0. Lighthouse mobile after the batch: hub 95,
  homepage 74, Regenerative Agriculture 74; hub, C&ES and Who We Work With at
  100 for accessibility.

## What I owe you (do not do these for me)

- Turnstile and Resend credentials for the contact form (plan A2).
- The analytics choice, Cloudflare Web Analytics or GA4 (A5).
- Tool-to-topic assignments in `apps/web/src/data/expertise/tools.ts` for the
  seven topics with none (B2).
- The four offering-narrative worksheets in `plans/content/capabilities-2026-09/`
  (B3), about an hour each.
- Answers to the C&ES records' "Information Requiring Owner Approval" lists,
  chiefly advise-only versus manage/operate (B4).
- The Pexels licence check before the hero photos are self-hosted (D2).
- The case-study record's title and description trim (D7).

Ask me for whichever of these the next step needs; do not guess them.

## What I want from you next

Follow §F of the plan. Step 1 is done. Then:

1. **The Digital Solutions page, with me** (plan §C). Bring the three options
   and your recommendation (option 2, data first then composition, after B2).
   Do not rebuild it before we have talked.
2. **The WordPress URL inventory and 301 map** (A1): crawl the live site,
   draft the map, and hand it to me for review. Do not infer redirects from
   titles; `website-foundation.md` says why.
3. Then D2 (self-hosted hero photography), the remaining worksheets as I return
   them, B5, B6, D5, and the §E verification pass before the A4 runbook.

Stop and show me after each of those before moving to the next.

## How I like to work

- Small commits with real messages that explain *why*.
- Run the full gate before saying anything is done, and say plainly if it is not.
- Measure rather than eyeball. This session's defects that looked fine in a
  screenshot: a deep link landing under the 70px header, a hash change that did
  not switch the selected mechanism, an 18px button overflow at 390, and five
  colour-contrast failures.
- Tell me when one of your own recommendations turns out to be wrong. Three of
  the previous plan's findings were corrected this session and I want that
  pattern kept.
- Flag anything that changes previously approved copy, and say where the
  original came from. Data-module PROVENANCE headers are where that lives.
- Don't merge or deploy without me saying so.

## Traps that already cost time

- **A running `astro preview` holds `dist` open on Windows.** Any build or test
  then fails or races. Stop it (`netstat -ano | grep :4400`, `taskkill //PID`)
  before `npm run check`, and restart it for QA after. `npm run check` itself
  runs vitest and builds; never run it concurrently with another build.
- **Files are CRLF** (`core.autocrlf=true`). Multi-line `perl` anchors need
  `\r?\n`. Backslashes passed through `node -e` in the shell get halved; write
  scripts to the scratchpad and run them, or use the Edit tool.
- **`--c-secondary-500` passes AA on white (4.77:1) but not on the tinted
  `--color-surface` (4.45:1).** Use `--color-text-secondary` on tinted surfaces.
  `--color-text-muted` fails everywhere (2.56:1).
- `.split-header` in `design-system.css` **must stay after** `.section-header
  .section-lead`; the four primitives added 2026-09-13 sit before the Stats
  block, well clear of it.
- `SectionRail` hides labels below 100rem by measurement; do not add an
  `alwaysShowLabels` option back.
- The expertise template tests key off `<section class="section…" id="…">`;
  the capability tests key off section ids in a fixed order. Connector bands
  must not take that shape.
- `validationQuestions` in `data/expertise/shared.ts` keys `agroforestry`
  unquoted; a grep for `'agroforestry'` misses it.
- Chrome logs "preloaded but not used" for the two font preloads; the network
  log shows each fetched once via the preload. Known false positive, do not chase.
- Astro ignores `_`-prefixed page files; `pages/about/_original-backup.astro`
  is not a route.
- MechanismSelector's per-mechanism ids (`#m01`–`#m04`) exist only on the
  interactive variant; the homepage's overview variant has none.

## Content sources

`knowledge/services/` holds the governed records. The seven Carbon & Ecosystem
Services offering records are owner-approved as of 2026-09-13 and render on the
page; the other four families' records hold only the one-liners already on the
pages, which is why the worksheets exist. Anything genuinely new gets flagged
for my review in the data module's header comment.
