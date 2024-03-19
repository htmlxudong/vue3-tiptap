<template>
	<node-view-wrapper as="span" :class="imageViewClass">
		<div class="image-view__body">
			<a-popover placement="top" trigger="click">
				<template #content>
					<div class="popover__tools">
						<div
							class="popover__item"
							v-for="display in displayCollection"
							:key="display"
							@click="updateAttributes({ display })"
						>
							{{ display }}
						</div>
						<div class="popover__item" @click="deleteNode()">
							<DeleteOutlined />
						</div>
					</div>
				</template>
				<img
					:src="src"
					:title="node.attrs.title"
					:alt="node.attrs.alt"
					:width="width"
					:height="height"
					@click="selectImage"
				/>
			</a-popover>

			<div class="image-resizer" v-show="resizing || selected">
				<span
					v-for="direction in ['tl', 'tr', 'bl', 'br']"
					:key="direction"
					:class="`image-resizer__handler--${direction}`"
					class="image-resizer__handler"
					@mousedown="onMouseDown($event, direction)"
				/>
			</div>
		</div>
	</node-view-wrapper>
</template>

<script>
import { defineComponent } from "vue";
import { NodeViewWrapper, nodeViewProps } from "@tiptap/vue-3";
import { message } from "ant-design-vue";
import { DeleteOutlined, EnvironmentOutlined } from "@ant-design/icons-vue";
import { resolveImg } from "@/utils/image";
import { clamp } from "@/utils/index";

const MIN_SIZE = 20;
const MAX_SIZE = 4000;

export default defineComponent({
	name: "ImageView",

	data() {
		return {
			displayCollection: ["inline", "block", "left", "right"],
			maxSize: {
				width: MAX_SIZE,
				height: MAX_SIZE
			},
			resizing: false,
			resizeState: {
				w: 0,
				h: 0,
				dir: "",
				x: 0,
				y: 0
			},
			resizeDirections: ["tl", "tr", "bl", "br"]
		};
	},
	components: {
		NodeViewWrapper,
		DeleteOutlined,
		EnvironmentOutlined
	},
	async created() {
		const result = await resolveImg(this.src);

		if (!result.complete) {
			result.width = MIN_SIZE;
			result.height = MIN_SIZE;
		}

		this.originalSize = {
			width: result.width,
			height: result.height
		};
	},
	methods: {
		confirm() {
			message.info("Clicked on Yes.");
		},
		selectImage() {
			this.editor?.commands.setNodeSelection(this.getPos());
		},
		onMouseDown(e, dir) {
			e.stopPropagation();
			e.preventDefault();

			const originalWidth = this.originalSize.width;
			const originalHeight = this.originalSize.height;
			const aspectRatio = originalWidth / originalHeight; // 图片宽高比

			const maxWidth = this.maxSize.width;

			let { width, height } = this.node.attrs;

			if (width && !height) {
				width = width > maxWidth ? maxWidth : width;
				height = Math.round(width / aspectRatio);
			} else if (height && !width) {
				width = Math.round(height * aspectRatio);
				width = width > maxWidth ? maxWidth : width;
			} else if (!width && !height) {
				width = originalWidth > maxWidth ? maxWidth : originalWidth;
				height = Math.round(width / aspectRatio);
			} else {
				width = width > maxWidth ? maxWidth : width;
			}

			this.resizeState.x = e.clientX;
			this.resizeState.y = e.clientY;

			this.resizeState.w = width;
			this.resizeState.h = height;
			this.resizeState.dir = dir;
			this.resizing = true;

			this.onEvents();
		},
		onMouseMove(e) {
			e.preventDefault();
			e.stopPropagation();

			const { x, y, w, h, dir } = this.resizeState;

			const dx = (e.clientX - x) * (/l/.test(dir) ? -1 : 1);
			const dy = (e.clientY - y) * (/t/.test(dir) ? -1 : 1);

			this.updateAttributes?.({
				width: clamp(w + dx, MIN_SIZE, this.maxSize.width),
				height: Math.max(h + dy, MIN_SIZE)
			});
		},
		onMouseUp(e) {
			e.preventDefault();
			e.stopPropagation();
			if (!this.resizing) return;

			this.resizing = false;

			this.resizerState = {
				x: 0,
				y: 0,
				w: 0,
				h: 0,
				dir: ""
			};

			this.offEvents();
			this.selectImage();
		},
		onEvents() {
			document.addEventListener("mousemove", this.onMouseMove, true);
			document.addEventListener("mouseup", this.onMouseUp, true);
		},
		offEvents() {
			document.removeEventListener("mousemove", this.onMouseMove, true);
			document.removeEventListener("mouseup", this.onMouseUp, true);
		}
	},

	computed: {
		src() {
			return this.node.attrs.src;
		},
		width() {
			return this.node.attrs.width;
		},

		height() {
			return this.node.attrs.height;
		},
		display() {
			return this.node.attrs.display;
		},
		imageViewClass() {
			return ["image-view", `image-view--${this.display}`];
		}
	},
	props: nodeViewProps
});
</script>

<style lang="scss" scoped>
.popover__tools {
	display: flex;
	position: relative;
	.popover__item {
		box-sizing: border-box;
		cursor: pointer;
		padding: 5px 8px;
		transition: 0.2s all;
		border-radius: 2px;
		display: flex;
		align-items: center;
		&:hover {
			background-color: rgba(0, 0, 0, 0.05);
		}
	}
}
.image-view {
	$root: &;
	display: inline-block;
	float: none;
	line-height: 0;
	margin: 12px 0;
	max-width: 100%;
	user-select: none;
	vertical-align: baseline;

	&--inline {
		margin-left: 12px;
		margin-right: 12px;
	}

	&--block {
		display: block;
	}

	&--left {
		float: left;
		margin-left: 0;
		margin-right: 12px;
	}

	&--right {
		float: right;
		margin-left: 12px;
		margin-right: 0;
	}

	&__body {
		clear: both;
		display: inline-block;
		max-width: 100%;
		outline-color: transparent;
		outline-style: solid;
		outline-width: 2px;
		transition: all 0.2s ease-in;
		position: relative;
		&:hover {
			outline-color: #ffc83d;
		}

		&--focused:hover,
		&--resizing:hover {
			outline-color: transparent;
		}

		&__placeholder {
			height: 100%;
			left: 0;
			position: absolute;
			top: 0;
			width: 100%;
			z-index: -1;
		}

		&__image {
			cursor: pointer;
			margin: 0;
		}
		.image-resizer {
			position: absolute;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
			margin: 0 auto;
			border: 1px solid #409eff;
			&__handler {
				position: absolute;
				width: 12px;
				height: 12px;
				background-color: #409eff;
				&--tl {
					left: -6px;
					top: -6px;
					cursor: nw-resize;
				}
				&--tr {
					right: -6px;
					top: -6px;
					cursor: ne-resize;
				}
				&--br {
					right: -6px;
					bottom: -6px;
					cursor: se-resize;
				}
				&--bl {
					left: -6px;
					bottom: -6px;
					cursor: sw-resize;
				}
			}
		}
	}
}
</style>
