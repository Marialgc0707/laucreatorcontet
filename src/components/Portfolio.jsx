import { useEffect, useState } from 'react';
import { ArrowUpRight, Check, ChevronLeft, ChevronRight, Play, X } from 'lucide-react';
import Photo from './Photo';
import { StarField } from './Sticker';
import { CATEGORIES, PROJECTS } from '../data/portfolioData';

export default function Portfolio({ onHire }) {
  const [cat, setCat] = useState('Todos');
  const [idx, setIdx] = useState(null); // posición del proyecto abierto dentro de la lista filtrada
  const list = cat === 'Todos' ? PROJECTS : PROJECTS.filter(p => p.category === cat);
  const sel = idx !== null ? list[idx] : null;
  const count = c => (c === 'Todos' ? PROJECTS.length : PROJECTS.filter(p => p.category === c).length);
  const go = d => setIdx(i => (i + d + list.length) % list.length);

  useEffect(() => {
    if (idx === null) return;
    const onKey = e => {
      if (e.key === 'Escape') setIdx(null);
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [idx, list.length]);

  return (
    <section id="portafolio" className="relative overflow-hidden grain bg-cherry text-butter">
      <StarField preset="portfolio" />
      <div className="section">
        {/* Encabezado */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 className="space-y-1 text-2xl font-bold leading-tight md:text-4xl"><span className="label">portafolio.</span><br /><span className="label">ojo para la estética.</span></h2>
          <p className="max-w-sm leading-relaxed text-butter/85">Una selección de reels, fotografía y contenido UGC pensado para marcas que quieren verse cercanas y cuidadas.</p>
        </div>

        {/* Filtros con contador */}
        <div className="flex flex-wrap gap-2 mt-8" role="tablist" aria-label="Filtrar proyectos">
          {CATEGORIES.map(c => (
            <button key={c} role="tab" aria-selected={cat === c} onClick={() => setCat(c)}
              className={`chip ${cat === c ? 'border-butter bg-butter text-espresso' : 'border-butter/60 text-butter hover:bg-butter/15'}`}>
              {c}<span className="ml-2 opacity-60">{count(c)}</span>
            </button>
          ))}
        </div>

        {/* Tarjetas */}
        <div key={cat} className="grid mt-10 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p, i) => (
            <button key={p.id} onClick={() => setIdx(i)} aria-label={`Abrir ${p.title}`} style={{ animationDelay: `${i * 70}ms` }}
              className="fade-up group flex flex-col overflow-hidden rounded-3xl bg-butter text-left text-espresso shadow-[0_24px_48px_-28px_rgba(0,0,0,.7)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_32px_56px_-26px_rgba(0,0,0,.85)]">
              <div className="band-sm bg-leopard-cherry" aria-hidden />
              <div className="relative overflow-hidden">
                <Photo src={p.image} alt={p.title} label={p.category} className={`aspect-[4/5] w-full transition duration-500 group-hover:scale-105 ${p.tone}`} />
                <span className="absolute px-3 py-1 text-xs font-semibold rounded-full shadow-sm left-3 top-3 bg-butter/95">{p.category}</span>
                {p.video && <span className="absolute grid rounded-full shadow-sm right-3 top-3 h-9 w-9 place-items-center bg-butter/95"><Play size={14} fill="currentColor" aria-hidden /></span>}
                <span className="absolute inset-x-0 bottom-0 flex items-center gap-1 p-4 pt-10 text-sm font-semibold transition duration-300 opacity-0 bg-gradient-to-t from-espresso/80 to-transparent text-butter group-hover:opacity-100">Ver proyecto <ArrowUpRight size={16} aria-hidden /></span>
              </div>
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-[.18em] text-cherry">{p.brand} · {p.year}</p>
                <h3 className="mt-2 text-xl font-semibold leading-tight font-display">{p.title}</h3>
                <p className="mt-2 text-sm line-clamp-2 text-espresso-soft">{p.summary}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Detalle del proyecto */}
      {sel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-espresso/80 backdrop-blur-sm" onClick={() => setIdx(null)}>
          <div role="dialog" aria-modal="true" aria-label={sel.title} onClick={e => e.stopPropagation()}
            className="relative grid max-h-[90vh] w-full max-w-4xl overflow-auto rounded-3xl bg-butter text-espresso shadow-2xl md:grid-cols-[1fr_1.1fr]">
            <button onClick={() => setIdx(null)} aria-label="Cerrar" className="absolute z-10 p-2 transition rounded-full shadow-md right-3 top-3 bg-butter text-espresso hover:bg-white"><X size={20} /></button>
            {sel.video
              ? <iframe src={sel.video} title={sel.title} className="aspect-[4/5] w-full md:aspect-auto md:min-h-[28rem]" allowFullScreen />
              : <Photo src={sel.image} alt={sel.title} label={sel.category} className={`aspect-[4/5] w-full md:aspect-auto md:min-h-[28rem] ${sel.tone}`} />}
            <div className="flex flex-col p-7 md:p-9">
              <div className="flex items-center justify-between text-sm">
                <span className="px-3 py-1 font-semibold rounded-full bg-espresso text-butter">{sel.category}</span>
                <span className="font-medium text-espresso-soft">{idx + 1} / {list.length}</span>
              </div>
              <h3 className="mt-4 text-3xl leading-tight font-didone md:text-4xl">{sel.title}</h3>
              <p className="mt-1 text-sm font-medium text-cherry">{sel.brand} · {sel.year}</p>
              <p className="mt-4 leading-relaxed">{sel.description}</p>
              <ul className="flex flex-wrap gap-2 mt-5">
                {sel.deliverables.map(d => <li key={d} className="inline-flex items-center gap-1.5 rounded-full border border-espresso/20 bg-white px-3 py-1 text-sm"><Check size={14} className="text-cherry" aria-hidden />{d}</li>)}
              </ul>
              <div className="flex flex-wrap items-center gap-3 pt-8 mt-auto">
                <a href="#contacto" onClick={() => { setIdx(null); onHire?.(''); }} className="btn-primary">Quiero algo así</a>
                <div className="flex gap-2 ml-auto">
                  <button onClick={() => go(-1)} aria-label="Proyecto anterior" className="grid transition border rounded-full h-11 w-11 place-items-center border-espresso/30 hover:bg-espresso hover:text-butter"><ChevronLeft size={20} /></button>
                  <button onClick={() => go(1)} aria-label="Proyecto siguiente" className="grid transition border rounded-full h-11 w-11 place-items-center border-espresso/30 hover:bg-espresso hover:text-butter"><ChevronRight size={20} /></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
