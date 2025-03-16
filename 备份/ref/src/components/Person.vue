<template>
    <div class="person">
        <h2>姓名：{{ name }}</h2>
        <h2>年龄：{{ age }}</h2>
        <button @click="showTel">查看联系方式</button>
        <button @click="changeAge">修改年龄</button>
        <button @click="changeName">修改姓名</button>
    </div>
</template>

<script lang="ts">
  export default{
    name : 'Person',
  }
</script>

<script lang="ts" setup name = "Person">
import { ref } from 'vue'
    let name = ref('zhangsan')
    let age  = ref(18)
    let tel = 1388888888
    //方法
    function changeName(){
      name.value = 'zhang-san'
      console.log(name)
    }
    function changeAge(){
      age.value += 1
      console.log(age)
    }
    function showTel(){
        alert(tel)
    }
</script>

<style>
    .person{
      background-color: aquamarine;
      box-shadow: 0 0 10px;
      border-radius: 10px;
      padding: 20px;
    }
</style>