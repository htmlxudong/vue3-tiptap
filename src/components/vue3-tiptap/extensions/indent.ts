import { Extension } from "@tiptap/core";
import { createIndentCommand, IndentProps } from "@/utils/indent";

export interface IndentOptions {
	minIndent: number;
	maxIndent: number;
	types: ("paragraph" | "heading" | "blockquote")[];
}

declare module "@tiptap/core" {
	interface Commands<ReturnType> {
		indent: {
			indent: () => ReturnType;
			outdent: () => ReturnType;
		};
	}
}

const Indent = Extension.create<IndentOptions>({
	name: "indent",
	addOptions() {
		return {
			types: ["paragraph", "heading", "blockquote"],
			minIndent: IndentProps.min,
			maxIndent: IndentProps.max
		};
	},
	addGlobalAttributes() {
		return [
			{
				types: this.options.types,
				attributes: {
					indent: {
						default: 0,
						parseHTML: element => {
							const identAttr = element.getAttribute("data-indent");
							return (identAttr ? parseInt(identAttr, 10) : 0) || 0;
						},
						renderHTML: attributes => {
							if (!attributes.indent) {
								return {};
							}

							return { ["data-indent"]: attributes.indent };
						}
					}
				}
			}
		];
	},

	addCommands() {
		return {
			indent: () =>
				createIndentCommand({
					delta: IndentProps.more,
					types: this.options.types
				}),
			outdent: () =>
				createIndentCommand({
					delta: IndentProps.less,
					types: this.options.types
				})
		};
	},

	addKeyboardShortcuts() {
		return {
			Tab: () => this.editor.commands.indent(),
			"Shift-Tab": () => this.editor.commands.outdent()
		};
	}
});

export default Indent;
