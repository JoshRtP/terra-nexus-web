---
title: "Terra Nexus Astro + Keystatic + Cloudflare Web Platform Architecture"
status: "Target Architecture and Development Handoff (owner-supplied source document)"
updated: "2026-08-12"
note: "Preserved verbatim as supplied. See web-platform-architecture.md in this same directory for the repo-native, audited/condensed version that reflects what actually exists in this repository."
---

> Repository-ready architecture source of truth for Claude Code. This Markdown version supersedes the Word document for agent development use.

TERRA NEXUS

# Astro + Keystatic + Cloudflare
## Web Platform Architecture

Migration, design system, content architecture, cinematic media, application hosting, and Claude Code development workflow

| Decision | Recommended Direction |
| --- | --- |
| Public frontend | Astro |
| Interactive UI | React islands where needed |
| Styling | Tailwind CSS + shared design tokens/components |
| Animation | GSAP for cinematic/scroll choreography; CSS for simple motion |
| CMS | Keystatic |
| Editorial format | MDX |
| Source of truth | GitHub |
| Hosting/runtime | Cloudflare Workers |
| Large files / downloads | Cloudflare R2 |
| Video | Cloudflare Stream for substantial video; optimized static video where appropriate |
| Future application data | Cloudflare D1 as needed |
| Primary development workflow | VS Code + Claude Code + Git |

> Status: recommended target architecture for migration of the existing offline Astro build into a new production repository.

# 1. Executive Summary

The recommended platform is a content-first Astro website with Keystatic providing a Git-backed CMS, MDX providing rich editorial content, React used selectively for interactive experiences, Tailwind CSS providing the design system, and Cloudflare Workers providing deployment and full-stack runtime capabilities. The architecture is intentionally optimized for a visually ambitious public site without forcing the entire website to become a client-rendered JavaScript application.

The existing offline Astro site should not be discarded. It should be treated as the starting implementation, audited, moved into a new GitHub repository, normalized around the target architecture, and then connected to Keystatic and Cloudflare. The current WordPress/Elementor site can remain live on Bluehost during the rebuild and migration, allowing a controlled cutover.

The guiding principle is separation of concerns: Astro owns pages and rendering; Keystatic owns structured editorial content; MDX owns rich article composition; React owns only the interactive islands that need it; Cloudflare owns hosting, media infrastructure, APIs and future server-side services; GitHub remains the durable source of truth for code and content.

# 2. Target Architecture

```text
Users
  |
Cloudflare DNS / CDN / Security
  |
Cloudflare Workers
  |
Astro Website
  |-- Astro pages/layouts/components
  |-- Tailwind design system
  |-- GSAP/CSS motion
  |-- React interactive islands
  |-- Keystatic Admin
  |-- MDX content
  |
  +-- GitHub repository (code + content)
  +-- Cloudflare R2 (large files/assets where appropriate)
  +-- Cloudflare Stream (substantial video)
  +-- Cloudflare D1 (future application data)
  +-- Worker/API services (future full-stack tools)
```

# 3. Why Astro Is the Core Frontend

Astro should remain the public-site framework. Cloudflare's current Astro guidance describes Astro as a content-focused framework that minimizes client-side JavaScript and adds JavaScript islands only where interactivity or personalization is required. Cloudflare Workers can host either a fully pre-rendered Astro site or an Astro application using on-demand/server rendering.

- Use Astro components for navigation, layouts, marketing sections, article templates, case studies, landing pages, image-led storytelling and SEO-critical content.
- Default to static/pre-rendered output wherever possible.
- Use on-demand rendering only where Keystatic administration, personalization, authentication or application functionality requires it.
- Do not choose a heavier application framework merely to support animation, large imagery or video; those are media/design concerns, not reasons to client-render the whole site.
# 4. React: Selective, Not the Default

Astro is framework-agnostic and can host React components as interactive islands. React should therefore be a capability inside the Astro site rather than the architecture of every page.

| Use Astro | Use React |
| --- | --- |
| Hero/page composition | Interactive calculators |
| Navigation/footer | Complex filters/search interfaces |
| Blog/article templates | Interactive maps |
| Service/expertise pages | Stateful dashboards/widgets |
| Static data visualizations | Highly interactive charts |
| SEO landing pages | Client-side application workflows |

# 5. Tailwind and the Design System

Tailwind CSS should provide the styling foundation, but the project should not devolve into one-off utility-class page design. Establish brand tokens and reusable components so Claude Code can build new pages from a controlled visual vocabulary.

- Typography scale: display, H1-H6, editorial body, captions, labels and data typography.
- Spacing and layout: container widths, gutters, vertical rhythm, editorial reading width and full-bleed media widths.
- Media treatments: full-bleed image, editorial image, split image/text, cinematic video, figure/caption/source.
- Surface components: cards, statistics, callouts, quotes, CTAs, buttons and navigation states.
- Responsive rules: desktop, tablet and mobile behavior should be designed at the component level.
- Motion tokens: durations, easing, reveal patterns and reduced-motion alternatives.
# 6. Motion and Cinematic Experience

A visually ambitious site is compatible with Astro. The recommended motion stack is CSS for lightweight transitions and GSAP for deliberate cinematic sequences such as the homepage hero, scroll-linked storytelling, pinned sections, SVG logo animation and complex reveal choreography.

## 6.1 Homepage cinematic hero

```text
Hero viewport (100svh)
  |
  |-- Media layer
  |     canyon / river cinematic footage
  |
  |-- Contrast layer
  |     gradient / vignette / readability treatment
  |
  |-- Brand layer
  |     real Terra Nexus SVG mark
  |
  |-- Content layer
  |     HTML headline + supporting copy + CTA
  |
  |-- Motion controller
        GSAP + CSS
```

Do not bake critical typography or the final brand logo into an AI-generated movie. Keep the landscape video, real SVG logo, and HTML copy as separate layers. This preserves brand fidelity, accessibility, responsive control and search-readable content.

- Desktop: high-quality cinematic video with subtle loop or settled end state.
- Mobile: separately encoded/cropped video or a poster image plus lightweight logo animation.
- Respect prefers-reduced-motion.
- Use a poster frame so first paint does not depend on video decoding.
- Avoid loading oversized media merely because the source master is 4K.
# 7. Keystatic as the CMS

Keystatic is a strong fit because the primary editors will be the site owner and Claude Code. It makes codebase content editable through a CMS interface while retaining Markdown/MDX/structured files as the durable source. Keystatic supports local storage during development and GitHub-backed storage for a deployed collaborative workflow.

## 7.1 Recommended modes

| Environment | Keystatic storage | Purpose |
| --- | --- | --- |
| Local development | local | Claude Code / VS Code / CMS edits against local files |
| Production/staging CMS | github | Browser editing that writes content back to the GitHub repository |

In GitHub mode, collaborators need write access to the repository and the deployed /keystatic route authenticates through GitHub. This preserves one source of truth instead of maintaining a separate CMS database.

# 8. MDX Editorial Architecture

Use MDX as the canonical long-form editorial format. Keystatic's MDX field supports configurable formatting, images and custom content components. This means the underlying content remains Git-friendly while the CMS can present a structured editing experience.

## 8.1 Recommended article schema

```text
BlogPost
  title
  slug
  description
  publishDate
  updatedDate
  author
  heroImage
  heroImageAlt
  heroVideo (optional)
  topics[]
  expertise[]
  markets[]
  featured
  seoTitle
  seoDescription
  canonicalUrl
  socialImage
  body (MDX)
```

## 8.2 Terra Nexus MDX content components

| Component | Purpose |
| --- | --- |
| Figure | Image/chart with caption, alt text and explicit source |
| FullBleedImage | Large editorial/cinematic image treatment |
| Video | Embedded or cinematic video with poster and caption |
| PullQuote | Editorial quotation treatment |
| Stat | Prominent quantitative callout |
| Callout | Key takeaway / caution / interpretation |
| SourceBox | References, methodology or supporting source |
| DataTable | Responsive styled table |
| Gallery | Curated image group |
| Download | Report, PDF, data or resource CTA |
| RelatedContent | Related articles/case studies |
| CTA | Reusable conversion block |
| InteractiveEmbed | Approved React-powered calculator/chart/map |

Keystatic content components can represent block, wrapper, inline, mark and repeating structures in MDX. That provides a controlled visual vocabulary instead of allowing arbitrary HTML inside articles.

# 9. Media Strategy

## 9.1 Images

- Keep ordinary editorial images close to content when repository size remains reasonable.
- Use Astro image optimization for local/static image assets.
- Use meaningful filenames, explicit alt text, dimensions and captions/source fields.
- Move unusually large reusable media libraries or downloadable assets to R2 rather than bloating Git history.
## 9.2 Video

- Short decorative loops can be delivered as optimized static media when appropriate.
- Use Cloudflare Stream for substantial video where encoding, adaptive delivery and playback infrastructure are valuable.
- Store poster images separately from video.
- Design video as progressive enhancement: the page must remain coherent if video is unavailable.
## 9.3 Charts and report figures

- Treat sourced charts as first-class Figure components with caption, source title, source URL/reference and accessibility text.
- Prefer recreated responsive charts only when the underlying data and rights permit it; otherwise preserve the sourced figure as an image.
- Do not embed source attribution into arbitrary body text when it belongs structurally with the figure.
# 10. Cloudflare Platform

Cloudflare Workers should be the primary deployment target. Cloudflare currently provides first-party Astro deployment guidance, including automatic framework detection through Wrangler and support for static assets or on-demand rendering. Workers also provides a path to APIs and full-stack applications without introducing a separate traditional server.

| Cloudflare service | Role |
| --- | --- |
| Workers | Astro runtime, server routes, APIs, future full-stack apps |
| DNS/CDN | Domain routing, edge delivery and caching |
| R2 | Large object/file storage and downloadable assets |
| Stream | Video hosting/delivery where appropriate |
| D1 | Future relational application data |
| Observability | Worker logs/operational visibility |

# 11. Repository Strategy

Because an offline Astro implementation already exists, create a new clean GitHub repository and migrate the working project into it rather than scaffolding an unrelated site and rebuilding everything. The first task is an architecture audit: identify what is reusable, what should be normalized, and what should be replaced.

## 11.1 Recommended initial repository

```text
terra-nexus-web/
  .github/
  docs/
    architecture/
    migration/
    content-model/
  public/
    fonts/
    images/
    video-posters/
  src/
    assets/
    components/
      brand/
      layout/
      marketing/
      editorial/
      interactive/
    content/
      blog/
      case-studies/
      authors/
    layouts/
    pages/
    styles/
    lib/
  keystatic.config.ts
  astro.config.mjs
  tailwind.config.*
  wrangler.jsonc
  package.json
  tsconfig.json
  CLAUDE.md
  README.md
```

Do not force a monorepo on day one unless there are already multiple independently deployed applications. A single clean website repository is simpler. Move to a monorepo later if shared UI/packages and multiple Cloudflare applications make that complexity worthwhile.

# 12. Claude Code Development Model

Claude Code should operate against explicit architecture and design rules rather than being asked to improvise page-by-page. The repository should include a CLAUDE.md and supporting architecture documents that define boundaries.

- Astro first; React only when interactivity requires it.
- No arbitrary page-specific styling when an existing design-system component can be extended.
- No critical text baked into images/video.
- All new editorial modules should be modeled as reusable MDX/Keystatic components when appropriate.
- All media requires responsive behavior and accessibility consideration.
- All route changes must preserve or intentionally redirect existing production URLs.
- Performance budgets should be treated as acceptance criteria, especially for the cinematic homepage.
- Claude should run build/type/lint checks before considering a change complete.
# 13. Migration from the Offline Astro Site

Recommended sequence:

1. Inventory the current offline Astro project: Astro version, integrations, package manager, component structure, routes, styling approach, static assets and any existing React.
1. Create a new GitHub repository for the production architecture.
1. Copy/import the offline Astro project into the new repository while preserving history only if that history is useful.
1. Establish a known-good baseline commit before architectural changes.
1. Normalize dependencies and confirm local npm/pnpm install, dev and production build.
1. Add/normalize Tailwind and the design-system structure without visually redesigning everything at once.
1. Add Keystatic in local mode and model the first content collections.
1. Convert representative blog content to MDX and prove images/custom content components.
1. Add the Cloudflare adapter/runtime requirements and verify a preview deployment.
1. Switch Keystatic to GitHub mode for deployed CMS editing.
1. Implement media infrastructure and the cinematic hero after the deployment pipeline is stable.
1. Migrate WordPress content and URLs, run SEO/redirect QA, then cut DNS over only after production acceptance.
# 14. WordPress / Elementor Migration

The WordPress site should be treated as the incumbent production system and a source of content, URLs, SEO metadata and visual references, not as code to convert mechanically into Astro. Elementor HTML should not become the new component architecture.

- Keep Bluehost/WordPress live during development.
- Export or retrieve posts, media, categories, tags, authors and SEO metadata.
- Map old URLs to retained URLs or explicit 301 redirects.
- Rebuild pages using the new Astro component system.
- Migrate blog articles into the Keystatic/MDX schema.
- Validate canonical tags, titles, descriptions, structured data, sitemap, robots rules and redirects before cutover.
- Retain the old WordPress environment temporarily as rollback/reference, but prevent duplicate indexing after launch.
# 15. Full-Stack Applications

Do not require every future application to live inside the marketing site's page architecture. Cloudflare Workers supports multiple web frameworks, so future applications can use the best framework for their interaction model while sharing branding and selected packages.

```text
terra.nexus
  Astro public website

app.terra.nexus or dedicated product domains
  React / React Router / another suitable application framework

api.terra.nexus (if useful)
  Worker API / Hono-style service

Shared capabilities
  Cloudflare Workers
  D1
  R2
  authentication provider (when selected)
  shared design tokens/components
```

# 16. SEO and Performance Requirements

- Preserve high-value existing URLs wherever possible.
- Generate XML sitemap and canonical URLs.
- Use semantic HTML and server/static-rendered article content.
- Ensure metadata is editable through Keystatic.
- Use structured article/case-study schemas where appropriate.
- Optimize Core Web Vitals, especially Largest Contentful Paint on the video-led homepage.
- Poster-first video strategy; do not make the hero's first meaningful paint wait on a large movie.
- Lazy-load below-the-fold imagery/video.
- Avoid unnecessary React hydration.
- Include accessible alt text, captions and reduced-motion behavior.
# 17. Environments and Deployment

| Environment | Purpose | Recommended behavior |
| --- | --- | --- |
| Local | Claude Code and development | Local Keystatic; local Astro dev server |
| Preview | Branch/PR QA | Cloudflare preview deployment; no indexing |
| Production | Public site | Custom domain on Cloudflare; GitHub-backed Keystatic |

Cloudflare's current Astro workflow supports deployment through Wrangler and CI/CD systems. For an existing Astro project, Wrangler can automatically detect Astro and generate appropriate configuration; on-demand rendering uses the Cloudflare Astro adapter.

# 18. Initial Implementation Milestones

| Milestone | Exit criteria |
| --- | --- |
| M0 — Baseline | Offline Astro site runs/builds cleanly; screenshots and route inventory captured |
| M1 — New repository | Clean GitHub repo, baseline commit, README/CLAUDE.md, branch strategy |
| M2 — Architecture normalization | Astro/Tailwind/component structure standardized without regressions |
| M3 — CMS proof | Keystatic local mode + one complete MDX blog post with image and custom component |
| M4 — Cloudflare proof | Preview deployment working; runtime/configuration documented |
| M5 — GitHub CMS | Deployed Keystatic GitHub mode works end-to-end |
| M6 — Design system | Core reusable sections/editorial components established |
| M7 — Cinematic hero | Desktop/mobile/reduced-motion hero passes performance and visual QA |
| M8 — Content migration | WordPress pages/blog/media/SEO data migrated and reviewed |
| M9 — Launch readiness | Redirects, sitemap, analytics, forms, SEO, performance and accessibility validated |
| M10 — Cutover | DNS moved; production monitored; WordPress retained temporarily for rollback/reference |

# 19. Decisions to Lock Before Migration

- Package manager: npm or pnpm; use one consistently.
- Current Astro version and upgrade strategy.
- Tailwind version and whether existing CSS should be progressively migrated or retained.
- Exact Keystatic collections and singletons.
- Where ordinary images live versus R2-hosted assets.
- Which videos qualify for Stream versus static delivery.
- Analytics provider and consent requirements.
- Form/contact handling.
- Authentication strategy for future private applications (do not solve prematurely if not required for launch).
- Production/preview branch policy and domain/subdomain plan.
# 20. Recommended Final Stack

| Layer | Technology | Rule |
| --- | --- | --- |
| Frontend | Astro | Default for public pages and rendering |
| Interactive UI | React | Only where client state/interactivity warrants it |
| Styling | Tailwind CSS | Backed by reusable design tokens/components |
| Motion | GSAP + CSS | GSAP for cinematic sequences; CSS for simple transitions |
| CMS | Keystatic | Git-backed structured editing |
| Editorial | MDX | Long-form content plus approved rich components |
| Repository | GitHub | Source of truth for code and content |
| Hosting/runtime | Cloudflare Workers | Primary deployment target |
| Objects/files | Cloudflare R2 | Large assets/downloads when repository storage is inappropriate |
| Video | Cloudflare Stream | Substantial/adaptive video where justified |
| Data | Cloudflare D1 | Add when full-stack applications need relational persistence |
| Development | VS Code + Claude Code | Agent works within documented architecture |

# 21. Reference Notes

This architecture reflects current official documentation reviewed August 2026. Cloudflare currently documents first-party Astro deployment on Workers, including static and on-demand rendering. Keystatic currently documents Astro integration, local and GitHub storage modes, MDX fields, image configuration and custom MDX content components.

- Cloudflare Workers — Astro framework guide: https://developers.cloudflare.com/workers/framework-guides/web-apps/astro/
- Cloudflare Workers overview: https://developers.cloudflare.com/workers/
- Astro — Cloudflare deployment guide: https://docs.astro.build/en/guides/deploy/cloudflare/
- Keystatic — Astro installation: https://keystatic.com/docs/installation-astro
- Keystatic — GitHub mode: https://keystatic.com/docs/github-mode
- Keystatic — MDX field: https://keystatic.com/docs/fields/mdx
- Keystatic — Content components: https://keystatic.com/docs/content-components
# 22. Immediate Next Step

Before Claude Code modifies the offline site, give it an explicit audit/migration task rather than a redesign task. It should inventory the existing project, identify conflicts with this target architecture, recommend the minimum changes required to establish the new repository baseline, and make no destructive changes until the baseline has been committed. Once that baseline exists, implement Keystatic, Cloudflare deployment and the design-system normalization as separate, reviewable phases.

# 23. Claude Code Autonomous Development Environment

The development environment should be designed so Claude Code can complete an implementation loop - inspect, build, run, visually test, diagnose, repair and verify - without requiring manual supervision for ordinary development decisions. Autonomy should be high in local and preview environments while production permissions remain intentionally narrower.

## 23.1 Core capability stack

| Capability | Recommended tool | Purpose / policy |
| --- | --- | --- |
| Local code/files/shell/git | Claude Code native tools | Use native capabilities; do not add redundant filesystem or shell MCP servers. |
| Browser + visual QA | Playwright CLI/Skill or Playwright MCP | Automated navigation, responsive testing, interaction testing and screenshots. Prefer CLI/Skill when practical for coding-agent token efficiency; MCP remains useful for structured browser interaction. |
| Cloudflare platform | Official Cloudflare Claude Code plugin + Skills + Code Mode API MCP + Wrangler | Current Cloudflare knowledge, account operations, local dev, deploys, bindings, D1/R2/Workers operations and observability. |
| Current library docs | Context7 MCP | Retrieve current/version-aware Astro, Tailwind, React, Keystatic and other library documentation rather than relying on stale model knowledge. |
| GitHub collaboration | GitHub integration / CLI | Branches, commits, PRs, issues, checks and repository workflow. Protect main; allow broad branch/PR autonomy. |

## 23.2 Cloudflare setup

Cloudflare's current Claude Code guidance recommends installing its official plugin, which bundles Cloudflare Skills and registers Cloudflare MCP access. The Cloudflare skill set includes the general platform skill, workers-best-practices, wrangler, web-performance and other domain-specific skills. Wrangler remains the preferred local development/deployment CLI while the API MCP handles broader platform operations.

```text
Inside Claude Code:

/plugin marketplace add cloudflare/skills
/plugin install cloudflare@cloudflare

Then verify:
claude mcp list
```

- Load the Cloudflare skill for general platform work.
- Load workers-best-practices when authoring/reviewing Workers and wrangler configuration.
- Load wrangler before executing Wrangler commands.
- Use web-perf when auditing Core Web Vitals, page speed or performance regressions.
- Use Cloudflare API MCP for DNS, R2, platform configuration and other account-level operations.
- Grant staging/preview permissions first. Keep production destructive permissions narrow until the workflow is proven.
## 23.3 Playwright visual QA

Browser automation is the most important addition for reducing supervision on a visual website. Microsoft's Playwright MCP provides browser automation through structured page interaction. Its current project guidance also notes that coding agents may benefit from Playwright CLI plus Skills because CLI workflows can be more token-efficient than loading large MCP schemas and accessibility trees.

- Require browser QA for any meaningful UI change.
- Test at minimum: 1440px desktop, 1024px desktop/tablet landscape, 768px tablet and 390px mobile.
- Capture screenshots into an artifacts/qa directory.
- Check horizontal overflow, clipped content, broken images/video, navigation, hover/focus states, layout shifts and console errors.
- For the cinematic hero, verify poster-first rendering, autoplay behavior where permitted, mobile fallback, scroll choreography and prefers-reduced-motion.
- Do not consider UI work complete merely because the production build succeeds.
## 23.4 Context7 documentation retrieval

Context7 should be configured so Claude automatically retrieves current library documentation for implementation, configuration and API questions. Its Claude Code setup supports project- or user-scoped MCP installation. Prefer project scope if the configuration is intended specifically for this repository.

```text
Example local MCP setup:

claude mcp add context7 -- npx -y @upstash/context7-mcp

Optional: configure an API key for higher limits.

CLAUDE.md rule:
Always use current documentation (Context7 and/or official project docs) before
implementing configuration or APIs for Astro, Keystatic, Tailwind, React, GSAP,
Cloudflare, Wrangler, or other rapidly changing dependencies.
```

# 24. Project-Specific Claude Skills

External MCP servers provide capabilities; project Skills provide the repeatable Terra Nexus operating model. Skills should be concise, scoped and loaded when relevant rather than duplicating the entire architecture document into every prompt.

| Skill | Responsibility |
| --- | --- |
| terra-nexus-design-system | Brand tokens, typography, spacing, imagery, responsive rules, component vocabulary and visual quality bar. |
| astro-architecture | Astro-first rendering, routing, component boundaries, React-island criteria, hydration and performance rules. |
| keystatic-mdx | Collections/singletons, MDX schema, image handling, content components, figures, citations, editorial authoring. |
| cinematic-ui | GSAP/CSS motion conventions, SVG animation, scroll choreography, hero video behavior, mobile/reduced-motion alternatives. |
| seo-content | Metadata, canonical URLs, schema, sitemap, redirects, internal linking and content discoverability. |
| cloudflare-deployment | Workers/Wrangler/R2/Stream/D1 environment conventions, preview/production rules and deployment verification. |
| visual-qa | Browser matrix, screenshots, interaction checks, accessibility/performance checks and completion criteria. |
| migration-rules | Offline-Astro import and later WordPress migration rules; preserve URLs/content and avoid Elementor-code conversion. |

## 24.1 Suggested repository locations

```text
.claude/
  skills/
    terra-nexus-design-system/
      SKILL.md
    astro-architecture/
      SKILL.md
    keystatic-mdx/
      SKILL.md
    cinematic-ui/
      SKILL.md
    seo-content/
      SKILL.md
    cloudflare-deployment/
      SKILL.md
    visual-qa/
      SKILL.md
    migration-rules/
      SKILL.md
  agents/
    frontend-builder.md
    visual-qa.md
    content-seo.md
  settings.json

CLAUDE.md
docs/
  architecture/
    web-platform-architecture.md
  migration/
  qa/
artifacts/
  qa/
```

# 25. Recommended Claude Subagents

| Subagent | Primary work |
| --- | --- |
| frontend-builder | Astro/React/Tailwind/GSAP implementation, component refactoring and responsive behavior. |
| visual-qa | Independent Playwright/browser review, screenshots, defect list, accessibility and performance observations. |
| content-seo | Keystatic/MDX schemas, content migration, metadata, internal links, structured data and URL preservation. |

The visual-qa subagent should review work independently rather than simply validating the builder's assumptions. For significant UI work, the expected loop is builder -> QA -> builder repairs -> QA recheck.

# 26. Hooks and Automated Quality Gates

Use Claude Code hooks and repository scripts to make quality checks automatic. Exact hook syntax should be generated against the currently installed Claude Code version and verified from current Anthropic documentation before committing configuration.

| Trigger / stage | Action |
| --- | --- |
| After relevant edits | Formatter / targeted lint where fast enough |
| Before task completion | Astro check + TypeScript + lint + production build |
| UI completion | Start/confirm local server; browser QA; screenshots; console/network review |
| Pre-PR | Full test suite + production build + QA artifact summary |
| Pre-production deploy | Require explicit production scope/approval and confirm clean git state |

## 26.1 Canonical autonomous loop

```text
Understand task
  |
Inspect existing implementation + architecture rules
  |
Retrieve current docs when APIs/configuration may have changed
  |
Implement smallest coherent change
  |
Format / typecheck / lint
  |
Production build
  |
Run site
  |
Browser QA at required viewports
  |
Inspect screenshots + console + interactions
  |
Fix defects
  |
Repeat checks until clean
  |
Commit on working branch / prepare PR
  |
Report:
  - what changed
  - tests/build run
  - visual QA performed
  - screenshots/artifacts
  - unresolved risks only
```

# 27. Permission and Safety Model

High autonomy should not mean unrestricted production access. Claude Code supports tool permission controls; configure routine local commands, testing and branch operations for low-friction execution while keeping destructive or production actions gated.

- Local filesystem, package scripts, tests, dev server and read-only inspection: broad autonomy.
- Git feature branches, commits and PR preparation: broad autonomy.
- Main branch: protected; merge through review/checks.
- Cloudflare preview/staging deploys: broad autonomy once configured.
- Production deployment: explicit approval until the deployment workflow is proven.
- DNS deletion, domain transfer, production database destructive operations and secret rotation: always gated.
- Never place API keys/tokens in CLAUDE.md, Skills, prompts or committed configuration. Use environment variables/secrets.
# 28. CLAUDE.md Operating Rules

The root CLAUDE.md should include at least these rules:

- Read the architecture documentation before changing platform structure.
- Preserve the existing visual implementation unless the task explicitly calls for redesign.
- Astro is the default. Use React only for components requiring client-side state/interactivity.
- Prefer reusable design-system components over page-specific markup/styles.
- Use Keystatic + MDX for editorial content; do not hard-code blog posts into page components.
- Use current documentation before changing rapidly evolving framework/platform configuration.
- Never bake critical copy or final logo artwork into cinematic video.
- For UI changes, run browser-based responsive QA before reporting completion.
- Do not declare success with failing checks, build errors, console errors or known broken responsive states.
- Preserve production URLs or document explicit redirects.
- Do not modify production infrastructure or DNS without explicit authorization.
- Commit work in coherent increments and leave the repository in a reproducible state.
# 29. Updated Initial Repository Bootstrap

When the new repository is created, the first Claude Code session should proceed in this order:

1. Audit the existing offline Astro project without changing it.
1. Record the current framework/dependency versions, routes, components, styles, assets, scripts and known working behavior.
1. Read this architecture document and translate it into repository-native docs/architecture guidance and CLAUDE.md.
1. Create the new repository baseline and import the current site with minimal change.
1. Verify install, dev server and production build before refactoring.
1. Install/configure the approved Claude development capabilities (Cloudflare plugin, current-doc retrieval, browser QA) without exposing credentials.
1. Create the project Skills and subagent scaffolding.
1. Add quality scripts/hooks and prove the self-checking loop.
1. Only then normalize Astro/Tailwind architecture and add Keystatic.
1. Establish a Cloudflare preview deployment before beginning major cinematic/visual iteration.
# 30. Autonomous Development Acceptance Criteria

Claude may report a development task complete only when applicable criteria are satisfied:

- Requested functionality exists and is reachable.
- No known TypeScript/Astro/lint/build failures.
- Production build succeeds.
- Affected UI has been browser-tested at required viewports.
- No obvious horizontal overflow, clipping or broken media.
- Interactive states and navigation have been exercised.
- Console errors introduced by the change have been resolved.
- Motion behavior has a reduced-motion alternative when relevant.
- SEO metadata/URLs remain correct when routes/content are affected.
- QA screenshots/artifacts are stored for meaningful visual work.
- The final report distinguishes completed work from unresolved risks or decisions requiring owner input.
# 31. Current External Tooling References

- Cloudflare Claude Code setup: https://developers.cloudflare.com/agent-setup/claude-code/
- Microsoft Playwright MCP: https://github.com/microsoft/playwright-mcp
- Context7 MCP: https://github.com/upstash/context7
- Anthropic Claude Code setup: https://docs.anthropic.com/en/docs/claude-code/getting-started
- Anthropic Claude Code CLI reference: https://docs.anthropic.com/en/docs/claude-code/cli-usage
