const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", ...fontFamily.sans],
      },
      colors: {
        "font-color": "#CFD8DC",
        primary: "#D500F9",
      },
    },
  },
  plugins: [],
};
