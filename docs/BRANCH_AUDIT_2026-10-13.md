# Lemma branch review — 13 October 2026

Branch: `feat/navigation-foundation-ultraviolet`. Production `main` is not modified.

## Completed fixes
- Six seasonal demo HTML pages are located under `public/landing-pages/<slug>/index.html`, with shared CSS, JavaScript and branded campaign assets.
- Gallery image URLs repaired and checked for every one of the six concepts.
- React `/work/demos/:slug` redirects to the matching standalone page.
- The empty case-studies listing was replaced with links to three original Lemma concept artworks, accurately labelled as concepts.
- Retired unreferenced desktop/mobile/tablet hero components, obsolete Three.js runtime and stale JSX/CSS duplicates while retaining the active `src/hero/PlanetHero.tsx`.
- CI script `npm run check:site` verifies asset paths, seven standalone HTML documents, and known React routes.
- `npm run build` automatically transforms the six public seasonal artworks from the user-provided source PNGs to 840px WebP at quality 82 using `sharp`. Original source files are preserved in `src/pages/packages/`; duplicate public PNGs removed.
- Live browser fetch verified the `/landing-pages/` index, all six landing pages, `/work/demos`, `/work/projects`, and `/contact` on preview.
- Main routes and site header preserved. No Figma modifications.

## Remaining launch blockers / not falsely marked done
1. Contact page has no verified, functional form or published email/WhatsApp endpoint. Need an authorized address or business destination before wiring a real lead route.
2. Production SEO requires deliberate indexing decision and crawler-visible metadata (current metadata is mostly client-side and the default index contains noindex). Review production publication separately.
3. Long term: reduce original 12 gallery PNG payloads or build an optimized-source pipeline for all 12.
4. Page-specific visual screenshots, end-to-end form submission, and production custom-domain checks are not verified by the GitHub build itself.
5. All six seasonal designs are fictional showcase concepts and not commercial offers.

## Verify
- GitHub Actions: run tests, build, and `npm run check:site`.
- Cloudflare Pages: verify latest commit deployed and inspect actual `/landing-pages/`, `/work/demos`, `/work/projects`, `/contact`.
- Confirm artwork links resolve on a real browser; the browser screenshot and layout should be reviewed on mobile/tablet/desktop.

## Developer edit points
- Homepage: `src/hero/PlanetHero.tsx`, `src/hero/hero.css`.
- Landing pages: `public/landing-pages/` (standalone HTML), `scripts/optimize-images.mjs`.
- Portfolio galleries: `src/pages/work/gallery/`, `src/{mobile,tablet,desktop}/styles/gallery.css`.
- Route registry: `src/site.tsx`, `src/shared/navigation/links.ts`.
- SEO: `src/shared/seo/SeoHead.tsx`.

## Final cleanup refinement
The last 9.5 KB of obsolete WebGL/galaxy CSS was pruned from the shared stylesheet after confirming the active responsive homepage uses `studio-hero` in `src/hero/hero.css`. The unused Three.js and its typings were removed from dependencies, reducing build/download work. The original mobile hero image now lives only under `src/mobile/assets/`.
