import { Check } from 'lucide-react';
import { Star, StarField } from './Sticker';
import { SERVICES } from '../data/services';

export default function Services({ onSelect }) {
  return (
    <section id="servicios" className="relative overflow-hidden border-y-2 border-espresso bg-butter-deep">
      <StarField preset="services" />
      <div className="band bg-leopard-cherry" aria-hidden />
      <div className="section">
        <div className="relative pointer-events-none" aria-hidden>
          <Star variant="patch" tone="cherry" className="absolute top-0 right-0 hidden w-24 -rotate-12 md:block" />
        </div>
        <h2 className="text-2xl font-bold md:text-4xl"><span className="label">servicios y colaboraciones</span></h2>
        <p className="max-w-xl mt-3 text-lg text-espresso-soft">Elige un formato y te escribo con una propuesta a medida.</p>
        <div className="grid gap-6 mt-10 md:grid-cols-3">
          {SERVICES.map((s, i) => (
            <article key={s.name} className="relative flex flex-col border-2 border-espresso bg-butter shadow-cut">
              <Star variant={i === 1 ? 'patch' : 'studded'} tone="sky" className="absolute z-10 w-12 -right-3 -top-4 rotate-12" />
              <div className={`band-sm ${i === 1 ? 'bg-leopard-sky' : 'bg-leopard-cherry'}`} aria-hidden />
              <div className="flex flex-col flex-1 p-6">
                <p className="text-sm font-medium text-cherry">{s.tag}</p>
                <h3 className="mt-1 text-2xl font-semibold leading-tight font-display">{s.name}</h3>
                <p className="mt-3">{s.text}</p>
                <ul className="flex-1 mt-4 space-y-2">
                  {s.items.map(it => <li key={it} className="flex gap-2"><Check size={18} className="mt-1 shrink-0 text-cherry" aria-hidden />{it}</li>)}
                </ul>
                <button onClick={() => onSelect(s.name)} className="justify-center mt-6 btn-primary">Cotizar este servicio</button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
