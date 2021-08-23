import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import yaml from '@rollup/plugin-yaml';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/admin-build/' : '/admin/',
  publicDir: false,
  build: {
    manifest: true,
    outDir: '../../public/admin-build',
    emptyOutDir: true,
    rollupOptions: {
      input: './src/main.js'
    }
  },
  plugins: [
    vue(),
    yaml({
      transform(data) {
        return data === null ? {} : undefined;
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '/src'),
    },
  },
  server: {
    host: 'web.nicksaude.test',
    port: 3000,
    proxy: {
      '^/(?!admin)': {
        target: process.env.API_URL ? process.env.API_URL : 'https://web.nicksaude.test/',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
