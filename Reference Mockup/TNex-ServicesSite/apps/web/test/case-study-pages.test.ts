import { describe, expect, it } from 'vitest';

import { renderCaseStudyMarkdown } from '../src/lib/okf/case-study-markdown.js';
import { selectCaseStudyPages } from '../src/lib/okf/case-study-pages.js';
import type { CompilationResult, ContentGraph, OkfRecord } from '../src/lib/okf/types.js';

function record(overrides: Partial<OkfRecord> = {}): OkfRecord {
  return {
    conceptId: 'case-studies/example',
    sourcePath: 'knowledge/case-studies/example.md',
    type: 'Case Study',
    title: 'Example governed case study',
    description: 'An approved summary.',
    status: 'stable',
    publication: { audience: 'public', state: 'approved', attribution: 'anonymized' },
    proof: { confidentiality: 'anonymized' },
    body: '# Example governed case study\n\n## Overview\n\nApproved body.',
    relationships: [],
    slug: 'example',
    ...overrides,
  };
}

function graph(overrides: Partial<ContentGraph> = {}): ContentGraph {
  const caseStudy = record();
  return {
    mode: 'production',
    records: [caseStudy],
    edges: [{ from: caseStudy.conceptId, to: 'services/strategy-and-innovation', field: 'service_family' }],
    reverseIndex: {
      'services/strategy-and-innovation': [{
        from: caseStudy.conceptId,
        to: 'services/strategy-and-innovation',
        field: 'service_family',
      }],
    },
    routeCandidates: [{
      conceptId: caseStudy.conceptId,
      route: '/case-studies/example',
      pageFamily: 'case-study',
    }],
    ...overrides,
  };
}

describe('governed case-study page system', () => {
  it('uses only eligible graph data and excludes other page families', () => {
    const eligibleGraph = graph({
      routeCandidates: [
        { conceptId: 'services/example', route: '/services/example', pageFamily: 'service-family' },
        { conceptId: 'case-studies/example', route: '/case-studies/example', pageFamily: 'case-study' },
      ],
    });
    const input: Pick<CompilationResult, 'graph'> & { allRecords: never } = { graph: eligibleGraph, allRecords: undefined as never };
    Object.defineProperty(input, 'allRecords', {
      get: () => {
        throw new Error('Page selection must not read allRecords');
      },
    });

    const pages = selectCaseStudyPages(input);

    expect(pages).toHaveLength(1);
    expect(pages[0]).toMatchObject({
      route: '/case-studies/example',
      slug: 'example',
      title: 'Example governed case study',
      label: 'Anonymized case study',
    });
    expect(pages[0]?.relationships.outbound).toHaveLength(1);
  });

  it('matches routes to eligible records and sorts selected pages deterministically', () => {
    const alpha = record({ conceptId: 'case-studies/alpha', slug: 'alpha', title: 'Alpha' });
    const beta = record({ conceptId: 'case-studies/beta', slug: 'beta', title: 'Beta' });
    const pages = selectCaseStudyPages({
      graph: graph({
        records: [beta, alpha],
        routeCandidates: [
          { conceptId: beta.conceptId, route: '/case-studies/beta', pageFamily: 'case-study' },
          { conceptId: alpha.conceptId, route: '/case-studies/alpha', pageFamily: 'case-study' },
        ],
      }),
    });

    expect(pages.map((page) => page.route)).toEqual(['/case-studies/alpha', '/case-studies/beta']);
    expect(() => selectCaseStudyPages({
      graph: graph({
        records: [],
        routeCandidates: [{
          conceptId: 'case-studies/missing',
          route: '/case-studies/missing',
          pageFamily: 'case-study',
        }],
      }),
    })).toThrow(/no matching eligible record/);
  });

  it('renders supported Markdown at build time while omitting raw HTML and a duplicate title', async () => {
    const html = await renderCaseStudyMarkdown([
      '# Example governed case study',
      '',
      '## Overview',
      '',
      'A paragraph with *emphasis*, `code`, and an [external link](https://example.org).',
      '',
      '- First item',
      '- Second item',
      '',
      '| Category | Description |',
      '| --- | --- |',
      '| Test | Value |',
      '',
      '<script data-test="raw-html">ignored</script>',
    ].join('\n'), 'Example governed case study');

    expect(html).toContain('<h2');
    expect(html).toContain('<em>emphasis</em>');
    expect(html).toContain('<code>code</code>');
    expect(html).toContain('<a href="https://example.org">external link</a>');
    expect(html).toContain('<ul>');
    expect(html).toContain('<table>');
    expect(html).not.toContain('<h1');
    expect(html).not.toContain('data-test="raw-html"');
  });
});
