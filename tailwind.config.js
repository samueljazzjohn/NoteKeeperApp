/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html","./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      display: ["Alkatra"],
    },
    colors:{
      header:"#f5ba13",
      button:"#bg-blue-700",
      hoverButton:"#bg-blue-800",
    }
  },
  plugins: [],
}