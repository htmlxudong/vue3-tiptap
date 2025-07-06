<template>
  <div class="search-demo">
    <h2>查找替换功能演示</h2>
    
    <div class="editor-container">
      <vue3-tiptap
        v-model:content="content"
        :extensions="extensions"
        placeholder="在这里输入文本进行查找替换测试..."
        class="editor"
      />
    </div>

    <div class="search-panel">
      <h3>查找替换面板</h3>
      <div class="search-inputs">
        <div class="input-group">
          <label>查找内容：</label>
          <a-input
            v-model:value="searchTerm"
            placeholder="输入要查找的文本"
            @keyup.enter="performSearch"
          />
        </div>
        
        <div class="input-group">
          <label>替换为：</label>
          <a-input
            v-model:value="replaceTerm"
            placeholder="输入要替换的文本"
          />
        </div>
      </div>

      <div class="search-actions">
        <a-button @click="findNext" type="primary">查找下一个</a-button>
        <a-button @click="findPrevious">查找上一个</a-button>
        <a-button @click="replace" type="default">替换</a-button>
        <a-button @click="replaceAll" type="default">全部替换</a-button>
        <a-button @click="clearSearch" type="default">清除搜索</a-button>
      </div>

      <div class="search-status" v-if="searchInfo.total > 0">
        <span>找到 {{ searchInfo.current }}/{{ searchInfo.total }} 个匹配项</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Vue3Tiptap from "@/components/vue3-tiptap";
import { SearchReplace } from '@/components/vue3-tiptap/extensions'
import emitter from '@/utils/EventEmitter'

// 扩展配置
const extensions = [
  SearchReplace,
  // 其他扩展...
]

// 初始内容
const initialContent = `
<h1>查找替换功能演示</h1>
<p>这是一个用于测试查找替换功能的文档。你可以在这里输入一些文本，然后使用查找替换功能来搜索和替换文本。</p>
<p>例如，你可以搜索"文本"这个词，然后将其替换为"内容"。</p>
<p>这个功能支持：</p>
<ul>
  <li>实时搜索</li>
  <li>高亮显示匹配项</li>
  <li>逐个替换</li>
  <li>全部替换</li>
  <li>上一个/下一个导航</li>
</ul>
<p>试试搜索"功能"这个词，看看效果如何！</p>
`

const content = ref(initialContent)
const searchTerm = ref('')
const replaceTerm = ref('')
const searchInfo = ref({
  total: 0,
  current: 0
})

// 搜索相关方法
const performSearch = () => {
  if (searchTerm.value) {
    // 这里需要通过editor实例调用搜索命令
    // 由于我们无法直接访问editor实例，这里只是演示
    console.log('搜索:', searchTerm.value)
  }
}

const findNext = () => {
  console.log('查找下一个')
}

const findPrevious = () => {
  console.log('查找上一个')
}

const replace = () => {
  console.log('替换当前匹配项')
}

const replaceAll = () => {
  console.log('全部替换')
}

const clearSearch = () => {
  searchTerm.value = ''
  replaceTerm.value = ''
  searchInfo.value = { total: 0, current: 0 }
  console.log('清除搜索')
}

// 监听搜索事件
onMounted(() => {
  emitter.on('search', (data: any) => {
    searchInfo.value = {
      total: data.decorations.length,
      current: data.activeIndex + 1
    }
  })
})
</script>

<style lang="scss" scoped>
.search-demo {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;

  h2 {
    text-align: center;
    margin-bottom: 20px;
  }

  .editor-container {
    margin-bottom: 20px;
    
    .editor {
      border: 1px solid #d9d9d9;
      border-radius: 6px;
      min-height: 300px;
    }
  }

  .search-panel {
    border: 1px solid #d9d9d9;
    border-radius: 6px;
    padding: 20px;
    background-color: #fafafa;

    h3 {
      margin-bottom: 15px;
    }

    .search-inputs {
      margin-bottom: 15px;

      .input-group {
        margin-bottom: 10px;

        label {
          display: block;
          margin-bottom: 5px;
          font-weight: 500;
        }
      }
    }

    .search-actions {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      margin-bottom: 15px;
    }

    .search-status {
      padding: 10px;
      background-color: #e6f7ff;
      border: 1px solid #91d5ff;
      border-radius: 4px;
      color: #1890ff;
    }
  }
}

// 搜索高亮样式
:deep(.search-highlight) {
  background-color: #ffeb3b !important;
  color: #000 !important;
}
</style> 