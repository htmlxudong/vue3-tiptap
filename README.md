# Vue3-Tiptap ⚡

> Based on Vue3 +Ant-Design-Vue+Tiptap secondary development of a rich text editor with common functions

<p align="center">
  <a href="https://htmlxudong.github.io/index.html" target="_blank" rel="noopener noreferrer">
    <img width="200"  src="./public/facio.png" alt="vue3-editor"/>
  </a>
</p>

English | [简体中文](./README-zh_CN.md)

## Quick Experience

[Online preview github](https://htmlxudong.github.io/index.html)

## Editor Function

- ✅ Undo/Redo
- ✅ Clear format
- ✅ Underline
- ✅ Picture
- ✅ List
- ✅ Form
- ✅ Alignment
- ✅ Font
- ✅ Title
- ✅ Background color
- ✅ Font color
- ✅ Line height
- ✅ child number
- ✅ Format swipe
- ✅ Code block
- ✅ Find and replace
- ✅ Bold

## 🔨 Quick to use

`Please install first Ant Design Vue` [Portal](https://www.antdv.com/components/overview)

```shell
npm i vue3-tiptap
or
pnpm  i vue3-tiptap

```

- Introduce in components

```vue
<script setup lang="ts">
import { ref } from "vue";
import Vue3TipTap from "vue3-tiptap";
import "vue3-tiptap/dist/vue3-tiptap.css";

const content = ref(
	"<h1>欢迎使用 Vue3 TipTap 富文本编辑器！</h1><p>这是一个功能强大的富文本编辑器，支持多种格式化选项。</p>"
);
const handleUpdate = (newContent: string) => {
	console.log("内容更新:", newContent);
};
</script>

<template>
	<div class="editor-container">
		<Vue3TipTap v-model:content="content" @update:content="handleUpdate" />
	</div>
</template>
```

## installation dependency 📦

```
pnpm install or npm install

```

## run project 🚀

```
npm run dev

```

## Technology Stack 🥇

core：vue3 + ant-design-vue + vite

commit：husky、commitlint

code formatting：preitter

## Thanks. 🌸

The project is mainly based on the following projects

- [tiptap](https://github.com/ueberdosis/tiptap)
- [element-tiptap](https://github.com/Leecason/element-tiptap)
- [tiptap document](https://tiptap.dev/docs/editor/introduction)
- [prosemirror](https://prosemirror.net/)

## Change Log 📄

- 2024.03.15 version 1.0.0
- 2025.04.15 version 2.0.0 Refactor project using TypeScript
