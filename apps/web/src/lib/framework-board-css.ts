// The per-framework rules the framework viewer emits in an inline <style>
// element: category and type colours, the focused-column widths, and the row
// subgrid that lines the columns up.
//
// These live here rather than in FrameworkViewer.astro's frontmatter for two
// reasons. They are a pure function of the record, so they are worth testing
// on their own (test/framework-viewer.test.ts calls this directly). And a
// long run of nested template literals in an .astro frontmatter is exactly
// the shape that trips Astro's frontmatter scan when the component also has
// a <script> tag — the same class of bug StrategyFrameworkDVF.astro carries a
// note about. It surfaced here on 2026-09-16 as the compiler emitting
// `export interface Props` twice, once inside the component function, which
// esbuild rejects with a bare "Unexpected export".
//
// Colours are values from the record, not theme tokens: each type carries its
// own hex so the ten types stay individually identifiable while the category
// still reads across the board.
import type { Framework } from '../data/frameworks';

/** Relative luminance, 0 to 1. Decides whether a tint takes light or dark
 * text; the lightest Ten Types tint (#9AA89B) needs navy to pass contrast. */
export const luminance = (hex: string): number => {
  const n = parseInt(hex.slice(1), 16);
  return (0.299 * ((n >> 16) & 255) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255;
};

export const onTint = (hex: string): string => (luminance(hex) > 0.5 ? '#131f48' : '#ffffff');

/** A category header's hover colour: the tint pulled 35% toward the brand's
 * deep navy, as the prototype did. */
export const deepen = (hex: string): string => {
  const v = parseInt(hex.slice(1), 16);
  const target = [6, 25, 39];
  const channels = [(v >> 16) & 255, (v >> 8) & 255, v & 255].map((c, i) => Math.round(c + (target[i] - c) * 0.35));
  return '#' + channels.map((c) => c.toString(16).padStart(2, '0')).join('');
};

/** One row track for the column header, one per type in the longest category,
 * and one for a category note. Every column subgrids onto these, so a short
 * category simply leaves its trailing tracks empty. */
export const boardRowCount = (fw: Framework): number =>
  1 +
  Math.max(...fw.categories.map((c) => fw.types.filter((t) => t.category === c.name).length)) +
  (fw.categories.some((c) => c.note) ? 1 : 0);

/** How many stacked matrix rows the board has (1 for the columns layout). */
export const boardMatrixRows = (fw: Framework): number =>
  fw.layout === 'matrix' && fw.matrix ? Math.max(...fw.categories.map((c) => c.cell![0])) + 1 : 1;

/** Every rule for one rendered framework, scoped by its slug so two viewers
 * on one page cannot collide. Emitted as a <style> element rather than
 * `style=""` attributes: the capability page tests assert there are none. */
export function boardCss(fw: Framework): string {
  const scope = '[data-fw="' + fw.slug + '"]';
  const wide = (rules: string) => '@media (min-width:64rem){' + rules + '}';
  const isMatrix = fw.layout === 'matrix' && !!fw.matrix;
  const matrixRows = boardMatrixRows(fw);
  const matrixCols = isMatrix ? Math.max(...fw.categories.map((c) => c.cell![1])) + 1 : fw.categories.length;
  const colRows = boardRowCount(fw);
  const out: string[] = [];

  fw.categories.forEach((c, i) => {
    out.push(
      scope +
        ' [data-fw-cat="' + i + '"]{--fw-cat:' + c.color +
        ';--fw-cat-hover:' + deepen(c.color) +
        ';--fw-on-cat:' + onTint(c.color) +
        ';--fw-cat-eyebrow:' + (luminance(c.color) > 0.5 ? '#131f48' : '#e7d77f') + '}',
    );
  });
  fw.types.forEach((t) => {
    out.push(scope + ' [data-fw-type="' + t.id + '"]{--fw-tint:' + t.color + ';--fw-on-tint:' + onTint(t.color) + '}');
  });

  // Column widths, and the wider track the focused category takes.
  const widths: string[] = [];
  widths.push(scope + ' .fw-board{grid-template-columns:repeat(' + (isMatrix ? matrixCols : fw.categories.length) + ',minmax(0,1fr))}');
  fw.categories.forEach((c, i) => {
    const template = isMatrix
      ? Array.from({ length: matrixCols }, (_, j) => (j === c.cell![1] ? '1.6fr' : '.8fr'))
      : fw.categories.map((_, j) => (j === i ? '1.7fr' : '.65fr'));
    widths.push(scope + ' .fw-board[data-fw-focus="' + i + '"]{grid-template-columns:' + template.join(' ') + '}');
  });

  // Equal-height rows across the columns. Wide layout only: below it the
  // board is one column and there is nothing to line up. Without subgrid the
  // columns keep their own heights, which is the previous behaviour rather
  // than a broken one.
  const rows: string[] = [];
  rows.push(scope + ' .fw-board>.fw-col{display:grid;grid-template-rows:subgrid}');
  rows.push(scope + ' .fw-col-note{grid-row-start:-2}');
  if (isMatrix) {
    rows.push(scope + ' .fw-board{grid-template-rows:repeat(' + matrixRows * colRows + ',auto)}');
    fw.categories.forEach((c, i) => {
      rows.push(
        scope + ' .fw-board>[data-fw-cat="' + i + '"]{grid-column:' + (c.cell![1] + 1) +
          ';grid-row:' + (c.cell![0] * colRows + 1) + '/span ' + colRows + '}',
      );
    });
  } else {
    rows.push(scope + ' .fw-board{grid-template-rows:repeat(' + colRows + ',auto)}');
    rows.push(scope + ' .fw-board>.fw-col{grid-row:1/-1}');
  }

  out.push(wide(widths.join('')));
  out.push('@supports (grid-template-rows:subgrid){' + wide(rows.join('')) + '}');
  return out.join('\n');
}
