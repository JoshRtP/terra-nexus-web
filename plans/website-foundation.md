---
type: Execution Plan
title: Website Foundation ExecPlan
description: >
  Self-contained living plan for the Terra Nexus website foundation. Covers
  repository state, knowledge readiness, information architecture, content-to-
  component model, content completion workstream, technical architecture,
  design-system requirements, phased implementation milestones, and a decision
  log. Intended for review and approval before any production page, final copy,
  or framework installation begins.
tags:
- website
- execplan
- phase-0
- foundation
status: draft
generated:
  by: github-copilot/claude-sonnet-4-6
  at: '2026-08-01T00:00:00Z'
sources:
- id: confirmed-architecture
  resource: /references/decisions/confirmed-knowledge-architecture.md
  title: Confirmed Terra Nexus Knowledge Architecture
  author: human:terra-nexus-owner
- id: service-architecture
  resource: /references/source-documents/service-architecture.md
  title: Terra Nexus Service Architecture
  author: human:terra-nexus-owner
- id: topics-value-chains
  resource: /references/source-documents/topics-and-value-chains.md
  title: Terra Nexus Topics and Value Chains
  author: human:terra-nexus-owner
- id: core-branding
  resource: /references/source-documents/core-messaging-and-branding.md
  title: Terra Nexus Core Messaging and Branding
  author: human:terra-nexus-owner
- id: open-issues
  resource: /website/open-issues-and-required-inputs.md
  title: Open Issues and Required Inputs
  author: human:terra-nexus-owner
---

# Website Foundation ExecPlan

> **Status: draft — Phase 2A technical decision approved pending PR merge;
> Phase 2B is next.**
>
> This plan is a structured proposal, not a build directive. Agent-generated
> interpretations are labeled [agent-draft] throughout. Source-derived content
> cites its governing concept or source document.

---

## 1. Purpose and Intended Outcome

When the website foundation is complete, Terra Nexus will have:

1. A fully validated OKF knowledge bundle with no structural errors.
2. An approved information architecture (site map, page types, navigation).
3. Approved completion for every content area required before page production can begin.
4. A chosen and initialized technical stack.
5. An approved design system (typography, color, spacing, components, accessibility rules).
6. Reusable page templates and component definitions for all primary page types.
7. A minimum of one fully drafted, reviewed, and approved page in each primary category (topic, service, audience, about).

**Verification criteria for "foundation complete":**

- `python scripts/validate_okf.py knowledge` exits with code 0 and no errors.
- All service family overview pages have status `approved` or `stable`.
- All expertise topic pages have status `approved` or `stable`.
- All audience pages have status `approved` or `stable`.
- All Carbon & Ecosystem Services offering pages have explicit owner sign-off.
- The selected brand narrative option is recorded as a decision in `references/decisions/`.
- Technical stack choice is recorded as a decision in `references/decisions/`.
- Design system tokens and component definitions exist and pass accessibility baseline.

---

## 2. Current Repository State

### 2a. What This Repository Is

This is a **pure knowledge repository** — an OKF v0.2 bundle. There is no application code, no web framework, no package manifests, no deployment configuration, and no CMS integration. The repository contains only:

| Category | Files / Notes |
|---|---|
| OKF knowledge files | ~100 Markdown files across `services/`, `expertise/`, `audiences/`, `brand/`, `governance/`, `website/`, `case-studies/`, `references/`, `codex/` |
| Python tooling | `okf_cli.py`, `validate_okf.py`, `tnx_validate.py`, inventory/skill scripts, `pyproject.toml`, and Python tests |
| Python dependency | `requirements.txt` — `PyYAML>=6.0` only |
| Agent configuration | `AGENTS.md` (root), `.github/skills/terra-nexus-content/SKILL.md`, `.agents/skills/terra-nexus-content/SKILL.md` |
| Reference originals | `references/source-documents/originals/` — three `.docx` source files |
| Reference images | `references/images/` — two `.png` value-chain diagrams |
| Version control and checks | Git remote `JoshRtP/Webservices`; `.github/workflows/knowledge-checks.yml` runs repository checks on `main` pushes and pull requests |

### 2b. Missing Infrastructure

The following categories have **zero existing files**:

| Missing Category | Detail |
|---|---|
| Web framework | No Next.js, Astro, Vite, React, Vue, Svelte, or any other framework |
| Node package manifests | No `package.json`, `pnpm-workspace.yaml`, or equivalent web-application manifest |
| Application code | No `.js`, `.ts`, `.jsx`, `.tsx`, `.css`, `.scss`, `.html` files |
| Design system | No color tokens, type scales, component specs, or accessibility baseline |
| CMS configuration | No Sanity, Contentful, or similar schema |
| Website deployment config | No `vercel.json`, `netlify.toml`, Dockerfile, or equivalent website deployment configuration |
| Website testing config | No website unit, integration, end-to-end, accessibility, or performance test setup (knowledge-validator tests do exist) |
| Analytics / SEO | No sitemap, robots.txt, analytics integration, or tag manager config |

---

## 3. Knowledge Readiness Audit

### Legend

| Status | Meaning |
|---|---|
| **Stable** | Approved by source document or human decision; safe to use in production |
| **Source-derived** | In the repository, backed by source documents, but requires normalization or expansion |
| **Draft** | Agent-generated; requires owner review before publication |
| **Missing** | Not yet in the repository; requires owner input |
| **Time-sensitive** | Depends on external regulations, programs, or market facts that require current authoritative research |
| **Blocked** | Cannot proceed without explicit owner approval |

### 3a. Brand Platform

| Concept | Status | Notes |
|---|---|---|
| Purpose statement | Stable | "To develop a more resilient, sustainable, & prosperous food system" |
| Mission statement | Stable | Defined in `brand/brand-platform.md` |
| Positioning statement | Stable | "An innovation & insights studio with a proven commercial track record…" |
| Tagline options (4) | Stable | All four options documented in `brand/taglines.md`; no selection made |
| Homepage narrative options (5) | Stable | All options documented in `brand/messaging-options.md`; **no single option approved as final** |
| Brand usage rules | Draft | `brand/brand-usage-rules.md` status is `draft`; requires owner review |

**Conflict to surface:** Five distinct narrative forms exist in the approved source document. None is identified as the exclusive homepage hero. An owner decision is required before homepage copy can be written. See [Decision D-1](#d-1-homepage-narrative-selection).

### 3b. Homepage Narrative

| Element | Status | Notes |
|---|---|---|
| Hero headline | Blocked | Depends on narrative selection decision |
| Supporting copy | Blocked | Depends on narrative selection decision |
| Primary call to action | Blocked | Depends on narrative and strategy |
| Value proposition structure | Draft | Can be derived from approved purpose/mission/positioning once narrative selected |

### 3c. Five Service Families

| Service Family | Family Name Status | Offering Names Status | Offering Descriptions Status |
|---|---|---|---|
| Strategy & Innovation | Stable | Stable (6 offerings) | Stable (source-derived; may need food-and-climate framing audit) |
| Financial Investments & New Venture Development | Stable | Stable (4 offerings) | Stable (source-derived; may need food-and-climate framing audit) |
| Sustainable Supply Chain & Operations | Stable | Stable (7 offerings) | Stable (source-derived; may need food-and-climate framing audit) |
| Corporate Sustainability | Stable | Stable (5 offerings) | Stable (source-derived; may need food-and-climate framing audit) |
| Carbon & Ecosystem Services | Stable | Stable (7 offering names) | **Blocked — descriptions not approved in source document** |

**Note on Corporate Sustainability:** The source document intentionally includes supply-chain and product capabilities that also appear in other service families. This is by design (different decision owners). Do not deduplicate.

**Note on Strategy & Innovation / Sustainability & Climate Change Strategy (offering 6):** The source document lists this offering but provides no sub-items. This is a gap to address in the service architecture audit.

### 3d. All Service Offerings — Completeness Snapshot

Thirty-six named offerings exist across four service families (Carbon & Ecosystem Services listed separately). All have OKF files with source-derived descriptions. All require food-and-climate framing review before publication (see Section 6b).

### 3e. Areas of Expertise

| Topic | OKF File Status | Narrative Status | Required Expansion |
|---|---|---|---|
| Regenerative Agriculture | Stable (name + classification) | Missing | Market context, proof, regulatory/program facts, CTA |
| Regenerative Rangeland | Stable (name + classification) | Missing | Same as above |
| Agroforestry | Stable (name + classification) | Missing | Same |
| Aquaculture | Stable (name + classification) | Missing | Same |
| Biodiversity & Ecosystem Resilience | Stable (name + classification) | Missing | Same |
| Sustainable Supply Chains | Stable (name + classification) | Missing | Same |
| Low Carbon Energy & Biofuels | Stable (name + classification) | Missing | Same |
| Purpose Driven Food Brands & Retailers | Stable (name + classification) | Missing | Same |
| Food Waste (Prevention, Diversion, Recovery) | Stable (name + classification) | Missing | Same |

All nine topic page narratives are **missing**. Each requires owner-provided or owner-approved market context and calls to action before publication.

### 3f. Audience / Value-Chain Pages

| Audience | OKF File Status | Page Narrative Status |
|---|---|---|
| Inputs Companies | Stable (definition + examples) | Missing |
| Agricultural Producers & Integrated Protein Companies | Stable | Missing |
| Commodity Traders | Stable | Missing |
| Ingredient & Feed Processors | Stable | Missing |
| Energy & Biofuels Refiners | Stable | Missing |
| Food & Beverage Companies | Stable | Missing |
| Food Retail & Distribution | Stable | Missing |
| Food Waste Prevention, Diversion & Recovery | Stable | Missing |
| Environmental Markets & Ecosystem Services | Stable | Missing |
| Enabling Tech & Solution Providers | Stable | Missing |
| Private Equity, Venture Capital & Impact Investors | Stable | Missing |

All 11 audience page narratives are **missing**. Audience definitions and illustrative examples exist and are stable; however, page copy connecting each audience to relevant topics, services, and proof must be drafted and approved.

**Reminder:** All listed example companies are illustrative and must not be presented as Terra Nexus clients.

### 3g. Advise, Manage, and Operate

| Element | Status |
|---|---|
| Three-line definition | Stable (`governance/advise-manage-operate.md`) |
| Web page copy | Missing |
| Per-service engagement model mapping | Missing |

### 3h. Case Studies and Qualifications

| Element | Status |
|---|---|
| Tagging schema | Draft |
| Qualification module template | Draft |
| Any actual case study | Missing — no approved proof exists in the bundle |

**Blocking issue:** No approved case-study or qualification content exists. The team must supply this input before any proof modules can appear on the website.

### 3i. Team Biographies and Credentials

| Element | Status |
|---|---|
| Biography input template | Missing |
| Qualification input template | Missing |
| Any actual biography or credential | Missing |

### 3j. Digital Tools, Data, and Delivery Enablers

| Element | Status |
|---|---|
| Tools and data capability disclosure | Missing |
| Partner ecosystem disclosure | Missing |

### 3k. Design System

| Element | Status |
|---|---|
| Visual identity | Missing |
| Typography | Missing |
| Color | Missing |
| Spacing | Missing |
| Layout grid | Missing |
| Component library | Missing |
| Iconography | Missing |
| Imagery direction | Missing |
| Accessibility baseline | Missing |

### 3l. Technical Requirements

| Element | Status |
|---|---|
| Framework selection | Missing |
| CMS decision | Missing |
| Hosting decision | Missing |
| Analytics | Missing |
| SEO requirements | Missing |
| Accessibility standard | Missing |
| Security requirements | Missing |

---

## 4. Proposed Website Information Architecture

> [agent-draft] — This site map is derived from approved sources and the draft `website/proposed-site-map.md`. It requires owner confirmation before implementation.

### Primary Navigation Structure

```
Homepage
├── Areas of Expertise          ← Topic-led market entry points
├── What We Do                  ← Five decision-owner service families
├── Who We Work With            ← Value-chain and enabling-market audience taxonomy
├── Case Studies                ← Reusable proof modules
├── Insights                    ← Topic-linked content
└── About                       ← Company, team, Advise/Manage/Operate
```

### Page Inventory

#### Homepage

| Attribute | Value |
|---|---|
| Page purpose | Communicate Terra Nexus's identity, scope, and call to action |
| Primary audience | All — first contact for any visitor segment |
| Primary CTA | Enter by topic (Areas of Expertise) or by role (Who We Work With) |
| Source concepts | `brand/brand-platform.md`, `brand/messaging-options.md`, `brand/taglines.md` |
| Related services | All five families |
| Related expertise | All nine topics |
| Related audiences | All eleven segments |
| Proof required | At least one qualification module or positioning statement |
| Readiness status | **Blocked — narrative selection required** |

---

#### Areas of Expertise — Index

| Attribute | Value |
|---|---|
| Page purpose | Entry point to all nine topic areas; establish market relevance |
| Primary audience | All segments exploring Terra Nexus's scope |
| Primary CTA | Explore a topic; contact Terra Nexus |
| Source concepts | `expertise/index.md`, `references/source-documents/topics-and-value-chains.md` |
| Readiness status | Missing — index copy not drafted |

#### Areas of Expertise — Individual Topic Pages (×9)

All nine follow the template in `website/page-templates/topic-page.md`. Summary by topic:

| Page | Required Content | Readiness |
|---|---|---|
| Regenerative Agriculture | Market context, value-chain connections, service mapping, proof, CTA | Missing |
| Regenerative Rangeland | Same | Missing |
| Agroforestry | Same | Missing |
| Aquaculture | Same | Missing |
| Biodiversity & Ecosystem Resilience | Same | Missing |
| Sustainable Supply Chains | Same | Missing |
| Low Carbon Energy & Biofuels | Same + current fuel-program/policy facts | Missing + Time-sensitive |
| Purpose Driven Food Brands & Retailers | Same | Missing |
| Food Waste (Prevention, Diversion, Recovery) | Same + current food-waste regulation facts | Missing + Time-sensitive |

---

#### What We Do — Service Family Pages (×5)

All follow the template in `website/page-templates/service-page.md`.

| Page | Primary Decision Owners | Scope Boundary | Readiness |
|---|---|---|---|
| Strategy & Innovation | P&L owners, BU leaders, corporate strategy, innovation, commercial | Food-and-climate growth, innovation, product, customer, market | Source-derived; needs food-and-climate framing audit |
| Financial Investments & New Venture Development | Finance, corporate venture, corporate development, strategy, PE/VC/impact investors | Capital allocation, venture development, diligence for food/ag/climate/nature | Source-derived; needs audit |
| Sustainable Supply Chain & Operations | Procurement, sourcing, supply chain, operations, category, logistics | Operational and upstream supply-chain improvements | Source-derived; needs audit |
| Corporate Sustainability | CSOs, ESG, climate, compliance, reporting, disclosure | Enterprise sustainability, Scope 1/2/3, accounting, reporting, governance | Source-derived; needs audit |
| Carbon & Ecosystem Services | Environmental markets, carbon desks, trade desks, P&L, program, portfolio | Environmental asset and claims markets, program ops, verification, valuation | **Blocked — offering descriptions not approved** |

#### What We Do — Service Offering Detail Pages

Each service family links to its offering detail pages. The Carbon & Ecosystem Services offerings (7) must carry a `do-not-publish-without-review` status until owner approval.

---

#### Who We Work With — Category Pages (×2) + Segment Pages (×11)

| Page | Purpose | Readiness |
|---|---|---|
| Food & Agribusiness Value Chain (index) | Overview of the eight value-chain groups | Missing |
| Enabling Markets, Technology & Capital (index) | Overview of the three enabling-market groups | Missing |
| Inputs Companies | Segment overview + relevant topics + services + CTA | Missing |
| Agricultural Producers & Integrated Protein Companies | Same | Missing |
| Commodity Traders | Same | Missing |
| Ingredient & Feed Processors | Same | Missing |
| Energy & Biofuels Refiners | Same + current biofuel policy context | Missing + Time-sensitive |
| Food & Beverage Companies | Same | Missing |
| Food Retail & Distribution | Same | Missing |
| Food Waste Prevention, Diversion & Recovery | Same | Missing |
| Environmental Markets & Ecosystem Services | Same + current VCM/registry context | Missing + Time-sensitive |
| Enabling Tech & Solution Providers | Same | Missing |
| Private Equity, Venture Capital & Impact Investors | Same | Missing |

---

#### Advise, Manage, Operate — Section Page

| Attribute | Value |
|---|---|
| Page purpose | Explain how Terra Nexus engages; distinguish from service taxonomy |
| Source concepts | `governance/advise-manage-operate.md`, `brand/brand-usage-rules.md` |
| Readiness status | Source-derived concept exists; page copy missing |

---

#### Case Studies — Index + Individual Modules

| Page | Readiness |
|---|---|
| Case Studies index | Missing — no approved proof exists |
| Individual case study modules | Missing — all require owner input |

---

#### Insights — Index + Articles

| Page | Readiness |
|---|---|
| Insights index | Missing |
| Individual articles | Missing |

---

#### About

| Page | Readiness |
|---|---|
| About (company overview) | Missing — narrative selection and brand voice approval needed |
| Team / Leadership | Missing — bios and credentials not in repository |
| Advise, Manage, Operate | Source-derived concept; page copy missing |
| Contact | Missing — form/CRM requirements not defined |

---

## 5. Content-to-Component Model

> [agent-draft] — This model is derived from the OKF architecture and must be confirmed before component development.

### 5a. OKF-to-Website Data Mapping

| OKF Concept Type | Stays in OKF Markdown | Moves to App Data / CMS | Notes |
|---|---|---|---|
| Service Family (`type: Service Family`) | Yes — stable definition, decision owners, scope boundary | CMS record when content team needs editing without dev | Frontmatter drives page metadata |
| Service Offering (`type: Service Offering`) | Yes | CMS record if volume warrants | 36 offerings across 4 families |
| Expertise Topic (`type: Expertise Topic`) | Yes | CMS record for narrative sections | Market context sections require frequent update |
| Audience Segment (`type: Audience Segment`) | Yes | CMS record | |
| Case Study / Qualification (`type: Case Study`) | Template + schema in OKF | CMS or structured JSON for filtering | Must support multi-dimensional tagging |
| Brand Platform elements | Yes — source of truth | Read-only in CMS or config | Never override approved values |
| Insight / Article | OKF for internal drafts | CMS for published articles | Requires editorial workflow |

### 5b. Proposed Component Types

| Component | Maps From | Required Metadata |
|---|---|---|
| `ServiceFamilyCard` | Service Family OKF file | title, decision_owners, core_question, scope_boundary, offering count |
| `ServiceOfferingList` | Service Offering files per family | offering_number, title, description, sub-offerings |
| `ExpertiseTopicCard` | Expertise Topic file | title, category (cultivated/moved/transformed/circular), related_services, related_audiences |
| `AudienceCard` | Audience Segment file | title, description, value_chain_group, related_topics, related_services |
| `QualificationModule` | Case Study / Qualification file | service_line, topic, audience, engagement_model, commodity, standard, geography, deliverables, outcome, confidentiality |
| `AdviseManagedOperateBlock` | `governance/advise-manage-operate.md` | Three sections as discrete text blocks |
| `BrandNarrativeBlock` | Approved narrative (post-selection) | Selected narrative text, tagline |
| `CallToAction` | Per page | label, destination, context |
| `RelatedContent` | Cross-links (services ↔ topics ↔ audiences ↔ proof) | Type, title, slug, tags |
| `InsightCard` | Insight article | title, date, topic tags, service tags, audience tags |
| `StandardsReference` | External source with citation | standard name, issuing body, URL, applicable topics/services |
| `CommodityTag` | Inline metadata | commodity name, value chain position |
| `GeographyTag` | Inline metadata | geography name or region |

### 5c. Content That Must Remain in OKF Markdown (Do Not Move to CMS Without Approval)

- All approved source document mirrors (`references/source-documents/`)
- All decision records (`references/decisions/`)
- Governance rules (`governance/`)
- Agent instructions (`AGENTS.md`, `codex/`)
- Brand usage rules while `status: draft`

---

## 6. Content Completion Workstream

### 6a. Carbon & Ecosystem Services Offering Descriptions

**Status:** Blocked. Seven offering names are approved. Detailed descriptions were not built out in the source document.

The source provides one directional sentence: offerings "revolve around assessing opportunity and access; designing, implementing, verifying, monetizing, and managing programs; and correctly normalizing and accounting for GHG emissions across inventory, product, project, and additional disclosure systems."

**What can be derived from approved sources (without owner input):**

- The boundary question: "How are environmental assets, attributes, credits, insets, offsets, and claims created, accessed, valued, verified, accounted for, managed, and monetized?"
- The primary decision owners: environmental markets teams, carbon desks, trade desks, P&L owners, program owners, project developers, portfolio managers.
- The general operational direction for each offering at a structural level (e.g., VCM & Scope 3 Markets relates to market access; Full Service GHG Accounting relates to normalization).

**What requires owner input:**

- Specific description text for each of the seven offerings.
- The intended depth of public disclosure (which sub-capabilities to name publicly).
- Any confidentiality constraints on methodology or approach.

**What would require current external research (do not infer from training data):**

- Current state of voluntary carbon market (VCM) rules, registry standards, and buyer requirements.
- Current Scope 3 accounting guidance (GHG Protocol, SBTi, etc.) and disclosure program requirements.
- Current verification and claims standards (Verra VCS, Gold Standard, ACR, CAR, etc.).
- Current biogenic carbon and removals accounting methodologies.

**Proposed drafting approach (pending owner approval to proceed):**

1. Owner provides a one-paragraph directional description for each of the seven offerings.
2. Agent normalizes into OKF `type: Service Offering` format.
3. Owner reviews and approves each description before its canonical
   `publication` block is eligible for public output.
4. External regulatory and market facts are cited at time of drafting using current sources — not agent memory.

---

### 6b. Service Architecture Audit

> [agent-draft] — The matrix below identifies structural concerns from a reading of the approved source. It does not alter any approved source content. Items require owner decision before any edits are made to service files.

**Scope:** All service offerings in Strategy & Innovation, Financial Investments & New Venture Development, Sustainable Supply Chain & Operations, and Corporate Sustainability.

#### Proposed-Change Matrix

| Offering | Concern Type | Source Wording (summary) | Proposed Focus | Rationale | Approval Status |
|---|---|---|---|---|---|
| S&I: Corporate & Business Unit Strategy (1.0) | Food-and-climate boundary | "Establish the organization's overarching vision to achieve long-term objectives" — generic corporate strategy language | Add explicit food-and-climate scope qualifier | Source document boundary: "not generic strategy outside this intersection" | Needs owner decision |
| S&I: Vision and Mission Development (1.1) | Generic consulting language | "Define a winning aspiration by establishing clear, inspiring, and compelling purpose" | Qualify for food-and-climate context | Same as above | Needs owner decision |
| S&I: Sustainability & Climate Change Strategy (6) | Missing sub-offerings | No sub-items listed in source | Clarify whether sub-items exist or if this offering stands alone | Content gap | Needs owner input |
| FI: Financial Planning and Analysis (1.0) | Food-and-climate boundary | Describes generic financial planning and analysis | Clarify that this supports food-and-climate ventures and portfolio decisions | Scope boundary for this service family | Needs owner decision |
| CS: Sustainable Supply Chain & Operations (5.0) | Intentional overlap | Repeats capabilities from the SSC&O service family | Preserve overlap; explain different decision owner (CSO vs. operations/procurement) | Confirmed by decision record | No change needed — document the rationale |
| CS: Building Purpose Driven Products & Services (4) | Food-and-climate boundary unclear | Market entry, business model, customer discovery, new product development | Clarify this applies to sustainable/climate product launches for food/ag | Scope discipline | Needs owner decision |
| SSC&O: White Label Product Performance (2.2) | Wording clarity | "Improve white-label product integration and enhance market positioning across the value chain" | Review whether "white label" is the intended term or if a broader framing is needed | Terminology question | Needs owner decision |
| SSC&O: Smart Contracts & Blockchain for SCM (6.4) | Potential terminology currency | "Smart contracts and blockchain" — market language may have evolved | Review whether to update to broader "distributed ledger" or keep specific | Terminology currency | Needs owner decision |

**Offerings not flagged** have source-derived descriptions that are sufficiently specific to the food-and-climate context or are clear operational descriptions.

---

### 6c. Areas of Expertise — Topic Page Briefs

> [agent-draft] — Structure for each topic page. Narratives, market facts, and calls to action require owner input before drafting begins.

**Standard topic-page brief (applies to all nine topics):**

Each topic page must eventually provide:

1. **Market Context and Why Now** — Current forces creating urgency (requires current, cited external sources; do not infer from training data).
2. **Affected Value-Chain Participants** — Cross-linked from `audiences/`.
3. **Decisions Those Audiences Face** — Organized by client function.
4. **Relevant Terra Nexus Service Lines** — Cross-linked from `services/`.
5. **Example Engagements** — Only from approved case studies or qualifications; none currently exist.
6. **Standards, Regulations, Programs, and Market Mechanisms** — Only cited, current external sources.
7. **Proof and Case Studies** — Approved modules; none currently exist.
8. **Calls to Action** — Specific to the topic and audience.
9. **External Facts Requiring Research** — Identified per topic before drafting.

**Topic backlog (prioritization [agent-draft]):**

| Priority | Topic | Rationale |
|---|---|---|
| 1 | Regenerative Agriculture | Broadest audience reach; connects to most service families |
| 2 | Sustainable Supply Chains | Directly named expertise area; high service-family overlap |
| 3 | Food Waste (Prevention, Diversion, Recovery) | Named in audience taxonomy and value chain; multiple service touchpoints |
| 4 | Low Carbon Energy & Biofuels | Audience segment (Energy & Biofuels Refiners) exists; time-sensitive regulatory context |
| 5 | Carbon & Ecosystem Services-adjacent topics: Biodiversity & Ecosystem Resilience | Supports carbon services narrative |
| 6–9 | Remaining topics | Sequence to be confirmed by owner |

*Prioritization is [agent-draft] and requires owner validation.*

---

### 6d. Case Studies and Qualifications

**Current state:** No approved case-study content exists in the repository.

**Proposed reusable content schema (owner intake):**

All case studies and qualifications must be tagged with the following dimensions (see `case-studies/tagging-schema.md`):

| Dimension | Required | Options / Notes |
|---|---|---|
| Service line | Yes | One or more of the five families |
| Service offering | Yes | Specific offering name(s) |
| Expertise topic | Yes | One or more of the nine topics |
| Audience segment | Yes | One or more of the eleven segments |
| Engagement model | Yes | Advise / Manage / Operate |
| Commodity / value chain position | Yes | Crop, protein, ingredient, fuel, waste stream, ecosystem type |
| Standard / certification / methodology | If applicable | Name, issuing body, version |
| Geography | Yes | Country, region, or "global" |
| Deliverables | Yes | Concrete outputs |
| Tools and data | If applicable | Platform or data source names |
| Outcome | Yes | Approved result; do not overstate causality |
| Confidentiality level | Yes | Public / anonymized / internal only |
| Approval status | Yes | Draft / approved / retired |

**Owner intake template (additions to `case-studies/qualification-template.md`):**

> The existing `qualification-template.md` covers the required fields. An owner intake form should additionally capture:
>
> - May the client name be disclosed publicly? (Yes / No / With permission)
> - May specific outcomes or metrics be disclosed? (Yes / No / Ranges only)
> - Is this engagement completed or ongoing?
> - Is there a signed confidentiality or non-disclosure agreement?
> - Who is the internal approver for this module?

---

### 6e. Brand Decisions

**Open brand decisions before homepage production:**

| Decision | Options Available | What Is Blocked Until Decided |
|---|---|---|
| Homepage narrative | Why-to-What / What-to-Why / What-to-Why (Extended) / Combo-Hybrid / Combo-Hybrid (Extended) — all in `brand/messaging-options.md` | Hero copy, supporting copy, structure of homepage |
| Tagline | Four options in `brand/taglines.md` | Masthead, meta title, og:title |
| Brand usage rules finalization | `brand/brand-usage-rules.md` currently `status: draft` | Any page using brand voice guidance |

**Agent must not select among narrative options.** The owner must review and approve one option before homepage copy is written.

---

### 6f. Bios, Credentials, and Enablers

**Owner input templates (none currently exist; these are proposed structures):**

#### Leadership Biography Template [agent-draft]

```
Name:
Title:
Areas of focus (select from expertise topics and service families):
Background summary (approved text — max 150 words):
Standards and methodology experience:
Geographic experience:
Education and credentials (approved, verified):
Confidentiality constraints:
Approval status:
```

#### Team Qualifications Summary Template [agent-draft]

```
Role:
Relevant service lines:
Relevant expertise topics:
Representative engagement types (anonymized acceptable):
Standards and program experience (with issuing bodies):
Tools and platforms:
Geographic experience:
Approval status:
```

#### Digital Tools and Data Capabilities Template [agent-draft]

```
Tool / platform name:
Category (MRV / traceability / LCA / supply chain / financial / analytics / other):
Description of how Terra Nexus uses or integrates it:
Disclosure level (public / partner only / internal):
Approval status:
```

#### Partner Ecosystem Template [agent-draft]

```
Partner / provider name:
Relationship type (technology / verification / data / co-delivery / referral):
Disclosed publicly? (Yes / No):
Applicable service lines and topics:
Approval status:
```

---

## 7. Technical Architecture Assessment and Phase 2A Build Contract [agent-draft]

### 7a. What Currently Exists

- Python 3 tooling only (`okf_cli.py`, `validate_okf.py`, `PyYAML>=6.0`).
- No constraints already encoded that would restrict the web framework choice.
- All content is OKF Markdown with YAML frontmatter — this is compatible with any static site generator or Markdown-to-JSON pipeline.

### 7b. Missing Technical Decisions

| Category | Decision Needed |
|---|---|
| Web framework | Which framework will render the site? |
| Content management | Will content authors edit OKF files directly, or will a CMS layer be introduced? |
| Hosting | Where will the site be deployed? (Vercel, Netlify, AWS, Azure, etc.) |
| Analytics | GA4, Plausible, Fathom, or none? |
| CRM / Contact | HubSpot, Salesforce, or plain email for contact forms? |
| Forms | Serverless function, Netlify Forms, Formspree, or other? |
| SEO | Sitemap generation, canonical URL strategy, structured data (JSON-LD)? |
| Accessibility | WCAG 2.2 Level AA (approved in D-4) |
| Security | Content Security Policy, HTTPS-only, form spam protection? |
| Testing | Unit tests for components? Playwright E2E? Visual regression? |
| Deployment | Git-triggered CI/CD? Manual? Preview deployments? |
| Internationalization | English-only for launch? Multi-language planned? |

### 7c. Three Viable Technical Approaches [agent-draft]

#### Approach A: Astro + OKF Markdown Pipeline

- Astro reads OKF Markdown files with YAML frontmatter via Content Collections.
- `okf_cli.py` or a custom Node script generates a JSON index for cross-linking.
- Pages are statically generated (SSG) with zero JavaScript by default.
- Content authors edit Markdown files directly; no CMS required for initial launch.
- Optional: add a headless CMS (e.g., Decap CMS or TinaCMS) later for non-developer editing.

**Tradeoffs:**
- Pro: Closest match to existing OKF file structure; minimal data migration; easiest path from knowledge bundle to live site.
- Pro: Excellent build performance; near-zero JS output by default.
- Con: Content editing requires Git familiarity or a CMS adapter.
- Con: Astro is newer; smaller ecosystem than Next.js.

#### Approach B: Next.js + MDX + Content Collections

- Next.js App Router reads OKF Markdown via `next-mdx-remote` or `contentlayer`.
- Static generation via `generateStaticParams`.
- Strong React ecosystem for interactive filtering (case studies, expertise map).
- Optional CMS integration via Sanity or Contentful.

**Tradeoffs:**
- Pro: Largest ecosystem; most React talent available; strong Vercel integration.
- Pro: Easy to add interactive features (search, filtering, contact forms).
- Con: More complex configuration than Astro; larger default bundle.
- Con: Content authors still need CMS adapter or Git access.

#### Approach C: Headless CMS (Sanity or Contentful) + Any Framework

- OKF Markdown is migrated into a structured CMS.
- Framework (Next.js or Astro) fetches content at build or runtime via API.
- Non-developer content editing is possible immediately.

**Tradeoffs:**
- Pro: Best non-developer editing experience.
- Con: Requires migration of all OKF Markdown into CMS schemas — significant setup work.
- Con: Adds a SaaS dependency and recurring cost.
- Con: Separates the governed OKF bundle from the live content — two sources of truth risk.

### 7d. Recommended Approach [agent-draft]

**Approach A (Astro + OKF Markdown Pipeline)** is recommended for the initial foundation because it minimizes distance between the existing knowledge bundle and the production site, preserves the OKF as the single source of truth, and produces a fast, accessible static site by default.

Approach B (Next.js) is the stronger choice if the team has existing React expertise or anticipates significant interactive features at launch.

Approach C should be deferred until content volume and non-developer editing needs justify the migration cost.

*This recommendation is [agent-draft] and requires owner decision before any scaffolding begins.*

### 7e. Phase 2A decision context [agent-draft]

> **Proposal only.** This section selects no software and creates no framework,
> application, deployment configuration, or website copy. It is the proposed
> technical decision and build contract to be approved before implementation.

The contract uses the confirmed five-dimension architecture, the approved public
build-eligibility decision, the website relationship model, the proof schema,
and the canonical service, expertise, audience, engagement, and publication
registries. It preserves Service Lines, Areas of Expertise, Who We Work With,
Advise/Manage/Operate, and proof as independent many-to-many dimensions.

`knowledge/` is the governed source of truth. It is Markdown with YAML
frontmatter, presently validated by the repository's Python tooling. There is no
web application, Node package manifest, framework, or deployment configuration
in this repository. The recommendation below is therefore a future application
boundary, not a change to the knowledge source.

### 7f. Expanded comparison matrix [agent-draft]

The existing ExecPlan already named Astro, Next.js, and an immediate headless
CMS. This matrix develops those approaches without creating a new technology
list. A custom, framework-independent OKF compiler is required in either
framework; neither native Markdown feature is a substitute for the governed
publication and relationship rules.

| Criterion | Astro + OKF compiler | Next.js + OKF compiler | Immediate headless CMS benchmark |
|---|---|---|---|
| 1. Markdown/frontmatter | Build-time loaders directly suit Markdown/YAML. | Requires custom parsing; MDX is optional, not OKF. | Requires migration and a synchronization contract. |
| 2. Many-to-many model | Build a path-ID content graph and reverse indexes. | Same capability and same compiler requirement. | Possible, but duplicates relationships and approval states. |
| 3. Static generation | Static-first by default. | Strong static generation, more runtime choices to constrain. | Depends on renderer and CMS API. |
| 4. Draft previews | Host protection plus a preview graph. | Same. | Preview state must be reconciled across systems. |
| 5. Production filter | One compiler provides a hard build boundary. | One compiler provides the same boundary. | Must enforce in CMS queries and application code. |
| 6. Proposal isolation | Reject before the framework sees a record. | Same. | Role/query leakage is an extra risk. |
| 7. Case-study pages | Static routes only from eligible proof. | Same. | Feasible, but proof governance duplicates. |
| 8. Related content | Deterministic reverse indexes. | Same. | CMS references do not replace validation. |
| 9. SEO/metadata | Static metadata and sitemap integration. | Mature metadata conventions. | Renderer-dependent. |
| 10. Sitemap/canonical URLs | Public graph is the sole source. | Public graph is the sole source. | Requires an equally strict filtered query. |
| 11. Legacy redirects | Host rules generated from a reviewed map. | Native redirects plus host rules. | Still requires a reviewed map. |
| 12. Accessibility | Semantic server HTML; test all islands. | Fully capable; needs same discipline. | Unchanged by the CMS. |
| 13. Performance | Smallest default client runtime. | Good if kept static; easier to add unnecessary runtime. | Adds API and preview dependencies. |
| 14. Images | Built-in local/authorized-remote optimization. | Mature image tooling. | DAM benefits add a system of record. |
| 15. Forms/CRM | Small endpoint or approved service later. | More server patterns than launch needs. | Not a CMS advantage. |
| 16. Analytics/consent | Approved consent-aware client code only. | Same. | No material advantage. |
| 17. Testing | Compiler tests + Playwright, axe, Lighthouse. | Same stack. | Adds CMS integration/migration tests. |
| 18. Deployment complexity | Thin static deployment. | Static is possible; server features raise complexity. | Adds webhooks and CMS credentials. |
| 19. Maintenance | One source model and small runtime surface. | Larger framework surface for this launch. | Two systems and recurring operations. |
| 20. Git/agent editing | Direct reviewed PR workflow. | Same workflow with more app code. | Visual editing competes with Git governance. |
| 21. CMS compatibility | Add a controlled adapter later. | Same. | Immediate, but prematurely costly. |
| 22. Calculators/tools | Islands or separate applications. | Best if application scope dominates. | Does not solve tool architecture. |
| 23. App separation | Static site stays independent. | Possible, but an all-in-one app invites coupling. | Does not prevent coupling. |
| 24. Lock-in | Low; static output is portable. | Moderate if server/host features become central. | High; data and workflow are vendor-dependent. |
| 25. Cost/operations | Lowest initial operational surface. | Moderate. | Highest: subscription, migration, and operations. |

**Recommendation:** choose **Astro** for the initial public marketing site,
with TypeScript and static output as the normal mode. Astro's current Content
Loader API supports local Markdown/YAML content from anywhere on the filesystem
and custom build-time loaders, which fits a read-only OKF compiler. Its current
image tooling also supports optimized local and authorized remote images. Next.js
is the reconsideration choice only if an approved launch scope becomes primarily
authenticated, stateful, and application-like rather than content-led.

The owner-approved selections and preview boundaries are recorded in
[D-4 approved technical decision](#d-4-approved-technical-decision-agent-draft).

### 7g. Decisive technical recommendations [agent-draft]

| Decision | Recommendation | Tradeoff accepted | Reconsider when |
|---|---|---|---|
| Framework | **Astro**, at the supported version current when implementation starts. | Fewer integrated full-stack application conventions than Next.js. | Approved launch scope is dominated by stateful/authenticated tooling. |
| Hosting | **Vercel** for production and previews. | Preview review uses Vercel identity/shareable-link workflow. | Cloudflare is the established operational platform or SSO/Access controls are required. |
| Content ingestion | One read-only **OKF content compiler** called by an Astro build-time loader. | Bespoke compiler needs strong tests. | An approved CMS adapter can produce the identical validated graph. |
| Initial CMS | **Git and governed OKF Markdown; defer a headless CMS.** | Editors use reviewed Git changes initially. | Evidence shows non-technical editing is a sustained delivery bottleneck. |
| Preview security | Vercel Deployment Protection using **Vercel Authentication** on every non-production deployment; revocable shareable links only for external review. | Reviewers may use a Vercel account/access flow. | Owner requires external IdP, email OTP, or IP policies. |
| Proposal-only handling | A future separately authenticated proposal renderer/export process, outside `apps/web`. | Proposal rendering is deliberately deferred. | Owner approves its client-access, retention, and disclosure rules. |

Vercel is recommended because its Git integration produces preview deployments
for branch/PR changes and production deployments from the designated production
branch, with rollback through Git/redeploy. Standard Deployment Protection can
protect preview deployments with Vercel Authentication. Confirm current pricing
and plan limits at procurement; they are not a stable architectural fact.

### 7h. Content ingestion contract [agent-draft]

#### Source and output rules [agent-draft]

`knowledge/` remains the only governed source. The future application must read
it without editing, normalizing, or copying source records back to the bundle.
Any generated application data is reproducible from the committed `knowledge/`,
`schemas/`, and compiler version. Transient graphs and audit reports are
gitignored build artifacts; they are not new sources of truth.

#### Required compiler behavior [agent-draft]

At build time the compiler must:

1. Parse permitted Markdown records and their YAML frontmatter, retaining each
   source path and bundle-relative path ID.
2. Load the canonical allowed-value and relationship registries from `schemas/`.
3. Validate lifecycle/publication values, timestamps, proof confidentiality,
   duplicate slugs, and all relationship IDs before rendering a page.
4. Resolve forward and reverse links for services, expertise, audiences,
   engagement models, proof, and insights using path IDs only.
5. Assign canonical URLs from a centrally reviewed route map and reject a slug
   collision; never infer a relation from a display name or company example.
6. Select the production or preview graph before any route, card, sitemap,
   search index, RSS item, canonical URL, JSON-LD block, or related index exists.
7. Write a machine-readable audit that gives every excluded record a
   deterministic reason. Broken references, invalid metadata, invalid proof
   disclosure, or URL collisions fail the build after this audit is emitted.

The existing Python validators remain required knowledge-layer gates. The
compiler is an additional website build gate, never a replacement for them.

#### Production filter (non-negotiable) [agent-draft]

Include a record in the public production graph only when all conditions are
true:

```text
status == stable
publication.audience == public
publication.state == approved
publication.approved_by is non-null
publication.approved_at is a valid ISO 8601 UTC timestamp
```

For proof records, `confidentiality` must also be `anonymized` or `public`.
Every other record is rejected and logged. Rejected content must have no public
route, related-content card, page-count trace, metadata, search record,
structured data, feed entry, sitemap entry, canonical URL, or public asset.

#### Protected preview filter [agent-draft]

A protected preview is not a lenient production build. It contains all
production-eligible records plus only explicitly preview-state website
candidates where:

```text
status is draft or stable
publication.audience == internal
publication.state == preview
```

This combination honors the existing domain validator, which rejects `public`
audience paired with a `preview` state. Every non-production page and card must
show an explicit Draft / Unpublished label, and every preview has a protected
preview banner. Preview builds reject `proposal-only`, `blocked`, and deprecated
records, and proof whose confidentiality is `confidential` or `unconfirmed`.

All non-production deployments require Vercel Deployment Protection. The site
also emits noindex/nofollow metadata and a disallowing `robots.txt`; the future
deployment config sends `X-Robots-Tag: noindex`. Authentication and noindex are
independent controls and both are required. Preview visibility never constitutes
publication approval.

#### Proposal-only rule [agent-draft]

Proposal-only content is excluded from every `apps/web` build, including the
protected preview. It is reserved for a future separately authenticated proposal
workspace or export renderer outside the public website application. That future
system requires its own approved access, retention, client-specific disclosure,
and review model. This adopts option **(c)** from the Phase 2A handoff and avoids
turning the public-site deployment into a proposal-content store.

### 7i. Page generation and relationship rules [agent-draft]

The future site generates its homepage, service-family and offering pages,
expertise pages, audience pages, case-study pages, qualification modules,
insight indexes/articles, and About/team pages only from the selected graph.
Service pages preserve decision owners; expertise remains topic-led; audiences
remain value-chain-led; and Advise/Manage/Operate is separately rendered.

Eligible case studies are generated as canonical pages and placed via reverse
indexes on every related service, expertise, and audience page. No content is
copied between those pages. When no eligible proof exists, the proof section is
hidden rather than rendered empty. The absence of proof also creates no case
study route, count, or placeholder claim.

### 7j. Future repository boundary [agent-draft]

No directory below is created in Phase 2A. It is the implementation boundary
after owner approval:

```text
knowledge/                 governed Markdown source; never app output
schemas/                   canonical publication and relationship registries
scripts/                   existing Python checks plus framework-neutral checks
apps/web/                  future Astro presentation and read-only compiler
apps/web/.generated/       ignored graph/audit artifacts
apps/web/public/           deliberately public, approved static assets only
apps/web/src/              routes, layouts, components, styles, and test helpers
.github/workflows/         current checks plus future website CI gates
deployment configuration/  future application/host configuration only
```

Reference assets remain in `knowledge/references/` until an owner-approved asset
strategy selects what is public. Do not publish all repository images merely
because they can be read by the build.

### 7k. CMS and future application strategy [agent-draft]

Git plus OKF Markdown is the initial editorial system. It already supplies
provenance, reviewable history, schemas, and validation. An immediate headless
CMS would introduce competing authoring and publication states before there is
evidence that Git review is the bottleneck.

A visual CMS may later be a controlled editing adapter: it creates a reviewed
change on a protected Git branch or pull request; existing validators and the
website compiler pass before merge; and production continues to build from the
merged knowledge bundle. A direct CMS-to-production path is not compatible with
the current approval contract.

Keep future calculators, client portals, and authenticated tools separate from
the marketing site. A small public interaction may be an Astro island; a tool
with client data, accounts, or sensitive inputs must have its own application,
authentication, data store, threat model, deployment, and release cadence. It
may share approved design tokens and public data contracts, but not deployment
or access control with the public site.

### 7l. Hosting comparison and migration approach [agent-draft]

| Option | Production/preview fit | Security and noindex | Assessment |
|---|---|---|---|
| **Vercel (recommended)** | Git-connected `main` production plus branch/PR previews, environment scopes, logs, and Git-based rollback. | Vercel Authentication through Deployment Protection; application and host configuration enforce noindex independently. | Lowest-configuration fit for this Astro launch. |
| **Cloudflare Pages + Access (fallback)** | Git branch previews and static deployment. | Pages adds noindex headers to previews by default; Cloudflare Access protects preview access. | Strong fallback when Cloudflare/DNS and Access are already operated; adds policy/DNS administration. |
| **Netlify (not selected)** | Git Deploy Previews, redirects, logs, and Astro support. | Preview noindex is automatic; non-production-only team/login protection is plan-dependent. | Technically viable but a weaker fit for the selected access approach. |

Build Vercel from `apps/web/`; only `main` is production. Scope environment
variables independently for production and preview, never expose secrets to the
client bundle, and use a non-secret build-mode variable to select the compiler
filter. GitHub Actions remain the independent pre-merge gate for knowledge and
future website tests.

Before the domain cutover, produce a human-reviewed inventory of every current
`terra.nexus` URL, a destination/status map, tests for query preservation and
loops, and a rollback plan. Do not infer redirects from unapproved titles or
content. Confirm canonical HTTPS URLs, sitemap membership, and search-console
coverage after cutover.

### 7m. Implementation-ready acceptance tests [agent-draft]

1. Production includes only records satisfying all five approved eligibility fields.
2. Internal records have no production route, card, metadata, search, feed, or static-data trace.
3. Proposal-only records are rejected by every `apps/web` build mode.
4. Draft, deprecated, blocked, and preview-state records have no production trace.
5. Confidential/unconfirmed proof has no production trace; eligible proof is only `anonymized` or `public`.
6. Every preview sends noindex metadata, disallowing `robots.txt`, and `X-Robots-Tag: noindex`.
7. Preview access fails without the selected authentication policy.
8. Every unpublished preview page/card visibly identifies its status.
9. A valid public case study generates its canonical page and approved structured data.
10. A new valid case study appears on all directly related service, expertise, and audience pages without copied content.
11. Invalid IDs, dangling references, invalid proof, and duplicate URLs write an audit then fail the build.
12. Every rejected record is logged with a clear, deterministic reason.
13. Pages with no eligible proof omit their proof sections.
14. Sitemap, search data, feeds, canonicals, and JSON-LD contain only eligible public content.
15. Redirect tests cover every reviewed legacy URL, status, destination, query, and loop outcome.
16. Keyboard, semantic HTML, contrast, focus, reduced-motion, and automated axe checks meet the approved accessibility baseline.
17. Representative mobile pages reach Lighthouse Performance 90, Accessibility 100, Best Practices 95, and SEO 95; exceptions require approval.
18. Image tests verify dimensions, alt text, approved source, and optimized delivery where applicable.
19. OKF, Terra Nexus, inventory, skill-sync, and Python test checks continue to pass.
20. A clean-build/diff test proves website compilation never modifies `knowledge/`.

### 7n. Recommended implementation phases [agent-draft]

1. Implement the compiler, fixtures, production/preview filters, audit, and
   negative tests before page code.
2. Create the approved Astro application, design tokens, route map, layouts,
   SEO primitives, and CI gates.
3. Configure protected preview, authentication, noindex headers, and deployment
   tests.
4. Add reusable service, expertise, audience, proof, and supporting templates
   driven exclusively by the compiled graph.
5. Complete legacy redirects, approved assets, domain migration, forms/CRM,
   analytics/consent, accessibility, and performance work.
6. Add proof, insights, CMS editing, calculators, or authenticated applications
   only through separately approved scopes.

### 7o. Risks and owner decisions [agent-draft]

| Risk | Mitigation |
|---|---|
| Unapproved content reaches public output. | Central filter, negative tests, production-only indexes, and exclusion audit. |
| A preview is indexed or shared too broadly. | Authentication plus independent noindex controls and response-header tests. |
| Proposal/confidential proof leaks through preview. | Hard reject it from the public application compiler. |
| A CMS becomes a competing source. | Defer it; later require a Git-PR editing adapter. |
| Legacy URLs lose traffic or equity. | Owner-reviewed inventory, redirect tests, and post-cutover monitoring. |
| Future tools overcomplicate marketing delivery. | Keep the site static and isolate authenticated tools. |

Remaining owner inputs for Phase 2B and later:

1. Supply one internal case study for the pilot checkpoint and set its canonical
   publication and confidentiality fields.
2. Authorize/supply the legacy URL, analytics, and redirect-inventory access
   needed for migration planning.
3. Select launch form/CRM and analytics/consent services, or explicitly defer
   them.

### 7p. Official technical sources consulted [agent-draft]

Current official documentation informing this proposal (reconfirm product limits
and pricing at procurement/implementation):

- [Astro Content Loader API](https://docs.astro.build/en/reference/content-loader-reference/), [images](https://docs.astro.build/en/guides/images/), and [sitemap integration](https://docs.astro.build/en/guides/integrations-guide/sitemap/).
- [Next.js `generateStaticParams`](https://nextjs.org/docs/app/api-reference/functions/generate-static-params), [sitemap metadata](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap), and [redirects](https://nextjs.org/docs/app/api-reference/config/next-config-js/redirects).
- [Vercel Git deployments](https://vercel.com/docs/git) and [Deployment Protection](https://vercel.com/docs/deployment-protection).
- [Cloudflare Pages preview deployments](https://developers.cloudflare.com/pages/configuration/preview-deployments/).
- [Netlify deploy overview](https://docs.netlify.com/deploy/deploy-overview/) and [Password Protection](https://docs.netlify.com/manage/security/secure-access-to-sites/password-protection/).

---

## 8. Design-System Requirements

> No design assets, color specifications, or component definitions exist in this repository. All items below are **missing** and require owner input.

### Decisions and Assets Needed

| Category | Specific Decisions / Assets Needed |
|---|---|
| Visual identity | Logo files (SVG, PNG at multiple sizes); usage rules |
| Typography | Primary and secondary typefaces; scale (H1–H6, body, caption, label); web font delivery |
| Color | Primary, secondary, accent, neutral, semantic (error/success/warning) hex values; dark mode decision |
| Spacing | Base unit; scale; margin/padding conventions |
| Layout | Grid system; max content width; column counts at breakpoints |
| Iconography | Icon set (library or custom); sizing and stroke rules |
| Imagery | Photography style; illustration vs. photography; sourcing (licensed stock, original, client-provided) |
| Charts and diagrams | Chart library; color mapping; accessibility (alt text, ARIA roles) |
| Responsive behavior | Mobile-first or desktop-first; breakpoint definitions |
| Accessibility | WCAG 2.2 Level AA; focus states, color contrast ratios, skip navigation, and required manual checks |
| Motion and interaction | Animation duration/easing; reduced-motion support |

**Note on existing reference images:** Two PNG value-chain diagrams exist in `references/images/`. These are reference assets, not design-system components. They may inform the diagram style but do not constitute a design specification.

---

## 9. Implementation Milestones

### Current approved sequence [agent-draft]

This sequence supersedes the historical Phase 0–6 detail below. It does not
make all page copy or all case studies prerequisites for Phase 2B.

**Current status:** Phase 1A and Phase 1A.2 are complete. Phase 2A is approved
pending PR merge. Phase 2B is next. Phase 1B content interviews may proceed in
parallel.

1. **Phase 2B — Astro foundation.** Create the Astro foundation, read-only
   OKF compiler, publication filters, relationship graph, authoring helper,
   status reporting, tests, and a minimal application shell.
2. **Pilot checkpoint (after the Phase 2B foundation).** Add one
   owner-supplied internal case study and prove ingestion, authenticated preview,
   relationship placement, and production exclusion.
3. **Reusable page system.** Add service, expertise, audience, case-study, and
   related-content templates.
4. **Progressive content completion and launch preparation.** Complete and
   approve content in governed batches while preparing launch requirements.

The historical notes are retained for provenance only. Where they conflict with
this sequence, this sequence controls.

**Repository checks for these milestones:**

```bash
python scripts/validate_okf.py knowledge
python scripts/tnx_validate.py knowledge
python scripts/okf_cli.py --bundle knowledge ...
python -m pytest tests/ -v
python scripts/generate_inventory.py knowledge --check --tree
python scripts/sync_skills.py --check
```

### Historical Phase 0 — Repository and Knowledge Foundation *(superseded)*

**What will be created:**
- `plans/website-foundation.md` (this document)
- `.agents/skills/terra-nexus-content/SKILL.md` (created)
- OKF validation passing (SKILL.md `type` field fixed)

**Approvals required:**
- Owner review and approval of this ExecPlan before Phase 1 begins.

**Completion test:**
```bash
python scripts/validate_okf.py knowledge   # exits 0, no errors
```
- This ExecPlan file exists at `plans/website-foundation.md`.
- Blocking owner questions in Section 10 have been reviewed.

**Must remain unimplemented until approval:**
- Everything in Phases 1–6.

---

### Historical Phase 1 — Content Architecture and Completion *(superseded)*

**What will be created:**
- Decision records for: narrative selection, tagline selection, Carbon & Ecosystem Services approval.
- Completed and owner-approved topic page briefs for all nine expertise areas.
- Completed and owner-approved service page briefs for all five service families.
- Completed and owner-approved audience page briefs for all eleven segments.
- At least one approved case-study or qualification module.
- Owner-supplied leadership bios and credentials.
- Owner-supplied tools, data, and partner disclosures (or decision to defer).
- Updated `website/open-issues-and-required-inputs.md` reflecting resolved items.

**Approvals required:**
- Narrative and tagline selection.
- All service offering descriptions for Carbon & Ecosystem Services.
- All topic page briefs.
- At least one case study.
- Brand usage rules finalized from `draft` to `stable`.

**Completion test:**
```bash
python scripts/validate_okf.py knowledge   # still passes
python scripts/okf_cli.py --bundle knowledge find "carbon ecosystem"  # all 7 offerings show non-draft descriptions
```
- All pages listed in Section 4 have `content_depth: approved-brief` or better.

**Must remain unimplemented until approval:**
- Framework installation, page scaffolding, or any production code.

---

### Historical Phase 2 — Technical and Design-System Foundation *(superseded)*

**What will be created:**
- Decision record for technical stack (framework, CMS, hosting).
- Initialized project scaffold (framework + config files only, no page content).
- Design-system tokens file (colors, typography, spacing).
- Accessibility baseline documented.
- CI/CD pipeline skeleton.

**Approvals required:**
- Technical stack decision recorded in D-4; implementation remains out of scope for Phase 2A.
- Design-system tokens reviewed by owner or designer.
- Accessibility standard confirmed.

**Completion test:**
- Framework dev server starts without errors.
- Lint and type-check pass on empty scaffold.
- Design token file renders a visual reference page.

**Must remain unimplemented until approval:**
- Page templates, components, or any content rendering.

---

### Historical Phase 3 — Reusable Page Templates and Components *(superseded)*

**What will be created:**
- Component library: `ServiceFamilyCard`, `ExpertiseTopicCard`, `AudienceCard`, `QualificationModule`, `AdviseManagedOperateBlock`, `CallToAction`, `RelatedContent`.
- Page template implementations for: topic page, service page, audience page, about page.
- OKF-to-component data pipeline (Markdown → typed page props).

**Approvals required:**
- Component designs reviewed by owner or designer.
- Accessibility tested on all components.

**Completion test:**
- Each component renders without errors in isolation.
- All components pass WCAG 2.2 Level AA color contrast checks.
- OKF index JSON generates correctly from `python scripts/okf_cli.py --bundle knowledge index`.

**Must remain unimplemented until approval:**
- Production pages with approved content.

---

### Historical Phase 4 — Priority Pages *(superseded)*

**What will be created:**
- Homepage (with approved narrative).
- All five service family overview pages.
- All nine expertise topic pages.
- All eleven audience pages.
- About page (company overview + Advise/Manage/Operate).

**Approvals required:**
- All Phase 1 content approvals must be complete.
- Each page reviewed and approved by owner before publishing.

**Completion test:**
- All pages render without errors.
- All internal cross-links resolve.
- `python scripts/validate_okf.py knowledge` still passes on the knowledge bundle.
- Lighthouse accessibility score ≥ 90 on each page.

**Must remain unimplemented until approval:**
- Case study pages (Phase 5).
- Insights / blog (Phase 5).
- Final deployment (Phase 6).

---

### Historical Phase 5 — Case Studies, Insights, SEO, Analytics, and Integrations *(superseded)*

**What will be created:**
- Case study index and individual module pages (using approved proof).
- Insights section with at least one approved article per priority expertise topic.
- Sitemap.xml, robots.txt, JSON-LD structured data.
- Analytics integration.
- Contact form and CRM integration (if applicable).
- Search (on-site, if in scope).

**Approvals required:**
- All case study content approved (identity, outcome, confidentiality).
- Analytics and tracking reviewed for privacy compliance.
- CRM/form integration tested end-to-end.

**Completion test:**
- Sitemap validates at `/sitemap.xml`.
- All case study pages render with correct tags.
- Analytics event fires correctly on key CTAs.

**Must remain unimplemented until approval:**
- Final performance hardening and deployment (Phase 6).

---

### Historical Phase 6 — Quality Assurance, Accessibility, Performance, and Deployment *(superseded)*

**What will be created:**
- Full accessibility audit and remediation (WCAG 2.2 Level AA target).
- Performance optimization (Core Web Vitals: LCP, CLS, FID/INP).
- Cross-browser and device testing.
- Security hardening (CSP headers, HTTPS enforcement, form spam protection).
- Production deployment with monitoring.
- Post-launch redirect map (if replacing an existing site).

**Approvals required:**
- Accessibility audit results reviewed; critical issues resolved.
- Performance benchmark approved.
- Security review complete.
- Owner sign-off on production go-live.

**Completion test:**
- Lighthouse performance ≥ 80 on all priority pages.
- WCAG 2.2 Level AA automated scan passes on all pages (manual audit complete for critical paths).
- Production deployment verified: all pages load, all forms submit, all analytics fire.

---

## 10. Decision Log

### Established Decisions (from approved sources)

| ID | Decision | Source |
|---|---|---|
| E-1 | Five service families are confirmed and must not be restructured without owner approval. | `references/decisions/confirmed-knowledge-architecture.md` |
| E-2 | Areas of Expertise are topic-led market entry points, not service lines. | Same |
| E-3 | Who We Work With is the value-chain and enabling-market audience taxonomy only. | Same |
| E-4 | Advise, Manage, and Operate are lines of business and must not replace the service taxonomy. | Same |
| E-5 | Case studies are reusable proof modules; no approved content exists yet. | `website/open-issues-and-required-inputs.md` |
| E-6 | Illustrative company examples are not confirmed clients. | `governance/source-precedence.md` |
| E-7 | Carbon & Ecosystem Services offering descriptions are not approved and must not be published without owner review. | `references/source-documents/service-architecture.md` |
| E-8 | No single brand narrative option has been selected as the final homepage hero. | `brand/messaging-options.md` |
| E-9 | Existing public website at terra.nexus; future site is a replacement project. | Owner confirmation 2026-08-01 |
| E-10 | Phase 0 ExecPlan approved with amendments. Phase 1A authorized to proceed. | Owner confirmation 2026-08-01 |
| E-11 | Public website build eligibility rule established: status=stable, publication.audience=public, publication.state=approved, approved_by non-null, approved_at non-null. Proof records also require confidentiality=anonymized or public. | `knowledge/references/decisions/website-build-eligibility.md` |

### Owner Decisions — Classification

> Phase column indicates when the decision first becomes blocking.
> Status reflects owner instruction received 2026-08-01.

| ID | Description | Blocking Phase | Status | Provisional Handling Rule | Owner Input Required | Affected Concepts / Future Pages |
|---|---|---|---|---|---|---|
| D-1 | Homepage narrative selection | Phase 4 | Deferred — not blocking Phase 1A | Preserve all five options in `brand/narrative-decision-worksheet.md`; do not select or draft final copy | Owner selects or revises one narrative option before Phase 4 | Homepage, About, brand usage rules |
| D-2 | Tagline selection | Phase 4 | Deferred — not blocking Phase 1A | Preserve all four options in `brand/tagline-comparison.md`; do not use any single option in templates | Owner selects or approves a tagline before Phase 4 | All page headers, meta titles, og:title, masthead |
| D-3 | Carbon & Ecosystem Services offering descriptions | Phase 1A | **Unblocked for draft development** | Draft descriptions using approved sources and confirmed business logic; all must carry `status: draft` and the canonical `publication` block with `audience: internal`, `state: blocked`, `attribution: none`, `approved_by: null`, and `approved_at: null` | Owner reviews and approves each draft before publication | All C&ES offering pages; `services/carbon-and-ecosystem-services/` |
| D-4 | Technical stack (framework, CMS, hosting) | Phase 2A | **Approved — pending PR merge** | Astro, static-first; Vercel; Git plus governed OKF Markdown; custom read-only OKF compiler; CMS deferred; Vercel Authentication for preview. Do not scaffold in Phase 2A. | No further technical-stack selection is required; Phase 2B begins after PR merge. | All application code, deployment config, component library |
| D-5 | Design system (visual identity, tokens, components) | Phase 2–3 | Deferred — not blocking Phase 1A | Create design-input inventory and missing-assets list only; do not generate or infer a visual identity | Owner provides brand asset package or commissions designer before Phase 3 | All templates, components, responsive behavior |
| D-6 | Case studies and qualifications disclosure | Pilot checkpoint | Internal structuring proceeds | Create schema and intake template; default all records to `status: draft`, `publication.audience: internal`, `publication.state: blocked`, `publication.attribution: none`, `publication.approved_by: null`, `publication.approved_at: null`, and `confidentiality: unconfirmed` | Owner supplies the pilot record and specifies disclosure level per engagement | Case Studies section, proof modules, qualification modules |
| D-7 | Team profiles and biographical detail | Phase 4 | Deferred — not blocking Phase 1A | Create intake templates only; do not draft public bios without source material | Owner provides biography inputs before Phase 4 | About / Team section |
| D-8 | Tools, data providers, partners, and standards disclosure | Reusable page system | Internal knowledge development proceeds | Each record must include `relationship_type`, `experience_type`, the canonical `publication` block, `confidentiality`, and source/approval evidence; do not imply partnership or client status | Owner specifies disclosure level per entity | Tools & Data section, partner sections, topic and service pages |
| D-9 | Service architecture wording | Phase 1A | **In progress — layered approach** | Layer 1: source wording unchanged in reference files. Layer 2: normalized draft concepts in OKF knowledge layer. Layer 3: agent recommendations clearly identified. Do not overwrite source wording. | Owner reviews proposed changes in `content-audits/service-architecture-audit.md` | All service offering pages, service family overviews |
| D-10 | Existing website migration (terra.nexus) | Phase 6 | Deferred — not blocking Phase 1A | Note existence of terra.nexus; plan content inventory, URL/redirect map, SEO baseline, analytics migration, and launch plan for Phase 6 | Owner provides access or inventory of existing site before Phase 6 | Phase 6 milestones, redirect map, analytics migration |

---

### D-4 Approved Technical Decision [agent-draft]

This owner approval selects the future implementation direction. It does not
approve website content, scaffolding, deployment configuration, or implementation
work in this Phase 2A planning document.

| Decision area | Owner-approved choice |
|---|---|
| Framework | Astro, static-first. |
| Hosting | Vercel. |
| Content system | Git plus governed OKF Markdown. |
| Content ingestion | Custom read-only OKF compiler. |
| CMS | Deferred. |
| Preview protection | Vercel Authentication. |
| Proposal-only content | Excluded from `apps/web`; reserved for a separate future authenticated renderer or export system. |
| Accessibility target | WCAG 2.2 Level AA. |
| Performance targets | LCP <= 2.5 seconds, INP <= 200 milliseconds, and CLS <= 0.1, each at the 75th percentile. |

**Owner-approved preview boundary:** confidential, internal, and client-sensitive
material requires authenticated user access. Shareable-link previews may be used
only for non-confidential external review. Proposal-only records must not enter
`apps/web` or any website preview bundle.

#### Canonical publication and confidentiality fields [agent-draft]

```yaml
publication:
  audience: internal | proposal-only | public
  state: blocked | preview | approved
  attribution: none | anonymized | named
  approved_by: null | human:<identifier>
  approved_at: null | <ISO 8601 timestamp>
confidentiality: unconfirmed | confidential | anonymized | public
```

## 11. Phase 1B Recommendation

> [agent-draft] — Phase 1B content interviews may proceed in parallel with
> Phase 2B. They are not a prerequisite for the Phase 2B foundation.

### Phase 1B Goal

Progressively complete and approve content needed for reusable templates and
launch preparation. Phase 2B may begin without all page copy or all case studies
being complete.

### Highest-Priority Owner Interviews

Owner time is the critical constraint. Prioritize these interviews first:

| Priority | Interview | Output |
|---|---|---|
| 1 | Review and approve/revise all 7 Carbon & Ecosystem Services draft descriptions | Unblock C&ES page production |
| 2 | Complete trading company qualification intake (Part 1 — Commodities, Part 2 — VCM, Part 4 — Certifications) | Enable first proof modules |
| 3 | Review and approve/revise service architecture audit items requiring owner decisions (~15 items) | Unblock service offering pages |
| 4 | Select homepage narrative (D-1) and tagline (D-2) | Unblock homepage and About |
| 5 | Review and approve expertise topic briefs (9 topics) | Unblock topic page copy development |

### Highest-Priority Pages for Draft Copy

In order of content availability and market value:

1. Sustainable Supply Chains (topic) — highest audience breadth; most services connected
2. Strategy & Innovation (service) — all source content available; no blocked decisions
3. Sustainable Supply Chain & Operations (service) — same
4. Corporate Sustainability (service) — same
5. Regenerative Agriculture (topic) — widest audience and proof opportunity
6. All remaining expertise topic pages (in parallel once external research is commissioned)
7. Audience pages — after topic and service briefs are approved

### Pilot Proof Checkpoint

After the Phase 2B foundation, use one owner-supplied internal case study to
prove governed ingestion, authenticated preview, relationship placement, and
production exclusion. It is not a public-content approval or a requirement to
complete all case studies.

### External Research Required Before Copy Development

Commission these research tasks as independent workstreams:

| Topic | Research Items |
|---|---|
| Low Carbon Energy & Biofuels | 45Z, LCFS, RED III, SAF feedstock certification |
| Carbon & Ecosystem Services | VCM integrity standards, GHG Protocol land sector, CSRD, SEC |
| Environmental Markets audience | VCM market current state, registry requirements |
| Energy & Biofuels Refiners audience | 45Z, RFS, LCFS current requirements |
| Biodiversity & Ecosystem Resilience | TNFD, CSRD ESRS E4, CBD GBF |
| All topics | Relevant regulatory and program updates by topic |

### Content Approved in Batches

These can be reviewed and approved in single working sessions once briefs are ready:
- All nine expertise topic briefs (one session per topic)
- All 11 audience page briefs (one review session)
- Five service family overviews (one review session)

### Content to Defer Until the Reusable Page System

- Page-specific metadata and structured data formats
- Component content field specifications
- CMS schema design
- Insights / blog editorial workflow

---

*End of ExecPlan — version 0.3, status: draft.*
*Phase 1A and Phase 1A.2 complete. Phase 2A approved pending PR merge. Phase
2B is next; Phase 1B content interviews may proceed in parallel. The pilot
case-study checkpoint occurs after the Phase 2B foundation.*
