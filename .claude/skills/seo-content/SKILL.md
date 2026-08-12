---
name: seo-content
description: Metadata, canonical URLs, schema, sitemap, redirects, internal linking for this repo. Use when routes, page metadata, or content structure change.
---

# SEO / Content Discoverability

## Current state (audited 2026-08-12)

- `robots.txt` is dynamic (`apps/web/src/pages/robots.txt.ts`): emits
  `noindex,nofollow` + disallow when `TNX_BUILD_MODE=preview`, otherwise
  normal. No sitemap generator installed yet.
- Route table lives in `docs/architecture/web-platform-architecture.md` §3
  — treat it as the current canonical URL list.
- Case-study routes are dynamically generated from the OKF knowledge graph
  (`case-studies/[slug].astro`, `prerender = true`) — slugs come from OKF
  record data, not hand-authored.
- No analytics provider configured yet (open decision — flag to owner
  before adding one).

## Rules

1. Any route rename/removal needs either URL preservation or an explicit,
   documented redirect — check the current route table first.
2. Metadata (title/description/canonical) should stay editable through
   whatever the active content system is (OKF today, possibly Keystatic
   later) — don't hardcode SEO metadata into a page component when it
   belongs with the content record.
3. Structured data / schema.org markup: add per content-type
   (Article/CaseStudy/Organization) only when there's a real page to attach
   it to — don't scaffold empty schema.
4. Preserve `TNX_BUILD_MODE=preview` behavior (noindex on previews) — never
   let a preview/staging deploy get indexed.
5. Internal linking should follow the existing site taxonomy already
   encoded in OKF (Capabilities / Expertise / Who We Work With / Case
   Studies) — don't invent a parallel nav structure.
6. Before a WordPress content migration (§8/M8), validate canonical tags,
   titles, descriptions, structured data, sitemap and redirects — this is a
   distinct milestone, not something to do incidentally while building a
   page.
