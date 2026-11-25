import { BRANDS } from '../data/brands';

// Letra para cuando una marca no tiene logo (se elige con `style` en src/data/brands.js)
const STYLES = {
  caps: 'font-didone uppercase tracking-[.16em] text-sm',
  serif: 'font-display italic text-xl leading-tight',
  wide: 'font-sans font-bold uppercase tracking-[.28em] text-[.7rem]',
  bold: 'font-sans font-black uppercase tracking-tight text-xl',
  script: 'font-marker text-xl leading-tight',
};

// "Marcas que confiaron en mí": cada marca dentro de un círculo. Logo si existe, si no el nombre.
export default function Brands() {
  return (
    <div className="section lg:px-20">
      <p className="mb-3 text-center text-xs font-semibold uppercase tracking-[.35em] text-cherry">Colaboraciones</p>
      <h3 className="text-center font-didone text-3xl leading-tight md:text-5xl">
        Marcas que <span className="scribble inline-block -rotate-3 text-cherry">confiaron</span> en mí
      </h3>
      <div className="mx-auto mt-5 h-px w-16 bg-espresso/40" aria-hidden />
      <ul className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
        {BRANDS.map(b => (
          <li key={b.name}
            className="group flex aspect-square w-full max-w-[9.5rem] items-center justify-center justify-self-center overflow-hidden rounded-full border border-espresso/20 bg-white/70 text-center text-espresso shadow-[0_10px_28px_-16px_rgba(45,18,13,.45)] transition duration-300 hover:-translate-y-1 hover:border-cherry/60 hover:bg-white hover:shadow-[0_18px_34px_-16px_rgba(142,24,37,.45)]">
            {b.logo
              ? <img src={b.logo.startsWith('/') ? import.meta.env.BASE_URL + b.logo.slice(1) : b.logo} alt={b.name} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              : <span className={`${STYLES[b.style] || STYLES.caps} p-5`}>{b.name}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}
