import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import { resolve } from 'path';

const root = resolve(__dirname, 'src');

// https://vitejs.dev/config/
export default defineConfig({
  root,
  plugins: [vue()],
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
        smp: resolve(root, 'smp', 'index.html'),
        modlist: resolve(root, 'smp', 'modlist', 'index.html')
      }
    }
  },
  publicDir: resolve(__dirname, 'public'),
  base: '/'
})
