import { compileOkf, assertNoCompilerErrors } from './compiler.js';
import type { BuildMode, CompilationResult } from './types.js';

export async function compileForBuild(mode: BuildMode): Promise<CompilationResult> {
  const result = await compileOkf({ buildMode: mode, writeArtifacts: true });
  assertNoCompilerErrors(result);
  console.info(`[Terra Nexus] OKF compiler: ${result.audit.scannedRecords} scanned, ${result.audit.eligibleRecords} ${mode}-eligible.`);
  return result;
}
