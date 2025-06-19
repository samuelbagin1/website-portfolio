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
        '@import': 'url("https://fonts.cdnfonts.com/css/satoshi")',
      })
    }),
    
    // Define Satoshi font faces
    plugin(function ({ addBase }) {
      addBase({
        '@font-face': [
          {
            fontFamily: 'Satoshi',
            fontWeight: '300',
            fontStyle: 'normal',
            src: 'url("https://fonts.cdnfonts.com/s/19808/Satoshi-Light.woff") format("woff")',
          },
          {
            fontFamily: 'Satoshi',
            fontWeight: '400',
            fontStyle: 'normal',
            src: 'url("https://fonts.cdnfonts.com/s/19808/Satoshi-Regular.woff") format("woff")',
          },
          {
            fontFamily: 'Satoshi',
            fontWeight: '500',
            fontStyle: 'normal',
            src: 'url("https://fonts.cdnfonts.com/s/19808/Satoshi-Medium.woff") format("woff")',
          },
          {
            fontFamily: 'Satoshi',
            fontWeight: '700',
            fontStyle: 'normal',
            src: 'url("https://fonts.cdnfonts.com/s/19808/Satoshi-Bold.woff") format("woff")',
          },
          {
            fontFamily: 'Satoshi',
            fontWeight: '900',
            fontStyle: 'normal',
            src: 'url("https://fonts.cdnfonts.com/s/19808/Satoshi-Black.woff") format("woff")',
          },
          {
            fontFamily: 'Satoshi',
            fontWeight: '400',
            fontStyle: 'italic',
            src: 'url("https://fonts.cdnfonts.com/s/19808/Satoshi-Italic.woff") format("woff")',
          },
          {
            fontFamily: 'Satoshi',
            fontWeight: '700',
            fontStyle: 'italic',
            src: 'url("https://fonts.cdnfonts.com/s/19808/Satoshi-BoldItalic.woff") format("woff")',
          },
          {
            fontFamily: 'Satoshi',
            fontWeight: '900',
            fontStyle: 'italic',
            src: 'url("https://fonts.cdnfonts.com/s/19808/Satoshi-BlackItalic.woff") format("woff")',
          }
        ]
      })
    }),


    // Define Instrument Serif font faces
    plugin(function ({ addBase }) {
      addBase({
        '@font-face': [
          {
            fontFamily: 'Instrument Serif',
            fontWeight: '400',
            fontStyle: 'normal',
            src: 'url("https://fonts.gstatic.com/s/instrumentserif/v1/jxHHdHHq1sWZ9YDYHSJnqYKHdjI7uzVOkIbj.woff2") format("woff2")',
          },
          {
            fontFamily: 'Instrument Serif',
            fontWeight: '400',
            fontStyle: 'italic',
            src: 'url("https://fonts.gstatic.com/s/instrumentserif/v1/jxHDdHHq1sWZ9YDYHSJnqYKHdiZ8lzHDNwPdBa8.woff2") format("woff2")',
          }
        ]
      })
    }),
  ],
}