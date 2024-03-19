import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { VueNodeViewRenderer } from "@tiptap/vue-3";
import CodeBlockView from "../component/extensions/CodeBlockView.vue";

const CodeBlockLights = CodeBlockLowlight.extend({
	name: "CodeBlockLights",
	addAttributes() {
		return {
			...this.parent?.(),
			language: {
				default: "html"
			}
		};
	},
	addNodeView() {
		return VueNodeViewRenderer(CodeBlockView);
	}
});

export default CodeBlockLights;
