---
type: Repository Guide
title: Terra Nexus Website Repository
description: Monorepo containing the OKF knowledge bundle and future website application.
tags:
- repository
- okf
- terra-nexus
- website
status: stable
generated:
  by: github-copilot/claude-sonnet-4-6
  at: '2026-08-01T00:00:00Z'
sources:
- id: confirmed-architecture
  resource: knowledge/references/decisions/confirmed-knowledge-architecture.md
  title: Confirmed Terra Nexus Knowledge Architecture
  author: human:terra-nexus-owner
---

# Terra Nexus Website Repository

This monorepo contains the Terra Nexus OKF knowledge bundle and will house the future website application.

## Quick Start

```bash
pip install -e ".[dev]"
python scripts/validate_okf.py knowledge
python scripts/tnx_validate.py knowledge
python scripts/okf_cli.py --bundle knowledge index
python scripts/okf_cli.py --bundle knowledge find "regenerative agriculture"
python -m pytest tests/ -v
python scripts/generate_inventory.py knowledge --tree
```

## Repository Layout

| Path | Contents |
|---|---|
| `knowledge/` | OKF v0.2 knowledge bundle (governed content source of truth) |
| `scripts/` | Validators, CLI navigator, inventory generator, skill sync |
| `schemas/` | Canonical allowed-value registries |
| `tests/` | Validator tests |
| `plans/` | Project execution plans |
| `.github/skills/` | Canonical agent skill (terra-nexus-content) |
| `apps/web/` | Future website application (not yet created) |

## Content Governance

All new content defaults to `publication.audience: internal, publication.state: blocked`. Nothing becomes public without a named approver in `publication.approved_by`. See CONTRIBUTING.md for the full workflow.

### What Must Never Be Published

- Illustrative company examples presented as Terra Nexus clients
- Invented case studies, credentials, or market claims
- Carbon & Ecosystem Services offering descriptions without individual owner approval
- Content with `publication.state` other than `approved`
- Original `.docx` source documents

## Validation

```bash
python scripts/validate_okf.py knowledge     # OKF structural conformance
python scripts/tnx_validate.py knowledge     # Terra Nexus domain rules
```

## For AI Agents

Start at `knowledge/codex/start-here.md`. Use the `terra-nexus-content` skill. See `AGENTS.md`.

## Important

- Stable source-derived concepts must not contain `[agent-draft]` body sections.
- Draft concepts are planning recommendations requiring owner review before publication.
- Illustrative company examples in audience files are not client claims.
- Known content gaps: `knowledge/website/open-issues-and-required-inputs.md`
- Framework selection for `apps/web/` is Phase 2 and requires owner approval.
