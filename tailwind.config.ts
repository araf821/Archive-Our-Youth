/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      screens: {
        xs: "412px",
      },
      colors: {
        // Our custom color palette
        // Primary colors
        primary: {
          DEFAULT: "#22c55e", // green-500
          light: "#4ade80", // green-400
          dark: "#16a34a", // green-600
          subtle: "#14532d", // green-900
          hover: "#15803d", // green-700
        },

        // Secondary colors
        secondary: {
          DEFAULT: "#3b82f6", // blue-500
          light: "#60a5fa", // blue-400
          dark: "#2563eb", // blue-600
          subtle: "#1e40af", // blue-800
        },

        // Background colors
        background: {
          DEFAULT: "#09090b", // zinc-950
          muted: "#18181b", // zinc-900
          elevated: "#27272a", // zinc-800
          surface: "#3f3f46", // background-surface
        },

        // Text colors
        text: {
          primary: "#fafafa", // zinc-50
          secondary: "#a1a1aa", // zinc-400
          muted: "#71717a", // zinc-500
          inverted: "#09090b", // zinc-950
        },

        // Border colors
        border: {
          DEFAULT: "#3f3f46", // background-surface
          light: "#52525b", // zinc-600
          dark: "#27272a", // zinc-800
        },

        // Functional colors
        success: {
          DEFAULT: "#22c55e", // green-500
          light: "#4ade80", // green-400
          dark: "#16a34a", // green-600
        },
        warning: {
          DEFAULT: "#f59e0b", // amber-500
          light: "#fbbf24", // amber-400
          dark: "#d97706", // amber-600
        },
        error: {
          DEFAULT: "#ef4444", // red-500
          light: "#f87171", // red-400
          dark: "#dc2626", // red-600
        },
        info: {
          DEFAULT: "#0ea5e9", // sky-500
          light: "#38bdf8", // sky-400
          dark: "#0284c7", // sky-600
        },

        // Accent colors
        accent: {
          rose: "#f43f5e", // rose-500
          indigo: "#6366f1", // indigo-500
          lime: "#84cc16", // lime-500
          teal: "#0d9488", // teal-600
          fuchsia: "#d946ef", // fuchsia-500
        },

        // Shadow colors
        shadow: {
          DEFAULT: "rgba(0, 0, 0, 0.1)",
          light: "rgba(255, 255, 255, 0.05)",
          dark: "rgba(0, 0, 0, 0.2)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontFamily: {
        kobata: ["var(--font-kobata)", "sans-serif"],
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    require("@nextui-org/react"),
  ],
};
