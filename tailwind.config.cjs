/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    './node_modules/flowbite/**/*.js'
  ],
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: ['Manrope Variable'],
    },
    extend: {
      colors: {
        primary: '#0000ff',
        secondary: '#ff0000',
        accent: '#e6e6ff',
        separator: '#9999ff',
      },
    },
    screens: {
      'tablet': '834px',
      'desktop': '1280px',
    }
  },
  plugins: [],
}
