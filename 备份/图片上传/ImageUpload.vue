<template>
    <div>
      <h1>图片上传</h1>
      <input 
        type="file" 
        @change="handleFileChange" 
        accept="image/*" 
      />
      <!-- ✅ 恢复上传按钮 -->
      <button @click="uploadFile">上传图片</button>
      <div v-if="file">
        <h2>图片信息：</h2>
        <p>名称: {{ file.name }}</p>
        <p>大小: {{ formatFileSize(file.size) }}</p>
        <h3>预览：</h3>
        <img :src="imagePreview" 
             alt="预览图" 
             class="preview-image" />
      </div>
      <!-- ✅ 增加上传状态和结果展示 -->
      <div v-if="uploadStatus">
        <h2>上传状态：</h2>
        <p :class="statusClass">{{ uploadStatus }}</p>
        <!-- ✅ 显示OSS访问链接 -->
        <a v-if="ossUrl" 
           :href="ossUrl" 
           target="_blank" 
           class="oss-link">
           OSS访问链接
        </a>
      </div>
    </div>
  </template>
  
  <script>
  import { ref ,computed} from 'vue';
  // ✅ 引入阿里云OSS SDK
  import OSS from 'ali-oss';
  
  export default {
    setup() {
      const file = ref(null);
      const imagePreview = ref(null);
      const uploadStatus = ref('');
      const ossUrl = ref('');
      
      // ✅ OSS客户端配置
      // const ossClient = new OSS({
      //   region: 'oss-cn-beijing',
      //   accessKeyId: import.meta.env.VITE_ALIYUN_ACCESS_KEY_ID, // 使用 Vite 环境变量
      //   accessKeySecret: import.meta.env.VITE_ALIYUN_ACCESS_KEY_SECRET,
      //   bucket: 'web-oss-1'
      // });
      const ossClient = new OSS({
      ...import.meta.env.VITE_OSS_CONFIG, // 🔥 合并基础配置
      accessKeyId: import.meta.env.VITE_OSS_ACCESS_KEY_ID,
      accessKeySecret: import.meta.env.VITE_OSS_ACCESS_KEY_SECRET
      });
      // ✅ 文件大小格式化
      const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
      };
  
      const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (!selectedFile) return;
  
        // ✅ 增强文件验证
        if (!selectedFile.type.startsWith('image/')) {
          alert('仅支持图片文件 (JPEG/PNG/GIF/JPG)');
          event.target.value = '';
          return;
        }
  
        if (selectedFile.size > 5 * 1024 * 1024) {
          alert('图片大小不能超过5MB');
          event.target.value = '';
          return;
        }
  
        file.value = selectedFile;
        imagePreview.value = URL.createObjectURL(selectedFile);
      };
  
      const uploadFile = async () => {
        if (!file.value) {
          alert('请先选择文件');
          return;
        }
  
        try {
          uploadStatus.value = '上传中...';
          
          // ✅ OSS直传逻辑
          const result = await ossClient.put(
            `uploads/${Date.now()}_${file.value.name}`, // 生成唯一文件名
            file.value
          );
  
          ossUrl.value = result.url;
          uploadStatus.value = '上传成功';
        } catch (error) {
          console.error('OSS上传失败:', error);
          uploadStatus.value = `上传失败: ${error.message}`;
        }
      };
  
      // ✅ 状态样式绑定
      const statusClass = computed(() => ({
        'success': uploadStatus.value.includes('成功'),
        'error': uploadStatus.value.includes('失败')
      }));
  
      return {
        file,
        imagePreview,
        uploadStatus,
        ossUrl,
        handleFileChange,
        uploadFile,
        formatFileSize,
        statusClass
      };
    }
  };
  </script>
  
  <style>
  /* ✅ 新增样式 */
  .preview-image {
    max-width: 100%;
    height: auto;
    border: 2px solid #eee;
    border-radius: 8px;
    margin-top: 1rem;
  }
  
  .success {
    color: #42b983;
    font-weight: bold;
  }
  
  .error {
    color: #ff4444;
    font-weight: bold;
  }
  
  .oss-link {
    display: inline-block;
    margin-top: 1rem;
    padding: 8px 16px;
    background: #42b983;
    color: white;
    border-radius: 4px;
    text-decoration: none;
  }
  
  button {
    padding: 10px 20px;
    background: #1890ff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin: 1rem 0;
  }
  
  button:hover {
    background: #40a9ff;
  }
  </style>