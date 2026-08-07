#!/usr/bin/env tsx
/**
 * Terra Nexus — Miro Board Transfer Tool
 *
 * Scans the Astro `src/pages` directory, places each page onto a Miro board
 * as a framed card in a Figma-style grid layout, and optionally draws
 * connector arrows between pages that link to one another.
 *
 * Designed to run in small batches with auto-save checkpoints so it can be
 * safely resumed after a crash or rate-limit.
 *
 * Usage:
 *   tsx scripts/create-miro-board.ts                 # fresh run
 *   tsx scripts/create-miro-board.ts --resume        # resume from checkpoint
 *   tsx scripts/create-miro-board.ts --auto-connect  # draw connectors automatically
 *   tsx scripts/create-miro-board.ts --batch-size 3  # override batch size
 *
 * Env:
 *   MIRO_ACCESS_TOKEN  — Miro REST API access token (boards:read boards:write)
 *   MIRO_BOARD_ID      — target board id (defaults to the id parsed from MIRO_BOARD_URL)
 *   MIRO_BOARD_URL     — full board URL (used to derive MIRO_BOARD_ID when MIRO_BOARD_ID is unset)
 */

import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, relative, dirname, basename, sep, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

/** Number of pages to place per batch (keep small to avoid rate-limits). */
const BATCH_SIZE = 4;

/** Delay between batches, in milliseconds. */
const BATCH_DELAY_MS = 1500;

/** Horizontal gap between page frames in the grid. */
const GRID_GAP_X = 300;

/** Vertical gap between page frames in the grid. */
const GRID_GAP_Y = 400;

/** Frame width (desktop mockups). */
const FRAME_WIDTH = 1440;

/** Frame height (desktop mockups). */
const FRAME_HEIGHT = 900;

/** Miro REST API base. */
const MIRO_API_BASE = 'https://api.miro.com/v2';

/** Project root (two levels up from this script). */
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PROJECT_ROOT = normalize(join(__dirname, '..'));

const PAGES_DIR = join(PROJECT_ROOT, 'apps', 'web', 'src', 'pages');
const SCREENSHOTS_DIR = join(PROJECT_ROOT, 'apps', 'web', 'screenshots');

const CHECKPOINT_FILE = join(PROJECT_ROOT, 'miro-progress.json');
const FAILED_FILE = join(PROJECT_ROOT, 'miro-failed.json');

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface DiscoveredPage {
  /** Stable id derived from the relative route (e.g. "expertise/agroforestry"). */
  id: string;
  /** Human-readable name (e.g. "Expertise / Agroforestry"). */
  name: string;
  /** Route path (e.g. "/expertise/agroforestry/"). */
  route: string;
  /** Absolute path to the .astro source file. */
  filePath: string;
  /** Depth from the pages root (0 = home, 1 = section, 2 = leaf). */
  depth: number;
  /** Absolute path to a screenshot if one exists, otherwise null. */
  screenshotPath: string | null;
  /** Other routes this page links to, extracted from href attributes. */
  links: string[];
}

interface CheckpointEntry {
  pageId: string;
  pageName: string;
  miroItemId: string;
  x: number;
  y: number;
  timestamp: string;
  batch: number;
}

interface CheckpointFile {
  boardId: string;
  lastUpdated: string;
  entries: CheckpointEntry[];
}

interface FailedEntry {
  pageId: string;
  pageName: string;
  route: string;
  error: string;
  timestamp: string;
}

interface FailedFile {
  boardId: string;
  lastUpdated: string;
  entries: FailedEntry[];
}

interface GridPosition {
  x: number;
  y: number;
}

// ---------------------------------------------------------------------------
// CLI flag parsing
// ---------------------------------------------------------------------------

interface CliFlags {
  resume: boolean;
  autoConnect: boolean;
  batchSize: number;
}

function parseArgs(argv: string[]): CliFlags {
  const flags: CliFlags = {
    resume: false,
    autoConnect: false,
    batchSize: BATCH_SIZE,
  };
  for (const arg of argv.slice(2)) {
    if (arg === '--resume') flags.resume = true;
    else if (arg === '--auto-connect') flags.autoConnect = true;
    else if (arg === '--batch-size') {
      // value expected in the next arg
    } else if (arg.startsWith('--batch-size=')) {
      const v = Number(arg.split('=')[1]);
      if (Number.isFinite(v) && v > 0) flags.batchSize = Math.floor(v);
    }
  }
  // Handle "--batch-size N" form
  const bsIdx = argv.indexOf('--batch-size');
  if (bsIdx !== -1 && argv[bsIdx + 1]) {
    const v = Number(argv[bsIdx + 1]);
    if (Number.isFinite(v) && v > 0) flags.batchSize = Math.floor(v);
  }
  return flags;
}

// ---------------------------------------------------------------------------
// Config resolution
// ---------------------------------------------------------------------------

function resolveBoardId(): string {
  const explicit = process.env.MIRO_BOARD_ID;
  if (explicit && explicit.trim()) return explicit.trim();
  const boardUrl = process.env.MIRO_BOARD_URL;
  if (boardUrl) {
    const parsed = parseBoardUrl(boardUrl);
    if (parsed) return parsed;
  }
  throw new Error(
    'Set MIRO_BOARD_ID (or MIRO_BOARD_URL) and MIRO_ACCESS_TOKEN in your environment before running.',
  );
}

function parseBoardUrl(url: string): string | null {
  // https://miro.com/app/board/uXjVH0E2UfE=/?share_link_id=...
  const match = url.match(/board\/([^/?#]+)/);
  return match ? match[1] : null;
}

function resolveToken(): string {
  const token = process.env.MIRO_ACCESS_TOKEN;
  if (!token || !token.trim()) {
    throw new Error('MIRO_ACCESS_TOKEN is not set. Generate a token with boards:read and boards:write scopes.');
  }
  return token.trim();
}

// ---------------------------------------------------------------------------
// Page discovery
// ---------------------------------------------------------------------------

function discoverPages(): DiscoveredPage[] {
  const pages: DiscoveredPage[] = [];
  if (!existsSync(PAGES_DIR)) return pages;
  walkPages(PAGES_DIR, '', pages);
  return pages.sort((a, b) => a.id.localeCompare(b.id, 'en', { numeric: true }));
}

function walkPages(dir: string, relPrefix: string, out: DiscoveredPage[]): void {
  const entries = readdirSync(dir).sort();
  for (const entry of entries) {
    const abs = join(dir, entry);
    const stat = statSync(abs);
    if (stat.isDirectory()) {
      walkPages(abs, relPrefix ? `${relPrefix}/${entry}` : entry, out);
      continue;
    }
    if (!entry.endsWith('.astro')) continue;
    // Skip dynamic routes — they are templates, not concrete pages.
    if (entry.startsWith('[') && entry.endsWith(']')) continue;
    const id = relPrefix ? `${relPrefix}` : 'home';
    const route = relPrefix ? `/${relPrefix}/` : '/';
    const name = id === 'home' ? 'Home' : id.split('/').map(titleCaseSegment).join(' / ');
    const depth = relPrefix ? relPrefix.split('/').length : 0;
    const screenshotPath = findScreenshot(id);
    const links = extractLinks(abs);
    out.push({ id, name, route, filePath: abs, depth, screenshotPath, links });
  }
}

function titleCaseSegment(seg: string): string {
  return seg
    .split('-')
    .map((w) => (w.length ? w[0].toUpperCase() + w.slice(1) : w))
    .join(' ');
}

function findScreenshot(pageId: string): string | null {
  if (!existsSync(SCREENSHOTS_DIR)) return null;
  const candidates = [
    `${pageId}.png`,
    `${pageId}.jpg`,
    `${pageId}.jpeg`,
    `${pageId}/index.png`,
    `${pageId}/index.jpg`,
    `${pageId}/screenshot.png`,
  ];
  for (const c of candidates) {
    const abs = join(SCREENSHOTS_DIR, c);
    if (existsSync(abs)) return abs;
  }
  return null;
}

function extractLinks(filePath: string): string[] {
  try {
    const content = readFileSync(filePath, 'utf8');
    const linkSet = new Set<string>();
    const hrefRegex = /href=["']([^"']+)["']/g;
    let m: RegExpExecArray | null;
    while ((m = hrefRegex.exec(content)) !== null) {
      const href = m[1].trim();
      if (!href || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('#')) continue;
      const normalized = normalizeRoute(href);
      if (normalized) linkSet.add(normalized);
    }
    return [...linkSet];
  } catch {
    return [];
  }
}

function normalizeRoute(href: string): string | null {
  let h = href;
  if (h.startsWith('.')) {
    // Treat relative hrefs against the pages root for simplicity.
    h = '/' + h.replace(/^\.?\//, '');
  }
  if (!h.startsWith('/')) return null;
  if (!h.endsWith('/')) h += '/';
  // Drop fragments / query strings.
  h = h.split('#')[0].split('?')[0];
  if (!h.endsWith('/')) h += '/';
  return h || null;
}

// ---------------------------------------------------------------------------
// Grid layout
// ---------------------------------------------------------------------------

function computeGrid(pages: DiscoveredPage[]): Map<string, GridPosition> {
  const positions = new Map<string, GridPosition>();
  if (pages.length === 0) return positions;

  // Bucket pages by depth so root pages sit on the top row.
  const byDepth = new Map<number, DiscoveredPage[]>();
  for (const p of pages) {
    const arr = byDepth.get(p.depth) ?? [];
    arr.push(p);
    byDepth.set(p.depth, arr);
  }
  const depths = [...byDepth.keys()].sort((a, b) => a - b);
  const maxRow = depths.length;
  const maxCol = Math.max(...[...byDepth.values()].map((arr) => arr.length));

  for (let row = 0; row < maxRow; row++) {
    const depth = depths[row];
    const rowPages = byDepth.get(depth)!.sort((a, b) => a.id.localeCompare(b.id, 'en', { numeric: true }));
    for (let col = 0; col < rowPages.length; col++) {
      const page = rowPages[col];
      // Center the row if it has fewer items than the widest row.
      const colOffset = Math.max(0, Math.floor((maxCol - rowPages.length) / 2));
      const x = (col + colOffset) * (FRAME_WIDTH + GRID_GAP_X);
      const y = row * (FRAME_HEIGHT + GRID_GAP_Y);
      positions.set(page.id, { x, y });
    }
  }
  return positions;
}

// ---------------------------------------------------------------------------
// Miro API helpers
// ---------------------------------------------------------------------------

async function miroFetch(
  token: string,
  boardId: string,
  method: string,
  path: string,
  options: RequestInit = {},
): Promise<any> {
  const url = `${MIRO_API_BASE}/boards/${boardId}${path}`;
  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json',
    ...(options.headers as Record<string, string> | undefined),
  };
  const res = await fetch(url, { ...options, method, headers });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Miro API ${method} ${path} → ${res.status} ${res.statusText}: ${body.slice(0, 500)}`);
  }
  if (res.status === 204) return null;
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

/** Create a frame on the board. Returns the frame item id. */
async function createFrame(
  token: string,
  boardId: string,
  data: {
    data: { type: string; title?: string };
    style?: Record<string, any>;
    position: { x: number; y: number; origin?: string };
    geometry: { width: number; height: number };
  },
): Promise<string> {
  const result = await miroFetch(token, boardId, 'POST', '/frames', {
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const id = result?.id;
  if (!id) throw new Error('Frame creation returned no id');
  return id as string;
}

/** Create a text item on the board (used for labels). */
async function createText(
  token: string,
  boardId: string,
  data: {
    data: { content: string; textAlign?: string; textAlignVertical?: string };
    style?: Record<string, any>;
    position: { x: number; y: number; origin?: string };
    geometry: { width: number; height: number };
  },
): Promise<string> {
  const result = await miroFetch(token, boardId, 'POST', '/texts', {
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const id = result?.id;
  if (!id) throw new Error('Text creation returned no id');
  return id as string;
}

/** Create a shape item (used as a screenshot placeholder). */
async function createShape(
  token: string,
  boardId: string,
  data: {
    data: { type: string; shape: string; content?: string };
    style?: Record<string, any>;
    position: { x: number; y: number; origin?: string };
    geometry: { width: number; height: number };
  },
): Promise<string> {
  const result = await miroFetch(token, boardId, 'POST', '/shapes', {
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const id = result?.id;
  if (!id) throw new Error('Shape creation returned no id');
  return id as string;
}

/**
 * Upload a local image to the board via multipart/form-data.
 * The Miro v2 images endpoint expects:
 *   - `data`  : a JSON file describing position/geometry (sent as a file part)
 *   - `resource`: the raw image bytes
 */
async function createImageFromFile(
  token: string,
  boardId: string,
  imagePath: string,
  position: { x: number; y: number },
  dimensions: { width: number; height: number },
): Promise<string> {
  const buffer = readFileSync(imagePath);
  const ext = imagePath.toLowerCase().split('.').pop() ?? 'png';
  const mime = ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : ext === 'gif' ? 'image/gif' : 'image/png';

  const dataJson = JSON.stringify({
    position: { origin: 'center', x: position.x, y: position.y },
    geometry: { width: dimensions.width, height: dimensions.height },
  });

  // multipart/form-data built manually so we avoid extra dependencies.
  const boundary = `tnx-miro-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  const parts: Buffer[] = [];

  // `data` part (JSON file)
  parts.push(Buffer.from(`--${boundary}\r\n`));
  parts.push(Buffer.from(`Content-Disposition: form-data; name="data"; filename="data.json"\r\n`));
  parts.push(Buffer.from('Content-Type: application/json\r\n\r\n'));
  parts.push(Buffer.from(dataJson));
  parts.push(Buffer.from('\r\n'));

  // `resource` part (raw image)
  parts.push(Buffer.from(`--${boundary}\r\n`));
  parts.push(Buffer.from(`Content-Disposition: form-data; name="resource"; filename="${basename(imagePath)}"\r\n`));
  parts.push(Buffer.from(`Content-Type: ${mime}\r\n\r\n`));
  parts.push(buffer);
  parts.push(Buffer.from('\r\n'));

  // closing boundary
  parts.push(Buffer.from(`--${boundary}--\r\n`));

  const body = Buffer.concat(parts);

  const url = `${MIRO_API_BASE}/boards/${boardId}/images`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': `multipart/form-data; boundary=${boundary}`,
    },
    body,
  });
  if (!res.ok) {
    const errText = await res.text().catch(() => '');
    throw new Error(`Image upload failed (${res.status} ${res.statusText}): ${errText.slice(0, 500)}`);
  }
  const result = await res.json().catch(() => null);
  const id = result?.id;
  if (!id) throw new Error('Image upload returned no id');
  return id as string;
}

/** Create a connector between two board items. */
async function createConnector(
  token: string,
  boardId: string,
  startItemId: string,
  endItemId: string,
  caption?: string,
): Promise<void> {
  const body: Record<string, any> = {
    startItem: { id: startItemId, snapTo: 'right' },
    endItem: { id: endItemId, snapTo: 'left' },
    shape: 'curved',
    style: {
      color: '#1a1a1a',
      strokeWidth: 2.0,
      strokeColor: '#1a1a1a',
      endStrokeCap: 'triangle',
    },
  };
  if (caption) {
    body.captions = [{ content: caption, position: 0.5, textAlign: 'center' }];
  }
  await miroFetch(token, boardId, 'POST', '/connectors', {
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

// ---------------------------------------------------------------------------
// Checkpoint / failed-file persistence
// ---------------------------------------------------------------------------

function loadCheckpoint(boardId: string): CheckpointFile | null {
  if (!existsSync(CHECKPOINT_FILE)) return null;
  try {
    const raw = readFileSync(CHECKPOINT_FILE, 'utf8');
    const parsed = JSON.parse(raw) as CheckpointFile;
    if (parsed.boardId && parsed.boardId !== boardId) {
      console.warn(`⚠  Checkpoint is for a different board (${parsed.boardId}). Ignoring.`);
      return null;
    }
    return parsed;
  } catch {
    console.warn('⚠  miro-progress.json is unreadable. Ignoring.');
    return null;
  }
}

function saveCheckpoint(cp: CheckpointFile): void {
  cp.lastUpdated = new Date().toISOString();
  writeFileSync(CHECKPOINT_FILE, JSON.stringify(cp, null, 2));
}

function loadFailed(boardId: string): FailedFile {
  if (existsSync(FAILED_FILE)) {
    try {
      const raw = readFileSync(FAILED_FILE, 'utf8');
      const parsed = JSON.parse(raw) as FailedFile;
      if (parsed.boardId === boardId) return parsed;
    } catch {
      // ignore — start fresh
    }
  }
  return { boardId, lastUpdated: new Date().toISOString(), entries: [] };
}

function saveFailed(f: FailedFile): void {
  f.lastUpdated = new Date().toISOString();
  writeFileSync(FAILED_FILE, JSON.stringify(f, null, 2));
}

// ---------------------------------------------------------------------------
// Single-page placement
// ---------------------------------------------------------------------------

async function placePage(
  token: string,
  boardId: string,
  page: DiscoveredPage,
  position: GridPosition,
  batch: number,
): Promise<CheckpointEntry> {
  // 1. Create the outer frame (the "card").
  const frameId = await createFrame(token, boardId, {
    data: { type: 'frame', title: page.name },
    style: { fillColor: '#ffffff', fillOpacity: '1.0' },
    position: { origin: 'center', x: position.x, y: position.y },
    geometry: { width: FRAME_WIDTH, height: FRAME_HEIGHT },
  });

  // Image area occupies the top portion of the frame.
  const imageWidth = FRAME_WIDTH - 80;
  const imageHeight = FRAME_HEIGHT - 260;
  const imageLocalX = position.x;
  const imageLocalY = position.y - (FRAME_HEIGHT / 2 - imageHeight / 2 - 40);

  // 2. Place the screenshot or a placeholder shape.
  if (page.screenshotPath && existsSync(page.screenshotPath)) {
    try {
      await createImageFromFile(
        token,
        boardId,
        page.screenshotPath,
        { x: imageLocalX, y: imageLocalY },
        { width: imageWidth, height: imageHeight },
      );
    } catch (err) {
      // If the image upload fails, fall back to a placeholder shape.
      await createShape(token, boardId, {
        data: { type: 'shape', shape: 'rectangle', content: 'Screenshot missing' },
        style: { fillColor: '#f5f5f5', fillOpacity: '1.0', borderColor: '#cccccc', borderWidth: '1.0' },
        position: { origin: 'center', x: imageLocalX, y: imageLocalY },
        geometry: { width: imageWidth, height: imageHeight },
      }).catch(() => {});
    }
  } else {
    await createShape(token, boardId, {
      data: { type: 'shape', shape: 'rectangle', content: 'No screenshot available' },
      style: { fillColor: '#f5f5f5', fillOpacity: '1.0', borderColor: '#cccccc', borderWidth: '1.0' },
      position: { origin: 'center', x: imageLocalX, y: imageLocalY },
      geometry: { width: imageWidth, height: imageHeight },
    }).catch(() => {});
  }

  // 3. Page name label (bold, centered, below the image).
  const labelY = position.y + (FRAME_HEIGHT / 2 - 120);
  await createText(token, boardId, {
    data: { content: `<b>${escapeHtml(page.name)}</b>`, textAlign: 'center' },
    style: { fontSize: '24', color: '#1a1a1a', textAlign: 'center', fontFamily: 'arial' },
    position: { origin: 'center', x: position.x, y: labelY },
    geometry: { width: FRAME_WIDTH - 80, height: 40 },
  }).catch(() => {});

  // 4. Route subtitle (smaller, gray).
  const subtitleY = labelY + 50;
  await createText(token, boardId, {
    data: { content: escapeHtml(page.route), textAlign: 'center' },
    style: { fontSize: '16', color: '#888888', textAlign: 'center', fontFamily: 'arial' },
    position: { origin: 'center', x: position.x, y: subtitleY },
    geometry: { width: FRAME_WIDTH - 80, height: 30 },
  }).catch(() => {});

  return {
    pageId: page.id,
    pageName: page.name,
    miroItemId: frameId,
    x: position.x,
    y: position.y,
    timestamp: new Date().toISOString(),
    batch,
  };
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// ---------------------------------------------------------------------------
// Resume logic
// ---------------------------------------------------------------------------

async function resumeFromCheckpoint(flags: CliFlags): Promise<void> {
  const token = resolveToken();
  const boardId = resolveBoardId();

  const existing = loadCheckpoint(boardId);
  if (!existing || existing.entries.length === 0) {
    console.log('No checkpoint found. Starting a fresh transfer.');
    return runFullTransfer(flags);
  }

  console.log(`\nFound checkpoint with ${existing.entries.length} completed page(s).`);
  console.log('Last completed pages:');
  for (const e of existing.entries.slice(-5)) {
    console.log(`  • ${e.pageName} (batch ${e.batch})`);
  }

  const answer = await promptUser(
    `\nResume from the last successful page (${existing.entries.length} done) and continue? [Y/n] `,
  );
  if (answer.trim().toLowerCase().startsWith('n')) {
    console.log('Starting a fresh transfer instead.');
    return runFullTransfer(flags);
  }

  const allPages = discoverPages();
  const completedIds = new Set(existing.entries.map((e) => e.pageId));
  const remaining = allPages.filter((p) => !completedIds.has(p.id));

  if (remaining.length === 0) {
    console.log('\n✅ All pages are already on the board. Nothing to resume.');
    printManualConnectionWorkflow(allPages, existing.entries);
    if (flags.autoConnect) await autoConnect(token, boardId, allPages, existing.entries);
    return;
  }

  console.log(`\nResuming: ${remaining.length} page(s) remaining.\n`);
  const grid = computeGrid(allPages);
  await processBatches(token, boardId, remaining, grid, existing, flags, allPages);
}

// ---------------------------------------------------------------------------
// Full transfer
// ---------------------------------------------------------------------------

async function runFullTransfer(flags: CliFlags): Promise<void> {
  const token = resolveToken();
  const boardId = resolveBoardId();

  const pages = discoverPages();
  if (pages.length === 0) {
    console.log('No Astro pages found under apps/web/src/pages.');
    return;
  }

  console.log(`\nDiscovered ${pages.length} page(s).`);
  console.log(`Board: ${boardId}`);
  console.log(`Batch size: ${flags.batchSize}\n`);

  const grid = computeGrid(pages);
  const checkpoint: CheckpointFile = { boardId, lastUpdated: new Date().toISOString(), entries: [] };
  saveCheckpoint(checkpoint);

  await processBatches(token, boardId, pages, grid, checkpoint, flags, pages);
}

// ---------------------------------------------------------------------------
// Batch processing
// ---------------------------------------------------------------------------

async function processBatches(
  token: string,
  boardId: string,
  pages: DiscoveredPage[],
  grid: Map<string, GridPosition>,
  checkpoint: CheckpointFile,
  flags: CliFlags,
  allPages: DiscoveredPage[],
): Promise<void> {
  const failed = loadFailed(boardId);
  // Reset failed list for a fresh pass over the current run.
  failed.entries = [];

  let succeeded = checkpoint.entries.length;
  let attempted = 0;
  let batchNumber = Math.floor(succeeded / flags.batchSize) + 1;

  for (let i = 0; i < pages.length; i += flags.batchSize) {
    const batch = pages.slice(i, i + flags.batchSize);
    console.log(`\n── Batch ${batchNumber} (${batch.length} page(s)) ────────────────`);

    for (const page of batch) {
      attempted++;
      const pos = grid.get(page.id) ?? { x: 0, y: 0 };
      try {
        process.stdout.write(`  Placing "${page.name}" … `);
        const entry = await placePage(token, boardId, page, pos, batchNumber);
        checkpoint.entries.push(entry);
        saveCheckpoint(checkpoint);
        succeeded++;
        console.log('done');
      } catch (err: any) {
        const msg = err?.message ?? String(err);
        console.log('FAILED');
        console.log(`    ↳ ${msg}`);
        failed.entries.push({
          pageId: page.id,
          pageName: page.name,
          route: page.route,
          error: msg,
          timestamp: new Date().toISOString(),
        });
      }
    }

    saveFailed(failed);
    batchNumber++;

    // Delay between batches (not after the last one).
    if (i + flags.batchSize < pages.length) {
      console.log(`  … pausing ${BATCH_DELAY_MS}ms before next batch …`);
      await sleep(BATCH_DELAY_MS);
    }
  }

  // ── Summary ────────────────────────────────────────────────────────────
  const failedCount = failed.entries.length;
  const totalAttempted = attempted;
  console.log('\n─────────────────────────────────────────────────────────────');
  console.log('✅ Miro Board Transfer Complete');
  console.log(`Total Pages: ${allPages.length}`);
  console.log(`Succeeded: ${succeeded}`);
  console.log(`Failed: ${failedCount}`);
  if (failedCount > 0) {
    console.log(`Failed Pages: [${failed.entries.map((f) => `'${f.pageId}'`).join(', ')}]`);
    console.log(`Failed details saved to: ${relative(PROJECT_ROOT, FAILED_FILE)}`);
  }
  console.log(`Checkpoint saved to: ${relative(PROJECT_ROOT, CHECKPOINT_FILE)}`);
  console.log(`Resume command: tsx scripts/create-miro-board.ts --resume`);
  console.log('─────────────────────────────────────────────────────────────\n');

  // ── Connection workflow ────────────────────────────────────────────────
  printManualConnectionWorkflow(allPages, checkpoint.entries);
  if (flags.autoConnect) {
    await autoConnect(token, boardId, allPages, checkpoint.entries);
  }
}

// ---------------------------------------------------------------------------
// Connection workflow (manual guidance + optional auto-connect)
// ---------------------------------------------------------------------------

function printManualConnectionWorkflow(pages: DiscoveredPage[], entries: CheckpointEntry[]): void {
  const routeToPage = new Map<string, DiscoveredPage>();
  for (const p of pages) routeToPage.set(p.route, p);

  const suggestions: { from: DiscoveredPage; to: DiscoveredPage }[] = [];
  const seen = new Set<string>();
  for (const p of pages) {
    for (const link of p.links) {
      const target = routeToPage.get(link);
      if (!target || target.id === p.id) continue;
      const key = `${p.id}->${target.id}`;
      if (seen.has(key)) continue;
      seen.add(key);
      suggestions.push({ from: p, to: target });
    }
  }

  console.log('─────────────────────────────────────────────────────────────');
  console.log('Suggested page-to-page connections (draw connectors in Miro):');
  console.log('─────────────────────────────────────────────────────────────');
  if (suggestions.length === 0) {
    console.log('  (no internal links detected between discovered pages)');
  } else {
    for (const s of suggestions) {
      console.log(`  [${s.from.name}] → [${s.to.name}]`);
    }
  }
  console.log('\nTo draw a connector in Miro:');
  console.log('  1. Select the connector tool (keyboard shortcut: C).');
  console.log('  2. Click the edge of the source frame, then drag to the target frame.');
  console.log('  3. Repeat for each suggested connection above.\n');

  if (entries.length > 0) {
    console.log(`Tip: re-run with --auto-connect to let the script draw these ${suggestions.length} connector(s) for you.`);
  }
  console.log('─────────────────────────────────────────────────────────────\n');
}

async function autoConnect(
  token: string,
  boardId: string,
  pages: DiscoveredPage[],
  entries: CheckpointEntry[],
): Promise<void> {
  const routeToPage = new Map<string, DiscoveredPage>();
  for (const p of pages) routeToPage.set(p.route, p);
  const idToEntry = new Map(entries.map((e) => [e.pageId, e]));

  const suggestions: { from: DiscoveredPage; to: DiscoveredPage }[] = [];
  const seen = new Set<string>();
  for (const p of pages) {
    for (const link of p.links) {
      const target = routeToPage.get(link);
      if (!target || target.id === p.id) continue;
      const key = `${p.id}->${target.id}`;
      if (seen.has(key)) continue;
      seen.add(key);
      suggestions.push({ from: p, to: target });
    }
  }

  console.log(`\nAuto-connecting ${suggestions.length} page relationship(s) …`);
  let ok = 0;
  let fail = 0;
  for (const s of suggestions) {
    const fromEntry = idToEntry.get(s.from.id);
    const toEntry = idToEntry.get(s.to.id);
    if (!fromEntry || !toEntry) {
      console.log(`  ✗ [${s.from.name}] → [${s.to.name}]  (one or both frames missing on board)`);
      fail++;
      continue;
    }
    try {
      await createConnector(token, boardId, fromEntry.miroItemId, toEntry.miroItemId);
      console.log(`  ✓ [${s.from.name}] → [${s.to.name}]`);
      ok++;
    } catch (err: any) {
      console.log(`  ✗ [${s.from.name}] → [${s.to.name}]  ${err?.message ?? err}`);
      fail++;
    }
  }
  console.log(`\nConnectors drawn: ${ok} succeeded, ${fail} failed.\n`);
}

// ---------------------------------------------------------------------------
// Misc utilities
// ---------------------------------------------------------------------------

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

function promptUser(question: string): Promise<string> {
  return new Promise((resolve) => {
    process.stdout.write(question);
    let answer = '';
    process.stdin.setEncoding('utf8');
    process.stdin.resume();
    process.stdin.on('data', (data) => {
      answer = String(data);
      process.stdin.pause();
      resolve(answer);
    });
  });
}

// ---------------------------------------------------------------------------
// Entry point
// ---------------------------------------------------------------------------

async function main(): Promise<void> {
  const flags = parseArgs(process.argv);

  if (flags.resume) {
    await resumeFromCheckpoint(flags);
  } else {
    await runFullTransfer(flags);
  }
}

main().catch((err) => {
  console.error('\n✖ Fatal error:', err?.message ?? err);
  process.exit(1);
});

export { resumeFromCheckpoint, runFullTransfer };
