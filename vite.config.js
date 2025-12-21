import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],


  base: '/', // browser URL prefix
  build: {
    outDir: '../CotyJ.github.io', // target Pages repo folder
    emptyOutDir: true,
  },
});
