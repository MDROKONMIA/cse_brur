/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary_bg: "#002147",
      },
      fontFamily: {
        cursive: "cursive",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
