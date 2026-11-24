import { SITE } from '../data/siteConfig';
import { StarField } from './Sticker';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-cherry-dark text-butter">
      <StarField preset="footer" />
      <div className="band bg-leopard-espresso" aria-hidden />
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-4 px-5 pb-10 pt-20 md:flex-row md:items-end md:justify-between">
        <p className="font-display text-3xl italic">{SITE.brand}</p>
        <p className="text-butter/90">© {new Date().getFullYear()} {SITE.brand} · {SITE.realName}. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
