<template>
	<div class="wrapper">
		<h1 class="title">💐 Vue3 + Tiptap 🚀</h1>
		<x-tiptap :events="editorContext" />
	</div>
</template>
<script setup>
import { ref, reactive } from "vue";

const editorContext = reactive({
	uploadImg(file) {
		console.log(file, "file");
		return file;
	}
});
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
	padding: 60px 20px;
}
</style>
