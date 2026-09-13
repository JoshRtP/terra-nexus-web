import { getBuildMode } from '../lib/build-mode.js';
import { compileForBuild } from '../lib/okf/build.js';

export const prerender = true;

export async function GET() {
  const mode = getBuildMode();
  await compileForBuild(mode);
  // A preview build is noindex sitewide and emits no sitemap, so it gets
  // the blanket Disallow and no Sitemap line. Production advertises the
  // sitemap @astrojs/sitemap writes at build time.
  const content = mode === 'preview'
    ? 'User-agent: *\nDisallow: /\n'
    : 'User-agent: *\nDisallow:\n\nSitemap: https://terra.nexus/sitemap-index.xml\n';

  return new Response(content, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
