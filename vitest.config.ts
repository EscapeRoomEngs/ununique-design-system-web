import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      atom: path.resolve(import.meta.dirname, "src/atom"),
      components: path.resolve(import.meta.dirname, "src/components"),
      foundation: path.resolve(import.meta.dirname, "src/foundation"),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./src/setupTests.ts"],
    globals: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      include: ["src/atom/**/*.tsx", "src/components/**/*.tsx"],
      exclude: ["src/**/*.stories.*", "src/**/*.test.*"],
      thresholds: {
        branches: 60,
        functions: 70,
        lines: 70,
        statements: 70,
      },
    },
  },
});
