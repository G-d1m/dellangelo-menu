# Dell'Angelo — online menu (desktop + tablet)

Vite + React. No other libraries.

## Run it

```bash
npm install
npm run dev
```

Open the address Vite prints (usually http://localhost:5173).

- Add `?skip` to the URL to jump straight to the menu: `http://localhost:5173/?skip`
- During the intro, a click / tap / any key also skips it.

Build for hosting: `npm run build` → upload the `dist/` folder.

## Where things are

| What | File |
|---|---|
| Dishes, prices, descriptions | `src/menuData.js` |
| Every animation timing (ms) | `src/timeline.js` |
| Colours & fonts | `src/styles/base.css` (`--red`, `--cream`, …) |
| Intro (logo, tagline, zoom) | `src/components/Intro.jsx`, `src/styles/intro.css` |
| Menu layout & positions | `src/components/Menu.jsx`, `src/styles/menu.css` |
| Animation keyframes | `src/styles/animations.css` |
| Images | `public/img/` |

## Colours

- Red `#E2725B` — the two options are almost identical; this one is a touch warmer.
- Cream `#FFF9DD` — warmer than `#FFFBE0`, sits softer next to the terracotta.

## Fonts

All fonts come from npm (@fontsource) and are bundled with the site — nothing loads from Google Fonts.

- Intro tagline: Bodoni Moda
- Headings / dish names: Commissioner
- Descriptions: Didact Gothic

## Layout

The menu is drawn on two 720 × 977 "pages" (the proportions of the printed menu)
and scaled as a whole, so every element keeps its size relative to the picture.

- **≥ 1180 px wide** — both pages side by side, fitted to the screen.
- **Tablets / narrower** — pages stacked; page two animates when you scroll to it.

The red square uses `public/img/square-red.png`. To use the original brown
texture instead, change the `src` in `Menu.jsx` to `/img/square-brown.png`.
