---
type: Decision Record
title: Public Website Build Eligibility
description: >
  Defines the conditions under which a knowledge bundle record may enter the
  public production website. No record may be published publicly without meeting
  every condition listed here.
tags:
- governance
- publication
- decision-record
- build-eligibility
status: stable
generated:
  by: github-copilot/claude-sonnet-4-6
  at: '2026-08-01T00:00:00Z'
verified:
  by: human:terra-nexus-owner
  at: '2026-08-01T00:00:00Z'
sources:
- id: confirmed-architecture
  resource: /references/decisions/confirmed-knowledge-architecture.md
  title: Confirmed Terra Nexus Knowledge Architecture
  author: human:terra-nexus-owner
---

# Public Website Build Eligibility

## Production Build Eligibility Criteria

A knowledge bundle record may enter the public production website only when
**all five** of the following conditions are true:

| # | Field | Required Value |
|---|---|---|
| 1 | `status` | `stable` |
| 2 | `publication.audience` | `public` |
| 3 | `publication.state` | `approved` |
| 4 | `publication.approved_by` | non-null (a named human approver) |
| 5 | `publication.approved_at` | non-null (a valid ISO 8601 UTC timestamp) |

If any condition is not met, the record must not enter the public production build.

## Proof Record Additional Requirement

Public proof records (case studies, qualifications, representative engagements)
must also satisfy:

| Field | Required Value |
|---|---|
| `confidentiality` | `anonymized` **or** `public` |

A proof record with `confidentiality: unconfirmed` or `confidentiality: confidential`
must never enter the public production build, regardless of publication state.

## Blocked Categories (Never Public Without Explicit Approval)

The following categories are hard-blocked from the public production build until
the conditions above are individually satisfied per record:

- Carbon & Ecosystem Services offering descriptions (7 records)
- All proof records (case studies, qualifications, representative engagements)
- All records with `publication.audience: internal`
- All records with `publication.audience: proposal-only`
- All records with `publication.state: blocked` or `preview`
- All records with `status: draft` or `deprecated`

## Internal and Proposal-Only Records

Records with `publication.audience: internal` or `publication.audience: proposal-only`
must never enter the public production build under any circumstances.

These records may be used:
- **internal:** for internal knowledge management and planning only
- **proposal-only:** in client proposals, pitch materials, or private preview builds that are not publicly indexed

## Preview Builds

Protected preview builds (e.g. staging environments accessible by link but not
publicly indexed by search engines) may include `status: draft` or
`publication.state: preview` content, subject to rules defined in Phase 2 when
the technical stack and deployment architecture are selected.

Preview content must not be:
- indexed by public search engines (`robots: noindex` or equivalent required)
- accessible without authentication or a secret URL
- treated as approved production content

## Enforcement

This rule must be enforced at build time. The build pipeline must:

1. Read every source record's `publication` block before rendering.
2. Reject any record that does not satisfy all five production criteria.
3. Reject any proof record that does not also satisfy the `confidentiality` criterion.
4. Log rejected records for review rather than silently excluding them.

The Terra Nexus domain validator (`scripts/tnx_validate.py`) enforces
pre-publication field validity. Build-time enforcement is a Phase 2 deliverable
pending framework selection.

## Approval Authority

Only `human:terra-nexus-owner` (GitHub: @JoshRtP) may set:
- `publication.audience: public`
- `publication.state: approved`
- `publication.approved_by`
- `publication.approved_at`

No agent, developer, or contributor may self-approve publication.
