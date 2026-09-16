// The Track Record ledger's line icons, one per figure in data/track-record.ts.
// 24×24 stroke paths, 1.5px, round caps — the weight of the site's other
// inline marks (BackToTop, ProfileRoster). Shared by the homepage ledger
// (components/TrackRecord.astro) and the About page's proof chapter.
import type { TrackRecordIcon } from './track-record';

export const trackRecordIcons: Record<TrackRecordIcon, string> = {
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.6 2.6 3.9 5.6 3.9 9s-1.3 6.4-3.9 9c-2.6-2.6-3.9-5.6-3.9-9S9.4 5.6 12 3z"/>',
  commodity: '<path d="M12 22V9"/><path d="M12 13c-3.2 0-5.2-2-5.2-5.2 3.2 0 5.2 2 5.2 5.2zM12 13c3.2 0 5.2-2 5.2-5.2-3.2 0-5.2 2-5.2 5.2zM12 18c-3.2 0-5.2-2-5.2-5.2 3.2 0 5.2 2 5.2 5.2zM12 18c3.2 0 5.2-2 5.2-5.2-3.2 0-5.2 2-5.2 5.2z"/>',
  acres: '<path d="M2.5 19h19"/><path d="M2.5 15.5c3-3.2 5.5-3.2 8.5 0 3 3.2 5.5 3.2 8.5 0"/><path d="M4 12c2.5-2.6 4.5-2.6 7 0"/><circle cx="17.5" cy="7" r="2.25"/>',
  fish: '<path d="M2.75 12c2.5-4 6-6 9.5-6 3 0 5.5 2 7.25 6-1.75 4-4.25 6-7.25 6-3.5 0-7-2-9.5-6z"/><path d="M19.5 12l2.75-3.25v6.5L19.5 12"/><circle cx="8.25" cy="11" r="0.6" fill="currentColor" stroke="none"/>',
  facility: '<path d="M3 21V9.5l5 3.25V9.5l5 3.25V9.5l5 3.25V21H3z"/><path d="M15.5 9.5V3.5h3v7.5"/><path d="M7 21v-4h3v4"/>',
  registry: '<path d="M5 3.5h10.5A3.5 3.5 0 0 1 19 7v13.5H8.5A3.5 3.5 0 0 1 5 17V3.5z"/><path d="M5 17a3.5 3.5 0 0 1 3.5-3.5H19M9 7.5h6M9 10.5h6"/>',
  certificate: '<path d="M12 2.75l7.25 2.9v5.6c0 4.9-3.1 8.4-7.25 10-4.15-1.6-7.25-5.1-7.25-10v-5.6L12 2.75z"/><path d="M8.75 12l2.25 2.25L15.5 9.75"/>',
};
