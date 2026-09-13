// JSON-LD builders for the site's structured data. Added 2026-09-13, once
// `site` in astro.config.ts made absolute ids possible (the P3/P4 review on
// 2026-09-12 had deferred structured data on exactly that).
//
// SiteLayout emits one <script type="application/ld+json"> per page carrying
// an @graph: a BreadcrumbList when the page passes `breadcrumbs`, plus
// whatever the page passes in `jsonLd`. Builders take the site URL rather
// than reading Astro.site themselves so they stay plain functions the tests
// can call.
//
// Only facts the site already states are encoded. No sameAs profiles
// (the firm's own social profiles are not on the site), no address, no
// founding date, no aggregate ratings, and no FAQPage until a page carries
// real FAQs.

export interface Crumb {
  name: string;
  /** Site-root-relative path with trailing slash, e.g. '/capabilities/'. */
  path: string;
}

export const SITE_NAME = 'Terra Nexus';

/** The homepage's own description, reused as the Organization description so
 * the two cannot drift. */
export const SITE_DESCRIPTION =
  'Terra Nexus provides the insights, tools, and capabilities food and agribusiness companies need to succeed in a resilient, sustainable food system.';

export const absolute = (site: URL | undefined, path: string): string =>
  site ? new URL(path, site).href : path;

export const organization = (site: URL | undefined) => ({
  '@type': 'Organization',
  '@id': absolute(site, '/#organization'),
  name: SITE_NAME,
  url: absolute(site, '/'),
  logo: {
    '@type': 'ImageObject',
    url: absolute(site, '/brand/logo-wordmark.png'),
  },
  description: SITE_DESCRIPTION,
});

export const webSite = (site: URL | undefined) => ({
  '@type': 'WebSite',
  '@id': absolute(site, '/#website'),
  name: SITE_NAME,
  url: absolute(site, '/'),
  publisher: { '@id': absolute(site, '/#organization') },
});

/** Home is always the first crumb; pages pass only what follows it. */
export const breadcrumbList = (site: URL | undefined, crumbs: Crumb[]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: [{ name: 'Home', path: '/' }, ...crumbs].map((c, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: c.name,
    item: absolute(site, c.path),
  })),
});

export interface ServiceInput {
  name: string;
  description: string;
  path: string;
  offerings: Array<{ name: string; description: string; path: string }>;
}

/** A capability family as a Service with its offerings as an OfferCatalog. */
export const service = (site: URL | undefined, input: ServiceInput) => ({
  '@type': 'Service',
  '@id': absolute(site, `${input.path}#service`),
  name: input.name,
  serviceType: input.name,
  description: input.description,
  url: absolute(site, input.path),
  provider: { '@id': absolute(site, '/#organization') },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: `${input.name} offerings`,
    itemListElement: input.offerings.map((o) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: o.name,
        description: o.description,
        url: absolute(site, o.path),
      },
    })),
  },
});

/** Serialises a graph for a <script type="application/ld+json">. `<` is
 * escaped so a description can never close the script element. */
export const toJsonLd = (items: object[]): string =>
  JSON.stringify({ '@context': 'https://schema.org', '@graph': items }).replace(/</g, '\\u003c');
