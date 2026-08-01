## Pull Request Checklist

### Type of change

- [ ] Knowledge content (new or updated OKF concept)
- [ ] Draft website brief (new or updated)
- [ ] Proof record (case study, qualification, intake form)
- [ ] Script or tooling change
- [ ] Schema update
- [ ] Documentation update
- [ ] CI / workflow change

---

### Content changes (complete if adding or modifying knowledge content)

- [ ] All new concept files have OKF-conformant frontmatter (`type`, `status`, `generated.by`, `generated.at`)
- [ ] New content marked `status: draft` until owner-approved
- [ ] Agent-generated sections labeled `[agent-draft]`
- [ ] Stable concept files do NOT contain `[agent-draft]` body sections
- [ ] `publication.audience` is `internal` for all new records (not `public`)
- [ ] `publication.approved_by` is `null` for all new records (not yet approved)
- [ ] New proof records have `confidentiality: unconfirmed`
- [ ] No illustrative company examples presented as Terra Nexus clients
- [ ] No invented case study outcomes, credentials, or market claims
- [ ] Relationship fields use bundle-relative path IDs (e.g. `services/carbon-and-ecosystem-services`), not display names
- [ ] Carbon & Ecosystem Services offering descriptions carry `publication.state: blocked` (or owner-approved if applicable)
- [ ] Source document mirrors in `knowledge/references/source-documents/` have NOT been modified

### CI checks (must all pass before merging)

- [ ] `python scripts/validate_okf.py knowledge` exits 0
- [ ] `python scripts/tnx_validate.py knowledge` exits 0
- [ ] `python -m pytest tests/ -v` passes
- [ ] `python scripts/generate_inventory.py knowledge --check --tree` exits 0
- [ ] `python scripts/sync_skills.py --check` exits 0

### If adding a case study or proof record

- [ ] Owner has confirmed the disclosure level (`publication.audience`)
- [ ] Owner has confirmed whether the client name may be used
- [ ] `publication.approved_by` is set to a named approver
- [ ] `publication.approved_at` is set to the approval date

### Notes for reviewers

<!-- Add any context about this PR, decisions made, or items that require
     owner attention before merging. -->
