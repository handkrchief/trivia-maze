/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
      'xs':'200px',
      'sm': '400px',
      'md': '666px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1920px',
      '3xl':'2000px',
    },
  },
  },
  plugins: [],
}