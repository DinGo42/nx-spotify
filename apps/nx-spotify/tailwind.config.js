/* eslint-disable @typescript-eslint/naming-convention */
const { createGlobPatternsForDependencies } = require('@nx/next/tailwind');
const { join } = require('path');


const Colors = {
  BLACK_1000 : "black-1000",
  BLACK_600 : "black-600",
  BLACK_400 : "black-400",
  BLACK_200 : "black-200",
  BLACK_150 : "black-150",
  BLACK_100 : "black-100",
  WHITE_1000 : "white-1000",
  WHITE_800 : "white-800",
  GREEN_800 : "green-800",
}


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    colors: {
      [Colors.BLACK_1000]: "#000000",
      [Colors.BLACK_600]: "#121212",
      [Colors.BLACK_400]: "#282828",
      [Colors.BLACK_200]: "#4a4a4a",
      [Colors.BLACK_150]: "#7f7f7f",
      [Colors.BLACK_100]: "#898989",
      [Colors.WHITE_1000]: "#ffffff",
      [Colors.WHITE_800]: "#f0f0f0",
      [Colors.GREEN_800]: "#1cc658",
    },
    keyframes: {
      shake: {
        "10%, 90%": {
          transform: "translateX(-1px)",
        },
        "20%, 80%": {
          transform: " translateX(2px)",
        },
        "30%, 50%, 70%": {
          transform: "translateX(-4px)",
        },

        "40%, 60%": {
          transform: "translateX(4px)",
        },
      },
    },
    animation: {
      shake: "shake 700ms cubic-bezier(.36,.07,.19,.97) both",
    },
  },
  plugins: [],
};
