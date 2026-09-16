/**
 * The onward links a not-yet-live section hands the reader from its closing
 * CTA band — /insights/research and /case-studies today.
 *
 * Those pages carry no hero (owner, 2026-09-16), so this row is the only
 * navigation on them besides the header and footer, and it is deliberately
 * the same on both: same shape, same order, wherever the reader lands. Labels
 * and hrefs match the equivalent rows already on /glossary and
 * /who-we-work-with rather than introducing a second vocabulary.
 *
 * Neither Research nor Case Studies appears here — both are the thing that is
 * not live.
 */
export const comingSoonOnwardLinks = [
  { label: 'Home', href: '/' },
  { label: 'Areas of expertise', href: '/expertise/' },
  { label: 'Our approach & capabilities', href: '/capabilities/' },
  { label: 'Who we work with', href: '/who-we-work-with/' },
  { label: 'Digital solutions', href: '/digital-solutions/' },
  { label: 'Blog', href: '/insights/' },
] as const;
