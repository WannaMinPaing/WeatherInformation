/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        // 'background': "url('../public/images/img/weather.jpg')",
      },
      colors:{
        a:'#0F172A',
        b:'#325981'
      }
    },
  },
  plugins: [],
}

