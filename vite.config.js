import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { ENVIRONMENT } from "./src/utils";

const isProd = ENVIRONMENT.context === "prod";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: "esnext",
    minify: isProd,
  },
  base: isProd ? "/v2map/" : "/",
});
