import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'white': '#F1F1F1',
        'gray': '#ECECEC',
        'black': '#0D0D0D',
        'red': 'rgba(160, 35, 35, 0.1)',
        'blue': 'rgba(147, 142, 222, 0.1)',
        'win': 'rgb(128,182,75)',
        'loss': 'rgb(250,64,44)',
        'link': '#2577A2',
        'bronze': '#CE8946',
        'silver': '#BCC6CC',
        'gold': '#E5B80B',
      },
      fontFamily: {
        'raleway': ['Raleway', 'sans-serif']
      },
      borderWidth: {
        'px': '1px'
      },
      fontSize: {
        '10xl': '12rem'
      },
      height: {
        'screen': 'calc(100vh - 6rem)'
      }
    },
  },
  plugins: [],
};
export default config;