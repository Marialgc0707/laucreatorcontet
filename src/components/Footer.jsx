import { SITE } from '../data/siteConfig';

export default function Footer() {
  return (
    <footer className="bg-cherry-dark text-butter">
      <div className="stripes-dark h-3" aria-hidden />
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-12 md:flex-row md:items-end md:justify-between">
        <p className="font-display text-3xl italic">{SITE.brand}</p>
        <p className="text-butter/90">© {new Date().getFullYear()} {SITE.brand} · {SITE.realName}. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
