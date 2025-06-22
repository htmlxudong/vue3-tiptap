<template>
  <div class="v-model-test">
    <div class="nav-links">
      <router-link to="/" class="nav-link">Demo 页面</router-link>
      <router-link to="/v-model-test" class="nav-link">V-Model 测试</router-link>
    </div>
    
    <h2>Vue3-Tiptap V-Model 测试</h2>
    
    <div class="editor-container">
      <h3>富文本编辑器：</h3>
      <Vue3Tiptap v-model="editorContent" />
    </div>

    <div class="controls">
      <h3>控制按钮：</h3>
      <a-button type="primary" @click="updateContent">更新内容</a-button>
      <a-button type="default" @click="clearContent">清空内容</a-button>
      <a-button type="default" @click="setRichContent">设置富文本内容</a-button>
      <a-button type="default" @click="logContent">打印当前内容</a-button>
    </div>

    <div class="content-display">
      <h3>当前内容预览：</h3>
      <div class="html-content">
        <h4>HTML 内容：</h4>
        <pre>{{ editorContent }}</pre>
      </div>
      <div class="rendered-content">
        <h4>渲染效果：</h4>
        <div v-html="editorContent"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Vue3Tiptap from "@/components/vue3-tiptap";

const editorContent = ref("<p>欢迎使用 Vue3-Tiptap 编辑器！</p><p>这是一个支持 v-model 双向绑定的富文本编辑器。</p>")

const updateContent = () => {
  editorContent.value = `<p>内容已更新 - ${new Date().toLocaleTimeString()}</p>`
}

const clearContent = () => {
  editorContent.value = ""
}

const setRichContent = () => {
  editorContent.value = `
    <h2>富文本示例</h2>
    <p>这是一个包含多种格式的<strong>富文本</strong>内容：</p>
    <ul>
      <li><em>斜体文本</em></li>
      <li><strong>粗体文本</strong></li>
      <li><u>下划线文本</u></li>
    </ul>
    <blockquote>
      <p>这是一个引用块</p>
    </blockquote>
    <p>您可以在编辑器中修改内容，或者通过按钮更新内容。</p>
  `
}

const logContent = () => {

}

</script>

<style lang="scss" scoped>
.v-model-test {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
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

.editor-container {
  margin-bottom: 30px;
  
  h3 {
    margin-bottom: 10px;
    color: #333;
  }
}

.controls {
  margin-bottom: 30px;
  
  h3 {
    margin-bottom: 10px;
    color: #333;
  }
  
  .ant-btn {
    margin-right: 10px;
    margin-bottom: 10px;
  }
}

.content-display {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  
  h3 {
    margin-bottom: 15px;
    color: #333;
  }
  
  h4 {
    margin-bottom: 10px;
    color: #666;
  }
  
  .html-content {
    pre {
      background-color: #f5f5f5;
      padding: 15px;
      border-radius: 4px;
      overflow-x: auto;
      font-size: 12px;
      line-height: 1.4;
      border: 1px solid #ddd;
    }
  }
  
  .rendered-content {
    div {
      padding: 15px;
      border: 1px solid #ddd;
      border-radius: 4px;
      background-color: #fff;
      min-height: 100px;
    }
  }
}

@media (max-width: 768px) {
  .content-display {
    grid-template-columns: 1fr;
  }
}
</style> 