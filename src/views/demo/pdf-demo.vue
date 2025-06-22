<template>
  <div class="pdf-test">

    <div class="editor-container">
      <h2 class="h2-title">PDF 文件上传测试</h2>
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

  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Vue3Tiptap from "@/components/vue3-tiptap";

const editorContent = ref("<p>PDF 文件上传测试页面</p><p>请使用工具栏中的 PDF 按钮上传 PDF 文件进行测试。</p>")
</script>

<style lang="scss" scoped>
.pdf-test {
  max-width: 1500px;
  margin: 0 auto;
  padding-bottom: 20px;
}

.editor-container {
  .h2-title {
    text-align: center;
    font-weight: 600;
    font-size: 18px;
  }

  h3 {
    color: #333;
  }
}

.instructions {
  margin-top:15px;
  padding: 15px;
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



@media (max-width: 768px) {
  .content-display {
    grid-template-columns: 1fr;
  }
}
</style>