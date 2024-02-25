import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: "#252525",
        darkComponentBg: "#323232",
        foregroundBg: "#131313",
        homePrimary: "#4069FF",
        lightGray: "#AEAEAE",
        darkGray: "#191919",
        lightBorder: "#3A3A3A",
        inputBg: "rgba(255, 255, 255, 0.20);",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
