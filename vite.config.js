import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// If you deploy to a sub-path (e.g. GitHub Pages project site),
// set base to "/<repo-name>/". For root domains, leave as "/".
export default defineConfig({
  base: "/",
  plugins: [react()],
});
