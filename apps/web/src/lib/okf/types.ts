export type BuildMode = 'production' | 'preview';

export interface Provenance {
  by?: string;
  at?: string;
}

export interface PublicationMetadata {
  audience?: string;
  state?: string;
  attribution?: string;
  approvedBy?: string | null;
  approvedAt?: string | null;
}

export interface ProofMetadata {
  confidentiality?: string;
}

export interface RelationshipEdge {
  from: string;
  to: string;
  field: string;
  adapter?: 'legacy-service-family-display-name';
}

export interface ExclusionReason {
  code: string;
  field?: string;
}

export interface CompilerError {
  code: string;
  conceptId: string;
  recordType: string;
  field?: string;
  sourcePath: string;
}

export interface CompilerWarning {
  code: string;
  conceptId: string;
  recordType: string;
  field?: string;
  sourcePath: string;
}

export interface OkfRecord {
  conceptId: string;
  sourcePath: string;
  type: string;
  title?: string;
  description?: string;
  status?: string;
  publication: PublicationMetadata;
  proof: ProofMetadata;
  body: string;
  relationships: RelationshipEdge[];
  generated?: Provenance;
  verified?: Provenance;
  slug?: string;
}

export interface RouteCandidate {
  conceptId: string;
  route: string;
  pageFamily: PageFamily;
}

export type PageFamily =
  | 'service-family'
  | 'service-offering'
  | 'expertise'
  | 'audience'
  | 'case-study'
  | 'insight'
  | 'team';

export interface ContentGraph {
  mode: BuildMode;
  records: OkfRecord[];
  edges: RelationshipEdge[];
  reverseIndex: Record<string, RelationshipEdge[]>;
  routeCandidates: RouteCandidate[];
}

export interface ExcludedRecord {
  conceptId: string;
  recordType: string;
  sourcePath: string;
  reasons: ExclusionReason[];
}

export interface CompilationAudit {
  formatVersion: '1.0';
  buildMode: BuildMode;
  scannedRecords: number;
  eligibleRecords: number;
  excludedRecords: ExcludedRecord[];
  errors: CompilerError[];
  warnings: CompilerWarning[];
}

export interface CompilationResult {
  graph: ContentGraph;
  audit: CompilationAudit;
  allRecords: OkfRecord[];
  allEdges: RelationshipEdge[];
  allReverseIndex: Record<string, RelationshipEdge[]>;
  eligibility: Record<string, ExclusionReason[]>;
  knownRelationshipIds: string[];
}

export interface CompileOptions {
  buildMode: BuildMode;
  bundleRoot?: string;
  schemaRoot?: string;
  outputDirectory?: string;
  writeArtifacts?: boolean;
}
