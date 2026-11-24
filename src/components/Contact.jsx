import { useEffect, useState } from 'react';
import { AlertCircle, CheckCircle2, Facebook, Instagram, Loader2, Mail, Send } from 'lucide-react';
import { SITE } from '../data/siteConfig';
import { Star, StarField } from './Sticker';
import { SERVICES } from '../data/services';

// Iconos de marca que lucide no incluye
const TikTok = ({ size = 20 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" /></svg>;
const Pinterest = ({ size = 20 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" /></svg>;
const ICONS = { tiktok: TikTok, instagram: Instagram, facebook: Facebook, gmail: Mail, pinterest: Pinterest };
const EMPTY = { name: '', email: '', service: '', message: '', website: '' }; // "website" = honeypot (campo oculto)

export default function Contact({ preselected }) {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState('idle'); // idle | loading | success | invalid | network | error
  const [errors, setErrors] = useState({});
  const [msg, setMsg] = useState('');

  useEffect(() => { if (preselected !== undefined) setForm(f => ({ ...f, service: preselected })); }, [preselected]);
  const set = k => e => setForm({ ...form, [k]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    setStatus('loading'); setErrors({});
    try {
      const res = await fetch(SITE.contactEndpoint, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.success) { setStatus('success'); setMsg(data.message); setForm(EMPTY); }
      else if (data?.errors) { setStatus('invalid'); setErrors(data.errors); }
      else { setStatus('error'); setMsg(data?.message || 'El servidor no pudo enviar el mensaje.'); }
    } catch { setStatus('network'); }
  }

  const field = 'w-full border-2 border-espresso bg-white px-3 py-2.5';
  const Err = ({ k }) => errors[k] ? <p className="mt-1 text-sm font-medium text-cherry" role="alert">{errors[k]}</p> : null;

  return (
    <section id="contacto" className="relative overflow-hidden">
      <StarField preset="contact" />
      <div className="section">
      <div className="grid gap-12 md:grid-cols-[1fr_1.3fr]">
        <div>
          <h2 className="font-didone text-5xl uppercase leading-none md:text-7xl">Trabajemos <span className="scribble mt-2 block -rotate-2 normal-case text-cherry">juntos</span></h2>
          <p className="mt-4 text-lg leading-relaxed">Cuéntame sobre tu marca y qué quieres lograr. Respondo en un máximo de 48 horas.</p>
          <ul className="mt-8 space-y-3">
            {SITE.socials.map(s => { const I = ICONS[s.icon]; return (
              <li key={s.label}><a href={s.href} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-3 font-medium transition hover:text-cherry">
                <span className="grid h-11 w-11 place-items-center rounded-full border border-espresso/70 bg-sky transition group-hover:border-cherry group-hover:bg-cherry group-hover:text-butter"><I size={20} aria-hidden /></span>{s.label} · {s.text || SITE.handle}</a></li>
            ); })}
          </ul>
        </div>

        <form onSubmit={submit} noValidate className="relative space-y-4 border-2 border-espresso bg-butter-deep p-6 shadow-cut">
          <Star variant="patch" tone="cherry" className="absolute -bottom-5 -right-4 w-14 rotate-12" />
          {/* Honeypot: invisible para personas, los bots lo rellenan */}
          <div className="absolute -left-[9999px]" aria-hidden>
            <label>No rellenar<input tabIndex={-1} autoComplete="off" value={form.website} onChange={set('website')} /></label>
          </div>
          <div><label htmlFor="name" className="mb-1 block font-medium">Nombre</label><input id="name" className={field} value={form.name} onChange={set('name')} autoComplete="name" /><Err k="name" /></div>
          <div><label htmlFor="email" className="mb-1 block font-medium">Correo electrónico</label><input id="email" type="email" className={field} value={form.email} onChange={set('email')} autoComplete="email" /><Err k="email" /></div>
          <div><label htmlFor="service" className="mb-1 block font-medium">Servicio de interés</label>
            <select id="service" className={field} value={form.service} onChange={set('service')}>
              <option value="">Aún no lo sé</option>{SERVICES.map(s => <option key={s.name}>{s.name}</option>)}
            </select></div>
          <div><label htmlFor="message" className="mb-1 block font-medium">Mensaje</label><textarea id="message" rows={5} className={field} value={form.message} onChange={set('message')} /><Err k="message" /></div>

          <button type="submit" disabled={status === 'loading'} className="btn-primary disabled:opacity-60">
            {status === 'loading' ? <><Loader2 className="animate-spin" size={18} aria-hidden />Enviando…</> : <><Send size={18} aria-hidden />Enviar mensaje</>}
          </button>

          <div aria-live="polite">
            {status === 'success' && <p className="flex items-start gap-2 bg-sky p-3 font-medium"><CheckCircle2 className="shrink-0" aria-hidden />{msg || 'Mensaje enviado. ¡Gracias!'}</p>}
            {status === 'invalid' && <p className="flex items-start gap-2 bg-cherry p-3 font-medium text-butter"><AlertCircle className="shrink-0" aria-hidden />Revisa los campos marcados e inténtalo de nuevo.</p>}
            {status === 'error' && <p className="flex items-start gap-2 bg-cherry p-3 font-medium text-butter"><AlertCircle className="shrink-0" aria-hidden />{msg}</p>}
            {status === 'network' && <p className="flex items-start gap-2 bg-cherry p-3 font-medium text-butter"><AlertCircle className="shrink-0" aria-hidden />No hay conexión con el servidor. Revisa tu internet e inténtalo otra vez.</p>}
          </div>
        </form>
      </div>
    </div>
    </section>
  );
}
