module.exports = {
  // mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {},
    screens: {
      sm: "500px",
      // md: "768px",
      // lg: "1024px",
      // xl: "1280px",
      "2xl": "500px",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
