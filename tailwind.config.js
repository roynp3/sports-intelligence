/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      colors: {
        currents: {
          dark: '#0a1628',
          navy: '#0d1d33',
          cyan: '#06b6d4',
        }
      }
    },
  },
  plugins: [],
}
