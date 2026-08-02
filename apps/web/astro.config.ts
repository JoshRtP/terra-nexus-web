import { defineConfig } from 'astro/config';

const buildMode = process.env.TNX_BUILD_MODE === 'preview' ? 'preview' : 'production';

// This diagnostic is intentionally emitted only to the build/server process.
console.info(`[Terra Nexus] static foundation build mode: ${buildMode}`);

export default defineConfig({
  output: 'static',
  build: {
    format: 'directory',
  },
});
