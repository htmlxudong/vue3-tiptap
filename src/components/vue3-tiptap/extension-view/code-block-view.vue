<template>
	<node-view-wrapper as="div" class="code-block">
		<div class="language">
			<a-select ref="select" v-model:value="selectedLanguage">
				<a-select-option v-for="(language, index) in languages" :value="language" :key="index">{{
					language
				}}</a-select-option>
			</a-select>
		</div>
		<!-- NodeViewContent将可编辑内容添加到节点视图中 -->
		<div class="pre-wrap">
			<pre><code><node-view-content /></code></pre>
		</div>
	</node-view-wrapper>
</template>

<script setup lang="ts">
import { NodeViewWrapper, nodeViewProps, NodeViewContent } from "@tiptap/vue-3";
import { ref, computed } from "vue";

const props = defineProps(nodeViewProps);
const languages = ref(props.extension.options.lowlight.listLanguages());

const selectedLanguage = computed({
	get() {
		return props.node.attrs.language;
	},
	set(language) {
		props.updateAttributes({ language });
	}
});
</script>

<style lang="scss" scoped>
.code-block {
	border: 1px solid #e1e4e8;
	border-radius: 6px;
	overflow: hidden;
	
	.language {
		padding: 10px 20px;
		background-color: #f6f8fa;
		border-bottom: 1px solid #e1e4e8;
		:deep(.ant-select) {
			width: 100px;
		}
		:deep(.ant-select-selector) {
			background-color: #f6f8fa;
			border: 1px solid #d0d7de;
		}
	}
	
	.pre-wrap{
		background: #ffffff;
		padding: 16px;
		
		// 确保代码块内的语法高亮样式正确显示
		:deep(pre) {
			margin: 0;
			background: transparent;
			font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
			font-size: 14px;
			line-height: 1.45;
			overflow-x: auto;
			white-space: pre;
		}
		
		:deep(code) {
			background: transparent;
			padding: 0;
			font-family: inherit;
			font-size: inherit;
			color: inherit;
			border-radius: 0;
		}
		
		// 确保highlight.js的样式能够正确应用
		:deep(.hljs) {
			background: transparent;
			padding: 0;
			color: #24292f;
		}
		
		// 确保语法高亮颜色正确显示
		:deep(.hljs-keyword) {
			color: #d73a49;
		}
		
		:deep(.hljs-string) {
			color: #032f62;
		}
		
		:deep(.hljs-comment) {
			color: #6a737d;
			font-style: italic;
		}
		
		:deep(.hljs-number) {
			color: #005cc5;
		}
		
		:deep(.hljs-function) {
			color: #6f42c1;
		}
		
		:deep(.hljs-variable) {
			color: #e36209;
		}
	}
}
</style>
