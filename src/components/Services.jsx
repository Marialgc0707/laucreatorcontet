import { Check } from 'lucide-react';
import { Star, StarField } from './Sticker';
import { SERVICES } from '../data/services';

export default function Services({ onSelect }) {
  return (
    <section id="servicios" className="relative overflow-hidden border-y-2 border-espresso bg-butter-deep">
      <StarField preset="services" />
      <div className="band bg-leopard-cherry" aria-hidden />
      <div className="section">
        <div className="pointer-events-none relative" aria-hidden>
          <Star variant="patch" tone="cherry" className="absolute right-0 top-0 hidden w-24 -rotate-12 md:block" />
        </div>
        <h2 className="text-2xl font-bold md:text-4xl"><span className="label">servicios y colaboraciones</span></h2>
        <p className="mt-3 max-w-xl text-lg text-espresso-soft">Elige un formato y te escribo con una propuesta a medida.</p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {SERVICES.map((s, i) => (
            <article key={s.name} className="relative flex flex-col border-2 border-espresso bg-butter shadow-cut">
              <Star variant={i === 1 ? 'patch' : 'studded'} tone="sky" className="absolute -right-3 -top-4 z-10 w-12 rotate-12" />
              <div className={`band-sm ${i === 1 ? 'bg-leopard-sky' : 'bg-leopard-cherry'}`} aria-hidden />
              <div className="flex flex-1 flex-col p-6">
                <p className="text-sm font-medium text-cherry">{s.tag}</p>
                <h3 className="mt-1 font-display text-2xl font-semibold leading-tight">{s.name}</h3>
                <p className="mt-3">{s.text}</p>
                <ul className="mt-4 flex-1 space-y-2">
                  {s.items.map(it => <li key={it} className="flex gap-2"><Check size={18} className="mt-1 shrink-0 text-cherry" aria-hidden />{it}</li>)}
                </ul>
                <button onClick={() => onSelect(s.name)} className="btn-primary mt-6 justify-center">Cotizar este servicio</button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
