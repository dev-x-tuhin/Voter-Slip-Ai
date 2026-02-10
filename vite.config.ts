import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, (process as any).cwd(), '');

  return {
    plugins: [react()],
    // CRITICAL: This base path './' ensures assets load correctly on GitHub Pages
    base: './',
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
    },
    define: {
      // This "bakes" the API key into the code at build time so it works on GitHub Pages
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
    }
  };
});