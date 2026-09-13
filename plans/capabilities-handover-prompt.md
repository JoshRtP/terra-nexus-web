# Handover prompt — Capabilities & Approach alignment

Paste everything below the line into a new session.

---

I need you to align the Capabilities side of the Terra Nexus site
(`JoshRtP/terra-nexus-web`, Astro 6 + Cloudflare Workers) with the rest of the
site, and get it ready to go live.

## Read these first, in this order

1. `CLAUDE.md` — operating rules. Note especially: never report success with
   known build/type/lint/test errors; browser QA at 1440/1024/768/390 with
   screenshots in `artifacts/qa/`; production deploys need explicit owner
   approval; never commit secrets.
2. `AGENTS.md` — content governance. No invented case studies, clients or
   credentials.
3. **`plans/capabilities-consolidation-plan.md`** — the assessment and plan for
   this exact task, written at the end of the previous session. It contains the
   current-state map, seven numbered findings, three structural options with a
   recommendation, a four-phase plan and the launch blockers. Start there.
4. `docs/architecture/web-platform-architecture.md` §5.4 and the `log.md`
   entries for 2026-09-12 and 2026-09-13 — what the Expertise and Who We Work
   With work actually did, since this task is meant to match it.
5. Invoke the `terra-nexus-design-system` skill before writing any CSS. The
   previous session's mistakes were mostly cascade and specificity mistakes that
   the skill warns about.

## Where things stand

Branch `feature/who-we-work-with-consolidation`, **36 commits ahead of `main`,
working tree clean, full gate green** (build, typecheck 0 errors 0 warnings, 212
tests, `npm run check` exit 0). It is **not merged** — the owner has been
reviewing it locally and has not yet said to ship it.

Recently completed and worth understanding because this task should match it:

- All nine Expertise topics run on one data-driven template.
- Who We Work With was consolidated from six routes onto one scrolling page,
  then redesigned onto the homepage's visual language, then had its copy made
  impersonal (no ambiguous "we").
- `SectionRail.astro` was extracted from the expertise template and is shared.
- `.split-header` was promoted into `design-system.css`.
- A `/glossary/` page was added (28 terms) and linked from the footer, Who We
  Work With, and every expertise topic.
- Expertise topics and audience segments now cross-link both ways, from one
  inverted mapping rather than two hand-maintained lists.

## What I want from you

Work the plan in `plans/capabilities-consolidation-plan.md`.

**Phase 0 is blocking and is mine to answer.** Do not guess these — ask me:

1. Option B (keep five child pages, align them) or Option C (one scrolling
   `/capabilities/` hub carrying approach + mechanisms + family summaries, with
   the five children kept as deep service taxonomies)? The plan recommends C.
2. Real photography for the Carbon & Ecosystem Services hero, or remove the
   placeholder and restructure the hero without it?
3. The Capabilities mega-menu's "Markets & Claims" column has five labels all
   pointing at one anchor. Real per-mechanism deep links, or collapse to one
   entry?

Once I have answered those, proceed through Phases 1–4. Stop and show me after
Phase 2 so I can look before navigation changes land.

## How I like to work

- Small commits with real messages that explain *why*, not just what.
- Run the full gate before saying anything is done, and say plainly if it is not.
- Measure rather than eyeball — the last session caught a 20px header
  misalignment, an 81px rail overlap and a 570px anchor error by measuring in
  the browser, and each one looked fine in a screenshot.
- Tell me when one of your own recommendations turns out to be wrong. Two did
  last session and I would rather hear it than have it quietly left in.
- Flag anything that changes previously approved copy, and say where the
  original came from.
- Don't merge or deploy without me saying so.

## Traps that already cost time

- `.split-header` in `design-system.css` **must stay after
  `.section-header .section-lead`**. Identical specificity, so source order
  decides. There is a comment saying so. Moving it silently re-breaks every
  homepage section header.
- `SectionRail` hides labels below 100rem *by measurement* — a labelled rail is
  201px, the margin beside a 75rem container at 1440 is 144px. An
  `alwaysShowLabels` option was added and removed the same day. Don't add it
  back.
- The expertise template tests key off `<section class="section…" id="…">`.
  Connector bands and non-chapter blocks must not use that shape or the counts
  break.
- `--color-text-muted` (#94a3b8) is 2.56:1 on white and **fails WCAG AA**. Use
  `--c-secondary-500` (4.76:1).
- Images without intrinsic `width`/`height` break anchor jumps — a lazy-loaded
  diagram with no dimensions put every deep link ~570px off target.
- If a test fails on a stale `sitemap-index.xml`, it is a preview server holding
  `dist`. Stop it, `rm -rf apps/web/dist`, re-run.
- Astro dev servers silently take the next free port. A three-day-old server on
  4321 produced two separate false bug reports last session. Check process age
  before believing a local symptom.

## Content sources

`knowledge/services/` has 45 governed records across the five capability
families, each with a `website-brief.md`. As with the Expertise migration, this
is assembly and verification rather than authoring. Anything genuinely new gets
flagged for my review in the data module's header comment.
