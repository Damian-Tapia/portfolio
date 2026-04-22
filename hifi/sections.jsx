'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { COPY } from './copy.jsx';
import { PP, Papel, Garland, Cempasuchil, Vela } from './papel-picado.jsx';

// ─── LOADER ──────────────────────────────────────────────
function Loader({ onDone, durationMs = 3000, lang }) {
  const t = COPY[lang].loader;
  const [step, setStep] = useState(0); // 0=dark, 1=candle, 2=papers, 3=ready
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 200);
    const t2 = setTimeout(() => setStep(2), durationMs * 0.35);
    const t3 = setTimeout(() => setStep(3), durationMs * 0.75);
    const t4 = setTimeout(() => setExiting(true), durationMs);
    const t5 = setTimeout(() => onDone(), durationMs + 600);
    return () => [t1,t2,t3,t4,t5].forEach(clearTimeout);
  }, [durationMs, onDone]);

  const msgs = [t.step1, t.step2, t.step3, t.ready];
  const palette = [PP.terracota, PP.ocre, PP.oxido, PP.rosa, PP.negro];
  const pats = ['code','flower','skull','cross','star'];

  return (
    <div className="loader" data-exiting={exiting}>
      <div className="loader-bg"/>
      <div className="loader-inner">
        {/* papers row */}
        <div className="loader-papers">
          {palette.map((c, i) => (
            <div key={i} className="loader-paper" data-show={step >= 2} style={{ animationDelay: `${i * 0.1}s` }}>
              <Papel id={`load-${i}`} color={c} pattern={pats[i]} w={96} h={78}/>
            </div>
          ))}
        </div>
        {/* candle */}
        <div className="loader-candle" data-show={step >= 1}>
          <Vela size={52} lit={step >= 1}/>
        </div>
        {/* status text */}
        <div className="loader-status">
          <div className="loader-msg" key={step}>{msgs[Math.min(step, 3)]}</div>
          <div className="loader-bar">
            <div className="loader-bar-fill" style={{ width: `${Math.min(100, (step+1) * 28)}%` }}/>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── NAV ──────────────────────────────────────────────
function Nav({ lang, setLang, palette, setPalette }) {
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

// ─── HERO ──────────────────────────────────────────────
function Hero({ lang }) {
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

// ─── ABOUT ──────────────────────────────────────────────
function About({ lang }) {
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

// ─── PROJECTS (Lotería) ──────────────────────────────────
function Projects({ lang }) {
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

        {/* Featured loteria card — big */}
        <FeaturedCard card={featured} lang={lang} featuredLabel={p.featured} flipped={!!flipped[featured.num]} onFlip={() => toggleFlip(featured.num)}/>

        {/* Grid of rest */}
        <div className="loteria-grid">
          {rest.map(card => (
            <LoteriaCard key={card.num} card={card} lang={lang} flipped={!!flipped[card.num]} onFlip={() => toggleFlip(card.num)}/>
          ))}
        </div>

        <div className="projects-foot">
          <a href="#" className="link-arrow mono">{p.viewAll}</a>
        </div>
      </div>
    </section>
  );
}

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
            <Link href={`/proyectos/${card.slug}`} onClick={e => e.stopPropagation()} className="btn btn-primary">{lang === 'es' ? 'ver caso →' : 'open case →'}</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoteriaCard({ card, lang, flipped, onFlip }) {
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
            <Link
              href={`/proyectos/${card.slug}`}
              onClick={e => e.stopPropagation()}
              className="btn btn-primary loteria-case-btn"
            >
              {lang === 'es' ? 'ver caso →' : 'open case →'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── STACK (editorial — from direction C) ─────────────────
function Stack({ lang }) {
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
              <div className="stack-row-num mono">0{i+1}</div>
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

// ─── CONTACT ──────────────────────────────────────────────
function Contact({ lang }) {
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

function Footer({ lang }) {
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

// ─── SHARED SECTION HEADER ─────────────────────────────────
function SectionHeader({ num, label, title, subtitle }) {
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

// ─── FALLING PETALS ────────────────────────────────────────
function FallingPetals({ on = true, count = 16 }) {
  const petals = React.useMemo(() =>
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

export { Loader, Nav, Hero, About, Projects, Stack, Contact, Footer, FallingPetals };
