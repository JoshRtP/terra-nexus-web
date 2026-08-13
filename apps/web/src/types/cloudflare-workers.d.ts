// Ambient declaration for Cloudflare's supported runtime module. No
// `@cloudflare/workers-types` package is installed in this repo (not
// otherwise needed); this covers the one export the Keystatic/Cloudflare
// compatibility shim uses. See
// src/pages/api/keystatic/[...params].ts and
// docs/architecture/web-platform-architecture.md §6.1.
declare module 'cloudflare:workers' {
  export const env: Record<string, string | undefined>;
}
