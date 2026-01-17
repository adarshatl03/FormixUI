import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/lib/index.ts"),
      name: "FormixUI",
      fileName: "index",
      formats: ["es"],
    },
    outDir: "dist", // npm output
    emptyOutDir: true,
    rollupOptions: {
      external: ["react", "react-dom", "react-router-dom", "lucide-react", "react/jsx-runtime"],
      onwarn(warning, warn) {
        // Suppress "default is imported from external module 'react' but never used" warnings
        if (warning.code === "UNUSED_EXTERNAL_IMPORT" && warning.exporter === "react") {
          return;
        }
        warn(warning);
      },
    },
  },
});
