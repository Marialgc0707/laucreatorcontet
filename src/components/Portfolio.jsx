import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import Photo from './Photo';
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
    <section id="portafolio" className="section">
      <h2 className="font-display text-4xl font-semibold md:text-5xl">Portafolio</h2>
      <div className="mt-6 flex flex-wrap gap-2" role="tablist" aria-label="Filtrar proyectos">
        {CATEGORIES.map(c => (
          <button key={c} role="tab" aria-selected={cat === c} onClick={() => setCat(c)}
            className={`border-2 border-espresso px-4 py-2 font-medium transition-colors ${cat === c ? 'bg-cherry text-butter' : 'bg-butter hover:bg-sky'}`}>{c}</button>
        ))}
      </div>

      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p, i) => (
          <button key={p.id} onClick={() => setSel(p)} aria-label={`Abrir ${p.title}`}
            className={`group relative border-2 border-espresso bg-white p-3 pb-5 text-left shadow-cut transition-transform hover:rotate-0 hover:-translate-y-1 ${i % 2 ? 'rotate-1' : '-rotate-1'}`}>
            <Photo src={p.image} alt={p.title} label={p.category} className={`aspect-[4/5] w-full ${p.tone}`} />
            <h3 className="mt-4 font-display text-xl font-semibold leading-tight">{p.title}</h3>
            <p className="mt-1 text-sm text-espresso-soft">{p.category} · {p.year}</p>
          </button>
        ))}
      </div>

      {sel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-espresso/80 p-4" onClick={() => setSel(null)}>
          <div role="dialog" aria-modal="true" aria-label={sel.title} onClick={e => e.stopPropagation()}
            className="relative grid max-h-[90vh] w-full max-w-3xl overflow-auto border-2 border-espresso bg-butter shadow-cut md:grid-cols-2">
            <button onClick={() => setSel(null)} aria-label="Cerrar" className="absolute right-3 top-3 z-10 border-2 border-espresso bg-butter p-1"><X size={20} /></button>
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
    </section>
  );
}
