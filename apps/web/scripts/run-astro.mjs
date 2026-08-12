import { spawn } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const appRoot = resolve(scriptDirectory, '..');
const astroCli = resolve(appRoot, '../../node_modules/astro/bin/astro.mjs');

const args = process.argv.slice(2);
if (args[0] === 'dev' && !args.includes('--host')) {
  args.push('--host');
}

// build/check (typecheck) must stay static/adapter-free: Keystatic's admin
// routes are on-demand ("prerender: false") and only need SSR from the dev
// server itself. Default SKIP_KEYSTATIC=true for anything other than `dev`
// so the integration is never registered outside local development, unless
// the caller has already set SKIP_KEYSTATIC explicitly.
const skipKeystatic =
  process.env.SKIP_KEYSTATIC ?? (args[0] === 'dev' ? 'false' : 'true');

const child = spawn(process.execPath, [astroCli, ...args], {
  cwd: appRoot,
  env: { ...process.env, ASTRO_TELEMETRY_DISABLED: '1', SKIP_KEYSTATIC: skipKeystatic },
  stdio: 'inherit',
});

child.on('exit', (code) => process.exit(code ?? 1));
