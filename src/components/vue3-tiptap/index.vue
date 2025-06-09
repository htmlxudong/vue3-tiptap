<template>
	<div v-if="editor" :class="['vue3-tiptap', isFullScreen ? 'editor--fullscreen' : '']">
		<Toolbar :editor="editor">
			<template #tool> <slot name="tool"></slot></template>
		</Toolbar>
		<editor-content :editor="editor" class="editor" />
		<!-- <span class="words">{{ wordCount }}字</span> -->
	</div>
</template>

<script setup lang="ts">
import { onMounted, provide, ref } from "vue";
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./toolbar/classic/index.vue";
import type { TiptapProps } from "./vue3-tiptap";
import { ToggleFullScreenKey, IsFullScreenKey } from "./vue3-tiptap";
import {
	Underline,
	Color,
	Highlight,
	TextAlign,
	FontFamily,
	Link,
	Images,
	Video,
	Table,
	TableHeader,
	TableRow,
	CustomTableCell,
	CustomOrderedList,
	CustomBulletList,
	CustomIndent,
	CodeBlockLights,
	lowlight,
	searchReplace,
	Iframe,
	CustomTextStyle,
	FormatBrush,
	LineHeight
} from "./extensions/index";

defineProps<TiptapProps>();

const extensions = [
	StarterKit.configure({
		orderedList: false,
		bulletList: false,
		blockquote: {
			HTMLAttributes: {
				class: "x-blockquote"
			}
		}
	}),
	Underline.configure({
		HTMLAttributes: {
			class: "x-underline"
		}
	}),
	Color,
	Highlight.configure({
		multicolor: true
	}),
	TextAlign.configure({
		types: ["heading", "paragraph"]
	}),
	FontFamily,
	Link.configure({
		openOnClick: true,
		HTMLAttributes: {
			class: "x-link"
		}
	}),
	Images,
	Video,
	Table,
	TableHeader,
	TableRow,
	CustomTableCell,
	CustomOrderedList,
	CustomBulletList,
	CustomIndent,
	CodeBlockLights.configure({ lowlight }),
	searchReplace,
	Iframe,
	CustomTextStyle,
	FormatBrush,
	LineHeight
];

const wordCount = ref(0);
const editor = useEditor({
	content: `
  <p>I'm running Tiptap with Vue.js. 🎉</p>
  `,
	extensions,
	onUpdate({ editor }) {
		getWordCount(editor);
	}
});

const isFullScreen = ref(false);
const toggleFullscreen = () => {
	isFullScreen.value = !isFullScreen.value;
};
const getWordCount = (editor: any) => {
	const text = editor.getText();
	wordCount.value = text.length;
};
provide(IsFullScreenKey, isFullScreen.value);
provide(ToggleFullScreenKey, toggleFullscreen);

onMounted(() => {
	getWordCount(editor.value);
});
</script>

<style scoped>
.vue3-tiptap {
	height: 100%;
	border: 1px solid var(--main-primary-border);
	overflow: hidden;
	border-radius: 5px;
	background-color: #fff;
}
</style>
