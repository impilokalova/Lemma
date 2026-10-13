# Lemma Signature — Six standalone landing pages

Original user-uploaded campaign artwork is reused from the repository's existing image blobs. Styling lives in `shared/style.css`, minimal motion in `shared/script.js`. Gallery: `/landing-pages/`; six concept pages at `/landing-pages/<slug>/`. Existing React `/work/demos` cards now link to these static pages. This pack is hosted by Cloudflare Pages because it lives under `public/`, not `src/`.

**Note:** originals are PNG, so the page payload is larger than the optimized WebP ZIP. Replace with optimized WebP later if desired. Source Figma concepts remain untouched. Examples are fictitious, no purchases or live offers. The `noindex` flag is intentional.

## Audited URL conventions
The public index at `/landing-pages/` is an optional standalone catalogue.
The React app lists demos at `/work/demos` and its legacy slug paths
redirect to `/landing-pages/<slug>/`. The canonical HTML pages live under
`public/landing-pages/<slug>/index.html`.

Artwork is currently served as original PNG. The gallery filenames must use
the actual names in `shared/assets/`, not conceptual slug names. Convert to
WebP/AVIF before public launch when an image-upload path is available; do not
remove the PNG assets until replacement URLs are verified.
