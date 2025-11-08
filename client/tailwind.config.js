/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-green': '#2D5016',
        'secondary-green': '#4A7C2C',
        'light-green': '#8BC34A',
        'accent-orange': '#FF9800',
        'earth-brown': '#795548',
      },
    },
  },
  plugins: [],
}
