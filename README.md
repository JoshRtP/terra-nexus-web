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
python -m pip install -e ".[dev]"
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
| `apps/web/` | Static Astro foundation and read-only OKF compiler |

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

## Website Foundation Commands

The workspace uses Astro 6.4.6 and the Node 24.18.0 LTS version recorded in `.nvmrc` (Astro 6 requires Node 22.12.0 or later). See [HOW_TO_ADD_CONTENT.md](HOW_TO_ADD_CONTENT.md) for plain-language guidance.

```powershell
npm ci
npm run content:new -- --type case-study
npm run content:status
npm run content:affected -- services/strategy-and-innovation
npm run content:validate
npm run content:finalize
npm run web:dev
npm run web:build
npm run web:test
npm run check
```

`npm run check` is the complete non-mutating repository check: it runs the OKF and Terra Nexus validators, Python tests, inventory freshness, skill sync, compiler validation, website tests, production build, and type checking. After changing a knowledge record, use `npm run content:finalize` to regenerate `knowledge/bundle-inventory.json` and `knowledge/TREE.txt` before it runs that same complete check. See [HOW_TO_ADD_CONTENT.md](HOW_TO_ADD_CONTENT.md) for the standard owner workflow.

The compiler is read-only for `knowledge/` and `schemas/`. It writes reproducible graph and safe-audit artifacts only to `apps/web/.generated/`, which Git ignores. Sensitive audit records use opaque diagnostic references rather than original confidential or proposal-only IDs. Phase 2B creates no governed-content routes, production deployment, Vercel project, CMS, analytics, or real case study.

## For AI Agents

Start at `knowledge/codex/start-here.md`. Use the `terra-nexus-content` skill. See `AGENTS.md`.

## Important

- Stable source-derived concepts must not contain `[agent-draft]` body sections.
- Draft concepts are planning recommendations requiring owner review before publication.
- Illustrative company examples in audience files are not client claims.
- Known content gaps: `knowledge/website/open-issues-and-required-inputs.md`
- See `HOW_TO_ADD_CONTENT.md` before adding proof or changing publication state.
