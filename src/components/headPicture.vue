<template>
	<div class="content"></div>
	<img v-for="(head,index) in headList" :key="index" :src="head"  referrerpolicy="no-referrer"> 
	<!-- <span v-show="dogList.isLoading">加载中......</span><br> -->
	<button @click="getHead">来一个动漫女头</button>
  </template>
  
  <script lang="ts">
	import {defineComponent} from 'vue'
  
	export default defineComponent({
	  name:'Picture',
	})
  </script>
  
  <script setup lang="ts">
	import useDog from '@/hooks/useDog'
	
	let {getHead,headList} = useDog()
  </script>
  
  <style scoped>
    /* 内容区域 */
.content {
  flex: 1;
  padding: 20px;
  overflow-y: auto; /* 允许垂直滚动 */
}
  /* 容器基础样式 */
  :host {
	display: block;
	max-width: 800px;
	margin: 2rem auto;
	padding: 1.5rem;
	font-family: 'Segoe UI', system-ui, sans-serif;
  }
  
  /* 标题样式 */
  h2 {
	color: #2c3e50;
	text-align: center;
	font-size: 1.8rem;
	margin-bottom: 1.5rem;
	padding: 0.8rem;
	background: #f8f9fa;
	border-radius: 8px;
	box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  
  .fixed-button {  
	position: fixed; /* 固定位置 */  
	bottom: 20px;   /* 距离底部20像素 */  
	right: 20px;    /* 距离右边20像素 */  
	padding: 10px 20px; /* 内边距 */  
	background-color: #42b983; /* 背景色 */  
	color: white;   /* 字体颜色 */  
	border: none;   /* 去掉边框 */  
	border-radius: 5px; /* 圆角 */  
	cursor: pointer; /* 鼠标指针变手 */  
	z-index: 1000;  /* 让按钮在最上层 */  
	transition: background-color 0.3s; /* 背景色变化效果 */  
  }  
  
  .fixed-button:hover {  
	background-color: #35495e; /* 鼠标悬停时的背景色 */  
  }  
  
  /* 图片展示区域 */
  img {
	width: 200px;
	height: 200px;
	object-fit: cover;
	border-radius: 8px;
	margin: 1rem;
	box-shadow: 0 4px 6px rgba(0,0,0,0.1);
	transition: transform 0.3s ease;
  }
  
  img:hover {
	transform: scale(1.05);
	z-index: 1;
  }
  
  /* 加载提示样式 */
  span {
	display: inline-block;
	margin: 1rem 0;
	color: #7f8c8d;
	font-style: italic;
	position: relative;
	padding-left: 24px;
  }
  
  span::before {
	content: '';
	position: absolute;
	left: 0;
	top: 50%;
	width: 16px;
	height: 16px;
	border: 2px solid #3498db;
	border-top-color: transparent;
	border-radius: 50%;
	animation: spin 0.8s linear infinite;
  }
  
  /* 分割线样式 */
  hr {
	margin: 2rem 0;
	border: 0;
	height: 1px;
	background-image: linear-gradient(
	  to right,
	  rgba(0, 0, 0, 0),
	  rgba(0, 0, 0, 0.1),
	  rgba(0, 0, 0, 0)
	);
  }
  
  /* 获取狗狗按钮 */
  button:last-of-type {
	background-color: #3498db;
	color: white;
	margin-top: 1rem;
	display: block;
	width: 200px;
	margin-left: auto;
	margin-right: auto;
  }
  
  /* 加载动画 */
  @keyframes spin {
	to {
	  transform: rotate(360deg);
	}
  }
  
  /* 移动端适配 */
  @media (max-width: 600px) {
	:host {
	  padding: 1rem;
	}
	
	h2 {
	  font-size: 1.4rem;
	}
  
	button {
	  padding: 0.6rem 1rem;
	  font-size: 0.9rem;
	}
  
	img {
	  width: 100%;
	  height: auto;
	  margin: 0.5rem 0;
	}
  }
  </style>