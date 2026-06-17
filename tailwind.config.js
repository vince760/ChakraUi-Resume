/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a"
        },
        // Terminal page tokens. Green primary, blue + amber secondary accents.
        terminal: {
          bg: "#08090c", // near-black full-bleed background + terminal body
          chrome: "#10151c", // faux window title bar
          chip: "#0e131a", // chip / tag background
          border: "#1a222c", // hairline borders
          fg: "#c9d4e0", // default text
          bright: "#f1f6fb", // emphasized text
          dim: "#5c6b7a", // muted text / secondary chrome
          green: "#4ade80", // primary accent (prompt, ok, links)
          blue: "#38bdf8", // secondary accent
          amber: "#fbbf24", // headers / fun fallbacks
          red: "#f87171" // errors / close dot
        }
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular"]
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out"
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" }
        }
      }
    }
  },
  plugins: []
};
