/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      lg: "1280px",
    },
    extend: {
      colors: {
        primary: "#3f3a3a",
        secondary: "#8b572a",
      },
    },
  },
  plugins: [],
};
