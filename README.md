---
type: Repository Guide
title: Terra Nexus Website Knowledge Bundle
description: OKF v0.2 knowledge bundle for planning, writing, and building the Terra
  Nexus website.
tags:
- okf
- terra-nexus
- website
- codex
status: stable
generated:
  by: openai/gpt-5.6-thinking
  at: '2026-08-01T20:48:00Z'
sources:
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
- id: confirmed-architecture
  resource: /references/decisions/confirmed-knowledge-architecture.md
  title: Confirmed Terra Nexus Knowledge Architecture
  author: human:terra-nexus-owner
---

# Terra Nexus Website Knowledge Bundle

This repository is an Open Knowledge Format (OKF) v0.2 bundle for Codex, other AI agents, designers, developers, marketers, and Terra Nexus team members.

It converts three approved background documents into a linked, source-aware knowledge system:

* Terra Nexus Service Architecture
* Terra Nexus Topics and Value Chains
* Terra Nexus Core Messaging and Branding

# Quick Start

```bash
python validate_okf.py .
python okf_cli.py index
python okf_cli.py find "regenerative agriculture"
python okf_cli.py read brand/brand-platform
```

For Codex, begin with [Codex Start Here](/codex/start-here.md).

# Important

* Stable source-derived concepts can be used as background.
* Draft concepts are planning recommendations and require review.
* Illustrative company examples are not client claims.
* The bundle contains known content gaps; see [Open Issues and Required Inputs](/website/open-issues-and-required-inputs.md).
* The original DOCX files are preserved under `references/source-documents/originals/`.
