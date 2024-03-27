/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#3771DD",
          500: "#135ADE",
          700: "#003392",
        },
      },
      fontFamily: {
        jacquesFrancois: ["Jacques Francois", "serif"],
      },
    },
  },
  plugins: [],
};
