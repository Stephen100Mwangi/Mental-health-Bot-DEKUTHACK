/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        button:"#F05941",
        card:"#E2DFD0",
        back:"#9DB2BF",
        nav:"#070F2B",
        text_color:"#040D12"


      }
    },
  },
  plugins: [],
}

