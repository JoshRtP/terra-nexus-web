---
type: Agent Instructions
title: Codex Start Here
description: Required sequence for using the Terra Nexus OKF bundle before planning
  or building the website.
tags:
- codex
- agent
- website-build
status: stable
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
---

# Required Reading Order

1. [Root AGENTS.md](https://github.com/JoshRtP/Webservices/blob/main/AGENTS.md) — mandatory governance rules
2. [Source precedence](/governance/source-precedence.md)
3. [Confirmed knowledge architecture](/references/decisions/confirmed-knowledge-architecture.md)
4. [Brand platform](/brand/brand-platform.md)
5. [Brand usage rules](/brand/brand-usage-rules.md)
6. [Service decision-owner matrix](/governance/service-decision-owner-matrix.md)
7. [Open issues and required inputs](/website/open-issues-and-required-inputs.md)
8. [Content readiness dashboard](/website/content-readiness.md)

# Bundle Commands

Run from the repository root:

```bash
python scripts/validate_okf.py knowledge
python scripts/tnx_validate.py knowledge
python scripts/okf_cli.py --bundle knowledge index
python scripts/okf_cli.py --bundle knowledge find "carbon ecosystem"
python scripts/okf_cli.py --bundle knowledge read services/carbon-and-ecosystem-services/overview
python scripts/generate_inventory.py knowledge --tree
```

# Before Planning Website Pages

Produce:

* a proposed site map;
* a content-to-component model;
* a list of stable versus draft concepts being used;
* a list of missing decisions;
* a list of claims requiring external research or human approval.

Do not begin final copy or component implementation until the user approves the plan.

# Content Boundaries

| Rule | Enforcement |
|---|---|
| Stable concepts must not contain `[agent-draft]` sections | `tnx_validate.py` |
| No `publication.audience: public` without named approver | `tnx_validate.py` |
| C&ES offering descriptions blocked until owner approval | `tnx_validate.py` |
| No deprecated `publication_status` or `publication_permission` fields | `tnx_validate.py` |
| No `status:` values other than `draft`, `stable`, `deprecated` | `tnx_validate.py` |
