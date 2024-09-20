/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gray_900: "#393939",
        gray_50: "#F3F2F2",
        gray_600: "#727272",
        gray_100: "#DDDDDD",
        gray_400: "#718096",
        primary_orange: "#C77025",
        bg_offwhite: "#f3f3f3",
        primary_900: "#5E2B00",
        primary_50: "#FFF1E6",
        primary_600: "#B05B09",
        off_white: "#F7FAFC",
        blue_600: "#161E54",
      },

      fontFamily: {
        lexend: ["Lexend,sans-serif"],
        pop: ["Poppins,sans-serif"],
      },
    },
  },
  plugins: [],
};
