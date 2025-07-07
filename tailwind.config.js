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
        'sans': ['Satoshi', ...defaultTheme.fontFamily.sans],
        'satoshi': ['Satoshi'],
        'satoshi-bold': ['Satoshi'],
        'satoshi-black': ['Satoshi'],
        'satoshi-italic': ['Satoshi'],
        'instrument': ['Instrument Serif'],
        'instrument-italic': ['Instrument Serif'],
      }
    }
  },
  plugins: [
    // Import Satoshi font from CDN Fonts
    plugin(function ({ addBase }) {
      addBase({
        '@import': 'url("https://fonts.cdnfonts.com/css/satoshi?styles=135009,135005,135007,135002,135000")',
      })
    }),

    // Import Instruments
    plugin(function ({ addBase }) {
      addBase({
        '@import': 'url("https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap")',
      })
    }),



  ],
}