import type { Config } from "tailwindcss";
import { themeColors } from "./src/lib/theme-colors";

export default {
  darkMode: "class", // Ensure dark mode is based on the "dark" class
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: themeColors.primary.DEFAULT,
        "primary-foreground": themeColors.primary.foreground,
        secondary: themeColors.secondary.DEFAULT,
        "secondary-foreground": themeColors.secondary.foreground,
        accent: themeColors.accent.DEFAULT,
        "accent-foreground": themeColors.accent.foreground,
        background: {
          DEFAULT: "var(--background)",
          dark: "var(--background-dark)",
        },
        text: {
          DEFAULT: "var(--foreground)",
          dark: "var(--text-dark)",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
