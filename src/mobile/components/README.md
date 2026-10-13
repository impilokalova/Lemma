# mobile components

There is no separate rendered hero component here anymore. The active homepage hero is `src/hero/PlanetHero.tsx` and `src/hero/hero.css`, with responsive rules for mobile. Use this folder for genuinely device-specific future components; reuse shared components from `src/shared/components/` to avoid drift. Navigation destinations are maintained in `src/shared/navigation/links.ts`.
