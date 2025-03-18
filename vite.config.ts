import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  // server: {
  //   proxy: {
  //     // 代理配置
  //     '/api': {
  //       target: 'https://api.uomg.com/',
  //       changeOrigin: true,
  //       // rewrite: (path) => path.replace(/^\/api/, ''),
  //       // 如需处理 HTTPS 证书验证
  //       secure: false
  //     }
  //   }
  // },
})
