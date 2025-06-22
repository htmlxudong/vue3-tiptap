import { Extension, Editor } from "@tiptap/core";
import { Plugin, PluginKey } from "@tiptap/pm/state";
import type { Transaction } from "@tiptap/pm/state";
import { Decoration, DecorationSet } from "@tiptap/pm/view";
import emitter from "@/utils/EventEmitter";
import { Node } from "@tiptap/pm/model";

const SEARCH_HIGHLIGHT_CLASS = "search-highlight";
const CURRENT_MATCH_CLASS = "search-highlight-current";

function findMatches(doc: Node, query: string, activeIndex: number) {
	const decorations: Decoration[] = [];
	const regex = new RegExp(query, "gi");

	doc.descendants((node: Node, pos) => {
		if (!node.isText || !node.text) return;
		const text = node.text as string;
		let match;

		while ((match = regex.exec(text)) !== null) {
			const from = pos + match.index;
			const to = from + match[0].length;
			const decoration = Decoration.inline(from, to, {
				class: decorations.length === activeIndex ? CURRENT_MATCH_CLASS : SEARCH_HIGHLIGHT_CLASS
			});
			if (decoration) {
				decorations.push(decoration);
			}
		}
	});
	return decorations;
}

const searchPluginKey = new PluginKey<{ decorationSet: DecorationSet }>("search");
let searchPlugin: Plugin = new Plugin({
	state: {
		init() {
			return {
				decorationSet: DecorationSet.empty
			};
		},
		apply(tr: Transaction, state) {
			const searchMeta = tr.getMeta(searchPluginKey);
			if (searchMeta) {
				return {
					decorationSet: DecorationSet.create(tr.doc, searchMeta.decorations)
				};
			}
			// 如果文档改变，更新现有装饰的位置
			return {
				decorationSet: state.decorationSet.map(tr.mapping, tr.doc)
			};
		}
	},
	props: {
		decorations(state) {
			return searchPlugin.getState(state).decorationSet;
		}
	}
});

declare module "@tiptap/core" {
	interface Commands<ReturnType> {
		searchreplace: {
			search: (data: string) => ReturnType;
			findNext: () => ReturnType;
			findPrev: () => ReturnType;
			clearSearch: () => ReturnType;
			replace: () => ReturnType;
			replaceAll: () => ReturnType;
		};
	}
}

interface SearchReplaceOptions {
	activeIndex: number;
	decorations: Decoration[];
	currentQuery: string;
}

const searchReplace = Extension.create<SearchReplaceOptions>({
	name: "searchreplace",

	addOptions() {
		return {
			activeIndex: 0,
			decorations: [],
			currentQuery: ""
		};
	},

	/**
	 * @param {string} dispatch -如果调度已通过，请执行它们的效果，可能通过将事务传递给调度
	 * @returns
	 */
	//@ts-ignore
	addCommands() {
		return {
			search:
				(query: string) =>
				({ dispatch, tr }) => {
					if (!query.trim()) return false;
					this.options.currentQuery = query;
					if (dispatch) {
						try {
							const decorations = findMatches(tr.doc, query, this.options.activeIndex);
							this.options.decorations = decorations.map(item => item);
							emitter.emit("search", this.options);
							tr.setMeta(searchPluginKey, { decorations });
						} catch (error) {
							console.error("[@warn/search-replace] Search error:", error);
						}
					}
					return true;
				},
			findNext:
				() =>
				({ dispatch }) => {
					if (dispatch) {
						this.options.activeIndex =
							this.options.activeIndex < this.options.decorations.length - 1
								? this.options.activeIndex + 1
								: this.options.decorations.length - 1;
					}
					return true;
				},
			findPrev:
				() =>
				({ dispatch }) => {
					if (dispatch) {
						this.options.activeIndex =
							this.options.activeIndex - 1 <= 0 ? 0 : this.options.activeIndex - 1;
					}
					return true;
				},
			clearSearch:
				() =>
				({ dispatch, tr }) => {
					if (dispatch) {
						this.options.activeIndex = 0;
						this.options.decorations = [];
						tr.setMeta(searchPluginKey, { decorations: [] });
					}
					return true;
				},
			replace:
				(replaceText: string) =>
				({
					dispatch,
					tr,
					editor
				}: {
					dispatch?: (tr: Transaction) => void;
					tr: Transaction;
					editor: Editor;
				}) => {
					if (!replaceText.trim()) return false;
					const query = this.options.currentQuery;
					const decorations = findMatches(tr.doc, query, this.options.activeIndex);
					if (dispatch && decorations.length > 0) {
						const currentDeco = decorations[this.options.activeIndex];
						if (currentDeco) {
							// 替换当前匹配项
							tr.replaceWith(currentDeco.from, currentDeco.to, editor.schema.text(replaceText));
							this.options.decorations = decorations.map(item => item);
							tr.setMeta(searchPluginKey, { decorations });
							emitter.emit("search", this.options);
						}
						if (this.options.activeIndex === decorations.length - 1) {
							this.options.activeIndex = 0;
						}
					}

					return true;
				},
			replaceAll:
				(replaceText: string) =>
				({
					dispatch,
					tr,
					editor
				}: {
					dispatch?: (tr: Transaction) => void;
					tr: Transaction;
					editor: Editor;
				}) => {
					if (!replaceText.trim()) return false;
					if (dispatch && this.options.decorations.length > 0) {
						// 从后往前替换，避免位置偏移
						[...this.options.decorations]
							.sort((a, b) => b.from - a.from)
							.forEach(deco => {
								tr.replaceWith(deco.from, deco.to, editor.schema.text(replaceText));
							});

						// 清空搜索状态
						this.options.activeIndex = 0;
						this.options.decorations = [];
						tr.setMeta(searchPluginKey, { decorations: [] });
						emitter.emit("search", this.options);
					}
					return true;
				}
		};
	},
	addProseMirrorPlugins() {
		return [searchPlugin];
	},
	// 富文本编辑器内容变化
	//@ts-ignore
	onUpdate({ editor }: { editor: Editor }) {
		const { currentQuery, activeIndex } = this.options;
		if (currentQuery) {
			const decorations = findMatches(editor.state.doc, currentQuery, activeIndex);
			this.options.decorations = decorations;
			if (this.options.activeIndex > this.options.decorations.length - 1)
				this.options.activeIndex = this.options.decorations.length - 1;
			const tr = editor.state.tr;
			tr.setMeta(searchPluginKey, { decorations });
			editor.view.dispatch(tr);
			emitter.emit("search", this.options);
		}
	}
});

export default searchReplace;
