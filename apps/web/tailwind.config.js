/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite/**/*.js",
    "./node_modules/flowbite-react/lib/**/*.js",
    "./public/**/*.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        spoqa: ["SpoqaHanSansNeo-Regular", "sans-serif"],
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
      colors: {
            "border": "hsl(var(--border))",
            "input": "hsl(var(--input))",
            "ring": "hsl(var(--ring))",
            "background": "hsl(var(--background))",
            "foreground": "hsl(var(--foreground))",
            "primary": {
              "DEFAULT": "hsl(var(--primary))",
              "foreground": "hsl(var(--primary-foreground))"
            },
            "secondary": {
              "DEFAULT": "hsl(var(--secondary))",
              "foreground": "hsl(var(--secondary-foreground))"
            },
            "destructive": {
              "DEFAULT": "hsl(var(--destructive))",
              "foreground": "hsl(var(--destructive-foreground))"
            },
            "muted": {
              "DEFAULT": "hsl(var(--muted))",
              "foreground": "hsl(var(--muted-foreground))"
            },
            "accent": {
              "DEFAULT": "hsl(var(--accent))",
              "foreground": "hsl(var(--accent-foreground))"
            },
            "popover": {
              "DEFAULT": "hsl(var(--popover))",
              "foreground": "hsl(var(--popover-foreground))"
            },
            "card": {
              "DEFAULT": "hsl(var(--card))",
              "foreground": "hsl(var(--card-foreground))"
            }
          },
      borderRadius: {
            "lg": "var(--radius)",
            "md": "calc(var(--radius) - 2px)",
            "sm": "calc(var(--radius) - 4px)"
          },
      keyframes: {
            "accordion-down": {
              "from": {
                "height": "0"
              },
              "to": {
                "height": "var(--radix-accordion-content-height)"
              }
            },
            "accordion-up": {
              "from": {
                "height": "var(--radix-accordion-content-height)"
              },
              "to": {
                "height": "0"
              }
            }
          }
},
  plugins: [require("flowbite/plugin"), require("tailwind-scrollbar"), require("tailwindcss-animate")],
};
