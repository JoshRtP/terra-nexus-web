---
type: Agent Instructions
title: Instructions for AI Agents
description: Mandatory rules for any agent using this Terra Nexus repository.
tags:
- agent
- codex
- governance
status: stable
generated:
  by: github-copilot/claude-sonnet-4-6
  at: '2026-08-01T00:00:00Z'
sources:
- id: confirmed-architecture
  resource: knowledge/references/decisions/confirmed-knowledge-architecture.md
  title: Confirmed Terra Nexus Knowledge Architecture
  author: human:terra-nexus-owner
- id: service-architecture
  resource: knowledge/references/source-documents/service-architecture.md
  title: Terra Nexus Service Architecture
  author: human:terra-nexus-owner
- id: topics-value-chains
  resource: knowledge/references/source-documents/topics-and-value-chains.md
  title: Terra Nexus Topics and Value Chains
  author: human:terra-nexus-owner
- id: core-branding
  resource: knowledge/references/source-documents/core-messaging-and-branding.md
  title: Terra Nexus Core Messaging and Branding
  author: human:terra-nexus-owner
---

# Mandatory Rules

1. Read `knowledge/governance/source-precedence.md` before interpreting conflicts.
2. Treat the three source-document mirrors in `knowledge/references/source-documents/` and the decision record in `knowledge/references/decisions/confirmed-knowledge-architecture.md` as authoritative. Do not modify these files.
3. Preserve the five service families exactly unless the user approves a change.
4. Organize service content by client function and decision owner.
5. Keep Areas of Expertise as topic-led market entry points and calls to action.
6. Keep Who We Work With as the audience/value-chain taxonomy.
7. Keep Advise, Manage, and Operate as separate lines of business.
8. Do not represent illustrative example companies as Terra Nexus clients.
9. Do not invent case studies, outcomes, credentials, standards experience, partnerships, or market claims.
10. Do not publish Carbon & Ecosystem Services offering descriptions until each has explicit owner approval (`publication.approved_by` non-null).
11. Mark all agent-generated content `status: draft` and label sections `[agent-draft]`. Do not add `[agent-draft]` sections to `status: stable` files.
12. Use current authoritative external sources for changing regulations, programs, company facts, and standards.
13. Surface contradictions or missing inputs instead of resolving them silently.
14. Build many-to-many links using bundle-relative path IDs, not display names.
15. All new content defaults to `publication.audience: internal, publication.state: blocked`. Never set `publication.audience: public` without a named `publication.approved_by`.

# Task Workflow

1. Navigate from `knowledge/index.md`.
2. Search with `python scripts/okf_cli.py --bundle knowledge find "<query>"`.
3. Read the relevant stable concepts and their sources.
4. State which concepts will be used.
5. Identify missing approvals and owner decisions.
6. Propose before implementing.
7. After implementing, run: `python scripts/validate_okf.py knowledge` and `python scripts/tnx_validate.py knowledge`.

# Repository Structure

The OKF knowledge bundle is in `knowledge/`. Scripts are in `scripts/`. The future website application will be in `apps/web/` (not yet created). Do not scaffold or install a web framework without owner approval of the technical stack decision.

# Skill

Use the `terra-nexus-content` skill (`.github/skills/terra-nexus-content/SKILL.md`) for all content tasks.
