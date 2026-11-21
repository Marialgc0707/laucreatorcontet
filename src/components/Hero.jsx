import Photo from './Photo';
import { SITE } from '../data/siteConfig';

export default function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-butter pt-24">
      {/* Banda vertical de rayas, elemento decorativo principal */}
      <div className="stripes absolute inset-y-0 left-0 hidden w-24 md:block" aria-hidden />
      <div className="absolute right-0 top-0 hidden h-full w-1/3 bg-sky md:block" aria-hidden />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 md:grid-cols-[1.25fr_1fr] md:py-24 md:pl-32">
        <div>
          <p className="mb-4 inline-block bg-cherry px-3 py-1 font-medium text-butter">Creadora de contenido · UGC · Foto · Video</p>
          <h1 className="font-display text-[2.6rem] font-semibold leading-[1.02] text-espresso sm:text-6xl lg:text-7xl break-words">
            <span className="italic text-cherry">lau</span>creator<span className="italic">content</span>
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-espresso-soft">
            Historias visuales cálidas que hacen que tu marca se sienta cercana: reels con ritmo, fotografía con
            intención y contenido real que la gente guarda y comparte.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#portafolio" className="btn-primary">Ver portafolio</a>
            <a href="#contacto" className="btn-ghost">Trabajemos juntos</a>
          </div>
        </div>

        {/* 🖼️ Foto principal con marco scrapbook (cambia SITE.images.hero) */}
        <figure className="stick-in relative mx-auto w-full max-w-sm border-2 border-espresso bg-white p-3 pb-14 shadow-cut">
          <span className="tape" aria-hidden />
          <Photo src={SITE.images.hero} alt={`Retrato de ${SITE.brand}`} label="Foto principal (public/images/hero.jpg)" className="aspect-[4/5] w-full" />
          <figcaption className="absolute inset-x-0 bottom-3 text-center font-display text-lg italic text-cherry">{SITE.handle}</figcaption>
        </figure>
      </div>
      <div className="stripes-dark h-3" aria-hidden />
    </section>
  );
}
