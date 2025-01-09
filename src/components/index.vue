<template>
	<div v-if="editor" class="editor" :class="[isFullScreen ? 'editor--fullscreen' : '']">
		<MenuButtons :editor="editor" />
		<editor-content class="editor-code" :editor="editor" style="height: 100%" />
	</div>
</template>

<script setup>
import MenuButtons from "./component/menu-buttons/index.vue";
import { onBeforeUnmount, ref, provide, reactive, watch } from "vue";
import { useEditor, EditorContent } from "@tiptap/vue-3";

// 自定义插件
import CodeBlockLights from "./extensions/code-block-light";
import Iframe from "./extensions/iframe";
import Images from "./extensions/image";
import Video from "./extensions/video";
import CustomTableCell from "./extensions/table";
import Indent from "./extensions/indent";

import {
	// custom extension
	CustomOrderedList,
	CustomBulletList,
	FormatBrush,
	// tiptap extension
	Highlight,
	TiptapUnderline,
	StarterKit,
	TextAlign,
	Link,
	Table,
	TableHeader,
	TableRow,
	TextStyle,
	Color,
	lowlight
} from "../components/extensions/index.js";

const emit = defineEmits(["update:content", "update"]);
const props = defineProps(["events", "content"]);

const extensions = [
	Highlight.configure({
		multicolor: true
	}),
	TiptapUnderline,
	Indent,
	StarterKit.configure({
		orderedList: false,
		bulletList: false,
		// code: false,
		// paragraph: {
		// 	HTMLAttributes: {
		// 		class: "x-paragraph"
		// 	}
		// }
	}),
	,
	Images,
	Iframe,
	Color,
	TextStyle,
	CodeBlockLights.configure({ lowlight }),
	TextAlign.configure({
		types: ["heading", "paragraph"]
	}),
	Link.configure({
		openOnClick: true
	}),
	Table.configure({
		resizable: true
	}),
	TableRow,
	TableHeader,
	CustomTableCell,
	Video,
	FormatBrush,
	CustomOrderedList,
	CustomBulletList
];

const isFullScreen = ref(false);
const toggleFullscreen = () => {
	isFullScreen.value = !isFullScreen.value;
};
provide("isFullScreen", isFullScreen.value);
provide("toggleFullscreen", toggleFullscreen);

const onUpdate = ({ editor }) => {
	try {
		const output = editor.getHTML();
		emit("update:content", output);
		emit("update", output, editor);
	} catch (error) {
		console.log(error, "error");
	}
};
const editor = useEditor({
	content: props.content,
	extensions: extensions,
	autofocus: "end",
	onUpdate
});

watch(
	() => props.content,
	newValue => {
		const isSame = editor.value?.getHTML() === newValue;
		if (!isSame && editor.value) {
			editor.value.commands.setContent(newValue, false);
			editor.value.commands.focus();
		}
	},
	{
		immediate: true
	}
);

onBeforeUnmount(() => {
	editor.value?.destroy();
});
</script>
