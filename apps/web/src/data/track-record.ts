// "Our Track Record" — the one source for the portfolio figures the homepage
// renders (components/TrackRecord.astro). The About page carries an older
// copy of the previous figures ($3B+, 5M+ acres) in its own list; it should
// move onto this record when it is next touched.
//
// Figures, label wording, lever names and the closing band are owner copy,
// 2026-09-14 (design/track-record-options rounds 2–6). `value` is the
// plain-text rendering (SSR, no-JS, reduced motion); `count`/`prefix`/
// `suffix`/`decimals` drive the scroll-triggered count-up.

export interface TrackRecordStat {
  value: string;
  count: number;
  prefix?: string;
  suffix: string;
  decimals?: number;
  label: string;
  /** Key into the icon set in components/TrackRecord.astro. */
  icon: TrackRecordIcon;
}

export type TrackRecordIcon =
  | 'globe'
  | 'commodity'
  | 'acres'
  | 'fish'
  | 'facility'
  | 'registry'
  | 'certificate';

export const trackRecordHeadline: TrackRecordStat = {
  value: '$2.65B',
  count: 2.65,
  prefix: '$',
  suffix: 'B',
  decimals: 2,
  label: 'Enterprise value created for clients',
  icon: 'globe',
};

export const trackRecordStats: TrackRecordStat[] = [
  { value: '25+', count: 25, suffix: '+', label: 'Countries with verified impact', icon: 'globe' },
  { value: '15+', count: 15, suffix: '+', label: 'Commodity value chains', icon: 'commodity' },
  { value: '8M+', count: 8, suffix: 'M+', label: 'Regenerative acres', icon: 'acres' },
  { value: '20+', count: 20, suffix: '+', label: 'Sustainable fisheries', icon: 'fish' },
  { value: '2,000+', count: 2000, suffix: '+', label: 'Resource efficient facilities', icon: 'facility' },
  { value: '10+', count: 10, suffix: '+', label: 'Carbon registries & regulated markets', icon: 'registry' },
  { value: '20+', count: 20, suffix: '+', label: 'Sustainable commodity & EACs', icon: 'certificate' },
];

/** The ordinary good-business levers that produced the headline value. */
export const trackRecordLevers = {
  up: { label: 'Increase', items: ['Revenue', 'Margin', 'Efficiency'] },
  down: { label: 'Decrease', items: ['Cost', 'Risk'] },
} as const;

export const trackRecordBand = ['Resilient', 'Sustainable', 'Prosperous'] as const;
