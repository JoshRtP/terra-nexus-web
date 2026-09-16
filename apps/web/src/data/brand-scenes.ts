/**
 * The brand's generated night-sky scenes, and where each one is used.
 *
 * Chosen by the owner 2026-09-16 after comparing all five in the band at
 * /design-lab/coming-soon/: `group-bright` on /case-studies, `man` on
 * /insights/research, `woman` on the 404. The lab still renders every scene,
 * so swapping one is a one-word change at the call site.
 *
 * Sources are the brand pack's generated character scenes
 * (`Terra Nexus Design System - Development/_brand-pack/reference/
 * brand-character-generated/`), converted to WebP at two widths so the band is
 * not upscaling a small file on a wide display. All five are 1672x941.
 * Adding another is one entry here plus the converted pair of files.
 */
export interface BrandScene {
  id: string;
  /** Shown in the design lab's option strip, not on the live pages. */
  name: string;
  /** File base under /images/photography/, without the `-<width>w.webp`. */
  base: string;
  width: number;
  height: number;
  /** Vertical crop anchor. The band is far wider than the 16:9 frame, so
   * `cover` always crops vertically, and each scene puts its subject and its
   * stretch of Milky Way at a different height. */
  objectPosition: string;
  /** Scrim strength. The navy scrim exists to keep reversed copy legible, but
   * these scenes are graded very differently: 'standard' suits a bright frame,
   * 'light' an already-dark one that the standard scrim flattens to a navy
   * rectangle. */
  scrim?: 'standard' | 'light';
}

// Crop anchors were chosen from a 40/55/70% sweep of every scene in the band
// at 1440px, not guessed: artifacts/qa/band-anchor-sweep.png.
export const brandScenes: BrandScene[] = [
  {
    id: 'group-bright',
    name: 'Five at the overlook · bright',
    base: 'scene-group-five-bright',
    width: 1672,
    height: 941,
    objectPosition: 'center 68%',
  },
  {
    id: 'group-dark',
    name: 'Five at the overlook · dark',
    base: 'scene-group-five-dark',
    width: 1672,
    height: 941,
    // Same composition as the bright grade, so the same anchor.
    objectPosition: 'center 68%',
    // Already near-black; the standard scrim erased it entirely.
    scrim: 'light',
  },
  {
    id: 'group-dusk',
    name: 'Five at the overlook · dusk',
    base: 'scene-group-five-dusk',
    width: 1672,
    height: 941,
    // Heads sit higher in this frame and the Milky Way runs down the centre,
    // so a higher anchor keeps both.
    objectPosition: 'center 55%',
  },
  {
    id: 'man',
    name: 'Seated stargazer · man',
    base: 'scene-man-stargazing',
    width: 1672,
    height: 941,
    objectPosition: 'center 55%',
  },
  {
    id: 'woman',
    name: 'Seated stargazer · woman',
    base: 'scene-woman-stargazing',
    width: 1672,
    height: 941,
    // Subject left of centre with the Milky Way high on the right; anchoring
    // near the middle is the only crop that holds both.
    objectPosition: 'center 55%',
  },
];

export const DEFAULT_BRAND_SCENE = 'group-bright';

export function brandScene(id: string): BrandScene {
  const found = brandScenes.find((p) => p.id === id);
  if (!found) throw new Error(`No brand scene registered with id '${id}'`);
  return found;
}

/** `src`/`srcset` for a full-bleed use of a scene. `sizes` is always 100vw at
 * every call site so far, so it is left to the caller. */
export function brandSceneImage(id: string): { src: string; srcset: string; width: number; height: number } {
  const scene = brandScene(id);
  const url = (w: number) => `/images/photography/${scene.base}-${w}w.webp`;
  return {
    src: url(scene.width),
    srcset: [1100, scene.width].map((w) => `${url(w)} ${w}w`).join(', '),
    width: scene.width,
    height: scene.height,
  };
}
