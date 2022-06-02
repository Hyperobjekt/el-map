import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/v2map/",
  build: {
    target: "esnext",
    // TODO: revert
    minify: false, // use for debugging
  },
});
