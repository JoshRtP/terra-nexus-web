import { createHash } from 'node:crypto';
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, extname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse, parseDocument } from 'yaml';

import { pageFamilyForType, routeCandidateFor } from './route-contract.js';
import type {
  BuildMode,
  CompilationAudit,
  CompilationResult,
  CompileOptions,
  CompilerError,
  CompilerWarning,
  ContentGraph,
  ExcludedRecord,
  ExclusionReason,
  OkfRecord,
  Provenance,
  PublicationMetadata,
  RelationshipEdge,
} from './types.js';

const MODULE_DIRECTORY = dirname(fileURLToPath(import.meta.url));
const APP_ROOT = resolve(MODULE_DIRECTORY, '../../..');
const REPOSITORY_ROOT = resolve(APP_ROOT, '../..');

const VALID_STATUSES = new Set(['draft', 'stable', 'deprecated']);
const VALID_AUDIENCES = new Set(['internal', 'proposal-only', 'public']);
const VALID_PUBLICATION_STATES = new Set(['blocked', 'preview', 'approved']);
const VALID_CONFIDENTIALITY = new Set(['unconfirmed', 'confidential', 'anonymized', 'public']);
const ISO_TIMESTAMP = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/;
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const RELATIONSHIP_FIELDS = new Set([
  'service_family',
  'service_offering',
  'area_of_expertise',
  'audience',
  'engagement_model',
  'case_study',
  'qualification',
  'insight',
  'commodity',
  'geography',
  'standard',
  'certification',
  'methodology',
  'regulatory_program',
  'related_services',
  'related_expertise',
  'related_audiences',
  'related_case_studies',
  'related_qualifications',
  'related_insights',
]);

interface InternalRecord extends OkfRecord {
  frontmatter: Record<string, unknown>;
}

interface RegistryData {
  knownIds: Set<string>;
  serviceFamilyByDisplayName: Map<string, string>;
  proofTypes: Set<string>;
}

interface ScanResult {
  records: InternalRecord[];
  errors: CompilerError[];
  warnings: CompilerWarning[];
  invalidExclusions: ExcludedRecord[];
}

function toPosix(path: string): string {
  return path.replace(/\\/g, '/');
}

function sourcePathFor(filePath: string): string {
  const path = toPosix(relative(REPOSITORY_ROOT, filePath));
  return path.startsWith('../') ? toPosix(filePath) : path;
}

function conceptIdFor(filePath: string, bundleRoot: string): string {
  return toPosix(relative(bundleRoot, filePath)).replace(/\.md$/i, '');
}

function asNonEmptyString(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim() ? value.trim() : undefined;
}

function isObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function asProvenance(value: unknown): Provenance | undefined {
  if (!isObject(value)) return undefined;
  return { by: asNonEmptyString(value.by), at: asNonEmptyString(value.at) };
}

function asPublication(value: unknown): PublicationMetadata {
  if (!isObject(value)) return {};
  return {
    audience: asNonEmptyString(value.audience),
    state: asNonEmptyString(value.state),
    attribution: asNonEmptyString(value.attribution),
    approvedBy: asNonEmptyString(value.approved_by) ?? null,
    approvedAt: asNonEmptyString(value.approved_at) ?? null,
  };
}

function recordIsSensitive(record: OkfRecord): boolean {
  return record.publication.audience === 'proposal-only'
    || record.proof.confidentiality === 'confidential'
    || record.proof.confidentiality === 'unconfirmed';
}

function diagnosticBucket(record: Pick<OkfRecord, 'conceptId'>): string {
  return record.conceptId.startsWith('case-studies/') ? 'case-studies' : 'sensitive';
}

/**
 * Keep audit records useful without publishing a potentially client-identifying
 * slug. The hash includes the source state, so repeated diagnostics for the
 * same source can be correlated while a changed record receives a new token.
 */
function opaqueDiagnosticReference(record: OkfRecord): string {
  const sourceState = JSON.stringify({
    conceptId: record.conceptId,
    sourcePath: record.sourcePath,
    type: record.type,
    status: record.status,
    publication: record.publication,
    proof: record.proof,
    slug: record.slug,
    body: record.body,
    frontmatter: 'frontmatter' in record ? record.frontmatter : undefined,
  });
  const hash = createHash('sha256').update(sourceState).digest('hex').slice(0, 12);
  return `${diagnosticBucket(record)}/[redacted]-${hash}`;
}

function safeConceptId(record: OkfRecord): string {
  return recordIsSensitive(record) ? opaqueDiagnosticReference(record) : record.conceptId;
}

function safeSourcePath(record: OkfRecord): string {
  if (!recordIsSensitive(record)) return record.sourcePath;
  return `${opaqueDiagnosticReference(record)}.md`;
}

function safeExcludedRecord(record: OkfRecord, reasons: ExclusionReason[]): ExcludedRecord {
  return {
    conceptId: safeConceptId(record),
    recordType: record.type,
    sourcePath: safeSourcePath(record),
    reasons,
  };
}

function sourceTextLooksSensitive(text: string): boolean {
  return /(?:^|\n)\s*confidentiality\s*:\s*["']?(?:confidential|unconfirmed)["']?\s*(?:#.*)?$/mi.test(text)
    || /(?:^|\n)\s*audience\s*:\s*["']?proposal-only["']?\s*(?:#.*)?$/mi.test(text);
}

function safeRawDiagnostic(
  code: string,
  conceptId: string,
  recordType: string,
  sourcePath: string,
  sourceText: string,
  field?: string,
): CompilerError {
  if (!sourceTextLooksSensitive(sourceText)) return errorFor(code, conceptId, recordType, sourcePath, field);
  const hash = createHash('sha256')
    .update(JSON.stringify({ conceptId, sourcePath, sourceText }))
    .digest('hex')
    .slice(0, 12);
  const reference = `${conceptId.startsWith('case-studies/') ? 'case-studies' : 'sensitive'}/[redacted]-${hash}`;
  return errorFor(code, reference, recordType, `${reference}.md`, field);
}

function safeDiagnostic<T extends CompilerError | CompilerWarning>(
  diagnostic: T,
  recordsById: ReadonlyMap<string, InternalRecord>,
): T {
  const record = recordsById.get(diagnostic.conceptId);
  if (!record || !recordIsSensitive(record)) return diagnostic;
  return {
    ...diagnostic,
    conceptId: safeConceptId(record),
    sourcePath: safeSourcePath(record),
  };
}

function isValidTimestamp(value: string | null | undefined): boolean {
  return Boolean(value && ISO_TIMESTAMP.test(value) && !Number.isNaN(Date.parse(value)));
}

function isProofRecord(record: OkfRecord, proofTypes: Set<string>): boolean {
  return proofTypes.has(record.type);
}

async function markdownFiles(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map(async (entry) => {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) return markdownFiles(path);
    return extname(entry.name).toLowerCase() === '.md' ? [path] : [];
  }));
  return files.flat().sort((left, right) => left.localeCompare(right));
}

function splitFrontmatter(text: string): { frontmatter?: string; body: string; malformed?: boolean } {
  const normalized = text.replace(/\r\n/g, '\n');
  if (!normalized.startsWith('---\n')) return { body: normalized };
  const end = normalized.indexOf('\n---\n', 4);
  if (end < 0) return { body: normalized, malformed: true };
  return {
    frontmatter: normalized.slice(4, end),
    body: normalized.slice(end + 5),
  };
}

function errorFor(
  code: string,
  conceptId: string,
  recordType: string,
  sourcePath: string,
  field?: string,
): CompilerError {
  return { code, conceptId, recordType, sourcePath, ...(field ? { field } : {}) };
}

function warningFor(
  code: string,
  record: OkfRecord,
  field?: string,
): CompilerWarning {
  return {
    code,
    conceptId: record.conceptId,
    recordType: record.type,
    sourcePath: safeSourcePath(record),
    ...(field ? { field } : {}),
  };
}

function collectPathIds(value: unknown, knownIds: Set<string>): void {
  if (Array.isArray(value)) {
    value.forEach((item) => collectPathIds(item, knownIds));
    return;
  }
  if (!isObject(value)) return;
  const pathId = asNonEmptyString(value.path_id);
  if (pathId) knownIds.add(pathId);
  Object.values(value).forEach((item) => collectPathIds(item, knownIds));
}

async function loadRegistryData(schemaRoot: string): Promise<RegistryData> {
  const readSchema = async (name: string): Promise<Record<string, unknown>> => {
    const content = await readFile(resolve(schemaRoot, name), 'utf8');
    const parsed = parse(content);
    return isObject(parsed) ? parsed : {};
  };

  const [services, expertise, audiences, engagements, proof] = await Promise.all([
    readSchema('service-families.yml'),
    readSchema('expertise-topics.yml'),
    readSchema('audience-segments.yml'),
    readSchema('engagement-models.yml'),
    readSchema('proof-record-types.yml'),
  ]);

  const knownIds = new Set<string>();
  [services, expertise, audiences].forEach((registry) => collectPathIds(registry, knownIds));

  const serviceFamilyByDisplayName = new Map<string, string>();
  const serviceFamilies = services.service_families;
  if (Array.isArray(serviceFamilies)) {
    for (const service of serviceFamilies) {
      if (!isObject(service)) continue;
      const pathId = asNonEmptyString(service.path_id);
      const displayName = asNonEmptyString(service.display_name);
      if (pathId && displayName) serviceFamilyByDisplayName.set(displayName.toLowerCase(), pathId);
    }
  }

  const engagementModels = engagements.engagement_models;
  if (Array.isArray(engagementModels)) {
    for (const model of engagementModels) {
      if (!isObject(model)) continue;
      const id = asNonEmptyString(model.id);
      if (id) knownIds.add(id);
    }
  }

  const proofTypes = new Set<string>();
  const proofRecordTypes = proof.proof_record_types;
  if (Array.isArray(proofRecordTypes)) {
    for (const item of proofRecordTypes) {
      if (!isObject(item)) continue;
      const type = asNonEmptyString(item.type);
      if (type) proofTypes.add(type);
    }
  }

  return { knownIds, serviceFamilyByDisplayName, proofTypes };
}

function relationshipValues(value: unknown): string[] | undefined {
  if (typeof value === 'string') return value.trim() ? [value.trim()] : [];
  if (Array.isArray(value) && value.every((item) => typeof item === 'string')) {
    return value.map((item) => item.trim()).filter(Boolean);
  }
  if (value === undefined || value === null) return [];
  return undefined;
}

function parseRelationships(
  record: InternalRecord,
  registry: RegistryData,
  errors: CompilerError[],
  warnings: CompilerWarning[],
): RelationshipEdge[] {
  const edges: RelationshipEdge[] = [];
  const addField = (field: string, value: unknown): void => {
    const values = relationshipValues(value);
    if (values === undefined) {
      errors.push(errorFor('INVALID_FRONTMATTER', record.conceptId, record.type, safeSourcePath(record), field));
      return;
    }
    for (const originalTarget of values) {
      let target = originalTarget;
      let adapter: RelationshipEdge['adapter'];
      if (field === 'service_family' && !target.startsWith('services/')) {
        const mapped = registry.serviceFamilyByDisplayName.get(target.toLowerCase());
        if (mapped) {
          target = mapped;
          adapter = 'legacy-service-family-display-name';
          warnings.push(warningFor('LEGACY_SERVICE_FAMILY_ADAPTED', record, field));
        }
      }
      edges.push({ from: record.conceptId, to: target, field, ...(adapter ? { adapter } : {}) });
    }
  };

  for (const field of RELATIONSHIP_FIELDS) {
    if (field in record.frontmatter) addField(field, record.frontmatter[field]);
  }

  const declared = record.frontmatter.relationships;
  if (declared !== undefined) {
    if (!isObject(declared)) {
      errors.push(errorFor('INVALID_FRONTMATTER', record.conceptId, record.type, safeSourcePath(record), 'relationships'));
    } else {
      for (const [field, value] of Object.entries(declared)) {
        if (!RELATIONSHIP_FIELDS.has(field)) {
          errors.push(errorFor('UNMAPPED_RELATIONSHIP_FIELD', record.conceptId, record.type, safeSourcePath(record), `relationships.${field}`));
          continue;
        }
        addField(field, value);
      }
    }
  }

  for (const field of Object.keys(record.frontmatter)) {
    if ((field.startsWith('related_') || field.endsWith('_relationship')) && !RELATIONSHIP_FIELDS.has(field)) {
      errors.push(errorFor('UNMAPPED_RELATIONSHIP_FIELD', record.conceptId, record.type, safeSourcePath(record), field));
    }
  }

  return edges.sort((left, right) => `${left.field}:${left.to}`.localeCompare(`${right.field}:${right.to}`));
}

async function scanBundle(bundleRoot: string, registry: RegistryData): Promise<ScanResult> {
  const records: InternalRecord[] = [];
  const errors: CompilerError[] = [];
  const warnings: CompilerWarning[] = [];
  const invalidExclusions: ExcludedRecord[] = [];
  const rootIndex = resolve(bundleRoot, 'index.md');

  for (const filePath of await markdownFiles(bundleRoot)) {
    if (filePath === rootIndex || filePath.endsWith('/log.md') || filePath.endsWith('\\log.md')) continue;
    const conceptId = conceptIdFor(filePath, bundleRoot);
    const sourcePath = sourcePathFor(filePath);
    const text = await readFile(filePath, 'utf8');
    const { frontmatter, body, malformed } = splitFrontmatter(text);
    if (malformed) {
      const error = safeRawDiagnostic('INVALID_FRONTMATTER', conceptId, 'unknown', sourcePath, text);
      errors.push(error);
      invalidExclusions.push({
        conceptId: error.conceptId,
        recordType: 'unknown',
        sourcePath: error.sourcePath,
        reasons: [{ code: 'INVALID_FRONTMATTER' }],
      });
      continue;
    }
    if (!frontmatter) continue;

    let parsed: unknown;
    try {
      const document = parseDocument(frontmatter);
      if (document.errors.length) throw new Error(document.errors.map((error) => error.message).join('; '));
      parsed = document.toJS();
    } catch {
      const error = safeRawDiagnostic('INVALID_FRONTMATTER', conceptId, 'unknown', sourcePath, text);
      errors.push(error);
      invalidExclusions.push({
        conceptId: error.conceptId,
        recordType: 'unknown',
        sourcePath: error.sourcePath,
        reasons: [{ code: 'INVALID_FRONTMATTER' }],
      });
      continue;
    }

    if (!isObject(parsed)) {
      const error = safeRawDiagnostic('INVALID_FRONTMATTER', conceptId, 'unknown', sourcePath, text);
      errors.push(error);
      invalidExclusions.push({
        conceptId: error.conceptId,
        recordType: 'unknown',
        sourcePath: error.sourcePath,
        reasons: [{ code: 'INVALID_FRONTMATTER' }],
      });
      continue;
    }

    const type = asNonEmptyString(parsed.type);
    if (!type) {
      const error = safeRawDiagnostic('INVALID_FRONTMATTER', conceptId, 'unknown', sourcePath, text, 'type');
      errors.push(error);
      invalidExclusions.push({
        conceptId: error.conceptId,
        recordType: 'unknown',
        sourcePath: error.sourcePath,
        reasons: [{ code: 'INVALID_FRONTMATTER', field: 'type' }],
      });
      continue;
    }

    const publicationValue = parsed.publication;
    const record: InternalRecord = {
      conceptId,
      sourcePath,
      type,
      title: asNonEmptyString(parsed.title),
      description: asNonEmptyString(parsed.description),
      status: asNonEmptyString(parsed.status),
      publication: asPublication(publicationValue),
      proof: { confidentiality: asNonEmptyString(parsed.confidentiality) },
      body,
      relationships: [],
      generated: asProvenance(parsed.generated),
      verified: asProvenance(parsed.verified),
      slug: asNonEmptyString(parsed.slug),
      frontmatter: parsed,
    };

    if (!record.status || !VALID_STATUSES.has(record.status)) {
      errors.push(errorFor('INVALID_FRONTMATTER', record.conceptId, record.type, safeSourcePath(record), 'status'));
    }
    if (publicationValue !== undefined && publicationValue !== null && !isObject(publicationValue)) {
      errors.push(errorFor('INVALID_FRONTMATTER', record.conceptId, record.type, safeSourcePath(record), 'publication'));
    }
    if (record.publication.audience && !VALID_AUDIENCES.has(record.publication.audience)) {
      errors.push(errorFor('INVALID_FRONTMATTER', record.conceptId, record.type, safeSourcePath(record), 'publication.audience'));
    }
    if (record.publication.state && !VALID_PUBLICATION_STATES.has(record.publication.state)) {
      errors.push(errorFor('INVALID_FRONTMATTER', record.conceptId, record.type, safeSourcePath(record), 'publication.state'));
    }
    if (record.proof.confidentiality && !VALID_CONFIDENTIALITY.has(record.proof.confidentiality)) {
      errors.push(errorFor('INVALID_FRONTMATTER', record.conceptId, record.type, safeSourcePath(record), 'confidentiality'));
    }
    if (record.slug && !SLUG.test(record.slug)) {
      errors.push(errorFor('INVALID_FRONTMATTER', record.conceptId, record.type, safeSourcePath(record), 'slug'));
    }

    record.relationships = parseRelationships(record, registry, errors, warnings);
    records.push(record);
  }

  return { records, errors, warnings, invalidExclusions };
}

function eligibilityReasons(record: OkfRecord, mode: BuildMode, proofTypes: Set<string>): ExclusionReason[] {
  if (record.publication.audience === 'proposal-only') {
    return [{ code: 'PROPOSAL_ONLY_EXCLUDED', field: 'publication.audience' }];
  }

  const proofReason = (): ExclusionReason | undefined => {
    if (!isProofRecord(record, proofTypes)) return undefined;
    if (record.proof.confidentiality === 'unconfirmed' || !record.proof.confidentiality) {
      return { code: 'PROOF_CONFIDENTIALITY_UNCONFIRMED', field: 'confidentiality' };
    }
    if (record.proof.confidentiality !== 'anonymized' && record.proof.confidentiality !== 'public') {
      return { code: 'PROOF_CONFIDENTIAL', field: 'confidentiality' };
    }
    return undefined;
  };

  const productionReasons: ExclusionReason[] = [];
  if (record.status !== 'stable') productionReasons.push({ code: 'STATUS_NOT_STABLE', field: 'status' });
  if (record.publication.audience !== 'public') productionReasons.push({ code: 'AUDIENCE_NOT_PUBLIC', field: 'publication.audience' });
  if (record.publication.state !== 'approved') productionReasons.push({ code: 'PUBLICATION_NOT_APPROVED', field: 'publication.state' });
  if (!record.publication.approvedBy) productionReasons.push({ code: 'APPROVER_MISSING', field: 'publication.approved_by' });
  if (!isValidTimestamp(record.publication.approvedAt)) {
    productionReasons.push({ code: 'APPROVAL_DATE_INVALID', field: 'publication.approved_at' });
  }
  const proof = proofReason();
  if (proof) productionReasons.push(proof);

  if (mode === 'production' || productionReasons.length === 0) return productionReasons;

  const previewReasons: ExclusionReason[] = [];
  if (record.status !== 'draft' && record.status !== 'stable') {
    previewReasons.push({ code: 'STATUS_NOT_STABLE', field: 'status' });
  }
  if (record.publication.audience !== 'internal') {
    previewReasons.push({ code: 'PREVIEW_AUDIENCE_REQUIRED', field: 'publication.audience' });
  }
  if (record.publication.state !== 'preview') {
    previewReasons.push({ code: 'PREVIEW_STATE_REQUIRED', field: 'publication.state' });
  }
  if (proof) previewReasons.push(proof);
  return previewReasons;
}

function reverseIndexFor(edges: RelationshipEdge[]): Record<string, RelationshipEdge[]> {
  const index: Record<string, RelationshipEdge[]> = {};
  for (const edge of edges) {
    (index[edge.to] ??= []).push(edge);
  }
  for (const target of Object.keys(index)) {
    index[target].sort((left, right) => `${left.from}:${left.field}`.localeCompare(`${right.from}:${right.field}`));
  }
  return Object.fromEntries(Object.entries(index).sort(([left], [right]) => left.localeCompare(right)));
}

function sortErrors<T extends CompilerError | CompilerWarning>(items: T[]): T[] {
  return items.sort((left, right) => (
    `${left.code}:${left.conceptId}:${left.field ?? ''}`.localeCompare(`${right.code}:${right.conceptId}:${right.field ?? ''}`)
  ));
}

export function duplicateConceptIdErrors(records: readonly Pick<OkfRecord, 'conceptId' | 'type' | 'sourcePath'>[]): CompilerError[] {
  const seen = new Map<string, Pick<OkfRecord, 'conceptId' | 'type' | 'sourcePath'>>();
  const errors: CompilerError[] = [];
  for (const record of records) {
    const previous = seen.get(record.conceptId);
    if (previous) {
      errors.push(errorFor('DUPLICATE_CONCEPT_ID', record.conceptId, record.type, record.sourcePath));
      continue;
    }
    seen.set(record.conceptId, record);
  }
  return errors;
}

function defaultPaths(options: CompileOptions): Required<CompileOptions> {
  return {
    buildMode: options.buildMode,
    bundleRoot: options.bundleRoot ? resolve(options.bundleRoot) : resolve(REPOSITORY_ROOT, 'knowledge'),
    schemaRoot: options.schemaRoot ? resolve(options.schemaRoot) : resolve(REPOSITORY_ROOT, 'schemas'),
    outputDirectory: options.outputDirectory ? resolve(options.outputDirectory) : resolve(APP_ROOT, '.generated'),
    writeArtifacts: options.writeArtifacts ?? true,
  };
}

function publicRecord(record: InternalRecord): OkfRecord {
  const { frontmatter: _frontmatter, ...safeRecord } = record;
  return safeRecord;
}

export async function compileOkf(options: CompileOptions): Promise<CompilationResult> {
  const paths = defaultPaths(options);
  const registry = await loadRegistryData(paths.schemaRoot);
  const scan = await scanBundle(paths.bundleRoot, registry);
  const records = scan.records.sort((left, right) => left.conceptId.localeCompare(right.conceptId));
  const allErrors = [...scan.errors, ...duplicateConceptIdErrors(records)];
  const recordById = new Map(records.map((record) => [record.conceptId, record]));
  const knownRelationshipIds = new Set([...registry.knownIds, ...recordById.keys()]);
  const invalidIds = new Set<string>();

  for (const error of allErrors) invalidIds.add(error.conceptId);
  for (const record of records) {
    for (const edge of record.relationships) {
      if (!knownRelationshipIds.has(edge.to)) {
        allErrors.push(errorFor('RELATIONSHIP_NOT_FOUND', record.conceptId, record.type, safeSourcePath(record), edge.field));
        invalidIds.add(record.conceptId);
      }
    }
  }

  const eligibility: Record<string, ExclusionReason[]> = {};
  const excluded = [...scan.invalidExclusions];
  const eligibleRecords: InternalRecord[] = [];
  for (const record of records) {
    const reasons = eligibilityReasons(record, paths.buildMode, registry.proofTypes);
    if (invalidIds.has(record.conceptId)) {
      const relatedError = allErrors.find((error) => error.conceptId === record.conceptId);
      reasons.push({ code: relatedError?.code ?? 'INVALID_FRONTMATTER', field: relatedError?.field });
    }
    const uniqueReasons = Array.from(new Map(reasons.map((reason) => [`${reason.code}:${reason.field ?? ''}`, reason])).values());
    eligibility[record.conceptId] = uniqueReasons;
    if (uniqueReasons.length) excluded.push(safeExcludedRecord(record, uniqueReasons));
    else eligibleRecords.push(record);
  }

  const eligibleEdges = eligibleRecords.flatMap((record) => record.relationships);
  const routeCandidates = eligibleRecords
    .map(routeCandidateFor)
    .filter((route): route is NonNullable<typeof route> => Boolean(route))
    .sort((left, right) => left.route.localeCompare(right.route));
  const routes = new Map<string, string>();
  for (const route of routeCandidates) {
    if (routes.has(route.route)) {
      const record = recordById.get(route.conceptId);
      if (record) {
        allErrors.push(errorFor('DUPLICATE_ROUTE', record.conceptId, record.type, safeSourcePath(record), 'slug'));
      }
    } else {
      routes.set(route.route, route.conceptId);
    }
  }

  const graph: ContentGraph = {
    mode: paths.buildMode,
    records: eligibleRecords.map(publicRecord),
    edges: eligibleEdges,
    reverseIndex: reverseIndexFor(eligibleEdges),
    routeCandidates,
  };
  const safeErrors = allErrors.map((error) => safeDiagnostic(error, recordById));
  const safeWarnings = scan.warnings.map((warning) => safeDiagnostic(warning, recordById));
  const audit: CompilationAudit = {
    formatVersion: '1.0',
    buildMode: paths.buildMode,
    scannedRecords: records.length,
    eligibleRecords: graph.records.length,
    excludedRecords: excluded.sort((left, right) => left.conceptId.localeCompare(right.conceptId)),
    errors: sortErrors(safeErrors),
    warnings: sortErrors(safeWarnings),
  };

  if (paths.writeArtifacts) {
    await writeCompilationArtifacts(paths.outputDirectory, graph, audit);
  }

  const allEdges = records.flatMap((record) => record.relationships);
  return {
    graph,
    audit,
    allRecords: records.map(publicRecord),
    allEdges,
    allReverseIndex: reverseIndexFor(allEdges),
    eligibility,
    knownRelationshipIds: [...knownRelationshipIds].sort(),
  };
}

export async function writeCompilationArtifacts(
  outputDirectory: string,
  graph: ContentGraph,
  audit: CompilationAudit,
): Promise<void> {
  await mkdir(outputDirectory, { recursive: true });
  await Promise.all([
    writeFile(resolve(outputDirectory, `content-graph.${graph.mode}.json`), `${JSON.stringify(graph, null, 2)}\n`, 'utf8'),
    writeFile(resolve(outputDirectory, `content-audit.${audit.buildMode}.json`), `${JSON.stringify(audit, null, 2)}\n`, 'utf8'),
  ]);
}

export function assertNoCompilerErrors(result: CompilationResult): void {
  if (!result.audit.errors.length) return;
  const summary = result.audit.errors.map((error) => `${error.code}:${error.conceptId}`).join(', ');
  throw new Error(`OKF compiler failed after writing its safe audit: ${summary}`);
}

export function pageFamilyForConcept(record: OkfRecord | undefined, conceptId: string): string | undefined {
  if (record) return pageFamilyForType(record.type);
  if (conceptId.startsWith('services/')) return 'service-family';
  if (conceptId.startsWith('expertise/')) return 'expertise';
  if (conceptId.startsWith('audiences/')) return 'audience';
  if (conceptId.startsWith('case-studies/')) return 'case-study';
  if (conceptId.startsWith('insights/')) return 'insight';
  return undefined;
}
