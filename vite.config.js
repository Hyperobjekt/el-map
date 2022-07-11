import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { ENVIRONMENT } from './src/utils';

// mode is 'production' for build, 'development' for serve
const isProd = (mode) => mode === 'production' && ENVIRONMENT.context === 'prod';
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => ({
  plugins: [react()],
  // deployed static build (from prod branch) gets different base path
  base: isProd(mode) ? '/map' : '/',
  build: {
    target: 'esnext',
    minify: isProd(mode),
  },
  define: {
    VITE_APP_VERSION: JSON.stringify(process.env.npm_package_version),
  },
  // server: {
  //   host: true // uncomment to test local build on Browser Stack
  // }
}));
