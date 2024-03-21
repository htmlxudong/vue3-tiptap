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
		<pre><code><node-view-content /></code></pre>
	</node-view-wrapper>
</template>

<script setup>
import { NodeViewWrapper, nodeViewProps, NodeViewContent } from "@tiptap/vue-3";
import { ref, reactive, computed } from "vue";

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
	border: 1px solid #eee;
	background-color: #272c35;
	border-radius: 5px;
	color: #fff;
	padding: 10px 20px;
	.language {
		padding-bottom: 10px;
		::v-deep .ant-select {
			width: 100px;
		}
		::v-deep .ant-select-selector {
			background-color: #272c35;
			color: #fff;
		}
		::v-deep .ant-select-arrow {
			color: #fff;
		}
	}
}
</style>
