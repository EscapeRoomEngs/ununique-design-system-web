import path from "node:path";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss(), svgr()],
  publicDir: mode === "library" ? false : "public",
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      atom: path.resolve(import.meta.dirname, "src/atom"),
      components: path.resolve(import.meta.dirname, "src/components"),
      foundation: path.resolve(import.meta.dirname, "src/foundation"),
    },
  },
  build: mode === "library" ? {
    lib: {
      entry: path.resolve(import.meta.dirname, "src/index.ts"),
      formats: ["es", "cjs"],
      fileName: (format) => format === "es" ? "index.js" : "index.cjs",
      cssFileName: "styles",
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
    },
  } : undefined,
}));
