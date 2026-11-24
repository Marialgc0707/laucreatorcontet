// ============================================================
//  CONFIGURACIÓN GLOBAL — edita aquí nombres, redes e imágenes
// ============================================================
export const SITE = {
  brand: 'laucreatorcontent',          // Hero, Navbar y redes
  realName: 'Launicar Nedwetzki',      // Sobre mí y Footer
  handle: '@laucreatorcontent',

  // 🔗 REEMPLAZA con tus enlaces reales de redes
  socials: [
    { label: 'TikTok',    href: 'https://tiktok.com/@laucreatorcontent',       icon: 'tiktok' },
    { label: 'Instagram', href: 'https://instagram.com/laucreatorcontent',     icon: 'instagram' },
    { label: 'Facebook',  href: 'https://facebook.com/laucreatorcontent',      icon: 'facebook' },
    { label: 'Gmail',     href: 'mailto:tucorreo@gmail.com',                   icon: 'gmail', text: 'tucorreo@gmail.com' }, // ✏️ pon tu correo real
    { label: 'Pinterest', href: 'https://pinterest.com/laucreatorcontent',     icon: 'pinterest' },
  ],

  // 🖼️ REEMPLAZA: coloca tus fotos en public/images/ con estos nombres (o cambia las rutas).
  // Si el archivo no existe, se muestra un marcador de posición.
  images: {
    hero: '/images/hero.png',
    about: '/images/about.jpg',
  },

  // Endpoint PHP del formulario (no cambiar salvo que muevas el archivo)
  contactEndpoint: '/api/contact.php',
};
