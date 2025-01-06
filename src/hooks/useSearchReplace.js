import { ref, watch } from "vue";
import { Plugin, PluginKey } from "@tiptap/pm/state";
import { Decoration, DecorationSet } from "@tiptap/pm/view";
import { findTextInNode } from "../utils/text-search";

const SEARCH_HIGHLIGHT_CLASS = "search-highlight";
const CURRENT_MATCH_CLASS = "current";

export function useSearchReplace(editorRef) {
	const searchTerm = ref("");
	const replaceTerm = ref("");
	const currentMatchIndex = ref(0);
	const totalMatches = ref(0);
	const decorationSet = ref();

	const searchPlugin = new Plugin({
		key: new PluginKey("search-highlight"),
		state: {
			init() {
				return DecorationSet.empty;
			},
			apply(tr, oldState) {
				return decorationSet.value || oldState;
			}
		},
		props: {
			decorations(state) {
				return decorationSet.value;
			}
		}
	});

	watch(
		() => editorRef.value,
		editor => {
			if (editor) {
				editor.registerPlugin(searchPlugin);
			}
		},
		{ immediate: true }
	);

	function updateDecorations(matches) {
		if (!editorRef.value) return;

		const decorations = matches.map((match, index) => {
			return Decoration.inline(match.from, match.to, {
				class: `${SEARCH_HIGHLIGHT_CLASS} ${index === currentMatchIndex.value ? CURRENT_MATCH_CLASS : ""}`
			});
		});

		decorationSet.value = DecorationSet.create(editorRef.value.state.doc, decorations);
		editorRef.value.view.dispatch(editorRef.value.state.tr);
	}
	
	function performSearch() {
		if (!editorRef.value || !searchTerm.value) {
			clearSearch();
			return;
		}

		const matches = findTextInNode(editorRef.value.state.doc, searchTerm.value);
		totalMatches.value = matches.length;
		currentMatchIndex.value = matches.length > 0 ? 0 : -1;
		updateDecorations(matches);

		// Scroll current match into view
		if (matches.length > 0) {
			const currentMatch = matches[currentMatchIndex.value];
			const domNode = editorRef.value.view.domAtPos(currentMatch.from).node;
			domNode.scrollIntoView({ behavior: "smooth", block: "center" });
		}
	}

	function clearSearch() {
		searchTerm.value = "";
		replaceTerm.value = "";
		currentMatchIndex.value = -1;
		totalMatches.value = 0;
		decorationSet.value = DecorationSet.empty;
		if (editorRef.value) {
			editorRef.value.view.dispatch(editorRef.value.state.tr);
		}
	}

	function findNext() {
		if (currentMatchIndex.value < totalMatches.value - 1) {
			currentMatchIndex.value++;
			const matches = findTextInNode(editorRef.value.state.doc, searchTerm.value);
			updateDecorations(matches);

			// Scroll to next match
			const currentMatch = matches[currentMatchIndex.value];
			const domNode = editorRef.value.view.domAtPos(currentMatch.from).node;
			domNode.scrollIntoView({ behavior: "smooth", block: "center" });
		}
	}

	function findPrevious() {
		if (currentMatchIndex.value > 0) {
			currentMatchIndex.value--;
			const matches = findTextInNode(editorRef.value.state.doc, searchTerm.value);
			updateDecorations(matches);

			// Scroll to previous match
			const currentMatch = matches[currentMatchIndex.value];
			const domNode = editorRef.value.view.domAtPos(currentMatch.from).node;
			domNode.scrollIntoView({ behavior: "smooth", block: "center" });
		}
	}
	
	function replaceNext() {
		if (!editorRef.value || !searchTerm.value) return;

		const matches = findTextInNode(editorRef.value.state.doc, searchTerm.value);
		if (matches.length === 0) return;

		const match = matches[currentMatchIndex.value];
		const { tr } = editorRef.value.state;

		tr.replaceWith(match.from, match.to, editorRef.value.state.schema.text(replaceTerm.value));
		editorRef.value.view.dispatch(tr);

		// Re-run search after replacement
		setTimeout(performSearch, 0);
	}

	function replaceAll() {
		if (!editorRef.value || !searchTerm.value) return;

		const matches = findTextInNode(editorRef.value.state.doc, searchTerm.value);
		if (matches.length === 0) return;

		const { tr } = editorRef.value.state;

		// Replace from last to first to maintain correct positions
		for (let i = matches.length - 1; i >= 0; i--) {
			const match = matches[i];
			tr.replaceWith(match.from, match.to, editorRef.value.state.schema.text(replaceTerm.value));
		}

		editorRef.value.view.dispatch(tr);

		// Clear search after replacing all
		setTimeout(clearSearch, 0);
	}

	// Debounced search on input
	let searchTimeout;
	watch(searchTerm, () => {
		clearTimeout(searchTimeout);
		searchTimeout = setTimeout(performSearch, 300);
	});

	return {
		searchTerm,
		replaceTerm,
		currentMatchIndex,
		totalMatches,
		findNext,
		findPrevious,
		replaceNext,
		replaceAll,
		performSearch,
		clearSearch
	};
}
