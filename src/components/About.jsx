import Photo from './Photo';
import Brands from './Brands';
import { Star, StarField } from './Sticker';
import { SITE } from '../data/siteConfig';

export default function About() {
  return (
    <section id="sobre-mi" className="relative overflow-hidden border-y-2 border-espresso bg-butter">
      <StarField preset="about" />
      <div className="band bg-leopard-cherry" aria-hidden />
      {/* Columnas de leopardo a ambos lados (solo en pantallas grandes) */}
      <div className="absolute inset-y-0 left-0 hidden w-14 border-r-2 border-espresso bg-leopard-cherry lg:block" aria-hidden />
      <div className="absolute inset-y-0 right-0 hidden w-14 border-l-2 border-espresso bg-leopard-cherry lg:block" aria-hidden />

      {/* Biografía + foto */}
      <div className="section lg:px-20">
        <div className="grid items-center gap-12 md:grid-cols-[1.2fr_1fr]">
          <div>
            <h2>
              <span className="label text-2xl md:text-4xl">hola, soy</span>
              <span className="scribble mt-3 block -rotate-2 text-4xl text-cherry md:text-6xl">{SITE.realName}</span>
            </h2>
            {/* ✏️ Reemplaza este texto con tu historia real */}
            <div className="mt-8 space-y-5 text-lg leading-relaxed">
              <p>Empecé grabando pequeños momentos cotidianos y descubrí que los detalles —una taza, una luz de tarde, una receta— son los que conectan con la gente.</p>
              <p>Hoy trabajo con marcas que buscan contenido cercano y bien cuidado: pienso la idea, grabo, fotografío y edito, siempre con una mirada editorial y cálida.</p>
            </div>
          </div>
          <figure className="relative mx-auto w-full max-w-xs rotate-2 border-2 border-espresso bg-white p-2 pb-8 shadow-cut">
            <Photo src={SITE.images.about} alt={`${SITE.realName}`} label="Foto (public/images/about.jpg)" className="aspect-square w-full" />
            <Star variant="studded" className="absolute -right-6 -top-6 w-16 rotate-12" />
          </figure>
        </div>
      </div>

      {/* Separador de leopardo */}
      <div className="band relative z-10 border-y-2 border-espresso bg-leopard-cherry" aria-hidden />

      {/* Marcas */}
      <Brands />
    </section>
  );
}
