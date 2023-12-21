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
        "color-primary": "rgb(var(--color-primary))",
        "color-secondary": "rgb(var(--color-secondary))",
        "background--navbar": "#0cbc8b",
      },
    },
  },
  plugins: [],
};
export default config;
