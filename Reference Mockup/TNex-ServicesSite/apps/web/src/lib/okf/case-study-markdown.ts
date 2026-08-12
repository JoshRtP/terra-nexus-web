import { createMarkdownProcessor } from '@astrojs/markdown-remark';

interface MarkdownNode {
  type?: string;
  depth?: number;
  value?: string;
  children?: MarkdownNode[];
}

function nodeText(node: MarkdownNode): string {
  return [node.value ?? '', ...(node.children ?? []).map(nodeText)].join('');
}

/**
 * The governed title is rendered by the page header. Remove an identical
 * leading Markdown H1, then demote any remaining H1s to preserve one visible
 * document title without discarding the record's remaining hierarchy.
 */
function normalizeDocumentTitle(title: string) {
  return (tree: MarkdownNode): void => {
    const first = tree.children?.[0];
    if (first?.type === 'heading' && first.depth === 1 && nodeText(first).trim() === title) {
      tree.children?.shift();
    }
    for (const node of tree.children ?? []) {
      if (node.type === 'heading' && node.depth === 1) node.depth = 2;
    }
  };
}

/**
 * Render governed Markdown during the static build. This uses Astro's bundled
 * maintained Markdown pipeline with GFM tables enabled. Raw HTML is not passed
 * into the HTML tree, so the resulting string is safe to use with set:html.
 * Links retain their normal same-tab behavior; no untrusted target=_blank
 * attributes are emitted.
 */
export async function renderCaseStudyMarkdown(body: string, title: string): Promise<string> {
  const renderer = await createMarkdownProcessor({
    gfm: true,
    syntaxHighlight: false,
    remarkPlugins: [[normalizeDocumentTitle, title]],
    remarkRehype: { allowDangerousHtml: false },
  });
  return (await renderer.render(body)).code;
}
