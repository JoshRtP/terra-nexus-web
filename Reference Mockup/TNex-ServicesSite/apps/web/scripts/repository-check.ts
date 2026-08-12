import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { spawn, spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const SCRIPT_DIRECTORY = dirname(fileURLToPath(import.meta.url));
export const REPOSITORY_ROOT = resolve(SCRIPT_DIRECTORY, '../../..');

type Output = (line: string) => void;

export interface RepositoryCheckOptions {
  repositoryRoot?: string;
  pythonExecutable?: string;
  output?: Output;
}

export interface FinalizeContentResult {
  changedDerivedFiles: string[];
}

function npmExecutable(): string {
  return process.platform === 'win32' ? 'npm.cmd' : 'npm';
}

function printCommand(output: Output, command: string, args: string[]): void {
  output(`> ${[command, ...args].join(' ')}`);
}

async function runCommand(
  command: string,
  args: string[],
  repositoryRoot: string,
  output: Output,
): Promise<void> {
  printCommand(output, command, args);
  await new Promise<void>((resolveCommand, rejectCommand) => {
    const child = spawn(command, args, {
      cwd: repositoryRoot,
      env: process.env,
      stdio: 'inherit',
      // npm is a .cmd shim on Windows and must be invoked through cmd.exe.
      shell: process.platform === 'win32' && command.toLowerCase().endsWith('.cmd'),
    });
    child.once('error', (error) => rejectCommand(new Error(`Unable to run ${command}: ${error.message}`)));
    child.once('exit', (code, signal) => {
      if (code === 0) resolveCommand();
      else rejectCommand(new Error(`${command} ${args.join(' ')} failed${signal ? ` (${signal})` : ` with exit code ${code ?? 'unknown'}`}.`));
    });
  });
}

export function resolvePythonExecutable(repositoryRoot = REPOSITORY_ROOT): string {
  const virtualEnvironmentPython = process.platform === 'win32'
    ? resolve(repositoryRoot, '.venv', 'Scripts', 'python.exe')
    : resolve(repositoryRoot, '.venv', 'bin', 'python');
  const candidates = [process.env.TNX_PYTHON, existsSync(virtualEnvironmentPython) ? virtualEnvironmentPython : undefined, 'python']
    .filter((candidate): candidate is string => Boolean(candidate));

  for (const candidate of candidates) {
    const result = spawnSync(candidate, ['-c', 'import yaml, pytest'], {
      cwd: repositoryRoot,
      encoding: 'utf8',
      shell: false,
    });
    if (result.status === 0) return candidate;
  }

  throw new Error(
    'Python development dependencies are unavailable. Activate the project virtual environment and run '
      + '`python -m pip install -e ".[dev]"`, then retry. You may set TNX_PYTHON to that interpreter path.',
  );
}

function resolvedOptions(options: RepositoryCheckOptions): Required<RepositoryCheckOptions> {
  const repositoryRoot = resolve(options.repositoryRoot ?? REPOSITORY_ROOT);
  return {
    repositoryRoot,
    pythonExecutable: options.pythonExecutable ?? resolvePythonExecutable(repositoryRoot),
    output: options.output ?? console.log,
  };
}

export async function runPythonChecks(options: RepositoryCheckOptions = {}): Promise<void> {
  const resolved = resolvedOptions(options);
  for (const args of [
    ['scripts/validate_okf.py', 'knowledge'],
    ['scripts/tnx_validate.py', 'knowledge'],
    ['-m', 'pytest', 'tests/', '-v'],
    ['scripts/generate_inventory.py', 'knowledge', '--check', '--tree'],
    ['scripts/sync_skills.py', '--check'],
  ]) {
    await runCommand(resolved.pythonExecutable, args, resolved.repositoryRoot, resolved.output);
  }
}

export async function runWebChecks(options: RepositoryCheckOptions = {}): Promise<void> {
  const resolved = resolvedOptions(options);
  for (const args of [
    ['run', 'content:validate'],
    ['run', 'web:test'],
    ['run', 'web:build'],
    ['run', 'web:typecheck'],
  ]) {
    await runCommand(npmExecutable(), args, resolved.repositoryRoot, resolved.output);
  }
}

export async function runCompleteRepositoryCheck(options: RepositoryCheckOptions = {}): Promise<void> {
  const resolved = resolvedOptions(options);
  await runPythonChecks(resolved);
  await runWebChecks(resolved);
}

async function fingerprint(path: string): Promise<string | undefined> {
  if (!existsSync(path)) return undefined;
  return createHash('sha256').update(await readFile(path)).digest('hex');
}

export async function finalizeContent(options: RepositoryCheckOptions = {}): Promise<FinalizeContentResult> {
  const resolved = resolvedOptions(options);
  const derivedPaths = [
    resolve(resolved.repositoryRoot, 'knowledge', 'bundle-inventory.json'),
    resolve(resolved.repositoryRoot, 'knowledge', 'TREE.txt'),
  ];
  const before = await Promise.all(derivedPaths.map(fingerprint));

  await runCommand(
    resolved.pythonExecutable,
    ['scripts/generate_inventory.py', 'knowledge', '--tree'],
    resolved.repositoryRoot,
    resolved.output,
  );

  const after = await Promise.all(derivedPaths.map(fingerprint));
  const changedDerivedFiles = derivedPaths
    .map((path, index) => ({ path, changed: before[index] !== after[index] }))
    .filter(({ changed }) => changed)
    .map(({ path }) => path.slice(resolved.repositoryRoot.length + 1).replaceAll('\\', '/'));
  resolved.output(
    changedDerivedFiles.length
      ? `Derived files changed: ${changedDerivedFiles.join(', ')}`
      : 'Derived files changed: none (inventory and tree were already current).',
  );
  resolved.output('No commit or push was performed. Review all changes with `git diff` before opening a pull request.');

  await runCompleteRepositoryCheck(resolved);
  return { changedDerivedFiles };
}

async function runCli(): Promise<void> {
  const command = process.argv[2] ?? 'complete';
  if (command === 'python') return runPythonChecks();
  if (command === 'web') return runWebChecks();
  if (command === 'complete') return runCompleteRepositoryCheck();
  if (command === 'inventory') {
    const resolved = resolvedOptions({});
    return runCommand(resolved.pythonExecutable, ['scripts/generate_inventory.py', 'knowledge', '--tree'], resolved.repositoryRoot, resolved.output);
  }
  throw new Error('Usage: repository-check.ts <python|web|complete|inventory>');
}

const executedDirectly = process.argv[1] && resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url));
if (executedDirectly) {
  runCli().catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  });
}
