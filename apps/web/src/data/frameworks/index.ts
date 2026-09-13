// Framework records for the framework viewer, keyed by slug, plus the id
// helpers the component, the route and the tests share. Mirrors
// data/capabilities/index.ts: records are validated once at import so a
// bad record fails the build, not a reader's click.
//
// Added 2026-09-13 with the Ten Types of Innovation. To add a framework:
// write ./<slug>.ts in the ./types.ts shape, add it to `records`, and give
// it a home (a `tool` section on a capability family record, a footer
// link). The route /tools/<slug>/ and the viewer come for free.
import type { Framework, FrameworkTactic, FrameworkType } from './types';
import { tenTypesOfInnovation } from './ten-types-of-innovation';

const records: Framework[] = [tenTypesOfInnovation];

/** Same rule as data/capabilities' `offeringAnchor`, so ids read the same
 * across the site: "Extensions/Plug-ins" → `extensions-plug-ins`. */
export const slugify = (s: string): string =>
  s
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

/** A tactic's stable id: DOM id, storage key and share-link token. Two
 * types may carry a tactic with the same title (Process Automation is a
 * Process tactic and a Customer Engagement tactic), so the type is part of
 * the id. */
export const tacticId = (type: FrameworkType | string, tactic: FrameworkTactic | string): string =>
  `${typeof type === 'string' ? type : type.id}--${slugify(typeof tactic === 'string' ? tactic : tactic.title)}`;

export const frameworkHref = (slug: string) => `/tools/${slug}/`;

/** Every tactic in a framework with its type, in board order. */
export const flatTactics = (fw: Framework) =>
  fw.types.flatMap((type) => type.tactics.map((tactic) => ({ id: tacticId(type, tactic), type, tactic })));

export const tacticCount = (fw: Framework) => fw.types.reduce((n, t) => n + t.tactics.length, 0);

/** Throws with a precise message on the first inconsistency. Called for
 * every record below; exported so the test can assert the rules directly. */
export function validateFramework(fw: Framework): void {
  const where = `framework '${fw.slug}'`;
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(fw.slug)) throw new Error(`${where}: slug must be a lowercase hyphenated slug`);
  if (fw.categories.length === 0) throw new Error(`${where}: has no categories`);
  if (fw.types.length === 0) throw new Error(`${where}: has no types`);
  if (fw.attribution.length === 0) throw new Error(`${where}: needs at least one attribution paragraph`);

  const categoryNames = new Set<string>();
  for (const c of fw.categories) {
    if (categoryNames.has(c.name)) throw new Error(`${where}: duplicate category '${c.name}'`);
    categoryNames.add(c.name);
    if (!/^#[0-9a-f]{6}$/i.test(c.color)) throw new Error(`${where}: category '${c.name}' colour '${c.color}' is not a six-digit hex`);
  }
  const typesPerCategory = new Map<string, number>();

  const typeIds = new Set<string>();
  const ids = new Set<string>();
  for (const type of fw.types) {
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(type.id)) throw new Error(`${where}: type id '${type.id}' must be a lowercase hyphenated slug`);
    if (typeIds.has(type.id)) throw new Error(`${where}: duplicate type id '${type.id}'`);
    typeIds.add(type.id);
    if (!categoryNames.has(type.category)) throw new Error(`${where}: type '${type.id}' names unknown category '${type.category}'`);
    typesPerCategory.set(type.category, (typesPerCategory.get(type.category) ?? 0) + 1);
    if (!/^#[0-9a-f]{6}$/i.test(type.color)) throw new Error(`${where}: type '${type.id}' colour '${type.color}' is not a six-digit hex`);
    if (type.tactics.length === 0) throw new Error(`${where}: type '${type.id}' has no ${fw.labels.tacticPlural}`);
    for (const tactic of type.tactics) {
      const id = tacticId(type, tactic);
      if (ids.has(id)) throw new Error(`${where}: type '${type.id}' has two ${fw.labels.tacticPlural} that slug to '${id}'`);
      ids.add(id);
      if (!tactic.title.trim() || !tactic.description.trim()) throw new Error(`${where}: ${id} is missing a title or description`);
    }
  }
  for (const c of fw.categories) {
    if (!typesPerCategory.get(c.name)) throw new Error(`${where}: category '${c.name}' has no types`);
  }
  if (fw.starter) {
    if (fw.starter.tactics.length === 0) throw new Error(`${where}: starter '${fw.starter.name}' loads nothing`);
    for (const id of fw.starter.tactics) {
      if (!ids.has(id)) throw new Error(`${where}: starter '${fw.starter.name}' names unknown ${fw.labels.tactic} '${id}'`);
    }
  }
}

for (const fw of records) validateFramework(fw);

export const frameworks: Record<string, Framework> = Object.fromEntries(records.map((fw) => [fw.slug, fw]));
export const FRAMEWORK_SLUGS: string[] = records.map((fw) => fw.slug);
if (new Set(FRAMEWORK_SLUGS).size !== FRAMEWORK_SLUGS.length) throw new Error('Two framework records share a slug');

export { tenTypesOfInnovation };
export * from './types';
