/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        spoqa: ["Spoqa Han Sans Neo", "sans-serif"],
        mosk: ["Mosk", "sans-serif"],
      },
      boxShadow: {
        md: "0px 2px 6px 0px rgba(119, 131, 153, 0.20)",
      },
      colors: {
        main: "#623AD6",
        lightGray: "#EBEBEC",
        darkGray: "#676767",
      },
    },
  },
  plugins: [],
};
