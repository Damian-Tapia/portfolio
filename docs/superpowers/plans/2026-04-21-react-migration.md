# React Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate the Día de Muertos portfolio from CDN React + Babel standalone to a proper Next.js 14 project with real ES module imports/exports.

**Architecture:** Next.js 14 App Router, plain JavaScript. The existing `App()` component in `index.html` becomes `app/page.js` (a `'use client'` component). All `Object.assign(window, {...})` globals become named ES module exports. All `window.COPY` / `window.PP` reads become `import` statements.

**Tech Stack:** Next.js 14, React 18, plain JS/JSX, CSS (unchanged), Google Fonts via CDN link tags.

---

## File Map

**Create:**
- `package.json` — npm config + scripts
- `next.config.js` — Next.js config
- `jsconfig.json` — `@/` alias
- `.gitignore` — updated to include `.next/`
- `styles/tokens.css` — copy of `hifi/tokens.css`
- `styles/globals.css` — copy of `hifi/styles.css`
- `app/layout.js` — root layout: fonts, CSS, metadata
- `app/page.js` — App() component with all state
- `app/projects/[slug]/page.js` — stub for future case study pages
- `lib/copy.js` — exports COPY bilingual object
- `components/ornaments/PapelPicado.jsx` — exports PP, Papel, Garland
- `components/ornaments/Cempasuchil.jsx` — exports Cempasuchil
- `components/ornaments/Vela.jsx` — exports Vela
- `components/ui/SectionHeader.jsx` — exports SectionHeader
- `components/ui/FallingPetals.jsx` — exports FallingPetals
- `components/sections/Loader.jsx` — exports Loader
- `components/sections/Nav.jsx` — exports Nav
- `components/sections/Hero.jsx` — exports Hero
- `components/sections/About.jsx` — exports About
- `components/sections/Projects.jsx` — exports Projects, FeaturedCard, LoteriaCard
- `components/sections/Stack.jsx` — exports Stack
- `components/sections/Contact.jsx` — exports Contact
- `components/sections/Footer.jsx` — exports Footer

**Do not delete** the existing `hifi/` folder or `index.html` until the dev server is confirmed working.

---

## Task 1: Bootstrap Next.js project

**Files:**
- Create: `package.json`
- Create: `next.config.js`
- Create: `jsconfig.json`

- [ ] **Step 1: Create package.json**

```json
{
  "name": "portfolio",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "14.2.29",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  }
}
```

- [ ] **Step 2: Create next.config.js**

```js
/** @type {import('next').NextConfig} */
const nextConfig = {};
module.exports = nextConfig;
```

- [ ] **Step 3: Create jsconfig.json**

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

- [ ] **Step 4: Install dependencies**

Run: `npm install`

Expected: `node_modules/` created, no errors in output.

- [ ] **Step 5: Commit**

```bash
git init
git add package.json next.config.js jsconfig.json package-lock.json
git commit -m "chore: initialize Next.js 14 project"
```

---

## Task 2: Set up styles

**Files:**
- Create: `styles/tokens.css`
- Create: `styles/globals.css`

- [ ] **Step 1: Create the styles directory and copy tokens.css**

Create `styles/tokens.css` with this exact content (copy of `hifi/tokens.css`):

```css
/* Tierra mexicana palette + type system */
:root {
  --c-terracota: #c96442;
  --c-terracota-deep: #a14a2e;
  --c-ocre: #c99a3a;
  --c-ocre-soft: #e0b757;
  --c-hueso: #f4ece0;
  --c-hueso-warm: #ebe0d0;
  --c-negro: #1f1a15;
  --c-negro-soft: #2a241e;
  --c-oxido: #8a3a2a;
  --c-rosa: #c25a6b;
  --c-tinta: #3a2e24;

  --font-display: 'Fraunces', 'Playfair Display', Georgia, serif;
  --font-body: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', 'Courier New', monospace;

  --radius: 2px;
  --shadow-sm: 0 1px 2px rgba(31,26,21,0.06), 0 2px 6px rgba(31,26,21,0.04);
  --shadow-md: 0 4px 12px rgba(31,26,21,0.08), 0 10px 30px rgba(31,26,21,0.06);
  --shadow-lg: 0 20px 60px rgba(31,26,21,0.18);

  --max-w: 1200px;
  --pad-x: clamp(20px, 5vw, 56px);
}

/* Paletas alternas (tweakable) */
[data-palette="noche"] {
  --c-hueso: #18120d;
  --c-hueso-warm: #221a12;
  --c-negro: #f4ece0;
  --c-negro-soft: #e5d9c3;
  --c-tinta: #e0d3ba;
  --c-terracota: #e07a52;
  --c-oxido: #c25a3a;
}
[data-palette="festivo"] {
  --c-terracota: #ff6a3d;
  --c-ocre: #ffb627;
  --c-rosa: #e63b79;
  --c-oxido: #a03ed8;
}

* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; }
body {
  font-family: var(--font-body);
  color: var(--c-tinta);
  background: var(--c-hueso);
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}
::selection { background: var(--c-terracota); color: var(--c-hueso); }

/* Scrollbar */
::-webkit-scrollbar { width: 10px; height: 10px; }
::-webkit-scrollbar-track { background: var(--c-hueso-warm); }
::-webkit-scrollbar-thumb { background: var(--c-oxido); border-radius: 5px; }
```

- [ ] **Step 2: Create styles/globals.css**

Create `styles/globals.css` with the full content of `hifi/styles.css` (copy it unchanged — all 350 lines).

- [ ] **Step 3: Commit**

```bash
git add styles/
git commit -m "chore: copy CSS files to styles/"
```

---

## Task 3: Create app/layout.js

**Files:**
- Create: `app/layout.js`

- [ ] **Step 1: Create app/layout.js**

```jsx
import '@/styles/tokens.css';
import '@/styles/globals.css';

export const metadata = {
  title: 'Damian Tapia · Portafolio',
  description: 'Portafolio personal de desarrollador web con temática de Día de Muertos.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300..900;1,300..900&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/layout.js
git commit -m "feat: add root layout with fonts and global CSS"
```

---

## Task 4: Create lib/copy.js

**Files:**
- Create: `lib/copy.js`

- [ ] **Step 1: Create lib/copy.js**

```js
export const COPY = {
  es: {
    nav: { inicio: 'inicio', sobre: 'sobre', obra: 'obra', stack: 'stack', contacto: 'contacto' },
    loader: {
      step1: 'encendiendo la vela…',
      step2: 'colgando papeles picados…',
      step3: 'preparando la ofrenda…',
      ready: 'bienvenido',
    },
    hero: {
      greeting: '// hola, soy',
      name: 'Damian Tapia',
      role: 'full-stack developer · CDMX',
      tagline: 'Construyo código',
      taglineHl: 'que sobrevive al que lo escribe.',
      bio: 'Entre la vida y el bug. Dos años levantando altares de código para startups y marcas que quieren ser recordadas.',
      cta1: 'ver obra()',
      cta2: 'contacto.md',
      scroll: 'baja · scroll',
    },
    about: {
      label: 'sobre mí',
      title: 'Aquí yace el dev',
      subtitle: 'una ofrenda breve',
      body: [
        'Me llamo Damian Tapia y llevo dos años construyendo aplicaciones web que la gente no quiere cerrar. Trabajo con React, TypeScript y Node, pero me muevo cómodo en cualquier parte del stack.',
        'Creo que el buen software —como una buena ofrenda— se construye con intención: cada decisión, cada pixel, cada función cumple un propósito.',
        'Cuando no estoy codeando estoy buscando una nueva manera de prepararme un café.',
      ],
      meta: [
        { k: 'ubicación', v: 'CDMX, México' },
        { k: 'experiencia', v: '2 años' },
        { k: 'estado', v: '● disponible', live: true },
        { k: 'idiomas', v: 'ES nativo · EN B2' },
      ],
    },
    projects: {
      label: 'obra completa',
      title: 'La lotería de proyectos',
      subtitle: 'cuatro cartas · cuatro historias',
      featured: 'destacado',
      viewAll: 'ver todas las cartas →',
      cards: [
        { num: '01', name: 'Proline', tag: 'Frontend Dev & UI/UX', year: '2025–hoy', stack: ['Next.js','TypeScript','SCSS/BEM','Storybook','Prisma'], blurb: 'Lideré 15+ wireframes y prototipos en Figma para 7+ módulos críticos. Construí librería de 40+ componentes reutilizables con clean architecture, mobile-first y atomic design. Integré Storybook, diseñé esquemas Prisma e implementé endpoints de API.', icon: '🧱', featured: true, meta: '−18 hrs dev / sprint' },
        { num: '02', name: 'Xcamp', tag: 'Frontend Angular & UI/UX', year: '2025', stack: ['Angular 17','TypeScript','SCSS/BEM','Figma'], blurb: 'Optimicé 30+ componentes y creé ~15 nuevos en Angular 17 alineados al design system. Lideré migración responsiva móvil y tablet para flujos multi-paso. Definí 8+ flujos end-to-end en Figma.', icon: '🎯', meta: '−40% duplicación' },
        { num: '03', name: 'Clínica POS', tag: 'Fullstack freelance', year: '2023–2024', stack: ['MongoDB','Express','React','Node','JWT'], blurb: 'App fullstack en producción para clínica de medicina funcional: expedientes, POS, inventario y cobros con pagos parciales. CRUD para 200+ pacientes con roles, reportes PDF y escaneo de códigos de barras. Módulo POS con 50+ SKUs.', icon: '🏥', meta: 'sync tickets <100ms' },
        { num: '04', name: 'Co‑Labora', tag: 'Plataforma coworking', year: '2023–2024', stack: ['Next.js','TypeScript','Tailwind','MongoDB','AWS S3','Stripe'], blurb: 'Plataforma fullstack de descubrimiento y renta de espacios de coworking, de Figma a producción. Integración de Google Maps, Stripe para pagos y SendGrid para notificaciones. Gestión de imágenes con AWS S3 + Sharp.', icon: '🏢', meta: 'end-to-end funcional' },
      ],
    },
    stack: {
      label: 'caja de herramientas',
      title: 'El altar técnico',
      subtitle: 'siete veladoras encendidas',
      hint: 'hover · prende la vela',
      cats: [
        { t: 'frontend', items: ['Angular 17+', 'React 18', 'Next.js 13+', 'TypeScript', 'JavaScript ES6+'] },
        { t: 'styling', items: ['Tailwind CSS', 'SCSS/SASS', 'DaisyUI', 'CSS-in-JS', 'BEM'] },
        { t: 'backend', items: ['Node.js', 'Express', 'PostgreSQL'] },
        { t: 'database', items: ['MongoDB', 'Prisma ORM'] },
        { t: 'tools', items: ['Git', 'Figma', 'Storybook', 'Jira', 'Postman', 'ClickUp', 'Asana', 'PostHog', 'GrowthBook'] },
        { t: 'ui/ux', items: ['Design Systems', 'Responsive Design', 'Mobile-First', 'Atomic Design', 'User Flow Optimization'] },
        { t: 'apis', items: ['REST APIs', 'Stripe API', 'Google Maps API'] },
      ],
    },
    contact: {
      label: 'ofrenda',
      title: 'Dejemos una ofrenda en tu proyecto.',
      subtitle: 'cuéntame qué quieres construir',
      emailBtn: 'copiar correo',
      copied: '✓ copiado',
      or: 'o búscame en',
      footer: 'hecho con ♥ y café de olla · que descansen en paz los bugs · ',
    },
  },
  en: {
    nav: { inicio: 'home', sobre: 'about', obra: 'works', stack: 'stack', contacto: 'contact' },
    loader: {
      step1: 'lighting the candle…',
      step2: 'hanging papel picado…',
      step3: 'preparing the offering…',
      ready: 'welcome',
    },
    hero: {
      greeting: '// hi, I am',
      name: 'Damian Tapia',
      role: 'full-stack developer · Mexico City',
      tagline: 'I build code',
      taglineHl: 'that outlives its author.',
      bio: 'Between life and bug. Two years raising code altars for startups and brands that want to be remembered.',
      cta1: 'view work()',
      cta2: 'contact.md',
      scroll: 'scroll · down',
    },
    about: {
      label: 'about me',
      title: 'Here lies the dev',
      subtitle: 'a brief offering',
      body: [
        'My name is Damian Tapia and I have been building web applications that people do not want to close for two years. I work with React, TypeScript and Node, but I move comfortably anywhere in the stack.',
        'I believe good software —like a good offering— is built with intention: every decision, every pixel, every function serves a purpose.',
        'When I am not coding, I am looking for a new way to brew myself a coffee.',
      ],
      meta: [
        { k: 'location', v: 'Mexico City, MX' },
        { k: 'experience', v: '2 years' },
        { k: 'status', v: '● available', live: true },
        { k: 'languages', v: 'ES native · EN B2' },
      ],
    },
    projects: {
      label: 'complete works',
      title: 'The proyect lotería',
      subtitle: 'four cards · four stories',
      featured: 'featured',
      viewAll: 'view all cards →',
      cards: [
        { num: '01', name: 'Proline', tag: 'Frontend Dev & UI/UX', year: '2025–now', stack: ['Next.js','TypeScript','SCSS/BEM','Storybook','Prisma'], blurb: 'Led 15+ wireframes and prototypes in Figma for 7+ critical modules. Built a library of 40+ reusable components under clean architecture, mobile-first and atomic design. Integrated Storybook, designed Prisma schemas, and implemented API endpoints.', icon: '🧱', featured: true, meta: '−18 hrs dev / sprint' },
        { num: '02', name: 'Xcamp', tag: 'Frontend Angular & UI/UX', year: '2025', stack: ['Angular 17','TypeScript','SCSS/BEM','Figma'], blurb: 'Optimized 30+ components and created ~15 new ones in Angular 17 aligned to the design system. Led responsive mobile and tablet migration for multi-step flows. Defined 8+ end-to-end flows in Figma.', icon: '🎯', meta: '−40% code duplication' },
        { num: '03', name: 'Clinical POS', tag: 'Fullstack freelance', year: '2023–2024', stack: ['MongoDB','Express','React','Node','JWT'], blurb: 'Fullstack app in production for a functional-medicine clinic: records, POS, inventory and partial-payment billing. CRUD for 200+ patients with roles, PDF reports and barcode scanning. POS with 50+ SKUs.', icon: '🏥', meta: 'ticket sync <100ms' },
        { num: '04', name: 'Co‑Labora', tag: 'Coworking platform', year: '2023–2024', stack: ['Next.js','TypeScript','Tailwind','MongoDB','AWS S3','Stripe'], blurb: 'Fullstack platform for discovering and renting coworking spaces, Figma to production. Google Maps, Stripe payments and SendGrid notifications. Image management with AWS S3 + Sharp.', icon: '🏢', meta: 'end-to-end shipped' },
      ],
    },
    stack: {
      label: 'toolbox',
      title: 'The technical altar',
      subtitle: 'seven candles lit',
      hint: 'hover · light the candle',
      cats: [
        { t: 'frontend', items: ['Angular 17+', 'React 18', 'Next.js 13+', 'TypeScript', 'JavaScript ES6+'] },
        { t: 'styling', items: ['Tailwind CSS', 'SCSS/SASS', 'DaisyUI', 'CSS-in-JS', 'BEM'] },
        { t: 'backend', items: ['Node.js', 'Express', 'PostgreSQL'] },
        { t: 'database', items: ['MongoDB', 'Prisma ORM'] },
        { t: 'tools', items: ['Git', 'Figma', 'Storybook', 'Jira', 'Postman', 'ClickUp', 'Asana', 'PostHog', 'GrowthBook'] },
        { t: 'ui/ux', items: ['Design Systems', 'Responsive Design', 'Mobile-First', 'Atomic Design', 'User Flow Optimization'] },
        { t: 'apis', items: ['REST APIs', 'Stripe API', 'Google Maps API'] },
      ],
    },
    contact: {
      label: 'offering',
      title: 'Let us leave an offering in your project.',
      subtitle: 'tell me what you want to build',
      emailBtn: 'copy email',
      copied: '✓ copied',
      or: 'or find me on',
      footer: 'made with ♥ and café de olla · may the bugs rest in peace · ',
    },
  },
};
```

- [ ] **Step 2: Commit**

```bash
git add lib/copy.js
git commit -m "feat: add bilingual COPY export to lib/copy.js"
```

---

## Task 5: Create PapelPicado ornament component

**Files:**
- Create: `components/ornaments/PapelPicado.jsx`

- [ ] **Step 1: Create components/ornaments/PapelPicado.jsx**

```jsx
'use client';
import { cloneElement, useRef, useState, useEffect, useId } from 'react';

export const PP = {
  terracota: 'var(--c-terracota)',
  ocre: 'var(--c-ocre)',
  oxido: 'var(--c-oxido)',
  rosa: 'var(--c-rosa)',
  negro: 'var(--c-negro)',
};

function papelPath(W, H) {
  const scallops = Math.max(5, Math.floor(W / 24));
  const sw = W / scallops;
  const depth = 7;
  let bottom = '';
  for (let i = 0; i < scallops; i++) {
    const x1 = i * sw;
    const cx = x1 + sw / 2;
    const x2 = x1 + sw;
    bottom += ` Q ${cx} ${H + depth}, ${x2} ${H}`;
  }
  return `M 0 0 L ${W} 0 L ${W} ${H} ${bottom} L 0 ${H} Z`;
}

function flowerPath(cx, cy, rOuter, rInner, petals = 10) {
  let d = '';
  for (let i = 0; i < petals; i++) {
    const a = (i / petals) * Math.PI * 2;
    const a2 = ((i + 0.5) / petals) * Math.PI * 2;
    const x1 = cx + Math.cos(a) * rOuter;
    const y1 = cy + Math.sin(a) * rOuter;
    const x2 = cx + Math.cos(a2) * rInner;
    const y2 = cy + Math.sin(a2) * rInner;
    d += `${i === 0 ? 'M' : 'L'} ${x1} ${y1} L ${x2} ${y2} `;
  }
  return d + 'Z';
}

function patternCuts(kind, W, H) {
  const out = [];
  const cx = W / 2, cy = H / 2;

  const borderDots = 14;
  for (let i = 0; i < borderDots; i++) {
    const fx = 0.08 + (i / (borderDots - 1)) * 0.84;
    out.push(<circle key={`tb${i}`} cx={W * fx} cy={H * 0.08} r={W * 0.012} fill="white"/>);
    out.push(<circle key={`bb${i}`} cx={W * fx} cy={H * 0.82} r={W * 0.012} fill="white"/>);
  }
  const sideDots = 5;
  for (let i = 0; i < sideDots; i++) {
    const fy = 0.2 + (i / (sideDots - 1)) * 0.5;
    out.push(<circle key={`ls${i}`} cx={W * 0.06} cy={H * fy} r={W * 0.012} fill="white"/>);
    out.push(<circle key={`rs${i}`} cx={W * 0.94} cy={H * fy} r={W * 0.012} fill="white"/>);
  }

  if (kind === 'code') {
    const s = Math.min(W, H) * 0.18;
    const t = Math.max(3, W * 0.04);
    out.push(<path key="lt" fill="white" d={`M ${cx - s * 1.8} ${cy} L ${cx - s * 0.4} ${cy - s} L ${cx - s * 0.4 + t} ${cy - s + t * 0.2} L ${cx - s * 1.4} ${cy} L ${cx - s * 0.4 + t} ${cy + s - t * 0.2} L ${cx - s * 0.4} ${cy + s} Z`}/>);
    out.push(<path key="gt" fill="white" d={`M ${cx + s * 1.8} ${cy} L ${cx + s * 0.4} ${cy - s} L ${cx + s * 0.4 - t} ${cy - s + t * 0.2} L ${cx + s * 1.4} ${cy} L ${cx + s * 0.4 - t} ${cy + s - t * 0.2} L ${cx + s * 0.4} ${cy + s} Z`}/>);
    out.push(<path key="sl" fill="white" d={`M ${cx + s * 0.15} ${cy - s} L ${cx + s * 0.15 + t} ${cy - s} L ${cx - s * 0.15 + t} ${cy + s} L ${cx - s * 0.15} ${cy + s} Z`}/>);
    [[0.22, 0.28], [0.78, 0.28], [0.22, 0.62], [0.78, 0.62]].forEach(([fx, fy], i) => {
      out.push(<path key={`cf${i}`} d={flowerPath(W * fx, H * fy, W * 0.045, W * 0.02, 6)} fill="white"/>);
      out.push(<circle key={`cfc${i}`} cx={W * fx} cy={H * fy} r={W * 0.015} fill="white"/>);
    });
  } else if (kind === 'skull') {
    const sw = W * 0.28, sh = H * 0.3;
    out.push(<ellipse key="cran" cx={cx} cy={cy - H * 0.04} rx={sw} ry={sh * 0.95} fill="white"/>);
    out.push(<rect key="jaw" x={cx - sw * 0.55} y={cy + sh * 0.5} width={sw * 1.1} height={sh * 0.4} rx={sh * 0.15} fill="white"/>);
    for (let i = 0; i < 4; i++) {
      out.push(<rect key={`tg${i}`} x={cx - sw * 0.45 + i * sw * 0.3} y={cy + sh * 0.55} width={sw * 0.1} height={sh * 0.32} fill="black"/>);
    }
    out.push(<ellipse key="eL" cx={cx - sw * 0.38} cy={cy - sh * 0.15} rx={sw * 0.22} ry={sh * 0.2} fill="black"/>);
    out.push(<ellipse key="eR" cx={cx + sw * 0.38} cy={cy - sh * 0.15} rx={sw * 0.22} ry={sh * 0.2} fill="black"/>);
    out.push(<path key="no" d={`M ${cx} ${cy + sh * 0.1} L ${cx - sw * 0.08} ${cy + sh * 0.35} L ${cx + sw * 0.08} ${cy + sh * 0.35} Z`} fill="black"/>);
    out.push(<path key="efL" d={flowerPath(cx - sw * 0.38, cy - sh * 0.15, sw * 0.12, sw * 0.05, 6)} fill="white"/>);
    out.push(<path key="efR" d={flowerPath(cx + sw * 0.38, cy - sh * 0.15, sw * 0.12, sw * 0.05, 6)} fill="white"/>);
  } else if (kind === 'flower') {
    const rO = Math.min(W, H) * 0.32;
    const rI = rO * 0.45;
    out.push(<path key="f1" d={flowerPath(cx, cy, rO, rI, 12)} fill="white"/>);
    out.push(<path key="f2" d={flowerPath(cx, cy, rO * 0.7, rI * 0.55, 10)} fill="black"/>);
    out.push(<path key="f3" d={flowerPath(cx, cy, rO * 0.48, rI * 0.35, 8)} fill="white"/>);
    out.push(<circle key="fc" cx={cx} cy={cy} r={rO * 0.15} fill="black"/>);
    [[0, -1], [0, 1], [-1, 0], [1, 0]].forEach(([dx, dy], i) => {
      const lx = cx + dx * rO * 1.4;
      const ly = cy + dy * rO * 1.4;
      out.push(<ellipse key={`leaf${i}`} cx={lx} cy={ly} rx={W * 0.05} ry={W * 0.025} transform={`rotate(${dy === 0 ? 0 : 90} ${lx} ${ly})`} fill="white"/>);
    });
  } else if (kind === 'cross') {
    const s = Math.min(W, H) * 0.32;
    const t = W * 0.09;
    out.push(<rect key="cv" x={cx - t / 2} y={cy - s} width={t} height={s * 2} fill="white"/>);
    out.push(<rect key="ch" x={cx - s * 0.65} y={cy - s * 0.3} width={s * 1.3} height={t} fill="white"/>);
    const caps = [[cx, cy - s], [cx, cy + s], [cx - s * 0.65, cy - s * 0.3 + t / 2], [cx + s * 0.65, cy - s * 0.3 + t / 2]];
    caps.forEach(([x, y], i) => {
      out.push(<rect key={`cap${i}`} x={x - t * 0.7} y={y - t * 0.7} width={t * 1.4} height={t * 1.4} transform={`rotate(45 ${x} ${y})`} fill="white"/>);
    });
    out.push(<path key="cf" d={flowerPath(cx, cy - s * 0.3 + t / 2, W * 0.06, W * 0.025, 8)} fill="black"/>);
    out.push(<circle key="cfd" cx={cx} cy={cy - s * 0.3 + t / 2} r={W * 0.02} fill="white"/>);
  } else if (kind === 'heart') {
    const s = Math.min(W, H) * 0.28;
    out.push(<path key="h" fill="white" d={`M ${cx} ${cy + s * 0.95} C ${cx - s * 1.7} ${cy + s * 0.1}, ${cx - s * 1.4} ${cy - s * 1.3}, ${cx} ${cy - s * 0.15} C ${cx + s * 1.4} ${cy - s * 1.3}, ${cx + s * 1.7} ${cy + s * 0.1}, ${cx} ${cy + s * 0.95} Z`}/>);
    out.push(<path key="hf" d={flowerPath(cx, cy - s * 0.15, s * 0.35, s * 0.15, 8)} fill="black"/>);
    out.push(<circle key="hfd" cx={cx} cy={cy - s * 0.15} r={s * 0.1} fill="white"/>);
    for (let i = 0; i < 8; i++) {
      const a = i / 8 * Math.PI * 2;
      out.push(<circle key={`hd${i}`} cx={cx + Math.cos(a) * s * 1.8} cy={cy + Math.sin(a) * s * 1.4} r={W * 0.02} fill="white"/>);
    }
  } else if (kind === 'star') {
    const rO = Math.min(W, H) * 0.34;
    const rI = rO * 0.42;
    const pts = 8;
    let d = '';
    for (let i = 0; i < pts * 2; i++) {
      const a = (i / (pts * 2)) * Math.PI * 2 - Math.PI / 2;
      const r = i % 2 === 0 ? rO : rI;
      d += `${i === 0 ? 'M' : 'L'} ${cx + Math.cos(a) * r} ${cy + Math.sin(a) * r} `;
    }
    out.push(<path key="s" d={d + 'Z'} fill="white"/>);
    out.push(<path key="ss" d={flowerPath(cx, cy, rO * 0.35, rO * 0.15, 8)} fill="black"/>);
    out.push(<circle key="sc" cx={cx} cy={cy} r={W * 0.04} fill="white"/>);
    [[0.22, 0.25], [0.78, 0.25], [0.22, 0.65], [0.78, 0.65]].forEach(([fx, fy], i) => {
      out.push(<path key={`ms${i}`} d={flowerPath(W * fx, H * fy, W * 0.04, W * 0.018, 4)} fill="white"/>);
    });
  }

  return out;
}

export function Papel({ color = PP.terracota, w = 200, h = 160, pattern = 'code', id, className = '', style = {} }) {
  const maskId = `pp-${id || Math.random().toString(36).slice(2, 8)}`;
  const path = papelPath(w, h);
  return (
    <svg className={className} width={w} height={h + 12} viewBox={`0 0 ${w} ${h + 12}`} style={{ overflow: 'visible', ...style }}>
      <defs>
        <mask id={maskId} maskUnits="userSpaceOnUse">
          <path d={path} fill="white"/>
          {patternCuts(pattern, w, h).map((el, i) =>
            cloneElement(el, { key: `cut-${i}`, fill: el.props.fill === 'white' ? 'black' : 'white' })
          )}
        </mask>
      </defs>
      <path d={path} fill="rgba(0,0,0,0.12)" transform="translate(1.5, 2)"/>
      <path d={path} fill={color} mask={`url(#${maskId})`}/>
      {[...Array(Math.max(3, Math.floor(w / 18)))].map((_, i) => {
        const step = w / Math.max(3, Math.floor(w / 18));
        return <circle key={`tp${i}`} cx={step / 2 + i * step} cy={3} r={1.6} fill="var(--c-hueso)"/>;
      })}
    </svg>
  );
}

export function Garland({ pieces, style = {}, staticSway = false }) {
  const ref = useRef(null);
  const [w, setW] = useState(1200);
  const uid = useId().replace(/:/g, '');

  useEffect(() => {
    const update = () => ref.current && setW(ref.current.offsetWidth);
    update();
    const ro = new ResizeObserver(update);
    if (ref.current) ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  const count = pieces.length;
  const pieceW = Math.min(150, Math.max(88, (w - 40) / count - 10));
  const pieceH = pieceW * 0.78;

  return (
    <div ref={ref} className="pp-garland" style={{ position: 'relative', width: '100%', minHeight: pieceH + 30, ...style }}>
      <svg width="100%" height="18" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }} preserveAspectRatio="none">
        <path d={`M 0 4 Q ${w / 2} 16, ${w} 4`} stroke="var(--c-tinta)" strokeWidth="0.8" fill="none" opacity="0.4"/>
      </svg>
      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start', paddingTop: 8, width: '100%' }}>
        {pieces.map((p, i) => (
          <div key={i} className={`pp-sway pp-sway-${i % 4}`} style={{ transformOrigin: 'top center', animationDelay: `${i * 0.15}s`, animationPlayState: staticSway ? 'paused' : 'running' }}>
            <Papel id={`${uid}-${i}`} color={p.color} pattern={p.pattern} w={pieceW} h={pieceH}/>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/ornaments/PapelPicado.jsx
git commit -m "feat: add PapelPicado ornament component (Papel, Garland, PP)"
```

---

## Task 6: Create Cempasuchil and Vela ornament components

**Files:**
- Create: `components/ornaments/Cempasuchil.jsx`
- Create: `components/ornaments/Vela.jsx`

- [ ] **Step 1: Create components/ornaments/Cempasuchil.jsx**

```jsx
'use client';

export function Cempasuchil({ size = 40, style = {}, petalColor = 'var(--c-ocre)', coreColor = 'var(--c-oxido)' }) {
  const petals = 14;
  return (
    <svg width={size} height={size} viewBox="-24 -24 48 48" style={{ display: 'inline-block', ...style }}>
      {[...Array(petals)].map((_, i) => {
        const a = (i / petals) * 360;
        const rad = a * Math.PI / 180;
        return (
          <ellipse key={`outer-${i}`} cx={Math.cos(rad) * 14} cy={Math.sin(rad) * 14} rx="5" ry="8"
            fill={petalColor} opacity="0.92" transform={`rotate(${a} ${Math.cos(rad) * 14} ${Math.sin(rad) * 14})`}/>
        );
      })}
      {[...Array(10)].map((_, i) => {
        const a = (i / 10) * 360 + 18;
        const rad = a * Math.PI / 180;
        return (
          <ellipse key={`inner-${i}`} cx={Math.cos(rad) * 7} cy={Math.sin(rad) * 7} rx="3.5" ry="5.5"
            fill={petalColor} transform={`rotate(${a} ${Math.cos(rad) * 7} ${Math.sin(rad) * 7})`}/>
        );
      })}
      <circle cx="0" cy="0" r="4" fill={coreColor}/>
    </svg>
  );
}
```

- [ ] **Step 2: Create components/ornaments/Vela.jsx**

```jsx
'use client';

export function Vela({ size = 48, lit = true, style = {}, flicker = true }) {
  return (
    <svg width={size} height={size * 1.8} viewBox="0 0 30 54" style={{ display: 'inline-block', ...style }}>
      {lit && (
        <g className={flicker ? 'vela-flame' : ''}>
          <ellipse cx="15" cy="5" rx="3.5" ry="7" fill="var(--c-ocre)" opacity="0.7"/>
          <ellipse cx="15" cy="6" rx="2" ry="5" fill="var(--c-ocre-soft)"/>
          <ellipse cx="15" cy="7" rx="1" ry="3" fill="var(--c-hueso)"/>
        </g>
      )}
      <line x1="15" y1="12" x2="15" y2="18" stroke="var(--c-negro)" strokeWidth="1.2"/>
      <rect x="9" y="18" width="12" height="28" fill="var(--c-hueso-warm)" stroke="var(--c-tinta)" strokeWidth="0.8"/>
      <ellipse cx="15" cy="18" rx="6" ry="1.5" fill="var(--c-hueso)" stroke="var(--c-tinta)" strokeWidth="0.8"/>
      <path d="M 10 24 Q 11 30, 10 34 Z" fill="var(--c-hueso)" opacity="0.6"/>
      <rect x="7" y="46" width="16" height="5" fill="var(--c-oxido)"/>
      <rect x="6" y="50" width="18" height="3" fill="var(--c-negro-soft)"/>
    </svg>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add components/ornaments/Cempasuchil.jsx components/ornaments/Vela.jsx
git commit -m "feat: add Cempasuchil and Vela ornament components"
```

---

## Task 7: Create shared UI components

**Files:**
- Create: `components/ui/SectionHeader.jsx`
- Create: `components/ui/FallingPetals.jsx`

- [ ] **Step 1: Create components/ui/SectionHeader.jsx**

```jsx
export function SectionHeader({ num, label, title, subtitle }) {
  return (
    <header className="sh">
      <div className="sh-num mono">{num}</div>
      <div className="sh-text">
        <div className="sh-label mono">— {label}</div>
        <h2 className="sh-title">{title}</h2>
        {subtitle && <div className="sh-subtitle">{subtitle}</div>}
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Create components/ui/FallingPetals.jsx**

```jsx
'use client';
import { useMemo } from 'react';

export function FallingPetals({ on = true, count = 16 }) {
  const petals = useMemo(() =>
    [...Array(count)].map((_, i) => ({
      left: Math.random() * 100,
      delay: Math.random() * 12,
      dur: 12 + Math.random() * 10,
      size: 14 + Math.random() * 16,
      drift: -40 + Math.random() * 80,
      hue: Math.random() > 0.4 ? 'var(--c-ocre)' : 'var(--c-terracota)',
    })), [count]);

  if (!on) return null;
  return (
    <div className="petals-layer" aria-hidden>
      {petals.map((p, i) => (
        <span key={i} className="petal" style={{
          left: `${p.left}%`,
          animationDelay: `${p.delay}s`,
          animationDuration: `${p.dur}s`,
          width: p.size,
          height: p.size * 1.6,
          background: p.hue,
          '--drift': `${p.drift}px`,
        }}/>
      ))}
    </div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add components/ui/SectionHeader.jsx components/ui/FallingPetals.jsx
git commit -m "feat: add SectionHeader and FallingPetals UI components"
```

---

## Task 8: Create Loader component

**Files:**
- Create: `components/sections/Loader.jsx`

- [ ] **Step 1: Create components/sections/Loader.jsx**

```jsx
'use client';
import { useState, useEffect } from 'react';
import { COPY } from '@/lib/copy';
import { PP, Papel } from '@/components/ornaments/PapelPicado';
import { Vela } from '@/components/ornaments/Vela';

export function Loader({ onDone, durationMs = 3000, lang }) {
  const t = COPY[lang].loader;
  const [step, setStep] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 200);
    const t2 = setTimeout(() => setStep(2), durationMs * 0.35);
    const t3 = setTimeout(() => setStep(3), durationMs * 0.75);
    const t4 = setTimeout(() => setExiting(true), durationMs);
    const t5 = setTimeout(() => onDone(), durationMs + 600);
    return () => [t1, t2, t3, t4, t5].forEach(clearTimeout);
  }, [durationMs, onDone]);

  const msgs = [t.step1, t.step2, t.step3, t.ready];
  const palette = [PP.terracota, PP.ocre, PP.oxido, PP.rosa, PP.negro];
  const pats = ['code', 'flower', 'skull', 'cross', 'star'];

  return (
    <div className="loader" data-exiting={exiting}>
      <div className="loader-bg"/>
      <div className="loader-inner">
        <div className="loader-papers">
          {palette.map((c, i) => (
            <div key={i} className="loader-paper" data-show={step >= 2} style={{ animationDelay: `${i * 0.1}s` }}>
              <Papel id={`load-${i}`} color={c} pattern={pats[i]} w={96} h={78}/>
            </div>
          ))}
        </div>
        <div className="loader-candle" data-show={step >= 1}>
          <Vela size={52} lit={step >= 1}/>
        </div>
        <div className="loader-status">
          <div className="loader-msg" key={step}>{msgs[Math.min(step, 3)]}</div>
          <div className="loader-bar">
            <div className="loader-bar-fill" style={{ width: `${Math.min(100, (step + 1) * 28)}%` }}/>
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/Loader.jsx
git commit -m "feat: add Loader section component"
```

---

## Task 9: Create Nav component

**Files:**
- Create: `components/sections/Nav.jsx`

- [ ] **Step 1: Create components/sections/Nav.jsx**

```jsx
'use client';
import { useState, useEffect } from 'react';
import { COPY } from '@/lib/copy';

export function Nav({ lang, setLang, palette, setPalette }) {
  const n = COPY[lang].nav;
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { id: 'inicio', href: '#inicio' },
    { id: 'sobre', href: '#sobre' },
    { id: 'obra', href: '#obra' },
    { id: 'stack', href: '#stack' },
    { id: 'contacto', href: '#contacto' },
  ];

  return (
    <nav className="nav" data-scrolled={scrolled}>
      <div className="nav-inner">
        <a href="#inicio" className="nav-brand">
          <span className="nav-brand-dot"/>
          <span className="nav-brand-text">damian<span className="nav-brand-tld">.dev</span></span>
        </a>
        <ul className="nav-links">
          {links.map(l => (
            <li key={l.id}><a href={l.href}>{n[l.id]}</a></li>
          ))}
        </ul>
        <div className="nav-tools">
          <button className="nav-lang" onClick={() => setLang(lang === 'es' ? 'en' : 'es')}>
            <span className={lang === 'es' ? 'on' : 'off'}>ES</span>
            <span className="sep">/</span>
            <span className={lang === 'en' ? 'on' : 'off'}>EN</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/Nav.jsx
git commit -m "feat: add Nav section component"
```

---

## Task 10: Create Hero component

**Files:**
- Create: `components/sections/Hero.jsx`

- [ ] **Step 1: Create components/sections/Hero.jsx**

```jsx
'use client';
import { COPY } from '@/lib/copy';
import { PP, Garland } from '@/components/ornaments/PapelPicado';
import { Cempasuchil } from '@/components/ornaments/Cempasuchil';

export function Hero({ lang }) {
  const h = COPY[lang].hero;
  return (
    <section id="inicio" className="hero">
      <Garland pieces={[
        { color: PP.terracota, pattern: 'code' },
        { color: PP.ocre, pattern: 'flower' },
        { color: PP.negro, pattern: 'skull' },
        { color: PP.oxido, pattern: 'cross' },
        { color: PP.rosa, pattern: 'heart' },
        { color: PP.terracota, pattern: 'star' },
        { color: PP.ocre, pattern: 'code' },
      ]}/>
      <div className="hero-inner">
        <div className="hero-meta">
          <span className="dot-pulse"/>
          <span className="mono">{h.role}</span>
        </div>
        <h1 className="hero-title">
          <span className="hero-greeting mono">{h.greeting}</span>
          <span className="hero-name">{h.name}</span>
          <span className="hero-tag">
            {h.tagline} <em>{h.taglineHl}</em>
          </span>
        </h1>
        <p className="hero-bio">{h.bio}</p>
        <div className="hero-ctas">
          <a href="#obra" className="btn btn-primary">{h.cta1}<span className="btn-arrow">→</span></a>
          <a href="#contacto" className="btn btn-ghost">{h.cta2}</a>
        </div>
        <div className="hero-deco">
          <Cempasuchil size={56}/>
          <Cempasuchil size={36} petalColor="var(--c-oxido)"/>
          <Cempasuchil size={44}/>
        </div>
        <div className="hero-scroll mono">{h.scroll} ↓</div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/Hero.jsx
git commit -m "feat: add Hero section component"
```

---

## Task 11: Create About component

**Files:**
- Create: `components/sections/About.jsx`

- [ ] **Step 1: Create components/sections/About.jsx**

```jsx
'use client';
import { COPY } from '@/lib/copy';
import { PP, Garland } from '@/components/ornaments/PapelPicado';
import { Cempasuchil } from '@/components/ornaments/Cempasuchil';
import { SectionHeader } from '@/components/ui/SectionHeader';

export function About({ lang }) {
  const a = COPY[lang].about;
  return (
    <section id="sobre" className="about">
      <Garland pieces={[
        { color: PP.ocre, pattern: 'flower' },
        { color: PP.oxido, pattern: 'skull' },
        { color: PP.terracota, pattern: 'cross' },
        { color: PP.ocre, pattern: 'flower' },
      ]}/>
      <div className="section-inner">
        <SectionHeader num="02" label={a.label} title={a.title} subtitle={a.subtitle}/>
        <div className="about-grid">
          <div className="about-portrait">
            <div className="about-frame">
              <div className="about-img" aria-label="portrait placeholder">
                <span className="about-img-label mono">retrato · b&w</span>
              </div>
              <div className="about-frame-tag mono">IMG_001.jpg</div>
            </div>
            <div className="about-petals">
              <Cempasuchil size={40}/>
              <Cempasuchil size={28} petalColor="var(--c-oxido)"/>
            </div>
          </div>
          <div className="about-body">
            {a.body.map((p, i) => (<p key={i} className="about-p">{p}</p>))}
            <dl className="about-meta">
              {a.meta.map((m, i) => (
                <div key={i} className="about-meta-row">
                  <dt>{m.k}</dt>
                  <dd className={m.live ? 'live' : ''}>{m.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/About.jsx
git commit -m "feat: add About section component"
```

---

## Task 12: Create Projects component

**Files:**
- Create: `components/sections/Projects.jsx`

- [ ] **Step 1: Create components/sections/Projects.jsx**

```jsx
'use client';
import { useState } from 'react';
import { COPY } from '@/lib/copy';
import { PP, Garland } from '@/components/ornaments/PapelPicado';
import { SectionHeader } from '@/components/ui/SectionHeader';

function FeaturedCard({ card, lang, featuredLabel, flipped, onFlip }) {
  return (
    <div className={`featured-card ${flipped ? 'flipped' : ''}`} onClick={onFlip}>
      <div className="featured-inner">
        <div className="featured-front">
          <div className="featured-illustration">
            <div className="featured-icon-big">{card.icon}</div>
            <div className="featured-bg-pattern"/>
          </div>
          <div className="featured-meta">
            <div className="featured-badges">
              <span className="badge badge-primary">{featuredLabel.toUpperCase()}</span>
              <span className="mono num">N° {card.num}</span>
              <span className="mono year">· {card.year}</span>
            </div>
            <h3 className="featured-name">{card.name}</h3>
            <div className="featured-tag mono">{card.tag}</div>
            <p className="featured-blurb">{card.blurb}</p>
            <div className="featured-kpi">
              <div className="kpi-val">{card.meta}</div>
              <div className="kpi-label mono">{lang === 'es' ? 'impacto medido' : 'measured impact'}</div>
            </div>
            <div className="stack-chips">
              {card.stack.map(s => <span key={s} className="chip mono">{s}</span>)}
            </div>
            <div className="featured-cta mono">{lang === 'es' ? 'click · voltear carta' : 'click · flip card'} ⟲</div>
          </div>
        </div>
        <div className="featured-back">
          <div className="back-pattern"/>
          <div className="back-center">
            <div className="back-label mono">{lang === 'es' ? 'CASO DE ESTUDIO' : 'CASE STUDY'}</div>
            <h4>{card.name}</h4>
            <p>{lang === 'es' ? 'Abre el caso completo para leer la historia del proyecto, decisiones técnicas, capturas y métricas.' : 'Open the full case to read the project story, technical decisions, screenshots and metrics.'}</p>
            <a href="#" onClick={e => e.stopPropagation()} className="btn btn-primary">{lang === 'es' ? 'ver caso →' : 'open case →'}</a>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoteriaCard({ card, flipped, onFlip }) {
  return (
    <div className={`loteria-card ${flipped ? 'flipped' : ''}`} onClick={onFlip}>
      <div className="loteria-inner">
        <div className="loteria-front">
          <div className="loteria-illustration">
            <div className="loteria-icon">{card.icon}</div>
          </div>
          <div className="loteria-caption">
            <div className="loteria-num mono">N° {card.num}</div>
            <div className="loteria-name">{card.name}</div>
            <div className="loteria-tag mono">{card.tag} · {card.year}</div>
          </div>
          <div className="loteria-corners">
            <span/><span/><span/><span/>
          </div>
        </div>
        <div className="loteria-back">
          <div className="loteria-back-inner">
            <div className="loteria-back-num mono">N° {card.num}</div>
            <div className="loteria-back-name">{card.name}</div>
            <p className="loteria-back-blurb">{card.blurb}</p>
            <div className="stack-chips">
              {card.stack.map(s => <span key={s} className="chip mono chip-sm">{s}</span>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Projects({ lang }) {
  const p = COPY[lang].projects;
  const [flipped, setFlipped] = useState({});
  const featured = p.cards.find(c => c.featured);
  const rest = p.cards.filter(c => !c.featured);
  const toggleFlip = (num) => setFlipped(f => ({ ...f, [num]: !f[num] }));

  return (
    <section id="obra" className="projects">
      <Garland pieces={[
        { color: PP.terracota, pattern: 'star' },
        { color: PP.ocre, pattern: 'flower' },
        { color: PP.oxido, pattern: 'heart' },
        { color: PP.rosa, pattern: 'cross' },
        { color: PP.negro, pattern: 'skull' },
        { color: PP.terracota, pattern: 'code' },
      ]}/>
      <div className="section-inner">
        <SectionHeader num="03" label={p.label} title={p.title} subtitle={p.subtitle}/>
        <FeaturedCard card={featured} lang={lang} featuredLabel={p.featured} flipped={!!flipped[featured.num]} onFlip={() => toggleFlip(featured.num)}/>
        <div className="loteria-grid">
          {rest.map(card => (
            <LoteriaCard key={card.num} card={card} flipped={!!flipped[card.num]} onFlip={() => toggleFlip(card.num)}/>
          ))}
        </div>
        <div className="projects-foot">
          <a href="#" className="link-arrow mono">{p.viewAll}</a>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/Projects.jsx
git commit -m "feat: add Projects section component with loteria cards"
```

---

## Task 13: Create Stack component

**Files:**
- Create: `components/sections/Stack.jsx`

- [ ] **Step 1: Create components/sections/Stack.jsx**

```jsx
'use client';
import { useState } from 'react';
import { COPY } from '@/lib/copy';
import { PP, Garland } from '@/components/ornaments/PapelPicado';
import { Vela } from '@/components/ornaments/Vela';
import { SectionHeader } from '@/components/ui/SectionHeader';

export function Stack({ lang }) {
  const s = COPY[lang].stack;
  const [hovered, setHovered] = useState(null);
  return (
    <section id="stack" className="stack">
      <Garland pieces={[
        { color: PP.ocre, pattern: 'star' },
        { color: PP.terracota, pattern: 'flower' },
        { color: PP.oxido, pattern: 'cross' },
        { color: PP.ocre, pattern: 'heart' },
      ]}/>
      <div className="section-inner">
        <SectionHeader num="04" label={s.label} title={s.title} subtitle={s.subtitle}/>
        <div className="stack-hint mono">{s.hint}</div>
        <ol className="stack-list">
          {s.cats.map((cat, i) => (
            <li key={cat.t}
              className={`stack-row ${hovered === i ? 'on' : ''}`}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}>
              <div className="stack-row-num mono">0{i + 1}</div>
              <div className="stack-row-candle">
                <Vela size={36} lit={hovered === i}/>
              </div>
              <div className="stack-row-main">
                <div className="stack-row-title">{cat.t.toUpperCase()}</div>
                <ul className="stack-row-items">
                  {cat.items.map(t => (<li key={t}>{t}</li>))}
                </ul>
              </div>
              <div className="stack-row-count mono">{cat.items.length}</div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/Stack.jsx
git commit -m "feat: add Stack section component"
```

---

## Task 14: Create Contact and Footer components

**Files:**
- Create: `components/sections/Contact.jsx`
- Create: `components/sections/Footer.jsx`

- [ ] **Step 1: Create components/sections/Contact.jsx**

```jsx
'use client';
import { useState } from 'react';
import { COPY } from '@/lib/copy';
import { PP, Garland } from '@/components/ornaments/PapelPicado';
import { Cempasuchil } from '@/components/ornaments/Cempasuchil';
import { Vela } from '@/components/ornaments/Vela';
import { SectionHeader } from '@/components/ui/SectionHeader';

export function Contact({ lang }) {
  const c = COPY[lang].contact;
  const [copied, setCopied] = useState(false);
  const email = 'manlio.tapia@outlook.com';
  const copy = () => {
    navigator.clipboard?.writeText(email).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };
  return (
    <section id="contacto" className="contact">
      <Garland pieces={[
        { color: PP.rosa, pattern: 'heart' },
        { color: PP.ocre, pattern: 'flower' },
        { color: PP.terracota, pattern: 'cross' },
        { color: PP.oxido, pattern: 'skull' },
        { color: PP.negro, pattern: 'star' },
      ]}/>
      <div className="section-inner">
        <SectionHeader num="05" label={c.label} title={c.title} subtitle={c.subtitle}/>
        <div className="contact-card">
          <div className="contact-altar">
            <Cempasuchil size={48}/>
            <Vela size={72} lit/>
            <Cempasuchil size={48}/>
          </div>
          <div className="contact-actions">
            <button className="contact-email" onClick={copy}>
              <span className="mono">{email}</span>
              <span className="contact-copy">{copied ? c.copied : c.emailBtn}</span>
            </button>
            <div className="contact-or mono">{c.or}</div>
            <div className="contact-socials">
              {[
                { k: 'github', l: 'GitHub', ic: 'gh', href: 'https://github.com/Damian-Tapia' },
                { k: 'linkedin', l: 'LinkedIn', ic: 'in', href: 'https://www.linkedin.com/in/mantapia/' },
              ].map(s => (
                <a key={s.k} href={s.href} target="_blank" rel="noopener noreferrer" className="social-chip">
                  <span className="social-ic mono">{s.ic}</span>
                  <span className="social-l">{s.l}</span>
                  <span className="social-arrow">↗</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create components/sections/Footer.jsx**

```jsx
import { COPY } from '@/lib/copy';

export function Footer({ lang }) {
  const c = COPY[lang].contact;
  const y = new Date().getFullYear();
  return (
    <footer className="footer mono">
      <div className="footer-inner">
        <span>{c.footer}{y}</span>
        <span className="footer-r">♦ Damian Tapia</span>
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add components/sections/Contact.jsx components/sections/Footer.jsx
git commit -m "feat: add Contact and Footer section components"
```

---

## Task 15: Create app/page.js

**Files:**
- Create: `app/page.js`

- [ ] **Step 1: Create app/page.js**

```jsx
'use client';
import { useState, useEffect } from 'react';
import { Loader } from '@/components/sections/Loader';
import { Nav } from '@/components/sections/Nav';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Projects } from '@/components/sections/Projects';
import { Stack } from '@/components/sections/Stack';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/sections/Footer';
import { FallingPetals } from '@/components/ui/FallingPetals';

const TWEAKS = {
  lang: 'es',
  palette: 'tierra',
  petals: false,
  loaderMs: 3000,
};

export default function Home() {
  const [lang, setLang] = useState(TWEAKS.lang);
  const [palette, setPalette] = useState(TWEAKS.palette);
  const [petals, setPetals] = useState(TWEAKS.petals);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-palette', palette);
    document.documentElement.lang = lang;
  }, [palette, lang]);

  useEffect(() => {
    const onMsg = (e) => {
      if (!e.data || typeof e.data !== 'object') return;
      if (e.data.type === '__activate_edit_mode') setEditMode(true);
      if (e.data.type === '__deactivate_edit_mode') setEditMode(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);

  const persist = (patch) => {
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits: patch }, '*');
  };

  return (
    <>
      {loading && <Loader onDone={() => setLoading(false)} durationMs={TWEAKS.loaderMs} lang={lang}/>}
      {petals && !loading && <FallingPetals on={petals} count={14}/>}
      <Nav lang={lang} setLang={(l) => { setLang(l); persist({ lang: l }); }}
           palette={palette} setPalette={(p) => { setPalette(p); persist({ palette: p }); }}/>
      <main>
        <Hero lang={lang}/>
        <About lang={lang}/>
        <Projects lang={lang}/>
        <Stack lang={lang}/>
        <Contact lang={lang}/>
      </main>
      <Footer lang={lang}/>

      {editMode && (
        <div className="tweaks-panel">
          <h3>Tweaks</h3>
          <div className="tweak-row">
            <label>idioma</label>
            <select value={lang} onChange={e => { setLang(e.target.value); persist({ lang: e.target.value }); }}>
              <option value="es">Español</option>
              <option value="en">English</option>
            </select>
          </div>
          <div className="tweak-row">
            <label>paleta</label>
            <select value={palette} onChange={e => { setPalette(e.target.value); persist({ palette: e.target.value }); }}>
              <option value="tierra">Tierra</option>
              <option value="noche">Noche</option>
              <option value="festivo">Festivo</option>
            </select>
          </div>
          <div className="tweak-row">
            <label>pétalos</label>
            <button className={`toggle-btn ${petals ? 'on' : ''}`} onClick={() => { const next = !petals; setPetals(next); persist({ petals: next }); }}>
              {petals ? 'ON' : 'OFF'}
            </button>
          </div>
          <div className="tweak-row">
            <label>replay loader</label>
            <button onClick={() => { setLoading(true); setTimeout(() => setLoading(false), TWEAKS.loaderMs + 800); }}>▶</button>
          </div>
        </div>
      )}
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/page.js
git commit -m "feat: add main App page with full state and section tree"
```

---

## Task 16: Stub projects route

**Files:**
- Create: `app/projects/[slug]/page.js`

- [ ] **Step 1: Create app/projects/[slug]/page.js**

```jsx
export default function ProjectPage({ params }) {
  return (
    <main style={{ padding: '120px 40px', fontFamily: 'var(--font-mono)', color: 'var(--c-tinta)' }}>
      <p>Case study coming soon: {params.slug}</p>
    </main>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/projects/
git commit -m "feat: stub case study route at /projects/[slug]"
```

---

## Task 17: Update .gitignore and run dev server

**Files:**
- Modify: `.gitignore`

- [ ] **Step 1: Update .gitignore**

Add these lines to `.gitignore`:

```
# Next.js
.next/
out/

# Dependencies
node_modules/
```

- [ ] **Step 2: Start the dev server**

Run: `npm run dev`

Expected output:
```
▲ Next.js 14.x.x
- Local: http://localhost:3000
✓ Ready in Xs
```

- [ ] **Step 3: Open the browser and verify each section**

Navigate to `http://localhost:3000` and check:
- [ ] Loader animation plays and fades out
- [ ] Nav renders with correct links and lang toggle works (ES ↔ EN)
- [ ] Hero section renders with garland and flowers
- [ ] About section renders with portrait placeholder and meta table
- [ ] Projects section renders featured card + 3 lotería cards; clicking flips them
- [ ] Stack section renders all 7 rows; hovering lights the candle
- [ ] Contact section renders altar, email copy button, and social links
- [ ] Footer renders correctly
- [ ] No errors in the browser console

- [ ] **Step 4: Commit**

```bash
git add .gitignore
git commit -m "chore: update .gitignore for Next.js"
```

---

## Done

The old `index.html`, `Portafolio.html`, and `hifi/` directory are no longer the entry point but are safe to keep as reference. Once you've confirmed everything works correctly in Next.js, you can archive or remove them at your discretion.
