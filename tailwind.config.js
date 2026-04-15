/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0f172a',
        card: 'rgba(30, 41, 59, 0.65)',
        accentStart: '#2563eb',
        accentEnd: '#7c3aed',
      },
      borderRadius: {
        '2xl': '24px',
      },
    },
  },
  plugins: [],
};
