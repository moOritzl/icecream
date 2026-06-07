import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // Emit source maps so production stack traces map to real source lines
    // instead of minified `Or@index.js:48`. Lets us pin the exact crash site
    // if the blank-page error survives a confirmed-fresh deploy.
    sourcemap: true,
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
});
