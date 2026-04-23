# Portafolio · Día de Muertos

Portafolio personal de desarrollador web con temática de Día de Muertos.
Paleta tierra mexicana · papeles picados · veladoras · cartas de lotería.

## Stack

Next.js 14 (App Router) · React 18 · CSS custom properties. Sin dependencias de UI externas.

## Estructura

```
├── app/
│   ├── layout.jsx              # root layout, importa estilos globales
│   ├── page.jsx                # página principal
│   └── proyectos/[slug]/       # rutas de casos de estudio
├── hifi/
│   ├── tokens.css              # paleta + tipografía
│   ├── styles.css              # estilos globales
│   ├── copy.jsx                # textos ES/EN
│   ├── papel-picado.jsx        # papeles picados, veladoras, cempasúchiles
│   └── sections.jsx            # todos los componentes (Loader, Nav, Hero, About, Projects, Stack, Contact, Footer)
├── next.config.js
└── package.json
```

## Correr localmente

```bash
npm install
npm run dev
```

→ `http://localhost:3000`

## Build de producción

```bash
npm run build
npm run start
```

## Licencia
© 2026 Manlio Damián Tapia
