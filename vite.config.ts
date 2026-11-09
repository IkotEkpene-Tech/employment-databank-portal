import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    port: 3000,
  },
  build: {
    rollupOptions: {
      output: {
        // Vendor code changes far less often than app code — splitting it
        // out means a browser that already cached this chunk from a
        // previous visit skips re-downloading React/etc. on every deploy.
        manualChunks: {
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          "vendor-ui": ["styled-components", "@radix-ui/react-dialog", "@radix-ui/react-avatar", "@radix-ui/react-slot"],
          "vendor-data": ["@tanstack/react-query", "axios"],
          "vendor-forms": ["react-hook-form", "@hookform/resolvers", "zod"],
        },
      },
    },
  },
});
