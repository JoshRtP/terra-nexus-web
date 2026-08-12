// Keystatic MDX content components for Terra Nexus editorial content.
//
// Each entry here is the *editing-time* schema/admin-preview for a
// component an author can drop into the `content` MDX field. The
// *rendering* implementation (what actually appears on the published page)
// lives in apps/web/src/components/mdx/*.astro and is wired up wherever the
// MDX body is rendered (see src/pages/insights/[slug].astro). Keep the prop
// names here and the Astro component props in exact agreement.
//
// InteractiveEmbed is deliberately a closed allow-list, not an escape hatch
// for arbitrary component execution from editorial content — see its
// `embedType` options below and the corresponding Astro component.
import { fields } from '@keystatic/core';
import { block, wrapper } from '@keystatic/core/content-components';

export const mdxContentComponents = {
  Figure: block({
    label: 'Figure',
    description: 'Image or chart with caption and source attribution',
    schema: {
      // Stored under public/, not src/content/: images referenced from
      // *inside* an MDX body are plain component props, not the collection
      // frontmatter Astro's content-layer `image()` schema helper resolves —
      // Astro does not auto-optimize arbitrary MDX component props, so
      // src/content-relative paths here would not be web-servable. A public/
      // path keeps them servable with a plain <img>, at the cost of no
      // build-time optimization. Revisit when Content Collections'
      // MDX-component asset handling matures, or move to R2/Cloudflare
      // Images if volume grows.
      image: fields.image({
        label: 'Image',
        directory: 'public/images/mdx',
        publicPath: '/images/mdx/',
        validation: { isRequired: true },
      }),
      alt: fields.text({ label: 'Alt text', validation: { isRequired: true } }),
      caption: fields.text({ label: 'Caption', multiline: true }),
      sourceName: fields.text({ label: 'Source name' }),
      sourceUrl: fields.url({ label: 'Source URL' }),
    },
    ContentView({ value }) {
      return <>Figure: {value.alt || '(no alt text set)'}</>;
    },
  }),

  FullBleedImage: block({
    label: 'Full-bleed image',
    description: 'Large editorial image treatment, breaks out of the text column',
    schema: {
      // Stored under public/, not src/content/: images referenced from
      // *inside* an MDX body are plain component props, not the collection
      // frontmatter Astro's content-layer `image()` schema helper resolves —
      // Astro does not auto-optimize arbitrary MDX component props, so
      // src/content-relative paths here would not be web-servable. A public/
      // path keeps them servable with a plain <img>, at the cost of no
      // build-time optimization. Revisit when Content Collections'
      // MDX-component asset handling matures, or move to R2/Cloudflare
      // Images if volume grows.
      image: fields.image({
        label: 'Image',
        directory: 'public/images/mdx',
        publicPath: '/images/mdx/',
        validation: { isRequired: true },
      }),
      alt: fields.text({ label: 'Alt text', validation: { isRequired: true } }),
      caption: fields.text({ label: 'Caption' }),
    },
    ContentView({ value }) {
      return <>Full-bleed image: {value.alt || '(no alt text set)'}</>;
    },
  }),

  Video: block({
    label: 'Video',
    description: 'Embedded or hosted video with poster and accessibility fields',
    schema: {
      url: fields.url({ label: 'Video source URL', validation: { isRequired: true } }),
      // See the Figure component's `image` field above for why this is
      // stored under public/ rather than colocated with the entry.
      poster: fields.image({
        label: 'Poster image',
        directory: 'public/images/mdx',
        publicPath: '/images/mdx/',
      }),
      caption: fields.text({ label: 'Caption' }),
      transcriptOrCaptionsNote: fields.text({
        label: 'Accessibility note (transcript link, caption availability, etc.)',
        multiline: true,
      }),
    },
    ContentView({ value }) {
      return <>Video: {value.url || '(no source set)'}</>;
    },
  }),

  PullQuote: block({
    label: 'Pull quote',
    description: 'Styled editorial quotation',
    schema: {
      quote: fields.text({ label: 'Quote', multiline: true, validation: { isRequired: true } }),
      attribution: fields.text({ label: 'Attribution' }),
    },
    ContentView({ value }) {
      return <>“{value.quote}” {value.attribution ? `— ${value.attribution}` : ''}</>;
    },
  }),

  Stat: block({
    label: 'Stat',
    description: 'Prominent quantitative callout',
    schema: {
      value: fields.text({ label: 'Value (e.g. "42%")', validation: { isRequired: true } }),
      label: fields.text({ label: 'Label', validation: { isRequired: true } }),
      description: fields.text({ label: 'Supporting detail', multiline: true }),
    },
    ContentView({ value }) {
      return <>Stat: {value.value} — {value.label}</>;
    },
  }),

  Callout: wrapper({
    label: 'Callout',
    description: 'Key takeaway, interpretation, warning, or contextual note',
    schema: {
      variant: fields.select({
        label: 'Variant',
        options: [
          { label: 'Info', value: 'info' },
          { label: 'Insight', value: 'insight' },
          { label: 'Warning', value: 'warning' },
        ],
        defaultValue: 'info',
      }),
      title: fields.text({ label: 'Title' }),
    },
    ContentView({ value, children }) {
      return (
        <div>
          <strong>{value.title || value.variant}</strong>
          <div>{children}</div>
        </div>
      );
    },
  }),

  SourceBox: block({
    label: 'Source box',
    description: 'Structured source/reference information',
    schema: {
      title: fields.text({ label: 'Title', defaultValue: 'Sources' }),
      sourceName: fields.text({ label: 'Source name', validation: { isRequired: true } }),
      sourceUrl: fields.url({ label: 'Source URL' }),
      note: fields.text({ label: 'Note', multiline: true }),
    },
    ContentView({ value }) {
      return <>Source: {value.sourceName || '(no source set)'}</>;
    },
  }),

  DataTable: block({
    label: 'Data table',
    description: 'Responsive styled tabular content',
    schema: {
      caption: fields.text({ label: 'Caption' }),
      headers: fields.array(fields.text({ label: 'Column header' }), {
        label: 'Column headers',
        itemLabel: (props) => props.value || 'Column',
      }),
      rows: fields.array(
        fields.object({
          cells: fields.array(fields.text({ label: 'Cell' }), {
            label: 'Cells',
            itemLabel: (props) => props.value || 'Cell',
          }),
        }),
        { label: 'Rows', itemLabel: () => 'Row' }
      ),
    },
    ContentView({ value }) {
      return <>Data table: {value.headers.length} columns, {value.rows.length} rows</>;
    },
  }),

  Gallery: block({
    label: 'Gallery',
    description: 'Multiple images in a responsive grid',
    schema: {
      images: fields.array(
        fields.object({
          // Stored under public/, not src/content/: images referenced from
      // *inside* an MDX body are plain component props, not the collection
      // frontmatter Astro's content-layer `image()` schema helper resolves —
      // Astro does not auto-optimize arbitrary MDX component props, so
      // src/content-relative paths here would not be web-servable. A public/
      // path keeps them servable with a plain <img>, at the cost of no
      // build-time optimization. Revisit when Content Collections'
      // MDX-component asset handling matures, or move to R2/Cloudflare
      // Images if volume grows.
      image: fields.image({
        label: 'Image',
        directory: 'public/images/mdx',
        publicPath: '/images/mdx/',
        validation: { isRequired: true },
      }),
          alt: fields.text({ label: 'Alt text', validation: { isRequired: true } }),
          caption: fields.text({ label: 'Caption' }),
        }),
        { label: 'Images', itemLabel: (props) => props.fields.alt.value || 'Image' }
      ),
    },
    ContentView({ value }) {
      return <>Gallery: {value.images.length} image(s)</>;
    },
  }),

  Download: block({
    label: 'Download',
    description: 'Report/resource/download CTA',
    schema: {
      // Downloadable files also need to be web-servable without going
      // through Astro's asset pipeline — see the Figure component's `image`
      // field above.
      file: fields.file({
        label: 'File',
        directory: 'public/downloads/mdx',
        publicPath: '/downloads/mdx/',
        validation: { isRequired: true },
      }),
      label: fields.text({ label: 'Button label', defaultValue: 'Download', validation: { isRequired: true } }),
      description: fields.text({ label: 'Description', multiline: true }),
    },
    ContentView({ value }) {
      return <>Download: {value.label}</>;
    },
  }),

  RelatedContent: block({
    label: 'Related content',
    description: 'References to related Insight articles',
    schema: {
      heading: fields.text({ label: 'Heading', defaultValue: 'Related reading' }),
      items: fields.multiRelationship({ label: 'Related posts', collection: 'posts' }),
    },
    ContentView({ value }) {
      return <>Related content: {value.items.length} item(s)</>;
    },
  }),

  CTA: block({
    label: 'CTA',
    description: 'Reusable conversion block',
    schema: {
      heading: fields.text({ label: 'Heading', validation: { isRequired: true } }),
      body: fields.text({ label: 'Body', multiline: true }),
      buttonLabel: fields.text({ label: 'Button label', validation: { isRequired: true } }),
      buttonHref: fields.url({ label: 'Button link', validation: { isRequired: true } }),
    },
    ContentView({ value }) {
      return <>CTA: {value.heading} → {value.buttonLabel}</>;
    },
  }),

  InteractiveEmbed: block({
    label: 'Interactive embed',
    description:
      'Controlled escape hatch for approved interactive components only — not arbitrary embeds',
    schema: {
      // Closed allow-list: extend this list (and the matching case in
      // src/components/mdx/InteractiveEmbed.astro) when a real interactive
      // component is built and approved. No free-text component names.
      embedType: fields.select({
        label: 'Approved embed',
        options: [{ label: '(none approved yet)', value: 'none' }],
        defaultValue: 'none',
      }),
      title: fields.text({ label: 'Accessible title', validation: { isRequired: true } }),
    },
    ContentView({ value }) {
      return <>Interactive embed: {value.embedType}</>;
    },
  }),
};
