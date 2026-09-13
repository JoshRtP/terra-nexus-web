# Capabilities & Approach — pre-launch assessment and plan

**Written** 2026-09-13, at the end of the Who We Work With consolidation session.
**Status** Assessment complete, plan proposed, **not started**.
**Branch at time of writing** `feature/who-we-work-with-consolidation`, 36 commits
ahead of `main`, working tree clean, full gate green.

---

## 1. Why this is on the list

The homepage, the nine Expertise topics and Who We Work With now share one visual
and structural language: `.split-header` section headers, maroon `.eyebrow`
labels, one card geometry, a fixed right-margin `SectionRail`, and a light-blue
`ClosingCta`. The Capabilities side has not moved, so it is now the one part of
the site that looks like it came from somewhere else.

The owner's framing, which the assessment below supports: the Capabilities tree
goes **two levels deeper than the homepage** (`/` → `/capabilities/` →
`/capabilities/<slug>/`), and the second level may not earn its own page.

---

## 2. Current state

### Routes

| Route | Lines | Renders |
|---|---|---|
| `/capabilities/` | 127 | Hub: 6 hand-rolled "workstreams", 5 capability cards, a short closing section |
| `/capabilities/carbon-and-ecosystem-services/` | 319 | **Hand-rolled.** Own hero, `MechanismSelector`, lifecycle grid, offerings, comparison band |
| `/capabilities/corporate-sustainability/` | 98 | `CapabilityPage` template |
| `/capabilities/financial-investments-and-new-venture-development/` | 81 | `CapabilityPage` template |
| `/capabilities/strategy-and-innovation/` | 108 | `CapabilityPage` template |
| `/capabilities/sustainable-supply-chain-and-operations/` | 113 | `CapabilityPage` template |

`components/CapabilityPage.astro` (257 lines) renders: hero, orientation, an
optional callout, offerings (two-level), a proof link, related expertise, CTA.

### Content volume — these pages are NOT thin

Line count is misleading. Each templated page carries a two-level service
taxonomy:

| Capability | Offering groups × sub-offerings | Named items |
|---|---|---|
| Strategy & Innovation | — | **40** |
| Sustainable Supply Chain & Operations | — | **38** |
| Corporate Sustainability | — | **33** |
| Financial Investments & New Venture Development | — | **21** |
| Carbon & Ecosystem Services | own structure | ~8 offerings + 4 mechanisms |

**This is the single most important fact for planning.** Unlike the Who We Work
With group pages — which were genuinely thinner than the homepage teaser that
linked to them — these pages hold real depth. A naive "collapse it all into one
scroll" would produce a page with ~130 named sub-offerings on it. That is not
the same job as the last one and should not be planned as if it were.

### Content sources available

`knowledge/services/` holds **45 governed records** across all five families,
each family with its own `website-brief.md`:

| Family | Records |
|---|---|
| carbon-and-ecosystem-services | 10 (incl. brief, overview) |
| sustainable-supply-chain-and-operations | 10 |
| strategy-and-innovation | 9 |
| corporate-sustainability | 8 |
| financial-investments-and-new-venture-development | 7 |

Same situation as the Expertise migration: this is assembly and verification,
not authoring.

---

## 3. Findings

### F1 — The hub duplicates the lifecycle, with different names (highest severity)

`/capabilities/index.astro` defines a local `workstreams` array of six items.
`src/data/lifecycle.ts` exports `stages`, also six. They are the same six stages
**with different titles**:

| `lifecycle.ts` `stages` (homepage + all 9 expertise pages) | `/capabilities/` local `workstreams` |
|---|---|
| Evaluate the Opportunity | Evaluate the Opportunity ✅ |
| Design the Structure & Value Architecture | Design the Program ❌ |
| Build the Operating & Evidence Infrastructure | Build the Operating Infrastructure ❌ |
| Launch & Scale | Launch and Scale ✅ |
| Operate, Verify & Improve | Manage Client-Owned Programs ❌ |
| Connect Performance to Specific Claims & Market Value | Connect Performance to Claims and Market Value ❌ |

So the firm's own six-stage method is named one way on the homepage and on every
expertise topic, and a different way on the page whose entire job is to explain
it. This is the identical failure mode that made Who We Work With read as thin —
two parallel content sets, and the deeper page holding the weaker one.

**This must be fixed before launch regardless of which structural option is
chosen.**

### F2 — Carbon & Ecosystem Services is a different site

It is the only capability page not using `CapabilityPage`. It has its own hero
(`.cs-hero`), its own header-split pattern (`.cs-header-split`), its own
lifecycle grid, its own comparison band — 57 occurrences of locally-scoped `cs-`
classes. It predates `.split-header`, the card primitives and `ClosingCta`
conventions.

It is also the best page in the section. The `MechanismSelector` is genuinely
good and is already shared with the expertise template.

### F3 — A placeholder is live

`/capabilities/carbon-and-ecosystem-services/` contains:

```
<div class="cs-hero-photo" role="img" aria-label="Working landscape or supply chain — photo placeholder, real photography pending">
  <span class="cs-photo-caption">Photo — working landscape / supply chain</span>
```

A visible "Photo — working landscape / supply chain" placeholder is on a page
that is publicly crawlable today. **Launch blocker.**

### F4 — Five nav entries, one destination

`claimsMenu` in `nav-data.ts` renders the Capabilities mega-menu's "Markets &
Claims" column as five items — Carbon & Ecosystem Credits, Scope 3 & Insets,
Product & Commodity Claims, Environmental Attribute Certificates, Other Markets
— and **all five point at the same URL and the same anchor**
(`/capabilities/carbon-and-ecosystem-services/#mechanisms`). Four of the five
are the mechanisms the `MechanismSelector` already has per-mechanism state for,
so real deep links are achievable rather than aspirational.

### F5 — Mechanism content is duplicated between sections

The four market pathways are described in `MechanismSelector` on the C&ES
capability page **and** in section 08 of all nine expertise topics (from each
topic's own `pathways` data). Two descriptions of the same four mechanisms,
maintained separately. Not wrong today, but it will drift, and it is the same
class of problem as F1.

### F6 — No cross-links from capabilities to anywhere

The expertise topics now link to audiences *and* capabilities. Who We Work With
links to expertise. The capability pages link to `/expertise/` generically at
best; `relatedExpertise` is defined in the `CapabilityPage` props but is
**empty on all four** templated pages. So capabilities are a dead end.

### F7 — Design-system drift

Across the six pages: `.section-header` without `.split-header` (so the same
~45% dead-space problem the homepage had), `card-plain` and `card` used without
the M7 modifiers, hand-rolled header splits on C&ES, and no `SectionRail`
anywhere despite `/capabilities/` being a candidate for one.

---

## 4. Options

### Option A — One long `/capabilities/` page, five capability sections

Mirrors what was just done for Who We Work With. Retire the five child routes,
redirect them to anchors.

*Against:* ~130 named sub-offerings on one page. Who We Work With is already
~15,000px with 14 blocks of roughly five rows each; this would be substantially
longer. The service taxonomy is also the kind of content people scan for a
specific term, which a single scroll serves badly.

### Option B — Keep five child pages, align them to the system ⭐ **recommended**

Fix F1–F7, rebuild the four templated pages on the current design language,
bring C&ES onto it too, and make `/capabilities/` a genuine hub rather than a
thin index.

*For:* The content justifies the depth here in a way Who We Work With's group
pages did not. It is also much lower risk: no redirects, no anchor preservation,
no nav rewrite.

### Option C — Hybrid: one page, mechanisms and lifecycle promoted up ⭐ **worth considering**

Consolidate `/capabilities/` into one scrolling page that carries the **approach
(six stages), the four market mechanisms, and the five capability families at
summary depth** — then keep the five child pages purely as the deep service
taxonomies for people who want them.

*For:* Fixes the alignment problem at the level the owner actually sees, without
either flattening 130 sub-offerings onto one page or leaving the second level
unvisited. The hub becomes the page worth reading; the children become
reference.

**Recommendation: Option C, with Option B's fixes applied to the children.**
Decide this with the owner before building — it is the one genuinely open
question.

---

## 5. Plan

### Phase 0 — Owner decisions (blocking)

1. **Option B or C?** (See §4. Recommendation: C.)
2. **Does `/capabilities/<slug>/` survive?** If Option A were chosen instead,
   five routes need redirects and `capabilitiesMenu` needs rewriting.
3. **C&ES photo** (F3): supply real photography, or the placeholder is removed
   and the hero restructured without it. Cannot ship as-is.
4. **`claimsMenu`** (F4): should the five entries deep-link to real per-mechanism
   anchors, or collapse to one entry?

### Phase 1 — Data consolidation (no visual change)

- Delete the local `workstreams` array from `/capabilities/index.astro`; render
  from `stages` in `data/lifecycle.ts` (**fixes F1**).
- Move the four templated pages' `data` objects into
  `src/data/capabilities/<slug>.ts`, one module per family, plus an `index.ts`,
  mirroring `data/expertise/`.
- Lift C&ES's offerings and mechanism content into the same shape so all five
  are described by one data structure.
- Populate `relatedExpertise` on all five from `knowledge/services/*/website-brief.md`
  (**fixes F6, forward direction**).
- Add the inverse mapping so expertise topics can link back to capabilities, the
  way `segmentsForExpertise` already does for audiences (**F6, reverse**).
- Decide the single home for mechanism copy (**F5**) — recommend the expertise
  `pathways` data becomes the source and `MechanismSelector` reads from it.

### Phase 2 — Page build

Depending on Phase 0:

- **Option C:** rebuild `/capabilities/` as one scrolling page — hero, the six
  stages at real depth, the four mechanisms via `MechanismSelector`, the five
  families at summary depth each linking to its child page, closing band. Add a
  `SectionRail` (the component is already extracted and shared).
- Rebuild the four templated pages on the current language: `.split-header`
  headers, maroon `.eyebrow` labels, one card geometry, `<details>` accordions
  for sub-offerings (the taxonomy is long — this is exactly the case accordions
  are for), `ClosingCta` with onward links including the glossary.
- Bring C&ES onto the same system, retiring its 57 local `cs-` classes in favour
  of the shared primitives. Keep `MechanismSelector` — it is good and shared.

### Phase 3 — Navigation and cross-linking

- Resolve `claimsMenu` per Phase 0 decision 4.
- Add "Who This Matters To"-style connectors between capabilities, expertise and
  audiences so all three families interlink.
- Confirm every mega-menu link resolves to a rendered id (the Who We Work With
  session added exactly this check; reuse the approach).

### Phase 4 — Verification

Root `CLAUDE.md` gate: `npm run web:build`, `npm run web:typecheck`,
`npm run web:test`, `npm run check`. Browser QA at 1440/1024/768/390 with
screenshots in `artifacts/qa/`. Add tests parameterised over the five capability
slugs, mirroring `test/expertise-topic-template.test.ts`.

---

## 6. Launch blockers, restated

1. **F3** — the visible photo placeholder on a crawlable page.
2. **F1** — the firm's six-stage method named two different ways.
3. **F4** — five nav items pointing at one anchor.

Everything else is quality, not correctness.

---

## 7. Things to carry over from the last session

- `.split-header` lives in `design-system.css` and **must stay after
  `.section-header .section-lead`** — equal specificity, source order decides.
  There is a comment saying so. Moving it re-breaks the homepage.
- `SectionRail.astro` is extracted and shared. It hides labels below 100rem by
  measurement: a labelled rail is 201px and the margin beside a 75rem container
  at 1440 is 144px. An `alwaysShowLabels` option was tried and removed the same
  day. Do not reintroduce it.
- The expertise template tests key off `<section class="section…" id="…">`.
  Connector bands must not use that shape.
- `--color-text-muted` (#94a3b8) is **2.56:1 on white and fails AA**. Use
  `--c-secondary-500` (4.76:1).
- The blanket `.insight-body :global(p:not(…))` rule outranks MDX components'
  own colour rules. Any new MDX component setting colour on a `<p>` must be
  added to that exclusion list. It has bitten three times.
