<template>
  <div class="warpper">
    <div class="nav-links">
      <router-link to="/" class="nav-link">Demo 页面</router-link>
      <router-link to="/v-model-test" class="nav-link">V-Model 测试</router-link>
    </div>
    
    <Vue3Tiptap v-model="content" />

    <div class="controls">
      <a-button type="primary" @click="onClick">更新内容</a-button>
      <a-button type="default" @click="clearContent">清空内容</a-button>
      <a-button type="default" @click="setHtmlContent">设置HTML内容</a-button>
    </div>

    <div class="content-display">
      <h4>当前内容：</h4>
      <div v-html="content"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Vue3Tiptap from "@/components/vue3-tiptap";

const content = ref("<p>初始测试内容</p>")

const onClick = () => {
  content.value = `<p>更新后的内容 - ${Math.random()}</p>`
}

const clearContent = () => {
  content.value = ""
}

const setHtmlContent = () => {
  content.value = `
    <h2>标题</h2>
    <p>这是一个<strong>粗体</strong>和<em>斜体</em>的段落。</p>
    <ul>
      <li>列表项 1</li>
      <li>列表项 2</li>
    </ul>
  `
}

</script>

<style lang="scss" scoped>
.warpper {
  border: 1px solid #eee;
  padding: 40px;
  height: 800px;
  display: flex;
  flex-direction: column;
}

.nav-links {
  margin-bottom: 20px;
  display: flex;
  gap: 15px;
  
  .nav-link {
    padding: 8px 16px;
    background-color: #1890ff;
    color: white;
    text-decoration: none;
    border-radius: 4px;
    font-size: 14px;
    
    &:hover {
      background-color: #40a9ff;
    }
    
    &.router-link-active {
      background-color: #096dd9;
    }
  }
}

.controls {
  margin: 20px 0;
  display: flex;
  gap: 10px;
}

.content-display {
  margin-top: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f9f9f9;
  
  h4 {
    margin: 0 0 10px 0;
    color: #333;
  }
}
</style>
