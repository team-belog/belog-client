import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ["var(--font-pretendard)", "sans-serif"],
      },
      colors: {
        main: {
          mint: "#49D4B6",
          "cool-gray": "#F7F8F9",
          black: "#303237",
          white: "#FFFFFF",
        },
        sub: {
          black: "#2B2B2B",
          white: "#FBFCFE",
          "white-2": "#F8F8F8",
          "gray-1": "#5F5F5F",
          "gray-2": "#A6A6A6",
          "gray-3": "#DFE1E5",
          "gray-4": "#303237",
        },
      },
    },
  },
  plugins: [],
};

export default config;
