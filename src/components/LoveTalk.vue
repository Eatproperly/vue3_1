<template>
  <div class="talk">
    <button @click="getLoveTalk">获取一句土味情话</button>
    <ul>
      <li v-for="talk in talkList" :key="talk.id">{{talk.title}}</li>
    </ul>
  </div>
</template>

<script setup lang="ts" name="LoveTalk">
  import {useTalkStore} from '@/store/loveTalk';
import { storeToRefs } from 'pinia';
  const talkStore = useTalkStore()
  const {talkList} = storeToRefs(talkStore)
  // talkStore.$patch({
  //   talkList:[
  //   {id:'ftrfasdf03',title:'心里给你留了一块地，我的死心塌地'},
  //   ]
  // })
  // 数据 我们把这部分数据通过pinia放到.ts文件了
  // let talkList = reactive([
  //   {id:'ftrfasdf01',title:'今天你有点怪，哪里怪？怪好看的！'},
  //   {id:'ftrfasdf02',title:'草莓、蓝莓、蔓越莓，今天想我了没？'},
  //   {id:'ftrfasdf03',title:'心里给你留了一块地，我的死心塌地'}
  // ])
  // 方法
  talkStore.$subscribe((mutate,state)=>{
    console.log('talkstore里面保存的数据发生了变化',mutate,state)
    localStorage.setItem('talkList',JSON.stringify(state.talkList))
  })
  function getLoveTalk(){
    talkStore.getATalk()
  }
</script>

<style scoped>
  .talk {
    background-color: orange;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0 0 10px;
  }
</style>