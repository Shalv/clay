# Coreenact — editorial redesign (React source)

This is the restyled React/TypeScript source for coreenact.com, rebuilt in the
visual language of the Squarespace *Design Intelligence* page: a single light,
editorial theme — near-black hero, oversized tracked display type, generous
whitespace, hairline rules — with colour carried only by the Coreenact mark and
the Microsoft product logos.

All site content, data, routes, the enquiry/mail pipeline, the live-chat widget,
the ROI estimator and the add-on catalogue are unchanged.

## What changed

| File | Change |
| --- | --- |
| `index.html` | Archivo replaces Poppins; the dark-mode boot script is removed. |
| `src/index.css` | **Rewritten.** New design system (tokens, base typography, `cx-*` component classes) plus a "bridge" layer that re-skins the legacy Tailwind palette to the editorial system app-wide. |
| `src/components/Navbar.tsx` | **Rewritten.** One solid paper bar that floats transparent over the dark home hero; no utility strip, no theme switcher, no gradient pill nav. |
| `src/components/Footer.tsx` | **Rewritten.** Editorial footer: brand, three link columns, offices, legal bar. |
| `src/components/Hero.tsx` | **Rewritten.** Typographic editorial hero (the interactive blueprint simulator is retired). |
| `src/App.tsx` | Home composition: the six gradient portal cards are replaced with the editorial numbered solution-pillar list; the `<main>` wrapper is de-themed. |
| `src/context/ThemeContext.tsx` | Mode locked to `light` (single-theme design); the context API is unchanged so consumers still compile. |
| `public/coreenact-logo-light.png`, `public/coreenact-logo-dark.png` | Added — light-on-dark and dark-on-light logo variants for the nav/hero/footer. |

## Design tokens

```
ink      #0a0a0a     paper    #ffffff     cream    #f3f0ea
cream-2  #eae5db     line     #e2ddd2     muted    #6c6a65
```

Type: **Archivo** (400/500/600/700) for both display and body. Radii collapse to
2px, shadows are removed, and the legacy blue/indigo/emerald/rose accents resolve
to ink or muted — see the `BRIDGE` block at the end of `src/index.css`.

## Run it

```
npm install
npm run dev      # tsx server.ts
npm run build    # vite build + esbuild server bundle
npm run lint     # tsc --noEmit
```

`npm run lint` passes cleanly on this source.

## Notes / follow-ups

- The bridge layer restyles every page that still uses the old Tailwind palette,
  so inner pages inherit the new look without being rewritten. Individual pages
  can be migrated to the `cx-*` component classes over time.
- The interactive hero simulator and the theme toggle were dropped in favour of
  the single-theme editorial direction. If either is wanted back, say so.
- The full `vite build` was not run here (the sandbox has a 2 GB memory cap that
  Tailwind's WASM compiler exceeds). Run `npm run build` locally to produce the
  production bundle.
