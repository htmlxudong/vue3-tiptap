<template>
	<node-view-wrapper as="div" :class="['video-view', `display-${display}`]">
		<a-popover>
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
			<div
				:class="['video-resizer', !resizeStatus && !resizing ? 'border_trans' : 'border_blue']"
				@mouseenter="resizeStatus = true"
				@mouseleave="resizeStatus = false"
			>
				<transition name="fade">
					<div v-show="resizeStatus || resizing">
						<span
							v-for="direction in ['tl', 'tr', 'bl', 'br']"
							:key="direction"
							:class="`video-resizer__handler--${direction}`"
							class="video-resizer__handler"
							@mousedown="onMouseDown($event, direction)"
						/>
					</div>
				</transition>

				<video ref="videoRef" :src="src" controls :width="width"></video>
			</div>
		</a-popover>
	</node-view-wrapper>
</template>

<script>
import { defineComponent } from "vue";
import { NodeViewWrapper, nodeViewProps } from "@tiptap/vue-3";
import { DeleteOutlined } from "@ant-design/icons-vue";
import { clamp } from "@/utils/";

const MIN_SIZE = 20;
const MAX_SIZE = 4000;
export default defineComponent({
	name: "VideoView",
	data() {
		return {
			resizeStatus: false,
			resizing: false,
			displayCollection: ["left", "center", "right"],
			originSize: {
				width: 0,
				height: 0
			},
			resizerAttrs: {
				w: 0,
				h: 0,
				x: 0,
				y: 0,
				dir: ""
			}
		};
	},
	props: nodeViewProps,
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
		}
	},
	mounted() {
		const { width, height } = this.$refs.videoRef.getBoundingClientRect();
		this.originSize.width = width;
		this.originSize.height = height;
	},
	methods: {
		onMouseDown(e, dir) {
			e.stopPropagation();
			e.preventDefault();

			const aspectRatio = this.originSize.width / this.originSize.height;

			let { width, height } = this.node.attrs;

			if (width && !height) {
				height = Math.round(width / aspectRatio);
			} else if (!width && height) {
				width = Math.round(height * aspectRatio);
			} else if (!width && !height) {
				width = this.originSize.width;
			}

			this.resizerAttrs.w = width;
			this.resizerAttrs.h = height;
			this.resizerAttrs.x = e.clientX;
			this.resizerAttrs.y = e.clientY;
			this.resizerAttrs.dir = dir;
			this.resizing = true;

			this.onEvents();
		},
		onMouseMove(e) {
			const { x, y, w, h, dir } = this.resizerAttrs;

			const translateX = (e.clientX - x) * (/l/.test(dir) ? -1 : 1);
			const translateY = (e.clientY - y) * (/t/.test(dir) ? -1 : 1);

			this.updateAttributes?.({
				width: clamp(w + translateX, MIN_SIZE, MAX_SIZE),
				height: Math.max(h + translateY, MIN_SIZE)
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
	components: {
		NodeViewWrapper,
		DeleteOutlined
	}
});
</script>

<style lang="scss" scoped>
.border_trans {
	border: 1px solid transparent;
}
.border_blue {
	border: 1px solid #409eff;
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}

.video-view {
	display: flex;
}

.display-left {
	justify-content: start;
}
.display-center {
	justify-content: center;
}
.display-right {
	justify-content: end;
}

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

.video-resizer {
	position: relative;
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
</style>
