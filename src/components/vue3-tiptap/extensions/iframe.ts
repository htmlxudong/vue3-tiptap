import { Node, mergeAttributes } from "@tiptap/core";
import { VueNodeViewRenderer } from "@tiptap/vue-3";
import IframeView from "@/components/vue3-tiptap/extension-view/iframe-view.vue";

interface IframeOptions {
	HTMLAttributes?: Record<string, any>;
}

interface IframeAttributes {
	src: string | null;
}

declare module "@tiptap/core" {
	interface Commands<ReturnType> {
		iframe: {
			setIframe: (data: any) => ReturnType;
		};
	}
}

const Iframe = Node.create<IframeOptions>({
	name: "iframe",

	// schema
	group: "block",
	selectable: false,

	addAttributes() {
		return {
			...this.parent?.(),
			src: {
				default: null,
				parseHTML: element => {
					const src = element.getAttribute("src");
					return src;
				}
			}
		};
	},

	parseHTML() {
		return [
			{
				tag: "iframe"
			}
		];
	},

	renderHTML({ HTMLAttributes }) {
		return [
			"iframe",
			mergeAttributes(HTMLAttributes, {
				frameborder: 0,
				allowfullscreen: "true"
			})
		];
	},

	addCommands() {
		return {
			setIframe:
				(options: IframeAttributes) =>
				({ commands }) => {
					return commands.insertContent({
						type: this.name,
						attrs: options
					});
				}
		};
	},

	addNodeView() {
		return VueNodeViewRenderer(IframeView);
	}
});

export default Iframe;
