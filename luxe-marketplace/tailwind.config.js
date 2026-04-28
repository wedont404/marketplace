/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./context/**/*.{js,jsx}",
    "./hooks/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        border: "hsl(var(--border))",
        muted: "hsl(var(--muted))",
        accent: "hsl(var(--accent))",
        accent2: "hsl(var(--accent-2))",
        success: "hsl(var(--success))"
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(255,255,255,0.05), 0 18px 80px rgba(0,0,0,0.45)",
        accent: "0 0 40px rgba(92, 151, 255, 0.22)"
      },
      backgroundImage: {
        "hero-radial": "radial-gradient(circle at top, rgba(92,151,255,0.18), transparent 40%), radial-gradient(circle at 20% 20%, rgba(244,195,74,0.16), transparent 30%)"
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        marquee: "marquee 22s linear infinite"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" }
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" }
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" }
        }
      }
    }
  },
  plugins: []
};
