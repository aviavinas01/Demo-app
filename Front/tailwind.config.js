/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'krayaa-dark': '#2B231D', // The rich dark background
        'krayaa-gold': '#F2B705', // The accent yellow/gold
        'krayaa-cream': '#F4F1EA', // For soft text
      },
      fontFamily: {
        // You can swap this with your actual aesthetic font (e.g., 'Oswald', 'Playfair Display')
        display: ['"Space Grotesk"', 'sans-serif'], 
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}