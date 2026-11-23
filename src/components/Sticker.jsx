// Estrellas decorativas (stickers) basadas en la referencia: negras con tachuelas, de leopardo y parches con costura.
//
//  <Star variant="leopard" className="w-16" />                 estrella de leopardo (foto public/images/leopard.jpg)
//  <Star variant="studded" className="w-16" />                 estrella oscura con tachuelas plateadas
//  <Star variant="patch" tone="cherry" className="w-16" />     parche con brillo y costura. tone: cherry | sky | butter
//  <Star variant="clusterA" tone="sky" className="w-28" />     grupo de 3 estrellas superpuestas (clusterA | clusterB | clusterC)
//  <Star variant="outlined" className="w-28" />                crema con contorno espresso (la del hero)
//  <Star variant="solid" className="w-10 text-butter" />       lisa, color con text-*
const R = 48, r = 20;
const VERTS = (s = 1) => Array.from({ length: 10 }, (_, i) => {
  const a = -Math.PI / 2 + (i * Math.PI) / 5, k = (i % 2 ? r : R) * s;
  return [50 + k * Math.cos(a), 54 + k * Math.sin(a)];
});
const pts = (s = 1) => VERTS(s).map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
const clip = (s = 1) => `polygon(${VERTS(s).map(([x, y]) => `${x.toFixed(1)}% ${y.toFixed(1)}%`).join(',')})`;
const STUDS = (() => {
  const v = VERTS(0.8), out = [];
  for (let i = 0; i < 10; i++) { const [x1, y1] = v[i], [x2, y2] = v[(i + 1) % 10]; for (let k = 0; k < 4; k++) out.push([x1 + ((x2 - x1) * k) / 4, y1 + ((y2 - y1) * k) / 4]); }
  return out;
})();
const PATCH = {
  // g1/g2 = brillo del relleno. En cereza va tenue para que el parche se vea rojo y no rosado.
  cherry: { ring: '#6B0B0C', fill: '#8E1825', line: '#FFF8CA', g1: 'rgba(255,200,200,.38)', g2: 'rgba(255,200,200,.22)' },
  sky:    { ring: '#8FB0D3', fill: '#C8D9EC', line: '#EAF2FA', g1: 'rgba(255,255,255,.75)', g2: 'rgba(255,255,255,.45)' },
  butter: { ring: '#E6C766', fill: '#FFEDAD', line: '#FFF8CA', g1: 'rgba(255,255,255,.75)', g2: 'rgba(255,255,255,.45)' },
};
// Grupos superpuestos como en la referencia: [variante, tono, izq%, arriba%, ancho%, giro]
const CLUSTERS = {
  clusterA: [['studded', '', 0, 10, 52, -8], ['leopard', '', 60, 0, 34, 14], ['patch', '', 22, 68, 32, -12]],
  clusterB: [['leopard', '', 42, 20, 56, 6], ['studded', '', 0, 0, 34, -10], ['patch', '', 2, 58, 34, 10]],
  clusterC: [['patch', '', 0, 26, 54, -6], ['studded', '', 62, 0, 34, 12], ['leopard', '', 62, 52, 36, -10]],
};

function Body({ v, tone }) {
  if (v === 'leopard') return <div className="absolute inset-0 bg-leopard" style={{ clipPath: clip(1) }} />;
  if (v === 'studded') {
    return (
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
        <polygon points={pts(1)} fill="#2D120D" stroke="#8d8378" strokeWidth="1.6" strokeDasharray="1.4 .9" strokeLinejoin="round" />
        {STUDS.map(([x, y], i) => <g key={i}><circle cx={x} cy={y} r="2.2" fill="#b9b4ad" /><circle cx={x - 0.6} cy={y - 0.6} r=".8" fill="#fff" /></g>)}
      </svg>
    );
  }
  const t = PATCH[tone] || PATCH.cherry; // patch
  return (
    <>
      <div className="absolute inset-0" style={{ clipPath: clip(1), background: t.ring }} />
      <div className="absolute inset-0" style={{ clipPath: clip(0.82), background: `radial-gradient(${t.g1} .7px, transparent 1px) 0 0/5px 5px, radial-gradient(${t.g2} .7px, transparent 1.1px) 2px 3px/8px 8px, ${t.fill}` }} />
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full"><polygon points={pts(0.9)} fill="none" stroke={t.line} strokeWidth=".9" strokeDasharray="1.6 1" strokeLinejoin="round" /></svg>
    </>
  );
}

export function Star({ className = '', style, variant, tone = 'cherry', leopard = false, outlined = false }) {
  const v = variant || (leopard ? 'leopard' : outlined ? 'outlined' : 'solid');
  if (v === 'solid' || v === 'outlined') {
    return (
      <svg viewBox="0 0 100 100" className={className} style={style} aria-hidden strokeLinejoin="round"
        fill={v === 'outlined' ? '#FFF8CA' : 'currentColor'} stroke={v === 'outlined' ? '#2D120D' : 'currentColor'} strokeWidth={v === 'outlined' ? 2.5 : 5}>
        <polygon points={pts(1)} />
      </svg>
    );
  }
  const pos = className.includes('absolute') ? '' : 'relative';
  if (CLUSTERS[v]) {
    return (
      <div className={`${pos} aspect-square ${className}`} style={style} aria-hidden>
        {CLUSTERS[v].map(([mv, mt, l, t, w, rot], i) => (
          <Star key={i} variant={mv} tone={mt || tone} className="absolute" style={{ left: `${l}%`, top: `${t}%`, width: `${w}%`, transform: `rotate(${rot}deg)` }} />
        ))}
      </div>
    );
  }
  return (
    <div className={`${pos} aspect-square ${className}`} style={{ filter: 'drop-shadow(2px 2px 0 #2D120D)', ...style }} aria-hidden>
      <Body v={v} tone={tone} />
    </div>
  );
}

// ---------- Campo de estrellas: adornos repartidos por toda una sección ----------
// Se coloca como primer hijo de una sección con `relative overflow-hidden`: <StarField preset="about" />
// Cada estrella: [variante, tono, x%, y%, tamaño máx (px), giro (°), solo escritorio?]
const FIELDS = {
  hero: [['clusterB', 'sky', 1, 14, 120, -6, true], ['patch', 'sky', 92, 6, 48, 10], ['studded', 'cherry', 2, 78, 42, 12], ['clusterC', 'butter', 84, 50, 110, -8, true], ['leopard', 'cherry', 66, 38, 30, 10, true], ['patch', 'butter', 50, 86, 38, -10, true], ['studded', 'cherry', 44, 5, 32, 18, true]],
  about: [['clusterA', 'cherry', 1, 8, 110, -8, true], ['studded', 'cherry', 90, 6, 36, 14], ['patch', 'sky', 46, 5, 40, 8, true], ['leopard', 'cherry', 4, 64, 36, 10], ['patch', 'cherry', 46, 92, 40, -10], ['clusterC', 'sky', 84, 66, 100, -10, true]],
  portfolio: [['clusterA', 'sky', 1, 4, 110, -6, true], ['patch', 'sky', 93, 4, 44, 10], ['studded', 'cherry', 95, 38, 38, 14], ['leopard', 'cherry', 3, 50, 38, 12, true], ['patch', 'butter', 50, 3, 34, -8, true], ['clusterB', 'butter', 86, 76, 110, 10, true], ['leopard', 'cherry', 8, 92, 34, -14]],
  services: [['clusterC', 'cherry', 1, 6, 100, -8, true], ['patch', 'sky', 95, 8, 44, 10], ['studded', 'cherry', 4, 64, 36, 12], ['leopard', 'cherry', 90, 82, 36, -10, true], ['patch', 'cherry', 50, 92, 34, 8, true]],
  contact: [['clusterB', 'cherry', 0, 1, 90, -8, true], ['patch', 'sky', 95, 10, 40, 12], ['studded', 'cherry', 5, 72, 38, 14], ['leopard', 'cherry', 94, 62, 34, -12], ['clusterA', 'cherry', 46, 84, 90, 10, true]],
  footer: [['studded', 'cherry', 5, 18, 30, -10], ['leopard', 'cherry', 28, 20, 28, 8], ['patch', 'sky', 50, 16, 28, 12], ['patch', 'butter', 72, 20, 30, -8], ['studded', 'cherry', 93, 18, 30, 14]],
};

export function StarField({ preset }) {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden>
      {(FIELDS[preset] || []).map(([v, t, x, y, s, rot, desk], i) => (
        <Star key={i} variant={v} tone={t} className={`absolute ${desk ? 'hidden md:block' : ''}`}
          style={{ left: `${x}%`, top: `${y}%`, width: `clamp(${Math.round(s * 0.55)}px, ${(s / 12).toFixed(1)}vw, ${s}px)`, transform: `rotate(${rot}deg)` }} />
      ))}
    </div>
  );
}
