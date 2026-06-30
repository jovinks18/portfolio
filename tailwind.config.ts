import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#FBF8F3",
          100: "#F6F1E8",
          200: "#EFE7D9",
        },
        ink: {
          DEFAULT: "#2C2A26",
          soft: "#5C574E",
          faint: "#8A8479",
        },
        clay: {
          DEFAULT: "#C96F4A",
          soft: "#F3DED2",
        },
        sage: {
          DEFAULT: "#7A8B6F",
          soft: "#E4E9DD",
        },
        butter: {
          DEFAULT: "#D9A441",
          soft: "#F6EBD2",
        },
        dusk: {
          DEFAULT: "#6B7FA3",
          soft: "#E0E6EF",
        },
        blush: {
          DEFAULT: "#C2766B",
          soft: "#F2E0DC",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        bento: "1.5rem",
      },
      boxShadow: {
        bento: "0 1px 2px rgba(44, 42, 38, 0.04), 0 6px 20px rgba(44, 42, 38, 0.05)",
        "bento-hover":
          "0 2px 4px rgba(44, 42, 38, 0.05), 0 14px 34px rgba(44, 42, 38, 0.09)",
      },
    },
  },
  plugins: [],
};

export default config;
