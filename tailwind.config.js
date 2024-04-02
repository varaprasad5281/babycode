/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#EAF0FC",
          100: "#3771DD",
          500: "#135ADE",
          700: "#003392",
        },
        background: "#F7F7F7",
        defaultGray: "#6B6A6A",
      },
      fontFamily: {
        jacquesFrancois: ["Jacques Francois", "serif"],
      },
      boxShadow: {
        top: "0 -6px 6px -4px rgba(0, 0, 0, 0.2)",
      },
    },
  },
  plugins: [],
};
