'use client';
import React from 'react';

export const PP = {
  terracota: 'var(--c-terracota)',
  ocre: 'var(--c-ocre)',
  oxido: 'var(--c-oxido)',
  rosa: 'var(--c-rosa)',
  negro: 'var(--c-negro)',
};

// Scalloped-bottom path for the paper body
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

// Draw a cempasuchil flower (as a filled shape we can reuse in masks)
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

// Each pattern returns the cut-shapes (rendered white in the mask).
// Generous, iconic, readable at ~120px wide.
function patternCuts(kind, W, H) {
  const out = [];
  const cx = W / 2, cy = H / 2;

  // Shared: decorative border frame (inner rectangle of dots)
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
    // </> central — big and chunky
    const s = Math.min(W, H) * 0.18;
    const t = Math.max(3, W * 0.04);
    // < bracket
    out.push(
      <path key="lt" fill="white" d={`
        M ${cx - s * 1.8} ${cy}
        L ${cx - s * 0.4} ${cy - s}
        L ${cx - s * 0.4 + t} ${cy - s + t * 0.2}
        L ${cx - s * 1.4} ${cy}
        L ${cx - s * 0.4 + t} ${cy + s - t * 0.2}
        L ${cx - s * 0.4} ${cy + s}
        Z`}/>
    );
    // > bracket
    out.push(
      <path key="gt" fill="white" d={`
        M ${cx + s * 1.8} ${cy}
        L ${cx + s * 0.4} ${cy - s}
        L ${cx + s * 0.4 - t} ${cy - s + t * 0.2}
        L ${cx + s * 1.4} ${cy}
        L ${cx + s * 0.4 - t} ${cy + s - t * 0.2}
        L ${cx + s * 0.4} ${cy + s}
        Z`}/>
    );
    // / slash
    out.push(
      <path key="sl" fill="white" d={`
        M ${cx + s * 0.15} ${cy - s}
        L ${cx + s * 0.15 + t} ${cy - s}
        L ${cx - s * 0.15 + t} ${cy + s}
        L ${cx - s * 0.15} ${cy + s}
        Z`}/>
    );
    // small flowers in each corner inside border
    [[0.22, 0.28], [0.78, 0.28], [0.22, 0.62], [0.78, 0.62]].forEach(([fx, fy], i) => {
      out.push(<path key={`cf${i}`} d={flowerPath(W * fx, H * fy, W * 0.045, W * 0.02, 6)} fill="white"/>);
      out.push(<circle key={`cfc${i}`} cx={W * fx} cy={H * fy} r={W * 0.015} fill="white"/>);
    });
  } else if (kind === 'skull') {
    // Big skull silhouette
    const sw = W * 0.28, sh = H * 0.3;
    out.push(<ellipse key="cran" cx={cx} cy={cy - H * 0.04} rx={sw} ry={sh * 0.95} fill="white"/>);
    // Jaw
    out.push(<rect key="jaw" x={cx - sw * 0.55} y={cy + sh * 0.5} width={sw * 1.1} height={sh * 0.4} rx={sh * 0.15} fill="white"/>);
    // Teeth gaps (drawn black = add back to paper)
    for (let i = 0; i < 4; i++) {
      out.push(<rect key={`tg${i}`} x={cx - sw * 0.45 + i * sw * 0.3} y={cy + sh * 0.55} width={sw * 0.1} height={sh * 0.32} fill="black"/>);
    }
    // eyes (black = paper, reveals dark voids)
    out.push(<ellipse key="eL" cx={cx - sw * 0.38} cy={cy - sh * 0.15} rx={sw * 0.22} ry={sh * 0.2} fill="black"/>);
    out.push(<ellipse key="eR" cx={cx + sw * 0.38} cy={cy - sh * 0.15} rx={sw * 0.22} ry={sh * 0.2} fill="black"/>);
    // nose triangle black
    out.push(<path key="no" d={`M ${cx} ${cy + sh * 0.1} L ${cx - sw * 0.08} ${cy + sh * 0.35} L ${cx + sw * 0.08} ${cy + sh * 0.35} Z`} fill="black"/>);
    // eye flowers (small white inside the dark eyes)
    out.push(<path key="efL" d={flowerPath(cx - sw * 0.38, cy - sh * 0.15, sw * 0.12, sw * 0.05, 6)} fill="white"/>);
    out.push(<path key="efR" d={flowerPath(cx + sw * 0.38, cy - sh * 0.15, sw * 0.12, sw * 0.05, 6)} fill="white"/>);
  } else if (kind === 'flower') {
    // Huge cempasuchil fills the center
    const rO = Math.min(W, H) * 0.32;
    const rI = rO * 0.45;
    out.push(<path key="f1" d={flowerPath(cx, cy, rO, rI, 12)} fill="white"/>);
    out.push(<path key="f2" d={flowerPath(cx, cy, rO * 0.7, rI * 0.55, 10)} fill="black"/>);
    out.push(<path key="f3" d={flowerPath(cx, cy, rO * 0.48, rI * 0.35, 8)} fill="white"/>);
    out.push(<circle key="fc" cx={cx} cy={cy} r={rO * 0.15} fill="black"/>);
    // Four small leaves at cardinal points, outside the flower
    [[0, -1], [0, 1], [-1, 0], [1, 0]].forEach(([dx, dy], i) => {
      const lx = cx + dx * rO * 1.4;
      const ly = cy + dy * rO * 1.4;
      out.push(<ellipse key={`leaf${i}`} cx={lx} cy={ly} rx={W * 0.05} ry={W * 0.025}
        transform={`rotate(${dy === 0 ? 0 : 90} ${lx} ${ly})`} fill="white"/>);
    });
  } else if (kind === 'cross') {
    const s = Math.min(W, H) * 0.32;
    const t = W * 0.09;
    // Vertical bar
    out.push(<rect key="cv" x={cx - t / 2} y={cy - s} width={t} height={s * 2} fill="white"/>);
    // Horizontal bar
    out.push(<rect key="ch" x={cx - s * 0.65} y={cy - s * 0.3} width={s * 1.3} height={t} fill="white"/>);
    // End caps (diamonds)
    const caps = [[cx, cy - s], [cx, cy + s], [cx - s * 0.65, cy - s * 0.3 + t / 2], [cx + s * 0.65, cy - s * 0.3 + t / 2]];
    caps.forEach(([x, y], i) => {
      out.push(<rect key={`cap${i}`} x={x - t * 0.7} y={y - t * 0.7} width={t * 1.4} height={t * 1.4}
        transform={`rotate(45 ${x} ${y})`} fill="white"/>);
    });
    // Center flower
    out.push(<path key="cf" d={flowerPath(cx, cy - s * 0.3 + t / 2, W * 0.06, W * 0.025, 8)} fill="black"/>);
    out.push(<circle key="cfd" cx={cx} cy={cy - s * 0.3 + t / 2} r={W * 0.02} fill="white"/>);
  } else if (kind === 'heart') {
    // Stylized heart
    const s = Math.min(W, H) * 0.28;
    out.push(
      <path key="h" fill="white" d={`
        M ${cx} ${cy + s * 0.95}
        C ${cx - s * 1.7} ${cy + s * 0.1}, ${cx - s * 1.4} ${cy - s * 1.3}, ${cx} ${cy - s * 0.15}
        C ${cx + s * 1.4} ${cy - s * 1.3}, ${cx + s * 1.7} ${cy + s * 0.1}, ${cx} ${cy + s * 0.95}
        Z`}/>
    );
    // flower inside heart (subtract)
    out.push(<path key="hf" d={flowerPath(cx, cy - s * 0.15, s * 0.35, s * 0.15, 8)} fill="black"/>);
    out.push(<circle key="hfd" cx={cx} cy={cy - s * 0.15} r={s * 0.1} fill="white"/>);
    // small dots around the heart
    for (let i = 0; i < 8; i++) {
      const a = i / 8 * Math.PI * 2;
      out.push(<circle key={`hd${i}`} cx={cx + Math.cos(a) * s * 1.8} cy={cy + Math.sin(a) * s * 1.4} r={W * 0.02} fill="white"/>);
    }
  } else if (kind === 'star') {
    // 8-pointed star
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
    // inner small star (solid = add back)
    out.push(<path key="ss" d={flowerPath(cx, cy, rO * 0.35, rO * 0.15, 8)} fill="black"/>);
    out.push(<circle key="sc" cx={cx} cy={cy} r={W * 0.04} fill="white"/>);
    // four corner mini-stars
    [[0.22, 0.25], [0.78, 0.25], [0.22, 0.65], [0.78, 0.65]].forEach(([fx, fy], i) => {
      out.push(<path key={`ms${i}`} d={flowerPath(W * fx, H * fy, W * 0.04, W * 0.018, 4)} fill="white"/>);
    });
  }

  return out;
}

function Papel({ color = PP.terracota, w = 200, h = 160, pattern = 'code', id, className = '', style = {} }) {
  const maskId = `pp-${id || Math.random().toString(36).slice(2, 8)}`;
  const path = papelPath(w, h);
  return (
    <svg
      className={className}
      width={w}
      height={h + 12}
      viewBox={`0 0 ${w} ${h + 12}`}
      style={{ overflow: 'visible', ...style }}
    >
      <defs>
        <mask id={maskId} maskUnits="userSpaceOnUse">
          {/* Paper body white in mask = visible */}
          <path d={path} fill="white"/>
          {/* Cuts: white fills from patternCuts punch holes (black in mask);
              black fills add paper back (white in mask). Swap fills. */}
          {patternCuts(pattern, w, h).map((el, i) =>
            React.cloneElement(el, {
              key: `cut-${i}`,
              fill: el.props.fill === 'white' ? 'black' : 'white',
            })
          )}
        </mask>
      </defs>
      {/* Subtle shadow behind paper */}
      <path d={path} fill="rgba(0,0,0,0.12)" transform="translate(1.5, 2)"/>
      {/* Paper with cuts masked out */}
      <path d={path} fill={color} mask={`url(#${maskId})`}/>
      {/* Top perforations (holes punched along top edge, visible as the bg color showing through the border) */}
      {[...Array(Math.max(3, Math.floor(w / 18)))].map((_, i) => {
        const step = w / Math.max(3, Math.floor(w / 18));
        return <circle key={`tp${i}`} cx={step / 2 + i * step} cy={3} r={1.6} fill="var(--c-hueso)"/>;
      })}
    </svg>
  );
}

// Garland: row of papeles on a curved string, with sway animation
function Garland({ pieces, style = {}, staticSway = false }) {
  const ref = React.useRef(null);
  const [w, setW] = React.useState(1200);
  React.useEffect(() => {
    const update = () => ref.current && setW(ref.current.offsetWidth);
    update();
    const ro = new ResizeObserver(update);
    if (ref.current) ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  const count = pieces.length;
  const pieceW = Math.min(150, Math.max(88, (w - 40) / count - 10));
  const pieceH = pieceW * 0.78;
  const uid = React.useId().replace(/:/g, '');

  return (
    <div ref={ref} className="pp-garland" style={{ position: 'relative', width: '100%', minHeight: pieceH + 30, ...style }}>
      <svg width="100%" height="18" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }} preserveAspectRatio="none">
        <path d={`M 0 4 Q ${w / 2} 16, ${w} 4`} stroke="var(--c-tinta)" strokeWidth="0.8" fill="none" opacity="0.4"/>
      </svg>
      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start', paddingTop: 8, width: '100%' }}>
        {pieces.map((p, i) => (
          <div key={i} className={`pp-sway pp-sway-${i % 4}`} style={{
            transformOrigin: 'top center',
            animationDelay: `${i * 0.15}s`,
            animationPlayState: staticSway ? 'paused' : 'running',
          }}>
            <Papel id={`${uid}-${i}`} color={p.color} pattern={p.pattern} w={pieceW} h={pieceH}/>
          </div>
        ))}
      </div>
    </div>
  );
}

function Cempasuchil({ size = 40, style = {}, petalColor = 'var(--c-ocre)', coreColor = 'var(--c-oxido)' }) {
  const petals = 14;
  return (
    <svg width={size} height={size} viewBox="-24 -24 48 48" style={{ display: 'inline-block', ...style }}>
      {[...Array(petals)].map((_, i) => {
        const a = (i / petals) * 360;
        const rad = a * Math.PI / 180;
        return (
          <ellipse
            key={`outer-${i}`}
            cx={Math.cos(rad) * 14}
            cy={Math.sin(rad) * 14}
            rx="5" ry="8"
            fill={petalColor}
            opacity="0.92"
            transform={`rotate(${a} ${Math.cos(rad) * 14} ${Math.sin(rad) * 14})`}
          />
        );
      })}
      {[...Array(10)].map((_, i) => {
        const a = (i / 10) * 360 + 18;
        const rad = a * Math.PI / 180;
        return (
          <ellipse
            key={`inner-${i}`}
            cx={Math.cos(rad) * 7}
            cy={Math.sin(rad) * 7}
            rx="3.5" ry="5.5"
            fill={petalColor}
            transform={`rotate(${a} ${Math.cos(rad) * 7} ${Math.sin(rad) * 7})`}
          />
        );
      })}
      <circle cx="0" cy="0" r="4" fill={coreColor}/>
    </svg>
  );
}

function Vela({ size = 48, lit = true, style = {}, flicker = true }) {
  return (
    <svg width={size} height={size * 2.2} viewBox="0 0 30 54" style={{ display: 'inline-block', ...style }}>
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

export { Papel, Garland, Cempasuchil, Vela };
