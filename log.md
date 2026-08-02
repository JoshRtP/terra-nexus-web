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
