import { cp, mkdir, mkdtemp, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { dirname, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { afterEach, describe, expect, it } from 'vitest';

import { getAffectedContent, getContentStatus, scaffoldCaseStudy } from '../scripts/content-cli.js';
import { resolvePythonExecutable } from '../scripts/repository-check.js';

const TEST_DIRECTORY = dirname(fileURLToPath(import.meta.url));
const APP_ROOT = resolve(TEST_DIRECTORY, '..');
const REPOSITORY_ROOT = resolve(APP_ROOT, '../..');
const temporaryDirectories: string[] = [];

async function temporaryRepository(): Promise<string> {
  const parent = resolve(APP_ROOT, '.test-tmp');
  await mkdir(parent, { recursive: true });
  const repository = await mkdtemp(resolve(parent, 'content-cli-'));
  temporaryDirectories.push(repository);
  await mkdir(resolve(repository, 'knowledge/case-studies'), { recursive: true });
  await cp(resolve(REPOSITORY_ROOT, 'schemas'), resolve(repository, 'schemas'), { recursive: true });
  return repository;
}

async function temporaryCompleteBundle(): Promise<string> {
  const repository = await temporaryRepository();
  await rm(resolve(repository, 'knowledge'), { recursive: true, force: true });
  await cp(resolve(REPOSITORY_ROOT, 'knowledge'), resolve(repository, 'knowledge'), { recursive: true });
  return repository;
}

async function fingerprint(directory: string): Promise<string> {
  const hash = createHash('sha256');
  const visit = async (current: string): Promise<void> => {
    const entries = await readdir(current, { withFileTypes: true });
    for (const entry of entries.sort((left, right) => left.name.localeCompare(right.name))) {
      const path = resolve(current, entry.name);
      if (entry.isDirectory()) await visit(path);
      else {
        hash.update(path);
        hash.update(await readFile(path));
      }
    }
  };
  await visit(directory);
  return hash.digest('hex');
}

function runValidator(script: string, bundle: string): void {
  const result = spawnSync(resolvePythonExecutable(REPOSITORY_ROOT), [resolve(REPOSITORY_ROOT, 'scripts', script), bundle], {
    cwd: REPOSITORY_ROOT,
    encoding: 'utf8',
  });
  expect(result.status, result.stdout + result.stderr).toBe(0);
}

afterEach(async () => {
  await Promise.all(temporaryDirectories.splice(0).map((directory) => rm(directory, { recursive: true, force: true })));
});

describe('owner content workflow', () => {
  it('scaffolds a structurally safe draft with restrictive defaults and --yes behavior', async () => {
    const repository = await temporaryRepository();
    const result = await scaffoldCaseStudy({
      repositoryRoot: repository,
      slug: 'pilot-case-study',
      title: 'Owner-supplied pilot reference',
      relationships: { service_family: ['services/strategy-and-innovation'] },
      yes: true,
      now: new Date('2026-08-01T12:00:00.000Z'),
    });
    const content = await readFile(result.filePath, 'utf8');

    expect(result.relativePath).toBe('knowledge/case-studies/pilot-case-study.md');
    expect(content).toContain('status: draft');
    expect(content).toContain('audience: internal');
    expect(content).toContain('state: blocked');
    expect(content).toContain('confidentiality: unconfirmed');
    expect(content).toContain('at: "2026-08-01T12:00:00.000Z"');
    expect(content).toContain('services/strategy-and-innovation');
    expect(content).toContain('[agent-draft]');
  });

  it('refuses unsafe file creation inputs and never overwrites a record', async () => {
    const repository = await temporaryRepository();
    await expect(scaffoldCaseStudy({ repositoryRoot: repository, slug: 'Invalid Slug', yes: true })).rejects.toThrow('Invalid slug');
    await expect(scaffoldCaseStudy({
      repositoryRoot: repository,
      slug: 'bad-relationship',
      relationships: { service_family: ['services/not-in-the-registry'] },
      yes: true,
    })).rejects.toThrow('Unknown relationship ID');

    const existing = resolve(repository, 'knowledge/case-studies/existing.md');
    await writeFile(existing, 'do not overwrite', 'utf8');
    await expect(scaffoldCaseStudy({ repositoryRoot: repository, slug: 'existing', yes: true })).rejects.toThrow('Refusing to overwrite');
    expect(await readFile(existing, 'utf8')).toBe('do not overwrite');
  });

  it('supports noninteractive command-line creation with --yes', async () => {
    const repository = await temporaryRepository();
    const npmCli = process.env.npm_execpath;
    expect(npmCli).toBeTruthy();
    const result = spawnSync(process.execPath, [
      npmCli!, 'run', 'content:new', '--',
      '--type', 'case-study', '--slug', 'noninteractive-fixture', '--yes', '--repository-root', repository,
    ], { cwd: REPOSITORY_ROOT, encoding: 'utf8' });

    expect(result.status, result.stdout + result.stderr).toBe(0);
    expect(await readFile(resolve(repository, 'knowledge/case-studies/noninteractive-fixture.md'), 'utf8')).toContain('status: draft');
  });

  it('creates a draft that passes both repository validators without changing existing records', async () => {
    const repository = await temporaryCompleteBundle();
    const beforeSourceBundle = await fingerprint(resolve(REPOSITORY_ROOT, 'knowledge'));
    const result = await scaffoldCaseStudy({
      repositoryRoot: repository,
      slug: 'validator-integration-fixture',
      title: 'Fictional test-only validator integration fixture',
      relationships: { service_family: ['services/strategy-and-innovation'] },
      yes: true,
    });

    runValidator('validate_okf.py', resolve(repository, 'knowledge'));
    runValidator('tnx_validate.py', resolve(repository, 'knowledge'));

    const generated = await readFile(result.filePath, 'utf8');
    expect(generated).toContain('status: draft');
    expect(generated).toContain('audience: internal');
    expect(generated).toContain('state: blocked');
    expect(generated).toContain('confidentiality: unconfirmed');
    expect(await fingerprint(resolve(REPOSITORY_ROOT, 'knowledge'))).toBe(beforeSourceBundle);
  });

  it('reports content status and redacts confidential affected-content details', async () => {
    const repository = await temporaryRepository();
    const source = resolve(TEST_DIRECTORY, 'fixtures/confidential-proof/case-studies/exampleco-confidential.md');
    await cp(source, resolve(repository, 'knowledge/case-studies/exampleco-confidential.md'));

    const status = await getContentStatus(repository);
    const affected = await getAffectedContent('case-studies/exampleco-confidential', repository);

    expect(status.confidential).toBe(1);
    expect(status.unconfirmedProof).toBe(0);
    expect(affected.productionEligible).toBe(false);
    expect(affected.exclusionReasons.production.map((reason) => reason.code)).toContain('PROOF_CONFIDENTIAL');
    expect(JSON.stringify(affected)).not.toContain('ExampleCo Test Fixture Confidential Engagement');
  });
});
