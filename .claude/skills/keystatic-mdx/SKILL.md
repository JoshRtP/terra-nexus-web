---
name: keystatic-mdx
description: Keystatic collections/singletons, MDX schema, content components, figures/citations. Use when introducing or working with Keystatic/MDX content — not yet installed in this repo.
---

# Keystatic + MDX

## Current state (audited 2026-08-12)

**Keystatic is not installed.** There is no `keystatic.config.*`, no
dependency, no `/keystatic` route. This repo's actual content system today
is a bespoke, well-tested OKF governed-content pipeline
(`apps/web/src/lib/okf/*`) that compiles `knowledge/` (repo root) into
routes at build time, gated by record-type eligibility and explicit
`publication.approved_by` approval. Full rules: root `AGENTS.md` and
`knowledge/governance/source-precedence.md`.

## Before doing any Keystatic work

1. This is milestone M3 in `docs/architecture/web-platform-architecture.md`
   — don't start it before M2 (Tailwind) is stable, and don't start it
   without first confirming with the owner **what Keystatic is actually
   for**: a genuinely new editorial surface (e.g., a blog that isn't part of
   the governed service/expertise/case-study graph) vs. a partial/full
   replacement of OKF. This has not been decided. Treat it as open.
2. Read `AGENTS.md` in full — Keystatic content must not violate the OKF
   governance rules (no invented case studies/clients, publication approval
   gating, `[agent-draft]` labeling, etc.) if it touches anything that
   overlaps OKF-governed subject matter.
3. Recommended modes once introduced: `local` storage for dev, `github`
   storage for deployed CMS editing (requires Cloudflare + GitHub write
   access — see `cloudflare-deployment` skill).

## Recommended MDX article schema (target, not yet implemented)

```
BlogPost: title, slug, description, publishDate, updatedDate, author,
  heroImage, heroImageAlt, heroVideo?, topics[], expertise[], markets[],
  featured, seoTitle, seoDescription, canonicalUrl, socialImage, body (MDX)
```

## Recommended MDX content components (target, not yet implemented)

Figure, FullBleedImage, Video, PullQuote, Stat, Callout, SourceBox,
DataTable, Gallery, Download, RelatedContent, CTA, InteractiveEmbed. Each
should be a controlled, reusable component — not arbitrary HTML in the
body. Images/charts need alt text, caption, and explicit source
attribution (don't bury source credit in body prose).
