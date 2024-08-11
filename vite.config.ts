import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

import { resolve } from 'path';

const root = resolve(__dirname, 'src');

// https://vitejs.dev/config/
export default defineConfig({
  root,
  plugins: [ vue() ],
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
        smp: resolve(root, 'smp', 'index.html'),
        modlist: resolve(root, 'smp', 'modlist', 'index.html'),
        'my-account': resolve(root, 'my-account', 'index.html'),
        profile: resolve(root, 'profile', 'index.html'),
        list: resolve(root, 'profile', 'list', 'index.html'),
        worlds: resolve(root, 'smp', 'worlds', 'index.html'),
        ngram: resolve(root, 'ngram', 'index.html')
      }
    }
  },
  publicDir: resolve(__dirname, 'public'),
  base: '/',
  server: {
    proxy: {
      '/api': {
        target: 'https://bcaf-api.onrender.com/',
        changeOrigin: true,
        secure: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  }
});