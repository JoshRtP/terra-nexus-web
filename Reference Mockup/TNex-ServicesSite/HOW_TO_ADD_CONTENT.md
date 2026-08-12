# How to Add Terra Nexus Content Safely

This guide is for Terra Nexus owners. You do not need to know YAML, Astro, or the internal knowledge system to follow the normal workflow.

## Start with a draft case study

Run this from the repository folder in PowerShell:

```powershell
npm run content:new -- --type case-study
```

The command asks for a short file name and an internal reference title. It shows the planned location before creating anything and makes a safe draft only after confirmation.

For an automated or copy-and-paste version, use `--yes`:

```powershell
npm run content:new -- --type=case-study --slug=pilot-trading-review --title="Owner-supplied pilot reference" --service-family=services/sustainable-supply-chain-and-operations --expertise=expertise/sustainable-supply-chains --audience=audiences/food-and-agribusiness-value-chain/commodity-traders --engagement-model=advise --yes
```

The new draft is placed only in `knowledge/case-studies/`. It contains no invented client, outcome, credential, standard, or market claim. Complete it with the actual facts from the [universal proof intake](knowledge/case-studies/intake-templates/universal-proof-intake.md).

## Standard owner workflow

Use this sequence whenever you add or substantially change a case study:

```powershell
npm run content:new -- --type case-study
# Complete the universal proof intake and replace every owner-input placeholder with verified facts.
npm run content:affected -- case-studies/<your-slug>
npm run content:finalize
git diff
# Open a pull request for owner review.
```

`content:finalize` updates `knowledge/bundle-inventory.json` and `knowledge/TREE.txt`, tells you whether either changed, then runs every repository check. Review the case-study file, inventory, tree, and any other visible change with `git diff`; the command never commits or pushes for you. Private preview is a separate later step after review. It is not publication approval and preview authentication is not configured in Phase 2B.

## Add a qualification

Use [the qualification template](knowledge/case-studies/qualification-template.md) when one engagement needs a short reusable proof module rather than a full story. Keep it internal and unconfirmed until you have supplied the actual work, disclosure constraints, and substantiated outcome. Ask an agent to turn a completed intake into the record if you prefer not to edit files directly.

## Add an insight or expertise-page draft

Insights and expertise pages are not published by this foundation. To start either safely, ask for a draft in a reviewable pull request. For example:

```text
Create an internal blocked draft insight about [topic]. Use only the sources I provide, add no market claims, and link it to these IDs: [IDs].
```

```text
Prepare an internal blocked expertise-page draft for expertise/regenerative-agriculture. Use the stable source concepts, mark all new interpretation [agent-draft], and identify missing owner approvals and current-source research.
```

The agent must keep the draft blocked, disclose missing inputs, and run the validators. It cannot make the content public for you.

## Connect content to the right areas

Every link uses an ID, not a display name. The common connection types are:

| Connect to | Example ID |
|---|---|
| Service Line | `services/sustainable-supply-chain-and-operations` |
| Area of Expertise | `expertise/sustainable-supply-chains` |
| Who We Work With | `audiences/food-and-agribusiness-value-chain/commodity-traders` |
| Engagement model | `advise`, `manage`, or `operate` |

These remain separate dimensions: a service is not an expertise topic, an audience is not a service, and Advise/Manage/Operate is not a service category. Use the case-study command’s connection options as shown above. The command rejects unknown IDs instead of guessing.

## Understand visibility states

| State | Meaning |
|---|---|
| Internal + blocked | The safe default. It is for owner work only and is not available to the application. |
| Internal + preview | A draft or stable record can enter a protected preview build. Preview pages send `noindex, nofollow` and a disallowing `robots.txt`. |
| Proposal-only | Never enters this website application—not even preview. It is reserved for a future separately authenticated proposal system. |
| Public + approved | Can enter the production compiler only after the owner supplies all approval fields and proof confidentiality permits disclosure. |

To move an internal draft to protected preview, set its publication state to `preview` while keeping its audience `internal`, then run validation. A preview is not publication approval. Vercel Authentication is not configured by this phase, so do not treat a local or future preview URL as access-controlled until that deployment work is complete.

## Approve public content

Only the Terra Nexus owner may make a record public. A public record requires all of the following:

```yaml
status: stable
publication:
  audience: public
  state: approved
  approved_by: human:terra-nexus-owner
  approved_at: 2026-08-01T12:00:00Z
```

Case studies and qualifications also require `confidentiality: anonymized` or `confidentiality: public`. An agent may never self-approve publication, name a client without permission, claim an outcome, claim standards experience, or approve Carbon & Ecosystem Services offering descriptions.

## Check your work

These commands have different jobs:

```powershell
npm run content:validate  # Compiler validation only; does not refresh the inventory.
npm run check             # Complete non-mutating repository validation.
npm run content:finalize  # Refresh inventory and tree, then run the complete check.
```

Use `content:finalize` after you add or edit a knowledge record. `check` runs the structural and domain validators, Python tests, inventory freshness check, skill-sync check, compiler validation, website tests, production build, and TypeScript check. `content:validate` is useful for a quick compiler-only check, but it is not the complete pre-pull-request validation.

See the overall safe counts without exposing confidential details:

```powershell
npm run content:status
npm run --silent content:status -- --json
```

See what a concept affects before you change it:

```powershell
npm run content:affected -- services/strategy-and-innovation
npm run content:affected -- case-studies/pilot-trading-review
```

The report shows forward and reverse links, future page families, route candidates, eligibility, and exclusion reasons. It does not print confidential titles, client names, descriptions, outcomes, or body text.

## What happens after a case study becomes public

The compiler will admit an approved, disclosure-safe record to the production graph and calculate its future case-study route and related service, expertise, and audience placements. Phase 2B intentionally does not build those page templates yet, so it will not create a public case-study page by itself. The next checkpoint is an owner-supplied internal pilot case study; reusable page templates follow that checkpoint.

## Withdraw or deprecate content

To remove a record from future production output, set its publication state to `blocked` (for a temporary withdrawal) or its status to `deprecated` (for retired material). Keep a reviewable reason in the record or pull request, then run `npm run content:finalize` and review the diff. The next build excludes it from routes and related-content data.

## Never publish these files or details

- `knowledge/references/source-documents/originals/` and all original `.docx` files
- Approved source-document mirrors as if they were website marketing pages
- Proposal-only, confidential, or unconfirmed proof
- Client names, metrics, outcomes, standards experience, credentials, partnerships, or claims without owner approval
- Illustrative companies listed in audience files as Terra Nexus clients
- Carbon & Ecosystem Services offering descriptions without their individual owner approvals

## Ask an agent safely

Copy this request when you want help:

```text
Create a draft only. Keep publication internal and blocked, use these relationship IDs: [IDs], do not invent facts or claims, show any missing owner decisions, and run content validation before returning the change.
```

The agent should propose a governed draft, preserve the five independent content dimensions, and leave public approval to you.
