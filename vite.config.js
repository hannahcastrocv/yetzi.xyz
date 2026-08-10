import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// If you deploy to a sub-path (e.g. GitHub Pages project site),
// set base to "/<repo-name>/". For root domains, leave as "/".
// Assets are referenced with relative "./" so the build also works
// when opened directly from a file path.
export default defineConfig({
  base: "./",
  plugins: [react()],
  build: {
    // Single JS chunk keeps deploy simple and lets the self-contained
    // preview inline one script.
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
        manualChunks: undefined,
        entryFileNames: "assets/app.js",
        chunkFileNames: "assets/[name].js",
        assetFileNames: "assets/[name][extname]",
      },
    },
  },
});
