import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base '/' => sitio en la raíz de public_html. Si lo subes a una subcarpeta (ej. /portafolio/) cambia a '/portafolio/'.
export default defineConfig({
  plugins: [react()],
  base: '/',
  // Opcional en local: si tienes PHP corriendo (php -S localhost:8000 -t public), descomenta para probar el formulario.
  // server: { proxy: { '/api': 'http://localhost:8000' } },
});
