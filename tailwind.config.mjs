import flowbite from "flowbite-react/tailwind";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content()
  ],
  theme: {
    screens: {
      'sm': '540px',
      'md': '768px',
      'lg': '991px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      backgroundColor:{
        blue: '#4e73df',
        red: '#e74a3b',
        gray: '#393939',
        inputs: '#4540406b',
        offWhite: '#f8f9fc'
      },
      container:{
        padding: '20px',
        center: true
      },
      borderColor:{
        bottom: '#404040',
      },
      colors: {
        gray : '#858796',
        title: '#5a5c69',
        icons: '#d1d3e2',
        red: '#e74a3b',
        label: '#ffebebc4',
        blue: '#4e73df'
      },
    },
  },
  plugins: [
    flowbite.plugin()
  ],
};
