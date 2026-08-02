import type { OkfRecord, PageFamily, RouteCandidate } from './types.js';

const PAGE_TYPES: Array<[RegExp, PageFamily]> = [
  [/^Service Family$/i, 'service-family'],
  [/^Service Offering$/i, 'service-offering'],
  [/^Expertise Topic$/i, 'expertise'],
  [/^Audience Segment$/i, 'audience'],
  [/^(Case Study|Qualification Module)$/i, 'case-study'],
  [/^Insight( Article)?$/i, 'insight'],
  [/^(Team Member|Team Bio|Team Profile)$/i, 'team'],
];

export function pageFamilyForType(type: string): PageFamily | undefined {
  return PAGE_TYPES.find(([pattern]) => pattern.test(type))?.[1];
}

function terminalSegment(record: OkfRecord): string {
  return record.slug ?? record.conceptId.split('/').at(-1) ?? record.conceptId;
}

export function routeCandidateFor(record: OkfRecord): RouteCandidate | undefined {
  const pageFamily = pageFamilyForType(record.type);
  if (!pageFamily) return undefined;

  const segment = terminalSegment(record);
  let route: string;

  switch (pageFamily) {
    case 'service-family': {
      const canonical = record.conceptId.endsWith('/overview')
        ? record.conceptId.slice(0, -'/overview'.length)
        : record.conceptId;
      route = `/${canonical}`;
      break;
    }
    case 'service-offering':
      route = `/${record.conceptId}`;
      break;
    case 'expertise':
      route = `/expertise/${segment}`;
      break;
    case 'audience':
      route = `/who-we-work-with/${record.conceptId.split('/').slice(1).join('/')}`;
      break;
    case 'case-study':
      route = `/case-studies/${segment}`;
      break;
    case 'insight':
      route = `/insights/${segment}`;
      break;
    case 'team':
      route = `/about/team/${segment}`;
      break;
  }

  return { conceptId: record.conceptId, route, pageFamily };
}
