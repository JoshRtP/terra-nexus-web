# Terra Nexus Astro Foundation

This application is a static Astro foundation. It reads `knowledge/` and `schemas/` through a framework-independent compiler but never writes to either directory during compilation or site builds.

Use the owner-facing commands from the repository root:

```powershell
npm run content:status
npm run content:affected -- services/strategy-and-innovation
npm run content:validate
npm run content:finalize
npm run web:dev
npm run web:build
npm run check
```

`content:validate` validates only the production and preview compiler graphs. `npm run check` is the complete non-mutating repository check. After changing a knowledge record, `npm run content:finalize` regenerates the bundle inventory and tree, reports those changes, and then runs the complete check; it never commits or pushes.

The compiler writes reproducible graph and safe-audit artifacts only to `.generated/`, which is ignored by Git. Confidential, unconfirmed, and proposal-only records receive deterministic opaque audit references rather than original identifiers. `TNX_BUILD_MODE=preview` selects the protected-preview eligibility filter and emits `noindex, nofollow` plus a disallowing `robots.txt`; this is an application-level foundation only and does not configure Vercel Authentication.

## Route contract

Only eligible records of the following types receive future route candidates: Service Family, Service Offering, Expertise Topic, Audience Segment, Case Study, Qualification Module, Insight, and Team Member/Bio/Profile. Routes use an explicit valid `slug` when provided, otherwise the stable concept ID segment. Current `Service Family` records use the `overview.md` adapter to map their route to the canonical `services/<family>` identifier.

The compiler accepts the existing `service_family` display-name values only through a documented, exact-match adapter to `schemas/service-families.yml`. All new relationships must use bundle-relative path IDs; unresolved IDs fail compilation after a safe audit is written.
