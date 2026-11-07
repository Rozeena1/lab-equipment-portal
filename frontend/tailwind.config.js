/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "outline": "#74777d", "surface-bright": "#f8f9ff", "on-primary-container": "#788da3", "surface": "#f8f9ff", "surface-container-lowest": "#ffffff", "on-primary-fixed-variant": "#34495c", "on-secondary-fixed-variant": "#003ea8", "on-surface": "#0b1c30", "on-tertiary-fixed": "#002114", "secondary-container": "#316bf3", "surface-variant": "#d3e4fe", "primary-fixed-dim": "#b3c9e0", "surface-container": "#e5eeff", "outline-variant": "#c3c7cd", "on-secondary-fixed": "#00174b", "on-surface-variant": "#43474c", "surface-container-high": "#dce9ff", "background": "#f8f9ff", "error": "#ba1a1a", "on-background": "#0b1c30", "on-error": "#ffffff", "tertiary-container": "#002a1b", "secondary": "#0051d5", "secondary-fixed": "#dbe1ff", "on-tertiary": "#ffffff", "error-container": "#ffdad6", "surface-container-highest": "#d3e4fe", "surface-dim": "#cbdbf5", "on-tertiary-container": "#1a9e70", "primary": "#000f1d", "on-secondary": "#ffffff", "inverse-primary": "#b3c9e0", "surface-container-low": "#eff4ff", "secondary-fixed-dim": "#b4c5ff", "inverse-surface": "#213145", "on-error-container": "#93000a", "on-tertiary-fixed-variant": "#005137", "tertiary-fixed-dim": "#68dba9", "primary-fixed": "#cfe5fd", "on-primary": "#ffffff", "inverse-on-surface": "#eaf1ff", "primary-container": "#0f2537", "surface-tint": "#4c6075", "on-secondary-container": "#fefcff", "on-primary-fixed": "#061d2f", "tertiary-fixed": "#85f8c4", "tertiary": "#001209"
      },
      fontFamily: {
        'headline': ['Plus Jakarta Sans', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}