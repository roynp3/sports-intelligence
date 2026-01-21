/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        currents: {
          dark: '#0a1628',
          panel: '#0d1d33',
          card: '#1e293b',
          accent: '#0891b2',
          accentLight: 'rgba(8, 145, 178, 0.15)',
          accentBorder: 'rgba(8, 145, 178, 0.3)',
        }
      },
      fontFamily: {
        display: ['"DM Sans"', 'system-ui', 'sans-serif'],
        body: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      }
    },
  },
  plugins: [],
}
