---
title: "OKF → Keystatic migration inventory"
status: "Living document — update as content actually migrates"
updated: "2026-08-12"
---

Companion to [`web-platform-architecture.md`](web-platform-architecture.md)
§4. Keystatic + MDX is now the canonical CMS (owner decision, 2026-08-12).
This document inventories what lives in the OKF `knowledge/` bundle today,
what's already migrated, what's mapped for a future migration, and what's
pure reference/governance that either stays as-is or gets ported as
concepts (not files) when OKF is eventually retired.

Nothing in `knowledge/` has been deleted or modified as part of this
inventory. `apps/web/src/lib/okf/*` is untouched and still builds
Case Studies exactly as before.

## 1. What's actually wired into the site today

Only **5 files** in `apps/web` import from `lib/okf`, and all of them exist
to serve **Case Studies**:

- `src/pages/case-studies/index.astro`
- `src/pages/case-studies/[slug].astro`
- `src/pages/robots.txt.ts` (imports `compileForBuild` only to trigger
  validation before serving robots.txt — not content-related)
- `src/components/CaseStudyArticle.astro`
- `src/components/CaseStudyCard.astro`

The OKF compiler (`route-contract.ts`) has route logic for several other
record types — Service Family, Service Offering, Expertise Topic, Audience
Segment, Insight/Insight Article, Team Member/Bio/Profile — but **no Astro
pages currently consume any of them**. The `/expertise`, `/capabilities`,
`/who-we-work-with` pages that exist today are hand-authored `.astro`
components (`ExpertisePage.astro`, `CapabilityPage.astro`, etc.), not OKF
output.

## 2. Folder-by-folder inventory

| `knowledge/` folder | Nature | Migration status |
| --- | --- | --- |
| `services/` (5 service-family subfolders) | Website-facing (Service Family/Offering records) | Not migrated. Currently hand-authored in `CapabilityPage.astro`-consuming pages, not actually read from `knowledge/` by any live route. Future: candidate for a Keystatic `services` collection when Capabilities pages are rebuilt on Content Collections. |
| `expertise/` (8 topic files + `briefs/`) | Website-facing (Expertise Topic records) + a schema/template doc | Same as above — hand-authored today, not OKF-driven. Candidate for a future `topics`-adjacent Keystatic collection (richer than the current `topics` collection, which is deliberately minimal for the Insights POC). |
| `audiences/` (2 segment subfolders) | Website-facing (Audience Segment records) | Same pattern — hand-authored `/who-we-work-with` pages, not OKF-driven. |
| `case-studies/` | Mixed: 1 real Case Study record (route-eligible, actually compiled) + `proof-schema.md`, `qualification-template.md`, `tagging-schema.md`, `intake-templates/` (governance/schema docs) | The one real case study is **the only OKF content actually live in production**. The Keystatic `caseStudies` collection (`keystatic.config.tsx`) is schema-designed to eventually replace this — see §3. Not migrated yet; OKF still serves it. |
| `brand/` | Internal reference (brand platform, usage rules, messaging, taglines) | Not content to migrate into Keystatic collections — informs copy, isn't itself a record type. Stays as reference material (or moves into a design-system doc later; out of scope here). |
| `governance/` (`advise-manage-operate.md`, `knowledge-model.md`, `service-decision-owner-matrix.md`, `source-precedence.md`) | Pure governance/validation logic, no website-facing records | See §4 — validation concepts worth preserving, not files to migrate. |
| `references/` (`decisions/`, `images/`, `okf/`, `source-documents/`) | Internal reference, some files explicitly immutable per `AGENTS.md` | Not migrated; not website content. Stays as historical reference until OKF is fully retired, then archived rather than deleted. |
| `website/` (`content-readiness.md`, `content-relationship-model.md`, `editorial-and-evidence-rules.md`, `open-issues-and-required-inputs.md`, `page-templates/`, `proposed-site-map.md`) | Planning/config docs — site map, page templates, editorial rules | Not itself compiled into records. `editorial-and-evidence-rules.md` in particular is worth reading before writing real (non-placeholder) Insight content — see §4. |
| `content-audits/` | Internal audit notes | Reference only, not migrated. |
| `codex/` | Agent/tooling workflow instructions (a different agent's operating docs) | Not applicable to Keystatic; unrelated to content migration. |

## 3. Case Studies: designed, not yet populated

`keystatic.config.tsx` defines a `caseStudies` collection (title, client/
industry descriptor, challenge, approach, outcomes, quantified stats,
hero image, related topics, related Insights, SEO fields, MDX body) as the
intended future replacement for OKF's Case Study record type. It is:

- **Not populated** — no real case-study content has been moved into it.
- **Not routed** — no `/case-studies` Astro page reads from it yet; the
  existing `/case-studies` routes still read from OKF exclusively.
- Grouped under "Design (in progress)" in the Keystatic navigation so it's
  visibly distinct from the working `posts`/`authors`/`topics` collections.

Actually migrating the one real, approved case study
(`commercial-pathways-lower-emissions-beef-2025.md`) requires care: it
carries `publication.approved_by` approval-gating metadata that has no
Keystatic-side equivalent yet (see §4). Don't hand-copy it into the
`caseStudies` collection without deciding how (or whether) that governance
metadata is represented in the new schema — flag to the owner before doing
this migration.

## 4. Validation logic worth preserving conceptually

The OKF compiler enforces rules that have no Keystatic-native equivalent.
If/when OKF is retired, these concepts — not the specific implementation —
are worth carrying forward into either Keystatic field validation, a CI
check, or an editorial checklist:

- **Publication approval gating**: `publication.audience`/`publication.state`/
  `publication.approved_by` — content defaults to internal/blocked; going
  public requires a named approver. Keystatic has no built-in equivalent;
  today `draft: true` on `posts` is the only gate, and it's binary
  (published/not), not an approval chain.
- **Content integrity rules** (`AGENTS.md`): no fictional example
  companies presented as clients, no invented case studies/outcomes/
  credentials/standards/partnerships. These are editorial rules, not
  technical ones — worth an explicit editorial checklist or a lightweight
  linter over MDX frontmatter/body before this matters at production scale.
  The sample article added in this session (`what-soil-carbon-data-
  actually-tells-buyers`) uses a generic, illustrative subject and an
  explicitly-labeled-as-illustrative stat — not a real Terra Nexus client
  claim.
- **`[agent-draft]` labeling** for agent-generated content sections.
- **Relationship integrity**: OKF validates that relationship fields
  resolve to known IDs and rejects duplicates. Keystatic's
  `relationship`/`multiRelationship` fields already provide this for free
  (they're backed by real collection lookups) — this one concept is
  actually already better-covered in the new system.

## 5. What has no prior content (greenfield)

**Insights/blog had zero prior content anywhere.** The OKF compiler's
route plumbing for `Insight`/`Insight Article` → `/insights/{slug}` exists
in `route-contract.ts`, but there was never a `knowledge/insights/` folder,
never an Insight schema in `schemas/`, and never any Insight `.md` records
— "Insights" only appeared as a planned nav item in
`knowledge/website/proposed-site-map.md`. The `posts` Keystatic collection
and its sample article are new content, not a migration of anything.

## 6. What can eventually be removed

Once the above is actually migrated (not just designed) and validated:

- `apps/web/src/lib/okf/*` (compiler, route-contract, case-study helpers)
- The 5 files listed in §1 that import from it (replaced by Keystatic-
  backed equivalents)
- `knowledge/` itself, or at minimum everything in it that's website-facing
  content (case studies, and eventually services/expertise/audiences if
  those get rebuilt on Content Collections) — governance/reference
  material (`brand/`, `governance/`, `references/`) would likely be
  archived rather than deleted outright, as historical record.

None of this is authorized or scheduled yet — this section describes the
eventual target, not a plan being executed now.
