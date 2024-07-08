/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        dzcode_dark: {
          primary: '#43a047',
          secondary: '#6ee7b7',
          accent: '#f97316',
          neutral: '#160716',
          'base-100': '#2c2f2a',
          info: '#008fd4',
          success: '#00a865',
          warning: '#ffc600',
          error: '#ff426b',
        },
      },
      {
        dzcode_light: {
          primary: '#43a047',
          secondary: '#352c1e',
          accent: '#f97316',
          neutral: '#cccccc',
          'base-100': '#ebe8dd',
          info: '#0ea5e9',
          success: '#00a960',
          warning: '#a54a00',
          error: '#f4002c',
        },
      },
    ],
    darkTheme: 'dzcode_dark',
  },
};
