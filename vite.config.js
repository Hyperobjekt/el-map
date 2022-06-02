import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: "esnext",
    base: `/v2map/`,
    // TODO: revert
    minify: false, // use for debugging
  },
});
