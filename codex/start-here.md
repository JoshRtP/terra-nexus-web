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
  by: openai/gpt-5.6-thinking
  at: '2026-08-01T20:48:00Z'
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

1. [Root index](/index.md)
2. [Source precedence](/governance/source-precedence.md)
3. [Confirmed knowledge architecture](/references/decisions/confirmed-knowledge-architecture.md)
4. [Brand platform](/brand/brand-platform.md)
5. [Brand usage rules](/brand/brand-usage-rules.md)
6. [Service decision-owner matrix](/governance/service-decision-owner-matrix.md)
7. [Open issues and required inputs](/website/open-issues-and-required-inputs.md)
8. The relevant service, topic, audience, and source concepts for the task.

# Before Coding

Produce:

* a proposed site map;
* a content-to-component model;
* a list of stable versus draft concepts being used;
* a list of missing decisions;
* a list of claims that require external research or human approval.

Do not begin final copy or component implementation until the user approves the plan.

# Use the Bundle

```bash
python okf_cli.py index
python okf_cli.py find "carbon ecosystem"
python okf_cli.py read services/carbon-and-ecosystem-services/overview
python validate_okf.py .
```
