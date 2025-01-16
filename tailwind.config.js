/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-1": "#1E1E1E", // Solana black
        "primary-2": "#1E1E1E", // Solana black
        "primary-3": "#1E1E1E", // Solana black
        "primary-4": "#1E1E1E", // Solana black
        "button-primary": "#14F195", // Solana green
        dropdown: "#2C2E3E", // Dark dropdown background
        input: "#1F2128", // Dark input background
        label: "#9CA3AF", // Neutral text
        primary: "rgb(50 55 56)", // Solana black
        secondary: "#252525", // Solana purple
        primary2: "#2a2a2a",
        // ter: "#14F195", // Solana green
        terHover: "#5A4E99", // Purple hover
        // button: "#14F195", // Solana green
        active: "#512DA8", // Deep purple for active states
        inactive: "#2C2E3E", // Dark inactive background
        textColor: "#121212", // Light text
        activeHover: "#7C4DFF", // Bright hover purple
        iconActive: "#FACC15", // Yellow accent
        hoverActive: "#7C4DFF", // Bright hover accent
        sectionBg: "#252525",
        smallInactive: "#2C2C2C",
      },
    },
  },
  plugins: [],
};
