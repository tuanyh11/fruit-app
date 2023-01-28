/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      container: {
        
        padding: {
          '2xl': '15px',
        },
        
      },
      colors: {
        'main': '#66cc33',
        'orange': '#ffcc00',
        'silver': '#999'
      },
      boxShadow: {
        '3xl': '0 10px 10px 0 rgb(0 0 0 / 15%)'
      }
      
    },
  },
  plugins: [],
}
