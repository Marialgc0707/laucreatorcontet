import { Check } from 'lucide-react';
import { StarField } from './Sticker';
import { SERVICES } from '../data/services';

export default function Services({ onSelect }) {
  return (
    <section id="servicios" className="relative overflow-hidden border-y-2 border-espresso bg-butter-deep">
      <StarField preset="services" />
      <div className="band bg-leopard-cherry" aria-hidden />
      <div className="section">
        {/* Encabezado */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 className="text-2xl font-bold md:text-4xl"><span className="label">servicios y colaboraciones</span></h2>
          <p className="max-w-sm leading-relaxed text-espresso-soft">Elige un formato y te escribo con una propuesta a medida.</p>
        </div>

        {/* Tarjetas: la del centro va destacada */}
        <div className="grid mt-12 gap-7 md:grid-cols-3">
          {SERVICES.map((s, i) => {
            const dark = i === 1;
            return (
              <article key={s.name} style={{ animationDelay: `${i * 90}ms` }}
                className={`fade-up relative flex flex-col overflow-hidden rounded-3xl shadow-[0_24px_48px_-28px_rgba(45,18,13,.55)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_32px_56px_-26px_rgba(45,18,13,.7)] ${dark ? 'bg-cherry text-butter md:-translate-y-3' : 'border border-espresso/10 bg-butter text-espresso'}`}>
                <div className="band-sm bg-leopard-cherry" aria-hidden />
                <div className="flex flex-col flex-1 p-7">
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-semibold uppercase tracking-[.18em] ${dark ? 'text-butter/80' : 'text-cherry'}`}>{s.tag}</span>
                    <span className="text-3xl font-didone opacity-30" aria-hidden>0{i + 1}</span>
                  </div>
                  <h3 className="mt-4 text-2xl font-semibold leading-tight font-display">{s.name}</h3>
                  <p className="mt-3 opacity-90">{s.text}</p>
                  <ul className="mt-5 flex-1 space-y-2.5 text-sm">
                    {s.items.map(it => (
                      <li key={it} className="flex gap-2.5">
                        <span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${dark ? 'bg-butter text-cherry' : 'bg-cherry text-butter'}`}><Check size={12} strokeWidth={3} aria-hidden /></span>{it}
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => onSelect(s.name)} className={`${dark ? 'btn-light' : 'btn-primary'} mt-7 w-full`}>Cotizar este servicio</button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Paquete a medida */}
        <div className="flex flex-col items-center justify-between gap-4 p-6 mt-12 text-center border fade-up rounded-3xl border-espresso/15 bg-white/60 md:flex-row md:px-8 md:text-left">
          <p><span className="text-2xl font-didone">¿Necesitas algo distinto?</span><br /><span className="text-espresso-soft">Cuéntame tu idea y armamos un paquete a medida.</span></p>
          <button onClick={() => onSelect('')} className="btn-ghost">Escríbeme</button>
        </div>
      </div>
    </section>
  );
}
