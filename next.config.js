/** @type {import('next').NextConfig} */
// tailwind.config.js
const { nextui } = require("@nextui-org/react");
module.exports = {
  content: [
    // ...
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui()],
  env: {
    GRAPHQL_SERVER: "http://localhost:8000/graph",
    SHIPPING: "100",
    Discount: "10"
  }
};
