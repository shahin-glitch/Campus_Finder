import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#800020", // Burgundy
          dark: "#570013",
          light: "#af2b3e",
          foreground: "#ffffff",
          fixed: "#ffdada",
          "fixed-dim": "#ffb3b5",
          container: "#800020",
          "on-container": "#ff828a",
        },
        secondary: {
          DEFAULT: "#6d5a5a",
          fixed: "#f7dcdc",
          "fixed-dim": "#dac1c1",
          container: "#f7dcdc",
          "on-container": "#736060",
          foreground: "#ffffff",
        },
        surface: {
          DEFAULT: "#fbf9f8",
          bright: "#fdfbf7",
          dim: "#dcd9d9",
          tint: "#af2b3e",
          variant: "#e4e2e1",
          container: "#f0eded",
          "container-low": "#f6f3f2",
          "container-high": "#eae8e7",
          "container-highest": "#e4e2e1",
          "container-lowest": "#ffffff",
        },
        background: "#FDFBF7",
        "on-background": "#1b1c1c",
        "on-surface": "#1b1c1c",
        "on-surface-variant": "#584141",
        outline: "#8c7071",
        "outline-variant": "#e0bfbf",
        tertiary: {
          DEFAULT: "#272725",
          container: "#3d3d3b",
          "on-container": "#a9a8a4",
          fixed: "#e4e2de",
        },
        brand: {
          burgundy: "#800020",
          deep: "#570013",
          rose: "#ffdada",
          cream: "#FDFBF7",
          gold: "#F59E0B",
          emerald: "#10B981",
        }
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "Manrope", "system-ui", "sans-serif"],
        display: ["var(--font-manrope)", "Manrope", "sans-serif"],
        headline: ["var(--font-manrope)", "Manrope", "sans-serif"],
      },
      spacing: {
        "section-gap": "80px",
        "margin-desktop": "40px",
        "margin-mobile": "16px",
        "container-max": "1280px",
        gutter: "24px",
        base: "8px",
        "stack-lg": "24px",
        "stack-md": "12px",
        "stack-sm": "4px",
      },
      boxShadow: {
        "level-1": "-4px -4px 10px rgba(255, 255, 255, 0.8), 4px 4px 15px rgba(87, 0, 19, 0.05)",
        "level-2": "-6px -6px 14px rgba(255, 255, 255, 0.9), 6px 6px 20px rgba(87, 0, 19, 0.08)",
        "level-3": "0 10px 30px -5px rgba(87, 0, 19, 0.12), 0 8px 10px -6px rgba(87, 0, 19, 0.08)",
        "neo-inset": "inset 2px 2px 5px rgba(87, 0, 19, 0.05), inset -2px -2px 5px rgba(255, 255, 255, 0.8)",
      },
      borderRadius: {
        lg: "1rem",
        xl: "1.5rem",
        "2xl": "2rem",
      }
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/container-queries"),
  ],
};

export default config;
