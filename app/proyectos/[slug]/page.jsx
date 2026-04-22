import Link from 'next/link';
import { notFound } from 'next/navigation';
import { COPY } from '../../../hifi/copy.jsx';
import './case-study.css';

export function generateStaticParams() {
  return COPY.es.projects.cards.map(c => ({ slug: c.slug }));
}

export function generateMetadata({ params }) {
  const card = COPY.es.projects.cards.find(c => c.slug === params.slug);
  if (!card) return {};
  return { title: `${card.name} · Caso de estudio · Damian Tapia` };
}

export default function CaseStudyPage({ params }) {
  const card = COPY.es.projects.cards.find(c => c.slug === params.slug);
  if (!card) notFound();

  return (
    <div className="cs-root">
      {/* Nav */}
      <nav className="cs-nav">
        <Link href="/#obra" className="cs-back mono">← volver</Link>
        <span className="cs-nav-tag mono">{card.tag}</span>
      </nav>

      {/* Hero */}
      <header className="cs-hero">
        <div className="cs-icon">{card.icon}</div>
        <div className="cs-num mono">N° {card.num}</div>
        <h1 className="cs-title">{card.name}</h1>
        <div className="cs-subtitle mono">{card.tag} · {card.year}</div>
        <div className="stack-chips cs-chips">
          {card.stack.map(s => <span key={s} className="chip mono">{s}</span>)}
        </div>
        {card.meta && (
          <div className="cs-kpi">
            <div className="kpi-val">{card.meta}</div>
            <div className="kpi-label mono">impacto medido</div>
          </div>
        )}
      </header>

      {/* Body */}
      <main className="cs-body">

        <section className="cs-section">
          <h2 className="cs-section-title">
            <span className="cs-section-num mono">01 —</span> Descripción
          </h2>
          <p className="cs-p">{card.blurb}</p>
        </section>

        <section className="cs-section">
          <h2 className="cs-section-title">
            <span className="cs-section-num mono">02 —</span> Rol y contexto
          </h2>
          <p className="cs-p cs-placeholder">
            {/* ✏️ Agrega aquí tu descripción del rol, el equipo, el cliente y el contexto del proyecto. */}
            Escribe aquí tu descripción del rol, el equipo, el cliente y el contexto del proyecto.
          </p>
        </section>

        <section className="cs-section">
          <h2 className="cs-section-title">
            <span className="cs-section-num mono">03 —</span> Desafíos
          </h2>
          <p className="cs-p cs-placeholder">
            {/* ✏️ Describe los principales retos técnicos o de diseño que enfrentaste. */}
            Describe los principales retos técnicos o de diseño que enfrentaste.
          </p>
        </section>

        <section className="cs-section">
          <h2 className="cs-section-title">
            <span className="cs-section-num mono">04 —</span> Decisiones clave
          </h2>
          <p className="cs-p cs-placeholder">
            {/* ✏️ Explica las decisiones de arquitectura, diseño o tecnología más importantes. */}
            Explica las decisiones de arquitectura, diseño o tecnología más importantes.
          </p>
        </section>

        <section className="cs-section">
          <h2 className="cs-section-title">
            <span className="cs-section-num mono">05 —</span> Resultados
          </h2>
          <p className="cs-p cs-placeholder">
            {/* ✏️ Comparte métricas, feedback del cliente o impacto medible. */}
            Comparte métricas, feedback del cliente o impacto medible.
          </p>
        </section>

      </main>

      {/* Footer */}
      <footer className="cs-footer">
        <Link href="/#obra" className="btn btn-ghost cs-footer-back">← volver a proyectos</Link>
        <span className="mono cs-footer-copy">© {new Date().getFullYear()} Damian Tapia</span>
      </footer>
    </div>
  );
}
