'use client';
import { useState, useEffect } from 'react';
import { Loader, Nav, Hero, About, Projects, Stack, Contact, Footer, FallingPetals } from '../hifi/sections.jsx';

const TWEAKS = {
  lang: 'es',
  palette: 'tierra',
  petals: false,
  loaderMs: 3000,
};

export default function Page() {
  const [lang, setLang] = useState(TWEAKS.lang);
  const [palette, setPalette] = useState(TWEAKS.palette);
  const [petals] = useState(TWEAKS.petals);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.documentElement.setAttribute('data-palette', palette);
    document.documentElement.lang = lang;
  }, [palette, lang]);

  return (
    <>
      {loading && (
        <Loader onDone={() => setLoading(false)} durationMs={TWEAKS.loaderMs} lang={lang} />
      )}
      {petals && !loading && <FallingPetals on={petals} count={14} />}
      <Nav lang={lang} setLang={setLang} palette={palette} setPalette={setPalette} />
      <main>
        <Hero lang={lang} />
        <About lang={lang} />
        <Projects lang={lang} />
        <Stack lang={lang} />
        <Contact lang={lang} />
      </main>
      <Footer lang={lang} />
    </>
  );
}
