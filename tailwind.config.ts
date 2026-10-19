import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          950: "#0b0d14",
          900: "#121420",
          850: "#181b2a",
          800: "#202436",
          700: "#2b3046",
          600: "#3d435d",
        },
        gris: {
          50: "#f8f9fa",
          100: "#f1f3f5",
          200: "#e9ecef",
          300: "#dee2e6",
          400: "#ced4da",
          500: "#adb5bd",
          600: "#6c757d",
          700: "#495057",
          800: "#343a40",
          900: "#212529",
        },
        beige: {
          50: "#fcfaf7",
          100: "#f7f3ee",
          200: "#efe6db",
          300: "#e4d6c4",
          400: "#d3bea6",
          500: "#bfa386",
          600: "#a98a6c",
          700: "#8c6f55",
          800: "#735a46",
          900: "#5e4939",
        },
        brand: {
          DEFAULT: "#5046e5",
          hover: "#4338ca",
          light: "#eef2ff",
          dark: "#3730a3",
        },
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        serif: ["Playfair Display", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
