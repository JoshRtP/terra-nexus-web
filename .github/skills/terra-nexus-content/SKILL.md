---
type: Skill
name: terra-nexus-content
description: 'Work with the Terra Nexus knowledge bundle: find concepts, draft service or audience content, and validate against governance rules. Use when writing, editing, or auditing any page, service description, expertise area, audience profile, or brand content in this workspace. Enforces mandatory editorial and governance constraints (source precedence, no invented claims, approval gates) and follows the OKF CLI search-then-propose workflow.'
argument-hint: 'Describe the content task, e.g. "draft a page for regenerative agriculture expertise" or "find all services linked to food waste"'
---

# Terra Nexus Content Skill

## When to Use

- Writing or editing any page in `services/`, `expertise/`, `audiences/`, `brand/`, or `website/`
- Auditing existing content against governance rules
- Finding which concepts, services, or audiences are relevant to a topic
- Proposing a new content structure or page map
- Checking whether a piece of content is approved for publication

## Mandatory Constraints

These rules are non-negotiable and apply on every task:

1. **Source precedence**: Read `governance/source-precedence.md` before resolving any conflict between files.
2. **Authoritative sources**: Treat the four source documents and `references/decisions/confirmed-knowledge-architecture.md` as ground truth.
3. **Five service families**: Never add, remove, or rename a service family without explicit user approval.
4. **Service organization**: Organize content by client function and decision owner (see `governance/service-decision-owner-matrix.md`).
5. **Areas of Expertise**: Keep as topic-led market entry points and calls to action (not a service list).
6. **Who We Work With**: Keep as the audience/value-chain taxonomy only.
7. **Lines of business**: Advise, Manage, and Operate are always separate — never merge them.
8. **No invented claims**: Do not fabricate case studies, outcomes, credentials, standards experience, partnerships, or market positions.
9. **Carbon & Ecosystem Services gate**: Do not publish sub-offering descriptions for this family until the user explicitly approves them.
10. **Draft marking**: Mark any generated interpretation as `status: draft` and include a `generated:` provenance block.
11. **External facts**: Use current authoritative external sources for regulations, programs, and standards — do not rely on training data.
12. **Surface contradictions**: Never silently resolve a conflict or fill a gap — flag it to the user.
13. **Many-to-many links**: Build cross-links among topics, services, audiences, and proof wherever content is created or edited.

## Procedure

### Step 1 — Orient

Open `index.md` to load the knowledge graph entry point and confirm workspace structure before searching.

### Step 2 — Search

Use the OKF CLI to locate relevant concepts:

```
python okf_cli.py find "<query>"
```

Run targeted searches for the topic, any related service families, and any audience segments that may be in scope.

### Step 3 — Read Sources

Open the stable concept files returned by the search. For each concept, also read its listed `sources` to confirm provenance. If a concept is marked `status: draft`, treat it as provisional.

### Step 4 — State Intent

Before writing any content, state:
- Which concepts will be used and from which files
- Which source documents support them
- Any gaps or missing approvals that were discovered

### Step 5 — Check Approvals

Verify:
- Carbon & Ecosystem Services content → gate applies (Step 2 of mandatory constraints)
- New service family or line-of-business structure → requires user approval
- External claims (standards, partnerships, market data) → requires an authoritative citation

### Step 6 — Propose

Present a structured proposal to the user before writing:
- Outline the content or change
- Identify which mandatory rules apply
- Flag any missing inputs that would block publication

Only proceed to implementation after the user confirms.

### Step 7 — Implement

Write or edit content following the approved proposal. Apply `status: draft` and `generated:` frontmatter to all generated output. Build cross-links per Rule 13.

### Step 8 — Validate

After writing, self-check against each mandatory constraint. Report any rule that could not be fully satisfied and what input is needed to resolve it.

## Key Files

| File | Purpose |
|------|---------|
| `index.md` | Knowledge graph entry point — start here |
| `governance/source-precedence.md` | Conflict resolution rules |
| `governance/service-decision-owner-matrix.md` | Service/audience ownership |
| `governance/advise-manage-operate.md` | Lines of business definitions |
| `references/decisions/confirmed-knowledge-architecture.md` | Authoritative architecture record |
| `references/source-documents/service-architecture.md` | Authoritative service structure |
| `references/source-documents/topics-and-value-chains.md` | Authoritative audience taxonomy |
| `references/source-documents/core-messaging-and-branding.md` | Authoritative brand voice |
| `website/editorial-and-evidence-rules.md` | Publication evidence standards |
| `website/open-issues-and-required-inputs.md` | Pending approvals and blockers |

## Example Prompts

- `/terra-nexus-content Draft the expertise page for regenerative rangeland`
- `/terra-nexus-content Find all services and audiences linked to food waste`
- `/terra-nexus-content Audit the sustainable supply chain service page against governance rules`
- `/terra-nexus-content What approvals are needed before publishing the carbon services content?`
