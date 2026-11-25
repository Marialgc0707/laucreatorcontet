import { useEffect, useState } from 'react';
import { Play, X } from 'lucide-react';
import { StarField } from './Sticker';
import { NICHES } from '../data/examples';

const url = p => (p && p.startsWith('/') ? import.meta.env.BASE_URL + p.slice(1) : p);
const TONES = ['bg-cherry', 'bg-sky', 'bg-butter-deep', 'bg-espresso-soft'];

// "Ejemplos de contenido": teléfonos con video, organizados por nicho.
export default function ContentExamples() {
  const [id, setId] = useState(NICHES[0].id);
  const [sel, setSel] = useState(null);
  const niche = NICHES.find(n => n.id === id);

  useEffect(() => {
    if (!sel) return;
    const onKey = e => e.key === 'Escape' && setSel(null);
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [sel]);

  return (
    <section id="ejemplos" className="relative overflow-hidden border-y-2 border-espresso bg-sky-soft">
      <StarField preset="examples" />
      <div className="band bg-leopard-cherry" aria-hidden />
      <div className="section">
        <div className="relative mx-auto w-fit text-center">
          <h2 className="font-didone text-4xl leading-[.95] md:text-6xl">Ejemplos de<br /><span className="ml-10 inline-block">contenido</span></h2>
          <span className="scribble absolute -top-5 hidden -rotate-6 whitespace-nowrap text-3xl text-cherry md:block md:-right-28">{niche.label}</span>
        </div>
        <p className="scribble mt-4 -rotate-2 text-center text-2xl text-cherry md:hidden">{niche.label}</p>

        <div className="mt-8 flex flex-wrap justify-center gap-2" role="tablist" aria-label="Nichos">
          {NICHES.map(n => (
            <button key={n.id} role="tab" aria-selected={id === n.id} onClick={() => setId(n.id)}
              className={`chip capitalize ${id === n.id ? 'border-espresso bg-espresso text-butter' : 'border-espresso/50 text-espresso hover:bg-espresso/10'}`}>{n.label}</button>
          ))}
        </div>

        <ul className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
          {niche.items.map((it, i) => (
            <li key={it.title} className={i % 2 ? 'md:translate-y-6' : ''}>
              <button type="button" disabled={!it.video} onClick={() => setSel(it)} aria-label={`Ver ${it.title}`} className="group block w-full disabled:cursor-default">
                <div className={`relative mx-auto aspect-[9/19] w-full max-w-[11rem] overflow-hidden rounded-[1.6rem] border-[5px] border-espresso bg-espresso shadow-[0_16px_30px_-14px_rgba(45,18,13,.6)] transition duration-300 group-hover:-translate-y-1 ${i % 2 ? 'rotate-1' : '-rotate-1'}`}>
                  <span className="absolute left-1/2 top-1.5 z-10 h-1.5 w-10 -translate-x-1/2 rounded-full bg-espresso" aria-hidden />
                  {it.image
                    ? <img src={url(it.image)} alt={it.title} loading="lazy" className="h-full w-full object-cover" />
                    : <div className={`h-full w-full ${TONES[i % 4]}`}><span className="absolute inset-x-0 bottom-4 text-center text-[10px] font-medium uppercase tracking-widest text-butter/80">tu video aquí</span></div>}
                  <span className="absolute inset-0 grid place-items-center">
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-butter/90 text-espresso shadow-md transition group-hover:scale-110"><Play size={18} fill="currentColor" aria-hidden /></span>
                  </span>
                </div>
                <p className="mt-4 text-center text-sm font-medium">{it.title}</p>
              </button>
            </li>
          ))}
        </ul>

      </div>

      {sel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-espresso/80 p-4" onClick={() => setSel(null)}>
          <div role="dialog" aria-modal="true" aria-label={sel.title} onClick={e => e.stopPropagation()} className="relative w-full max-w-xs">
            <button onClick={() => setSel(null)} aria-label="Cerrar" className="absolute -right-3 -top-3 z-10 rounded-full bg-butter p-2 text-espresso shadow-md transition hover:bg-white"><X size={20} /></button>
            {/\.(mp4|webm)$/i.test(sel.video)
              ? <video src={url(sel.video)} controls autoPlay playsInline className="aspect-[9/16] w-full rounded-2xl bg-espresso object-cover" />
              : <iframe src={sel.video} title={sel.title} allow="autoplay; fullscreen" allowFullScreen className="aspect-[9/16] w-full rounded-2xl border-0 bg-espresso" />}
          </div>
        </div>
      )}
    </section>
  );
}
