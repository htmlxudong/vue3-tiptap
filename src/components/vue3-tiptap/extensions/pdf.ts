import { Node, mergeAttributes } from "@tiptap/core";
import { VueNodeViewRenderer } from "@tiptap/vue-3";
import PdfView from "../extension-view/pdf-view.vue";

interface PdfOptions {
	HTMLAttributes?: Record<string, any>;
}

interface PdfAttributes {
	src: string | null;
	fileName?: string;
}

declare module "@tiptap/core" {
	interface Commands<ReturnType> {
		pdf: {
			setPdf: (data: any) => ReturnType;
		};
	}
}

const Pdf = Node.create<PdfOptions>({
	name: "pdf",

	// schema
	group: "block",
	selectable: false,
	draggable: true,

	addAttributes() {
		return {
			...this.parent?.(),
			src: {
				default: null,
				parseHTML: element => {
					const src = element.getAttribute("src") || element.getAttribute("data");
					return src;
				}
			},
			fileName: {
				default: null,
				parseHTML: element => {
					return element.getAttribute("data-filename");
				}
			}
		};
	},

	parseHTML() {
		return [
			{
				tag: "div[data-type='pdf']"
			}
		];
	},

	renderHTML({ HTMLAttributes }) {
		return [
			"div",
			mergeAttributes(HTMLAttributes, {
				"data-type": "pdf"
			})
		];
	},

	addCommands() {
		return {
			setPdf:
				(options: PdfAttributes) =>
				({ commands }) => {
					return commands.insertContent({
						type: this.name,
						attrs: options
					});
				}
		};
	},

	addNodeView() {
		return VueNodeViewRenderer(PdfView);
	}
});

export default Pdf; 