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

> **Status: draft — requires owner review and approval before Phase 1 begins.**
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

- `python validate_okf.py .` exits with code 0 and no errors.
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
| Python tooling | `okf_cli.py` (search, read, index), `validate_okf.py` (OKF structural validation) |
| Python dependency | `requirements.txt` — `PyYAML>=6.0` only |
| Agent configuration | `AGENTS.md` (root), `.github/skills/terra-nexus-content/SKILL.md`, `.agents/skills/terra-nexus-content/SKILL.md` |
| Reference originals | `references/source-documents/originals/` — three `.docx` source files |
| Reference images | `references/images/` — two `.png` value-chain diagrams |
| Version control | `.gitignore` present; no remote or CI/CD configuration visible |

### 2b. Missing Infrastructure

The following categories have **zero existing files**:

| Missing Category | Detail |
|---|---|
| Web framework | No Next.js, Astro, Vite, React, Vue, Svelte, or any other framework |
| Package manifests | No `package.json`, `pnpm-workspace.yaml`, `pyproject.toml`, or equivalent |
| Application code | No `.js`, `.ts`, `.jsx`, `.tsx`, `.css`, `.scss`, `.html` files |
| Design system | No color tokens, type scales, component specs, or accessibility baseline |
| CMS configuration | No Sanity, Contentful, or similar schema |
| Deployment config | No `vercel.json`, `netlify.toml`, Dockerfile, or CI/CD workflow |
| Testing config | No unit, integration, or E2E test setup |
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
3. Owner reviews and approves each description before `publication_status` is changed from `do-not-publish-without-review`.
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

## 7. Technical Architecture Assessment

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
| Accessibility | WCAG 2.1 AA minimum? WCAG 2.2? |
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
| Accessibility | WCAG level (2.1 AA minimum recommended); focus states; color contrast ratios; skip-nav |
| Motion and interaction | Animation duration/easing; reduced-motion support |

**Note on existing reference images:** Two PNG value-chain diagrams exist in `references/images/`. These are reference assets, not design-system components. They may inform the diagram style but do not constitute a design specification.

---

## 9. Implementation Milestones

### Phase 0 — Repository and Knowledge Foundation *(current phase)*

**What will be created:**
- `plans/website-foundation.md` (this document)
- `.agents/skills/terra-nexus-content/SKILL.md` (created)
- OKF validation passing (SKILL.md `type` field fixed)

**Approvals required:**
- Owner review and approval of this ExecPlan before Phase 1 begins.

**Completion test:**
```bash
python validate_okf.py .   # exits 0, no errors
```
- This ExecPlan file exists at `plans/website-foundation.md`.
- Blocking owner questions in Section 10 have been reviewed.

**Must remain unimplemented until approval:**
- Everything in Phases 1–6.

---

### Phase 1 — Approved Content Architecture and Missing-Content Completion

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
python validate_okf.py .   # still passes
python okf_cli.py find "carbon ecosystem"  # all 7 offerings show non-draft descriptions
```
- All pages listed in Section 4 have `content_depth: approved-brief` or better.

**Must remain unimplemented until approval:**
- Framework installation, page scaffolding, or any production code.

---

### Phase 2 — Technical and Design-System Foundation

**What will be created:**
- Decision record for technical stack (framework, CMS, hosting).
- Initialized project scaffold (framework + config files only, no page content).
- Design-system tokens file (colors, typography, spacing).
- Accessibility baseline documented.
- CI/CD pipeline skeleton.

**Approvals required:**
- Technical stack decision.
- Design-system tokens reviewed by owner or designer.
- Accessibility standard confirmed.

**Completion test:**
- Framework dev server starts without errors.
- Lint and type-check pass on empty scaffold.
- Design token file renders a visual reference page.

**Must remain unimplemented until approval:**
- Page templates, components, or any content rendering.

---

### Phase 3 — Reusable Page Templates and Components

**What will be created:**
- Component library: `ServiceFamilyCard`, `ExpertiseTopicCard`, `AudienceCard`, `QualificationModule`, `AdviseManagedOperateBlock`, `CallToAction`, `RelatedContent`.
- Page template implementations for: topic page, service page, audience page, about page.
- OKF-to-component data pipeline (Markdown → typed page props).

**Approvals required:**
- Component designs reviewed by owner or designer.
- Accessibility tested on all components.

**Completion test:**
- Each component renders without errors in isolation.
- All components pass WCAG 2.1 AA color contrast checks.
- OKF index JSON generates correctly from `python okf_cli.py index`.

**Must remain unimplemented until approval:**
- Production pages with approved content.

---

### Phase 4 — Priority Pages

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
- `python validate_okf.py .` still passes on the knowledge bundle.
- Lighthouse accessibility score ≥ 90 on each page.

**Must remain unimplemented until approval:**
- Case study pages (Phase 5).
- Insights / blog (Phase 5).
- Final deployment (Phase 6).

---

### Phase 5 — Case Studies, Insights, SEO, Analytics, and Integrations

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

### Phase 6 — Quality Assurance, Accessibility, Performance, and Deployment

**What will be created:**
- Full accessibility audit and remediation (WCAG 2.1 AA target).
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
- WCAG 2.1 AA automated scan passes on all pages (manual audit complete for critical paths).
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

### Owner Decisions — Classification

> Phase column indicates when the decision first becomes blocking.
> Status reflects owner instruction received 2026-08-01.

| ID | Description | Blocking Phase | Status | Provisional Handling Rule | Owner Input Required | Affected Concepts / Future Pages |
|---|---|---|---|---|---|---|
| D-1 | Homepage narrative selection | Phase 4 | Deferred — not blocking Phase 1A | Preserve all five options in `brand/narrative-decision-worksheet.md`; do not select or draft final copy | Owner selects or revises one narrative option before Phase 4 | Homepage, About, brand usage rules |
| D-2 | Tagline selection | Phase 4 | Deferred — not blocking Phase 1A | Preserve all four options in `brand/tagline-comparison.md`; do not use any single option in templates | Owner selects or approves a tagline before Phase 4 | All page headers, meta titles, og:title, masthead |
| D-3 | Carbon & Ecosystem Services offering descriptions | Phase 1A | **Unblocked for draft development** | Draft descriptions using approved sources and confirmed business logic; all must carry `status: draft`, no `verified` block; `publication_status: do-not-publish-without-review` | Owner reviews and approves each draft before publication | All C&ES offering pages; `services/carbon-and-ecosystem-services/` |
| D-4 | Technical stack (framework, CMS, hosting) | Phase 2 | Deferred — not blocking Phase 1A | Retain three approaches in ExecPlan Section 7; do not install or scaffold | Owner selects approach before Phase 2 | All application code, deployment config, component library |
| D-5 | Design system (visual identity, tokens, components) | Phase 2–3 | Deferred — not blocking Phase 1A | Create design-input inventory and missing-assets list only; do not generate or infer a visual identity | Owner provides brand asset package or commissions designer before Phase 3 | All templates, components, responsive behavior |
| D-6 | Case studies and qualifications disclosure | Phase 5 | Internal structuring proceeds | Create schema and intake template; default all records to `status: draft`, `publication_status: internal`, `confidentiality: confidential-or-unconfirmed` | Owner specifies disclosure level per engagement before Phase 5 | Case Studies section, proof modules, qualification modules |
| D-7 | Team profiles and biographical detail | Phase 4 | Deferred — not blocking Phase 1A | Create intake templates only; do not draft public bios without source material | Owner provides biography inputs before Phase 4 | About / Team section |
| D-8 | Tools, data providers, partners, and standards disclosure | Phase 4–5 | Internal knowledge development proceeds | Each record must include `relationship_type`, `experience_type`, `publication_permission`, `attribution_required`, `source`, `approval_status`; do not imply partnership or client status | Owner specifies disclosure level per entity | Tools & Data section, partner sections, topic and service pages |
| D-9 | Service architecture wording | Phase 1A | **In progress — layered approach** | Layer 1: source wording unchanged in reference files. Layer 2: normalized draft concepts in OKF knowledge layer. Layer 3: agent recommendations clearly identified. Do not overwrite source wording. | Owner reviews proposed changes in `content-audits/service-architecture-audit.md` | All service offering pages, service family overviews |
| D-10 | Existing website migration (terra.nexus) | Phase 6 | Deferred — not blocking Phase 1A | Note existence of terra.nexus; plan content inventory, URL/redirect map, SEO baseline, analytics migration, and launch plan for Phase 6 | Owner provides access or inventory of existing site before Phase 6 | Phase 6 milestones, redirect map, analytics migration |

---

## 11. Phase 1B Recommendation

> [agent-draft] — Proposed Phase 1B sequence based on Phase 1A findings.
> Requires owner approval before implementation begins.

### Phase 1B Goal

Complete and approve all content required for Phase 4 (priority page production).
By the end of Phase 1B, every page listed in the site map should have an
`approved-brief` or `approved-copy` status in the content-readiness dashboard.

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

### Missing Proof (Critical Path)

No proof exists in this bundle. Before Phase 4, at minimum:
- One approved qualification module per service family (5 total)
- One approved qualification module per high-priority expertise topic (at minimum: Regenerative Agriculture, Sustainable Supply Chains, Carbon & Ecosystem Services)

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

### Content to Defer Until Technical Stack is Selected (D-4)

- Page-specific metadata and structured data formats
- Component content field specifications
- CMS schema design
- Insights / blog editorial workflow

---

*End of ExecPlan — version 0.3, status: draft.*
*Phase 0 approved 2026-08-01. Phase 1A complete 2026-08-01. Phase 1B pending owner approval.*
