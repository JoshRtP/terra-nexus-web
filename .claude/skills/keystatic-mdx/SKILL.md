---
name: keystatic-mdx
description: Keystatic collections/singletons, MDX schema, content components, figures/citations. Canonical CMS for Terra Nexus — installed and live (local storage mode) as of 2026-08-12; hosted GitHub storage mode fully working as of 2026-08-12 (M6) — Cloudflare compat shim, GitHub App/credentials, monorepo pathPrefix, and a content-component image round-trip bug all resolved. Cloudflare Git auto-deploy still pending.
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
3. `github` storage mode (deployed CMS editing): **fully working as of
   2026-08-12 (M6).** The upstream `@keystatic/astro`/Cloudflare-adapter
   blocker is resolved via `apps/web/src/lib/keystatic-cloudflare-shim.ts`
   (§6.1 of the architecture doc). `apps/web/keystatic.config.tsx` selects
   `github` storage when **`PUBLIC_KEYSTATIC_STORAGE_KIND=github`** is set
   at build time (note the `PUBLIC_` prefix), falls back to `local`
   otherwise, and requires `pathPrefix: 'apps/web'` since this is a
   monorepo — GitHub storage reads from the literal repo root, not
   wherever a dev server's cwd happens to be. The GitHub App
   (`terra-nexus-keystatic`) was created **manually** via
   `github.com/settings/apps/new`, not through Keystatic's own guided
   flow — that flow is hard-gated to `NODE_ENV === 'development'` and
   writes credentials to a local `.env` via `fs`, so it can never run on a
   deployed Worker. See §6.2 of the architecture doc for the full
   credentials/publishing-loop record.
4. **Any `fields.image()` value inside an MDX content component (Figure,
   FullBleedImage, Video poster, Gallery) must be populated through
   Keystatic's own upload control — local or hosted — never hand-typed as
   a path string into MDX source.** Keystatic's upload mechanism always
   writes image values to a slug-scoped path
   (`{publicPath}/{entry-slug}/{filename}`); GitHub storage mode's
   directory-prefetch only looks for that shape. A hand-typed path works
   fine in local mode (no prefetch needed) but silently fails to
   round-trip (the field parses to `null` and gets dropped on save) in
   GitHub mode. Not a Keystatic defect — see §6.2 for the full
   investigation and the fix applied to the sample Insight article.
5. Retrieve current Keystatic/Astro docs before changing integration
   config — this ecosystem moves fast; the setup above was verified against
   documentation current as of 2026-08-12, not memorized from training data.
6. Local dev (`npm run dev`) currently fails to open Keystatic
   collection-item pages (`module is not defined`, an apparent Astro
   6.4.6 / `@keystatic/astro@5.2.0` dev-mode incompatibility) — a known,
   separate issue, not caused by the M6 work above. Not yet root-caused;
   don't assume local CMS editing works until this is fixed.

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
