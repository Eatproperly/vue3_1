import {reactive,onMounted} from 'vue'
import axios,{AxiosError} from 'axios'
import {nanoid} from 'nanoid'
export default function(){
  let dogList = reactive<string[]>([])
  let headList = reactive<string[]>([])

  // 方法
  async function getDog(){
    try {
      // 发请求
      let {data} = await axios.get('https://dog.ceo/api/breed/pembroke/images/random')

      // 维护数据
      console.log('message',data.message)
      console.log(typeof data.message)
      dogList.unshift(data.message)
    } catch (error) {
      // 处理错误
      const err = <AxiosError>error
      console.log(err.message)
    }
  }
  async function getHead(){
    try {
      // 发请求
      let {data:{imgurl:title}} = await axios.get('https://api.uomg.com/api/rand.avatar',{
        params: { sort: '动漫女', format: 'json' },
        headers: {
          Referer: null, // 禁止发送 Referer
        },
      })
      
      // 维护数据
      console.log('title',title)
      console.log(typeof title)
      headList.unshift(title)
    } catch (error) {
      // 处理错误
      const err = <AxiosError>error
      console.log('获取头像失败',err)
    }
  }
  // 挂载钩子
  // onMounted(()=>{
  //   getDog()
  // })
	
  //向外部暴露数据
  return {dogList,getHead,getDog,headList}
}