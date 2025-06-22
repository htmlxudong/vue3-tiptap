# Vue3-Tiptap V-Model 使用指南

## 概述

Vue3-Tiptap 组件现在支持 `v-model` 双向绑定，可以方便地在外部变量和编辑器内容之间进行同步。

## 基本用法

### 1. 简单的 v-model 绑定

```vue
<template>
  <div>
    <Vue3Tiptap v-model="content" />
    
    <button @click="updateContent">更新内容</button>
    <div v-html="content"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Vue3Tiptap from "@/components/vue3-tiptap";

const content = ref("<p>初始内容</p>")

const updateContent = () => {
  content.value = "<p>更新后的内容</p>"
}
</script>
```

### 2. 响应式内容更新

当外部变量 `content` 发生变化时，编辑器会自动更新内容：

```vue
<template>
  <div>
    <Vue3Tiptap v-model="content" />
    
    <div class="controls">
      <button @click="setSimpleText">设置简单文本</button>
      <button @click="setRichContent">设置富文本</button>
      <button @click="clearContent">清空内容</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Vue3Tiptap from "@/components/vue3-tiptap";

const content = ref("")

const setSimpleText = () => {
  content.value = "<p>这是简单的文本内容</p>"
}

const setRichContent = () => {
  content.value = `
    <h2>富文本标题</h2>
    <p>这是一个包含<strong>粗体</strong>和<em>斜体</em>的段落。</p>
    <ul>
      <li>列表项 1</li>
      <li>列表项 2</li>
    </ul>
  `
}

const clearContent = () => {
  content.value = ""
}
</script>
```

## 功能特性

### 1. 双向数据绑定
- 编辑器内容变化时，会自动更新绑定的变量
- 外部变量变化时，编辑器内容会自动同步

### 2. HTML 格式支持
- 支持完整的 HTML 格式内容
- 保持富文本编辑器的所有功能

### 3. 响应式更新
- 使用 Vue 3 的响应式系统
- 支持深度监听内容变化

## 注意事项

1. **内容格式**：绑定的变量应该包含有效的 HTML 字符串
2. **性能考虑**：避免频繁更新大量内容，可能影响性能
3. **内容验证**：建议在更新内容前进行必要的验证

## 示例页面

项目包含两个示例页面：

- `/` - 基础演示页面
- `/v-model-test` - 完整的 v-model 功能测试页面

访问这些页面可以查看实际的使用效果。

## 兼容性

- Vue 3.0+
- TypeScript 支持
- 与现有的 `content` prop 兼容（向后兼容） 