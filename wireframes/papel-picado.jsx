// Papel picado SVG pieces — sketchy, low-fi wireframe style.
// Rectangles with wavy bottom and scalloped edges, with cutout patterns.

const PP_COLORS = {
  terracota: '#c96442',
  ocre: '#c99a3a',
  hueso: '#f4ece0',
  negro: '#1f1a15',
  oxido: '#8a3a2a',
  rosa: '#c25a6b',
};

// A single papel picado hanging from a string.
// Props: color, width, height, pattern (svg children drawn inside)
function PapelPicado({ color = PP_COLORS.terracota, width = 200, height = 160, pattern, sway = 0, dangle = 0, style = {} }) {
  const scallop = 10;
  const waveCount = Math.floor(width / 22);
  // Build scalloped bottom
  let bottom = '';
  const step = width / waveCount;
  for (let i = 0; i < waveCount; i++) {
    const x1 = i * step;
    const cx = x1 + step / 2;
    const x2 = x1 + step;
    bottom += ` Q${cx} ${height + scallop}, ${x2} ${height}`;
  }
  const path = `M0 0 L${width} 0 L${width} ${height}${bottom} L0 ${height} Z`;

  return (
    <div style={{ display: 'inline-block', transform: `rotate(${sway}deg) translateY(${dangle}px)`, transformOrigin: 'top center', ...style }}>
      <svg width={width} height={height + scallop + 4} viewBox={`0 0 ${width} ${height + scallop + 4}`} style={{ overflow: 'visible' }}>
        <defs>
          <pattern id={`dots-${color.replace('#','')}`} width="8" height="8" patternUnits="userSpaceOnUse">
            <circle cx="4" cy="4" r="1" fill={color} opacity="0.3"/>
          </pattern>
        </defs>
        {/* body */}
        <path d={path} fill={color} opacity="0.92"/>
        {/* cutouts layer — holes = hueso colored shapes (approximating see-through on light bg) */}
        <g fill={PP_COLORS.hueso}>
          {pattern}
        </g>
        {/* top perforations (dotted line) */}
        {[...Array(Math.floor(width / 10))].map((_, i) => (
          <circle key={i} cx={6 + i * 10} cy={5} r="1.2" fill={PP_COLORS.hueso}/>
        ))}
      </svg>
    </div>
  );
}

// A string of several papeles picados hung on a wire.
function PapelPicadoGarland({ pieces, width = '100%', height = 120, style = {} }) {
  return (
    <div style={{ position: 'relative', width, height, ...style }}>
      {/* string */}
      <svg width="100%" height="20" style={{ position: 'absolute', top: 0, left: 0 }} preserveAspectRatio="none">
        <path d="M0 6 Q 50% 18, 100% 6" stroke={PP_COLORS.negro} strokeWidth="1" fill="none" opacity="0.4" strokeDasharray="2 3"/>
      </svg>
      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start', paddingTop: 4 }}>
        {pieces.map((p, i) => (
          <PapelPicado key={i} {...p} sway={(i % 2 === 0 ? -2 : 2)} dangle={(i % 3) * 2} />
        ))}
      </div>
    </div>
  );
}

// Common cutout patterns — all use hueso fill via parent <g>
const PP_PATTERNS = {
  code: (w, h) => (
    <>
      {/* </> symbol in the middle */}
      <text x={w/2} y={h/2 + 8} textAnchor="middle" fontSize={h*0.35} fontFamily="monospace" fontWeight="bold">{'</>'}</text>
      {/* flower corners */}
      {[[20,20],[w-20,20],[20,h-25],[w-20,h-25]].map(([x,y],i) => (
        <g key={i} transform={`translate(${x},${y})`}>
          {[0,60,120,180,240,300].map(a => (
            <circle key={a} cx={Math.cos(a*Math.PI/180)*6} cy={Math.sin(a*Math.PI/180)*6} r="2.5"/>
          ))}
          <circle cx="0" cy="0" r="2"/>
        </g>
      ))}
    </>
  ),
  skull: (w, h) => (
    <>
      <ellipse cx={w/2} cy={h/2 - 4} rx={h*0.18} ry={h*0.22}/>
      <circle cx={w/2 - 8} cy={h/2 - 6} r="3" fill={PP_COLORS.terracota}/>
      <circle cx={w/2 + 8} cy={h/2 - 6} r="3" fill={PP_COLORS.terracota}/>
      <rect x={w/2 - 2} y={h/2} width="4" height="3" fill={PP_COLORS.terracota}/>
      {[...Array(5)].map((_,i) => (
        <rect key={i} x={w/2 - 10 + i*4.5} y={h/2 + 6} width="3" height="4" fill={PP_COLORS.terracota}/>
      ))}
    </>
  ),
  flower: (w, h) => (
    <g transform={`translate(${w/2},${h/2})`}>
      {[0,45,90,135,180,225,270,315].map(a => (
        <ellipse key={a} cx={Math.cos(a*Math.PI/180)*12} cy={Math.sin(a*Math.PI/180)*12} rx="8" ry="5"
          transform={`rotate(${a} ${Math.cos(a*Math.PI/180)*12} ${Math.sin(a*Math.PI/180)*12})`}/>
      ))}
      <circle cx="0" cy="0" r="5"/>
    </g>
  ),
  geo: (w, h) => (
    <>
      {/* diamond grid */}
      {[0.25, 0.5, 0.75].map((fy,i) => (
        [0.25, 0.5, 0.75].map((fx,j) => (
          <rect key={`${i}-${j}`} x={w*fx-4} y={h*fy-4} width="8" height="8" transform={`rotate(45 ${w*fx} ${h*fy})`}/>
        ))
      ))}
    </>
  ),
  cempasuchil: (w, h) => (
    <g transform={`translate(${w/2},${h/2})`}>
      {[0,30,60,90,120,150,180,210,240,270,300,330].map(a => (
        <ellipse key={a} cx={Math.cos(a*Math.PI/180)*10} cy={Math.sin(a*Math.PI/180)*10} rx="4" ry="7"
          transform={`rotate(${a} ${Math.cos(a*Math.PI/180)*10} ${Math.sin(a*Math.PI/180)*10})`}/>
      ))}
      <circle cx="0" cy="0" r="4"/>
    </g>
  ),
};

// Tiny cempasuchil flower (marigold)
function Cempasuchil({ size = 24, color = PP_COLORS.ocre, style = {} }) {
  return (
    <svg width={size} height={size} viewBox="-20 -20 40 40" style={{ display: 'inline-block', ...style }}>
      {[0,30,60,90,120,150,180,210,240,270,300,330].map(a => (
        <ellipse key={a} cx={Math.cos(a*Math.PI/180)*9} cy={Math.sin(a*Math.PI/180)*9} rx="4" ry="7"
          fill={color} opacity="0.85"
          transform={`rotate(${a} ${Math.cos(a*Math.PI/180)*9} ${Math.sin(a*Math.PI/180)*9})`}/>
      ))}
      <circle cx="0" cy="0" r="5" fill={PP_COLORS.oxido}/>
    </svg>
  );
}

// Falling petal dot
function Petal({ x, y, size = 6, rot = 0, color = PP_COLORS.ocre }) {
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: size, height: size*1.6,
      background: color, borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
      transform: `rotate(${rot}deg)`, opacity: 0.7 }}/>
  );
}

// Vela (candle) icon
function Vela({ size = 30, lit = true, style = {} }) {
  return (
    <svg width={size} height={size*1.8} viewBox="0 0 30 54" style={{ display: 'inline-block', ...style }}>
      {lit && (
        <>
          <ellipse cx="15" cy="6" rx="3" ry="6" fill={PP_COLORS.ocre} opacity="0.8"/>
          <ellipse cx="15" cy="7" rx="1.5" ry="3" fill={PP_COLORS.hueso}/>
        </>
      )}
      <line x1="15" y1="12" x2="15" y2="18" stroke={PP_COLORS.negro} strokeWidth="1"/>
      <rect x="9" y="18" width="12" height="28" fill={PP_COLORS.hueso} stroke={PP_COLORS.negro} strokeWidth="0.8"/>
      <ellipse cx="15" cy="18" rx="6" ry="1.5" fill={PP_COLORS.hueso} stroke={PP_COLORS.negro} strokeWidth="0.8"/>
      <rect x="7" y="46" width="16" height="4" fill={PP_COLORS.oxido}/>
    </svg>
  );
}

Object.assign(window, { PapelPicado, PapelPicadoGarland, PP_PATTERNS, PP_COLORS, Cempasuchil, Petal, Vela });
