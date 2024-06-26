<template>
	<div v-if="editor" class="editor" :class="[isFullScreen ? 'editor--fullscreen' : '']">
		<MenuButtons :editor="editor" />
		<editor-content class="editor-code" :editor="editor" />
	</div>
</template>

<script setup>
import MenuButtons from "./component/menu-buttons/index.vue";
import { onBeforeUnmount, ref, provide } from "vue";

import Highlight from "@tiptap/extension-highlight";
import TiptapUnderline from "@tiptap/extension-underline";
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import Table from "@tiptap/extension-table";
import TableHeader from "@tiptap/extension-table-header";
import { Color } from "@tiptap/extension-color";
import TableRow from "@tiptap/extension-table-row";
import TextStyle from "@tiptap/extension-text-style";
import { lowlight } from "lowlight";

import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";

lowlight.registerLanguage("html", html);
lowlight.registerLanguage("css", css);
lowlight.registerLanguage("js", js);
lowlight.registerLanguage("ts", ts);

// 自定义插件
import CodeBlockLights from "./extensions/code-block-light";
import Iframe from "./extensions/iframe";
import Images from "./extensions/image";
import Video from "./extensions/video";
import CustomTableCell from "./extensions/table";
import Indent from "./extensions/indent";

const isFullScreen = ref(false);
const toggleFullscreen = () => {
	isFullScreen.value = !isFullScreen.value;
};
provide("isFullScreen", isFullScreen.value);
provide("toggleFullscreen", toggleFullscreen);

const valueHtml = ref("<p>I’m running Tiptap with Vue.js. 🎉</p>");
const editor = useEditor({
	content: valueHtml.value,
	extensions: [
		Highlight.configure({
			multicolor: true
		}),
		TiptapUnderline,
		Indent,
		StarterKit,
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
		Video
	],
	autofocus: "end"
});

onBeforeUnmount(() => {
	editor.value?.destroy();
});
</script>
