import { mkdir, mkdtemp, readFile, rm } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterEach, describe, expect, it } from 'vitest';

import { compileOkf, duplicateConceptIdErrors } from '../src/lib/okf/compiler.js';

const TEST_DIRECTORY = dirname(fileURLToPath(import.meta.url));
const APP_ROOT = resolve(TEST_DIRECTORY, '..');
const REPOSITORY_ROOT = resolve(APP_ROOT, '../..');
const FIXTURES = resolve(TEST_DIRECTORY, 'fixtures');
const temporaryDirectories: string[] = [];

async function fixtureOutputDirectory(): Promise<string> {
  const parent = resolve(APP_ROOT, '.test-tmp');
  await mkdir(parent, { recursive: true });
  const directory = await mkdtemp(resolve(parent, 'compiler-'));
  temporaryDirectories.push(directory);
  return directory;
}

async function compileFixture(name: string, buildMode: 'production' | 'preview' = 'production') {
  const outputDirectory = await fixtureOutputDirectory();
  const result = await compileOkf({
    buildMode,
    bundleRoot: resolve(FIXTURES, name),
    schemaRoot: resolve(REPOSITORY_ROOT, 'schemas'),
    outputDirectory,
    writeArtifacts: true,
  });
  return { ...result, outputDirectory };
}

afterEach(async () => {
  await Promise.all(temporaryDirectories.splice(0).map((directory) => rm(directory, { recursive: true, force: true })));
});

describe('read-only OKF compiler', () => {
  it('parses frontmatter, generates bundle-relative IDs, and emits deterministic artifacts', async () => {
    const first = await compileFixture('valid-production');
    const second = await compileFixture('valid-production');

    expect(first.audit.errors).toEqual([]);
    expect(first.graph.records.map((record) => record.conceptId)).toEqual(['services/example-service']);
    expect(first.graph.routeCandidates).toContainEqual({
      conceptId: 'services/example-service',
      route: '/services/example-service',
      pageFamily: 'service-family',
    });
    expect(first.graph).toEqual(second.graph);
    expect(first.audit).toEqual(second.audit);
  });

  it('applies production and protected-preview eligibility independently', async () => {
    const production = await compileFixture('valid-preview');
    const preview = await compileFixture('valid-preview', 'preview');
    const blocked = await compileFixture('blocked', 'preview');

    expect(production.graph.records).toHaveLength(0);
    expect(preview.graph.records.map((record) => record.conceptId)).toEqual(['insights/fictional-feedstock-program']);
    expect(blocked.graph.records).toHaveLength(0);
    expect(blocked.audit.excludedRecords[0]?.reasons.map((reason) => reason.code)).toContain('PREVIEW_STATE_REQUIRED');
  });

  it('hard-excludes proposal-only records from every graph and emits only opaque diagnostic references', async () => {
    const production = await compileFixture('proposal-only');
    const preview = await compileFixture('proposal-only', 'preview');

    for (const result of [production, preview]) {
      expect(result.graph.records).toHaveLength(0);
      expect(result.audit.excludedRecords[0]?.reasons).toContainEqual({
        code: 'PROPOSAL_ONLY_EXCLUDED',
        field: 'publication.audience',
      });
      expect(JSON.stringify(result.audit)).not.toContain('Proposal-only Fictional Fixture');
      expect(JSON.stringify(result.audit)).not.toContain('insights/proposal-fixture');
      expect(JSON.stringify(result.audit)).not.toContain('proposal-fixture.md');
      expect(JSON.stringify(result.graph)).not.toContain('Proposal-only Fictional Fixture');
      expect(result.audit.excludedRecords[0]?.conceptId).toMatch(/^sensitive\/\[redacted\]-[a-f0-9]{12}$/);
    }
  });

  it('enforces proof confidentiality and keeps sensitive diagnostic JSON opaque', async () => {
    const confidential = await compileFixture('confidential-proof');
    const confidentialAgain = await compileFixture('confidential-proof');
    const unconfirmed = await compileFixture('unconfirmed-proof');
    const anonymized = await compileFixture('anonymized-proof');

    expect(confidential.graph.records).toHaveLength(0);
    expect(confidential.audit.excludedRecords[0]?.reasons.map((reason) => reason.code)).toContain('PROOF_CONFIDENTIAL');
    expect(confidential.audit.excludedRecords[0]?.conceptId).toMatch(/^case-studies\/\[redacted\]-[a-f0-9]{12}$/);
    expect(confidentialAgain.audit.excludedRecords[0]?.conceptId).toBe(confidential.audit.excludedRecords[0]?.conceptId);
    expect(confidential.audit.excludedRecords[0]?.sourcePath).toMatch(/^case-studies\/\[redacted\]-[a-f0-9]{12}\.md$/);
    expect(confidential.audit.errors.map((error) => error.conceptId)).toEqual([
      confidential.audit.excludedRecords[0]?.conceptId,
    ]);
    expect(confidential.audit.warnings.map((warning) => warning.conceptId)).toEqual([
      confidential.audit.excludedRecords[0]?.conceptId,
    ]);
    const confidentialAuditFile = await readFile(resolve(confidential.outputDirectory, 'content-audit.production.json'), 'utf8');
    const confidentialGraphFile = await readFile(resolve(confidential.outputDirectory, 'content-graph.production.json'), 'utf8');
    for (const sensitiveValue of [
      'ExampleCo Test Fixture Confidential Engagement',
      'case-studies/exampleco-confidential',
      'exampleco-confidential.md',
      'EXAMPLECO-SENSITIVE-BODY-EXCERPT',
    ]) {
      expect(JSON.stringify(confidential.audit)).not.toContain(sensitiveValue);
      expect(confidentialAuditFile).not.toContain(sensitiveValue);
      expect(confidentialGraphFile).not.toContain(sensitiveValue);
    }
    expect(unconfirmed.graph.records).toHaveLength(0);
    expect(unconfirmed.audit.excludedRecords[0]?.reasons.map((reason) => reason.code)).toContain('PROOF_CONFIDENTIALITY_UNCONFIRMED');
    expect(JSON.stringify(unconfirmed.audit)).not.toContain('case-studies/test-only-county');
    expect(JSON.stringify(unconfirmed.audit)).not.toContain('test-only-county.md');
    expect(anonymized.graph.records).toHaveLength(1);
  });

  it('reports missing approvers and invalid timestamps as ordinary publication exclusions', async () => {
    const missingApprover = await compileFixture('missing-approver');
    const invalidApproval = await compileFixture('invalid-approval');

    expect(missingApprover.audit.errors).toEqual([]);
    expect(missingApprover.audit.excludedRecords[0]?.reasons.map((reason) => reason.code)).toContain('APPROVER_MISSING');
    expect(invalidApproval.audit.errors).toEqual([]);
    expect(invalidApproval.audit.excludedRecords[0]?.reasons.map((reason) => reason.code)).toContain('APPROVAL_DATE_INVALID');
  });

  it('fails after writing a safe audit for invalid frontmatter, dangling links, and duplicate routes', async () => {
    const malformed = await compileFixture('invalid-frontmatter');
    const dangling = await compileFixture('dangling-relationship');
    const duplicateRoute = await compileFixture('duplicate-route');

    expect(malformed.audit.errors.map((error) => error.code)).toContain('INVALID_FRONTMATTER');
    expect(dangling.audit.errors.map((error) => error.code)).toContain('RELATIONSHIP_NOT_FOUND');
    expect(duplicateRoute.audit.errors.map((error) => error.code)).toContain('DUPLICATE_ROUTE');
  });

  it('detects duplicate concept identifiers and builds forward and reverse indexes', async () => {
    const records = JSON.parse(await readFile(resolve(FIXTURES, 'duplicate-concept-id/fixture-records.json'), 'utf8')) as Array<{
      conceptId: string;
      type: string;
      sourcePath: string;
    }>;
    const reverse = await compileFixture('reverse-relationships');

    expect(duplicateConceptIdErrors(records).map((error) => error.code)).toEqual(['DUPLICATE_CONCEPT_ID']);
    expect(reverse.allEdges).toContainEqual({
      from: 'case-studies/example-proof',
      to: 'services/example-service',
      field: 'service_family',
    });
    expect(reverse.allReverseIndex['services/example-service']).toContainEqual({
      from: 'case-studies/example-proof',
      to: 'services/example-service',
      field: 'service_family',
    });
  });

  it('does not mutate an input bundle during compilation', async () => {
    const input = resolve(FIXTURES, 'valid-production/services/example-service.md');
    const before = await readFile(input, 'utf8');
    await compileFixture('valid-production');
    expect(await readFile(input, 'utf8')).toBe(before);
  });
});
