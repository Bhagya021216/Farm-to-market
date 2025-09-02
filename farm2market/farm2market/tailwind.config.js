/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#effdf5",
          100: "#d9fbe8",
          200: "#b4f6d3",
          300: "#80eebe",
          400: "#47dfa3",
          500: "#22c787",
          600: "#16a173",
          700: "#127f5d",
          800: "#11634b",
          900: "#0f513f"
        }
      },
      boxShadow: {
        card: "0 8px 24px rgba(0,0,0,0.08)"
      },
      borderRadius: {
        "2xl": "1.25rem"
      }
    },
  },
  plugins: [],
}
