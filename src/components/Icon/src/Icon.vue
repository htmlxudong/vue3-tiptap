<template>
	<i class="svg" :style="style">
		<use v-html="icon"></use>
		<slot />
	</i>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { getIcon } from "./Icon";

type Size = number | string | undefined;
interface IconType {
	name: string;
	color?: string;
	size?: Size;
}
const props = defineProps<IconType>();

const addUnit = (size: Size, defaultSize = "16px") => {
	if (!size) return defaultSize;
	return typeof size === "number" ? `${size}px` : size;
};

const icon = computed(() => getIcon(props.name));

const style = computed(() => {
	const iconSize = addUnit(props.size);
	return {
		width: iconSize,
		height: iconSize,
		fontSize: iconSize,
		...(props.color ? { fill: props.color } : {})
	};
});
</script>

<style scoped>
.svg {
	width: 24px;
	height: 24px;
	display: inline-flex;
	justify-content: center;
	align-items: center;
}

.svg use {
	display: flex;
	align-items: center;
	width: 100%;
	height: 100%;
}
</style>
