// Contact form payload validation — shared by the on-demand /api/contact
// route (src/pages/api/contact.ts) and its unit tests. Deliberately
// hand-rolled rather than pulling in a schema library (no validation
// library is used anywhere else in this repo; see CLAUDE.md's "smallest
// coherent change" guidance) and kept dependency-free so it is trivially
// unit-testable without a workerd runtime.
//
// The field list and the enum option values below must stay in sync with
// the <select> options in src/pages/contact/index.astro — there is no
// single source of truth shared between the two today. If you add/remove
// an option there, update ORG_TYPE_VALUES / ROUTING_VALUES / TIMING_VALUES
// here too.

export interface ContactSubmission {
  name: string;
  email: string;
  organization: string;
  role: string;
  orgType: string;
  routing: string;
  challenge: string;
  timing: string;
  link: string;
  consent: boolean;
  turnstileToken: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
  data?: ContactSubmission;
}

const ORG_TYPE_VALUES = new Set([
  '',
  'agricultural-producer',
  'commodity-trader',
  'ingredient-processor',
  'food-beverage',
  'retail-distribution',
  'energy-biofuels',
  'food-waste',
  'inputs',
  'environmental-markets',
  'technology',
  'investor',
  'other',
]);

const ROUTING_VALUES = new Set(['', 'strategy', 'investment', 'sourcing', 'sustainability', 'carbon', 'other']);

const TIMING_VALUES = new Set(['', 'immediate', 'near-term', 'quarter', 'exploring']);

// Deliberately permissive (RFC 5322 in full is not worth reimplementing) —
// this only needs to catch obviously-malformed input, not validate
// deliverability. Real deliverability is proven by the email actually
// sending.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function asString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

/**
 * Validates a raw, untrusted request payload (parsed JSON or form-encoded
 * body) into a well-typed ContactSubmission, or a map of field -> error
 * message. Never throws on malformed input — always returns a result.
 */
export function validateContactPayload(raw: unknown): ValidationResult {
  const errors: Record<string, string> = {};

  if (typeof raw !== 'object' || raw === null) {
    return { valid: false, errors: { form: 'Request body must be a JSON object.' } };
  }

  const body = raw as Record<string, unknown>;

  const name = asString(body.name);
  if (!name) errors.name = 'Name is required.';

  const email = asString(body.email);
  if (!email) {
    errors.email = 'Work email is required.';
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = 'Enter a valid email address.';
  }

  const organization = asString(body.organization);
  const role = asString(body.role);

  const orgType = asString(body.org_type ?? body.orgType);
  if (!ORG_TYPE_VALUES.has(orgType)) errors.orgType = 'Unrecognized organization type.';

  const routing = asString(body.routing);
  if (!ROUTING_VALUES.has(routing)) errors.routing = 'Unrecognized routing selection.';

  const challenge = asString(body.challenge);
  if (!challenge) errors.challenge = 'Challenge or objective is required.';

  const timing = asString(body.timing);
  if (!TIMING_VALUES.has(timing)) errors.timing = 'Unrecognized timing selection.';

  const link = asString(body.link);
  if (link) {
    try {
      new URL(link);
    } catch {
      errors.link = 'Optional link must be a full URL (e.g. https://example.com).';
    }
  }

  const consent = body.consent === true || body.consent === 'true' || body.consent === 'on';
  if (!consent) errors.consent = 'Consent is required to submit this form.';

  const turnstileToken = asString(body.turnstileToken ?? body['cf-turnstile-response']);
  if (!turnstileToken) errors.turnstileToken = 'Spam-verification challenge did not complete — please retry.';

  if (Object.keys(errors).length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    errors: {},
    data: { name, email, organization, role, orgType, routing, challenge, timing, link, consent, turnstileToken },
  };
}
