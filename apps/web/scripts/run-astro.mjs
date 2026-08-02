import { spawn } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const appRoot = resolve(scriptDirectory, '..');
const astroCli = resolve(appRoot, '../../node_modules/astro/bin/astro.mjs');
const child = spawn(process.execPath, [astroCli, ...process.argv.slice(2)], {
  env: { ...process.env, ASTRO_TELEMETRY_DISABLED: '1' },
  stdio: 'inherit',
});

child.on('exit', (code) => process.exit(code ?? 1));
