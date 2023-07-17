/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      sans: [
        "Roboto",
        "ui-sans-serif",
        "system-ui",
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        '"Helvetica Neue"',
        "Arial",
        '"Noto Sans"',
        "sans-serif",
      ],
      accent: "Antonio",
    },
    extend: {
      colors: {
        primary: "#5f1fc2",
        secondary: "#e4ff03",

        accent: "#e6e6ff",
        label: "#8080ff",
        separator: "#9999ff",
      },
      scale: {
        "-100": "-1",
      },
    },
    screens: {
      mobile: "420px",
      tablet: "834px",
      laptop: "1024px",
      desktop: "1280px",
    },
  },
  plugins: [],
};
