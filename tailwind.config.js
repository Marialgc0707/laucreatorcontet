/** Paleta oficial de laucreatorcontent como tokens. Uso: bg-cherry, text-espresso, bg-butter-deep, etc. */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cherry:   { DEFAULT: '#8E1825', dark: '#6B0B0C' },   // vino / cereza (rosewood)
        sky:      { DEFAULT: '#C8D9EC', soft: '#CDE3E8' },   // azul cielo (botticelli)
        butter:   { DEFAULT: '#FFF8CA', deep: '#FFEDAD' },   // crema mantequilla (chiffon)
        espresso: { DEFAULT: '#2D120D', soft: '#3D2722' },   // café chocolate (textos)
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: { cut: '6px 6px 0 #2D120D' },
    },
  },
  plugins: [],
};
