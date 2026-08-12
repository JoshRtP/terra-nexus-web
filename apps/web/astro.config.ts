import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import cloudflare from '@astrojs/cloudflare';

const buildMode = process.env.TNX_BUILD_MODE === 'preview' ? 'preview' : 'production';

console.info(`[Terra Nexus] static foundation build mode: ${buildMode}`);

// Keystatic's Astro integration injects on-demand ("prerender: false") admin
// routes at /keystatic and /api/keystatic. Those only need SSR from the dev
// server itself (which handles on-demand rendering without an adapter) — we
// never want them in a production build, which stays fully static and
// adapter-free. Set SKIP_KEYSTATIC=true for any production build so the
// integration (and its routes) are never registered there. See
// .claude/skills/keystatic-mdx/SKILL.md and
// docs/architecture/web-platform-architecture.md §4.
const includeKeystatic = process.env.SKIP_KEYSTATIC !== 'true';

// Cloudflare Workers adapter (M5, added 2026-08-12). The public site stays
// fully prerendered (output: 'static') — the adapter's job here is only to
// let Wrangler build/serve the static dist/ output as Workers static assets
// and give `astro dev`/`astro preview` a workerd-accurate local runtime.
// No route is server-rendered yet: hosted Keystatic (GitHub storage mode,
// M6) is deferred pending an owner-created GitHub App and is out of scope
// for this milestone. Pinned to 13.7.0 — the last release whose peer range
// (astro ^6.3.0) covers this repo's Astro 6.4.6; @astrojs/cloudflare@14+
// requires Astro 7 and is an explicit non-goal for this milestone (see
// docs/architecture/web-platform-architecture.md §6).
export default defineConfig({
  output: 'static',
  // prerenderEnvironment: 'node' — the OKF compiler (src/lib/okf/compiler.ts)
  // uses node:fs/promises, node:path, node:crypto, node:url at build time to
  // read/compile knowledge/. The adapter's default 'workerd' prerender
  // runtime doesn't provide those Node built-ins and the build fails without
  // this. Only affects the build-time prerender step — on-demand rendered
  // routes (none yet; future GitHub-mode Keystatic routes) still run under
  // workerd regardless of this setting.
  // imageService: 'passthrough' — the site has no astro:assets <Image>/<Picture>
  // usage anywhere (Keystatic's asset fields intentionally render plain <img>,
  // see keystatic.config.tsx comments), so the adapter's default
  // 'cloudflare-binding' image service would provision an unused Cloudflare
  // Images binding on every deploy. Passthrough avoids that speculative
  // binding per CLAUDE.md (§6: don't add Cloudflare product bindings before
  // there's a real need). The adapter still auto-provisions a `SESSION` KV
  // namespace by default (no supported way to disable that on Astro 6.4.6 —
  // `session: false` isn't a valid config shape on this version); it's
  // unused (no getSession() calls in this repo) but harmless/free-tier.
  adapter: cloudflare({ prerenderEnvironment: 'node', imageService: 'passthrough' }),
  build: {
    format: 'directory',
  },
  server: {
    host: true,
    port: 4321,
  },
  integrations: [mdx(), react(), ...(includeKeystatic ? [keystatic()] : [])],
});
