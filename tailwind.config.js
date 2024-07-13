/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px"
      }
    },
    extend: {
      colors: {
        gohan: "#13161E",
        trunks: "#212734",
        vegeta: "#707290",
        goku: "#E7ECEF",
        bulma: "#00D1B2",
        piccolo: "#FF4E64",
        krillin: "#1A1E27",
      },
      fontFamily: {
        satoshi: ['Satoshi', 'sans-serif'],
      }
    }
  },
};

export default config;
