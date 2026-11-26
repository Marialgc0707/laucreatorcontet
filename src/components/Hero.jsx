import Photo from './Photo';
import { Star, StarField } from './Sticker';
import { SITE } from '../data/siteConfig';

export default function Hero() {
  return (
    <section id="inicio" className="relative pt-24 overflow-hidden grain bg-cherry text-butter">
      <StarField preset="hero" />
      <div className="relative z-10 max-w-6xl px-5 pt-8 mx-auto">
        {/* Marco fino con datos, como en la referencia */}
        <div className="flex justify-between gap-x-6 border border-butter/80 px-4 py-1.5 text-sm">
          <span>{SITE.handle}</span><span className="hidden sm:inline">{SITE.realName}</span><span>creadora de contenido</span>
        </div>

        <div className="grid items-end gap-4 md:grid-cols-[1fr_1.25fr]">
          {/* 🖼️ PNG recortado con la silueta ya incluida (public/images/hero.png) */}
          <div className="relative order-2 w-full max-w-md pt-6 mx-auto md:order-1">
            <Photo src={SITE.images.hero} alt={`Retrato de ${SITE.brand}`} label="Foto recortada (public/images/hero.png)" className="relative aspect-[124/129] w-full" />
            <Star variant="leopard" className="absolute -right-4 bottom-2 w-28 rotate-6 md:-right-12 md:w-44" />
          </div>

          <div className="order-1 pt-10 pb-6 md:order-2 md:pb-20">
            <span className="text-2xl label md:text-4xl">conoce a la</span>
            <h1 className="mt-2 font-didone text-[clamp(3rem,10.5vw,7.5rem)] uppercase leading-[.9]">Creadora</h1>
            <div className="mt-1 h-0.5 w-full max-w-md bg-butter" aria-hidden />
            <p className="mt-6 pill">* portafolio · UGC, foto y video</p>
            <p className="max-w-md mt-6 text-lg leading-relaxed">
              Historias visuales cálidas que hacen que tu marca se sienta cercana: reels con ritmo, fotografía con intención y contenido real.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <a href="#portafolio" className="btn-light">Ver portafolio</a>
              <a href="#contacto" className="btn-outline-light">Trabajemos juntos</a>
            </div>
            <p className="mt-6 text-3xl scribble -rotate-6 text-butter/90" aria-hidden>{SITE.brand.slice(0, 3)}.</p>
          </div>
        </div>
      </div>
      <div className="band bg-leopard-espresso" aria-hidden />
    </section>
  );
}
