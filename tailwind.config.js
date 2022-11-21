/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
         "brown": "#D87D4A",
         "light-brown": "#FBAF85"
      }
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
