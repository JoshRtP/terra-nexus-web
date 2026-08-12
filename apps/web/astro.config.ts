import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';

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

export default defineConfig({
  output: 'static',
  build: {
    format: 'directory',
  },
  server: {
    host: true,
    port: 4321,
  },
  integrations: [mdx(), react(), ...(includeKeystatic ? [keystatic()] : [])],
});
