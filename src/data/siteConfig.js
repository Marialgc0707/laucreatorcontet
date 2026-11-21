// ============================================================
//  CONFIGURACIÓN GLOBAL — edita aquí nombres, redes e imágenes
// ============================================================
export const SITE = {
  brand: 'laucreatorcontent',          // Hero, Navbar y redes
  realName: 'Launicar Nedwetzki',      // Sobre mí y Footer
  handle: '@laucreatorcontent',

  // 🔗 REEMPLAZA con tus enlaces reales de redes
  socials: [
    { label: 'Instagram', href: 'https://instagram.com/laucreatorcontent', icon: 'instagram' },
    { label: 'TikTok',    href: 'https://tiktok.com/@laucreatorcontent',   icon: 'tiktok' },
    { label: 'YouTube',   href: 'https://youtube.com/@laucreatorcontent',  icon: 'youtube' },
  ],

  // 🖼️ REEMPLAZA: coloca tus fotos en public/images/ con estos nombres (o cambia las rutas).
  // Si el archivo no existe, se muestra un marcador de posición.
  images: {
    hero: '/images/hero.jpg',
    about: '/images/about.jpg',
  },

  // Endpoint PHP del formulario (no cambiar salvo que muevas el archivo)
  contactEndpoint: '/api/contact.php',
};
