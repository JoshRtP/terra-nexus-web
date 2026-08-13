// Astro Content Collections — the bridge between Keystatic-managed files
// (keystatic.config.tsx, storage: local) and Astro rendering. Schemas here
// must mirror the Keystatic collection schemas exactly, per current
// Astro/Keystatic guidance. See docs/architecture/web-platform-architecture.md
// §4 for why Content Collections were introduced alongside (not instead of)
// the existing OKF pipeline, which is unaffected by this file.
//
// File layout note (verified against actual Keystatic output, not assumed):
// `entryLayout: 'content'` + `path: '<collection>/*'` writes each entry as a
// FLAT `<collection>/<slug>.mdx` file, not a nested `<slug>/index.mdx`
// folder.
//
// Images are plain strings (`/images/...`), not Astro's `image()` schema
// helper: `image()` resolves paths relative to the entry file itself, but
// Keystatic's default per-entry asset colocation (a slug-named sibling
// folder) doesn't agree with that — the frontmatter path and the resolver's
// expected location mismatch (confirmed empirically: `ImageNotFound` at
// build). keystatic.config.tsx instead stores these under fixed `public/`
// directories, which are already web-servable without Astro's asset
// pipeline. Cost: no automatic responsive/optimized images for these
// fields — acceptable for this POC, revisit if volume grows.
import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// `publishAt` stays a plain validated string, not z.coerce.date(): it's a
// naive "YYYY-MM-DDTHH:mm" value with no timezone offset (Keystatic's
// `fields.datetime` storage format), and coercing it to a Date here would
// silently interpret it as UTC or the build machine's local zone — neither
// is the site's actual Mountain Time convention. See src/lib/publication.ts
// (zonedWallClockToUtc) for the one place that conversion happens.
const publishAtPattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;

const posts = defineCollection({
  loader: glob({ pattern: '*.mdx', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string().max(240),
    editorialStatus: z.enum(['draft', 'approved']).default('draft'),
    publishAt: z.string().regex(publishAtPattern, 'Expected "YYYY-MM-DDTHH:mm" (Mountain Time)'),
    updatedDate: z.coerce.date().optional(),
    author: reference('authors'),
    heroImage: z.string(),
    heroImageAlt: z.string(),
    topics: z.array(reference('topics')).default([]),
    featured: z.boolean().default(false),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    canonicalUrl: z.string().optional(),
    socialImage: z.string().optional(),
  }),
});

const authors = defineCollection({
  loader: glob({ pattern: '*.mdx', base: './src/content/authors' }),
  schema: z.object({
    name: z.string(),
    title: z.string().optional(),
    photo: z.string().optional(),
    linkedinUrl: z.string().optional(),
    websiteUrl: z.string().optional(),
  }),
});

const topics = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/topics' }),
  schema: z.object({
    name: z.string(),
    description: z.string().optional(),
  }),
});

// Schema-only collection, not yet populated or rendered — see
// docs/architecture/okf-migration-inventory.md. Loader is still defined so
// `npm run web:typecheck`/`astro sync` don't warn about an orphaned
// Keystatic collection, and so the reference() calls above resolve.
const caseStudies = defineCollection({
  loader: glob({ pattern: '*.mdx', base: './src/content/case-studies' }),
  schema: z.object({
    title: z.string(),
    client: z.string().optional(),
    challenge: z.string().optional(),
    approach: z.string().optional(),
    outcomes: z.string().optional(),
    stats: z.array(z.object({ value: z.string(), label: z.string() })).default([]),
    heroImage: z.string().optional(),
    relatedExpertise: z.array(reference('topics')).default([]),
    relatedPosts: z.array(reference('posts')).default([]),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
  }),
});

export const collections = { posts, authors, topics, caseStudies };
