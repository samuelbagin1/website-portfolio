const defaultTheme = require('tailwindcss/defaultTheme');
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
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
  plugins: [],
}
