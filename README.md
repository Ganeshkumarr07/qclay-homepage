# MONTE Dubai Real Estate — Screens 1 & 2

React + Vite recreation of the first two screens from the supplied MONTE reference video.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Build

```bash
npm run build
```

## Screen 2 original video

The original 38-second promotional video was not supplied. Screen 2 therefore uses a temporary poster cropped from the user's Screen 2 screenshot at:

`public/media/screen-2-poster.jpg`

To use the original video, place the video file at this exact path:

`public/media/monte-dubai-video.mp4`

The component will attempt to play it muted, looped, and inline. If the file is absent or cannot load, the poster remains visible and the page labels it as a placeholder. The financing marquee is HTML/CSS text, not baked into the video, so it can be adjusted independently in `src/App.jsx`.

## Screen 1 assets

The exact original MONTE logo and hero photograph were not supplied. Screen 1 preserves the previous implementation and continues to use a text-based MONTE logo plus the existing Burj Al Arab photograph URL. Replace those assets with the original SVG/PNG and image when available.

## Notes

- Screen 1 remains the first full-viewport section.
- Screen 2 follows below it and is reached by normal page scrolling.
- The marquee respects `prefers-reduced-motion` and stops animating when reduced motion is requested.
- The original video, if added, exposes native video controls after it becomes playable.


## Screen 3 — Property Portfolio

The portfolio section follows the video section and includes the dark rounded panel, category pills, two-column property cards and the Dubai map card. The four image assets in `public/media/portfolio-*.jpg` are crops from the supplied reference screenshots, used to preserve the visible imagery while building the layout. Replace them with original full-resolution property images/map artwork when available.


## Screen 5 — About / company statistics

Added the About and statistics section after the property portfolio. The architecture visual and team strip are crops from the user's supplied Screen 5 reference screenshot, used as temporary local placeholders. Replace:
- `public/media/screen-5-architecture-reference.jpg` with the original full-resolution architectural image.
- `public/media/screen-5-team-reference.jpg` with the original team portrait strip or individual headshots.

The third property statistic is intentionally shown as an em dash because its number is obscured in the reference screenshot. Edit the third `.statistic-row` in `src/App.jsx` when the correct value is known. The visible 43+ and 42% values are retained as shown in the reference.
