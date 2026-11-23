/** Paleta oficial de laucreatorcontent como tokens. Uso: bg-cherry, text-espresso, bg-butter-deep, etc.
 *  Leopardo: usa la foto public/images/leopard.jpg tal cual (mosaico espejo, se repite sin costuras).
 *  Clases: bg-leopard (y bg-leopard-cherry / -sky / -espresso, que usan la misma imagen). */
const LEOPARD = "url('/images/leopard.jpg')";

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cherry:   { DEFAULT: '#8E1825', dark: '#6B0B0C' },
        sky:      { DEFAULT: '#C8D9EC', soft: '#CDE3E8' },
        butter:   { DEFAULT: '#FFF8CA', deep: '#FFEDAD' },
        espresso: { DEFAULT: '#2D120D', soft: '#3D2722' },
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        didone: ['"Bodoni Moda"', 'Didot', 'serif'],
        marker: ['"Permanent Marker"', 'cursive'],
      },
      boxShadow: { cut: '6px 6px 0 #2D120D' },
      backgroundImage: {
        leopard: LEOPARD,
        'leopard-cherry': LEOPARD,
        'leopard-sky': LEOPARD,
        'leopard-espresso': LEOPARD,
      },
    },
  },
  plugins: [],
};
