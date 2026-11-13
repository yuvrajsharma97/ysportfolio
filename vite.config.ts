import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

// Serve /admin from admin.html in dev, matching the Vercel rewrite.
const adminRoute = (): Plugin => ({
  name: "admin-route",
  configureServer(server) {
    server.middlewares.use((req, _res, next) => {
      if (req.url === "/admin" || req.url === "/admin/") req.url = "/admin.html";
      next();
    });
  },
});

export default defineConfig({
  plugins: [react(), adminRoute()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        admin: resolve(__dirname, "admin.html"),
      },
      output: {
        manualChunks: (id) => (/node_modules[\\/](react|react-dom|scheduler)[\\/]/.test(id) ? "react" : undefined),
      },
    },
  },
});
