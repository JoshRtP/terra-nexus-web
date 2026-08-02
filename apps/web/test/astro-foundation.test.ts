import { createHash } from 'node:crypto';
import { readdir, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const TEST_DIRECTORY = dirname(fileURLToPath(import.meta.url));
const APP_ROOT = resolve(TEST_DIRECTORY, '..');
const REPOSITORY_ROOT = resolve(APP_ROOT, '../..');

async function fingerprint(directory: string): Promise<string> {
  const hash = createHash('sha256');
  const visit = async (current: string): Promise<void> => {
    const entries = await readdir(current, { withFileTypes: true });
    for (const entry of entries.sort((left, right) => left.name.localeCompare(right.name))) {
      const path = resolve(current, entry.name);
      if (entry.isDirectory()) {
        await visit(path);
      } else {
        hash.update(resolve(directory, path));
        hash.update(await readFile(path));
      }
    }
  };
  await visit(directory);
  return hash.digest('hex');
}

function build(mode: 'production' | 'preview'): void {
  const result = spawnSync(process.execPath, [resolve(APP_ROOT, 'scripts/run-astro.mjs'), 'build'], {
    cwd: APP_ROOT,
    env: { ...process.env, TNX_BUILD_MODE: mode, ASTRO_TELEMETRY_DISABLED: '1' },
    encoding: 'utf8',
  });
  expect(result.status, `${result.error?.message ?? ''}\n${result.stdout}\n${result.stderr}`).toBe(0);
}

describe('Astro static foundation', () => {
  it('builds production and preview safely without governed routes or source mutation', async () => {
    const beforeKnowledge = await fingerprint(resolve(REPOSITORY_ROOT, 'knowledge'));
    const beforeSchemas = await fingerprint(resolve(REPOSITORY_ROOT, 'schemas'));
    const dist = resolve(APP_ROOT, 'dist');

    build('production');
    const productionIndex = await readFile(resolve(dist, 'index.html'), 'utf8');
    const productionRobots = await readFile(resolve(dist, 'robots.txt'), 'utf8');
    expect(productionIndex).toContain('Website foundation');
    expect(productionIndex).not.toContain('noindex, nofollow');
    expect(productionRobots).toBe('User-agent: *\nDisallow:\n');
    expect(existsSync(resolve(dist, 'services'))).toBe(false);
    expect(existsSync(resolve(dist, 'case-studies'))).toBe(false);

    build('preview');
    const previewIndex = await readFile(resolve(dist, 'index.html'), 'utf8');
    const previewRobots = await readFile(resolve(dist, 'robots.txt'), 'utf8');
    const previewGraph = await readFile(resolve(APP_ROOT, '.generated/content-graph.preview.json'), 'utf8');
    expect(previewIndex).toContain('noindex, nofollow');
    expect(previewRobots).toBe('User-agent: *\nDisallow: /\n');
    expect(previewGraph).not.toContain('body');
    expect(previewGraph).not.toContain('proposal-only');

    expect(await fingerprint(resolve(REPOSITORY_ROOT, 'knowledge'))).toBe(beforeKnowledge);
    expect(await fingerprint(resolve(REPOSITORY_ROOT, 'schemas'))).toBe(beforeSchemas);
  });
});
