import { SITE } from '../data/siteConfig';
import { StarField } from './Sticker';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-cherry-dark text-butter">
      <StarField preset="footer" />
      <div className="band bg-leopard-espresso" aria-hidden />
      <div className="relative z-10 flex flex-col max-w-6xl gap-4 px-5 pt-20 pb-10 mx-auto md:flex-row md:items-end md:justify-between">
        <p className="text-3xl italic font-display">{SITE.brand}</p>
        <p className="text-butter/90">© {new Date().getFullYear()} {SITE.brand} · {SITE.realName}. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
