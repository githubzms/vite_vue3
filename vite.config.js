import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base:'/vite_vue3',
  build:{
    outDir:'docs'
  },
  plugins: [vue()],
})
