# Capabilities depth, peer comparison, and the SEO/UX plan

**Written** 2026-09-13, after Phases 1–2 of `capabilities-consolidation-plan.md`
landed (branch `feature/who-we-work-with-consolidation`, 45 commits ahead of
`main`). Owner question: now that the site is connected end to end, are the
capability pages thin, would research fix that, and what are the highest-value
SEO and UX moves?

---

## 1. Honest assessment of depth — measured, not felt

Visible words per built page (header and footer excluded):

| Page | Words | h3s |
|---|---|---|
| `/capabilities/` hub | 1,704 | 17 |
| Carbon & Ecosystem Services | 1,365 | 15 |
| Strategy & Innovation | 988 | 8 |
| Sustainable Supply Chain & Operations | 926 | 9 |
| Corporate Sustainability | 863 | 7 |
| Financial Investments & New Venture Development | 640 | 6 |
| *for scale:* Regenerative Agriculture (expertise) | 4,094 | 47 |
| *for scale:* Who We Work With | 3,890 | 16 |
| *for scale:* Homepage | 3,708 | 26 |

What the accordions hold:

| Family | Offerings (avg words) | Sub-offerings (avg words, shortest) |
|---|---|---|
| Strategy & Innovation | 6 (14) | 34 (13, min 8) |
| Sustainable Supply Chain & Operations | 7 (10) | 31 (11, min 6) |
| Corporate Sustainability | 5 (10) | 28 (12, min 7) |
| Financial Investments & NVD | 4 (14) | 17 (10, min 5) |
| Carbon & Ecosystem Services | 7 (33) | 0 |

**The verdict.** Yes, the pages are thin, and the restructure made that visible
rather than causing it. The four classic families carry a **menu**, not a
service description: 110 named rows averaging eleven words each. An
eleven-word row like "Prioritize investments for maximum return" tells a
buyer nothing about when they would hire Terra Nexus, what they would receive,
or why this firm. Collapsing those rows into disclosures was the right call
for scanning, but it also means the page's one long block is now 110 rows of
eleven words each, hidden. That is not a design problem to solve with more
CSS.

**Would research fix it? No.** This is the key finding, and it is different
from the expertise migration:

- The expertise topics had 2,200–2,800-word page drafts, research memos and
  owner-verified briefs per topic before anyone touched the template. That is
  why assembly worked there.
- The governed service records for the four classic families
  (`knowledge/services/<family>/*.md`) contain **exactly the same
  one-liners** as the pages. `market-entry-and-competitive-strategy.md` is
  251 words and its sub-offering table is the page's accordion, verbatim.
  There is nothing deeper in the repo to assemble from.
- Research can supply market context (regulations, protocols, market sizes:
  what the expertise pages use it for). It cannot supply what a service page
  needs, which is *what Terra Nexus does, for whom, and what they get*. Only
  the owner knows that. Anything an agent wrote there would be invented
  capability claims, which `AGENTS.md` rule 9 forbids for good reason.

**Two exceptions, both good news:**

1. **Carbon & Ecosystem Services has real draft depth already.** Its seven
   offering records run ~700 words each in a structure the other families
   lack: decision owners, core client question, scope, boundary with other
   families, representative client problems, proposed capabilities, proposed
   deliverables. They are `[agent-draft]`, `state: blocked`, `approved_by:
   null`, and rule 10 says they cannot publish until the owner approves each.
   That review is the single highest-return content task on the site: roughly
   3,500 words of structured service narrative, 70% written, gated only on
   sign-off and correction.
2. **Every family overview carries stable, owner-sourced fields the pages do
   not render**: `decision_owners`, `core_question`, `scope_boundary`. The
   site's own `knowledge/website/page-templates/service-page.md` requires
   eleven sections; the pages render five. Sections 2–4 (Primary Decision
   Owners, Core Decisions, Scope Boundary) can render **today** from
   `status: stable` records with no new copy. That is 60–90 words of real
   substance per page and, more importantly, the frame the template's
   guardrail demands: "explain why this client function buys the work", not
   "a generic list of activities".

**Recommendation.** Stop treating the sub-offering taxonomy as the content.
Treat it as the index. The content that is missing is one level up: an
offering-level narrative, 120–200 words each, in the shape the C&ES drafts
already use (who decides, what question, what you get, when it applies). Six
offerings per family times four families is ~24 short blocks. That is an
owner interview per family, not a research project, and it is the difference
between a page a buyer reads and a page a buyer scrolls.

---

## 2. How peers define services on the web

Four comparable pages, fetched 2026-09-13:

| Firm / page | Words | Services on page, depth each | Proof on page | Cross-links |
|---|---|---|---|---|
| Anthesis, Carbon Insetting | ~1,300 | 4, one paragraph each | 9 named case studies, 2 named experts | 8 related carbon services |
| Anthesis, Regenerative Agriculture | ~1,300 | 4, one paragraph each | 3 case studies, 3 named clients (WWF, Tesco, Nespresso), 4 named experts | Water, Forest, sector pages |
| South Pole, Climate Consulting | ~1,300 | 6, one line each with "Explore solution" to its own page | 3 case studies, ~40 client logos, "500 experts, 20 countries" | Industries, insights, events |
| BCG, Food Systems | ~2,300 | 4 themes, 1–2 paragraphs each | 6 client projects with named clients, 4 named partners, headline statistics | Industries, insights |

Terra Nexus, Strategy & Innovation, for comparison: ~1,000 words; 6 offerings
at 14 words plus 34 sub-offerings at 13 words; one case study referenced by
sentence; no named people; no insights; related expertise tags.

**What the comparison says:**

- **Nobody wins on taxonomy depth.** Peers define **four to six** services per
  page at **one paragraph each**. Terra Nexus defines 40 per page at one line
  each. The peers' pages read as fuller with a quarter of the named items,
  because a paragraph answers "what would you do for me" and a label does not.
- **Credibility comes from proof, not from lists**: case studies, named
  clients, named experts, insights, and scale statements. Terra Nexus has
  governance reasons not to name clients or invent outcomes, and that is
  right. But the proof it *does* have is under-used: one approved case study
  reached by a sentence, an executive roster on the About page that no
  capability page mentions, and an Insights section with no links from
  services.
- **The peers' pages are shorter than the expertise topics here.** The
  expertise pages, at ~4,000 words, are the outlier in the good direction.
  The capability pages at 640–990 are at the low end of the peer range but
  not absurdly so; what is missing is the paragraph per service and the proof
  layer, not another thousand words of taxonomy.
- **The structure Terra Nexus already specified for itself** (the eleven-
  section service-page template: decision owners, core questions, scope
  boundary, representative engagements, Advise/Manage/Operate, proof) is
  *more* buyer-oriented than any of the four peer pages. It just is not
  rendered yet.

---

## 3. Plan: highest-value SEO and UX, in order

Ranked by value divided by effort. "Owner" marks items that cannot proceed
without owner input or approval.

**Status 2026-09-13, later the same day.** Tier 1 items 1 and 4 and Tier 2 item 7
are done (the owner approved all seven C&ES drafts in session). Items 2, 3, 5
and 6 of Tier 1 are the next work; item 8 waits on the owner worksheets.

### Tier 1 — days, no new copy, do next

1. **Render the three stable fields on every family page.** Decision owners,
   core question, scope boundary from each family's `overview.md`, as a
   "Who buys this, what they are deciding, what is in scope" block above the
   offerings. Satisfies template sections 2–4; adds real content; costs
   nothing but assembly. The Advise/Manage/Operate framing (template section
   9, AGENTS rule 7) belongs here too if the owner confirms which lines each
   family offers.
2. **Meta descriptions and titles.** Capability pages run 170–252 characters
   (truncation is ~155); the FI&NVD title is 65. The two reviewed expertise
   topics were already trimmed to 131–135. Do the same across capabilities,
   the hub, Who We Work With and the homepage (all over).
3. **Structured data**, deferred since the `site` config landed and now
   unblocked: `Organization` + `WebSite` on the homepage, `BreadcrumbList`
   site-wide, `Service` on each family page (provider → Organization,
   serviceType per offering), `Person` for the roster, `Article` for
   Insights. No `FAQPage` until a page carries real FAQs. Assert in tests as
   the sitemap is.
4. **Phase 3 of the consolidation plan**: per-mechanism deep links in the
   Markets & Claims menu, Approach link to `#approach`, audience connectors
   on capability pages, and the distinct-destination test.
5. **Stable offering anchors.** `#offering-3` is meaningless outside the
   page. Give each offering a slug id (`#market-entry-and-competitive-
   strategy`) so expertise pathways, the glossary and future insights can
   link to a specific service.
6. **Performance baseline.** Run Unlighthouse over the ~35 URLs (the
   `seo-unlighthouse` skill) and fix anything below 90 before cutover. The
   expertise heroes were already fixed for LCP; the hub's mechanism selector
   and the 16MB palette PNG in `public/` (known issue) are the likely
   findings.

### Tier 2 — weeks, needs the owner

7. **Approve the seven C&ES offering drafts** (owner). Then render decision
   owners, representative client problems and deliverables per offering.
   Biggest single content gain available; already 70% written; gated by
   rule 10.
8. **Offering-level narrative for the four classic families** (owner
   interview, ~1 hour per family). 120–200 words per offering in the C&ES
   draft shape. Sub-offerings become a compact "includes" list under each
   narrative rather than the content itself. Target 1,800–2,500 words per
   page, in line with BCG and above Anthesis.
9. **Proof layer.** Link the approved beef case study from each offering it
   supports, not just a footer sentence. Put the relevant executive(s) from
   the About roster on each family page ("who leads this work"): real
   E-E-A-T signal and zero new claims. Start the intake for two more case
   studies (owner; `knowledge/case-studies/intake-templates/`).
10. **Insights → services.** Once Insights has more than three real posts,
    surface related posts on family and expertise pages via the existing
    `RelatedContent` component.

### Tier 3 — at or after cutover

11. **WordPress URL inventory and 301 map** (M8, still open). This is the
    single largest SEO risk at launch; nothing above matters if the old URLs
    404. Should be done before any of Tier 2 ships.
12. **Search Console, GA4 and IndexNow** wiring at cutover; capture a
    `seo-drift` baseline of the whole site the day it goes live so later
    regressions are diffs, not surprises.
13. **UX on the long family pages.** An in-page "jump to offering" list at
    the top of Strategy & Innovation (34 rows) and Supply Chain (31), and an
    "expand all" control for the disclosures for people who print or search
    the page. Low effort, but only worth doing once Tier 2 gives the rows
    something to expand into.
14. **Do not create sub-offering pages.** 110 pages of eleven words would be
    thin-content at scale. The glossary already covers the terms; link from
    it to the offering anchors (item 5) instead.

---

## 4. Sources for the peer comparison

- Anthesis Group, Carbon Insetting: https://www.anthesisgroup.com/solutions/carbon-credits-and-projects/insetting/
- Anthesis Group, Regenerative Agriculture: https://www.anthesisgroup.com/solutions/nature-positive/regenerative-ag/
- South Pole, Climate Consulting: https://www.southpole.com/what-we-do/climate-consulting
- BCG, Food Systems & Food Security: https://www.bcg.com/capabilities/social-impact/food-systems-food-security
- Sustainable Food Lab's regenerative agriculture page returned 403 and was not used.
- B2B service-page practice, 2026: https://directiveconsulting.com/blog/15-b2b-website-best-practices-for-2026-built-for-buyers-not-just-browsers/ and https://www.madisonmarketing.com/seo-for-b2b-consulting-firms
