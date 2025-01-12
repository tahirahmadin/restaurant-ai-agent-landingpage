/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "days-one": ['"Days One"', "sans-serif"],
        acme: ["Acme", "sans-serif"],
        rubik: ["Rubik", "sans-serif"],
      },
      keyframes: {
        roadStripe: {
          "0%": { transform: "translateX(0) translateY(0)" },
          "100%": { transform: "translateX(100%) translateY(100%)" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translate(-50%, 100%)" },
          "100%": { opacity: "1", transform: "translate(-50%, 0)" },
        },
        floatAnimation1: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        floatAnimation2: {
          "0%, 100%": { transform: "translateY(-5px)" },
          "50%": { transform: "translateY(5px)" },
        },
        floatAnimation3: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-15px)" },
        },
      },
      animation: {
        roadStripe: "roadStripe 1.5s linear infinite",
        "fade-in-up": "fadeInUp 0.3s ease-out",
        "spin-slow": "spin 20s linear infinite",
        "float-1": "floatAnimation1 3s ease-in-out infinite",
        "float-2": "floatAnimation2 4s ease-in-out infinite",
        "float-3": "floatAnimation3 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
