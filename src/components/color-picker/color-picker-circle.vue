<template>
	<div class="color-picker-circle" :style="computedStyle"></div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

const props = defineProps({
	size: {
		default: 16
	},
	bgColor: {
		default: "transparent"
	}
});

const computedStyle = computed(() => {
	return {
		width: `${props.size}px`,
		height: `${props.size}px`,
		background: `${props.bgColor}`
	};
});

const w = ref(`${props.size}px`);
const h = ref(`${props.size}px`);
</script>

<style lang="scss" scoped>
.color-picker-circle {
	cursor: pointer;
	border-radius: 50%;
	position: relative;
	&::after {
		content: "";
		position: absolute;
		width: v-bind(w);
		height: v-bind(h);
		border: 2px solid #ffffff;
		border-radius: 50%;
		box-shadow:
			inset 0 0 1px 0 rgba(0, 0, 0, 0.25),
			0 0 0 1px rgba(0, 0, 0, 0.06);
		outline: none;
		top: -2px;
		left: -2px;
		background: transparent;
		box-sizing: content-box;
	}
}
</style>
