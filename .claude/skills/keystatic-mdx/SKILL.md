---
name: keystatic-mdx
description: Keystatic collections/singletons, MDX schema, content components, figures/citations. Canonical CMS for Terra Nexus — installed and live (local storage mode) as of 2026-08-12.
---

# Keystatic + MDX

## Current state (audited 2026-08-12)

**Keystatic + MDX is the canonical content-management architecture** for
Terra Nexus (owner decision, 2026-08-12). It is installed and working in
`local` storage mode:

- `apps/web/keystatic.config.ts` — collections: `posts` (Insights/blog),
  `authors`, `topics` (all fully wired to Astro routes), `caseStudies`
  (schema designed, not yet populated or routed — the future replacement
  for OKF's Case Study type).
- `apps/web/src/content/config.ts` — Astro Content Collections mirroring the
  Keystatic schemas exactly, per current Astro/Keystatic guidance (bridge
  layer between Keystatic-managed files and Astro rendering).
- `apps/web/src/pages/keystatic/[...params].astro` — admin route, mounted
  only when the `SKIP_KEYSTATIC` env var is unset. Production builds set
  `SKIP_KEYSTATIC=true` so the public site stays static/adapter-free;
  Keystatic's admin app needs server-rendered routes, which the rest of the
  site does not otherwise require (a real Cloudflare adapter decision is
  deferred to M5/M6, not forced by this).
- `/insights` and `/insights/[slug]` — Astro pages consuming the `posts`
  collection via `getCollection()`/`render()`.
- `apps/web/src/components/mdx/*` — 12 reusable MDX content components
  registered as Keystatic content components: Figure, FullBleedImage,
  Video, PullQuote, Stat, Callout, SourceBox, DataTable, Gallery, Download,
  RelatedContent, CTA, InteractiveEmbed (the last is a controlled allow-list
  wrapper for approved interactive Astro/React components only — never
  arbitrary component execution from editorial content).

The older, bespoke OKF governed-content pipeline (`apps/web/src/lib/okf/*`,
compiling `knowledge/` at build time) is **retained temporarily** as a
migration source and reference — it still powers Case Studies (the only
content type actually wired to it) and nothing else. See
`docs/architecture/okf-migration-inventory.md` for the folder-by-folder
migration status. Do not invest further in OKF as primary publishing
infrastructure. Full OKF governance rules (still binding on anything that
still lives in `knowledge/`): root `AGENTS.md` and
`knowledge/governance/source-precedence.md`.

## Before doing further Keystatic work

1. `caseStudies` is schema-only — actually migrating real case-study content
   out of OKF into it is future work (M9), not done yet. Don't assume it's
   populated.
2. If new Keystatic content overlaps subject matter still governed by OKF
   (e.g. anything touching Carbon & Ecosystem Services claims, client
   references, case-study outcomes), the OKF content-integrity rules in
   `AGENTS.md` still apply — no invented clients/case studies/outcomes, no
   unapproved public claims.
3. `github` storage mode (deployed CMS editing) requires an owner-created
   GitHub App/OAuth application and Cloudflare env config — not implemented;
   see `cloudflare-deployment` skill for the adapter prerequisite. Stop at
   that boundary and ask the owner rather than guessing at credentials.
   `apps/web/keystatic.config.tsx` already selects `github` storage when
   `KEYSTATIC_STORAGE_KIND=github` is set (falls back to `local` otherwise),
   but hosted editing is separately blocked on an upstream `@keystatic/astro`
   bug independent of credentials — see
   `docs/architecture/web-platform-architecture.md` §6.1 before resuming
   this work.
4. Retrieve current Keystatic/Astro docs before changing integration
   config — this ecosystem moves fast; the setup above was verified against
   documentation current as of 2026-08-12, not memorized from training data.

## MDX article schema (implemented)

```
posts: title, slug, excerpt, publishDate, updatedDate, draft/published state,
  author (relationship -> authors), heroImage, heroImageAlt, topics[]
  (relationship -> topics), featured, seoTitle, seoDescription, canonicalUrl,
  socialImage, body (MDX)
```

`authors`: name, slug, title, bio, photo, social links.
`topics`: name, slug, description.

## MDX content components (implemented, registered in keystatic.config.ts)

Figure, FullBleedImage, Video, PullQuote, Stat, Callout, SourceBox,
DataTable, Gallery, Download, RelatedContent, CTA, InteractiveEmbed. Each is
a controlled, reusable Astro component — not arbitrary HTML in the body.
Images/charts need alt text, caption, and explicit source attribution
(don't bury source credit in body prose). The current sample Insight article
exercises Figure, Callout, PullQuote, Stat, and CTA; the remaining
components are implemented and registered but not yet exercised in real
content.
