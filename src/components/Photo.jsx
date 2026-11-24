import { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';

// Muestra la imagen; si falta o no carga, muestra un marcador de posición.
export default function Photo({ src, alt, label = 'Tu foto aquí', className = '' }) {
  const [failed, setFailed] = useState(false);
  // Rutas que empiezan con '/' llevan la base del sitio (GitHub Pages sirve en /nombre-del-repo/)
  const url = src && src.startsWith('/') ? import.meta.env.BASE_URL + src.slice(1) : src;
  if (src && !failed) return <img src={url} alt={alt} loading="lazy" onError={() => setFailed(true)} className={`object-cover ${className}`} />;
  return (
    <div role="img" aria-label={alt} className={`flex flex-col items-center justify-center gap-2 bg-sky-soft text-espresso-soft ${className}`}>
      <ImageIcon size={28} aria-hidden /><span className="text-sm font-medium">{label}</span>
    </div>
  );
}
