# laucreatorcontent · Portafolio de Launicar Nedwetzki

React + Vite + Tailwind CSS + PHP (contacto). Listo para Apache/cPanel.

## Local
    npm install
    npm run dev          # http://localhost:5173
(El formulario necesita PHP: `php -S localhost:8000 -t public` y descomenta el proxy en `vite.config.js`.)

## Qué editar
| Qué | Dónde |
|---|---|
| Redes, nombre, rutas de fotos | `src/data/siteConfig.js` |
| Proyectos, imágenes, videos | `src/data/portfolioData.js` |
| Servicios y paquetes | `src/data/services.js` |
| Texto "Sobre mí", pilares, datos | `src/components/About.jsx` |
| Correo receptor, remitente y CORS | `public/api/contact.php` (bloque CONFIGURACIÓN) |
| Fotos | `public/images/` |
| Colores / fuentes | `tailwind.config.js` |

## Publicar en cPanel
1. Edita `contact.php` (TO_EMAIL, FROM_EMAIL con cuenta de tu dominio, ALLOWED_ORIGINS).
2. `npm run build`
3. Sube **el contenido** de `dist/` a `public_html` (incluye `.htaccess` —activa "mostrar archivos ocultos"— y `api/`).
4. Prueba el formulario en producción y revisa spam la primera vez.
