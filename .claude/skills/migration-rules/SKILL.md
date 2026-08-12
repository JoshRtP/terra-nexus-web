---
name: migration-rules
description: Offline-Astro baseline and future WordPress migration rules — preserve URLs/content, don't mechanically convert Elementor markup, don't redesign incidentally. Use for any migration-scoped work.
---

# Migration Rules

## What "migration" means in this repo, concretely

There are two distinct migrations, don't conflate them:

1. **Repo relocation / architecture normalization** (this session, M0-M2 in
   `docs/architecture/web-platform-architecture.md`): the working Astro app
   already exists and is healthy — this is about adding Tailwind/Keystatic/
   Cloudflare/GSAP incrementally, not rebuilding.
2. **WordPress/Elementor migration** (future, M8): the live WordPress site
   at Bluehost is the incumbent production system and stays live throughout.
   Treat it as a source of content, URLs, SEO metadata, and visual reference
   — not as code to convert mechanically. Elementor HTML must never become
   the new component architecture.

## Rules

1. Do not redesign a working site section merely to fit a preferred
   architecture. Preserve working visual design/behavior unless the task
   explicitly calls for redesign.
2. Preserve high-value existing URLs. Where a URL must change, produce an
   explicit, documented 301 redirect — never a silent break.
3. Migrate blog/editorial content into whatever the active editorial system
   is (OKF today; Keystatic/MDX once introduced per `keystatic-mdx` skill)
   — don't hand-copy WordPress HTML into a page component.
4. Validate canonical tags, titles, descriptions, structured data, sitemap,
   and redirects before any cutover — this is a checklist, not optional.
5. Retain the old WordPress environment temporarily post-launch as
   rollback/reference, but prevent duplicate indexing (robots/canonical) —
   see `seo-content` skill.
6. Never invent case studies, outcomes, credentials, or client claims while
   migrating content — this is doubly true here because OKF governance
   (`AGENTS.md`) already enforces it structurally; don't work around it.
7. DNS cutover always requires explicit owner authorization.
