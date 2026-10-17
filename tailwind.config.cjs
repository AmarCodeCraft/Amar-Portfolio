/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#0B0F19",
        secondary: "#94A3B8",
        tertiary: "#111827",
        "black-100": "#131B2E",
        "black-200": "#1E293B",
        "white-100": "#F8FAFC",
        accent: {
          DEFAULT: "#6366F1",
          light: "#818CF8",
          dark: "#4F46E5",
          blue: "#38BDF8",
        },
      },
      boxShadow: {
        card: "0px 10px 30px -10px rgba(0, 0, 0, 0.5)",
        "card-hover": "0px 15px 35px -10px rgba(99, 102, 241, 0.3)",
        glass: "0 10px 30px rgba(0, 0, 0, 0.35)",
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/herobg.png')",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "Inter", "sans-serif"],
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "gradient": "gradient 8s ease infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
    },
  },
  plugins: [],
};
