import { Extension } from "@tiptap/core";
import { Plugin } from "@tiptap/pm/state";
import type { EditorState, Transaction } from "@tiptap/pm/state";
import type { Mark } from "@tiptap/pm/model";
import type { Editor } from "@tiptap/core";

interface FormatBrushOptions {
	lastSelectionMarks: Mark[] | null;
}
interface FormatBrushStorage {
	isDoubleClick: boolean;
	isBrushActive: boolean;
}

interface CopyFormatOptions {
	type: "click" | "dblclick";
}

declare module "@tiptap/core" {
	interface Commands<ReturnType> {
		formatBrush: {
			copyFormat: (data: any) => ReturnType;
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
function applyFormatToSelection(state: EditorState, dispatch: (tr: Transaction) => void): boolean {
	const { lastSelectionMarks } = FormatBrush.options;
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
			isBrushActive: false // 格式刷模式是否激活
		};
	},
	//@ts-ignore
	onSelectionUpdate({ editor }: { editor: Editor }) {
		const { state } = editor;
		// 如果上次有选区格式，应用到当前选区
		if (this.options.lastSelectionMarks && this.storage.isBrushActive) {
			applyFormatToSelection(state, editor.view.dispatch);
		}
	},

	addCommands() {
		return {
			copyFormat:
				(options: CopyFormatOptions) =>
				({ state }) => {
					const tiptap = document.querySelector(".tiptap");
					tiptap?.classList.add("tiptap__brush");
					this.options.lastSelectionMarks = null;
					if (options.type === "dblclick") {
						this.storage.isDoubleClick = true;
					}
					this.storage.isBrushActive = true;
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
				const tiptap = document.querySelector(".tiptap");
				tiptap?.classList.remove("tiptap__brush");
				return true;
			}
		};
	},
	addProseMirrorPlugins() {
		return [
			new Plugin({
				props: {
					handleDOMEvents: {
						mouseup: () => {
							if (!this.storage.isDoubleClick) {
								this.storage.isBrushActive = false;
								const tiptap = document.querySelector(".tiptap");
								tiptap?.classList.remove("tiptap__brush");
							}
							return true;
						}
					}
				}
			})
		];
	}
});

export default FormatBrush;
