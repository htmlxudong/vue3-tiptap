<template>
	<div class="wrapper">
		<h1 class="title">💐 Vue3 + Tiptap 🚀</h1>
		<x-tiptap v-model:content="valueHtml" />
	</div>
</template>
<script setup>
import { ref, reactive, watch } from "vue";

const valueHtml = ref("<p>I’m running Tiptap with Vue.js. 🎉</p>");

watch(
	() => valueHtml.value,
	value => {
		console.log(value);
	}
);
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
	height: 400px;
	padding: 60px 20px;
}
</style>
