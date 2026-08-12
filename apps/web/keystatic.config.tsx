// Terra Nexus canonical CMS configuration (Keystatic, local storage mode).
//
// See docs/architecture/web-platform-architecture.md §4 and
// .claude/skills/keystatic-mdx/SKILL.md for the architecture decision and
// current scope. `posts`/`authors`/`topics` are fully wired to Astro routes
// (see src/content/config.ts and src/pages/insights/). `caseStudies` is
// schema-only — designed as the future replacement for OKF's Case Study
// type, not yet populated or routed; see
// docs/architecture/okf-migration-inventory.md.
//
// GitHub-storage mode (deployed CMS editing) is not configured — it needs
// an owner-created GitHub App/OAuth application. See cloudflare-deployment
// and keystatic-mdx skills for what's required before that can happen.
import { config, fields, collection } from '@keystatic/core';
import { mdxContentComponents } from './keystatic.content-components';

export default config({
  storage: {
    kind: 'local',
  },
  ui: {
    brand: { name: 'Terra Nexus' },
    navigation: {
      Editorial: ['posts', 'authors', 'topics'],
      'Design (in progress)': ['caseStudies'],
    },
  },
  collections: {
    posts: collection({
      label: 'Insights (blog posts)',
      slugField: 'title',
      path: 'src/content/posts/*',
      entryLayout: 'content',
      format: { contentField: 'content' },
      previewUrl: '/insights/{slug}',
      columns: ['title', 'author', 'featured', 'draft'],
      schema: {
        title: fields.slug({ name: { label: 'Title', validation: { length: { min: 1 } } } }),
        excerpt: fields.text({
          label: 'Excerpt',
          multiline: true,
          validation: { isRequired: true, length: { max: 240 } },
          description: 'Shown in listings and used as a fallback SEO description.',
        }),
        publishDate: fields.date({ label: 'Publish date', validation: { isRequired: true } }),
        updatedDate: fields.date({ label: 'Updated date' }),
        draft: fields.checkbox({
          label: 'Draft',
          defaultValue: true,
          description: 'Draft posts are excluded from /insights until unchecked.',
        }),
        author: fields.relationship({
          label: 'Author',
          collection: 'authors',
          validation: { isRequired: true },
        }),
        // Stored under public/, not colocated with the entry: `*` glob
        // substitution only works in a collection's `path`, not in an asset
        // field's `directory` (confirmed empirically). Without an explicit
        // directory, Keystatic writes the file into a slug-named sibling
        // folder but the frontmatter path it records is relative to the
        // *flat* entry file's own directory (one level up) — the two don't
        // agree, and Astro's content-layer `image()` resolver (which looks
        // relative to the entry file) can't find the file. A fixed public/
        // directory sidesteps the mismatch entirely, at the cost of Astro's
        // build-time image optimization (no <Image>, just plain <img>) —
        // acceptable for this POC; revisit if/when volume justifies it.
        heroImage: fields.image({
          label: 'Hero image',
          directory: 'public/images/insights',
          publicPath: '/images/insights/',
          validation: { isRequired: true },
        }),
        heroImageAlt: fields.text({ label: 'Hero image alt text', validation: { isRequired: true } }),
        topics: fields.multiRelationship({ label: 'Topics', collection: 'topics' }),
        featured: fields.checkbox({ label: 'Featured', defaultValue: false }),
        seoTitle: fields.text({ label: 'SEO title', description: 'Falls back to Title if blank.' }),
        seoDescription: fields.text({
          label: 'SEO description',
          multiline: true,
          description: 'Falls back to Excerpt if blank.',
        }),
        canonicalUrl: fields.url({ label: 'Canonical URL override' }),
        socialImage: fields.image({
          label: 'Social/share image',
          directory: 'public/images/insights',
          publicPath: '/images/insights/',
          description: 'Falls back to Hero image if blank.',
        }),
        // Inline body images (drag-and-drop into the rich text editor, not
        // the registered content components): same public/ rationale as
        // heroImage above.
        content: fields.mdx({
          options: {
            image: { directory: 'public/images/insights', publicPath: '/images/insights/' },
          },
          label: 'Body',
          components: mdxContentComponents,
        }),
      },
    }),

    authors: collection({
      label: 'Authors',
      slugField: 'name',
      path: 'src/content/authors/*',
      entryLayout: 'content',
      format: { contentField: 'bio' },
      schema: {
        name: fields.slug({ name: { label: 'Name', validation: { length: { min: 1 } } } }),
        title: fields.text({ label: 'Title / role' }),
        // See posts.heroImage above for why this is a fixed public/ path.
        photo: fields.image({
          label: 'Photograph',
          directory: 'public/images/authors',
          publicPath: '/images/authors/',
        }),
        linkedinUrl: fields.url({ label: 'LinkedIn URL' }),
        websiteUrl: fields.url({ label: 'Website / profile URL' }),
        bio: fields.mdx({ label: 'Short biography' }),
      },
    }),

    topics: collection({
      label: 'Topics',
      slugField: 'name',
      path: 'src/content/topics/*',
      format: 'yaml',
      schema: {
        name: fields.slug({ name: { label: 'Name', validation: { length: { min: 1 } } } }),
        description: fields.text({ label: 'Description', multiline: true }),
      },
    }),

    // Schema-only, not populated or routed this session — designed as the
    // future replacement for OKF's Case Study record type. Actually
    // migrating real case-study content out of knowledge/ is deferred; see
    // docs/architecture/okf-migration-inventory.md.
    caseStudies: collection({
      label: 'Case studies (design only — not yet in use)',
      slugField: 'title',
      path: 'src/content/case-studies/*',
      entryLayout: 'content',
      format: { contentField: 'body' },
      schema: {
        title: fields.slug({ name: { label: 'Title', validation: { length: { min: 1 } } } }),
        client: fields.text({ label: 'Client / industry descriptor' }),
        challenge: fields.text({ label: 'Challenge', multiline: true }),
        approach: fields.text({ label: 'Approach', multiline: true }),
        outcomes: fields.text({ label: 'Outcomes', multiline: true }),
        stats: fields.array(
          fields.object({
            value: fields.text({ label: 'Value' }),
            label: fields.text({ label: 'Label' }),
          }),
          { label: 'Quantified stats', itemLabel: (props) => props.fields.label.value || 'Stat' }
        ),
        // See posts.heroImage above for why this is a fixed public/ path.
        heroImage: fields.image({
          label: 'Hero image',
          directory: 'public/images/case-studies',
          publicPath: '/images/case-studies/',
        }),
        relatedExpertise: fields.multiRelationship({ label: 'Related topics', collection: 'topics' }),
        relatedPosts: fields.multiRelationship({ label: 'Related Insights', collection: 'posts' }),
        seoTitle: fields.text({ label: 'SEO title' }),
        seoDescription: fields.text({ label: 'SEO description', multiline: true }),
        body: fields.mdx({
          label: 'Body',
          options: {
            image: { directory: 'public/images/case-studies', publicPath: '/images/case-studies/' },
          },
          components: mdxContentComponents,
        }),
      },
    }),
  },
});
