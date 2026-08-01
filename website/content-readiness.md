---
type: Content Dashboard
title: Website Content Readiness Dashboard
description: >
  Per-page readiness status for every proposed Terra Nexus website page or
  content family. Updated as Phase 1A deliverables are completed.
  Last updated: 2026-08-01 (Phase 1A completion).
tags:
- website
- content-readiness
- dashboard
- phase-1a
status: draft
generated:
  by: github-copilot/claude-sonnet-4-6
  at: '2026-08-01T00:00:00Z'
sources:
- id: confirmed-architecture
  resource: /references/decisions/confirmed-knowledge-architecture.md
  title: Confirmed Terra Nexus Knowledge Architecture
  author: human:terra-nexus-owner
- id: open-issues
  resource: /website/open-issues-and-required-inputs.md
  title: Open Issues and Required Inputs
  author: human:terra-nexus-owner
---

# Website Content Readiness Dashboard

## Readiness Categories

| Code | Meaning |
|---|---|
| **RAB** | Ready for Approved Brief — source coverage exists; ready for owner to review and approve brief |
| **RDC** | Ready for Draft Copy — brief approved; can proceed to copy development |
| **NOI** | Needs Owner Input — cannot proceed without specific owner-provided information |
| **NP** | Needs Proof — source content is ready but proof module required before publication |
| **NER** | Needs External Research — market context, regulatory facts, or program details require current research |
| **NLR** | Needs Legal or Claims Review — contains claims that require legal or compliance review |
| **BLK** | Blocked — depends on an unresolved owner decision |
| **NYP** | Not Yet Prioritized — within scope but not yet scheduled |

## Readiness Score

0 = nothing exists; 10 = production-ready and approved. Score components:
- Source coverage (0–3)
- Draft brief complete (0–2)
- Proof available (0–2)
- External research done (0–1)
- Owner approved (0–2)

---

## Homepage

| Field | Value |
|---|---|
| Owner | terra-nexus-owner |
| Purpose | First contact; communicate identity, scope, and CTA |
| Primary Audience | All segments |
| Source Coverage | `brand/brand-platform.md`, `brand/messaging-options.md` — stable |
| Content Status | **BLK** — narrative selection (D-1) required |
| Proof Status | **NP** — no approved proof exists |
| Research Status | Not required for brand section |
| Brand Decision Dependency | **Yes** — D-1 (narrative), D-2 (tagline) |
| Legal / Claims Dependency | Yes — sustainability claims on homepage require review |
| Readiness Score | 3 / 10 |
| Next Action | Owner selects narrative (D-1) and tagline (D-2) |
| Blocking Decision | D-1, D-2 |

---

## Areas of Expertise

### Index Page

| Field | Value |
|---|---|
| Source Coverage | `expertise/index.md` — topic names stable |
| Content Status | **NOI** — introductory copy not drafted |
| Proof Status | **NP** |
| Readiness Score | 3 / 10 |
| Next Action | Approve index copy after topic briefs are reviewed |
| Blocking Decision | None — can draft once owner reviews topic priority |

### Regenerative Agriculture

| Field | Value |
|---|---|
| Source Coverage | Stable (name + classification + draft brief) |
| Content Status | **RAB** — draft brief complete; ready for owner review |
| Proof Status | **NP** — no proof exists |
| Research Status | **NER** — market context, SBTi FLAG, VCM methodologies |
| Brand Decision Dependency | No |
| Readiness Score | 5 / 10 |
| Next Action | Owner reviews and approves brief; commission external research |
| Blocking Decision | None (brief); proof required before Phase 4 |

### Sustainable Supply Chains

| Field | Value |
|---|---|
| Source Coverage | Stable (draft brief complete) |
| Content Status | **RAB** |
| Proof Status | **NP** |
| Research Status | **NER** — CSRD, Scope 3 Cat 1, EUDR |
| Readiness Score | 5 / 10 |
| Next Action | Owner reviews brief; commission external research |
| Blocking Decision | None |

### Food Waste (Prevention, Diversion, Recovery)

| Field | Value |
|---|---|
| Source Coverage | Stable (draft brief complete) |
| Content Status | **RAB** |
| Proof Status | **NP** |
| Research Status | **NER** — EPA programs, EU food waste targets, GRI 306 |
| Readiness Score | 5 / 10 |
| Next Action | Owner reviews brief |
| Blocking Decision | None |

### Low Carbon Energy & Biofuels

| Field | Value |
|---|---|
| Source Coverage | Stable (draft brief complete) |
| Content Status | **RAB** |
| Proof Status | **NP** |
| Research Status | **NER — HIGH PRIORITY** — 45Z, LCFS, RED III actively evolving |
| Readiness Score | 5 / 10 |
| Next Action | Owner reviews brief; prioritize external research for regulatory programs |
| Blocking Decision | None |

### Regenerative Rangeland

| Field | Value |
|---|---|
| Source Coverage | Stable (draft brief complete) |
| Content Status | **RAB** |
| Proof Status | **NP** |
| Research Status | **NER** |
| Readiness Score | 5 / 10 |
| Next Action | Owner reviews brief |
| Blocking Decision | None |

### Agroforestry

| Field | Value |
|---|---|
| Source Coverage | Stable (draft brief complete) |
| Content Status | **RAB** |
| Proof Status | **NP** |
| Research Status | **NER** — EUDR, agroforestry carbon methodologies |
| Readiness Score | 5 / 10 |
| Next Action | Owner reviews brief |
| Blocking Decision | None |

### Aquaculture

| Field | Value |
|---|---|
| Source Coverage | Stable (draft brief complete) |
| Content Status | **RAB** |
| Proof Status | **NP** |
| Research Status | **NER** |
| Readiness Score | 5 / 10 |
| Next Action | Owner reviews brief |
| Blocking Decision | None |

### Biodiversity & Ecosystem Resilience

| Field | Value |
|---|---|
| Source Coverage | Stable (draft brief complete) |
| Content Status | **RAB** |
| Proof Status | **NP** |
| Research Status | **NER** — TNFD, CSRD ESRS E4 |
| Readiness Score | 5 / 10 |
| Next Action | Owner reviews brief |
| Blocking Decision | None |

### Purpose Driven Food Brands & Retailers

| Field | Value |
|---|---|
| Source Coverage | Stable (draft brief complete) |
| Content Status | **RAB** |
| Proof Status | **NP** |
| Research Status | **NER** — FTC Green Guides, EU Green Claims Directive |
| Readiness Score | 5 / 10 |
| Next Action | Owner reviews brief |
| Blocking Decision | None |

---

## What We Do (Service Families)

### Strategy & Innovation

| Field | Value |
|---|---|
| Source Coverage | Stable (normalized overview complete) |
| Content Status | **RAB** — ready for brief approval; service architecture audit pending owner review |
| Proof Status | **NP** |
| Research Status | Not required for overview |
| Readiness Score | 5 / 10 |
| Next Action | Owner reviews service architecture audit (D-9); approve overview |
| Blocking Decision | D-9 (wording decisions for sub-offerings) |

### Financial Investments & New Venture Development

| Field | Value |
|---|---|
| Source Coverage | Stable (normalized overview complete) |
| Content Status | **RAB** |
| Proof Status | **NP** |
| Readiness Score | 5 / 10 |
| Next Action | Owner reviews service architecture audit; approve overview |
| Blocking Decision | D-9 |

### Sustainable Supply Chain & Operations

| Field | Value |
|---|---|
| Source Coverage | Stable (normalized overview complete) |
| Content Status | **RAB** |
| Proof Status | **NP** |
| Readiness Score | 5 / 10 |
| Next Action | Owner reviews service architecture audit; approve overview |
| Blocking Decision | D-9 |

### Corporate Sustainability

| Field | Value |
|---|---|
| Source Coverage | Stable (normalized overview complete) |
| Content Status | **RAB** |
| Proof Status | **NP** |
| Readiness Score | 5 / 10 |
| Next Action | Owner reviews service architecture audit; approve overview |
| Blocking Decision | D-9 |

### Carbon & Ecosystem Services

| Field | Value |
|---|---|
| Source Coverage | All 7 offering names stable; draft descriptions complete (Phase 1A) |
| Content Status | **NOI** — draft descriptions require owner review before any publication |
| Proof Status | **NP** |
| Research Status | **NER — HIGH PRIORITY** — VCM standards, GHG Protocol, CSRD, SEC all time-sensitive |
| Brand Decision Dependency | No |
| Legal / Claims Dependency | Yes — environmental market claims require review |
| Readiness Score | 4 / 10 |
| Next Action | Owner reviews all 7 draft offering descriptions (D-3) |
| Blocking Decision | D-3 — must not publish without owner review |

---

## Who We Work With

All 11 audience pages share the same readiness profile:

| Field | Value |
|---|---|
| Source Coverage | Stable (definitions and illustrative examples — examples are NOT clients) |
| Content Status | **NOI** — page narrative connecting each audience to services/topics missing |
| Proof Status | **NP** |
| Research Status | Varies by audience (biofuels and environmental markets are time-sensitive) |
| Readiness Score | 3 / 10 |
| Next Action | Draft page narratives for each audience after service/topic briefs are approved |
| Blocking Decision | None — can draft after topic and service briefs approved |

**Individual audience readiness:**

| Audience | Research Sensitivity | Next Action |
|---|---|---|
| Inputs Companies | Low | Draft narrative after topic briefs approved |
| Agricultural Producers & Integrated Protein Companies | Medium (SBTi FLAG, livestock Scope 3) | Same + external research |
| Commodity Traders | High (EUDR, Scope 3 Cat 1, trading company programs) | Same + external research |
| Ingredient & Feed Processors | Medium | Same |
| Energy & Biofuels Refiners | **Very High** (45Z, LCFS, RED III) | External research priority |
| Food & Beverage Companies | Medium (CSRD, Scope 3, claims) | Same + claims review |
| Food Retail & Distribution | Medium | Same |
| Food Waste Prevention, Diversion & Recovery | Medium | Same |
| Environmental Markets & Ecosystem Services | **Very High** (VCM integrity, registry standards) | External research priority |
| Enabling Tech & Solution Providers | Medium | Same |
| Private Equity, Venture Capital & Impact Investors | Low-Medium | Same |

---

## Advise, Manage, Operate

| Field | Value |
|---|---|
| Source Coverage | Stable (`governance/advise-manage-operate.md`) |
| Content Status | **RAB** — source concept exists; page copy missing |
| Proof Status | Not required for definitional section |
| Readiness Score | 4 / 10 |
| Next Action | Draft page copy from approved concept file |
| Blocking Decision | None |

---

## Case Studies Section

| Field | Value |
|---|---|
| Source Coverage | Schema complete (Phase 1A); intake templates created |
| Content Status | **NOI** — no approved proof exists |
| Proof Status | **NP** — trading company intake template created; owner interview required |
| Readiness Score | 2 / 10 |
| Next Action | Owner completes trading company qualification intake |
| Blocking Decision | D-6 (disclosure level per engagement) |

---

## Insights Section

| Field | Value |
|---|---|
| Source Coverage | None |
| Content Status | **NYP** |
| Readiness Score | 0 / 10 |
| Next Action | Defer until Phase 5 |
| Blocking Decision | Technical stack (D-4) required before CMS/editorial workflow is defined |

---

## About Section

### Company Overview

| Field | Value |
|---|---|
| Source Coverage | Brand platform stable; narrative options exist |
| Content Status | **BLK** — narrative selection (D-1) required |
| Readiness Score | 3 / 10 |
| Blocking Decision | D-1 |

### Team / Leadership

| Field | Value |
|---|---|
| Source Coverage | Intake templates created (Phase 1A) |
| Content Status | **NOI** — no biography content provided |
| Readiness Score | 1 / 10 |
| Next Action | Owner completes biography intake |
| Blocking Decision | D-7 |

### Contact

| Field | Value |
|---|---|
| Source Coverage | None |
| Content Status | **NYP** |
| Readiness Score | 0 / 10 |
| Blocking Decision | D-4 (technical stack determines form/CRM choice) |

---

## System-Level Items

| Item | Status | Readiness | Next Action |
|---|---|---|---|
| Design system | Missing — input inventory exists (Phase 0) | **BLK** | Owner provides brand asset package or commissions designer (D-5) |
| Technical stack | Three approaches documented | **BLK** | Owner selects stack (D-4) before Phase 2 |
| SEO baseline | terra.nexus exists; audit deferred | **NYP** | Phase 6 — URL and content inventory |
| Analytics migration | terra.nexus exists; audit deferred | **NYP** | Phase 6 |
| Redirect map | terra.nexus exists; audit deferred | **NYP** | Phase 6 |

---

## Phase 1A Summary

| Category | Files Requiring Owner Review | Blocking Decisions Resolved | Unresolved |
|---|---|---|---|
| Brand | 2 (narrative worksheet, tagline comparison) | None — deferred to Phase 4 | D-1, D-2 |
| Carbon & Ecosystem Services | 7 offering draft descriptions | D-3 unblocked for drafting | D-3 owner review required before publication |
| Service families | 5 normalized overviews | None | D-9 wording decisions |
| Service architecture | 1 audit with ~15 items | None | D-9 owner decisions |
| Expertise topics | 9 draft briefs | None | Proof and research required for all |
| Proof system | Schema + 2 intake templates + trading intake | D-6 internal structuring proceeds | D-6 disclosure per engagement |
| Content readiness | This dashboard | N/A | N/A |
