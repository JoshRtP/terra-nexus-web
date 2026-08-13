// Terra Nexus editorial publication model.
//
// Two independent inputs, per docs/architecture/web-platform-architecture.md
// §Publication model:
//   editorialStatus: 'draft' | 'approved'   — has an editor signed off?
//   publishAt:       'YYYY-MM-DDTHH:mm'     — earliest time it may go public
//
// Derived state (never stored — computed from the two inputs above plus the
// current instant):
//   draft     = editorialStatus is 'draft'
//   scheduled = editorialStatus is 'approved' AND publishAt is in the future
//   published = editorialStatus is 'approved' AND publishAt has passed
//
// Timezone policy: `publishAt` is entered and interpreted as America/Denver
// wall-clock time (Mountain Time — the owner's timezone), NOT UTC and NOT
// the browser/server's local zone. Keystatic's `fields.datetime` input has
// no timezone selector of its own and stores a naive `YYYY-MM-DDTHH:mm`
// string with no offset — denverWallClockToUtc() below is what makes that
// naive string unambiguous, and does so correctly across the MST/MDT
// transition (America/Denver is not a fixed UTC offset).

export type EditorialStatus = 'draft' | 'approved';
export type PublicationState = 'draft' | 'scheduled' | 'published';

export const PUBLICATION_TIME_ZONE = 'America/Denver';

export interface PublicationFields {
  editorialStatus: EditorialStatus;
  /** Naive `YYYY-MM-DDTHH:mm` string, Mountain Time — see module header. */
  publishAt: string;
}

/**
 * Converts a naive `YYYY-MM-DDTHH:mm` string, interpreted as wall-clock time
 * in `timeZone`, to the UTC instant it represents. Standard "resolve a
 * civil time to an instant" technique: format a first-pass UTC guess back
 * into the target zone, and use the difference to correct for that zone's
 * offset (which varies with DST, so it can't be a fixed constant).
 */
export function zonedWallClockToUtc(naive: string, timeZone: string = PUBLICATION_TIME_ZONE): Date {
  const utcGuess = new Date(`${naive}:00Z`);
  if (Number.isNaN(utcGuess.getTime())) {
    throw new Error(`Not a valid "YYYY-MM-DDTHH:mm" datetime: ${naive}`);
  }
  const offsetMinutes = timeZoneOffsetMinutesAt(timeZone, utcGuess);
  return new Date(utcGuess.getTime() - offsetMinutes * 60_000);
}

/** Minutes to ADD to a UTC instant to get local wall-clock time in `timeZone`. */
function timeZoneOffsetMinutesAt(timeZone: string, at: Date): number {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hourCycle: 'h23',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).formatToParts(at);
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value ?? '0');
  const asIfUtc = Date.UTC(get('year'), get('month') - 1, get('day'), get('hour'), get('minute'), get('second'));
  return (asIfUtc - at.getTime()) / 60_000;
}

export function getPublicationState(fields: PublicationFields, now: Date = new Date()): PublicationState {
  if (fields.editorialStatus === 'draft') return 'draft';
  const publishInstant = zonedWallClockToUtc(fields.publishAt);
  return publishInstant.getTime() <= now.getTime() ? 'published' : 'scheduled';
}

/** True only once editorialStatus is 'approved' AND publishAt has passed. */
export function isPubliclyVisible(fields: PublicationFields, now: Date = new Date()): boolean {
  return getPublicationState(fields, now) === 'published';
}
