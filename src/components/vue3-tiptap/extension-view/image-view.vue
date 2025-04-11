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
					v-for="direction in resizeDirections"
					:key="direction"
					:class="`image-resizer__handler--${direction}`"
					class="image-resizer__handler"
					@mousedown="onMouseDown($event, direction)"
				/>
			</div>
		</div>
	</node-view-wrapper>
</template>

<script setup lang="ts">
import { NodeViewWrapper, nodeViewProps } from "@tiptap/vue-3";
import { ref, reactive, computed } from "vue";
import { DeleteOutlined } from "@ant-design/icons-vue";
import { resolveImg } from "@/utils/image";
import { clamp } from "@/utils/index";

const props = defineProps(nodeViewProps);

const MIN_SIZE = 20;
const MAX_SIZE = 4000;

const displayCollection = reactive(["inline", "block", "left", "right"]);
const maxSize = reactive({
	width: MAX_SIZE,
	height: MAX_SIZE
});
const resizing = ref(false);
const resizeState = reactive({
	w: 0,
	h: 0,
	dir: "",
	x: 0,
	y: 0
});
const resizeDirections = reactive(["tl", "tr", "bl", "br"]);
const originalSize = reactive({
	width: 0,
	height: 0
});

const src = computed(() => props.node.attrs.src);
const width = computed(() => props.node.attrs.width);
const height = computed(() => props.node.attrs.height);
const display = computed(() => props.node.attrs.display);
const imageViewClass = computed(() => ["image-view", `image-view--${display.value}`]);

const loadImage = async (): Promise<void> => {
	const result: any = await resolveImg(src.value);

	if (!result.complete) {
		result.width = MIN_SIZE;
		result.height = MIN_SIZE;
	}

	originalSize.width = result.width;
	originalSize.height = result.height;
};
loadImage();

const selectImage = () => {
	props.editor?.commands.setNodeSelection(props.getPos());
};

// 图片缩放
const onMouseDown = (e: MouseEvent, dir: string) => {
	e.stopPropagation();
	e.preventDefault();

	const originalWidth = originalSize.width;
	const originalHeight = originalSize.height;
	const aspectRatio = originalWidth / originalHeight; // 图片宽高比

	const maxWidth = maxSize.width;

	let { width, height } = props.node.attrs;

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

	resizeState.x = e.clientX;
	resizeState.y = e.clientY;

	resizeState.w = width;
	resizeState.h = height;
	resizeState.dir = dir;
	resizing.value = true;

	onEvents();
};

const onMouseMove = (e: MouseEvent) => {
	e.preventDefault();
	e.stopPropagation();

	const { x, y, w, h, dir } = resizeState;

	const dx = (e.clientX - x) * (/l/.test(dir) ? -1 : 1);
	const dy = (e.clientY - y) * (/t/.test(dir) ? -1 : 1);

	props.updateAttributes?.({
		width: clamp(w + dx, MIN_SIZE, maxSize.width),
		height: Math.max(h + dy, MIN_SIZE)
	});
};

const onMouseUp = (e: MouseEvent) => {
	e.preventDefault();
	e.stopPropagation();
	if (!resizing.value) return;

	resizing.value = false;

	resizeState.x = resizeState.y = resizeState.w = resizeState.h = 0;
	resizeState.dir = "";
	offEvents();
	selectImage();
};

const onEvents = () => {
	document.addEventListener("mousemove", onMouseMove, true);
	document.addEventListener("mouseup", onMouseUp, true);
};
const offEvents = () => {
	document.removeEventListener("mousemove", onMouseMove, true);
	document.removeEventListener("mouseup", onMouseUp, true);
};
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
