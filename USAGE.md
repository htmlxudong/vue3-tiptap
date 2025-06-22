# Vue3-Tiptap 使用指南

## 安装

```bash
npm install vue3-tiptap@2.0.1
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

## 必需依赖

确保你的项目中安装了以下 peerDependencies：

```bash
npm install vue@^3.0.0 ant-design-vue@^4.0.0 @tiptap/vue-3@^2.0.0 @tiptap/starter-kit@^2.0.0
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

## 常见问题

### 插件冲突错误

如果遇到 `Uncaught RangeError: Adding different instances of a keyed plugin` 错误，请确保：

1. 使用最新版本 `vue3-tiptap@2.0.1`
2. 正确安装所有 peerDependencies
3. 不要在同一个项目中重复引入 Tiptap 相关插件

### 样式问题

如果样式显示异常，请确保：
1. 正确引入了 CSS 文件
2. 检查是否有样式冲突

## 更多示例

请访问 [GitHub 仓库](https://github.com/htmlxudong/vue3-tiptap) 查看完整示例。 