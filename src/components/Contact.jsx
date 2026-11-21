import { useEffect, useState } from 'react';
import { AlertCircle, CheckCircle2, Instagram, Loader2, Music2, Send, Youtube } from 'lucide-react';
import { SITE } from '../data/siteConfig';
import { SERVICES } from '../data/services';

const ICONS = { instagram: Instagram, tiktok: Music2, youtube: Youtube };
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
    <section id="contacto" className="section">
      <div className="grid gap-12 md:grid-cols-[1fr_1.3fr]">
        <div>
          <h2 className="font-display text-4xl font-semibold md:text-5xl">Trabajemos <em className="text-cherry">juntos</em></h2>
          <p className="mt-4 text-lg leading-relaxed">Cuéntame sobre tu marca y qué quieres lograr. Respondo en un máximo de 48 horas.</p>
          <ul className="mt-8 space-y-3">
            {SITE.socials.map(s => { const I = ICONS[s.icon]; return (
              <li key={s.label}><a href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 font-medium hover:text-cherry">
                <span className="border-2 border-espresso bg-sky p-2"><I size={20} aria-hidden /></span>{s.label} · {SITE.handle}</a></li>
            ); })}
          </ul>
        </div>

        <form onSubmit={submit} noValidate className="space-y-4 border-2 border-espresso bg-butter-deep p-6 shadow-cut">
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
    </section>
  );
}
