import { Node, mergeAttributes } from "@tiptap/core";
import { VueNodeViewRenderer } from "@tiptap/vue-3";
import IframeView from "../components/extensions/IframeView.vue";

const Iframe = Node.create({
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
				options =>
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
