# Bundle Update Log

## 2026-08-01

* **Creation**: Created the Terra Nexus website knowledge bundle from the three approved background documents.
* **Normalization**: Structured brand, services, expertise topics, audiences, and governance as linked OKF concepts.
* **Governance**: Added the human-confirmed distinction between service lines, Areas of Expertise, audiences, Advise/Manage/Operate, and proof.
* **Gap Tracking**: Marked missing Carbon & Ecosystem Services descriptions, topic-page narratives, case studies, bios, design-system inputs, and technical requirements.
* **Tooling**: Added dependency-free navigation/search and OKF conformance validation scripts.

## 2026-08-01 (Phase 2B implementation)

* **Astro foundation**: Added the npm workspace, Astro static application shell, strict TypeScript, Node LTS selection, and generic development-only foundation route.
* **Read-only compiler**: Added production and preview eligibility filters, proposal-only hard exclusion, safe audits, relationship/reverse indexes, and a route-candidate contract.
* **Owner workflow**: Added case-study scaffolding, content-status reporting, affected-content queries, root npm commands, and `HOW_TO_ADD_CONTENT.md`.
* **Safety tests**: Added synthetic fixtures outside `knowledge/`, compiler/CLI/Astro tests, no-mutation checks, preview noindex behavior, and workflow checks.
* **Scope retained**: No real case study, governed-content page templates, Vercel configuration, preview authentication, production deployment, or visual design was added.

## 2026-08-01 (Phase 2B hardening)

* **Safe audits corrected**: Confidential, unconfirmed, and proposal-only records now receive deterministic opaque diagnostic references in generated audit output; original IDs, slugs, filenames, titles, descriptions, and body text remain out of generated diagnostics.
* **Complete owner finalization**: Added `npm run content:finalize` to regenerate the bundle inventory and tree, report derived-file changes, and run the complete repository check without committing or pushing.
* **Authoritative check**: `npm run check` now runs the Python validators and tests, inventory freshness, skill sync, compiler validation, website tests, production build, and type check without modifying governed files.
* **Integration proof**: The case-study scaffolder is now tested against both repository Python validators. No real case study was added; the owner-supplied pilot checkpoint remains next.

## 2026-08-01 (Phase 0)

* **ExecPlan created**: `plans/website-foundation.md` — self-contained Website Foundation ExecPlan (v0.1).
* **Skill created**: `.github/skills/terra-nexus-content/SKILL.md` and `.agents/skills/terra-nexus-content/SKILL.md` — OKF-conformant (type: Skill added to fix validation).
* **OKF validation**: Passes with no errors.

## 2026-08-01 (Phase 1A.2 closeout — corrections)

* **AGENTS.md link fixed**: `knowledge/codex/start-here.md` reference updated from non-standard `/../../AGENTS.md` to `https://github.com/JoshRtP/Webservices/blob/main/AGENTS.md`.
* **CODEOWNERS updated**: All `@OWNER_GITHUB_USERNAME` placeholders replaced with `@JoshRtP`.
* **Decision record created**: `knowledge/references/decisions/website-build-eligibility.md` — stable, verified by owner. Defines the five conditions for public production build eligibility plus the proof-record confidentiality requirement.
* **Publication schema updated**: `schemas/publication-fields.yml` now includes `production_eligibility` block cross-referencing the decision record.
* **Decisions index updated**: `knowledge/references/decisions/index.md` now lists the build eligibility decision.
* **ExecPlan updated**: `plans/website-foundation.md` E-11 added for the build eligibility decision.
* **Validation**: OKF pass | TNX pass | tests 21/21 | inventory current | skills in sync.

* **Monorepo boundary established**: All OKF bundle files moved to `knowledge/` via `git mv` (preserving history). Scripts moved to `scripts/`. New directories: `schemas/`, `tests/`, `plans/`.
* **Scripts updated**:
  - `scripts/validate_okf.py`: accepts explicit `bundle` argument; default `knowledge`.
  - `scripts/okf_cli.py`: accepts `--bundle` argument; default `knowledge`; root no longer inferred from script location.
  - `scripts/tnx_validate.py` (new): Terra Nexus domain validator enforcing publication, lifecycle, relationship, provenance, C&ES gate, and company-claim rules.
  - `scripts/generate_inventory.py` (new): deterministic inventory and TREE generation with `--check` mode.
  - `scripts/sync_skills.py` (new): syncs canonical `.github/skills/` to `.agents/skills/` copy; detects drift.
* **Schemas created**: `schemas/service-families.yml`, `schemas/expertise-topics.yml`, `schemas/audience-segments.yml`, `schemas/engagement-models.yml`, `schemas/proof-record-types.yml`, `schemas/publication-fields.yml`.
* **Stable/draft content split**:
  - All 5 service family overviews restored to source-derived stable content; `[agent-draft]` sections moved to `services/*/website-brief.md` (5 new files, `status: draft`).
  - All 9 expertise topic files restored to `content_depth: title-and-classification`; draft briefs moved to `expertise/briefs/*-brief.md` (9 new files, `status: draft`).
* **Publication metadata migrated**: All 7 Carbon & Ecosystem Services offering files, proof schema, and intake templates migrated from deprecated `publication_status` / `publication_permission` to canonical `publication:` block. Zero deprecated fields remain in `knowledge/`.
* **Relationship identifiers**: C&ES offering `service_family` fields updated from display name to bundle-relative path ID.
* **Tests created**: `tests/test_okf_validate.py` (10 tests), `tests/test_tnx_validate.py` (11 tests) — 21/21 pass.
* **CI workflow created**: `.github/workflows/knowledge-checks.yml` runs OKF validator, TNX validator, tests, inventory freshness check, and skill sync check on every push/PR to `main`.
* **Repository safeguards created**: `.github/pull_request_template.md`, `.github/CODEOWNERS`, `CONTRIBUTING.md`, `pyproject.toml`, expanded `.gitignore`.
* **Skill consolidated**: `.github/skills/terra-nexus-content/SKILL.md` is canonical; `.agents/skills/` is generated copy. Skill updated with correct source count (3 mirrors + 1 decision), correct C&ES gate rule, correct command syntax.
* **Documentation updated**: `README.md`, `AGENTS.md`, `knowledge/codex/start-here.md`.
* **Inventory regenerated**: `knowledge/bundle-inventory.json` (102 concepts), `knowledge/TREE.txt`.
* **OKF validation**: passes.
* **Terra Nexus domain validation**: passes.
* **Tests**: 21/21 pass.
* **UTF-8 BOM**: stripped from 29 files written by PowerShell `Set-Content`.

### Intentionally Unresolved Internal Links

The following links within `knowledge/` use bundle-relative paths starting with `/` which resolve correctly when the bundle root is `knowledge/`. They would appear broken if viewed raw on GitHub outside the CLI — this is expected and intentional:

- `resource:` fields in `sources:` blocks across all OKF files (e.g. `/references/source-documents/service-architecture.md`)
- Cross-links within Markdown bodies (e.g. `[source-precedence](/governance/source-precedence.md)`)
- The `knowledge/codex/start-here.md` link to `AGENTS.md` using `../../AGENTS.md` is non-standard and should be updated to an absolute path in a future pass.


* **ExecPlan updated** (`plans/website-foundation.md` v0.3): Decision log reclassified with phase, status, provisional handling, owner input, and affected concepts per all 10 decisions. Phase 1B recommendation added.
* **Brand worksheets created**: `brand/narrative-decision-worksheet.md` (5 narrative options compared), `brand/tagline-comparison.md` (4 tagline options compared). No selection made.
* **Carbon & Ecosystem Services draft descriptions created**: All 7 offering files updated with draft descriptions (status: draft, publication_status: do-not-publish-without-review) — VCM & Scope 3 Markets, Commercialization Pathways, Asset & Portfolio Valuation, Pilot Development & Partner Selection, Program Design & Operations, Impact Verification & Claims Translation, Full Service GHG Accounting.
* **Service family overviews normalized**: All 5 overview files updated with full normalized content per the confirmed decision-owner architecture — including scope boundaries, relationship maps, and content readiness status.
* **Service architecture audit created**: `content-audits/service-architecture-audit.md` — full three-layer audit of all offerings across all 5 service families. ~15 items flagged for owner decision (D-9).
* **Expertise page schema created**: `expertise/expertise-page-schema.md` — standard schema and field definitions.
* **Expertise topic briefs created**: All 9 expertise topic files updated with draft briefs (content_depth: draft-brief) — Regenerative Agriculture, Regenerative Rangeland, Agroforestry, Aquaculture, Biodiversity & Ecosystem Resilience, Sustainable Supply Chains, Low Carbon Energy & Biofuels, Purpose Driven Food Brands & Retailers, Food Waste (Prevention, Diversion, Recovery).
* **Proof and qualifications system created**: `case-studies/proof-schema.md` — OKF-conformant schema for all proof record types; `case-studies/intake-templates/universal-proof-intake.md` — universal owner intake form.
* **Trading company qualification intake created**: `case-studies/intake-templates/trading-company-qualification-intake.md` — private intake covering all approved commodities, voluntary carbon registries, regulatory programs, certifications, GHG accounting systems, and geographies.
* **Content-readiness dashboard created**: `website/content-readiness.md` — per-page status for all proposed pages.
* **Terminology correction**: "Diary" corrected to "Dairy" in trading company intake (provenance note preserved). No source documents altered.
* **OKF validation**: Passes with no errors.

## 2026-08-10 (Homepage redesign — value-chain slider + merged "How We Work" section)

Design work was explored iteratively as Artifact mockups (reviewed and approved by the owner) before being built into `apps/web/src/pages/index.astro`. Two shipped changes:

* **Value-chain diagram replaced with an interactive segment slider**: The static `<img>` diagram in the homepage "Who We Work With" section was replaced with a tabbed slider (vertical segment tabs + full-bleed image/copy panel, dark navy card, gold active state) covering all 8 real value-chain segments (Inputs Companies through Food Waste Prevention, Diversion & Recovery), sourced from `apps/web/src/pages/who-we-work-with/food-and-agribusiness-value-chain/index.astro`. Each segment's "Explore" link deep-links to its matching card on that page via new `id={slug}` anchors + `scroll-margin-top` (added to that page in the same pass). Section heading/lead copy and the two summary cards below were left unchanged per owner direction ("keep the pre-mockup version, just bring in the slider").
* **"Our Approach" and "Capabilities" sections merged into one interactive component**: Replaced with a single "How We Work" section — heading **"Terra Nexus Manages Every Step from Cultivation to Claim"** — containing a 6-step horizontal process rail inside a dark card (same `--gradient-dark` embedded-card device as the segment slider and the case-study block, reused for visual consistency). Clicking/hovering a step highlights which of the 5 capability cards it draws on (gold border), driven by a `caps: string[]` field per step in the `approachSteps` frontmatter array — no capability names are restated in the description text, only the visual highlight communicates the relationship. Step 6 ("Connect Performance to Claims and Market Value") is a special case: instead of highlighting 1–3 capabilities in gold, it highlights all five in a neutral white/grey left-to-right sweep animation (`.approach-cap-grid.is-loop`) to signal "end-to-end value creation" / closing the loop back to Step 1, per explicit owner direction to distinguish it from the "this step relates to this capability" pattern used elsewhere. Each capability card now links to its real `/capabilities/{slug}/` page (previously only the section-level CTA linked out). The two former CTAs ("See Our Full Approach" and "Explore Our Capabilities", both pointing to `/capabilities/`) were consolidated into one ("Explore Our Approach & Capabilities").
* **Rejected/explored-but-not-shipped directions**: A navy hero + Lora-italic headline redesign, a "Holistic Food Systems Approach to Unlocking Shared Value" section heading, and a sky-blue "cultivation to claim" callout box were all explored in mockups and explicitly rejected or superseded by the owner in favor of keeping the pre-mockup hero/section copy as-is and folding the "cultivation to claim" language into the How We Work heading instead.
* **Verification**: `astro check` — 0 errors/warnings. Manual click-through testing of both interactive components (tab switching, deep-link anchors, step 6 sweep animation) with no console/page errors, at desktop and mobile viewports.
* **Files touched**: `apps/web/src/pages/index.astro`, `apps/web/src/pages/who-we-work-with/food-and-agribusiness-value-chain/index.astro`.
* **Next up (queued, not started)**: Remove the "How We Create Value" section from the homepage; replace "Proven Commercial Impact" with a placeholder stats overview (countries, certifications, asset types, cumulative value created since founding) and change its CTA to "Read Our Case Studies" → `/case-studies/`. See opening prompt in the next design session.

## 2026-08-11 (Alternative homepage draft — photo hero + live-site scroll effects)

A separate, standalone draft page — `apps/web/src/pages/homepage-alt.astro` — was built to explore merging live terra.nexus site elements (full-bleed canyon photo hero, transparent-to-solid header, star/logo scroll effects, value-chain diagram) into the current homepage's content and components. **`index.astro` (the live homepage) was never touched** — this whole session's work is additive and isolated to the new file, plus real assets pulled from the live site into `apps/web/public/images/live-site/`. Not linked from navigation; reachable directly at `/homepage-alt/`.

* **Real assets pulled from terra.nexus**: `hero-canyon.jpg` (their actual hero photo, downsized 7MB→~360KB), `logo-stacked.png` (their real red/gold stacked wordmark, used in the hero), `value-chain-diagram.png` (their real value-chain diagram, replacing the placeholder one). Sourced by inspecting the live site's DOM/CSS directly (WordPress/Elementor), not recreated from scratch.
* **Photo hero**: Full-bleed canyon photo, ~92vh. Header overlays it transparently — required switching `#site-header` from its normal `position: sticky` to `position: fixed` *for this page only* (via a `body.has-photo-hero` class set at runtime, scoped through `is:global` CSS in the page itself; `Header.astro` is untouched, so every other page keeps its default sticky/always-solid header).
* **Header transparency now tracks scrolling past the hero, not Header.astro's built-in 20px threshold**: Header.astro's own `data-scrolled` attribute flips solid after just 20px — right for its normal use, far too early over a photo hero. This page tracks its own `body.past-hero` class instead, set once the user scrolls past `.photo-hero-band` (the "Developing a more resilient…" bar). That bar was moved from mid-hero to the very bottom edge of the hero (via `.photo-hero-content{flex:1}` centering the wordmark/tagline above it) specifically so the transparent→solid handoff reads as the bar becoming the header, not two unrelated events.
* **Tagline uses the live site's actual color-dodge text treatment**: `mix-blend-mode: color-dodge` against `#cc4100` (read directly from the live site's computed styles), not a flat color. Required removing `z-index` from `.photo-hero-content` — an explicit z-index there was opening a new stacking context that isolated the blend from the photo behind it (blending against black instead), a non-obvious CSS gotcha worth remembering if this pattern is reused.
* **Star and logo scroll effects, reverse-engineered from the live site's actual Elementor Motion Effects panel settings (owner supplied screenshots) and its `data-settings` JSON**: star vertical (Up, speed 6, 35–70%), horizontal (To Left, speed 50, 35–80%), scale (60–100%); logo vertical (Down, speed 5, 55–80%), transparency (Fade Out, level 8, 61–100%), blur (Fade Out, level 5, 67–100%), scale (speed 3, 53–70%). Elementor's "Viewport %" ranges are literal on the live site but don't translate directly to this page's very different (much taller) hero geometry — three real bugs came from applying them too literally, all fixed:
  1. *Logo pre-faded on load*: measuring the wordmark's real on-screen position put it already partway through its fade range at rest. Fixed by capturing its resting position once and ramping over what's left of its real trip to the top of the viewport, guaranteeing full strength at load.
  2. *Star invisible until deep scroll*: it rests hidden below the fold (matching production), but the real ratio's vertical component is a small on-screen lift, not enough travel to bring one up from entirely off-screen. Decoupled rise/sweep magnitudes from the literal ratio (viewport-height/width-based instead) so it's visible early, still on the canyon photo.
  3. *Star visually disappeared behind later sections*: `position: fixed` at `z-index: 2` was losing the stacking fight against `.engagement-panel` (`z-index: 3`) and other sections once scrolled underneath them — raised to `z-index: 20` (still below the header's 50, so it still tucks behind the nav correctly).
  Also fixed: the star's path bent/arced rather than moving as one straight diagonal, because rise/sweep/scale each had independently-timed ramp windows that finished at different points — replaced with a single unified eased ramp driving all three in lockstep. And replaced event-driven (`scroll` + rAF-throttled) updates with a continuous rAF loop, since scroll-event batching under headless/fast-scroll conditions was staggering updates into visible jumps.
* **Split section headers**: Four section headers (Expertise, Who We Work With, How We Work, Track Record) were restructured from the shared `.section-header` pattern (eyebrow + title stacked above a width-capped lead paragraph) into a two-row grid — eyebrow spans full width on its own row, title and lead paragraph share the row below at the same top edge. Fixes two real issues: the lead paragraph stopping short of the full-width content below it (an empty gap on the right), and the paragraph's top edge aligning with the small eyebrow tag instead of the headline itself.
* **Track record stats reformatted**: boxed cards (equal-width, six labels of very different lengths) were replaced with a boxless strip — a thin maroon rule above each number instead of a card boundary, so uneven label lengths never look misaligned.
* **Removed per owner direction**: the "Innovation & Insight Studio" brand-banner section (between Who We Work With and How We Work), and the two market-segment summary cards below the segment slider.
* **Reverted**: an aesthetic pass that made buttons pill-shaped — owner didn't like it; back to the shared `.btn` (small radius) used everywhere else.
* **Verification**: every change in this session was checked with a real headless-browser pass (build + Playwright), not just read from the code — numeric assertions on the scroll-driven custom properties (opacity/blur/scale/transform at specific scroll positions) plus visual screenshots at each step. One methodological note for next time: rapid programmatic `scrollTo()` loops in headless testing can produce misleading readings (either from `scroll-behavior: smooth` interrupting itself, or from rAF throttling in a backgrounded page) — settle with `behavior: 'instant'` and ~1s waits when verifying scroll-linked motion this way, rather than trusting short-wait rapid sampling.
* **Files touched**: `apps/web/src/pages/homepage-alt.astro` (new), `apps/web/public/images/live-site/*` (new, 3 files).
* **Next up (queued, not started)**: Owner to review the star/logo motion and overall draft fresh (start of next session); no other open items from this session. If continuing this draft, a full copy pass on the adapted/condensed section copy (integration section, brand banner text — see the file's inline comments for what was adapted vs. sourced) is still outstanding before this could be considered production-ready, as is a decision on whether any of this draft's direction (photo hero, scroll effects, split headers, stat strip) should be merged back into the real `index.astro`.

## 2026-08-16 (M4 — Progressive Tailwind/design-system normalization + repo reconciliation)

Resumed development per the owner's M4 session brief: reconciled stale
current-state documentation, performed a bounded M6 (Cloudflare Git
auto-deploy) verification, then implemented M4.

* **Doc reconciliation** (`CLAUDE.md`, `docs/architecture/web-platform-architecture.md`,
  `.claude/skills/astro-architecture/SKILL.md`, `.claude/skills/terra-nexus-design-system/SKILL.md`):
  corrected stale claims that the Cloudflare adapter/`wrangler.jsonc` weren't
  installed and that Tailwind was entirely absent — both were ahead of what
  the docs said (M5/M6 had already shipped on `origin/main`). No content/
  governance files touched.
* **M6 bounded re-verification**: `wrangler deployments list --name
  terra-nexus-web-preview` shows every deployment through today sourced as
  `Upload`/`Secret Change`/`Unknown (deployment)` — none Git-triggered,
  including the window after PR #2 (the `wrangler.jsonc` commit) merged to
  `main`. Recorded as unverified/likely-not-connected rather than assumed
  complete or re-attempted from this environment (owner-only Cloudflare
  dashboard action). Did not block M4.
* **Tailwind v4 installed**: `tailwindcss@4.3.3` + `@tailwindcss/vite@4.3.3`
  via `astro.config.ts`'s `vite.plugins` — confirmed against current Astro/
  Tailwind docs as the correct integration path for Astro `>=5.2.0`
  (`@astrojs/tailwind` is deprecated for v4).
* **Token bridge**: `apps/web/src/styles/tailwind.css` — CSS-first `@theme
  inline` aliasing `design-system.css`'s existing custom properties into a
  `tn-`-prefixed Tailwind theme namespace (colors, fonts, radii, shadows).
  No values duplicated; `design-system.css` stays the token source of
  truth. Spacing and max-widths deliberately left unbridged (spacing scale
  already numerically matches Tailwind's defaults; widths stay on the
  existing `.container` classes pending real M7 utility coverage).
* **Representative migration**: `PageHero.astro` converted from a scoped
  `<style>` block to Tailwind utilities backed by the `tn-` bridge —
  visually unchanged (confirmed by browser QA below), proving the pattern
  for M7's wider adoption. No other component/page touched.
* **CSS inventory**: classified `design-system.css`/`foundation.css` into
  canonical tokens / global base / reusable component patterns (M7
  candidates) / page-specific (none found outside component scoped
  styles) / genuinely dead (`foundation.css` + `FoundationLayout.astro`,
  imported by nothing — flagged, not removed, since deleting them is
  unrelated to the Tailwind migration).
* **Verification**: `npm run web:build` / `web:typecheck` (0 errors) /
  `web:test` (25/25 passed) / `npm run check` (pytest 25/25, skills sync,
  content validate, build/typecheck/test) all green.
* **Browser QA**: independent `visual-qa` agent captured a 20-screenshot
  pre-M4 baseline (5 routes × 4 viewports: 1440/1024/768/390 — `/`,
  `/capabilities`, `/expertise/agroforestry`, `/insights`, one Insight
  article) from a temporary `main`-branch worktree, then a matching
  post-M4 set from the current branch. Zero console errors/warnings, zero
  broken network requests, and no visual differences found by
  screenshot-eyeballing on any route/viewport. All 40 screenshots stored
  under `artifacts/qa/` (`m4-baseline-*` / `m4-after-*`). One operational
  note: the first baseline attempt hit a locked shared Playwright MCP
  Chrome profile (an orphaned automation-Chrome process from an earlier
  session); killing that process (PID 27252) resolved it — worth knowing
  if a future session hits the same `Browser is already in use ...
  use --isolated` error.
* **Correction (same day, post-PR-review):** that screenshot-only QA pass
  was not precise enough — it missed a real regression. Codex review of
  PR #4 flagged that `PageHero.astro`'s `mb-4`/`mb-5` Tailwind utilities
  could lose to unlayered `design-system.css` rules (`.eyebrow`'s own
  `margin-bottom`, and the global `h1,h2,...{margin:0}` reset) because
  Tailwind v4 utilities live inside `@layer utilities`, and per the CSS
  cascade-layers spec *any* unlayered declaration beats *any* layered one
  for the same property, regardless of specificity or source order.
  Verified with actual browser computed styles (not inferred from source):
  pre-M4 `main`, `/capabilities` at 1440 — eyebrow `margin-bottom: 16px`,
  `h1 margin-bottom: 20px`; this branch before the fix — `12px` and `0px`
  respectively, at every one of 1440/1024/768/390. A 20px vertical
  collapse on the H1 is real and should have been visible in the
  screenshots — the prior "no visual differences found" verdict was
  wrong, not a false alarm. Root-caused, fixed, and re-verified with
  computed styles at all 4 viewports plus fresh screenshots — see the
  next log entry below for the fix and corrected verification. Lesson for
  future M4/M7 QA: screenshot comparison alone isn't sufficient for
  Tailwind-vs-legacy-CSS migrations; pull actual computed styles for the
  specific properties a migration touches, not just a visual scan.
* **Roadmap reordered** (owner direction, this session): M8 (WordPress
  content/SEO/remaining CMS/OKF migration) now precedes M9 (cinematic
  homepage/GSAP), so final visual polish responds to real content/IA
  instead of placeholders. M10 (production cutover) unchanged as the final
  step, always requiring explicit owner authorization.
* **Orchestration used**: `terra-nexus-design-system` and
  `astro-architecture` skills consulted before touching tokens/config;
  Tailwind/Astro official docs fetched live (WebSearch/WebFetch) rather
  than relying on memorized syntax; two `visual-qa` subagents (baseline +
  post-change comparison) for independent browser verification. Tailwind
  install/config/token-bridge/PageHero migration were implemented directly
  in this session rather than delegated to a separate `frontend-builder`
  agent, given the small, single-component scope.
* **Explicitly not started**: M7 (expanded reusable visual system), M8
  (WordPress/content/SEO/CMS migration), M9 (GSAP/cinematic homepage), M10
  (production cutover). No GSAP installed, no production DNS/deploy
  touched, no Case Studies/OKF changes, hosted Keystatic and publication
  scheduling untouched.
* **Files touched**: `CLAUDE.md`, `docs/architecture/web-platform-architecture.md`,
  `.claude/skills/astro-architecture/SKILL.md`,
  `.claude/skills/terra-nexus-design-system/SKILL.md`,
  `apps/web/package.json`, `apps/web/astro.config.ts`,
  `apps/web/src/styles/tailwind.css` (new),
  `apps/web/src/layouts/SiteLayout.astro`,
  `apps/web/src/components/PageHero.astro`, `artifacts/qa/m4-*.png` (40 new).
* **Next up**: M7 — expand Tailwind coverage to the reusable component
  vocabulary (section primitives, cards, buttons, stats, editorial blocks)
  identified in the M4 CSS inventory's category C; not started this
  session per explicit scope boundary.

## 2026-08-16 (M4 PR #4 review fix — PageHero cascade-layer regression)

Addressed two Codex P2 review threads on PR #4 before merge, per explicit
owner instruction not to broaden into M7. Independently verified both
findings with real browser computed styles rather than accepting the
review at face value.

* **Finding 1 — eyebrow/h1 margin-bottom, CONFIRMED VALID.** Tailwind v4
  emits all utilities inside `@layer utilities`; unlayered CSS always
  outranks layered CSS for the same property regardless of specificity
  (CSS cascade-layers spec). `design-system.css`'s unlayered `.eyebrow {
  margin-bottom: var(--space-3) }` and global `h1,h2,...{ margin: 0 }`
  reset were silently beating `PageHero.astro`'s `mb-4`/`mb-5` utilities.
  Computed-style evidence (`/capabilities`, 1440/1024/768/390, all four
  identical): baseline (pre-M4 `main`) eyebrow `margin-bottom: 16px`, h1
  `margin-bottom: 20px`; this branch before the fix, `12px` and `0px`.
* **Finding 2 — mobile padding, CONFIRMED FALSE (no regression).** Codex
  flagged that `design-system.css`'s `@media (max-width: 48rem) {
  .page-hero { padding-block: var(--space-12) var(--space-10) } }` looks,
  from source, like it should reduce padding under 768px, and the
  migrated component's unconditional `pt-20 pb-16` looks like it dropped
  that. Checked with real computed styles instead of trusting source
  inference (per instruction, since the old scoped Astro `<style>` could
  behave differently under cascade/specificity): the pre-M4 baseline's
  own scoped `.page-hero { padding-block: var(--space-20) var(--space-16)
  }` was *also* unlayered with equal-or-higher specificity (Astro's
  scoping attribute), so it won that same media query at every viewport
  too — computed `padding-top`/`padding-bottom` on `main` was `80px`/
  `64px` at 1440, 768, *and* 390, never `48px`/`40px`. The mobile
  reduction never applied to `PageHero` before or after M4. No fix
  needed; documented in a code comment instead so a future reader doesn't
  "fix" this into an actual regression.
* **Fix chosen for Finding 1 — smallest correct pattern, not
  `!important`.** Reintroduced a two-rule scoped `<style>` block in
  `PageHero.astro` (`.page-hero-eyebrow { margin-bottom: var(--space-4) }`,
  `.page-hero-title { margin-bottom: var(--space-5) }`) — the same
  mechanism the pre-M4 component already used to win against these same
  global rules (Astro's scoping attribute is unlayered and outranks the
  plain global selectors). Only the two conflicting properties are
  overridden this way; every other Tailwind utility on the component is
  untouched, since nothing else on a bare `<section>`/`<div>` has a
  competing unlayered rule. Rejected: `!important`/Tailwind's `!` modifier
  (works but wrong general pattern, would need repeating everywhere M7
  hits the same gotcha); moving all of `design-system.css` into cascade
  layers (fixes it site-wide but is an unproven, large blast-radius
  change explicitly out of M4 scope per owner instruction).
* **QA methodology gap acknowledged**: the original M4 QA pass (screenshot
  comparison only) reported "no visual differences" despite a real 20px
  vertical collapse on H1 — see the correction appended to the prior log
  entry above. This session's fix was verified with actual computed
  styles (`padding-top`, `padding-bottom`, `margin-bottom`) at
  1440/1024/768/390 on both real `PageHero`-using routes (`/capabilities`,
  `/expertise` — note `/expertise/agroforestry`, used in the original QA
  pass, renders via `ExpertisePage.astro`, a different, not-yet-migrated
  component, and was never actually exercising `PageHero`), confirming
  all four properties now match the pre-M4 baseline exactly at every
  viewport. Fresh screenshots captured for both real PageHero routes at
  all 4 viewports (`m4-fix-capabilities-*.png`, `m4-fix-expertise-index-*.png`).
* **Validation**: `npm run web:build` / `web:typecheck` (0 errors) /
  `web:test` (25/25) / `npm run check` (pytest 25/25, skills sync, content
  validate, build/typecheck/test) all green after the fix.
* **Scope discipline**: no M7 work started — only `PageHero.astro` and
  this log/architecture documentation were touched; no other component
  was migrated or audited for the same cascade-layer issue (flagged for
  M7 to check systematically, not fixed preemptively here).
* **Files touched**: `apps/web/src/components/PageHero.astro`, `log.md`,
  `docs/architecture/web-platform-architecture.md`,
  `artifacts/qa/m4-fix-*.png` (8 new).

## 2026-08-16 (M6 closeout — Cloudflare Workers Builds Git auto-deploy verified end-to-end)

Owner connected Cloudflare Workers Builds' Git integration to the
existing staging Worker (`terra-nexus-web-preview`) in the Cloudflare
dashboard. This session's task was narrowly scoped to verifying that
connection end-to-end, documenting the result, and closing M6 — not
starting M7.

* **`main` → stable staging, PROVEN.** Proof commit: PR #4 (M4 Tailwind
  foundation) merged to `main` at `07e80a753ff5fd3d138702500b17c2ccfeea8baa`.
  A real GitHub check run from Cloudflare's own GitHub App
  (`Workers Builds: terra-nexus-web-preview`, `conclusion: success`,
  started ~2 minutes after the merge) deployed Version ID `3aee1200` and
  promoted it to the stable `terra-nexus-web-preview` Worker at 100% —
  confirmed via `wrangler deployments list` (not just the check run).
  Live routes verified: `/` (200, correct title), `/insights` (200,
  correct title), `/keystatic` (200 — confirms the branch-aware build
  command correctly enabled Keystatic for `main`), `/homepage-alt` (301 →
  `/`). Stable domain's `robots.txt` returns the indexable (production)
  value. No production DNS or WordPress production touched — confirmed
  `terra.nexus` still resolves to its existing production host, 200,
  unaffected.
* **Non-production branch → preview only, PROVEN.** Created
  `test/m6-workers-build-preview` from `main`, one harmless non-application
  commit (a standalone Markdown note, no source/config changes), pushed.
  Cloudflare's check run on that branch's commit produced a **distinct**
  Version ID (`107b0bf4`) with its own dedicated preview URL and a
  `noindex` `robots.txt` — the `wrangler versions upload` shape, not
  `wrangler deploy`. `wrangler deployments list` immediately after showed
  **no new 100% entry** — the branch build never touched the promoted
  deployment; the stable Worker (`3aee1200`, indexable `robots.txt`) was
  unchanged throughout. Branch deleted after the proof (`git push origin
  --delete test/m6-workers-build-preview`), not merged to `main`; the
  unpromoted Cloudflare version itself was left as-is (harmless, no
  cleanup needed).
* **Documentation updated** to remove all "partial"/"pending"/"owner
  action required" M6 language now that it's verified complete:
  `docs/architecture/web-platform-architecture.md` (§1 hosting row, §6
  intro, §9 M6 table row — now marked **COMPLETE** — §10's Keystatic-first
  workflow description, and a new §11.1–§11.3 with the full verification
  record and the confirmed final deployment model), `CLAUDE.md` (current-state
  summary + milestone-scoped-work section), and
  `.claude/skills/cloudflare-deployment/SKILL.md` (frontmatter description
  + current-state section). `AGENTS.md`/content-governance rules
  untouched — out of scope for infra/deployment work.
* **Final deployment model, confirmed (not aspirational):**
  ```
  main → Workers Builds → wrangler deploy → stable terra-nexus-web-preview
  non-production branches → Workers Builds → wrangler versions upload →
    preview/version URL → stable staging unchanged
  future production → separate terra-nexus-web Worker/environment →
    NOT implemented yet
  ```
* **Validation**: `npm run web:build` / `web:typecheck` (0 errors) /
  `web:test` (25/25) / `npm run check` (pytest 25/25, skills sync, content
  validate, build/typecheck/test) all green — documentation-only changes,
  no application code touched this session.
* **Scope discipline**: no M7 work started. Only verification (Cloudflare
  API/CLI reads, a throwaway test branch that was deleted, not merged) and
  documentation were performed.
* **M6 status: COMPLETE.**
* **Next milestone: M7 — Expanded reusable visual/design system** (not
  started this session).

## 2026-08-16 (Reconcile PR #3 site developments onto current main)

PR #3 (`feature/homepage-nav-trial-and-team-review`) developed real
site features before M4 (Tailwind foundation) and the M6 Cloudflare
Workers Builds closeout landed, and had diverged from `main`. This
session reconciled every intentional application change from that
branch onto the current, post-M4/M6 architecture on a fresh branch
(`feature/reconcile-pr3-site-developments`), rather than merging the
stale branch directly. PR #3 itself and its source branch were left
open/intact as historical reference — nothing was deleted or force-
merged.

* **Starting point**: created from `origin/main` (`07e80a7`, M4 merged).
  Immediately merged in `origin/chore/m6-closeout` (PR #5, verified but
  not yet merged to `main` at session start) so this branch's
  documentation states current truth (M4 complete, M6 complete, M7
  next) rather than the pre-closeout "M6 partial" wording still on
  `main` — flagged per this session's own instructions rather than
  silently worked around.
* **Full PR #3 inventory** (5 commits on the old branch beyond its
  merge-base with `origin/main`, plus one QA-screenshot/log commit not
  ported — see below):
  - **Footer copy fix** (`8f7cb3e`) — cherry-picked clean, no conflicts
    (base state matched current `main` exactly). Mission-statement
    sentence updated to the owner-provided copy; `sutainable` →
    `sustainable` typo fixed.
  - **Digital Solutions page** (`a9e288d`) — cherry-picked the page and
    the homepage button-link change; the 4 stale pre-M4 QA screenshots
    from that commit were intentionally dropped (superseded — captured
    fresh ones instead, see below). `/digital-solutions/` uses
    `PageHero`, so it automatically inherits M4's Tailwind-migrated
    component (including the post-PR-#4-review cascade-layer fix) with
    zero extra work. Referenced product-mockup image
    (`terranexus-terrain-family-16x9-dark.png`) already exists on
    `main` from an earlier session — no missing asset.
  - **Nav trial + Back to Top** (`00f46ad`) — cherry-picked with one
    real (clean, auto-merged) conflict: `SiteLayout.astro` had diverged
    because M4 added the Tailwind CSS import there. Git's merge
    resolved it correctly (M4's import block and PR #3's `BackToTop`
    import/mount are on non-overlapping lines) — verified by reading
    the resulting file, not just trusting the auto-merge.
  - **Studio Executives / About page** (`cf20f45`) — cherry-picked
    clean; the About page's pre-existing content was byte-identical
    between PR #3's branch-point and current `main`, so this was a
    pure addition.
  - **NOT ported as-is**: PR #3's own `log.md` entry and its
    `docs/architecture/web-platform-architecture.md` diff (stale M6
    "partial"/M6.2-milestone-numbering language, written before M4/M6
    closed) — the *intent* of that diff (documenting `/about`,
    `/digital-solutions`, and the nav trial in §3) was reconciled
    forward as fresh prose against the current document instead of
    copied verbatim; see the "Document reconciled PR #3 routes/trial"
    commit on this branch.
* **Cascade-layer / Tailwind safety check** (per this session's explicit
  scope): searched every reconciled file (`about/index.astro`,
  `BackToTop.astro`, `digital-solutions/index.astro`, `Header.astro`)
  for Tailwind utility classes — none use any (`card-grid`, `exec-grid-a`
  etc. are pre-existing plain design-system class names, not Tailwind
  utilities), so none of PR #3's restored styling can hit the
  unlayered-vs-`@layer utilities` gotcha documented in M4's PR #4 review
  fix. No opportunistic Tailwind migration was performed on any of this
  restored code, per this task's explicit scope.
* **Validation**: `npm run web:build` / `web:typecheck` (0 errors) /
  `web:test` (25/25) / `npm run check` (pytest 25/25, skills sync,
  content validate) all green after reconciliation.
* **Browser QA**: manual interaction checks (this session) plus an
  independent `visual-qa` subagent sweep, both against the reconciled
  branch's dev server. Manually verified: top-nav links (`/#expertise`,
  `/#capabilities`, `/#who-we-work-with`), corrected footer text, the
  homepage "See our Digital Solutions" button → `/digital-solutions/`,
  and Back to Top's actual scroll landing — on the homepage it lands at
  `scrollY 823`, exactly `#expertise`'s offset (919px) minus its 96px
  (`6rem`) `scroll-margin-top`; on `/about` it lands at `scrollY 0` (true
  top). Zero console errors/warnings on every check. The independent
  subagent then captured all 24 required screenshots (6 routes ×
  4 viewports: `/`, `/digital-solutions/`, `/about/`, `/capabilities`,
  `/expertise`, `/insights` at 1440/1024/768/390 — stored under
  `artifacts/qa/reconcile-*.png`; stale PR #3 screenshots not carried
  forward, per above) and independently confirmed: zero console
  errors/warnings and zero broken/404 network requests across all 24
  combinations; zero horizontal-overflow instances
  (`scrollWidth > innerWidth` false everywhere); `/digital-solutions/`
  hero/showcase-image/three "Coming Soon" cards all render correctly;
  both About Studio Executives options (A "Photo Reveal", B
  "Expertise-Linked") render with their "Draft for internal review" flag
  visible; `/capabilities` and `/expertise` still resolve as full
  standalone pages when navigated to directly (only the top-nav *links*
  changed, not the routes themselves — footer nav still points at the
  standalone routes too); footer text confirmed correct and
  typo-free on every page checked.
* **Cloudflare preview, PROVEN**: pushed
  `feature/reconcile-pr3-site-developments` to origin. Workers Builds
  produced a real GitHub check run (`conclusion: success`) with a
  **distinct, unpromoted Version ID `49da8fb0-ea7f-4ee0-914d-5c2eea03f7c6`**
  and a dedicated preview URL —
  `https://49da8fb0-terra-nexus-web-preview.josh-242.workers.dev` (plus a
  branch-name alias URL) — the `wrangler versions upload` shape, not
  `wrangler deploy`. Verified live: `/` and `/digital-solutions/` both
  200, `/digital-solutions/` `<title>` correct, `robots.txt` returns
  `Disallow: /` (fully noindexed, correct preview-build behavior).
  `wrangler deployments list` immediately after still ends at
  `3aee1200-...` at 100% — **no new entry**, confirming the stable
  `terra-nexus-web-preview` deployment was not touched. This branch was
  not manually deployed over stable at any point.
* **Scope discipline**: no M7 work started. PR #3 and
  `feature/homepage-nav-trial-and-team-review` left open/intact, not
  closed. This reconciliation branch is explicitly for owner review, not
  an auto-merge — nav-anchor trial and Studio Executives layout choice
  both remain undecided. Owner reviews the preview URL above and decides:
  footer approved? Digital Solutions approved? Back to Top approved?
  nav-anchor trial keep/revert/hybrid? Studio Executives option A/B/
  hybrid? Once decided, a final integration PR can retire PR #3 safely.

## 2026-08-16 — M7 (session 1): design-system audit + card/tag/stat/CTA consolidation

* **Scope of this session**: M7 is a large milestone (full spec in the
  session brief covers layout primitives, section system, cards, stats,
  CTA, PageHero evolution, every page family, editorial system,
  Header/Footer/BackToTop, cleanup, and full responsive/a11y QA). This
  session completed a real, verified first slice — Phase A (full audit)
  and the highest-value part of Phase C (consolidating duplicated
  card/tag/stat/CTA patterns the audit found) — not the full 35-point exit
  criteria in one pass. Remaining M7 scope (page-family visual adoption
  beyond what already used shared classes, PageHero variant work,
  Header/Footer visual normalization, editorial typography pass, an
  internal component showcase if warranted) is left for a follow-up M7
  session, tracked against the same branch/PR.
* **Audit findings** (`Explore` subagent, full repo read of
  CapabilityPage/ExpertisePage/CaseStudyArticle/CaseStudyCard, all 13 mdx
  components, About/Digital-Solutions/Capabilities/Expertise/Case-Studies/
  Insights page families, layouts, foundation.css): found 5 independent
  local reimplementations of `.card`'s base recipe, 2 identical
  `.workstream-card` copy-pastes across unrelated files, 2 identical
  `.eyebrow-light` copies, a `.btn-ghost` variant that existed in exactly
  one component, 4 near-identical tag/pill implementations, 3 independent
  stat displays with different type scales/colors, a real visual bug
  (ExpertisePage's local `.cta-description` override silently rendering
  that page's CTA copy in a different color than every other page), a
  missing token (`--c-success-600`, silently backed by a hardcoded hex
  fallback), a functional gap (the `Video` MDX component registered in
  Keystatic but missing from `insights/[slug].astro`'s render map), and
  confirmed (grep-verified) zero consumers for `foundation.css` /
  `FoundationLayout.astro`.
* **Primitives added** to `design-system.css`: `.eyebrow-light`,
  `.btn-ghost`, `.card-static`, `.card-accent-start`, `.card-plain`,
  `.tag`, `.numbered-index`, `.stat-value-accent`, `.stat-type`,
  `--c-success-600`. All composable modifiers on top of the existing
  `.card`/`.eyebrow`/`.btn`/`.stat-group` base recipes, not a second
  competing system.
* **Consumers migrated**: CaseStudyCard, CapabilityPage (offering-number,
  segment-tag, dead duplicate `.text-center` removed), ExpertisePage
  (eyebrow-light, cta-description bug fix, step-number, btn-ghost,
  benefit-card, workstream-card, hardcoded-hex-to-token fixes),
  CaseStudyArticle (eyebrow-light, sidebar-card, hardcoded-hex fix, plus
  the `.case-body-grid` `1fr` → `minmax(0, 1fr)` overflow fix — a real
  ~18-33px horizontal-overflow bug at exactly the 1024px QA viewport,
  caught by M7 baseline QA, not present before this session), 
  capabilities/index (workstream-card, pathway-tag), about/index
  (exec-tags → `.tag` only — both Studio Executives review options
  otherwise untouched), insights/[slug].astro (Video component
  registered).
* **Dead code removed** (grep-confirmed zero consumers before deletion):
  `apps/web/src/styles/foundation.css`, `apps/web/src/layouts/FoundationLayout.astro`.
* **Validation, all green**: `npm run web:build`, `npm run web:typecheck`
  (75 files, 0 errors/warnings/hints), `npm run web:test` (25/25),
  `npm run check` (OKF validator, tnx_validate, pytest 25/25, inventory
  freshness, skills sync, content:validate). No `!important` introduced
  anywhere.
* **QA**: baseline screenshots captured before any change
  (`artifacts/qa/m7-baseline/`, 45 images, 11 routes × 4 viewports,
  zero console errors) via independent `visual-qa` subagent; after-QA
  covering the same matrix plus targeted regression checks on the two
  specific bug fixes above is running as a separate independent pass
  (`artifacts/qa/m7-after/`).
* **Branch/preview**: `feature/m7-visual-system`, created from
  `origin/main` at `970dfcb` (confirmed clean, matching the expected PR #6
  merge SHA — no drift). Pushed; Cloudflare Workers Builds produced a real
  GitHub check run for the branch (non-production path — `wrangler
  versions upload`, not `wrangler deploy` — stable `terra-nexus-web-preview`
  untouched).

## 2026-08-16 — M7 (session 2): PageHero evolution, compositions, editorial system, global UI — M7 complete

* **Scope of this session**: continued `feature/m7-visual-system` /
  PR #7 from session 1's head (`ce555f0`). Working tree was clean at
  session start, branch confirmed current with PR #7. Addressed the
  remaining M7 priority list from the session brief: PageHero evolution,
  reusable composition patterns, broader page-family adoption, the
  editorial/MDX visual pass, Header/Footer normalization, and BackToTop
  verification. Preserved everything proven in session 1 (all primitives,
  the CaseStudy grid `minmax(0, 1fr)` fix, the Expertise CTA color fix,
  the Insights `Video` MDX registration, the `foundation.css`/
  `FoundationLayout.astro` deletion) — nothing from session 1 was reverted
  or replaced.
* **Discovery** (`Explore` subagent, evidence-based, no speculation):
  audited every PageHero consumer (9, already homogeneous) plus 4
  hand-rolled hero treatments outside PageHero (ExpertisePage's
  image-background hero, Insights' editorial hero, CaseStudyArticle's
  dark/media hero, the homepage's cinematic hero — left alone, M9 scope);
  found the closing-CTA banner pattern duplicated near-verbatim 10 times;
  found three independent, non-identical stat-band implementations
  (design-system's `.stat-group`, the homepage's local `.stat-strip`,
  CaseStudyArticle's local `.stat-item`/`.stat-number`); found
  CaseStudyCard's `.eyebrow` was a local re-implementation with a
  different color token than the shared class; found the Insights card
  grid didn't reuse `.card-grid`/`.card` like every other card grid in the
  codebase did; found zero `:focus-visible` states anywhere in
  `Header.astro`; confirmed `design-system.css`'s 4 `!important`
  occurrences (all in the universal reduced-motion override block,
  unchanged from session 1) and BackToTop's tokens already matched the
  rest of the system.
* **PageHero** gained `variant?: 'standard' | 'media'` (default
  `'standard'`, zero behavior change for the 9 pre-existing consumers)
  plus `heroImage?`/`heroImageAlt?`. `variant="media"` renders the
  full-bleed background-image/scrim treatment moved out of
  `ExpertisePage.astro`'s local `.expertise-hero` CSS (deleted after the
  move — real consolidation, not a duplicate). Insights and Case Study
  hero treatments deliberately left hand-rolled — their structural
  elements (breadcrumb, byline, stat band) don't fit a small hero prop
  API; forcing them in would have produced exactly the "giant prop
  matrix" the M7 brief warned against.
* **`ClosingCta.astro`** (new component) replaced the 10 duplicated
  closing-CTA blocks across `about/index.astro`, `capabilities/index.astro`,
  `case-studies/index.astro`, `digital-solutions/index.astro`,
  `expertise/index.astro`, `index.astro`, `CapabilityPage.astro`,
  `ExpertisePage.astro`, and both `who-we-work-with/*` sub-pages. Copy and
  hrefs preserved exactly. `who-we-work-with/index.astro`'s lighter
  single-button CTA left as-is — a genuinely different structural pattern,
  not the same duplication.
* **Stat bands** consolidated onto the shared `.stat-value`/`.stat-label`/
  `.stat-value-accent`/`.stat-type` primitive set, extended with two new
  size modifiers (`.stat-value-md`, `.stat-value-fluid`) to cover the two
  real size differences found rather than leaving a third parallel
  implementation. `CaseStudyCard.astro`'s local `.eyebrow` promoted to a
  genuine third eyebrow variant, `.eyebrow-sky`, instead of staying a
  duplicate. Insights card grid (`insights/index.astro`) migrated onto
  `.card-grid` + a new `.card-media` modifier (accent-bar/padding-free,
  for edge-to-edge thumbnails).
* **Editorial/MDX pass** (`insights/[slug].astro`): article-body max-width
  normalized onto the existing `--max-width-text` token (was four repeated
  `42rem` magic numbers); added H2/H3 rhythm and list/paragraph spacing
  using existing `--space-*` tokens. `DataTable.astro`'s pre-existing
  `overflow-x: auto` wrapper (no 390px page-overflow bug found) got
  accessible keyboard-scroll support (`role="region"`, `tabindex="0"`,
  `aria-label`, focus-visible outline). The other 12 MDX components
  audited, found already consistent, left unchanged.
* **Real regression found by independent QA, fixed same session**: the
  new `.insight-body :global(p)` color rule had higher effective
  specificity than the MDX `CTA` component's own `.mdx-cta-heading`/
  `.mdx-cta-body` color rules, rendering CTA blocks inside Insight
  articles navy-on-navy (invisible) whenever one appeared. Fixed by
  excluding the CTA's own classes from the blanket rule
  (`:not(.mdx-cta-heading):not(.mdx-cta-body)`); independently re-verified
  via computed styles (white `rgb(248,250,252)` text on navy
  `rgb(19,31,72)` background, confirmed at both 1440 and 390) before this
  session was called done.
* **Header/Footer**: added `:focus-visible` to `Header.astro`'s
  `.nav-link`/`.nav-toggle` (none existed before — a real a11y gap) using
  the existing `--color-focus` token; added mobile-only `Footer.astro`
  bottom padding so the fixed `BackToTop` button doesn't sit over the
  copyright line at 390px. Homepage anchor-nav trial (`/#expertise` etc.)
  explicitly preserved unchanged — still a trial. `BackToTop.astro`
  inspected, not modified — tokens and functional behavior already
  correct.
* **Validation, all green** (re-run after the CTA fix, not just before
  it): `npm run web:build`, `npm run web:typecheck` (76 files, 0
  errors/warnings/hints), `npm run web:test` (25/25), `npm run check`
  (OKF validator, tnx_validate, pytest 25/25, inventory freshness,
  `content:validate`). `!important` count unchanged at 4, all confined to
  the reduced-motion override block.
* **QA**: independent `visual-qa` subagent pass across the full required
  route matrix (`/`, `/digital-solutions/`, `/about/`, `/capabilities` +
  a representative detail, `/expertise` + a representative detail,
  `/insights` + a representative article, `/case-studies` + a
  representative detail) at 1440/1024/768/390 — zero horizontal overflow
  anywhere, zero broken images/404s, keyboard focus verified through the
  header nav and mobile menu (including `Escape`-to-close with focus
  return), footer link focus states verified, `BackToTop`/footer overlap
  at 390px verified absent, standalone `/capabilities` and `/expertise`
  routes confirmed to still render as full pages on direct navigation
  (not just anchor-scroll targets). One real defect found (the CTA color
  regression above); fixed and independently re-verified via a second QA
  pass before sign-off. Screenshots under `artifacts/qa/m7-session2/` and
  `artifacts/qa/2026-08-16-mdx-cta-fix-*.png`.
* **Documentation updated**: `docs/architecture/web-platform-architecture.md`
  (new §5.3, M7 row in §9's milestone table updated from IN PROGRESS to
  COMPLETE), `.claude/skills/terra-nexus-design-system/SKILL.md`
  (component-vocabulary section rewritten to cover both sessions' full
  vocabulary — PageHero variants, `ClosingCta`, consolidated stats,
  `.card-media`, `.eyebrow-sky`, Header/Footer/BackToTop guidance, the
  MDX cascade-gotcha finding), this `log.md` entry.
* **M8 readiness**: every audited page family (Capabilities, Expertise,
  Digital Solutions, About, Case Studies, Insights) now has a real shared
  vocabulary to build from — primitives (`.card`/`.tag`/`.numbered-index`/
  `.stat-*`/`.btn-*`/`.eyebrow*`) plus compositions (`PageHero`,
  `ClosingCta`, `.card-grid`) plus the editorial/MDX system. A future M8
  agent migrating real content should reuse this vocabulary rather than
  inventing a second one; it should not need to recreate PageHero, the
  closing-CTA pattern, the stat-band system, or any of the 13 MDX
  components. What M8 still owns entirely: the actual content/URL/SEO
  migration itself, retiring the OKF/`knowledge/` pipeline once its
  content has moved, and Case Study Keystatic schema migration (data
  architecture, not visual — untouched this session per explicit scope).
* **Scope discipline**: M8 not started (no content/SEO/redirect work), M9
  not started (no GSAP installed, no cinematic/motion work), production
  untouched, Studio Executives review options both preserved unchanged,
  nav-anchor trial preserved as a trial, Case Study/OKF data architecture
  untouched (visual/composition only). PR #7 not merged.
