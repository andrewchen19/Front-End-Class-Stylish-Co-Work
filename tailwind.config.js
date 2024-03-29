/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3f3a3a",
        secondary: "#8b572a",
      },
    },
  },
  plugins: [],
};
