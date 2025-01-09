<template>
	<div class="editor-tools">
		<!-- 撤销 -->
		<ButtonTemplate :editor="editor" :option="undo" />
		<!-- 重做 -->
		<ButtonTemplate :editor="editor" :option="redo" />
		<!-- 格式刷 -->
		<ButtonTemplate :editor="editor" :option="clearFormat" />
		<!-- 清除格式 -->
		<FormatBrush :editor="editor" />
		<ButtonTemplate :editor="editor" :option="indent" />
		<ButtonTemplate :editor="editor" :option="outdent" />
		<Dvider />

		<HeaderButton :editor="editor" />
		<ButtonTemplate :editor="editor" :option="bold" />
		<!-- 字体 -->
		<FontFamily :editor="editor" />
		<FontColor :editor="editor" />
		<BgColor :editor="editor" />
		<ButtonTemplate :editor="editor" :option="alignLeft" />
		<ButtonTemplate :editor="editor" :option="alignCenter" />
		<ButtonTemplate :editor="editor" :option="alignRight" />
		<ButtonTemplate :editor="editor" :option="horizontal" />
		<ButtonTemplate :editor="editor" :option="strike" />
		<ButtonTemplate :editor="editor" :option="underline" />
		<ButtonTemplate :editor="editor" :option="italic" />
		<Dvider />
		<ImageButton :editor="editor" />
		<VideoButton :editor="editor" />
		<PdfButton :editor="editor" />
		<TableButton :editor="editor" />

		<!-- 有序列表 -->
		<OrderedList :editor="editor" />
		<!-- 无序列表 -->
		<BulletList :editor="editor" />
		<LinkButton :editor="editor" />
		<ToolButton :desserts="editorTools" :editor="editor" />

		<!-- 查找和替换 -->
		<FindReplace :editor="editor" />
		<!-- <bubble-menu :editor="editor" :tippy-options="{ duration: 100 }" v-if="editor">
			<div class="bubble-menu_wrap" v-if="activeMenu === true">
				<HeaderButton v-model="title" />
				<FontColor :editor="editor" />
				<LinkButton :editor="editor" />
				<ToolButton :desserts="bubbleMenuTools" :editor="editor" />
			</div>
		</bubble-menu> -->
	</div>
</template>

<script>
import { BubbleMenu } from "@tiptap/vue-3";
import ToolButton from "./tool-button.vue";
import ButtonTemplate from "./button-template.vue";
import FormatBrush from "./format-brush.vue";
import { Editor } from "@tiptap/core";
import { TextSelection, AllSelection } from "@tiptap/pm/state";
import { ref, reactive, defineComponent, inject, watch } from "vue";

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
import TableButton from "./table/table-button.vue";
import LinkButton from "./link-button.vue";
import FontColor from "./text/font-color.vue";
import BgColor from "./text/bg-color.vue";
import FindReplace from "./find-replace/find-replace.vue";
import Dvider from "../dvider.vue";
import OrderedList from "./ordered-list.vue";
import BulletList from "./bullet-List.vue";
import FontFamily from "./text/font-family.vue";

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
		const isFullScreen = inject("isFullScreen");
		const toggleFullscreen = inject("toggleFullscreen");

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
				name: "ExpandOutlined",
				component: ExpandOutlined,
				tip: "全屏",
				click: toggleFullscreen,
				active: false
			}
		]);

		const undo = {
			name: "UndoOutlined",
			component: UndoOutlined,
			tip: "撤销",
			click() {
				props.editor.chain().focus().undo().run();
			},
			active: false
		};
		const redo = {
			name: "RedoOutlined",
			component: RedoOutlined,
			tip: "重做",
			click() {
				props.editor.chain().focus().redo().run();
			},
			active: false
		};

		const clearFormat = {
			name: "ClearOutlined",
			component: ClearOutlined,
			tip: "清除格式",
			click() {
				props.editor.chain().focus().clearNodes().unsetAllMarks().run();
			},
			active: false
		};

		const bold = {
			name: "bold",
			component: BoldOutlined,
			click() {
				props.editor.chain().focus().toggleBold().run();
			},
			tip: "粗体",
			active: false
		};

		const alignCenter = {
			name: "center",
			component: AlignCenterOutlined,
			tip: "居中对齐",
			click() {
				props.editor.chain().focus().setTextAlign("center").run();
			},
			active: false
		};

		const alignLeft = {
			name: "left",
			component: AlignLeftOutlined,
			click() {
				props.editor.chain().focus().setTextAlign("left").run();
			},
			tip: "左对齐",
			active: false
		};
		const alignRight = {
			name: "right",
			component: AlignRightOutlined,
			tip: "右对齐",
			click() {
				props.editor.chain().focus().setTextAlign("right").run();
			},
			active: false
		};
		const horizontal = {
			name: "MinusOutlined",
			component: MinusOutlined,
			tip: "水平线",
			click() {
				props.editor.chain().focus().setHorizontalRule().run();
			},
			active: false
		};
		const strike = {
			name: "strike",
			component: StrikethroughOutlined,
			click() {
				props.editor.chain().focus().toggleStrike().run();
			},
			tip: "删除线",
			active: false
		};
		const underline = {
			name: "underline",
			component: UnderlineOutlined,
			click() {
				props.editor.chain().focus().toggleUnderline().run();
			},
			tip: "下划线",
			active: false
		};

		const italic = {
			name: "italic",
			component: ItalicOutlined,
			tip: "斜体",
			click() {
				props.editor.chain().focus().toggleItalic().run();
			},
			active: false
		};

		const indent = {
			name: "MenuUnfoldOutlined",
			component: MenuUnfoldOutlined,
			tip: "缩进",
			click() {
				props.editor.chain().focus().indent().run();
			},
			active: false
		};

		const outdent = {
			name: "MenuFoldOutlined",
			component: MenuFoldOutlined,
			tip: "取消缩进",
			click() {
				props.editor.chain().focus().outdent().run();
			},
			active: false
		};

		return {
			editorTools,
			isFullScreen,
			activeMenu,
			undo,
			redo,
			clearFormat,
			bold,
			alignLeft,
			alignCenter,
			alignRight,
			horizontal,
			strike,
			underline,
			italic,
			indent,
			outdent
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
		BgColor,
		ButtonTemplate,
		FormatBrush,
		FindReplace,
		Dvider,
		OrderedList,
		BulletList,
		FontFamily
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
