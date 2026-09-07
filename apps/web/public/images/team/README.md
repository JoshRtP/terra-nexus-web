# Team headshots

Drop each person's photo at `public/images/team/<slug>/photo.jpg`
(`.png`/`.webp` also work — see below). The About page's Executive Profile
Roster (`src/pages/about/index.astro` → `ProfileRoster.astro`) already
points at these paths:

- `laura-klein/photo.jpg` (+ `photo-original.jpg`, the untouched source —
  not referenced anywhere, kept in case a higher-res crop is needed later)
- `josh-mellinger/photo.jpg` (+ `photo-original.jpg`, same as above)
- `isaac/photo.jpg`
- `expert-network/logo.png` — the Expert Network tile's mark, not a
  headshot; rendered with `object-fit: contain` (see the
  `.roster-portrait-network .roster-photo` override in
  `ProfileRoster.astro`) so it never gets cropped to the 3:4 headshot box.

Large source photos (Laura's and Josh's originals were ~2100–2450px wide,
~900KB–950KB each) get downsampled offline to ~900px wide with a
high-quality Lanczos3 resize before being committed as `photo.jpg` —
leaving that reduction to the browser's live/runtime scaling produced
visible graininess around fine detail (hair, etc.) that an offline resize
avoids, and it cuts page weight substantially. Isaac's source is already
smaller than its display size, so it's used as-is (upscaling would only
hurt quality).

**Format guidance:**

- Portrait orientation, ~3:4 aspect ratio (matches the roster tile's
  `aspect-ratio: 3 / 4`) — a square or landscape photo will get cropped to
  fit via `object-fit: cover`, so keep the face roughly centered.
- At least 800px on the long edge; JPG/WebP for photos (PNG is fine too,
  just larger).
- If you use a different extension (`.png`, `.webp`), update the `photo:`
  path for that person in `src/pages/about/index.astro` to match — the
  path is a literal file path, not resolved by extension-guessing.

Until a file exists at the expected path, the roster tile falls back
cleanly to the existing initials placeholder (LK / JM / I) — nothing
breaks, so these can land one at a time.
