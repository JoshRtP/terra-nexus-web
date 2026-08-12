import type { BuildMode } from './okf/types.js';

export function getBuildMode(): BuildMode {
  return process.env.TNX_BUILD_MODE === 'preview' ? 'preview' : 'production';
}
