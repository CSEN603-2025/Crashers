// tailwind.config.js
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      width: {
        '64': '16rem', // this defines the `w-64` width
      },
      colors: {
        primary: '#0a272b', // Add custom color
      },
        fontFamily: {
          poppins: ['"Poppins"', 'sans-serif'], // Add Poppins font
        
        gothic: ['"Century Gothic"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
