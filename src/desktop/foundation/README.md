# desktop layout foundation

The active responsive homepage hero is implemented once at `src/hero/PlanetHero.tsx`, and its breakpoints are defined in `src/hero/hero.css`. This prevents visual duplication.

The desktop image is stored under `public/desktop/assets/`.

Breakpoints: mobile under 600px; tablet 600–1023px; desktop 1024px and up. Device-specific work/gallery overrides still live under each device's `styles/gallery.css`.
