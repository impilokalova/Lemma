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

The active homepage uses `src/hero/PlanetHero.tsx` with `src/hero/hero.css`, not the earlier per-device Three.js experiments. The six signature concepts live under `public/landing-pages/`, with an index in `src/pages/work/demos/SeasonalDemos.tsx`. The contact page currently has no verified enquiry destination and MUST NOT be described as a working submission endpoint. Portfolio case-study placeholders are also pending verified material.

## Preview workflow

The first Cloudflare production attempt on `main` cannot build because `main` has no website yet. Preview this feature branch before merging. A successful preview must be verified in Cloudflare deployments.
