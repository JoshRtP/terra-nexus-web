import { access, mkdir, writeFile } from 'node:fs/promises';
import { constants } from 'node:fs';
import { dirname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createInterface } from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { stringify } from 'yaml';

import {
  assertNoCompilerErrors,
  compileOkf,
  pageFamilyForConcept,
} from '../src/lib/okf/compiler.js';
import { routeCandidateFor } from '../src/lib/okf/route-contract.js';
import type { ExclusionReason, OkfRecord, RelationshipEdge } from '../src/lib/okf/types.js';
import { finalizeContent } from './repository-check.js';

const SCRIPT_DIRECTORY = dirname(fileURLToPath(import.meta.url));
const APP_ROOT = resolve(SCRIPT_DIRECTORY, '..');
const REPOSITORY_ROOT = resolve(APP_ROOT, '../..');
const CASE_STUDY_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const PROOF_TYPES = new Set([
  'Case Study',
  'Qualification Module',
  'Representative Engagement',
  'Standards & Methodology Experience',
  'Commodity Experience',
  'Geographic Experience',
  'Tools & Data Capability',
  'Partner & Provider Experience',
]);

type Output = (line: string) => void;

export interface ScaffoldCaseStudyOptions {
  repositoryRoot?: string;
  slug: string;
  title?: string;
  relationships?: Record<string, string[]>;
  yes?: boolean;
  confirm?: () => Promise<boolean>;
  output?: Output;
  now?: Date;
}

export interface ScaffoldCaseStudyResult {
  filePath: string;
  relativePath: string;
}

export interface ContentStatusReport {
  recordsByType: Record<string, number>;
  productionEligible: number;
  previewEligible: number;
  blocked: number;
  missingApproval: number;
  confidential: number;
  unconfirmedProof: number;
  proposalOnly: number;
  invalidRelationships: number;
  compilerErrors: number;
  compilerWarnings: number;
}

export interface AffectedContentReport {
  conceptId: string;
  record?: { conceptId: string; type: string };
  forwardRelationships: RelationshipEdge[];
  reverseRelationships: RelationshipEdge[];
  futureRouteCandidates: Array<{ route: string; pageFamily: string }>;
  pageFamilies: string[];
  productionEligible: boolean;
  previewEligible: boolean;
  exclusionReasons: {
    production: ExclusionReason[];
    preview: ExclusionReason[];
  };
}

function asList(args: string[], flag: string): string[] {
  const values: string[] = [];
  for (let index = 0; index < args.length; index += 1) {
    if (args[index] === flag && args[index + 1]) values.push(args[index + 1]);
  }
  if (values.length) return values;
  const configurationName = `npm_config_${flag.slice(2).replaceAll('-', '_')}`;
  const configured = process.env[configurationName];
  return configured ? configured.split(',').map((value) => value.trim()).filter(Boolean) : [];
}

function asValue(args: string[], flag: string): string | undefined {
  return asList(args, flag).at(-1);
}

function hasFlag(args: string[], flag: string): boolean {
  if (args.includes(flag)) return true;
  const configurationName = `npm_config_${flag.slice(2).replaceAll('-', '_')}`;
  const configured = process.env[configurationName];
  return configured === 'true' || configured === '1';
}

function isProof(record: OkfRecord): boolean {
  return PROOF_TYPES.has(record.type);
}

function isMissingApproval(record: OkfRecord): boolean {
  const publication = record.publication;
  if (!publication.audience) return false;
  return publication.audience !== 'public'
    || publication.state !== 'approved'
    || !publication.approvedBy
    || !publication.approvedAt;
}

function schemaRoot(repositoryRoot: string): string {
  return resolve(repositoryRoot, 'schemas');
}

function bundleRoot(repositoryRoot: string): string {
  return resolve(repositoryRoot, 'knowledge');
}

async function exists(path: string): Promise<boolean> {
  try {
    await access(path, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

function validateRelationshipShape(field: string, id: string): void {
  const prefixes: Record<string, string> = {
    service_family: 'services/',
    service_offering: 'services/',
    area_of_expertise: 'expertise/',
    audience: 'audiences/',
  };
  const requiredPrefix = prefixes[field];
  if (requiredPrefix && !id.startsWith(requiredPrefix)) {
    throw new Error(`${field} must use a bundle-relative path ID beginning with ${requiredPrefix}`);
  }
}

export async function scaffoldCaseStudy(options: ScaffoldCaseStudyOptions): Promise<ScaffoldCaseStudyResult> {
  const repositoryRoot = resolve(options.repositoryRoot ?? REPOSITORY_ROOT);
  const print = options.output ?? console.log;
  const slug = options.slug.trim();
  if (!CASE_STUDY_SLUG.test(slug)) {
    throw new Error('Invalid slug. Use lowercase letters, numbers, and single hyphens only.');
  }

  const caseStudyDirectory = resolve(repositoryRoot, 'knowledge', 'case-studies');
  const filePath = resolve(caseStudyDirectory, `${slug}.md`);
  if (relative(caseStudyDirectory, filePath) !== `${slug}.md`) {
    throw new Error('Case-study path escaped the permitted knowledge/case-studies directory.');
  }
  const relativePath = `knowledge/case-studies/${slug}.md`;
  print(`Planned file: ${relativePath}`);
  if (await exists(filePath)) {
    throw new Error(`Refusing to overwrite existing file: ${relativePath}`);
  }

  const relationships = options.relationships ?? {};
  const compiled = await compileOkf({
    buildMode: 'production',
    bundleRoot: bundleRoot(repositoryRoot),
    schemaRoot: schemaRoot(repositoryRoot),
    writeArtifacts: false,
  });
  for (const [field, ids] of Object.entries(relationships)) {
    for (const id of ids) {
      validateRelationshipShape(field, id);
      if (!compiled.knownRelationshipIds.includes(id)) {
        throw new Error(`Unknown relationship ID for ${field}: ${id}`);
      }
    }
  }

  if (!options.yes) {
    const confirmed = options.confirm ? await options.confirm() : false;
    if (!confirmed) throw new Error('Creation cancelled. Re-run with --yes to create the planned draft.');
  }

  const createdAt = (options.now ?? new Date()).toISOString();
  const record = {
    type: 'Case Study',
    title: options.title?.trim() || `Owner input required: ${slug}`,
    description: 'Owner-supplied proof record awaiting substantive intake.',
    tags: ['proof', 'case-study', 'owner-input-required'],
    status: 'draft',
    generated: {
      by: 'terra-nexus-content-cli',
      at: createdAt,
    },
    sources: [{
      id: 'owner-intake-pending',
      resource: 'knowledge/case-studies/intake-templates/universal-proof-intake.md',
      title: 'Universal Proof and Qualification Intake Template',
      author: 'human:terra-nexus-owner',
    }],
    publication: {
      audience: 'internal',
      state: 'blocked',
      attribution: 'none',
      approved_by: null,
      approved_at: null,
    },
    confidentiality: 'unconfirmed',
    slug,
    service_family: relationships.service_family ?? [],
    service_offering: relationships.service_offering ?? [],
    area_of_expertise: relationships.area_of_expertise ?? [],
    audience: relationships.audience ?? [],
    engagement_model: relationships.engagement_model ?? [],
    commodity: relationships.commodity ?? [],
    certification: relationships.certification ?? [],
    standard: relationships.standard ?? [],
    methodology: relationships.methodology ?? [],
    regulatory_program: relationships.regulatory_program ?? [],
    geography: relationships.geography ?? [],
    client_type: 'Owner input required',
    challenge: 'Owner input required',
    work_performed: 'Owner input required',
    deliverables: [],
    tools_and_data: [],
    outcome: 'Owner input required; do not publish until substantiated and approved.',
  };
  const body = [
    '# Owner intake required',
    '',
    '## [agent-draft] Complete before review',
    '',
    'Use `knowledge/case-studies/intake-templates/universal-proof-intake.md` to document the actual engagement, disclosure constraints, relationships, deliverables, and substantiated outcome. Do not add client names, outcomes, credentials, standards experience, or claims that the owner has not supplied and approved.',
    '',
  ].join('\n');

  await mkdir(caseStudyDirectory, { recursive: true });
  // Quote the ISO timestamp so YAML loaders preserve it as a string rather
  // than converting it to a datetime value before the domain validator sees it.
  const frontmatter = stringify(record).replace(`at: ${createdAt}\n`, `at: "${createdAt}"\n`);
  await writeFile(filePath, `---\n${frontmatter}---\n\n${body}`, { encoding: 'utf8', flag: 'wx' });
  print(`Created draft: ${relativePath}`);
  print('Next steps:');
  print('1. Complete knowledge/case-studies/intake-templates/universal-proof-intake.md.');
  print('2. Replace every owner-input placeholder with verified facts.');
  print(`3. Inspect relationships: npm run content:affected -- case-studies/${slug}`);
  print('4. Regenerate inventory and run all checks: npm run content:finalize');
  print('5. Review the changed case study, inventory, and tree: git diff');
  print('6. Open a pull request for owner review.');
  print('7. Do not change publication approval fields without explicit owner approval.');
  return { filePath, relativePath };
}

export async function getContentStatus(repositoryRoot = REPOSITORY_ROOT): Promise<ContentStatusReport> {
  const options = {
    bundleRoot: bundleRoot(repositoryRoot),
    schemaRoot: schemaRoot(repositoryRoot),
    writeArtifacts: false,
  } as const;
  const [production, preview] = await Promise.all([
    compileOkf({ ...options, buildMode: 'production' }),
    compileOkf({ ...options, buildMode: 'preview' }),
  ]);
  const recordsByType: Record<string, number> = {};
  for (const record of production.allRecords) {
    recordsByType[record.type] = (recordsByType[record.type] ?? 0) + 1;
  }

  return {
    recordsByType: Object.fromEntries(Object.entries(recordsByType).sort(([left], [right]) => left.localeCompare(right))),
    productionEligible: production.graph.records.length,
    previewEligible: preview.graph.records.length,
    blocked: production.allRecords.filter((record) => record.publication.state === 'blocked').length,
    missingApproval: production.allRecords.filter(isMissingApproval).length,
    confidential: production.allRecords.filter((record) => record.proof.confidentiality === 'confidential').length,
    unconfirmedProof: production.allRecords.filter((record) => isProof(record) && record.proof.confidentiality === 'unconfirmed').length,
    proposalOnly: production.allRecords.filter((record) => record.publication.audience === 'proposal-only').length,
    invalidRelationships: production.audit.errors.filter((error) => error.code === 'RELATIONSHIP_NOT_FOUND').length,
    compilerErrors: production.audit.errors.length,
    compilerWarnings: production.audit.warnings.length,
  };
}

export async function getAffectedContent(conceptId: string, repositoryRoot = REPOSITORY_ROOT): Promise<AffectedContentReport> {
  const options = {
    bundleRoot: bundleRoot(repositoryRoot),
    schemaRoot: schemaRoot(repositoryRoot),
    writeArtifacts: false,
  } as const;
  const [production, preview] = await Promise.all([
    compileOkf({ ...options, buildMode: 'production' }),
    compileOkf({ ...options, buildMode: 'preview' }),
  ]);
  const recordsById = new Map(production.allRecords.map((record) => [record.conceptId, record]));
  const record = recordsById.get(conceptId) ?? recordsById.get(`${conceptId}/overview`);
  const eligibilityConceptId = record?.conceptId ?? conceptId;
  const forwardRelationships = production.allEdges.filter((edge) => edge.from === conceptId);
  const reverseRelationships = production.allReverseIndex[conceptId] ?? [];
  const relevantIds = new Set([
    conceptId,
    ...forwardRelationships.map((edge) => edge.to),
    ...reverseRelationships.map((edge) => edge.from),
  ]);
  const pageFamilies = Array.from(relevantIds)
    .map((id) => pageFamilyForConcept(recordsById.get(id), id))
    .filter((family): family is string => Boolean(family));

  const mayExposeRoute = Boolean(record && (
    !isProof(record)
    || record.proof.confidentiality === 'anonymized'
    || record.proof.confidentiality === 'public'
  ));
  const futureRouteCandidates = record && mayExposeRoute
    ? [routeCandidateFor(record)].filter((route): route is NonNullable<typeof route> => Boolean(route)).map((route) => ({ route: route.route, pageFamily: route.pageFamily }))
    : [];

  return {
    conceptId,
    ...(record ? { record: { conceptId: record.conceptId, type: record.type } } : {}),
    forwardRelationships,
    reverseRelationships,
    futureRouteCandidates,
    pageFamilies: [...new Set(pageFamilies)].sort(),
    productionEligible: (production.eligibility[eligibilityConceptId] ?? [{ code: 'RECORD_NOT_FOUND' }]).length === 0,
    previewEligible: (preview.eligibility[eligibilityConceptId] ?? [{ code: 'RECORD_NOT_FOUND' }]).length === 0,
    exclusionReasons: {
      production: production.eligibility[eligibilityConceptId] ?? [{ code: 'RECORD_NOT_FOUND' }],
      preview: preview.eligibility[eligibilityConceptId] ?? [{ code: 'RECORD_NOT_FOUND' }],
    },
  };
}

function renderStatus(report: ContentStatusReport): string {
  const typeLines = Object.entries(report.recordsByType).map(([type, count]) => `  ${type}: ${count}`);
  return [
    'Content status',
    'Records by type:',
    ...typeLines,
    `Production eligible: ${report.productionEligible}`,
    `Preview eligible: ${report.previewEligible}`,
    `Blocked: ${report.blocked}`,
    `Missing approval: ${report.missingApproval}`,
    `Confidential: ${report.confidential}`,
    `Unconfirmed proof: ${report.unconfirmedProof}`,
    `Proposal-only: ${report.proposalOnly}`,
    `Invalid relationships: ${report.invalidRelationships}`,
    `Compiler errors: ${report.compilerErrors}`,
    `Compiler warnings: ${report.compilerWarnings}`,
  ].join('\n');
}

function renderAffected(report: AffectedContentReport): string {
  const renderEdges = (edges: RelationshipEdge[]) => edges.length
    ? edges.map((edge) => `  ${edge.field}: ${edge.from === report.conceptId ? edge.to : edge.from}`).join('\n')
    : '  None';
  return [
    `Affected content: ${report.conceptId}`,
    `Type: ${report.record?.type ?? 'Registry concept or unknown ID'}`,
    'Forward relationships:',
    renderEdges(report.forwardRelationships),
    'Reverse relationships:',
    renderEdges(report.reverseRelationships),
    `Future route candidates: ${report.futureRouteCandidates.map((route) => route.route).join(', ') || 'None'}`,
    `Affected page families: ${report.pageFamilies.join(', ') || 'None'}`,
    `Production eligible: ${report.productionEligible}`,
    `Preview eligible: ${report.previewEligible}`,
    `Production exclusion reasons: ${report.exclusionReasons.production.map((reason) => reason.code).join(', ') || 'None'}`,
    `Preview exclusion reasons: ${report.exclusionReasons.preview.map((reason) => reason.code).join(', ') || 'None'}`,
  ].join('\n');
}

function relationshipArguments(args: string[]): Record<string, string[]> {
  return {
    service_family: asList(args, '--service-family'),
    service_offering: asList(args, '--service-offering'),
    area_of_expertise: asList(args, '--expertise'),
    audience: asList(args, '--audience'),
    engagement_model: asList(args, '--engagement-model'),
    commodity: asList(args, '--commodity'),
    geography: asList(args, '--geography'),
    standard: asList(args, '--standard'),
    certification: asList(args, '--certification'),
    methodology: asList(args, '--methodology'),
    regulatory_program: asList(args, '--regulatory-program'),
  };
}

async function interactiveCaseStudyInputs(args: string[]): Promise<{
  slug: string;
  title?: string;
  confirmed: () => Promise<boolean>;
  close: () => void;
}> {
  const providedSlug = asValue(args, '--slug');
  const providedTitle = asValue(args, '--title');
  if (providedSlug) {
    return { slug: providedSlug, title: providedTitle, confirmed: async () => false, close: () => undefined };
  }
  if (!input.isTTY) throw new Error('Noninteractive use requires --slug and --yes.');
  const prompt = createInterface({ input, output });
  const slug = await prompt.question('Case-study slug (lowercase hyphenated): ');
  const title = await prompt.question('Internal reference title (optional): ');
  return {
    slug,
    title: title || undefined,
    confirmed: async () => (await prompt.question('Create this draft? [y/N] ')).trim().toLowerCase() === 'y',
    close: () => prompt.close(),
  };
}

function repositoryRootArgument(args: string[]): string | undefined {
  const value = asValue(args, '--repository-root');
  return value ? resolve(value) : undefined;
}

function positionalArgument(args: string[]): string | undefined {
  const flagsWithValues = new Set([
    '--repository-root', '--type', '--slug', '--title', '--service-family', '--service-offering',
    '--expertise', '--audience', '--engagement-model', '--commodity', '--geography', '--standard',
    '--certification', '--methodology', '--regulatory-program',
  ]);
  for (let index = 0; index < args.length; index += 1) {
    if (flagsWithValues.has(args[index])) {
      index += 1;
      continue;
    }
    if (!args[index].startsWith('-')) return args[index];
  }
  return undefined;
}

async function runCli(): Promise<void> {
  const [command, ...args] = process.argv.slice(2);
  const json = hasFlag(args, '--json');
  const repositoryRoot = repositoryRootArgument(args);
  if (command === 'new') {
    // Some Windows PowerShell/npm combinations forward a bare `case-study`
    // value for `--type case-study`; accept that interactive form without
    // weakening confirmation or noninteractive --yes safeguards.
    const requestedType = asValue(args, '--type') ?? (args[0] === 'case-study' ? 'case-study' : undefined);
    if (requestedType !== 'case-study') throw new Error('Only --type case-study is supported in Phase 2B.');
    const interactive = await interactiveCaseStudyInputs(args);
    let result;
    try {
      result = await scaffoldCaseStudy({
        repositoryRoot,
        slug: interactive.slug,
        title: interactive.title,
        relationships: relationshipArguments(args),
        yes: hasFlag(args, '--yes'),
        confirm: interactive.confirmed,
      });
    } finally {
      interactive.close();
    }
    if (json) console.log(JSON.stringify(result, null, 2));
    return;
  }
  if (command === 'status') {
    const report = await getContentStatus(repositoryRoot);
    console.log(json ? JSON.stringify(report, null, 2) : renderStatus(report));
    return;
  }
  if (command === 'affected') {
    const conceptId = positionalArgument(args);
    if (!conceptId) throw new Error('Usage: npm run content:affected -- <concept-id>');
    const report = await getAffectedContent(conceptId, repositoryRoot);
    console.log(json ? JSON.stringify(report, null, 2) : renderAffected(report));
    return;
  }
  if (command === 'validate') {
    const [production, preview] = await Promise.all([
      compileOkf({ buildMode: 'production', writeArtifacts: true }),
      compileOkf({ buildMode: 'preview', writeArtifacts: true }),
    ]);
    assertNoCompilerErrors(production);
    assertNoCompilerErrors(preview);
    const result = {
      production: { scanned: production.audit.scannedRecords, eligible: production.audit.eligibleRecords },
      preview: { scanned: preview.audit.scannedRecords, eligible: preview.audit.eligibleRecords },
    };
    console.log(json ? JSON.stringify(result, null, 2) : `Content compiler validated: ${result.production.scanned} scanned; ${result.production.eligible} production eligible; ${result.preview.eligible} preview eligible.`);
    return;
  }
  if (command === 'finalize') {
    const result = await finalizeContent({ repositoryRoot });
    if (json) console.log(JSON.stringify(result, null, 2));
    return;
  }
  throw new Error('Usage: content-cli.ts <new|status|affected|validate|finalize>');
}

const executedDirectly = process.argv[1] && resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url));
if (executedDirectly) {
  runCli().catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  });
}
