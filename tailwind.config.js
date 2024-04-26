const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'sans': ['satoshi', ...defaultTheme.fontFamily.sans],
        'boldd': ['satoshiBold'],
        'italic': ['satoshiItalic'],
        'black': ['satoshiBlack'],
        'fraunces': ['Fraunces'],
      }
    }
  },
  plugins: [
    plugin(function ({ addBase }) {
      addBase({
        '@font-face': {
            fontFamily: 'satoshi',
            fontWeight: '400',
            src: 'url(./assets/Satoshi-Regular.otf)'
        }
      })
    }),
    plugin(function ({ addBase }) {
      addBase({
        '@font-face': {
            fontFamily: 'satoshiBold',
            fontWeight: '700',
            src: 'url(./assets/Satoshi-Bold.otf)'
        }
      })
    }),
    plugin(function ({ addBase }) {
      addBase({
        '@font-face': {
            fontFamily: 'satoshiBlack',
            fontWeight: '900',
            src: 'url(./assets/Satoshi-Black.otf)'
        }
      })
    }),
    plugin(function ({ addBase }) {
      addBase({
        '@font-face': {
            fontFamily: 'satoshiItalic',
            fontWeight: '400',
            src: 'url(./assets/Satoshi-Italic.otf)'
        }
      })
    }),
    plugin(function ({ addBase }) {
      addBase({
        '@font-face': {
            fontFamily: 'Fraunces',
            fontWeight: '700',
            src: 'url(./assets/Fraunces.ttf)'
        }
      })
    }),
  ],

}

