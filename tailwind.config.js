/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        arabic: ["Cairo", "Tajawal", "sans-serif"],
      },
      animation: {
        float: "float 3s ease-in-out infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "bounce-slow": "bounce 2s infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      colors: {
        glass: {
          white: "rgba(255, 255, 255, 0.1)",
          black: "rgba(0, 0, 0, 0.1)",
        },
        primary: {
          50: "#f0f9f4",
          100: "#dcf4e4", 
          200: "#bce7cc",
          300: "#8dd5a7",
          400: "#52ba7b",
          500: "#2d6d4f",
          600: "#1b4332",
          700: "#163a2a",
          800: "#142f24",
          900: "#11261e",
        },
        accent: {
          50: "#f0f9f4",
          100: "#dcf4e4",
          200: "#bce7cc", 
          300: "#8dd5a7",
          400: "#52ba7b",
          500: "#2d6d4f",
          600: "#1f5a3d",
          700: "#1a4d33",
          800: "#163e2a",
          900: "#133224",
        },
        light: {
          50: "#fdfcfd",
          100: "#f9f7fa", 
          200: "#f1eef4",
          300: "#e7e3eb",
          400: "#dbd2e0",
          500: "#cfc3d5",
          600: "#b5a5be",
          700: "#9b8aa7",
          800: "#7d6b8a",
          900: "#5f516b",
        },
      },
    },
  },
  plugins: [],
};
