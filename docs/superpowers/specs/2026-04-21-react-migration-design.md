# React Migration Design
**Date:** 2026-04-21  
**Project:** Portfolio 2 — Día de Muertos  
**Goal:** Migrate from CDN React + Babel standalone to a proper Next.js project with real ES module imports/exports.

---

## Background

The portfolio currently runs as static HTML + React 18 via CDN + Babel standalone. Components share state through `Object.assign(window, {...})` globals instead of ES module imports. There is no build step.

The migration goal is a cleaner file structure with real imports/exports, routing readiness for future case study pages, and open deployment options (Vercel recommended).

---

## Architecture

- **Framework:** Next.js 14, App Router, JavaScript (no TypeScript — keeping parity with current codebase)
- **Language:** Plain JS/JSX throughout
- **Deployment target:** Vercel (zero-config for Next.js)
- **Routing:** Home page at `/`, future case study pages at `/projects/[slug]`
- **Client components:** Most components carry `'use client'` — expected for an interactive portfolio

The main architectural shift: every `Object.assign(window, {...})` becomes named ES module exports; every `window.COPY` / `window.PP` read becomes an `import`.

---

## File Structure

```
app/
├── layout.js              # Root layout: fonts (next/font/google), global CSS, metadata
├── page.js                # Home page — App() component with all state + section tree
└── projects/
    └── [slug]/
        └── page.js        # Case study pages (stubbed now, built later)

components/
├── sections/
│   ├── Loader.jsx
│   ├── Nav.jsx
│   ├── Hero.jsx
│   ├── About.jsx
│   ├── Projects.jsx       # includes FeaturedCard, LoteriaCard
│   ├── Stack.jsx
│   ├── Contact.jsx
│   └── Footer.jsx
├── ornaments/
│   ├── PapelPicado.jsx    # Papel, Garland, PP color map
│   ├── Cempasuchil.jsx
│   └── Vela.jsx
└── ui/
    ├── SectionHeader.jsx
    └── FallingPetals.jsx

lib/
└── copy.js                # COPY bilingual object — pure JS export, no React

styles/
├── tokens.css             # unchanged
└── globals.css            # hifi/styles.css renamed

public/
└── uploads/               # existing images (moved as-is)
```

---

## Data Flow & State

**State** lives in `app/page.js` as a single `'use client'` component — same shape as the current `App()`:
- `lang` — 'es' | 'en'
- `palette` — 'tierra' | 'noche' | 'festivo'
- `petals` — boolean
- `loading` — boolean
- `editMode` — boolean

State is passed down as props to section components. No global state library.

**Content:** `lib/copy.js` exports the `COPY` object. Each section imports only what it needs: `import { COPY } from '@/lib/copy'`.

**Ornament colors:** `PP` color map moves into `components/ornaments/PapelPicado.jsx` as a named export, imported by components that reference it.

**Edit-mode bridge:** The `persist()` / `postMessage` design-canvas bridge is preserved unchanged in `app/page.js`.

---

## CSS

No changes to styles. `tokens.css` and `globals.css` are imported once in `app/layout.js`:

```js
import '@/styles/tokens.css';
import '@/styles/globals.css';
```

Google Fonts move from CDN `<link>` tags to `next/font/google` in `app/layout.js` (eliminates layout shift, improves performance).

---

## Routing — Future Case Studies

`app/projects/[slug]/page.js` is scaffolded but empty. When a case study is built, the project data in `lib/copy.js` (each card already has a `num`/`name`) will drive static params via `generateStaticParams`.

---

## Out of Scope

- TypeScript migration
- CSS Modules or Tailwind adoption
- Any content or visual changes
- Adding new sections or features
- Setting up a CMS
