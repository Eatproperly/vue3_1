<template>
  <div v-show="q = query1">
  <input 
    type="text" 
    :value="query1"
    @input="emit('update:query','L')"
  >
</div>
<div v-show="q = query2">
  <input 
    type="text" 
    :value="query2"
    @input="emit('update:query','你自己')"
  >
</div>
  <!-- @input="emit('update:mima',(<HTMLInputElement>$event.target).value)" -->
</template>

<script setup lang="ts" name="AtguiguInput">
  const props= defineProps(['query1','query2'])
  const propKeys = Object.keys(props); 
  const q = propKeys[0]
  console.log(propKeys[0])
  const emit = defineEmits(['update:query'])
</script>

<style scoped>
  input {
    border: 2px solid black;
    background-image: linear-gradient(45deg,red,yellow,green);
    height: 30px;
    font-size: 20px;
    color: white;
  }
</style>