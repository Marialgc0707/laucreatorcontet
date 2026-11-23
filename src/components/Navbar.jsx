import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { SITE } from '../data/siteConfig';
import { Star } from './Sticker';

const LINKS = [['Inicio', '#inicio'], ['Sobre mí', '#sobre-mi'], ['Portafolio', '#portafolio'], ['Servicios', '#servicios'], ['Contacto', '#contacto']];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b-2 border-espresso bg-butter/95 backdrop-blur">
      <div className="band-sm bg-leopard-cherry" aria-hidden />
      <nav className="flex items-center justify-between max-w-6xl px-5 py-3 mx-auto" aria-label="Principal">
        <a href="#inicio" className="text-xl italic font-semibold font-display text-cherry">{SITE.brand}<Star variant="studded" className="ml-1.5 inline-block w-5 align-middle" /></a>
        <ul className="hidden gap-7 md:flex">
          {LINKS.map(([l, h]) => <li key={h}><a href={h} className="font-medium hover:text-cherry hover:underline decoration-2 underline-offset-8">{l}</a></li>)}
        </ul>
        <button className="p-2 md:hidden" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? 'Cerrar menú' : 'Abrir menú'}>
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      {open && (
        <ul className="px-5 pb-4 border-t-2 border-espresso bg-butter md:hidden">
          {LINKS.map(([l, h]) => <li key={h}><a href={h} onClick={() => setOpen(false)} className="block py-3 font-medium border-b border-espresso/15">{l}</a></li>)}
        </ul>
      )}
    </header>
  );
}
