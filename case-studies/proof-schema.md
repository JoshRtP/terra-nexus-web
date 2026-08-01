---
type: Content Schema
title: Proof and Qualifications System Schema
description: >
  OKF-conformant schema and field definitions for all proof record types:
  case studies, representative engagements, qualifications, standards and
  methodology experience, commodity experience, geographic experience,
  tools and data capabilities, and partner and provider experience.
  All new records default to status: draft, publication_status: internal,
  confidentiality: confidential-or-unconfirmed.
tags:
- proof
- qualifications
- case-study
- schema
- phase-1a
status: stable
generated:
  by: github-copilot/claude-sonnet-4-6
  at: '2026-08-01T00:00:00Z'
sources:
- id: confirmed-architecture
  resource: /references/decisions/confirmed-knowledge-architecture.md
  title: Confirmed Terra Nexus Knowledge Architecture
  author: human:terra-nexus-owner
---

# Proof and Qualifications System Schema

> All new proof records must default to:
> - `status: draft`
> - `publication_status: internal`
> - `confidentiality: confidential-or-unconfirmed`
>
> Do not change `publication_status` to `public` or `proposal-only` without
> explicit owner approval. Do not name clients, outcomes, or metrics without
> explicit approval.

---

## Proof Record Types

| Type | Purpose |
|---|---|
| `Case Study` | Full narrative of a client engagement, including context, work, and outcome |
| `Qualification Module` | Short-form reusable proof unit for service pages, proposals, and bios |
| `Representative Engagement` | Anonymized or paraphrased description of engagement types |
| `Standards & Methodology Experience` | Documented experience with a standard, methodology, or framework |
| `Commodity Experience` | Documented experience with a specific commodity or crop system |
| `Geographic Experience` | Documented experience in a specific geography |
| `Tools & Data Capability` | Documented experience with a specific tool or data platform |
| `Partner & Provider Experience` | Documented relationship type with a specific organization |

---

## Core OKF Frontmatter Schema

All proof records share these base fields:

```yaml
type: <Proof Record Type — use one of the types above>
title: <descriptive title — do not include client name unless publication_status: public>
description: <one-sentence summary>
tags:
- proof
- <slug for type: case-study | qualification | engagement | standards | commodity | geography | tools | partner>
status: draft                              # always draft until owner approves
generated:
  by: <agent or author>
  at: <ISO 8601 timestamp>
sources:
- id: <source id>
  resource: <file path or URL>
  title: <source title>
  author: <author>

# Proof-specific fields
service_family:
- <one or more of the five service family slugs>
service_offering:
- <offering name>
area_of_expertise:
- <expertise topic slug>
audience:
- <audience segment slug>
engagement_model: <advise | manage | operate | combination>
commodity:
- <commodity name>
certification: []
registry: []
standard: []
methodology: []
regulatory_program: []
geography: []
client_type: <type of organization — do not name the client>
challenge: <the decision or problem the client faced>
work_performed: <description of the work Terra Nexus performed>
deliverables: []
tools_and_data: []
outcome: <approved, substantiated outcome — do not overstate>
confidentiality: confidential-or-unconfirmed   # default
publication_permission:
  public: false
  proposal_only: false
  internal_only: true
attribution_required: false
approval_status: needs-owner-review
```

---

## Confidentiality Levels

| Level | Meaning | Website Use |
|---|---|---|
| `public` | Can be named and described on the public website | Full case study or qualification module |
| `anonymized` | Can be described without naming the client | Anonymized case study or paraphrased qualification |
| `proposal-only` | Can appear in client proposals but not on public website | Internal proof module |
| `internal-only` | For internal use only; not for proposals | Knowledge management only |
| `confidential-or-unconfirmed` | Default; disclosure level not yet confirmed | Do not use anywhere until owner confirms |

---

## Publication Permissions

```yaml
publication_permission:
  public: false          # true = can appear on public website
  proposal_only: false   # true = can appear in client proposals only
  internal_only: true    # true = internal knowledge use only
```

---

## Standards & Methodology Experience Schema

Additional fields for standards and methodology experience records:

```yaml
standard_name: <full name>
issuing_body: <organization name>
standard_type: <certification | registry | accounting | disclosure | regulatory | market-program>
experience_type: <evaluated | advised | implemented | verified | reported-under | currently-tracking>
attribution_required: <true | false>
relationship_type: <advisory | direct-implementation | academic-familiarity | commercial-relationship>
publication_permission:
  public: false
  proposal_only: false
  internal_only: true
approval_status: needs-owner-review
```

**Experience types:**
- `evaluated` — Terra Nexus assessed or compared this standard for a client
- `advised` — Terra Nexus advised a client on applying this standard
- `implemented` — Terra Nexus directly helped implement a program under this standard
- `verified` — Terra Nexus supported or managed a verification process under this standard
- `reported-under` — Terra Nexus supported client disclosure under this framework
- `currently-tracking` — Terra Nexus monitors this standard for market intelligence purposes

---

## Tools & Data Capability Schema

Additional fields for tool and data platform records:

```yaml
tool_name: <full name>
tool_category: <MRV | remote-sensing | farm-data | traceability | LCA | supply-chain | sustainability-software | analytics | other>
relationship_type: <advisory | direct-integration | evaluated | demonstrated | partnership | no-formal-relationship>
experience_type: <used-with-client | evaluated-for-client | monitored-for-market-intelligence>
publication_permission:
  public: false
  proposal_only: false
  internal_only: true
attribution_required: false
approval_status: needs-owner-review
```

**Important:** Do not imply technology partnership, endorsement, or commercial relationship with any tool vendor unless explicitly confirmed.

---

## Partner & Provider Experience Schema

Additional fields for partner and provider records:

```yaml
partner_name: <organization name — do not include if publication_permission: public is false>
partner_type: <technology | verification | data | co-delivery | referral | marketplace | registry | standard-body>
relationship_type: <have-worked-with | evaluated | referred | co-delivered | no-formal-relationship>
experience_type: <selected-for-client | managed-for-client | reviewed-for-client | considered-for-client>
publication_permission:
  public: false
  proposal_only: false
  internal_only: true
attribution_required: false
approval_status: needs-owner-review
```

**Important:** Do not imply that any listed organization is a current, ongoing, or commercial partner of Terra Nexus unless explicitly confirmed and approved.

---

## Reuse Rule

A single engagement may produce multiple qualification modules when it covers
distinct decisions, service lines, commodities, or standards. Each module must
still indicate it derives from the same engagement when relevant.

## File Naming Convention

```
case-studies/<slug>-<year>.md
case-studies/standards/<standard-slug>.md
case-studies/commodities/<commodity-slug>.md
case-studies/geographies/<geography-slug>.md
case-studies/tools/<tool-slug>.md
case-studies/partners/<partner-slug>.md
```
