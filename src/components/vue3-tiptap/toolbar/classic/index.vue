<template>
	<div class="toolbar">
		<ToolTemplate v-for="tool in toolbars" :editor="editor" :option="tool" :key="tool.name" />

		<!-- 链接 -->
		<LinkTool :editor="editor" />
		<Dvider />
		<!-- 格式刷 -->
		<FormatBrush :editor="editor" />
		<!-- 字号 -->
		<FontSize :editor="editor" />
		<!-- 行高 -->
		<LineHeight :editor="editor" />
		<FontColor :editor="editor" />
		<BgColor :editor="editor" />
		<HeaderTool :editor="editor" />
		<FontFamily :editor="editor" />
		<ImageTool :editor="editor" />
		<VideoTool :editor="editor" />
		<PdfTool :editor="editor" />
		<TableTool :editor="editor" />
		<!-- 文本对齐 -->
		<FontAlign :editor="editor" />
		<!-- 有序列表 -->
		<OrderedList :editor="editor" />
		<!-- 无序列表 -->
		<BulletList :editor="editor" />

		<!-- 全屏 -->
		<FullScreen :editor="editor" />
		<!-- 查找与替换 -->
		<Teleport to="body">
			<FindReplace :editor="editor" :visible="visible" :closeModal="closeModal" />
		</Teleport>

		<!-- 自定义 toolbar 插槽 -->
		<slot name="tool"></slot>
	</div>
</template>

<script setup lang="ts">
import type { Editor } from "@tiptap/core";
import type { OptionProps } from "./classic";
import { reactive } from "vue";
import { createToolbarOptions } from "./classic-options";
import { useModal } from "@/hooks/useModal";
import ToolTemplate from "./tool-template.vue";
import Dvider from "@/components/dvider";
import FontColor from "./color/font-color.vue";
import BgColor from "./color/bg-color.vue";
import HeaderTool from "./header-tool.vue";
import FontFamily from "./font-style/font-family.vue";
import ImageTool from "./image-tool.vue";
import VideoTool from "./video-tool.vue";
import PdfTool from "./pdf-tool.vue";
import TableTool from "./table/table-tool.vue";
import OrderedList from "./ordered-list.vue";
import BulletList from "./bullet-List.vue";
import LinkTool from "./link-tool.vue";
import FullScreen from "./fullscreen.vue";
import FindReplace from "./find-replace/find-replace.vue";
import FontSize from "./font-style/font-size.vue";
import FontAlign from "./font-style/font-align.vue";
import FormatBrush from "./format-brush.vue";
import LineHeight from "./font-style/line-height.vue";

interface ToolbarProps {
	editor: Editor;
}
const { visible, toggleModal, closeModal } = useModal();

const props = defineProps<ToolbarProps>();
const toolbars: OptionProps[] = reactive(
	createToolbarOptions(props.editor, {
		searchoutlined: {
			toggleModal
		}
	})
);
</script>

<style scoped>
.toolbar {
	display: flex;
	align-items: center;
	gap: 3px;
	flex-shrink: 0;
	flex-wrap: wrap;
	box-sizing: border-box;
	padding: 5px 8px;
	position: relative;
}

.toolbar::before {
	bottom: 0;
	background-color: var(--main-primary-border);
	content: "";
	height: 1px;
	left: 0;
	margin: 0 10px;
	right: 0;
	position: absolute;
}
</style>
