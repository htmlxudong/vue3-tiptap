# Vue3-Tiptap 使用指南

## 安装

```bash
npm install vue3-tiptap
```

## 基本使用

```vue
<template>
  <div>
    <Vue3TipTap v-model:content="content" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Vue3TipTap from 'vue3-tiptap'


const content = ref('<p>Hello World!</p>')
</script>
```

## 引入样式

在你的 main.js 或 main.ts 中引入样式：

```javascript
import 'vue3-tiptap/dist/vue3-tiptap.css'
```

## 功能特性

- 撤销/重做
- 清除格式
- 下划线
- 图片插入
- 列表
- 表格
- 对齐方式
- 字体设置
- 标题
- 背景色
- 字体颜色
- 行高
- 编号
- 格式刷
- 代码块
- 查找替换
- 粗体

## 更多示例

请访问 [GitHub 仓库](https://github.com/htmlxudong/vue3-tiptap) 查看完整示例。 