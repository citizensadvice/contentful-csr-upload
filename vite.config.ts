const react = require("@vitejs/plugin-react");
import { defineConfig } from "vite";

export default defineConfig(() => ({
  base: "", // relative paths
  server: {
    port: 3000,
  },
  plugins: [react()],
  test: {
    environment: "happy-dom",
    include: ["src/**/*.spec.js(x)?"],
    exclude: ["node_modules/", "dist/"],
  },
}));
