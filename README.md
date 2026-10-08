# Lemma Studio — navigation-first foundation

Six primary pages: Home, Services, Work, Packages, About, Contact. Templates, posters, flyers and live website demos live under **Work**. No client work or Canva designs are invented; add approved samples to `src/routes.ts` and media assets when supplied.

## Run

```sh
npm install
npm run dev
npm run build
npm run test
```

Cloudflare Pages: build command `npm run build`, output `dist`. The `public/_redirects` file enables SPA deep links. Deploy previews from this branch; do not merge or publish production before review.

This milestone contains responsive navigation, route skeletons, a typed content registry and Ultraviolet design tokens. The 3D hero, real contact form handler, client imagery, pricing and Canva assets are intentionally not included yet.
