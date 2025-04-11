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

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";
import { NodeViewWrapper, nodeViewProps } from "@tiptap/vue-3";
import { DeleteOutlined } from "@ant-design/icons-vue";
import { clamp } from "@/utils/index";

const props = defineProps(nodeViewProps);
const MIN_SIZE = 20;
const MAX_SIZE = 4000;

const resizeStatus = ref(false);
const resizing = ref(false);
const displayCollection = reactive(["left", "center", "right"]);
const originSize = reactive({
	width: 0,
	height: 0
});
const resizerAttrs = reactive({
	w: 0,
	h: 0,
	x: 0,
	y: 0,
	dir: ""
});

const src = computed(() => props.node.attrs.src);
const width = computed(() => props.node.attrs.width);
// const height = computed(() => props.node.attrs.height);
const display = computed(() => props.node.attrs.display);

const videoRef = ref();
onMounted(() => {
	originSize.width = videoRef.value.getBoundingClientRect().width;
	originSize.height = videoRef.value.getBoundingClientRect().height;
});

const onMouseDown = (e: MouseEvent, dir: string) => {
	e.stopPropagation();
	e.preventDefault();
	const aspectRatio = originSize.width / originSize.height;
	let { width, height } = props.node.attrs;
	if (width && !height) {
		height = Math.round(width / aspectRatio);
	} else if (!width && height) {
		width = Math.round(height * aspectRatio);
	} else if (!width && !height) {
		width = originSize.width;
	}
	resizerAttrs.w = width;
	resizerAttrs.h = height;
	resizerAttrs.x = e.clientX;
	resizerAttrs.y = e.clientY;
	resizerAttrs.dir = dir;
	resizing.value = true;
	onEvents();
};

const onMouseMove = (e: MouseEvent) => {
	const { x, y, w, h, dir } = resizerAttrs;

	const translateX = (e.clientX - x) * (/l/.test(dir) ? -1 : 1);
	const translateY = (e.clientY - y) * (/t/.test(dir) ? -1 : 1);

	props.updateAttributes?.({
		width: clamp(w + translateX, MIN_SIZE, MAX_SIZE),
		height: Math.max(h + translateY, MIN_SIZE)
	});
};

const onMouseUp = (e: MouseEvent) => {
	e.preventDefault();
	e.stopPropagation();

	if (!resizing.value) return;
	resizing.value = false;
	resizerAttrs.x = resizerAttrs.y = resizerAttrs.w = resizerAttrs.h = 0;
	resizerAttrs.dir = "";
	offEvents();
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
