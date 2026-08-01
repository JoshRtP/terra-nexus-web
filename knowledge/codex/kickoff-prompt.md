---
type: Prompt
title: Codex Website Build Kickoff Prompt
description: A ready-to-use prompt for starting a Codex website project with this
  knowledge bundle.
tags:
- codex
- prompt
- website-build
status: draft
generated:
  by: openai/gpt-5.6-thinking
  at: '2026-08-01T20:48:00Z'
sources:
- id: confirmed-architecture
  resource: /references/decisions/confirmed-knowledge-architecture.md
  title: Confirmed Terra Nexus Knowledge Architecture
  author: human:terra-nexus-owner
---

# Prompt

Use the Terra Nexus OKF bundle in this repository as the source of truth for brand, services, expertise topics, audiences, and content governance.

First:

1. Read `AGENTS.md`, `index.md`, and `codex/start-here.md`.
2. Validate the bundle with `python validate_okf.py .`.
3. Review the stable concepts and the open-issues document.
4. Propose the site map, content model, component architecture, and implementation plan.
5. Identify every place where approved content is missing or where current external research is required.
6. Do not invent clients, case studies, outcomes, credentials, regulatory facts, standards claims, or final brand language.
7. Preserve these distinctions:
   * services = client function / decision owner;
   * expertise topics = market-facing calls to action;
   * audiences = who Terra Nexus works with;
   * Advise / Manage / Operate = lines of business;
   * case studies and qualifications = proof.
8. Wait for approval before writing final website copy or implementing production pages.
