// ============================================================
//  EJEMPLOS DE CONTENIDO — organizados por nicho (se muestran 4 teléfonos por nicho)
//  title: nombre del ejemplo
//  image: (opcional) portada vertical, ej. '/images/examples/skincare-1.jpg' (formato 9:16 o 4:5)
//  video: (opcional) lo que se abre al hacer clic:
//         · un video propio:  '/videos/skincare-1.mp4'   (guárdalo en public/videos/)
//         · un enlace embed:  'https://www.youtube.com/embed/ID'
//         Si no hay video, el teléfono se ve pero no abre nada.
//  Para agregar un nicho, copia un bloque { id, label, items: [...] }.
// ============================================================
export const NICHES = [
  { id: 'beauty', label: 'beauty & skincare', items: [
    { title: 'Rutina de skincare', image: '', video: '' },
    { title: 'Maquillaje paso a paso', image: '', video: '' },
    { title: 'Reseña de producto', image: '', video: '' },
    { title: 'Get ready with me', image: '', video: '' },
  ] },
  { id: 'lifestyle', label: 'lifestyle', items: [
    { title: 'Un día conmigo', image: '', video: '' },
    { title: 'Café y rutina', image: '', video: '' },
    { title: 'Outfit del día', image: '', video: '' },
    { title: 'Favoritos del mes', image: '', video: '' },
  ] },
  { id: 'mama', label: 'siendo mamá', items: [
    { title: 'Un día de mamá', image: '', video: '' },
    { title: 'Mis esenciales con bebé', image: '', video: '' },
    { title: 'Rutina de la mañana', image: '', video: '' },
    { title: 'Momentos en casa', image: '', video: '' },
  ] },
  { id: 'travel', label: 'travel', items: [
    { title: 'Escapada de fin de semana', image: '', video: '' },
    { title: 'Mi ruta favorita', image: '', video: '' },
    { title: 'Qué empacar', image: '', video: '' },
    { title: 'Rincones por descubrir', image: '', video: '' },
  ] },
];
