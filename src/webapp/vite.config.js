import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.js$/,
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
  build: {
    outDir: 'build',
  },
  resolve: {
    alias: {
      '@mui/material': fileURLToPath(new URL('./src/mui', import.meta.url)),
      '@mui/icons-material': fileURLToPath(new URL('./src/mui-icons', import.meta.url)),
      '@mui/material/styles': fileURLToPath(new URL('./src/mui/styles.js', import.meta.url)),
      '@mui/system': fileURLToPath(new URL('./src/mui', import.meta.url)),
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
    globals: true,
    css: true,
  },
});
