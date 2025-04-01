<template>
  <div class="image-viewer">
    <!-- ✅ 修改为刷新按钮 -->
    <div class="search-box">
      <button @click="fetchAllImages" :disabled="loading">
        <span v-if="!loading">刷新图片列表</span>
        <span v-else class="loader"></span>
      </button>
    </div>

    <!-- 结果展示 -->
    <div class="result-area">
      <!-- 错误提示 -->
      <div v-if="error" class="error-message">
        ❗ {{ error }}
      </div>

      <!-- ✅ 修改为图片列表展示 -->
      <div v-if="imageList.length" class="image-grid">
        <div 
          v-for="(image, index) in imageList" 
          :key="index"
          class="image-card"
        >
          <img
            :src="image.url"
            :alt="'图片ID: ' + image.name"
            class="display-image"
            @load="handleImageLoad(index)"
            :class="{ loaded: image.loaded }"
          />
          <div class="image-meta">
            <span>{{ image.name }}</span>
            <button @click="downloadImage(image)" class="download-btn">
              下载
            </button>
          </div>
        </div>
      </div>

      <!-- 空状态 -->
      <div v-if="!imageList.length && !error" class="empty-state">
        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#ccc" stroke-width="1.5">
          <path d="M8 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8z"></path>
          <polyline points="16 3 21 3 21 8"></polyline>
          <line x1="10" y1="13" x2="14" y2="17"></line>
          <line x1="14" y1="13" x2="10" y2="17"></line>
        </svg>
        <p>没有找到任何图片</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import OSS from 'ali-oss'

const ossClient = new OSS({
  ...import.meta.env.VITE_OSS_CONFIG,
  accessKeyId: import.meta.env.VITE_OSS_ACCESS_KEY_ID,
  accessKeySecret: import.meta.env.VITE_OSS_ACCESS_KEY_SECRET
});

// ✅ 修改响应式数据
const imageList = ref([]) // 存储所有图片列表
const loading = ref(false)
const error = ref('')

// ✅ 修改获取方法：获取所有图片
const fetchAllImages = async () => {
  try {
    loading.value = true
    error.value = ''
    
    // 获取所有图片对象
    const result = await ossClient.list({
      prefix: 'images/', // 指定目录
      'max-keys': 1000   // 最大获取数量
    })

    // 生成带签名的URL
    imageList.value = result.objects.map(item => ({
      name: item.name.split('/').pop(),
      url: ossClient.signatureUrl(item.name, {
        expires: 3600,
        process: 'image/resize,w_300/quality,Q_70' // 生成缩略图
      }),
      rawUrl: ossClient.signatureUrl(item.name), // 原始文件URL
      loaded: false
    }))

  } catch (err) {
    console.error('获取失败:', err)
    error.value = `加载失败: ${err.message}`
  } finally {
    loading.value = false
  }
}

// ✅ 修改下载方法
const downloadImage = async (image) => {
  try {
    const link = document.createElement('a')
    link.href = image.rawUrl
    link.download = image.name
    link.click()
  } catch (err) {
    console.error('下载失败:', err)
    error.value = '图片下载失败，请重试'
  }
}

// ✅ 修改图片加载处理
const handleImageLoad = (index) => {
  imageList.value[index].loaded = true
}
</script>

<style scoped>
/* ✅ 新增网格布局样式 */
.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1rem;
  padding: 1rem;
}

.image-card {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  background: white;
}

.display-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.display-image.loaded {
  opacity: 1;
}

.image-meta {
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* ✅ 调整按钮样式 */
.search-box button {
  margin: 1rem;
  padding: 0.8rem 1.5rem;
}

.download-btn {
  padding: 0.3rem 0.8rem;
  font-size: 0.9em;
}
</style>