# Pre-launch plan

**Written** 2026-09-13, immediately after PR #20 merged to `main` (Who We Work
With consolidation, Capabilities rebuild, Tier 1 SEO). Everything below is
what still stands between the current `main` and moving `terra.nexus` off
WordPress. Items are grouped by what blocks launch outright, what the site
needs to say before it is worth launching, and what should be measured
before and after. Each item names who can do it: **agent** (no owner input
needed), **owner** (a decision or an asset only the owner has), or **joint**.

Related: `capabilities-depth-seo-ux-plan.md` (Tier 1b findings),
`contact-form-production.md`, `website-foundation.md` §"Legacy redirects",
`docs/architecture/web-platform-architecture.md` §9 (M8–M10).

---

## A. Launch blockers — the site cannot go live without these

| # | Item | Who | Notes |
|---|---|---|---|
| A1 | **WordPress URL inventory and 301 map** | joint | Nothing exists yet. `website-foundation.md` requires a human-reviewed inventory of every current URL with status, destination, query handling and loop checks, plus a rollback plan, and forbids inferring redirects from titles. Agent crawls the live site and drafts the map; owner reviews it. Redirect tests then cover every reviewed URL. The single largest SEO risk at cutover. |
| A2 | **Contact form credentials** | owner | Code is complete and tested (`contact-form-production.md`). Nothing sends until Turnstile and Resend keys are provisioned as Wrangler secrets. Then one live end-to-end send on the preview Worker. |
| A3 | **A 404 page** | agent | `src/pages/` has no `404.astro`, so a mistyped or stale URL gets the Worker's bare default. Needs the site chrome, a search-free "here is where things are" list, and the noindex the layout already applies in preview. |
| A4 | **Production Worker, domain and DNS plan (M10)** | owner + agent | `main` deploys to `terra-nexus-web-preview`. Cutover needs the production Worker/route or custom-domain configuration confirmed in `wrangler.jsonc`, `robots.txt` and the sitemap verified indexable on the production origin, and the DNS change itself, which is owner-authorised only. Write the runbook before the day. |
| A5 | **Analytics** | owner decides, agent wires | Nothing is installed. Without a baseline from day one there is no way to tell what the migration did. Cloudflare Web Analytics is zero-config and cookie-free; GA4 needs a consent decision. Pick one before A4. |
| A6 | **Oversized and stray assets in `public/`** | agent | `images/live-site/terranexus-colorway-palette-sheet.png` is 16 MB and ships to production; `images/image.png` (1.6 MB) and `image copy.png` have no descriptive name; several 1.3–1.4 MB PNGs in `live-site/` may be unreferenced. Move design references out, delete or rename the rest, and add a test that no served image exceeds a size budget. Both were listed as known issues in `CLAUDE.md` and have not moved. |

## B. Content the site needs before it is worth launching

| # | Item | Who | Notes |
|---|---|---|---|
| B1 | **Digital Solutions page onto the site's logical structure** | joint | See §C below. The page is a 1,181-line hand-rolled composition with its own product arrays, while `data/expertise/tools.ts` already holds the same eight tools as a catalogue. Two sources for one set of products, the same pattern the Capabilities work just removed. |
| B2 | **Tool-to-topic assignment** | owner | `enablers.tools` is empty on seven of nine expertise topics, so section 10 ("Tools & Enablers") and its rail entry render on only two. `tools.ts` lists the ids and the obvious candidates (Food Waste Platform → Food Waste; Biofuels Origination → Low Carbon Energy). A product-truth call, not the agent's. Unblocks B1's cross-links in both directions. |
| B3 | **Offering narratives for four families** | owner | Worksheets in `plans/content/capabilities-2026-09/`, about an hour each. Without them the four classic family pages stay at 700–1,000 words of taxonomy while C&ES carries 3,000 words of narrative. |
| B4 | **C&ES open approvals** | owner | Each of the seven approved records still lists "Information Requiring Owner Approval": advise-only versus manage/operate, registries and MRV platforms worked with, named engagements. Nothing rendered depends on them, but the Advise/Manage/Operate answer is also template section 9 on every family page. |
| B5 | **Proof** | owner + agent | One approved case study, reached by a sentence on each family page. Migrate Case Studies off OKF to Keystatic (M8, open) and start intake on two more (`knowledge/case-studies/intake-templates/`). Peers carry three to nine per service page. |
| B6 | **Insights** | owner + agent | One real post (`climate-week-2026.mdx`). The Insights mega-menu advertises Blog and Research. Either three or more posts exist at launch or the menu is pared to what is real. |
| B7 | **About page tiles** | agent verified | The "three placeholder tiles" comment at `about/index.astro:690` is stale wording from the 2026-08-18 design pass; the tiles carry finished copy. `_original-backup.astro` is not routable (Astro ignores `_`-prefixed files). No action. |

## C. The Digital Solutions page — assessment for the joint session

**What is there now.** Hero, an office-desk showcase, "Eight Tools, One
Evidence Chain", then three sections grouped Quantify → Verify →
Commercialize (3 + 2 + 3 products), a closing suite figure, a colourway
switcher footnote, and the closing band. Products are inline arrays with a
`tool` id, a device `kind`, a title and a one-sentence summary. It is well
made and the owner reviewed it twice in September; the assets are the best
on the site.

**Why it reads as outdated against the expertise structure.** The nine
topics now follow one argument in a fixed order: what the potential is,
what goes wrong, what to invest in, what pays for adoption, whether the
program fits, how performance is verified, how it reaches a market, how it
is delivered, and which tools enable it. Every section renders from a
typed record, every topic links to audiences and capabilities, and a rail
gives the reader position. The tools page predates all of that: it groups
by function rather than by the decision a buyer is making, its products
are not records, and it links nowhere. A reader on Regenerative Agriculture
who reaches section 10 can click through to a tool; a reader on the tools
page cannot get back to the topics or capabilities that tool serves.

**Three options to decide between together.**

1. **Data first, composition kept.** Move the eight products into
   `data/tools/` (merging with `tools.ts`, one record per tool with name,
   what it measures, which lifecycle stages and market mechanisms it
   serves, which topics use it), give each tool a stable anchor, and add a
   "Where this tool works" connector under each product linking to the
   topics (from B2) and capabilities. Page composition and imagery
   unchanged. Lowest risk; closes the two-source problem and the dead end.
2. **Rebuild on the shared vocabulary.** Option 1 plus the page rebuilt on
   `.split-header`, `.card-entry`, `SectionRail` and `ClosingCta` with
   links, the way the hub was. Grouping axis is the open question: keep
   Quantify → Verify → Commercialize (the owner's 2026-09 decision), or
   align to the six lifecycle stages the rest of the site uses, or to the
   four market mechanisms. Recommendation: keep the three groups as the
   page's sections and show each tool's stage and mechanism as labelled
   fields inside its card, so the page keeps its own logic while speaking
   the site's.
3. **Tool detail pages.** One route per tool with the expertise-style
   depth. Not recommended before there is more to say per tool than the
   screens show; the governance rule against describing capabilities the
   product does not visibly have applies with force here.

Recommendation: option 2, done as two commits (data, then composition),
after B2 so the connectors are real on day one.

## D. Performance and SEO, from the Lighthouse baseline

| # | Item | Who | Notes |
|---|---|---|---|
| D1 | **Self-host the fonts** | agent | The Google Fonts stylesheet render-blocks every page, 1.1–2.7 s of estimated savings on mobile; the hub's LCP element is its hero paragraph waiting on it. One change in `design-system.css`, plus a preload. Largest single site-wide win. |
| D2 | **Self-host the hero photography** | owner licence check, agent | Expertise heroes and the homepage tiles load from Pexels at request time: a third-party cookie on every one of those pages, a hotlink dependency, and no control over format or size. Download at the sizes the srcset already asks for, serve as WebP from `public/`. Confirm the licence permits it (Pexels' does). |
| D3 | **Homepage mobile** | agent, some M9 | Score 59: 3.5 MB payload, hero image without `fetchpriority`, CLS 0.158 from unsized images, an `h4` heading-order fault in the approach band. The unsized images and heading are quick wins; the hero belongs to M9 but should not ship at 8.4 s LCP. |
| D4 | **Wordmark PNGs** | agent | Header and footer logos are unoptimised on every page (~200 KB combined). Serve WebP at rendered size. |
| D5 | **Structured data, second pass** | agent | `Person` for the About roster, `Article` for Insights posts, `ImageObject` for the tool screens once B1 lands. |
| D6 | **Search Console, IndexNow, drift baseline** | owner + agent | Verify the production origin in Search Console at cutover, submit the sitemap, wire IndexNow, and capture a `seo-drift` baseline the day the site goes live so later regressions are diffs. |
| D7 | **Case-study meta** | owner | The one case-study route's title (90) and description (208) come from the approved OKF record and exceed the snippet limits. Trim in the record. |

## E. Verification before the cutover

- Full-site link and anchor check as a test: every internal `href` and
  every fragment resolves to a built page and an id (the capability test
  does this for the Capabilities menu; extend it to the whole site).
- Lighthouse on every route after D1–D4, all four categories, mobile and
  desktop; accessibility at 100 everywhere (three pages are there now).
- Browser QA at 1440/1024/768/390 on every route family, plus Safari on
  the mechanism and stage selectors, the disclosures, and the rail.
- Redirect tests for every reviewed legacy URL (A1).
- A production-mode build served by Wrangler locally, checked for
  `robots.txt`, sitemap, canonicals and the absence of the preview banner.

**Status 2026-09-13, evening.** Step 1 is done and merged to `main` (PR #21)
(A3, A6, D1, D4, the D3 quick wins, B7 verified, and the §E link test); see
`log.md`. Steps 2–5 stand.

## F. Suggested order

1. **This week, agent-only:** A3, A6, D1, D4, the quick parts of D3, B7,
   and the site-wide link test from §E. None needs a decision.
2. **Owner, in parallel:** A2 credentials, A5 analytics choice, B2 tool
   assignments, the first worksheet from B3, the D2 licence check, D7.
3. **Joint session:** the Digital Solutions page (§C), then A1 (the agent
   drafts the inventory, the owner reviews).
4. **Then:** D2, the remaining worksheets, B5, B6, D5.
5. **Cutover:** A4 runbook, §E in full, D6, DNS.
