# Foyez Ullah Kabir, SQA Engineer Portfolio

A single-page portfolio for an ISTQB-CTFL certified SQA Engineer, covering test
automation, API testing, and AI-assisted QA pipelines.

Built with React 18, TypeScript, Vite 6 and Tailwind CSS 4. Originally scaffolded
from a Figma Make export (see `ATTRIBUTIONS.md`) and rewritten since.

---

## Getting started

Requires Node 20 or newer.

```bash
npm install      # install dependencies
npm run dev      # dev server on http://localhost:5173
npm run build    # production build into dist/
npx vite preview # serve the production build locally
```

Only `dev` and `build` are defined as scripts. `preview` runs through `npx`.

---

## Project structure

```
index.html                  entry point, font preconnects, dark class on <html>
public/
  Foyez-...-CV.pdf          served resume, linked by the hero button
  certificates/             certificate images for the credentials section
src/
  main.tsx                  React root
  styles/
    index.css               entry stylesheet, imports the other three
    fonts.css               Montserrat import
    theme.css               design tokens, status palette, base typography
    tailwind.css            Tailwind source config
  app/
    App.tsx                 section composition and order
    data/profile.ts         name, role, contact, resume path
    components/             the 13 section and effect components
    components/ui/          48 shadcn/ui primitives
```

### Page sections, in order

`Header` · `Hero` · `AutomationFirst` · `EngineeringCapabilities` ·
`WhatIBring` · `Projects` · `Certifications` · `Experience` · `QAWithAI` ·
`Contact`

Section order lives in `src/app/App.tsx`.

---

## Editing content

Most content is data, not markup. Look for the array at the top of a component
rather than editing JSX.

| What | Where |
| ---- | ----- |
| Name, role, email, resume path, social URLs | `src/app/data/profile.ts` |
| Hero badge and tech chips | `profile.ts` and `Hero.tsx` |
| Capability cards | `WhatIBring.tsx` |
| Radar axes and scores | `EngineeringCapabilities.tsx` |
| Project cards | `Projects.tsx` |
| Certificates | `Certifications.tsx` |
| Roles and dates | `Experience.tsx` |

### profile.ts and optional fields

Several fields are intentionally optional and the UI checks them before
rendering. An empty string means the related control is **not rendered at all**,
rather than rendered and broken:

```ts
linkedinUrl: ""   // LinkedIn button hidden
githubUrl: ""     // GitHub button hidden
resumeUrl: ""     // Download Resume button hidden
```

The same pattern applies to `url` on a project card and `credentialUrl` on a
certificate.

### Adding certificate images

1. Put the PNG in `public/certificates/`.
2. Set the `image` path on the matching entry in `Certifications.tsx`:

```ts
image: "/certificates/istqb-ctfl.png",
```

The card then shows a thumbnail and becomes clickable, opening the certificate
full size in a dialog. Without an image it shows an icon and is deliberately not
clickable. Card dimensions are identical either way.

---

## Design system

**Typeface.** Montserrat only, set once via `--font-sans` in `theme.css`. There
is no second family anywhere, including monospace. Use `tabular-nums` where
digits need to align.

**Colour.** Semantic tokens in `theme.css`. Status colours are a fixed,
validated set (`--status-good`, `--status-critical`, `--status-running`,
`--status-warning`) checked for contrast against the dark surface. Because
`good` and `critical` are close to indistinguishable under deuteranopia, every
status pairs a colour with **both** an icon and a word, so meaning survives with
colour stripped.

**Layout.** Section backgrounds run edge to edge; content is capped by an inner
`max-w-*` container per section. Never wrap the page in a max-width, since it
clips those backgrounds and leaves dead gutters on wide screens.

**Motion.** `prefers-reduced-motion` is honoured throughout. Animation is
`transform` and `opacity` only. Looping animations pause when off-screen or when
the tab is hidden, and replay from the start on return.

**Responsive.** Verified at 390, 800, 1280 and 1920px. Zero horizontal overflow
is a hard requirement.

---

## Project rules

`CLAUDE.md` holds the engineering rules for this repo: typography, card parity,
responsive gates, colour, motion, accessibility, and verification standards. It
is loaded automatically by Claude Code and is worth reading before making
changes by hand.

Two rules worth knowing up front:

- **Card parity.** Cards in the same grid have identical width and height
  whatever their content. Media slots are fixed-aspect so an image and an icon
  occupy the same space, and wrapping titles reserve their taller case.
- **Nothing invented.** Every claim on the site traces to a real source. No
  fabricated metrics, no placeholder numbers dressed up as data.

---

## Deployment

Static build, deployable to any static host.

```bash
npm run build   # outputs dist/
```

Everything in `public/` is copied to the root of `dist/`, which is why the
resume resolves at `/Foyez-Ullah-Kabir-SQA-Engineer-CV.pdf`.

**Note for when client-side routes are added.** The site is currently a single
page with anchor navigation. A future `/projects` route will need an SPA
fallback rewrite on the host, or the page will 404 on refresh and on shared
links even though in-app navigation works. On Vercel that is a `vercel.json`
rewrite of all paths to `/index.html`.

---

## Attribution

Scaffolded from a Figma Make community template. See `ATTRIBUTIONS.md`.
