// Keystatic/Cloudflare Astro-6 compatibility shim (M6).
//
// Why this file exists: @keystatic/astro@5.2.0's bundled /api/keystatic/*
// route handler reads `context.locals.runtime.env` to source
// KEYSTATIC_GITHUB_CLIENT_ID / KEYSTATIC_GITHUB_CLIENT_SECRET /
// KEYSTATIC_SECRET. @astrojs/cloudflare@13.x (the whole Astro-6-targeting
// major line) deliberately makes `locals.runtime.env` a throwing getter
// (removed in Astro v6 in favor of `import { env } from "cloudflare:workers"`),
// so every request 500s before GitHub credentials even come into play. See
// docs/architecture/web-platform-architecture.md §6.1 for the full
// investigation.
//
// Why this lives in src/lib/ instead of src/pages/api/keystatic/: a plain
// file under src/pages is scanned into the route graph on *every* build,
// including default production builds that never mount Keystatic
// (SKIP_KEYSTATIC=true) — which would force the whole site from a pure
// static-assets deploy into a Worker-fronted "server" build even when
// Keystatic is off, violating CLAUDE.md's static-site invariant. Instead
// astro.config.ts's `keystaticCloudflareCompatShim()` integration injects
// this route via `injectRoute()` (mirroring how @keystatic/astro injects
// its own routes), under the exact same `includeKeystatic` condition that
// gates the `keystatic()` integration itself — so it only exists in builds
// that already mount Keystatic, listed before `keystatic()` so it takes
// route-array precedence over the upstream handler for the same pattern.
//
// What it does differently from upstream: sources the three env vars from
// Cloudflare's supported `cloudflare:workers` env export instead of
// `context.locals.runtime.env`. Everything else — calling
// `makeGenericAPIRouteHandler` from `@keystatic/core/api/generic`, and the
// request/response/cookie forwarding — is copied near-verbatim from
// @keystatic/astro's own `keystatic-astro-api.js`. All OAuth, token
// exchange, CSRF/state, session, and cookie-signing logic remains inside
// Keystatic core; this file owns none of that.
//
// Delete this file (and the integration wiring in astro.config.ts) once a
// future `@keystatic/astro` release sources env from `cloudflare:workers`
// (or an equivalent non-throwing path) itself — check the installed
// `keystatic-astro-api.js` on every upgrade.
import type { APIRoute } from 'astro';
import { makeGenericAPIRouteHandler } from '@keystatic/core/api/generic';
import { parseString } from 'set-cookie-parser';
import keystaticConfig from '../../keystatic.config';

export const prerender = false;

export const ALL: APIRoute = async (context) => {
  // cloudflare:workers only resolves inside the Workers runtime (workerd),
  // never during the Node prerender step — safe here because this route is
  // always on-demand (prerender = false above).
  const { env } = await import('cloudflare:workers');

  const handler = makeGenericAPIRouteHandler(
    {
      config: keystaticConfig,
      clientId: (env as Record<string, string | undefined>).KEYSTATIC_GITHUB_CLIENT_ID,
      clientSecret: (env as Record<string, string | undefined>).KEYSTATIC_GITHUB_CLIENT_SECRET,
      secret: (env as Record<string, string | undefined>).KEYSTATIC_SECRET,
    },
    { slugEnvName: 'PUBLIC_KEYSTATIC_GITHUB_APP_SLUG' }
  );

  const { body, headers, status } = await handler(context.request);

  // Cookie/header forwarding copied from @keystatic/astro's own adapter
  // (keystatic-astro-api.js) — Astro's `context.cookies` API needs
  // Set-Cookie headers pulled out and re-applied individually.
  const headersByKey = new Map<string, string[]>();
  if (headers) {
    if (Array.isArray(headers)) {
      for (const [key, value] of headers) {
        const lower = key.toLowerCase();
        if (!headersByKey.has(lower)) headersByKey.set(lower, []);
        headersByKey.get(lower)!.push(value);
      }
    } else if (typeof (headers as Headers).entries === 'function') {
      for (const [key, value] of (headers as Headers).entries()) {
        headersByKey.set(key.toLowerCase(), [value]);
      }
      const h = headers as Headers;
      if ('getSetCookie' in h && typeof h.getSetCookie === 'function') {
        const setCookieHeaders = h.getSetCookie();
        if (setCookieHeaders?.length) headersByKey.set('set-cookie', setCookieHeaders);
      }
    } else {
      for (const [key, value] of Object.entries(headers)) {
        headersByKey.set(key.toLowerCase(), [String(value)]);
      }
    }
  }

  const setCookieHeaders = headersByKey.get('set-cookie');
  headersByKey.delete('set-cookie');
  if (setCookieHeaders) {
    for (const setCookieValue of setCookieHeaders) {
      const { name, value, ...options } = parseString(setCookieValue);
      const sameSite = options.sameSite?.toLowerCase();
      context.cookies.set(name, value, {
        domain: options.domain,
        expires: options.expires,
        httpOnly: options.httpOnly,
        maxAge: options.maxAge,
        path: options.path,
        sameSite: sameSite === 'lax' || sameSite === 'strict' || sameSite === 'none' ? sameSite : undefined,
      });
    }
  }

  return new Response(body as BodyInit | null, {
    status,
    headers: [...headersByKey.entries()].flatMap(([key, values]) => values.map((v) => [key, v] as [string, string])),
  });
};
