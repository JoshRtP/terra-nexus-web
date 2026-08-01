# Contributing to the Terra Nexus Repository

## Before You Start

1. Read `AGENTS.md` for mandatory governance rules.
2. Read `knowledge/governance/source-precedence.md` for conflict resolution.
3. Confirm you are not modifying approved source document mirrors in `knowledge/references/source-documents/`.

## Development Setup

```bash
# Requires Python 3.10+
python -m pip install -e ".[dev]"
```

## Running Validators Locally

Both validators must pass before submitting a PR:

```bash
python scripts/validate_okf.py knowledge     # OKF structural conformance
python scripts/tnx_validate.py knowledge     # Terra Nexus domain rules
python -m pytest tests/ -v                   # Unit tests
python scripts/generate_inventory.py knowledge --check --tree   # Inventory freshness
python scripts/sync_skills.py --check        # Skill sync check
```

## Adding Knowledge Content

### New OKF Concept File

1. Choose the correct directory under `knowledge/` based on concept type.
2. Use the OKF frontmatter template from `knowledge/references/okf/open-knowledge-format-v0-2.md`.
3. Required frontmatter fields: `type`, `status`, `generated.by`, `generated.at`.
4. Default `status: draft`.
5. For agent-generated interpretation, use `status: draft` and label sections `[agent-draft]`.
6. **Never add `[agent-draft]` sections to files marked `status: stable`.**
7. Use bundle-relative path IDs for relationship fields (e.g. `services/carbon-and-ecosystem-services`), not display names.

### New Draft Website Brief

- Place in `knowledge/services/<family>/website-brief.md` or `knowledge/expertise/briefs/<topic>-brief.md`.
- Use `status: draft`.
- Set `publication.audience: internal, publication.state: blocked`.

### New Proof Record (Case Study, Qualification)

1. Copy `knowledge/case-studies/intake-templates/universal-proof-intake.md`.
2. Fill in all fields. Leave `publication.approved_by: null` and `confidentiality: unconfirmed`.
3. Submit as a PR — owner must review and confirm disclosure before merge.
4. Owner sets `publication.audience`, `approved_by`, and `approved_at`.

## Publication Approval

Only the Terra Nexus owner may approve content for publication:

- Set `publication.audience: public`
- Set `publication.state: approved`
- Set `publication.approved_by: human:<identifier>`
- Set `publication.approved_at: <ISO 8601 UTC timestamp>`

No agent, developer, or contributor may self-approve publication.

## Carbon & Ecosystem Services Gate

All seven C&ES offering descriptions (`knowledge/services/carbon-and-ecosystem-services/`) carry `publication.state: blocked`. Do not change this without explicit owner approval of each individual offering description.

## Updating Inventory After Changes

After adding or modifying OKF files, regenerate the inventory:

```bash
python scripts/generate_inventory.py knowledge --tree
```

Commit the updated `knowledge/bundle-inventory.json` and `knowledge/TREE.txt` with your changes.

## Updating the Skill

The canonical skill is `.github/skills/terra-nexus-content/SKILL.md`. After editing it, sync to the generated copy:

```bash
python scripts/sync_skills.py
```

Commit both files together.

## Recommended GitHub Branch Protection

Apply these settings to the `main` branch before publishing any content:

- Require pull request reviews before merging: **YES** (minimum 1)
- Required status checks: `knowledge-checks / OKF + Domain Validation`
- Require branches to be up to date before merging: **YES**
- Do not allow force pushes: **YES**
- Do not allow deletions: **YES**
- Restrict pushes to `main` to owner only: **YES**

See `.github/CODEOWNERS` — update the placeholder usernames before enabling.
