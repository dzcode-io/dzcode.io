/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")], // eslint-disable-line @typescript-eslint/no-require-imports
  daisyui: {
    themes: [
      {
        dzcodeDark: {
          primary: "#43a047",
          secondary: "#6ee7b7",
          accent: "#f97316",
          neutral: "#160716",
          "base-100": "#2c2f2a",
          info: "#008fd4",
          success: "#00a865",
          warning: "#ffc600",
          error: "#ff426b",
        },
      },
      {
        dzcodeLight: {
          primary: "#43a047",
          secondary: "#352c1e",
          accent: "#f97316",
          neutral: "#cccccc",
          "base-100": "#ebe8dd",
          info: "#0ea5e9",
          success: "#00a960",
          warning: "#a54a00",
          error: "#f4002c",
        },
      },
    ],
    darkTheme: "dzcodeDark",
  },
};
