import { Node, mergeAttributes } from "@tiptap/core";
import { VueNodeViewRenderer } from "@tiptap/vue-3";
import VideoView from "../components/extensions/VideoView.vue";
import { DEFAULT_VIDEO_WIDTH } from "@/utils/constant";

const Video = Node.create({
	name: "video",

	group() {
		return "block";
	},
	draggable: true,

	addAttributes() {
		return {
			...this.parent?.(),
			src: {
				default: null
			},
			width: {
				default: DEFAULT_VIDEO_WIDTH
			},
			height: {
				default: null
			},
			display: {
				default: "left"
			}
		};
	},
	addCommands() {
		return {
			setVideo:
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
		return VueNodeViewRenderer(VideoView);
	}
});

export default Video;
