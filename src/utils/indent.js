import { clamp } from "@/utils/index";
import { TextSelection, AllSelection } from "@tiptap/pm/state";
import { isList } from "@tiptap/core";

export const IndentProps = {
	max: 7,
	min: 0,
	more: 1,
	less: -1
};

export function createIndentCommand({ delta, types }) {
	return ({ state, dispatch, editor }) => {
		const { selection } = state;
		let { tr } = state;
		tr = tr.setSelection(selection);
		tr = updateIndentLevel(tr, delta, types, editor);

		if (tr.docChanged) {
			dispatch && dispatch(tr);
			return true;
		}

		return false;
	};
}

function updateIndentLevel(tr, delta, types, editor) {
	const { doc, selection } = tr;

	if (!doc || !selection) return tr;

	if (!(selection instanceof TextSelection || selection instanceof AllSelection)) {
		return tr;
	}

	const { from, to } = selection;

	doc.nodesBetween(from, to, (node, pos) => {
		const nodeType = node.type;

		if (types.includes(nodeType.name)) {
			tr = setNodeIndentMarkup(tr, pos, delta);
			return false;
		} else if (isList(node.type.name, editor.extensionManager.extensions)) {
			return false;
		}
		return true;
	});

	return tr;
}

function setNodeIndentMarkup(tr, pos, delta) {
	if (!tr.doc) return tr;

	const node = tr.doc.nodeAt(pos);
	if (!node) return tr;

	const minIndent = IndentProps.min;
	const maxIndent = IndentProps.max;

	const indent = clamp((node.attrs.indent || 0) + delta, minIndent, maxIndent);

	if (indent === node.attrs.indent) return tr;

	const nodeAttrs = {
		...node.attrs,
		indent
	};

	return tr.setNodeMarkup(pos, node.type, nodeAttrs, node.marks);
}
