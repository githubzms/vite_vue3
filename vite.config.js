import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base:'/',
  build:{
    outDir:'docs'
  },
  plugins: [vue()],
  
  server:{
    port:'5173',
    proxy:{
      "/api":{
        target:'http://localhost:5000',
        changeOrigin:true,
        secure:true,
        rewrite:(path)=>path.replace(/^\/api/,'/')
      }
    }
  }
})
