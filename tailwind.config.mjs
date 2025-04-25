/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          '50': '#ffe6e6',
          '100': '#ffcccc',
          '200': '#ff9999',
          '300': '#ff6666',
          '400': '#ff3333',
          '500': '#ff0000',
          '600': '#cc0000',
          '700': '#990000',
          '800': '#660000',
          '900': '#330000',
          '950': '#190000',
        },
        secondary: {
          '50': '#fffaeb',
          '100': '#fef3c7',
          '200': '#fde58a',
          '300': '#fbd24e',
          '400': '#f9be26',
          '500': '#f59e0b',
          '600': '#d97706',
          '700': '#b45309',
          '800': '#92400e',
          '900': '#783610',
          '950': '#431c07',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
    },
  },
  plugins: [],
};
