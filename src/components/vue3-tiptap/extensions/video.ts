import { Node, mergeAttributes } from "@tiptap/core";
import { VueNodeViewRenderer } from "@tiptap/vue-3";
import VideoView from "../extension-view/video-view.vue";
import { DEFAULT_VIDEO_WIDTH } from "@/utils/constant";

// 定义视频节点的属性类型
interface VideoAttributes {
	src: string | null;
	width: number;
	height: number | null;
	display: string;
}

declare module "@tiptap/core" {
	interface Commands<ReturnType> {
		video: {
			setVideo: (data: any) => ReturnType;
		};
	}
}

const Video = Node.create<VideoAttributes>({
	name: "video",

	group() {
		return "block";
	},
	draggable: true,

	// 添加内容配置
	content: "",

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

	// 添加 parseHTML 方法
	parseHTML() {
		return [
			{
				tag: "video"
			}
		];
	},

	// 添加 renderHTML 方法
	renderHTML({ HTMLAttributes }) {
		return [
			"video",
			mergeAttributes(HTMLAttributes, {
				controls: "true"
			})
		];
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
