/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-require-imports */
const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'min-1500px': '1500px', // Define tu tamaño personalizado
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.no-spinner': {
          '-moz-appearance': 'textfield', // Firefox
          '-webkit-appearance': 'none',  // Chrome, Safari, Edge moderno
          'margin': '0',
        },
        '.no-spinner::-webkit-inner-spin-button': {
          '-webkit-appearance': 'none',
        },
        '.no-spinner::-webkit-outer-spin-button': {
          '-webkit-appearance': 'none',
        },
      });
    }),
    require('tailwind-scrollbar-hide'),
  ]
}