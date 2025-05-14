// tailwind.config.js
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      display: ['group-hover'],
      width: {
        '64': '16rem', // this defines the `w-64` width
      },
      colors: {
        primary: '#0a272b', 
        navyy:'#41ab5d',
        midGreen:'#238b45',
        purple:'#005a32',
        dk:'#f7fcf5',
        dkk:'#e5f5e0',
        jana:'#c7e9c0',
        lubna:'#74c476'// Add custom color
      },
        fontFamily: {
          poppins: ['"Poppins"', 'sans-serif'], // Add Poppins font
        
        gothic: ['"Century Gothic"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
