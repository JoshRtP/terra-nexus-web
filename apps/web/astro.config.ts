import { defineConfig } from 'astro/config';

const buildMode = process.env.TNX_BUILD_MODE === 'preview' ? 'preview' : 'production';

console.info(`[Terra Nexus] static foundation build mode: ${buildMode}`);

export default defineConfig({
  output: 'static',
  build: {
    format: 'directory',
  },
  server: {
    host: true,
    port: 4321,
  },
});
