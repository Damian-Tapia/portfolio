// Wireframe layouts for the 4 directions.
// Shared "sketchy" aesthetic — Kalam / Caveat headings, placeholder boxes,
// tierra mexicana palette used as accents only (editorial modern tone).

const C = PP_COLORS;

// ─────────────────────────────────────────────────────────────
// Shared wireframe primitives
// ─────────────────────────────────────────────────────────────
const wfFont = `'Caveat', 'Kalam', 'Comic Sans MS', cursive`;
const wfBody = `'Kalam', 'Caveat', system-ui, sans-serif`;

function Box({ children, h = 40, bg = 'transparent', border = `1.5px dashed ${C.negro}`, style = {}, label }) {
  return (
    <div style={{
      height: h, border, borderRadius: 2, background: bg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: wfBody, fontSize: 12, color: C.negro, opacity: 0.75,
      padding: '4px 8px', textAlign: 'center', ...style,
    }}>{children || label}</div>
  );
}

function ScribbleLine({ w = '100%', opacity = 0.5, color = C.negro, h = 2 }) {
  return <div style={{ width: w, height: h, background: color, opacity, borderRadius: 2 }} />;
}

function ScribbleLines({ count = 3, widths = ['100%', '90%', '60%'], color = C.negro, gap = 6 }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap }}>
      {[...Array(count)].map((_, i) => (
        <ScribbleLine key={i} w={widths[i % widths.length]} color={color} />
      ))}
    </div>
  );
}

function ImgPlaceholder({ h = 120, w = '100%', label = 'image', style = {} }) {
  return (
    <div style={{
      width: w, height: h, border: `1.5px solid ${C.negro}`,
      background: `repeating-linear-gradient(45deg, transparent, transparent 6px, ${C.negro}15 6px, ${C.negro}15 7px)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'monospace', fontSize: 10, color: C.negro, opacity: 0.7,
      position: 'relative', ...style,
    }}>
      <span style={{ background: C.hueso, padding: '2px 6px' }}>{label}</span>
    </div>
  );
}

function Annot({ children, style = {} }) {
  return (
    <div style={{
      fontFamily: wfFont, fontSize: 13, color: C.oxido,
      fontStyle: 'italic', ...style,
    }}>{children}</div>
  );
}

// A mini rendering of a papel picado in wireframe form
function WFPapel({ color = C.terracota, w = 80, h = 50, pattern = 'code', opacity = 0.7, style = {} }) {
  const syms = { code: '</>', skull: '☠', flower: '✦', geo: '◇', cempa: '✿' };
  return (
    <div style={{ display: 'inline-block', position: 'relative', ...style }}>
      <svg width={w} height={h + 8} viewBox={`0 0 ${w} ${h + 8}`}>
        <path d={`M0 0 L${w} 0 L${w} ${h} Q${w*0.83} ${h+6}, ${w*0.66} ${h} Q${w*0.5} ${h+6}, ${w*0.33} ${h} Q${w*0.16} ${h+6}, 0 ${h} Z`}
          fill={color} opacity={opacity}/>
        <text x={w/2} y={h/2 + 5} textAnchor="middle" fontSize={h*0.4} fontWeight="bold" fill={C.hueso} fontFamily="monospace">{syms[pattern]}</text>
      </svg>
    </div>
  );
}

// String of papeles across the top
function WFGarland({ count = 5, colors = [C.terracota, C.ocre, C.oxido, C.rosa, C.negro], patterns = ['code','skull','flower','geo','cempa'], w = 360, style = {} }) {
  return (
    <div style={{ position: 'relative', width: w, height: 70, ...style }}>
      <svg width={w} height={12} style={{ position: 'absolute', top: 4, left: 0 }}>
        <path d={`M0 4 Q${w/2} 14, ${w} 4`} stroke={C.negro} strokeWidth="0.8" fill="none" strokeDasharray="2 2" opacity="0.5"/>
      </svg>
      <div style={{ display: 'flex', justifyContent: 'space-around', paddingTop: 8 }}>
        {[...Array(count)].map((_, i) => (
          <div key={i} style={{ transform: `rotate(${i%2===0?-3:3}deg) translateY(${(i%3)*2}px)`, transformOrigin: 'top center' }}>
            <WFPapel color={colors[i % colors.length]} pattern={patterns[i % patterns.length]}/>
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionLabel({ num, title, en, style = {} }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 8, ...style }}>
      <span style={{ fontFamily: 'monospace', fontSize: 10, color: C.oxido, background: C.hueso, padding: '1px 4px', border: `1px solid ${C.oxido}` }}>{num}</span>
      <span style={{ fontFamily: wfFont, fontSize: 17, color: C.negro, fontWeight: 600 }}>{title}</span>
      <span style={{ fontFamily: wfBody, fontSize: 11, color: C.oxido, fontStyle: 'italic' }}>· {en}</span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// DIRECTION A — Editorial clásico · centrado · cada sección cuelga de su propio papel picado
// ─────────────────────────────────────────────────────────────
function DirectionA() {
  const W = 360;
  return (
    <div style={{ width: W, padding: '16px 20px', fontFamily: wfBody, color: C.negro, background: C.hueso, height: '100%', overflowY: 'auto' }}>

      {/* Nav */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, paddingBottom: 8, borderBottom: `1px solid ${C.negro}22` }}>
        <div style={{ fontFamily: wfFont, fontSize: 16, fontWeight: 700 }}>NOMBRE.dev</div>
        <div style={{ display: 'flex', gap: 10, fontSize: 10, fontFamily: 'monospace' }}>
          <span>inicio</span><span>sobre</span><span>obra</span><span>stack</span><span>contacto</span>
        </div>
      </div>

      {/* LOADER */}
      <SectionLabel num="00" title="Loader" en="opening"/>
      <div style={{ border: `1.5px dashed ${C.negro}`, padding: 12, marginBottom: 16, position: 'relative', background: C.negro+'05' }}>
        <Annot style={{ marginBottom: 8, fontSize: 11 }}>secuencia: vela → papeles picados → hero</Annot>
        <div style={{ display: 'flex', gap: 6, alignItems: 'flex-end', justifyContent: 'space-around', height: 80 }}>
          <div style={{ textAlign: 'center' }}>
            <Vela size={22} lit={false}/>
            <div style={{ fontSize: 9, fontFamily: 'monospace' }}>t=0</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Vela size={22} lit/>
            <div style={{ fontSize: 9, fontFamily: 'monospace' }}>t=1s</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <WFGarland count={3} w={90} style={{ height: 40 }}/>
            <div style={{ fontSize: 9, fontFamily: 'monospace' }}>t=2s</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Box h={36} style={{ width: 70 }} label="HERO"/>
            <div style={{ fontSize: 9, fontFamily: 'monospace' }}>t=3s</div>
          </div>
        </div>
      </div>

      {/* HERO */}
      <SectionLabel num="01" title="Hero" en="intro"/>
      <WFGarland w={W-40}/>
      <div style={{ textAlign: 'center', padding: '18px 0 24px' }}>
        <div style={{ fontFamily: 'monospace', fontSize: 9, color: C.oxido, marginBottom: 6, letterSpacing: 2 }}>// DESARROLLADOR WEB</div>
        <div style={{ fontFamily: wfFont, fontSize: 34, fontWeight: 700, lineHeight: 1, color: C.negro }}>Tu Nombre</div>
        <div style={{ fontFamily: wfFont, fontSize: 18, color: C.terracota, margin: '4px 0 10px' }}>Aquí descansa el código</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'center', fontSize: 10, fontFamily: wfBody, opacity: 0.7, maxWidth: 240, margin: '0 auto' }}>
          <ScribbleLine w="100%"/><ScribbleLine w="80%"/>
        </div>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 14 }}>
          <Box h={28} style={{ width: 90, background: C.terracota, color: C.hueso, border: 'none' }}>ver obras</Box>
          <Box h={28} style={{ width: 90 }}>contacto</Box>
        </div>
        <div style={{ marginTop: 16, display: 'flex', justifyContent: 'center', gap: 4 }}>
          <Cempasuchil size={16}/><Cempasuchil size={20}/><Cempasuchil size={16}/>
        </div>
      </div>

      {/* ACERCA DE */}
      <SectionLabel num="02" title="Acerca de mí" en="about"/>
      <WFGarland w={W-40} count={4} patterns={['skull','flower','skull','flower']} colors={[C.ocre,C.oxido,C.ocre,C.oxido]}/>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 8, marginBottom: 20 }}>
        <ImgPlaceholder h={140} label="foto dev"/>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ fontFamily: wfFont, fontSize: 16, fontWeight: 700 }}>La ofrenda</div>
          <ScribbleLines count={5} widths={['100%','95%','88%','100%','50%']}/>
          <div style={{ fontFamily: 'monospace', fontSize: 9, color: C.oxido, marginTop: 4 }}>→ cv.pdf</div>
        </div>
      </div>

      {/* PROYECTOS — Lotería */}
      <SectionLabel num="03" title="Proyectos" en="works"/>
      <WFGarland w={W-40} count={6} patterns={['code','code','code','code','code','code']} colors={[C.terracota,C.ocre,C.oxido,C.terracota,C.ocre,C.oxido]}/>
      <Annot style={{ marginBottom: 8 }}>cartas de lotería · hover = se voltea</Annot>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 20 }}>
        {['EL CÓDIGO','LA APP','EL BOT','LA TIENDA','EL DASH','LA API'].map((n,i) => (
          <div key={i} style={{ border: `1.5px solid ${C.negro}`, background: C.hueso, padding: 4, aspectRatio: '0.72' }}>
            <div style={{ border: `1px solid ${C.oxido}`, height: '55%', background: `repeating-linear-gradient(45deg, transparent, transparent 3px, ${C.oxido}22 3px, ${C.oxido}22 4px)`, marginBottom: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>
              {['💻','📱','🤖','🛒','📊','⚡'][i]}
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 7, fontFamily: 'monospace', color: C.oxido }}>N° {i+1}</div>
              <div style={{ fontFamily: wfFont, fontSize: 10, fontWeight: 700 }}>{n}</div>
            </div>
          </div>
        ))}
      </div>

      {/* STACK — Veladoras */}
      <SectionLabel num="04" title="Stack técnico" en="tools"/>
      <WFGarland w={W-40} count={5} patterns={['cempa','cempa','cempa','cempa','cempa']} colors={[C.ocre,C.ocre,C.ocre,C.ocre,C.ocre]}/>
      <Annot style={{ marginBottom: 6 }}>altar de veladoras · hover = prende</Annot>
      <div style={{ background: C.negro+'08', padding: '12px 6px', borderRadius: 2 }}>
        <div style={{ fontSize: 9, fontFamily: 'monospace', color: C.oxido, marginBottom: 4 }}>frontend</div>
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end', marginBottom: 10 }}>
          {['React','Vue','TS','Next','Tail'].map((n,i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <Vela size={18} lit={i===0}/>
              <div style={{ fontSize: 8, fontFamily: 'monospace' }}>{n}</div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 9, fontFamily: 'monospace', color: C.oxido, marginBottom: 4 }}>backend</div>
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end' }}>
          {['Node','Py','Go','PG','Redis'].map((n,i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <Vela size={18} lit={false}/>
              <div style={{ fontSize: 8, fontFamily: 'monospace' }}>{n}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CONTACTO */}
      <SectionLabel num="05" title="Contacto" en="contact" style={{ marginTop: 18 }}/>
      <WFGarland w={W-40} count={4} patterns={['flower','skull','flower','skull']} colors={[C.rosa,C.negro,C.rosa,C.negro]}/>
      <div style={{ border: `1.5px solid ${C.negro}`, padding: 14, textAlign: 'center', marginTop: 4, background: `${C.ocre}10` }}>
        <Vela size={20} lit style={{ marginBottom: 4 }}/>
        <div style={{ fontFamily: wfFont, fontSize: 16, fontWeight: 700, margin: '4px 0' }}>Deja tu ofrenda</div>
        <Annot style={{ fontSize: 10, marginBottom: 8 }}>una vela encendida + form</Annot>
        <Box h={28} label="nombre" style={{ marginBottom: 4, background: C.hueso }}/>
        <Box h={28} label="email" style={{ marginBottom: 4, background: C.hueso }}/>
        <Box h={50} label="mensaje" style={{ marginBottom: 8, background: C.hueso }}/>
        <Box h={30} style={{ background: C.oxido, color: C.hueso, border: 'none' }}>encender vela →</Box>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: 10, fontSize: 10, fontFamily: 'monospace' }}>
          <span>[gh]</span><span>[in]</span><span>[x]</span><span>[@]</span>
        </div>
      </div>

      <div style={{ fontSize: 9, fontFamily: 'monospace', textAlign: 'center', marginTop: 14, opacity: 0.5 }}>
        © 2026 · descansa en paz el bug
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// DIRECTION B — Asimétrico · tipografía gigante · hero a pantalla completa
// ─────────────────────────────────────────────────────────────
function DirectionB() {
  const W = 360;
  return (
    <div style={{ width: W, fontFamily: wfBody, color: C.negro, background: C.hueso, height: '100%', overflowY: 'auto' }}>

      {/* Nav fijo */}
      <div style={{ position: 'sticky', top: 0, background: C.hueso, padding: '10px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 2, borderBottom: `1px solid ${C.negro}22` }}>
        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          <div style={{ width: 8, height: 8, background: C.terracota, borderRadius: 4 }}/>
          <div style={{ fontFamily: 'monospace', fontSize: 10, fontWeight: 700 }}>N.dev</div>
        </div>
        <div style={{ fontSize: 9, fontFamily: 'monospace' }}>menú ≡</div>
      </div>

      {/* LOADER preview */}
      <div style={{ padding: '10px 16px 0' }}>
        <SectionLabel num="00" title="Loader" en="intro sequence"/>
        <div style={{ border: `1.5px dashed ${C.oxido}`, padding: 10, marginBottom: 14, background: C.negro, color: C.hueso, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 4, left: 4, fontSize: 8, fontFamily: 'monospace', color: C.ocre }}>00:00:02</div>
          <div style={{ textAlign: 'center', padding: '14px 0' }}>
            <Vela size={26} lit/>
            <div style={{ fontFamily: wfFont, fontSize: 14, color: C.ocre, marginTop: 4 }}>encendiendo…</div>
            <div style={{ fontFamily: 'monospace', fontSize: 8, opacity: 0.6, marginTop: 2 }}>load_portfolio.sh</div>
          </div>
          <div style={{ position: 'absolute', bottom: 6, left: 6, right: 6, height: 3, background: C.negro }}>
            <div style={{ width: '60%', height: '100%', background: C.terracota }}/>
          </div>
        </div>
      </div>

      {/* HERO asimétrico */}
      <div style={{ padding: '0 16px 24px', position: 'relative' }}>
        <SectionLabel num="01" title="Hero" en="statement"/>
        <div style={{ position: 'relative', minHeight: 320 }}>
          <WFGarland w={W-32} count={3} style={{ marginBottom: 8 }} patterns={['code','skull','flower']} colors={[C.terracota,C.negro,C.oxido]}/>
          <div style={{ fontFamily: 'monospace', fontSize: 8, color: C.oxido, marginTop: 6 }}>01 — PRESENTE</div>
          <div style={{ fontFamily: wfFont, fontSize: 56, fontWeight: 800, lineHeight: 0.9, color: C.negro, letterSpacing: -1 }}>
            Construyo
          </div>
          <div style={{ fontFamily: wfFont, fontSize: 56, fontWeight: 800, lineHeight: 0.9, color: C.terracota, fontStyle: 'italic', marginLeft: 40 }}>
            web para
          </div>
          <div style={{ fontFamily: wfFont, fontSize: 56, fontWeight: 800, lineHeight: 0.9, color: C.negro }}>
            los vivos.
          </div>
          {/* floating cempasuchiles */}
          <div style={{ position: 'absolute', top: 70, right: 10 }}><Cempasuchil size={28}/></div>
          <div style={{ position: 'absolute', top: 160, right: 50 }}><Cempasuchil size={18} color={C.oxido}/></div>
          <div style={{ position: 'absolute', top: 210, right: 15 }}><Cempasuchil size={22}/></div>

          <div style={{ marginTop: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div style={{ maxWidth: 160 }}>
              <ScribbleLines count={3} widths={['100%','85%','70%']}/>
            </div>
            <div style={{ fontFamily: 'monospace', fontSize: 9, color: C.negro, textAlign: 'right' }}>
              <div>scroll ↓</div>
              <div style={{ opacity: 0.5 }}>6 secciones</div>
            </div>
          </div>
        </div>
      </div>

      {/* ACERCA DE — full bleed con número gigante */}
      <div style={{ background: C.negro, color: C.hueso, padding: '18px 16px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -20, right: -10, fontFamily: wfFont, fontSize: 160, fontWeight: 900, opacity: 0.12, color: C.ocre }}>02</div>
        <SectionLabel num="02" title="Acerca de mí" en="about" style={{ color: C.hueso }}/>
        <div style={{ fontFamily: wfFont, fontSize: 22, fontWeight: 700, marginBottom: 8, color: C.ocre }}>Aquí yace</div>
        <ImgPlaceholder h={100} label="retrato b&w" style={{ marginBottom: 10, background: `repeating-linear-gradient(45deg, transparent, transparent 6px, ${C.hueso}15 6px, ${C.hueso}15 7px)`, borderColor: C.hueso }}/>
        <ScribbleLines count={4} widths={['100%','92%','88%','50%']} color={C.hueso}/>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginTop: 12, fontSize: 9, fontFamily: 'monospace' }}>
          <div><div style={{ fontSize: 20, fontWeight: 700, color: C.ocre, fontFamily: wfFont }}>5+</div>años</div>
          <div><div style={{ fontSize: 20, fontWeight: 700, color: C.ocre, fontFamily: wfFont }}>40+</div>proyectos</div>
          <div><div style={{ fontSize: 20, fontWeight: 700, color: C.ocre, fontFamily: wfFont }}>∞</div>cafés</div>
        </div>
      </div>

      {/* PROYECTOS — Lotería scroll horizontal */}
      <div style={{ padding: '18px 0 20px' }}>
        <div style={{ padding: '0 16px' }}>
          <SectionLabel num="03" title="Proyectos" en="obra"/>
          <Annot style={{ marginBottom: 8 }}>scroll horizontal · loteria style · click = voltea</Annot>
        </div>
        <div style={{ display: 'flex', gap: 10, padding: '0 16px', overflowX: 'hidden' }}>
          {['EL CÓDIGO','LA APP','EL BOT','LA TIENDA'].map((n,i) => (
            <div key={i} style={{ flexShrink: 0, width: 140, border: `2px solid ${C.negro}`, background: C.hueso, padding: 6, transform: i===1?'rotate(-2deg)':i===2?'rotate(1deg)':'none' }}>
              <div style={{ border: `1px solid ${C.oxido}`, height: 110, background: `repeating-linear-gradient(45deg, transparent, transparent 4px, ${C.oxido}22 4px, ${C.oxido}22 5px)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, marginBottom: 4 }}>
                {['💻','📱','🤖','🛒'][i]}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 8, fontFamily: 'monospace' }}>N°{i+1}</span>
                <span style={{ fontFamily: wfFont, fontSize: 13, fontWeight: 700 }}>{n}</span>
              </div>
              <ScribbleLines count={2} widths={['100%','80%']} gap={3}/>
            </div>
          ))}
        </div>
        <div style={{ padding: '8px 16px 0', display: 'flex', justifyContent: 'space-between', fontSize: 9, fontFamily: 'monospace', color: C.oxido }}>
          <span>← →</span><span>01 / 08</span>
        </div>
      </div>

      {/* STACK — altar horizontal */}
      <div style={{ padding: '18px 16px', background: `${C.ocre}15`, borderTop: `1px solid ${C.oxido}44`, borderBottom: `1px solid ${C.oxido}44` }}>
        <SectionLabel num="04" title="Stack" en="altar de herramientas"/>
        <Annot style={{ marginBottom: 10 }}>altar de 3 niveles · velas prenden al hover</Annot>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { lvl: 'frontend', items: ['React','Vue','TS','Next','Tail'] },
            { lvl: 'backend', items: ['Node','Py','Go','PG'] },
            { lvl: 'tools', items: ['Git','Docker','AWS','Figma','Vim'] },
          ].map((row,i) => (
            <div key={i} style={{ borderBottom: `2px solid ${C.oxido}`, paddingBottom: 6 }}>
              <div style={{ fontSize: 9, fontFamily: 'monospace', color: C.oxido, marginBottom: 3 }}>nivel {i+1} · {row.lvl}</div>
              <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end' }}>
                {row.items.map((t,j) => (
                  <div key={j} style={{ textAlign: 'center' }}>
                    <Vela size={16} lit={j===0}/>
                    <div style={{ fontSize: 8, fontFamily: 'monospace' }}>{t}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CONTACTO — dramático */}
      <div style={{ padding: '24px 16px 30px', textAlign: 'center', background: C.negro, color: C.hueso, position: 'relative' }}>
        <WFGarland w={W-32} count={4} patterns={['flower','skull','flower','skull']} colors={[C.rosa,C.ocre,C.rosa,C.ocre]}/>
        <SectionLabel num="05" title="Contacto" en="ofrenda" style={{ color: C.hueso, justifyContent: 'center' }}/>
        <div style={{ fontFamily: wfFont, fontSize: 36, fontWeight: 800, lineHeight: 1, margin: '8px 0', color: C.ocre }}>¿Trabajamos</div>
        <div style={{ fontFamily: wfFont, fontSize: 36, fontWeight: 800, lineHeight: 1, color: C.hueso, fontStyle: 'italic' }}>juntos?</div>
        <div style={{ margin: '16px 0' }}><Vela size={32} lit/></div>
        <div style={{ fontFamily: wfFont, fontSize: 20, color: C.terracota, textDecoration: 'underline', textUnderlineOffset: 4 }}>hola@nombre.dev</div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 14, marginTop: 16, fontSize: 10, fontFamily: 'monospace' }}>
          <span>github ↗</span><span>linkedin ↗</span><span>x ↗</span>
        </div>
        <div style={{ fontSize: 8, fontFamily: 'monospace', marginTop: 20, opacity: 0.4 }}>que descansen en paz los bugs · 2026</div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// DIRECTION C — Editorial con columnas · tipo revista · numeración grande
// ─────────────────────────────────────────────────────────────
function DirectionC() {
  const W = 360;
  return (
    <div style={{ width: W, fontFamily: wfBody, color: C.negro, background: C.hueso, height: '100%', overflowY: 'auto', padding: '14px 18px' }}>

      {/* Header tipo revista */}
      <div style={{ borderTop: `3px solid ${C.negro}`, borderBottom: `1px solid ${C.negro}`, padding: '6px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
        <div style={{ fontFamily: wfFont, fontSize: 18, fontWeight: 900 }}>EL PORTAFOLIO</div>
        <div style={{ fontFamily: 'monospace', fontSize: 8 }}>VOL. IV · 2026</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 8, fontFamily: 'monospace', marginBottom: 14, color: C.oxido }}>
        <span>NOMBRE APELLIDO</span><span>· DEV ·</span><span>MX</span>
      </div>

      {/* LOADER micro */}
      <SectionLabel num="00" title="Loader" en="overture"/>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 4, marginBottom: 14, border: `1px solid ${C.negro}`, padding: 4 }}>
        {['vela off','vela on','papeles','hero'].map((t,i) => (
          <div key={i} style={{ textAlign: 'center', padding: 4, borderRight: i<3?`1px dashed ${C.negro}33`:'none' }}>
            <div style={{ height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {i===0 && <Vela size={16} lit={false}/>}
              {i===1 && <Vela size={16} lit/>}
              {i===2 && <WFGarland count={2} w={50} style={{ height: 26 }}/>}
              {i===3 && <div style={{ width: 40, height: 22, border: `1px solid ${C.negro}` }}/>}
            </div>
            <div style={{ fontSize: 7, fontFamily: 'monospace', color: C.oxido }}>{t}</div>
          </div>
        ))}
      </div>

      {/* HERO — con número gigante */}
      <WFGarland w={W-36} style={{ marginBottom: 4 }}/>
      <div style={{ display: 'grid', gridTemplateColumns: '44px 1fr', gap: 8, marginBottom: 20 }}>
        <div style={{ fontFamily: wfFont, fontSize: 72, fontWeight: 900, lineHeight: 0.8, color: C.terracota }}>01</div>
        <div>
          <div style={{ fontFamily: 'monospace', fontSize: 8, color: C.oxido, marginBottom: 2 }}>HERO · SP/EN</div>
          <div style={{ fontFamily: wfFont, fontSize: 26, fontWeight: 800, lineHeight: 1 }}>Tu Nombre</div>
          <div style={{ fontFamily: wfFont, fontSize: 14, fontStyle: 'italic', color: C.oxido, lineHeight: 1.1, marginTop: 2 }}>Full-stack dev · entre la vida y el bug</div>
          <div style={{ marginTop: 8, fontSize: 10 }}>
            <ScribbleLines count={3} widths={['100%','90%','70%']}/>
          </div>
          <div style={{ marginTop: 8, display: 'flex', gap: 6, alignItems: 'center', fontFamily: 'monospace', fontSize: 9 }}>
            <span style={{ background: C.negro, color: C.hueso, padding: '2px 6px' }}>VER OBRA →</span>
            <span style={{ borderBottom: `1px solid ${C.negro}` }}>contacto</span>
          </div>
        </div>
      </div>

      {/* ACERCA — dos columnas */}
      <div style={{ borderTop: `1px solid ${C.negro}`, paddingTop: 8, marginBottom: 16 }}>
        <SectionLabel num="02" title="Acerca de mí" en="biografía"/>
        <div style={{ display: 'grid', gridTemplateColumns: '44px 1fr', gap: 8 }}>
          <div style={{ fontFamily: wfFont, fontSize: 72, fontWeight: 900, lineHeight: 0.8, color: C.ocre }}>02</div>
          <div>
            <ImgPlaceholder h={80} label="retrato" style={{ marginBottom: 6 }}/>
            <div style={{ columns: 2, columnGap: 10, fontSize: 10, lineHeight: 1.3 }}>
              <ScribbleLines count={7} widths={['100%','95%','88%','100%','92%','80%','100%']} gap={3}/>
            </div>
            <div style={{ fontFamily: 'monospace', fontSize: 9, marginTop: 6, display: 'flex', gap: 12 }}>
              <span>→ cv.pdf</span><span>→ linkedin</span>
            </div>
          </div>
        </div>
      </div>

      {/* PROYECTOS */}
      <div style={{ borderTop: `1px solid ${C.negro}`, paddingTop: 8, marginBottom: 16 }}>
        <SectionLabel num="03" title="Proyectos" en="obra completa"/>
        <div style={{ display: 'grid', gridTemplateColumns: '44px 1fr', gap: 8 }}>
          <div style={{ fontFamily: wfFont, fontSize: 72, fontWeight: 900, lineHeight: 0.8, color: C.oxido }}>03</div>
          <div>
            <Annot style={{ marginBottom: 6 }}>baraja de 9 · click = voltea al reverso</Annot>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 4 }}>
              {[...Array(9)].map((_,i) => (
                <div key={i} style={{ aspectRatio: '0.7', border: `1.5px solid ${C.negro}`, background: C.hueso, padding: 2, position: 'relative' }}>
                  <div style={{ border: `1px solid ${C.oxido}55`, height: '60%', background: `${C.oxido}15`, marginBottom: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>
                    {['💻','📱','🤖','🛒','📊','⚡','🎨','🎮','🌐'][i]}
                  </div>
                  <div style={{ fontSize: 6, fontFamily: 'monospace', textAlign: 'center', color: C.oxido }}>N°{i+1}</div>
                  <div style={{ fontFamily: wfFont, fontSize: 8, fontWeight: 700, textAlign: 'center' }}>El proyecto</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'right', fontSize: 9, fontFamily: 'monospace', marginTop: 4 }}>ver todos →</div>
          </div>
        </div>
      </div>

      {/* STACK */}
      <div style={{ borderTop: `1px solid ${C.negro}`, paddingTop: 8, marginBottom: 16 }}>
        <SectionLabel num="04" title="Stack" en="caja de herramientas"/>
        <div style={{ display: 'grid', gridTemplateColumns: '44px 1fr', gap: 8 }}>
          <div style={{ fontFamily: wfFont, fontSize: 72, fontWeight: 900, lineHeight: 0.8, color: C.rosa }}>04</div>
          <div>
            <Annot style={{ marginBottom: 6 }}>lista editorial + veladoras en los titulares</Annot>
            {[
              { t: 'frontend', items: 'React · Vue · TypeScript · Next · Tailwind' },
              { t: 'backend', items: 'Node · Python · Go · Postgres · Redis' },
              { t: 'devops', items: 'Docker · AWS · Vercel · GH Actions' },
              { t: 'design', items: 'Figma · Illustrator · Framer' },
            ].map((cat,i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 6, padding: '4px 0', borderBottom: `1px dashed ${C.negro}44` }}>
                <Vela size={12} lit={i===0}/>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: wfFont, fontSize: 12, fontWeight: 700 }}>{cat.t.toUpperCase()}</div>
                  <div style={{ fontSize: 9, fontFamily: 'monospace', color: C.oxido, lineHeight: 1.3 }}>{cat.items}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CONTACTO editorial */}
      <div style={{ borderTop: `1px solid ${C.negro}`, borderBottom: `3px solid ${C.negro}`, padding: '8px 0 14px' }}>
        <SectionLabel num="05" title="Contacto" en="colophon"/>
        <div style={{ display: 'grid', gridTemplateColumns: '44px 1fr', gap: 8 }}>
          <div style={{ fontFamily: wfFont, fontSize: 72, fontWeight: 900, lineHeight: 0.8, color: C.terracota }}>05</div>
          <div>
            <div style={{ fontFamily: wfFont, fontSize: 18, fontWeight: 700, lineHeight: 1.05, marginBottom: 6 }}>
              Dejemos una ofrenda en tu proyecto.
            </div>
            <div style={{ fontFamily: 'monospace', fontSize: 10, marginBottom: 6 }}>
              <div style={{ borderBottom: `1px solid ${C.negro}`, paddingBottom: 2, marginBottom: 3 }}>hola@nombre.dev</div>
              <div style={{ opacity: 0.6 }}>+52 55 0000 0000</div>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 6, fontSize: 9, fontFamily: 'monospace' }}>
              <span style={{ background: C.negro, color: C.hueso, padding: '3px 6px' }}>GH</span>
              <span style={{ background: C.negro, color: C.hueso, padding: '3px 6px' }}>LI</span>
              <span style={{ background: C.negro, color: C.hueso, padding: '3px 6px' }}>X</span>
              <span style={{ background: C.terracota, color: C.hueso, padding: '3px 6px' }}>@</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'center', fontFamily: 'monospace', fontSize: 8, marginTop: 8, opacity: 0.5 }}>
        fin · © 2026 · que en paz descanse el código
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// DIRECTION D — Dividido · sidebar navegación + contenido · más app-like
// ─────────────────────────────────────────────────────────────
function DirectionD() {
  const W = 360;
  return (
    <div style={{ width: W, fontFamily: wfBody, color: C.negro, background: C.hueso, height: '100%', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>

      {/* Sticky papel picado strip como nav */}
      <div style={{ position: 'sticky', top: 0, background: C.hueso, zIndex: 2, paddingTop: 4 }}>
        <div style={{ display: 'flex', justifyContent: 'space-around', paddingBottom: 2 }}>
          {[
            { c: C.terracota, p: 'code', l: 'inicio' },
            { c: C.ocre, p: 'flower', l: 'sobre' },
            { c: C.oxido, p: 'skull', l: 'obra' },
            { c: C.rosa, p: 'cempa', l: 'stack' },
            { c: C.negro, p: 'geo', l: 'hola' },
          ].map((n,i) => (
            <div key={i} style={{ textAlign: 'center', cursor: 'pointer' }}>
              <WFPapel color={n.c} pattern={n.p} w={50} h={32} opacity={i===0?1:0.4}/>
              <div style={{ fontSize: 8, fontFamily: 'monospace', marginTop: -2, color: i===0?C.negro:C.oxido }}>{n.l}</div>
            </div>
          ))}
        </div>
        <div style={{ height: 1, background: C.negro, opacity: 0.15 }}/>
      </div>

      <div style={{ padding: '14px 18px' }}>

        {/* LOADER */}
        <SectionLabel num="00" title="Loader" en="entrada"/>
        <div style={{ border: `1.5px dashed ${C.terracota}`, padding: 10, marginBottom: 16, background: `${C.terracota}08`, textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 4, marginBottom: 4 }}>
            {[...Array(5)].map((_,i) => (
              <div key={i} style={{ opacity: i<3?1:0.3 }}>
                <WFPapel color={[C.terracota,C.ocre,C.oxido,C.rosa,C.negro][i]} pattern={['code','flower','skull','cempa','geo'][i]} w={40} h={28}/>
              </div>
            ))}
          </div>
          <Annot style={{ fontSize: 10 }}>papeles aparecen uno por uno · vela al fondo</Annot>
        </div>

        {/* HERO a dos registros */}
        <SectionLabel num="01" title="Hero" en="presentación"/>
        <div style={{ marginBottom: 24, position: 'relative' }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <div style={{ width: 64, height: 64, borderRadius: 32, border: `2px solid ${C.negro}`, background: `${C.oxido}22`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 26 }}>💀</span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'monospace', fontSize: 9, color: C.oxido }}>// hola, soy</div>
              <div style={{ fontFamily: wfFont, fontSize: 24, fontWeight: 800, lineHeight: 1 }}>Tu Nombre</div>
              <div style={{ fontFamily: wfFont, fontSize: 13, color: C.terracota, fontStyle: 'italic' }}>full-stack · MX</div>
            </div>
          </div>
          <div style={{ marginTop: 12, padding: 10, background: C.negro, color: C.hueso, borderRadius: 2, position: 'relative' }}>
            <div style={{ fontFamily: 'monospace', fontSize: 9, color: C.ocre, marginBottom: 4 }}>{`>`} whoami</div>
            <div style={{ fontFamily: wfFont, fontSize: 18, fontWeight: 700, lineHeight: 1.1 }}>Construyo productos web que respiran.</div>
            <div style={{ marginTop: 6 }}><ScribbleLines count={2} widths={['100%','70%']} color={C.hueso}/></div>
            <span style={{ position: 'absolute', right: 8, bottom: 6, fontFamily: 'monospace', fontSize: 9, color: C.ocre }}>_</span>
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
            <Box h={30} style={{ flex: 1, background: C.terracota, color: C.hueso, border: 'none', fontFamily: 'monospace' }}>ver obra()</Box>
            <Box h={30} style={{ flex: 1, fontFamily: 'monospace' }}>contacto.md</Box>
          </div>
        </div>

        {/* ACERCA */}
        <SectionLabel num="02" title="Acerca de mí" en="about.md"/>
        <div style={{ marginBottom: 22, border: `1px solid ${C.negro}`, padding: 10, background: C.hueso }}>
          <div style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
            <ImgPlaceholder h={80} w={80} label="foto"/>
            <div style={{ flex: 1, fontSize: 10, fontFamily: 'monospace' }}>
              <div style={{ color: C.oxido }}>ubicación:</div>
              <div>CDMX, MX</div>
              <div style={{ color: C.oxido, marginTop: 4 }}>experiencia:</div>
              <div>5+ años</div>
              <div style={{ color: C.oxido, marginTop: 4 }}>estado:</div>
              <div style={{ color: C.ocre }}>● disponible</div>
            </div>
          </div>
          <ScribbleLines count={4} widths={['100%','90%','95%','60%']}/>
        </div>

        {/* PROYECTOS — grid + featured */}
        <SectionLabel num="03" title="Proyectos" en="obras"/>
        <Annot style={{ marginBottom: 8 }}>1 destacado (carta grande) + grid 2×3 abajo</Annot>
        <div style={{ marginBottom: 8, border: `2px solid ${C.negro}`, padding: 6, background: `${C.ocre}10` }}>
          <div style={{ border: `1px solid ${C.oxido}`, height: 90, background: `repeating-linear-gradient(45deg, transparent, transparent 4px, ${C.oxido}22 4px, ${C.oxido}22 5px)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30 }}>💻</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 4 }}>
            <div>
              <div style={{ fontSize: 8, fontFamily: 'monospace', color: C.oxido }}>N° 01 · DESTACADO</div>
              <div style={{ fontFamily: wfFont, fontSize: 16, fontWeight: 700 }}>EL CÓDIGO</div>
            </div>
            <div style={{ fontSize: 9, fontFamily: 'monospace' }}>ver →</div>
          </div>
          <div style={{ display: 'flex', gap: 4, marginTop: 4, fontSize: 8, fontFamily: 'monospace' }}>
            <span style={{ background: C.negro, color: C.hueso, padding: '1px 4px' }}>react</span>
            <span style={{ background: C.negro, color: C.hueso, padding: '1px 4px' }}>ts</span>
            <span style={{ background: C.negro, color: C.hueso, padding: '1px 4px' }}>node</span>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginBottom: 22 }}>
          {['LA APP','EL BOT','LA TIENDA','EL DASH','LA API','EL JUEGO'].map((n,i) => (
            <div key={i} style={{ border: `1px solid ${C.negro}`, padding: 4, background: C.hueso }}>
              <div style={{ height: 40, background: `${C.oxido}15`, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {['📱','🤖','🛒','📊','⚡','🎮'][i]}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 8, fontFamily: 'monospace', marginTop: 2 }}>
                <span>N°{i+2}</span>
                <span style={{ fontFamily: wfFont, fontWeight: 700 }}>{n}</span>
              </div>
            </div>
          ))}
        </div>

        {/* STACK tabla */}
        <SectionLabel num="04" title="Stack" en="herramientas"/>
        <Annot style={{ marginBottom: 6 }}>tabla con veladoras + filtros por categoría</Annot>
        <div style={{ display: 'flex', gap: 4, marginBottom: 6, fontSize: 9, fontFamily: 'monospace' }}>
          {['todo','frontend','backend','devops','tools'].map((t,i) => (
            <span key={t} style={{ padding: '2px 6px', border: `1px solid ${C.negro}`, background: i===0?C.negro:'transparent', color: i===0?C.hueso:C.negro }}>{t}</span>
          ))}
        </div>
        <div style={{ border: `1px solid ${C.negro}`, marginBottom: 22 }}>
          {['React · expert','TypeScript · expert','Node · advanced','Python · intermediate','Go · learning'].map((s,i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: 6, borderBottom: i<4?`1px dashed ${C.negro}44`:'none' }}>
              <Vela size={14} lit={i<2}/>
              <div style={{ flex: 1, fontSize: 10, fontFamily: 'monospace' }}>{s}</div>
              <div style={{ width: 60, height: 4, background: `${C.negro}22` }}>
                <div style={{ width: `${[95,90,75,60,30][i]}%`, height: '100%', background: C.terracota }}/>
              </div>
            </div>
          ))}
        </div>

        {/* CONTACTO */}
        <SectionLabel num="05" title="Contacto" en="hola"/>
        <div style={{ border: `2px solid ${C.negro}`, background: `${C.rosa}10`, padding: 12, textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginBottom: 6 }}>
            <Cempasuchil size={16}/><Vela size={20} lit/><Cempasuchil size={16}/>
          </div>
          <div style={{ fontFamily: wfFont, fontSize: 16, fontWeight: 700 }}>¿Platicamos?</div>
          <Annot style={{ fontSize: 10, marginBottom: 8 }}>botón que copia email + links</Annot>
          <Box h={30} style={{ background: C.terracota, color: C.hueso, border: 'none', fontFamily: 'monospace', marginBottom: 8 }}>hola@nombre.dev [copiar]</Box>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, fontSize: 9, fontFamily: 'monospace' }}>
            {['github','linkedin','x','email'].map(s => (
              <span key={s} style={{ padding: '2px 6px', border: `1px solid ${C.negro}` }}>{s}</span>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center', fontFamily: 'monospace', fontSize: 8, marginTop: 14, opacity: 0.5 }}>
          hecho con ♥ y un poco de tequila · 2026
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { DirectionA, DirectionB, DirectionC, DirectionD });
