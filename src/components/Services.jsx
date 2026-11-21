import { Check } from 'lucide-react';
import { SERVICES } from '../data/services';

export default function Services({ onSelect }) {
  return (
    <section id="servicios" className="border-y-2 border-espresso bg-butter-deep">
      <div className="section">
        <h2 className="font-display text-4xl font-semibold md:text-5xl">Servicios y colaboraciones</h2>
        <p className="mt-3 max-w-xl text-lg text-espresso-soft">Elige un formato y te escribo con una propuesta a medida.</p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {SERVICES.map((s, i) => (
            <article key={s.name} className="flex flex-col border-2 border-espresso bg-butter shadow-cut">
              <div className={`${i === 1 ? 'stripes-sky' : 'stripes'} h-3`} aria-hidden />
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
