import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import Photo from './Photo';
import { Star, StarField } from './Sticker';
import { CATEGORIES, PROJECTS } from '../data/portfolioData';

export default function Portfolio({ onHire }) {
  const [cat, setCat] = useState('Todos');
  const [sel, setSel] = useState(null);
  const list = cat === 'Todos' ? PROJECTS : PROJECTS.filter(p => p.category === cat);

  useEffect(() => {
    if (!sel) return;
    const onKey = e => e.key === 'Escape' && setSel(null);
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [sel]);

  return (
    <section id="portafolio" className="grain relative overflow-hidden bg-cherry text-butter">
    <StarField preset="portfolio" />
    <div className="section">
      <h2 className="space-y-1 text-2xl font-bold leading-tight md:text-4xl"><span className="label">portafolio.</span><br /><span className="label">ojo para la estética.</span></h2>
      <div className="mt-6 flex flex-wrap gap-2" role="tablist" aria-label="Filtrar proyectos">
        {CATEGORIES.map(c => (
          <button key={c} role="tab" aria-selected={cat === c} onClick={() => setCat(c)}
            className={`chip ${cat === c ? 'border-butter bg-butter text-espresso' : 'border-butter/60 text-butter hover:bg-butter/15'}`}>{c}</button>
        ))}
      </div>

      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p, i) => (
          <button key={p.id} onClick={() => setSel(p)} aria-label={`Abrir ${p.title}`}
            className={`group relative border-2 border-espresso bg-white p-3 pb-5 text-left text-espresso shadow-cut transition-transform hover:rotate-0 hover:-translate-y-1 ${i % 2 ? 'rotate-1' : '-rotate-1'}`}>
            <span className="tape" aria-hidden />
            <Star variant={i % 2 ? 'leopard' : 'studded'} className="absolute -right-3 -top-4 w-11 rotate-12" />
            <Photo src={p.image} alt={p.title} label={p.category} className={`aspect-[4/5] w-full ${p.tone}`} />
            <h3 className="mt-4 font-display text-xl font-semibold leading-tight">{p.title}</h3>
            <p className="mt-1 text-sm text-espresso-soft">{p.category} · {p.year}</p>
          </button>
        ))}
      </div>

      {sel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-espresso/80 p-4" onClick={() => setSel(null)}>
          <div role="dialog" aria-modal="true" aria-label={sel.title} onClick={e => e.stopPropagation()}
            className="relative grid max-h-[90vh] text-espresso w-full max-w-3xl overflow-auto border-2 border-espresso bg-butter shadow-cut md:grid-cols-2">
            <button onClick={() => setSel(null)} aria-label="Cerrar" className="absolute right-3 top-3 z-10 rounded-full bg-butter p-2 text-espresso shadow-md transition hover:bg-white"><X size={20} /></button>
            {sel.video
              ? <iframe src={sel.video} title={sel.title} className="aspect-[4/5] w-full" allowFullScreen />
              : <Photo src={sel.image} alt={sel.title} label={sel.category} className={`aspect-[4/5] w-full ${sel.tone}`} />}
            <div className="p-6">
              <p className="text-sm font-medium text-cherry">{sel.category} · {sel.brand} · {sel.year}</p>
              <h3 className="mt-1 font-display text-3xl font-semibold">{sel.title}</h3>
              <p className="mt-3 leading-relaxed">{sel.description}</p>
              <ul className="mt-4 list-disc space-y-1 pl-5">{sel.deliverables.map(d => <li key={d}>{d}</li>)}</ul>
              <a href="#contacto" onClick={() => { setSel(null); onHire?.(''); }} className="btn-primary mt-6">Quiero algo así</a>
            </div>
          </div>
        </div>
      )}
    </div>
    </section>
  );
}
