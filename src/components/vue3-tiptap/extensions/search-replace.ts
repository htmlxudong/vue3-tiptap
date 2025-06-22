import { Extension } from "@tiptap/core";
import { Plugin, PluginKey, EditorState, Transaction } from "@tiptap/pm/state";
import { Decoration, DecorationSet } from "@tiptap/pm/view";
import emitter from "@/utils/EventEmitter";

declare module "@tiptap/core" {
	interface Commands<ReturnType> {
		search: {
			search: (query: string) => ReturnType;
			findNext: () => ReturnType;
			findPrev: () => ReturnType;
			replace: (replacement: string) => ReturnType;
			replaceAll: (replacement: string) => ReturnType;
			clearSearch: () => ReturnType;
		};
	}
}

interface SearchState {
	query: string | null;
	results: { from: number; to: number }[];
	currentIndex: number | null;
	decorationSet: DecorationSet;
}

const searchPluginKey = new PluginKey("search");

function escapeRegex(string: string): string {
	return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function findResults(doc: any, query: string): { from: number; to: number }[] {
	if (!query) {
		return [];
	}
	const results: { from: number; to: number }[] = [];
	const regex = new RegExp(escapeRegex(query), "gi");

	doc.descendants((node: any, pos: number) => {
		if (!node.isText) {
			return;
		}

		let match;
		while ((match = regex.exec(node.text)) !== null) {
			results.push({
				from: pos + match.index,
				to: pos + match.index + match[0].length
			});
		}
	});

	return results;
}

function createDecorations(
	doc: any,
	results: { from: number; to: number }[],
	currentIndex: number | null,
	searchClass: string,
	searchActiveClass: string
): DecorationSet {
	if (!results.length) {
		return DecorationSet.empty;
	}
	const decorations = results.map((r, i) =>
		Decoration.inline(r.from, r.to, {
			class: `${searchClass} ${i === currentIndex ? searchActiveClass : ""}`
		})
	);

	return DecorationSet.create(doc, decorations);
}

const SearchAndReplace = Extension.create({
	name: "search",

	addOptions() {
		return {
			searchClass: "search-highlight",
			searchActiveClass: "search-highlight-active"
		};
	},

	addProseMirrorPlugins() {
		const self = this;

		return [
			new Plugin({
				key: searchPluginKey,
				state: {
					init(): SearchState {
						return {
							query: null,
							results: [],
							currentIndex: null,
							decorationSet: DecorationSet.empty
						};
					},
					apply(tr: Transaction, oldState: SearchState): SearchState {
						const meta = tr.getMeta(searchPluginKey);

						if (!meta) {
							if (tr.docChanged && oldState.query) {
								const results = findResults(tr.doc, oldState.query);
								const decorationSet = createDecorations(
									tr.doc,
									results,
									oldState.currentIndex,
									self.options.searchClass,
									self.options.searchActiveClass
								);

								emitter.emit("search", {
									activeIndex: oldState.currentIndex,
									decorations: results
								});

								return { ...oldState, results, decorationSet };
							}
							return oldState;
						}

						const newState: SearchState = { ...oldState, ...meta };

						if (meta.query !== undefined || meta.results !== undefined || meta.currentIndex !== undefined) {
							const results = meta.results === undefined ? oldState.results : meta.results;
							const query = meta.query === undefined ? oldState.query : meta.query;
							const currentIndex = meta.currentIndex === undefined ? oldState.currentIndex : meta.currentIndex;

							if (query) {
								newState.decorationSet = createDecorations(
									tr.doc,
									results,
									currentIndex,
									self.options.searchClass,
									self.options.searchActiveClass
								);
							} else {
								newState.decorationSet = DecorationSet.empty;
							}
						}

						return newState;
					}
				},
				props: {
					decorations(state: EditorState) {
						const pluginState = searchPluginKey.getState(state);
						return pluginState ? pluginState.decorationSet : DecorationSet.empty;
					}
				}
			})
		];
	},

	addCommands() {
		return {
			search:
				(query: string) =>
				({ tr, dispatch }) => {
					if (!query) {
						if (dispatch) {
							tr.setMeta(searchPluginKey, {
								query: null,
								results: [],
								currentIndex: null
							});
							emitter.emit("search", {
								activeIndex: -1,
								decorations: []
							});
						}
						return true;
					}

					const results = findResults(tr.doc, query);
					if (dispatch) {
						tr.setMeta(searchPluginKey, {
							query,
							results,
							currentIndex: results.length ? 0 : null
						});

						emitter.emit("search", {
							activeIndex: results.length ? 0 : -1,
							decorations: results
						});
					}
					return true;
				},
			clearSearch:
				() =>
				({ tr, dispatch }) => {
					if (dispatch) {
						tr.setMeta(searchPluginKey, {
							query: null,
							results: [],
							currentIndex: null
						});
						emitter.emit("search", {
							activeIndex: -1,
							decorations: []
						});
					}
					return true;
				},
			findNext:
				() =>
				({ tr, dispatch, state }) => {
					const searchState = searchPluginKey.getState(state);
					if (!searchState || !searchState.results.length) return false;

					const currentIndex = searchState.currentIndex ?? -1;
					const nextIndex = (currentIndex + 1) % searchState.results.length;

					if (dispatch) {
						tr.setMeta(searchPluginKey, { currentIndex: nextIndex });
						emitter.emit("search", {
							activeIndex: nextIndex,
							decorations: searchState.results
						});
					}
					return true;
				},
			findPrev:
				() =>
				({ tr, dispatch, state }) => {
					const searchState = searchPluginKey.getState(state);
					if (!searchState || !searchState.results.length) return false;

					const currentIndex = searchState.currentIndex ?? 0;
					const prevIndex = (currentIndex - 1 + searchState.results.length) % searchState.results.length;

					if (dispatch) {
						tr.setMeta(searchPluginKey, { currentIndex: prevIndex });
						emitter.emit("search", {
							activeIndex: prevIndex,
							decorations: searchState.results
						});
					}
					return true;
				},
			replace:
				(replacement: string) =>
				({ tr, dispatch, state, editor }) => {
					const searchState = searchPluginKey.getState(state);
					if (!searchState || searchState.currentIndex === null || !searchState.results.length) return false;

					const { from, to } = searchState.results[searchState.currentIndex];

					if (dispatch) {
						tr.replaceWith(from, to, editor.schema.text(replacement));

						const newResults = findResults(tr.doc, searchState.query!);
						const newCurrentIndex = searchState.currentIndex < newResults.length ? searchState.currentIndex : newResults.length > 0 ? newResults.length - 1 : null;

						tr.setMeta(searchPluginKey, {
							results: newResults,
							currentIndex: newCurrentIndex
						});
						emitter.emit("search", {
							activeIndex: newCurrentIndex,
							decorations: newResults
						});
					}
					return true;
				},
			replaceAll:
				(replacement: string) =>
				({ tr, dispatch, state, editor }) => {
					const searchState = searchPluginKey.getState(state);
					if (!searchState || !searchState.results.length) return false;

					if (dispatch) {
						[...searchState.results].reverse().forEach(({ from, to }) => {
							tr.replaceWith(from, to, editor.schema.text(replacement));
						});

						tr.setMeta(searchPluginKey, {
							query: null,
							results: [],
							currentIndex: null
						});
						emitter.emit("search", {
							activeIndex: -1,
							decorations: []
						});
					}
					return true;
				}
		};
	}
});

export default SearchAndReplace;