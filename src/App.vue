<template>
  <!-- <div>
    <title>网易云音乐</title>
    <iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=330 height=330 
src="https://music.163.com/outchain/player?type=0&id=9864212174&auto=1">
</iframe>
  </div> -->

  <!-- <Picture></Picture> -->
  <!-- <Modal/> -->


   <div  class="triple-layout">
    <div class="panel left-panel">
      <!-- <LoveTalk/> -->
       <!-- <ImageUpload/> -->
    </div>
    <div class="panel middle-panel">
        <dogPicture/>
    </div>
    <div class="panel right-panel">
      <!-- <headPicture/> -->
       <!-- <GetImage/> -->
    </div>
   </div>
</template>



<script setup lang="ts" name="App">

  import LoveTalk from './components/LoveTalk.vue'
import DogPicture from './components/dogPicture.vue';
  import headPicture from './components/headPicture.vue'
  import ImageUpload from './ImageUpload.vue'
  import GetImage from './GetImage.vue'
  // import Modal from './Modal.vue';
</script>
<style>
/* 基础布局 */
.triple-layout {
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

/* 通用面板样式 */
.panel {
  flex: 1;
  min-width: 300px; /* 最小宽度约束 */
  display: flex;
  flex-direction: column;
  border-right: 1px solid #e0e0e0;
  background: #f8f9fa;
  transition: all 0.3s;
}

/* 左区额外样式 */
.left-panel {
  margin-left: 0; /* 确保左区紧贴 padding */
}

/* 移除最后一个面板的右边框 */
.panel:last-child {
  border-right: none;
}

/* 内容区域 */
.content {
  flex: 1;
  padding: 20px;
  overflow-y: auto; /* 允许垂直滚动 */
}

/* 图片网格布局 */
.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
  padding: 12px;
}

.dynamic-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.2s;
}

.dynamic-image:hover {
  transform: scale(1.03);
  z-index: 1;
}

/* 按钮样式 */
button {
  padding: 10px 24px;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  margin-bottom: 16px;
  transition: all 0.3s;
}

button:hover {
  background: #35495e;
  transform: translateY(-2px);
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .triple-layout {
    flex-direction: column;
  }

  .panel {
    min-width: 100%;
    height: 33.33vh;
    border-right: none;
    border-bottom: 1px solid #e0e0e0;
  }

  .image-grid {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  }
}

@media (max-width: 480px) {
  .dynamic-image {
    height: 150px;
  }
}
</style>