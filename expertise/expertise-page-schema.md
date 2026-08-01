---
type: Content Schema
title: Expertise Topic Page Schema
description: >
  Standard schema and field definitions for all nine Terra Nexus Area of
  Expertise topic pages. All topic pages must follow this schema. The schema
  is stable; individual topic briefs derived from it are draft.
tags:
- expertise
- schema
- topic-page
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
- id: topics-value-chains
  resource: /references/source-documents/topics-and-value-chains.md
  title: Terra Nexus Topics and Value Chains
  author: human:terra-nexus-owner
---

# Expertise Topic Page Schema

Areas of Expertise are food-and-climate topics that create market relevance,
urgency, and calls to action. They are the primary market-facing entry points
on the website. They must not be converted into service categories or collapsed
into service family pages.

## OKF Frontmatter Fields (required for all topic concept files)

```yaml
type: Expertise Topic
title: <topic name>
description: <one-sentence definition>
tags:
- expertise
- <slug>
status: <stable | draft>
generated:
  by: <agent or author>
  at: <ISO 8601 timestamp>
sources:
- id: topics-value-chains
  resource: /references/source-documents/topics-and-value-chains.md
page_role: topic-page
content_depth: <title-and-classification | draft-brief | approved-brief | approved-copy>
related_services:
- <service family slug>
related_audiences:
- <audience slug>
related_case_studies: []
engagement_models:
- advise
- manage
- operate
external_research_required: <true | false>
```

## Page Sections (required for production copy)

Each topic page must contain all of the following sections before it can be
approved for Phase 4 production:

### 1. Topic Definition
What this topic is within Terra Nexus's food-and-climate scope. Source-derived.

### 2. Market Context and Why Now
Current forces creating urgency. **Requires current, cited external sources.**
Do not use agent-synthesized market facts — every claim must have a citation.

### 3. Affected Value-Chain Participants
Which audiences in the Terra Nexus taxonomy face decisions related to this topic.
Cross-link to `audiences/` files.

### 4. Decisions Clients Face
Organized by client function (decision owner). Connects to the service-family framework.

### 5. How Terra Nexus Helps
Relevant service families and offerings. Cross-link to `services/`. Do not
replace service families with generic activity descriptions.

### 6. How We May Engage
Advise, Manage, and/or Operate. Cross-link to `governance/advise-manage-operate.md`.

### 7. Relevant Standards, Programs, Tools, and Market Mechanisms
Only approved and cited examples. Time-sensitive — requires current research.

### 8. Case Studies and Qualifications
Approved proof modules. Currently: none exist in this bundle.

### 9. Related Insights
Current articles and explainers. Currently: none exist.

### 10. Call to Action
A specific next step connected to the market opportunity and the relevant service.

## Content Readiness Levels

| Level | Description |
|---|---|
| `title-and-classification` | Topic name and source-document category only |
| `draft-brief` | Full schema fields populated; page sections outlined; no production copy |
| `approved-brief` | Draft brief reviewed and approved by owner; ready for copy development |
| `approved-copy` | Full page copy written, reviewed, and approved for production |
