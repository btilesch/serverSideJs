const colors = require('tailwindcss/colors');

/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ['./views/**/*.{html,css,js,ejs}'],
  purge: [],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        inherit: 'inherit',
        current: 'currentColor',
        transparent: 'transparent',
        black: '#000',
        white: '#fff',
        slate: colors.slate,
        gray: colors.gray,
        zinc: colors.zinc,
        neutral: colors.neutral,
        stone: colors.stone,
        red: colors.red,
        orange: colors.orange,
        amber: colors.amber,
        yellow: colors.yellow,
        lime: colors.lime,
        green: colors.green,
        emerald: colors.emerald,
        teal: colors.teal,
        cyan: colors.cyan,
        sky: colors.sky,
        blue: colors.blue,
        indigo: colors.indigo,
        violet: colors.violet,
        purple: colors.purple,
        fuchsia: colors.fuchsia,
        pink: colors.pink,
        rose: colors.rose,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms'), require('@thoughtbot/tailwindcss-aria-attributes')],
};
