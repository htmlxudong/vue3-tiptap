<template>
	<div ref="el" :style="moveStyle">
		<slot />
	</div>
</template>

<script setup>
import { computed, ref, inject, onMounted } from "vue";
const emit = defineEmits(["change"]);
const props = defineProps({
	direction: {
		type: Object,
		default: ["x", "y"]
	},
	color: {
		type: Object
	},
	defaultPoint: {
		type: Object,
		default: {
			x: 0,
			y: 0
		}
	},
	style: Object,
	containerName: String
});

const el = ref();
const container = inject(props.containerName);

// 圆半径
const radius = ref(0);
const isMove = ref(false);
const position = ref(props.defaultPoint);
const moveStyle = computed(
	() => `left:${position.value.x}px;position:absolute;touch-action:none;top:${position.value.y}px;`
);

const handleEvent = event => {
	event.stopPropagation();
	// #bug: 使用event.preventDefault() 会影响tiptap鼠标选区
	// event.preventDefault();
};

const start = event => {
	const { width } = el.value.getBoundingClientRect();
	radius.value = width / 2;
	const rect = container.value.getBoundingClientRect();

	const x = event.clientX - rect.left - radius.value;
	const y = event.clientY - rect.top - radius.value;

	isMove.value = true;

	if (props.direction.includes("x")) {
		position.value.x = x;
	}
	if (props.direction.includes("y")) {
		position.value.y = y;
	}

	onChange(position.value);
	handleEvent(event);
};

const move = event => {
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

const up = event => {
	isMove.value = false;
	handleEvent(event);
};

const useEventListener = (target, type, handler, config) => {
	if (!target) {
		return;
	}
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

const onChange = offset => {
	emit("change", {
		container,
		targetRef: el,
		offset,
		color: props.color
	});
};
</script>

<style lang="scss" scoped></style>
