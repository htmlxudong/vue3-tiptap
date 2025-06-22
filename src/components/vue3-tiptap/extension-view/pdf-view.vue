<template>
	<node-view-wrapper as="div" class="pdf-view">
		<div class="pdf-view__container">
			<!-- PDF预览区域 -->
			<div class="pdf-view__preview" v-if="showPreview">
				<!-- 方式1: 使用object标签 -->
				<object v-if="previewMethod === 'object'" class="pdf-view__embed" :data="node.attrs.src"
					type="application/pdf" style="border: none">
					<div class="pdf-view__fallback">
						<p>object标签无法显示PDF，尝试其他方式...</p>
						<button @click="previewMethod = 'iframe'" class="pdf-view__fallback-btn">
							使用iframe预览
						</button>
						<button @click="previewMethod = 'embed'" class="pdf-view__fallback-btn">
							使用embed预览
						</button>

					</div>
				</object>
				<!-- 方式2: 使用iframe标签 -->
				<iframe v-else-if="previewMethod === 'iframe'" class="pdf-view__embed" :src="node.attrs.src"
					style="border: none">
				</iframe>

				<!-- 方式3: 使用embed标签 -->
				<embed v-else-if="previewMethod === 'embed'" class="pdf-view__embed" :src="node.attrs.src"
					type="application/pdf" style="border: none">

				<!-- 预览控制按钮 -->
				<div class="pdf-view__preview-controls">
					<button @click="previewMethod = 'object'" class="pdf-view__control-btn">Object</button>
					<button @click="previewMethod = 'iframe'" class="pdf-view__control-btn">Iframe</button>
					<button @click="previewMethod = 'embed'" class="pdf-view__control-btn">Embed</button>
					<button @click="toggleView" class="pdf-view__control-btn">Link</button>
				</div>
			</div>

			<div class="pdf-view__info" v-if="!showPreview">
				<a-popover placement="top">
					<template #content>
						<div class="pdf-view__toggle">
							<a-button @click="toggleView"  type="link" size="small">
								{{ showPreview ? 'Link模式' : '预览模式' }}
							</a-button>
						</div>
					</template>
					<a class="pdf-view__filename" @click="downloadFile">📄{{ fileName }}</a>
				</a-popover>
			</div>
		</div>
	</node-view-wrapper>
</template>

<script setup lang="ts">
import { NodeViewWrapper, nodeViewProps } from "@tiptap/vue-3";
import { computed, ref } from "vue";

const props = defineProps(nodeViewProps);

const showPreview = ref(false);
const previewMethod = ref('object');

const fileName = computed(() => {
	const fileName = props.node.attrs.fileName;
	if (!fileName) return 'document.pdf';
	return fileName
});


// 检查是否为blob URL
const isBlobUrl = computed(() => {
	return props.node.attrs.src?.startsWith('blob:');
});
const isBase64 = computed(() => {
	return props.node.attrs.src?.startsWith('data:');
});

// 切换视图
const toggleView = () => {
	showPreview.value = !showPreview.value;
};


const downloadFile = () => {
	const link = document.createElement('a');
	link.href = props.node.attrs.src;
	link.download = fileName.value;
	link.target = '_blank';
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
};


</script>

<style scoped lang="scss">
.pdf-view {
	&__container {
		border-radius: 6px;
		overflow: hidden;
		margin: 10px 0;
	}

	&__preview {
		height: 500px;
		position: relative;
	}

	&__embed {
		width: 100%;
		height: 100%;
	}

	&__fallback {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
		background-color: #f5f5f5;
		color: #666;

		p {
			margin-bottom: 10px;
		}
	}

	&__fallback-btn {
		margin: 5px;
		padding: 8px 16px;
		background-color: #1890ff;
		color: white;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		font-size: 12px;

		&:hover {
			background-color: #40a9ff;
		}
	}

	&__preview-controls {
		position: absolute;
		bottom: 20px;
		left: 10px;
		display: flex;
		gap: 5px;
		z-index: 10;
	}

	&__control-btn {
		padding: 4px 8px;
		background-color: rgba(0, 0, 0, 0.7);
		color: white;
		border: none;
		border-radius: 3px;
		cursor: pointer;
		font-size: 11px;
		&:hover {
			background-color: rgba(0, 0, 0, 0.9);
		}
	}

	&__filename {
		color: #008DFF;
		cursor: pointer;
	}
}
</style>