<template>
  <div class="pdf-test">
    <div class="nav-links">
      <router-link to="/" class="nav-link">Demo 页面</router-link>
      <router-link to="/v-model-test" class="nav-link">V-Model 测试</router-link>
      <router-link to="/pdf-test" class="nav-link">PDF 测试</router-link>
    </div>
    
    <h2>PDF 文件上传测试</h2>
    
    <div class="editor-container">
      <h3>富文本编辑器：</h3>
      <Vue3Tiptap v-model="editorContent" />
    </div>

    <div class="instructions">
      <h3>测试说明：</h3>
      <ol>
        <li>点击工具栏中的 PDF 按钮</li>
        <li>选择"上传本地PDF"</li>
        <li>选择一个PDF文件</li>
        <li>查看PDF是否正确显示</li>
      </ol>
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

const editorContent = ref("<p>PDF 文件上传测试页面</p><p>请使用工具栏中的 PDF 按钮上传 PDF 文件进行测试。</p>")
</script>

<style lang="scss" scoped>
.pdf-test {
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

.instructions {
  margin-bottom: 30px;
  padding: 20px;
  background-color: #f6f8fa;
  border-radius: 6px;
  border-left: 4px solid #1890ff;
  
  h3 {
    margin-bottom: 15px;
    color: #333;
  }
  
  ol {
    margin-left: 20px;
    
    li {
      margin-bottom: 8px;
      color: #666;
    }
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