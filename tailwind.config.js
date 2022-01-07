const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", ...fontFamily.sans],
      },
      colors: {
        "font-color": { DEFAULT: "#CFD8DC", dark: "#78909C" },
        primary: "#D500F9",
        secondary: "#3D5AFE",
      },
    },
  },
  plugins: [],
};
