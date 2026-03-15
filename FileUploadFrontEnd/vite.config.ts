import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { cloudflare } from "@cloudflare/vite-plugin";

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true,
    proxy: {
      "/api/": "https://project1.shubhankarmarathe.online/",
    },
  },
  plugins: [react(), cloudflare()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
