import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      textShadow: {
        'default': '2px 2px 4px rgba(0, 0, 0, 0.5)',
        'md': '4px 4px 6px rgba(0, 0, 0, 0.5)',
        'lg': '6px 6px 8px rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        '.text-shadow': {
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
        },
        '.text-shadow-md': {
          textShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
        },
        '.text-shadow-lg': {
          textShadow: '0px 0px 10px rgba(0, 0, 0, 1)',
        },
      };
      addUtilities(newUtilities);
    })
  ],
};

export default config;
