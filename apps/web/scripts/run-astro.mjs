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

const child = spawn(process.execPath, [astroCli, ...args], {
  cwd: appRoot,
  env: { ...process.env, ASTRO_TELEMETRY_DISABLED: '1' },
  stdio: 'inherit',
});

child.on('exit', (code) => process.exit(code ?? 1));
