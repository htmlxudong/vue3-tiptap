<template>
	<node-view-wrapper as="div" class="iframe">
		<!-- 如果是PDF文件，使用object标签 -->
		<object 
			v-if="isPdfFile" 
			class="iframe__embed" 
			:data="node.attrs.src" 
			type="application/pdf"
			style="border: none">
			<p>您的浏览器不支持PDF显示，请 <a :href="node.attrs.src" target="_blank">点击这里下载</a></p>
		</object>
		<!-- 其他文件使用iframe -->
		<iframe 
			v-else 
			class="iframe__embed" 
			:src="node.attrs.src" 
			style="border: none">
		</iframe>
	</node-view-wrapper>
</template>

<script setup lang="ts">
import { NodeViewWrapper, nodeViewProps } from "@tiptap/vue-3";
import { computed } from "vue";

const props = defineProps(nodeViewProps);

// 判断是否为PDF文件
const isPdfFile = computed(() => {
	const src = props.node.attrs.src;
	if (!src) return false;
	
	// 检查是否为base64编码的PDF
	if (src.startsWith('data:application/pdf')) {
		return true;
	}
	
	// 检查URL是否指向PDF文件
	if (src.includes('.pdf') || src.includes('application/pdf')) {
		return true;
	}
	
	return false;
});
</script>

<style scoped lang="scss">
.iframe {
	height: 0;
	padding-bottom: 56.25%;
	position: relative;
	width: 100%;

	&__embed {
		border: 0;
		height: 100%;
		left: 0;
		position: absolute;
		top: 0;
		width: 100%;
	}
}
</style>
