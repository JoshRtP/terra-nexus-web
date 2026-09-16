// The comparison set the lab strip switches between: the two non-photo
// treatments plus one entry per registered scene. Derived from
// src/data/brand-scenes.ts so adding a photograph adds a route.
import { brandScenes, DEFAULT_BRAND_SCENE } from '../../../data/brand-scenes';

export interface LabOption {
  id: string;
  name: string;
  treatment: 'plain' | 'watermark' | 'photo';
  photo?: string;
  note: string;
}

export const labOptions: LabOption[] = [
  {
    id: 'plain',
    name: 'Plain',
    treatment: 'plain',
    note: 'What the live pages ship today: no photograph, the band carries only the eyebrow and the heading. The baseline the others have to beat.',
  },
  {
    id: 'watermark',
    name: 'Watermark',
    treatment: 'watermark',
    photo: DEFAULT_BRAND_SCENE,
    note: 'The photograph greyscaled to 22% behind the page\u2019s own white ground, feathered top and bottom so there is no seam. Navy copy unchanged. Reads as texture rather than as a picture.',
  },
  ...brandScenes.map((image): LabOption => ({
    id: image.id,
    name: image.name,
    treatment: 'photo',
    photo: image.id,
    note: `${image.name} \u2014 full-bleed under a navy scrim with the copy reversed out, the same treatment as the expertise media heroes but kept to a short band. The band is far wider than the frame, so the crop is anchored at ${image.objectPosition.replace('center ', '')} to hold both the subject and its stretch of Milky Way.`,
  })),
];

export const DEFAULT_LAB_OPTION = DEFAULT_BRAND_SCENE;

export function labOption(id: string): LabOption {
  const found = labOptions.find((o) => o.id === id);
  if (!found) throw new Error(`No coming-soon lab option '${id}'`);
  return found;
}
