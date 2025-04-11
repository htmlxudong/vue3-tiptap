<template>
	<div ref="el" :style="moveStyle">
		<slot />
	</div>
</template>

<script setup lang="ts">
import { computed, ref, inject, onMounted } from "vue";
import type { Ref, PropType } from "vue";
import { Color } from "./color-picker";

const emit = defineEmits<{
	(
		e: "change",
		payload: {
			container: Ref<HTMLElement>;
			targetRef: Ref<HTMLElement>;
			offset: { x: number; y: number };
			color?: Color;
		}
	): void;
}>();

const props = defineProps({
	direction: {
		type: Object,
		default: () => ["x", "y"]
	},
	color: {
		type: Object as PropType<Color>
	},
	defaultPoint: {
		type: Object,
		default: () => ({ x: 0, y: 0 })
	},
	containerName: String
});

const el = ref();
//@ts-ignore
const container = inject<Ref<HTMLElement>>(props.containerName);

// 圆半径
const radius = ref(0);
const isMove = ref(false);
//@ts-ignore
const position = ref<{ x: number; y: number }>(props.defaultPoint);
const moveStyle = computed(
	() => `left:${position.value.x}px;position:absolute;touch-action:none;top:${position.value.y}px;`
);

const handleEvent = (event: PointerEvent) => {
	// #bug: 使用event.preventDefault() 会影响tiptap鼠标选区
	//event.stopPropagation();
	//event.preventDefault();
};

const start = (event: PointerEvent) => {
	if (el.value) {
		const { width } = el.value.getBoundingClientRect();
		radius.value = width / 2;
	}

	const rect = container.value.getBoundingClientRect();

	const x = event.clientX - rect.left - radius.value;
	const y = event.clientY - rect.top - radius.value;
	if (props.direction.includes("x")) {
		position.value.x = x;
	}
	if (props.direction.includes("y")) {
		position.value.y = y;
	}

	isMove.value = true;

	onChange(position.value);
	handleEvent(event);
};

const move = (event: PointerEvent) => {
	if (!isMove.value) {
		return;
	}
	const { x, y, width, height } = container.value.getBoundingClientRect();

	let offsetX = event.clientX - x <= 0 ? 0 : event.clientX - x > width ? width : event.clientX - x;
	let offsetY =
		event.clientY - y <= 0 ? 0 : event.clientY - y > height ? height : event.clientY - y;

	if (props.direction.includes("x")) {
		position.value.x = offsetX - radius.value;
	}
	if (props.direction.includes("y")) {
		position.value.y = offsetY - radius.value;
	}
	onChange({
		x: offsetX,
		y: offsetY
	});
	handleEvent(event);
};

const up = (event: PointerEvent) => {
	isMove.value = false;
	handleEvent(event);
};

const useEventListener = (
	target: HTMLElement | null | Window,
	type: string,
	handler: (event: PointerEvent) => void,
	config: AddEventListenerOptions
) => {
	if (!target) {
		return;
	}
	//@ts-ignore
	target.addEventListener(type, handler, config);
};

const bindEventListenr = () => {
	const config = { capture: true };
	useEventListener(container.value, "pointerdown", start, config);
	useEventListener(window, "pointermove", move, config);
	useEventListener(window, "pointerup", up, config);
};

onMounted(() => {
	bindEventListenr();
});

const onChange = (offset: { x: number; y: number }) => {
	emit("change", {
		container,
		targetRef: el,
		offset,
		color: props.color
	});
};
</script>
