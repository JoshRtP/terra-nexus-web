# Areas of Expertise — Proposed GitHub Integration Map

> Owner approved this document as a first-draft repository baseline on August 3, 2026.
> It is not public-production approval.

**Version:** 0.9

## Revised content model

The repository should preserve five distinct concepts:

1. **Value-chain node / audience** — where the participant sits and Who We Work With.
2. **Area of Expertise** — the topic in which change is pursued.
3. **Service Family** — what Terra Nexus does.
4. **Engagement Model** — Advise, Manage, or a separately approved Operate model.
5. **Proof record** — optional case studies and qualifications.

Cultivation to Claim should be documented as a Terra Nexus framework rather than
added as a `stage` field to each expertise record.

## Proposed new architecture record

Create a governed internal decision record such as:

`references/decisions/cultivation-to-claim-framework.md`

The record should define:

- value-chain nodes;
- Areas of Expertise;
- interventions;
- claim categories;
- participant-specific and shared value;
- cross-topic plays;
- public-content boundaries; and
- the decision not to publish intervention libraries or claim-optimization logic.

## Topic brief updates

Each brief should use:

- `primary_value_chain_nodes`
- `related_audiences`
- `related_services`
- `related_case_studies`
- `engagement_models`

Do not use a field that treats **Cultivated on Land**, **Transformed into Food**,
or similar phrases as Cultivation-to-Claim stages.

## Supporting planning files

Public copy drafts:

`plans/content/<topic-slug>-page-copy.md`

Research and claims memos:

`plans/content/<topic-slug>-research.md`

## Recommended pull-request sequence after owner review

1. Cultivation-to-Claim architecture and shared-language decision record.
2. Agricultural-production topics:
   - Regenerative Agriculture
   - Regenerative Rangeland
   - Agroforestry
   - Aquaculture
3. Cross-cutting connector topics:
   - Biodiversity & Ecosystem Resilience
   - Sustainable Supply Chains
4. Transformation and recovery topics:
   - Purpose-Driven Food Brands & Retailers
   - Food Waste
5. Low Carbon Energy & Biofuels alignment note, without reopening approved copy
   unless the owner requests substantive changes.

## Initial PR boundaries

- content and architecture records only;
- no website implementation;
- no public eligibility changes;
- no requirement for case studies;
- no proprietary intervention or pricing content;
- no client-facing collateral;
- no schema change until the exact metadata requirement is reviewed.
