/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: '#121019'
        },
        secondary: {
          DEFAULT: '#F6F7F6'
        }
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui(
      {
        prefix: "nextui",
        defaultTheme: "light",
        themes: {
          light: {
            layout: {},
            colors: {
              // primary: '#121019'
            }
          },
        }
      }
    )
  ],
};
