import { VueNodeViewRenderer } from "@tiptap/vue-3";
import TiptapImage from "@tiptap/extension-image";
import ImageView from "@/components/vue3-tiptap/extension-view/image-view.vue";
import { ImageDisplay } from "@/utils/image";
import { DEFAULT_IMAGE_WIDTH, DEFAULT_IMAGE_DISPLAY } from "@/utils/constant";

const Images = TiptapImage.extend({
	inline() {
		return true;
	},
	group() {
		return "inline";
	},
	addAttributes() {
		return {
			...this.parent?.(),
			width: {
				default: DEFAULT_IMAGE_WIDTH,
				parseHTML: element => {
					const width = element.style.width || element.getAttribute("width") || null;
					return width == null ? null : parseInt(width, 10);
				},
				renderHTML: attributes => {
					return {
						width: attributes.width
					};
				}
			},
			height: {
				default: null,
				parseHTML: element => {
					const height = element.style.height || element.getAttribute("height") || null;
					return height == null ? null : parseInt(height, 10);
				},
				renderHTML: attributes => {
					return {
						height: attributes.height
					};
				}
			},
			display: {
				default: DEFAULT_IMAGE_DISPLAY,
				parseHTML: element => {
					const { cssFloat, display } = element.style;
					let dp = element.getAttribute("data-display") || element.getAttribute("display");
					if (dp) {
						dp = /(inline|block|left|right)/.test(dp) ? dp : ImageDisplay.INLINE;
					} else if (cssFloat === "left" && !display) {
						dp = ImageDisplay.FLOAT_LEFT;
					} else if (cssFloat === "right" && !display) {
						dp = ImageDisplay.FLOAT_RIGHT;
					} else if (!cssFloat && display === "block") {
						dp = ImageDisplay.BREAK_TEXT;
					} else {
						dp = ImageDisplay.INLINE;
					}

					return dp;
				},
				renderHTML: attributes => {
					return {
						["data-display"]: attributes.display
					};
				}
			}
		};
	},

	addNodeView() {
		return VueNodeViewRenderer(ImageView);
	},

	parseHTML() {
		return [
			{
				tag: "img[src]"
			}
		];
	}
});

export default Images;
