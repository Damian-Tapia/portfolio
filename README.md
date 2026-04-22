# Portafolio · Día de Muertos

Portafolio personal de desarrollador web con temática de Día de Muertos.
Paleta tierra mexicana · papeles picados · veladoras · cartas de lotería.

**Live:** https://damian-tapia.github.io/portfolio/

## Stack
HTML estático + React 18 (via CDN) + Babel standalone. Sin build step.

## Estructura
```
├── index.html                # entry point (= Portafolio.html)
├── Portafolio.html
├── hifi/
│   ├── tokens.css            # paleta + tipografía
│   ├── styles.css            # estilos globales
│   ├── copy.jsx              # textos ES/EN
│   ├── ornaments.jsx         # papeles picados, veladoras, cempasúchiles
│   ├── loader.jsx            # animación de entrada
│   ├── sections.jsx          # hero, about, projects, stack, contact
│   └── tweaks.jsx            # panel de tweaks (idioma, paleta, pétalos)
└── wireframes/               # wireframes low-fi iniciales
```

## Correr localmente
Carga `.jsx` vía Babel standalone, necesita servidor local:

```bash
python3 -m http.server 8000
# o
npx serve .
```

→ `http://localhost:8000/`

## Subir a GitHub (este repo)

```bash
git init
git add .
git commit -m "v0.1 portafolio día de muertos"
git branch -M main
git remote add origin git@github.com:Damian-Tapia/portfolio.git
git push -u origin main
```

## Activar GitHub Pages

1. **Settings → Pages**
2. **Source:** Deploy from a branch
3. **Branch:** `main` · **Folder:** `/ (root)` · Save
4. Espera ~1 min → `https://damian-tapia.github.io/portfolio/`

## Licencia
© 2026 Manlio Damián Tapia
