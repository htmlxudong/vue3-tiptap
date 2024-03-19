<template>
	<div class="editor-tools">
		<HeaderButton v-model="title" />
		<ImageButton :editor="editor" />
		<VideoButton :editor="editor" />
		<PdfButton :editor="editor" />
		<TableButton :editor="editor" />
		<FontColor :editor="editor" />
		<BgColor :editor="editor" />
		<LinkButton :editor="editor" />
		<ToolButton :desserts="editorTools" :editor="editor" />

		<bubble-menu :editor="editor" :tippy-options="{ duration: 100 }" v-if="editor">
			<div class="bubble-menu_wrap" v-if="activeMenu === true">
				<HeaderButton v-model="title" />
				<FontColor :editor="editor" />
				<LinkButton :editor="editor" />
				<ToolButton :desserts="bubbleMenuTools" :editor="editor" />
			</div>
		</bubble-menu>
	</div>
</template>

<script>
import { BubbleMenu } from "@tiptap/vue-3";
import ToolButton from "./tool-button.vue";
import { getMarkRange, Editor } from "@tiptap/core";
import { TextSelection, AllSelection } from "@tiptap/pm/state";

import {
	MinusOutlined,
	StrikethroughOutlined,
	BoldOutlined,
	ItalicOutlined,
	AlignLeftOutlined,
	AlignRightOutlined,
	ExpandOutlined,
	AlignCenterOutlined,
	UnorderedListOutlined,
	DisconnectOutlined,
	LinkOutlined,
	ClearOutlined,
	MenuUnfoldOutlined,
	MenuFoldOutlined,
	OrderedListOutlined,
	UnderlineOutlined,
	UndoOutlined,
	RedoOutlined,
	BlockOutlined,
	CodeOutlined
} from "@ant-design/icons-vue";
import HeaderButton from "./header-button.vue";
import ImageButton from "./image-button.vue";
import VideoButton from "./video-button.vue";
import PdfButton from "./pdf-button.vue";
import TableButton from "./table-button.vue";
import LinkButton from "./link-button.vue";
import FontColor from "./font-color.vue";
import BgColor from "./bg-color.vue";

import { ref, reactive, defineComponent, inject, watch } from "vue";

export default defineComponent({
	name: "MenuButtons",
	props: {
		editor: {
			type: Editor,
			required: true
		}
	},
	setup(props, setupContext) {
		const activeMenu = ref(false);
		const title = ref(0);
		const isFullScreen = inject("isFullScreen");
		const toggleFullscreen = inject("toggleFullscreen");

		const bubbleMenuTools = reactive([
			{
				name: "bold",
				component: BoldOutlined,
				click() {
					props.editor.chain().focus().toggleBold().run();
				},
				tip: "粗体",
				active: false
			},
			{
				name: "strike",
				component: StrikethroughOutlined,
				click() {
					props.editor.chain().focus().toggleStrike().run();
				},
				tip: "删除线",
				active: false
			},
			{
				name: "ClearOutlined",
				component: ClearOutlined,
				tip: "清除格式",
				click() {
					props.editor.chain().focus().clearNodes().unsetAllMarks().run();
				},
				active: false
			}
		]);

		const editorTools = reactive([
			{
				name: "unsetlink",
				component: DisconnectOutlined,
				tip: "取消链接",
				click() {
					props.editor.chain().focus().extendMarkRange("link").unsetLink().run();
				},
				active: false
			},
			{
				name: "blockquote",
				component: BlockOutlined,
				click() {
					props.editor.chain().focus().toggleBlockquote().run();
				},
				tip: "引用",
				active: false
			},
			{
				name: "codeBlock",
				component: CodeOutlined,
				click() {
					props.editor.chain().focus().toggleCodeBlock().run();
				},
				tip: "代码块",
				active: false
			},

			{
				name: "underline",
				component: UnderlineOutlined,
				click() {
					props.editor.chain().focus().toggleUnderline().run();
				},
				tip: "下划线",
				active: false
			},
			{
				name: "italic",
				component: ItalicOutlined,
				tip: "斜体",
				click() {
					props.editor.chain().focus().toggleItalic().run();
				},
				active: false
			},
			{
				name: "left",
				component: AlignLeftOutlined,
				click() {
					props.editor.chain().focus().setTextAlign("left").run();
				},
				tip: "左对齐",
				active: false
			},
			{
				name: "center",
				component: AlignCenterOutlined,
				tip: "居中对齐",
				click() {
					props.editor.chain().focus().setTextAlign("center").run();
				},
				active: false
			},
			{
				name: "right",
				component: AlignRightOutlined,
				tip: "右对齐",
				click() {
					props.editor.chain().focus().setTextAlign("right").run();
				},
				active: false
			},
			{
				name: "bulletList",
				component: UnorderedListOutlined,
				tip: "无序列表",
				click() {
					props.editor.chain().focus().toggleBulletList().run();
				},
				active: false
			},
			{
				name: "orderedList",
				component: OrderedListOutlined,
				tip: "有序列表",
				click() {
					props.editor.chain().focus().toggleOrderedList().run();
				},
				active: false
			},
			{
				name: "MenuUnfoldOutlined",
				component: MenuUnfoldOutlined,
				tip: "缩进",
				click() {
					props.editor.chain().focus().indent().run();
				},
				active: false
			},
			{
				name: "MenuFoldOutlined",
				component: MenuFoldOutlined,
				tip: "取消缩进",
				click() {
					props.editor.chain().focus().outdent().run();
				},
				active: false
			},
			{
				name: "MinusOutlined",
				component: MinusOutlined,
				tip: "水平线",
				click() {
					props.editor.chain().focus().setHorizontalRule().run();
				},
				active: false
			},
			...bubbleMenuTools,
			{
				name: "UndoOutlined",
				component: UndoOutlined,
				tip: "撤销",
				click() {
					props.editor.chain().focus().undo().run();
				},
				active: false
			},
			{
				name: "RedoOutlined",
				component: RedoOutlined,
				tip: "重做",
				click() {
					props.editor.chain().focus().redo().run();
				},
				active: false
			},
			{
				name: "ExpandOutlined",
				component: ExpandOutlined,
				tip: "全屏",
				click: toggleFullscreen,
				active: false
			}
		]);

		return {
			bubbleMenuTools,
			title,
			editorTools,
			isFullScreen,
			activeMenu
		};
	},
	methods: {
		getCurrentMenuType() {
			if (
				this.editor.state.selection instanceof TextSelection ||
				this.editor.state.selection instanceof AllSelection
			) {
				return true;
			}
			return false;
		}
	},
	watch: {
		"editor.state.selection": function (selection) {
			this.activeMenu = this.getCurrentMenuType();
		},
		title(value) {
			if (value === 0) {
				this.editor.chain().focus().setParagraph().run();
			} else {
				this.editor.chain().focus().toggleHeading({ level: value }).run();
			}
		}
	},
	computed: {},
	components: {
		ToolButton,
		StrikethroughOutlined,
		BubbleMenu,
		HeaderButton,
		ImageButton,
		VideoButton,
		PdfButton,
		TableButton,
		BoldOutlined,
		ItalicOutlined,
		AlignLeftOutlined,
		AlignRightOutlined,
		ExpandOutlined,
		AlignCenterOutlined,
		UnorderedListOutlined,
		DisconnectOutlined,
		LinkOutlined,
		LinkButton,
		ClearOutlined,
		OrderedListOutlined,
		FontColor,
		BgColor
	}
});
</script>

<style lang="scss" scoped>
.bubble-menu_wrap {
	display: flex;
	border-radius: 3px;
	background-color: #fff;
	padding: 2px 5px;
	box-shadow: 0 0 3px rgba(0, 0, 0, 0.15);
}
</style>
