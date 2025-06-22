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

			<!-- PDF信息卡片 -->
			<div class="pdf-view__info" v-if="!showPreview">
				<a class="pdf-view__filename" @click="downloadFile">📄{{ fileName }}</a>
			</div>

			<!-- 切换按钮 -->
			<!-- <div class="pdf-view__toggle">
				<a-button @click="toggleView">
					{{ showPreview ? '显示信息' : '预览PDF' }}
				</a-button>
			</div> -->
		</div>
	</node-view-wrapper>
</template>

<script setup lang="ts">
import { NodeViewWrapper, nodeViewProps } from "@tiptap/vue-3";
import { computed, ref } from "vue";

const props = defineProps(nodeViewProps);

const showPreview = ref(false);
const previewMethod = ref('object');

// 获取文件名
const fileName = computed(() => {
	const src = props.node.attrs.src;
	if (!src) return 'document.pdf';

	// 如果是base64，使用默认名称
	if (src.startsWith('data:')) {
		return 'document.pdf';
	}

	// 从URL中提取文件名
	const urlParts = src.split('/');
	return urlParts[urlParts.length - 1] || 'document.pdf';
});

// 获取文件类型
const fileType = computed(() => {
	const src = props.node.attrs.src;
	if (!src) return '未知';

	if (src.startsWith('data:')) {
		const match = src.match(/data:([^;]+)/);
		return match ? match[1] : 'application/pdf';
	}

	if (src.startsWith('blob:')) {
		return 'application/pdf (blob)';
	}

	return 'application/pdf';
});

// 获取文件大小
const fileSize = computed(() => {
	const src = props.node.attrs.src;
	if (!src) return '未知';

	if (src.startsWith('data:')) {
		// 计算base64数据大小（大约）
		const base64Length = src.length - src.indexOf(',') - 1;
		const sizeInBytes = Math.ceil(base64Length * 0.75);
		return formatFileSize(sizeInBytes);
	}

	if (src.startsWith('blob:')) {
		return 'blob URL';
	}

	return '未知';
});

// 获取数据长度
const dataLength = computed(() => {
	const src = props.node.attrs.src;
	if (!src) return '0';

	return src.length.toString();
});

// 检查是否为blob URL
const isBlobUrl = computed(() => {
	return props.node.attrs.src?.startsWith('blob:');
});

// 检查是否为base64
const isBase64 = computed(() => {
	return props.node.attrs.src?.startsWith('data:');
});

// 检查是否为网络URL
const isNetworkUrl = computed(() => {
	const src = props.node.attrs.src;
	return src && !src.startsWith('data:') && !src.startsWith('blob:');
});

// 格式化文件大小
const formatFileSize = (bytes: number): string => {
	if (bytes === 0) return '0 Bytes';
	const k = 1024;
	const sizes = ['Bytes', 'KB', 'MB', 'GB'];
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// 切换视图
const toggleView = () => {
	showPreview.value = !showPreview.value;
};

// 下载文件
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
		border: 1px solid #e8e8e8;
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

	&__info {
		display: flex;
		align-items: center;
		padding: 5px;
		background-color: #f9f9f9;
	}

	&__filename {
		color: #008DFF;
		cursor: pointer;
	}

	&__toggle {
		padding: 10px;
		background-color: #f0f0f0;
		border-top: 1px solid #e8e8e8;
		text-align: center;
	}
}
</style>