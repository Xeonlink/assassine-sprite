import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
const path = require("path");

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  if (command == "serve") {
    return {
      plugins: [react()],
      resolve: {
        alias: { "@": path.resolve(__dirname, "./src") },
      },
    };
  }

  if (command == "build") {
    return {
      plugins: [react()],
      resolve: {
        alias: { "@": path.resolve(__dirname, "./src") },
      },
      base: "/",
    };
  }
});
