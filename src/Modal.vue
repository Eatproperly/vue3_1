<template>
  <button @click="isShow1 = true">聊点假话</button>
  <button @click="isShow2 = true">讲点真话</button>
  <!-- 弹窗组件 -->
  <teleport to='body'>
    <div class="modal" v-show="isShow1">
      <p>你最喜欢的人是？</p>
      <AtguiguInput type="text" v-model:query1="msg" />
      <button @click="isShow1 = false">关闭</button>
    </div>
  </teleport>

  <teleport to='body'>
    <div class="modal" v-show="isShow2">
      <p>你最喜欢的人是？</p>
      <AtguiguInput type="text" v-model:query2="msg" />
      <button @click="isShow2 = false">关闭</button>
    </div>
  </teleport>
  
</template>
<script setup lang="ts" name="Modal">
import AtguiguInput from './AtguiguInput.vue'
import { ref } from 'vue'
import useMsgRef from './useMsgRef'

let isShow2 = ref(false)
let isShow1 = ref(false)
let { msg } = useMsgRef('', 2000)
</script>

<style scoped>
.modal {
  width: 200px;
  height: 150px;
  background-color: skyblue;
  border-radius: 10px;
  padding: 5px;
  box-shadow: 0 0 5px;
  text-align: center;
  position: fixed;
  left: 50%;
  top: 20px;
  margin-left: -100px;
}
</style>