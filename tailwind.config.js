/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Primary Brand Colors
        brand: {
          primary: "#00D4AA",
          secondary: "#9945FF",
          tertiary: "#14F195",
          accent: "#FFD700",
        },

        // Background Colors
        background: {
          primary: "#0F0F0F",
          secondary: "#1A1A1A",
          tertiary: "#252525",
          surface: "#2C2C2C",
          elevated: "#333333",
        },

        // Interactive Colors
        interactive: {
          primary: "#00D4AA",
          primaryHover: "#00B896",
          secondary: "#9945FF",
          secondaryHover: "#7C3AED",
          success: "#10B981",
          warning: "#F59E0B",
          error: "#EF4444",
          info: "#3B82F6",
        },

        // Text Colors
        text: {
          primary: "#FFFFFF",
          secondary: "#E5E7EB",
          tertiary: "#9CA3AF",
          muted: "#6B7280",
          inverse: "#1F2937",
        },

        // Border Colors
        border: {
          primary: "#374151",
          secondary: "#4B5563",
          accent: "#00D4AA",
          error: "#EF4444",
          success: "#10B981",
        },

        // Status Colors
        status: {
          online: "#10B981",
          offline: "#6B7280",
          away: "#F59E0B",
          busy: "#EF4444",
        },

        // Game Specific Colors
        game: {
          win: "#10B981",
          loss: "#EF4444",
          multiplier: "#FFD700",
          bet: "#00D4AA",
          jackpot: "#FF6B6B",
        },

        // Legacy Support (maintaining old color names for compatibility)
        primary: "#1A1A1A",
        secondary: "#252525",
        primary2: "#2C2C2C",
        dropdown: "#333333",
        input: "#2C2C2C",
        label: "#9CA3AF",
        "button-primary": "#00D4AA",
        active: "#9945FF",
        inactive: "#333333",
        textColor: "#FFFFFF",
        activeHover: "#7C3AED",
        iconActive: "#FFD700",
        hoverActive: "#00B896",
        sectionBg: "#252525",
        smallInactive: "#2C2C2C",
        terHover: "#7C3AED",
      },

      // Enhanced spacing scale
      spacing: {
        18: "4.5rem",
        88: "22rem",
        128: "32rem",
      },

      // Custom border radius
      borderRadius: {
        xl2: "1rem",
        "2xl2": "1.25rem",
        "3xl": "1.5rem",
      },

      // Custom shadows
      boxShadow: {
        glow: "0 0 20px rgba(0, 212, 170, 0.3)",
        "glow-purple": "0 0 20px rgba(153, 69, 255, 0.3)",
        "inner-glow": "inset 0 0 10px rgba(0, 212, 170, 0.2)",
      },

      // Custom animations
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "bounce-subtle": "bounce 2s infinite",
        glow: "glow 2s ease-in-out infinite alternate",
      },

      keyframes: {
        glow: {
          "0%": { boxShadow: "0 0 5px rgba(0, 212, 170, 0.5)" },
          "100%": { boxShadow: "0 0 20px rgba(0, 212, 170, 0.8)" },
        },
      },
    },
  },
  plugins: [],
};
