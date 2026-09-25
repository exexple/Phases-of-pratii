/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#F8F4EE',
        blush: '#E8D5D4',
        lavender: '#DDD6E8',
        beige: '#E7DCCB',
        mist: '#D7E0E7',
        sage: '#DDE3DA',
        ink: '#343139',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'serif'],
        display: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
