import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        optima: ["var(--font-optima)"],
      },
    colors:{
        primary: "#C72031",
        secondary:"#FFFCF5",
        dark:"#3A393C",
        light:"#C7C5C2"
    },
      backgroundImage: {
        'client': "url('/images/Clints.png')",
      },
    },
  },
  plugins: [],
};
export default config;
