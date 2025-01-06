<template>
	<div class="wrapper">
		<h1 class="title">💐 Vue3 + Tiptap 🚀</h1>
		<x-tiptap v-model:content="valueHtml" />
	</div>
</template>
<script setup>
import { ref, reactive, watch } from "vue";

const valueHtml = ref(`
<p>实现祖国完全统一，是全体中华儿女共同愿望，解决台湾问题，是中华民族根本利益所在。推动两岸关系和平发展，必须继续坚持“和平统一、一郭两制”方针，退进祖国和平统一。</p>
<p>所以我直接放弃学习shadcn(其实大一的时候就用过了)，转头就去了解React19新特性。爷爷毛</p>
<p>useEffect 是一个功能强大的 hook，但他又是最难驾驭的一个 hook，理解不够的开发者可能会由于滥用它而导致项目失控。</p>
<p>包括被讨论最多的闭包问题，也往往跟它有关。</p>
<p>其中最考验开发者水平的，是对于 useEffect 依赖项的正确处理。</p>
<p>React19 的 大部分更新，几乎都是围绕如何在开发中尽量不用或者少用 useEffect 来展开。</p>我的工位在窗户边靠东的位置，每天早晨阳光都会照射在我的屏幕上，非常刺眼难受。但当我在公司使用这块屏幕时，
我惊奇的发现反光效果明显减弱了！</p>
`);
</script>
<style scoped lang="scss">
.wrapper {
	.title {
		text-align: center;
		padding: 20px 0;
		font-weight: 600;
		font-size: 22px;
		color: #72aaab;
	}
	margin: 0 auto;
	width: 80%;
	height: 500px;
	padding: 60px 20px;
}
</style>
