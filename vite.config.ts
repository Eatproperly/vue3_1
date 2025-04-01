import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), ['VITE_']) // 🔥 移除非必要的前缀

  return {
    plugins: [
      vue(),
      vueDevTools(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
    },
    server: {
      proxy: {
        '/api': {
          target: env.VITE_API_BASE_URL || 'https://api.uomg.com/', // 使用环境变量
          changeOrigin: true,
          secure: false
        }
      },
      allowedHosts: [  
        '92941fc.r21.cpolar.top',  // 添加这个主机  
      ],  
    },
    define: {
      // 🔥 仅暴露必要的前端变量
      'import.meta.env.VITE_OSS_CONFIG': JSON.stringify({
        region: 'oss-cn-beijing',
        bucket: 'web-oss-1'
      })
    }
  }
})