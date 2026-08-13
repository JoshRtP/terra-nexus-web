import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['test/**/*.test.ts'],
    testTimeout: 30_000,
    // Multiple test files shell out to real `astro build` (astro-foundation,
    // keystatic-cloudflare-shim) sharing this app's Vite dependency
    // optimization cache (node_modules/.vite) — concurrent builds race on
    // that cache and corrupt each other. Output directories are already
    // isolated per test; the cache directory isn't independently
    // configurable, so serialize test files instead.
    fileParallelism: false,
  },
});
