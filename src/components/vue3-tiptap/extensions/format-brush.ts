import { Extension } from "@tiptap/core";
import { Plugin, PluginKey } from "@tiptap/pm/state";
import type { EditorState, Transaction } from "@tiptap/pm/state";
import type { Mark } from "@tiptap/pm/model";
import type { Editor } from "@tiptap/core";

interface FormatBrushOptions {
	lastSelectionMarks: Mark[] | null;
}

interface FormatBrushStorage {
	isDoubleClick: boolean;
	isBrushActive: boolean;
	formatBrushPluginKey: PluginKey;
}

interface CopyFormatOptions {
	type: "click" | "dblclick";
}

declare module "@tiptap/core" {
	interface Commands<ReturnType> {
		formatBrush: {
			copyFormat: (data: CopyFormatOptions) => ReturnType;
		};
	}
}

// 提取选区内的所有文本格式（marks）
function getSelectedTextStyle(state: EditorState): Mark[] {
	const { selection } = state;
	const { from, to } = selection;

	const marks: Mark[] = [];

	state.doc.nodesBetween(from, to, (node, pos) => {
		if (node.isText) {
			node.marks.forEach(mark => {
				if (!marks.includes(mark)) {
					marks.push(mark);
				}
			});
		}
	});

	return marks;
}

// 将存储的格式应用到当前选区
function applyFormatToSelection(state: EditorState, dispatch: (tr: Transaction) => void, lastSelectionMarks: Mark[] | null): boolean {
	if (!lastSelectionMarks || lastSelectionMarks.length === 0) {
		return false;
	}
	const { from, to } = state.selection;

	const tr = state.tr;

	lastSelectionMarks.forEach((mark: Mark) => {
		tr.addMark(from, to, mark);
	});

	if (tr.docChanged) {
		dispatch(tr);
	}

	return true;
}

const FormatBrush = Extension.create<FormatBrushOptions, FormatBrushStorage>({
	name: "formatBrush",
	
	addOptions() {
		return {
			lastSelectionMarks: null // 存储最后一次选中格式信息
		};
	},
	
	addStorage() {
		return {
			isDoubleClick: false, // 双击状态
			isBrushActive: false, // 格式刷模式是否激活
			formatBrushPluginKey: new PluginKey("formatBrush")
		};
	},

	// 监听选区更新，如果格式刷激活则应用格式
	onSelectionUpdate() {
		const { state } = this.editor;
		// 如果上次有选区格式，应用到当前选区
		if (this.options.lastSelectionMarks && this.storage.isBrushActive) {
			applyFormatToSelection(state, this.editor.view.dispatch, this.options.lastSelectionMarks);
		}
	},

	addCommands() {
		return {
			copyFormat: (options: CopyFormatOptions) => ({ state }) => {
				const tiptap = document.querySelector(".tiptap");
				
				// 如果格式刷已经激活，则取消激活状态
				if (this.storage.isBrushActive) {
					this.storage.isBrushActive = false;
					this.storage.isDoubleClick = false;
					this.options.lastSelectionMarks = null;
					tiptap?.classList.remove("tiptap__brush");
					return true;
				}

				// 激活格式刷
				tiptap?.classList.add("tiptap__brush");
				this.storage.isBrushActive = true;
				
				// 设置双击状态
				if (options.type === "dblclick") {
					this.storage.isDoubleClick = true;
				}

				// 复制当前选区的格式
				const { selection } = state;
				if (!selection.empty) {
					const marks = getSelectedTextStyle(state);
					this.options.lastSelectionMarks = marks;
				}

				return true;
			}
		};
	},

	// 监听键盘事件以退出格式刷
	addKeyboardShortcuts() {
		return {
			Escape: () => {
				this.storage.isBrushActive = false;
				this.storage.isDoubleClick = false;
				this.options.lastSelectionMarks = null;
				const tiptap = document.querySelector(".tiptap");
				tiptap?.classList.remove("tiptap__brush");
				return true;
			}
		};
	},

	addProseMirrorPlugins() {
		const pluginKey = this.storage.formatBrushPluginKey;
		
		const formatBrushPlugin = new Plugin({
			key: pluginKey,
			props: {
				handleDOMEvents: {
					mouseup: () => {
						// 如果不是双击模式，在鼠标抬起时取消格式刷状态
						if (!this.storage.isDoubleClick && this.storage.isBrushActive) {
							this.storage.isBrushActive = false;
							this.options.lastSelectionMarks = null;
							const tiptap = document.querySelector(".tiptap");
							tiptap?.classList.remove("tiptap__brush");
						}
						return true;
					}
				}
			}
		});
		
		return [formatBrushPlugin];
	}
});

export default FormatBrush;
