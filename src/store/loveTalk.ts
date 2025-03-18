import {defineStore} from 'pinia'
import {reactive} from 'vue'
import {nanoid} from 'nanoid'
import axios from 'axios';
// export const useTalkStore = defineStore('talk',{
//   actions:{
//     async  getATalk(){
//       // 发请求，下面这行的写法是：连续解构赋值+重命名
//       //vite 解决CORS跨域资源共享问题
//       let {data:{content:title}} = await axios.get('api/rand.qinghua?format=json')
//       // 把请求回来的字符串，包装成一个对象
//       let obj = {id:nanoid(),title}
//       // 放到数组中
//       this.talkList.unshift(obj)
//       }
//     },
//   // 真正存储数据的地方
//     state(){
//       return {
//         talkList:JSON.parse(localStorage.getItem('talkList') as string) || []
//       }
//     },

// })
export const useTalkStore = defineStore('talk',()=>{
  const talkList = reactive(
    JSON.parse(localStorage.getItem('talkList') as string) || []
  )

      async function getATalk(){
      // 发请求，下面这行的写法是：连续解构赋值+重命名
      //vite 解决CORS跨域资源共享问题
      let {data:{content:title}} = await axios.get('api/rand.qinghua?format=json')
      // 把请求回来的字符串，包装成一个对象
      let obj = {id:nanoid(),title}
      // 放到数组中
      talkList.unshift(obj)
      }
    return{talkList,getATalk}
})
