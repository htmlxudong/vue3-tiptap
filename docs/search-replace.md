# 查找替换插件使用指南

## 概述

SearchReplace 是一个基于 Tiptap 2.0 的查找替换插件，提供了完整的文本搜索和替换功能。该插件支持实时搜索、高亮显示匹配项、逐个替换和全部替换等功能。

## 功能特性

- ✅ 实时文本搜索
- ✅ 高亮显示匹配项
- ✅ 上一个/下一个导航
- ✅ 逐个替换
- ✅ 全部替换
- ✅ 搜索状态显示
- ✅ 事件通知机制

## 安装和配置

### 1. 导入插件

```typescript
import { SearchReplace } from '@/components/vue3-tiptap/extensions'
```

### 2. 在编辑器中使用

```vue
<template>
  <vue3-tiptap
    v-model:content="content"
    :extensions="extensions"
    placeholder="开始输入..."
  />
</template>

<script setup>
import { SearchReplace } from '@/components/vue3-tiptap/extensions'

const extensions = [
  SearchReplace,
  // 其他扩展...
]
</script>
```

## API 命令

### 搜索命令

```typescript
// 搜索文本
editor.commands.search('要搜索的文本')

// 清除搜索
editor.commands.clearSearch()

// 查找下一个
editor.commands.findNext()

// 查找上一个
editor.commands.findPrev()
```

### 替换命令

```typescript
// 替换当前匹配项
editor.commands.replace('替换文本')

// 替换所有匹配项
editor.commands.replaceAll('替换文本')
```

## 事件监听

插件会触发 `search` 事件，你可以监听这个事件来获取搜索状态：

```typescript
import emitter from '@/utils/EventEmitter'

emitter.on('search', (data) => {
  console.log('搜索查询:', data.query)
  console.log('匹配项数量:', data.decorations.length)
  console.log('当前索引:', data.activeIndex)
})
```

事件数据格式：
```typescript
interface SearchEventData {
  query: string           // 搜索查询
  decorations: any[]      // 装饰器数组
  activeIndex: number     // 当前活跃索引
}
```

## 样式自定义

你可以通过 CSS 自定义搜索高亮的样式：

```css
.search-highlight {
  background-color: #ffeb3b !important;
  color: #000 !important;
}
```

## 完整示例

```vue
<template>
  <div class="search-demo">
    <vue3-tiptap
      v-model:content="content"
      :extensions="extensions"
      class="editor"
    />
    
    <div class="search-panel">
      <input v-model="searchTerm" placeholder="搜索文本" />
      <input v-model="replaceTerm" placeholder="替换为" />
      <button @click="performSearch">搜索</button>
      <button @click="findNext">下一个</button>
      <button @click="findPrevious">上一个</button>
      <button @click="replace">替换</button>
      <button @click="replaceAll">全部替换</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Vue3TipTap from '@/components/vue3-tiptap'
import { SearchReplace } from '@/components/vue3-tiptap/extensions'
import emitter from '@/utils/EventEmitter'

const extensions = [SearchReplace]
const content = ref('<p>这是测试内容</p>')
const searchTerm = ref('')
const replaceTerm = ref('')

const performSearch = () => {
  // 通过编辑器实例调用搜索命令
  // 这里需要获取编辑器实例
}

const findNext = () => {
  // 查找下一个
}

const findPrevious = () => {
  // 查找上一个
}

const replace = () => {
  // 替换当前匹配项
}

const replaceAll = () => {
  // 替换所有匹配项
}

onMounted(() => {
  emitter.on('search', (data) => {
    console.log('搜索状态:', data)
  })
})
</script>
```

## 注意事项

1. **性能考虑**: 对于大文档，搜索可能会影响性能，建议使用防抖来优化搜索频率。

2. **事件发射器**: 确保在插件初始化时正确设置事件发射器。

3. **样式冲突**: 搜索高亮样式可能会与其他样式冲突，建议使用 `!important` 来确保优先级。

4. **扩展兼容性**: 该插件与其他 Tiptap 扩展兼容，但建议测试特定场景下的兼容性。

## 故障排除

### 搜索不工作
- 检查是否正确导入了 SearchReplace 扩展
- 确认编辑器实例是否正确初始化
- 检查控制台是否有错误信息

### 高亮不显示
- 检查 CSS 样式是否正确应用
- 确认搜索查询不为空
- 检查文档中是否存在匹配的文本

### 替换功能异常
- 确认当前有选中的匹配项
- 检查替换文本是否有效
- 确认编辑器处于可编辑状态

## 更新日志

### v1.0.0
- 初始版本发布
- 支持基本搜索和替换功能
- 支持事件通知机制
- 支持自定义样式 