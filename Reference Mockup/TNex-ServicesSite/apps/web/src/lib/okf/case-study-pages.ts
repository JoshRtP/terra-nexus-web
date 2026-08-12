import type { CompilationResult, OkfRecord, RelationshipEdge } from './types.js';

const CASE_STUDY_ROUTE_PREFIX = '/case-studies/';

export interface QuantifiedResult {
  metric: string;
  value: string;
  resultType?: string;
}

export interface FrameworkReviewed {
  name: string;
  role?: string;
}

export interface CaseStudyPageModel {
  route: string;
  slug: string;
  title: string;
  description?: string;
  body: string;
  label: string;
  challenge?: string;
  workPerformed?: string;
  deliverables?: string[];
  outcome?: string;
  quantifiedResults?: QuantifiedResult[];
  frameworksReviewed?: FrameworkReviewed[];
  marketMechanisms?: string[];
  clientType?: string;
  engagementYear?: string;
  engagementStatus?: string;
  geographyContext?: string;
  commodityContext?: string;
  valueChain?: string;
  productionSystem?: string;
  solutionType?: string;
  engagementModel?: string;
  attribution?: string;
  relationships: {
    outbound: RelationshipEdge[];
    inbound: RelationshipEdge[];
  };
}

function labelFor(record: OkfRecord): string {
  if (record.publication.attribution === 'anonymized' || record.proof.confidentiality === 'anonymized') {
    return 'Anonymized case study';
  }
  return 'Case study';
}

function slugForRoute(route: string, conceptId: string): string {
  if (!route.startsWith(CASE_STUDY_ROUTE_PREFIX)) {
    throw new Error(`Case-study route for ${conceptId} must begin with ${CASE_STUDY_ROUTE_PREFIX}`);
  }

  const slug = route.slice(CASE_STUDY_ROUTE_PREFIX.length);
  if (!slug || slug.includes('/')) {
    throw new Error(`Case-study route for ${conceptId} must have one path segment beneath ${CASE_STUDY_ROUTE_PREFIX}`);
  }
  return slug;
}

/**
 * Select renderable case-study pages exclusively from the compiler's eligible
 * graph. Compiler internals such as allRecords deliberately never enter this
 * page-model boundary.
 */
export function selectCaseStudyPages(
  result: Pick<CompilationResult, 'graph'>,
): CaseStudyPageModel[] {
  const { edges, records, reverseIndex, routeCandidates } = result.graph;
  const recordsById = new Map(records.map((record) => [record.conceptId, record]));

  return routeCandidates
    .filter((candidate) => candidate.pageFamily === 'case-study')
    .sort((left, right) => (
      left.route.localeCompare(right.route) || left.conceptId.localeCompare(right.conceptId)
    ))
    .map((candidate) => {
      const record = recordsById.get(candidate.conceptId);
      if (!record) {
        throw new Error(`Eligible case-study route ${candidate.route} has no matching eligible record: ${candidate.conceptId}`);
      }
      if (!record.title) {
        throw new Error(`Eligible case-study record ${candidate.conceptId} is missing a governed title`);
      }

      return {
        route: candidate.route,
        slug: slugForRoute(candidate.route, candidate.conceptId),
        title: record.title,
        description: record.description,
        body: record.body,
        label: labelFor(record),
        ...record.caseStudyData,
        relationships: {
          outbound: edges.filter((edge) => edge.from === record.conceptId),
          inbound: reverseIndex[record.conceptId] ?? [],
        },
      };
    });
}
