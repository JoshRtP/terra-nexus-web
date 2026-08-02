import { getBuildMode } from '../lib/build-mode.js';
import { compileForBuild } from '../lib/okf/build.js';

export const prerender = true;

export async function GET() {
  const mode = getBuildMode();
  await compileForBuild(mode);
  const content = mode === 'preview'
    ? 'User-agent: *\nDisallow: /\n'
    : 'User-agent: *\nDisallow:\n';

  return new Response(content, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
