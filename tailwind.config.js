/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-1": "rgb(25, 25, 57)",
        "primary-2": "rgb(9, 12, 29)",
        "primary-3": "rgb(9, 12, 29)",
        "primary-4": "rgb(9, 12, 29)",
        "button-primary": "#00e701",
        dropdown: "#3D2C58",
        input: "#2C2852",
        label: "#b1bad3",
        primary: "rgb(25, 25, 57)",
        secondry: "rgb(9, 12, 29)",
        ter: "#2c2852",
        terHover: "rgb(70, 62, 122)",
        button: "rgb(86, 196, 0)",
        active: "#7841ee",
        inactive: "#2C2852",
        textColor: "#b4a6e2",
        activeHover: "rgb(70, 62, 122)",
        iconActive: "rgba(255,206,0,1)",
        hoverActive: "rgb(123, 108, 185)",
      },
    },
  },
  plugins: [],
};
