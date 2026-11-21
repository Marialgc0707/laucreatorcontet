import Photo from './Photo';
import { SITE } from '../data/siteConfig';

// ✏️ Edita pilares y datos clave
const PILLARS = [
  { t: 'Autenticidad', d: 'Contenido que suena a persona, no a anuncio.', c: 'bg-sky text-espresso' },
  { t: 'Calidez visual', d: 'Luz natural, tonos tierra y detalles hechos a mano.', c: 'bg-cherry text-butter' },
  { t: 'Estrategia', d: 'Cada pieza tiene un objetivo: alcance, confianza o venta.', c: 'bg-butter-deep text-espresso' },
];
const FACTS = [['+50', 'piezas creadas'], ['3', 'formatos: video, foto, UGC'], ['24 h', 'respuesta a mensajes']]; // datos de ejemplo: reemplázalos

export default function About() {
  return (
    <section id="sobre-mi" className="bg-sky-soft border-y-2 border-espresso">
      <div className="section">
        <h2 className="font-display text-4xl font-semibold md:text-5xl">Hola, soy <em className="text-cherry">{SITE.realName}</em></h2>
        <div className="mt-10 grid gap-10 md:grid-cols-[1fr_1.1fr]">
          <div className="space-y-5 text-lg leading-relaxed">
            {/* ✏️ Reemplaza este texto con tu historia real */}
            <p>Empecé grabando pequeños momentos cotidianos y descubrí que los detalles —una taza, una luz de tarde, una receta— son los que conectan con la gente.</p>
            <p>Hoy trabajo con marcas que buscan contenido cercano y bien cuidado: pienso la idea, grabo, fotografío y edito, siempre con una mirada editorial y cálida.</p>
            <figure className="relative mt-8 max-w-xs -rotate-2 border-2 border-espresso bg-white p-2 pb-8 shadow-cut">
              <Photo src={SITE.images.about} alt={`${SITE.realName}`} label="Foto (public/images/about.jpg)" className="aspect-square w-full" />
            </figure>
          </div>

          {/* Brandboard / moodboard */}
          <div className="grid grid-cols-2 gap-4 auto-rows-min">
            {PILLARS.map((p, i) => (
              <div key={p.t} className={`${p.c} border-2 border-espresso p-5 ${i === 0 ? 'col-span-2' : ''}`}>
                <h3 className="font-display text-2xl italic">{p.t}</h3><p className="mt-1">{p.d}</p>
              </div>
            ))}
            <div className="col-span-2 border-2 border-espresso bg-butter p-4">
              <p className="mb-3 font-medium">Paleta de la marca</p>
              <div className="flex h-14 overflow-hidden border-2 border-espresso">
                {['bg-cherry', 'bg-cherry-dark', 'bg-sky', 'bg-sky-soft', 'bg-butter-deep', 'bg-espresso'].map(c => <span key={c} className={`flex-1 ${c}`} />)}
              </div>
            </div>
            {FACTS.map(([n, l]) => (
              <div key={l} className="border-2 border-espresso bg-white p-4 last:col-span-2">
                <p className="font-display text-3xl font-semibold text-cherry">{n}</p><p className="text-sm">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
