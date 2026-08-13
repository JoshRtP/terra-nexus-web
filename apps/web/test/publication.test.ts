import { describe, expect, it } from 'vitest';
import { getPublicationState, isPubliclyVisible, zonedWallClockToUtc } from '../src/lib/publication.js';

describe('publication model', () => {
  it('interprets naive datetimes as America/Denver wall-clock time, correcting for MST/MDT', () => {
    // 2026-01-15 is MST (UTC-7): 09:00 MT === 16:00 UTC.
    expect(zonedWallClockToUtc('2026-01-15T09:00').toISOString()).toBe('2026-01-15T16:00:00.000Z');
    // 2026-07-15 is MDT (UTC-6): 09:00 MT === 15:00 UTC. Same wall-clock
    // input, different UTC instant — proves this isn't a fixed offset.
    expect(zonedWallClockToUtc('2026-07-15T09:00').toISOString()).toBe('2026-07-15T15:00:00.000Z');
  });

  it('draft always wins regardless of publishAt', () => {
    const now = new Date('2026-08-12T12:00:00Z');
    expect(
      getPublicationState({ editorialStatus: 'draft', publishAt: '2020-01-01T00:00' }, now)
    ).toBe('draft');
  });

  it('approved + future publishAt is scheduled, not published', () => {
    const now = new Date('2026-08-12T12:00:00Z');
    const state = getPublicationState({ editorialStatus: 'approved', publishAt: '2099-01-01T00:00' }, now);
    expect(state).toBe('scheduled');
    expect(isPubliclyVisible({ editorialStatus: 'approved', publishAt: '2099-01-01T00:00' }, now)).toBe(false);
  });

  it('approved + past publishAt is published', () => {
    const now = new Date('2026-08-12T12:00:00Z');
    const state = getPublicationState({ editorialStatus: 'approved', publishAt: '2020-01-01T00:00' }, now);
    expect(state).toBe('published');
    expect(isPubliclyVisible({ editorialStatus: 'approved', publishAt: '2020-01-01T00:00' }, now)).toBe(true);
  });

  it('becomes published automatically once "now" crosses publishAt, with no re-save', () => {
    const publishAt = '2026-08-12T09:00'; // 2026-08-12T15:00:00Z (MDT)
    const fields = { editorialStatus: 'approved' as const, publishAt };
    expect(isPubliclyVisible(fields, new Date('2026-08-12T14:59:59Z'))).toBe(false);
    expect(isPubliclyVisible(fields, new Date('2026-08-12T15:00:00Z'))).toBe(true);
  });
});
