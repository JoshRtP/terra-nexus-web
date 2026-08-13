import type { BuildMode } from './okf/types.js';

export function getBuildMode(): BuildMode {
  return process.env.TNX_BUILD_MODE === 'preview' ? 'preview' : 'production';
}

// On-demand (prerender: false) routes — currently the publication-gated
// Insights routes, see src/pages/insights/ — run under Cloudflare's workerd
// runtime, where bare `process.env.*` reads are not reliably inlined at
// build time (the same gap the M6 Keystatic/Cloudflare shim worked around;
// see docs/architecture/web-platform-architecture.md §6.1).
// `import.meta.env.PUBLIC_*` is Vite/Astro's supported mechanism for a
// value baked into on-demand SSR bundles at build time, so on-demand routes
// must call this instead of getBuildMode(). A preview build needs to set
// BOTH `TNX_BUILD_MODE=preview` (for prerendered pages, e.g. robots.txt)
// AND `PUBLIC_TNX_BUILD_MODE=preview` (for on-demand pages) in the shell
// that runs the build.
export function getPublicBuildMode(): BuildMode {
  return import.meta.env.PUBLIC_TNX_BUILD_MODE === 'preview' ? 'preview' : 'production';
}
