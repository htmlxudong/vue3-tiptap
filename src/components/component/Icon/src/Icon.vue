<template>
	<i class="svg" :style="style">
		<use v-html="icon"></use>
		<slot />
	</i>
</template>
<script setup>
import { computed } from "vue";
import { getIcon } from "./Icon.js";

const addUnit = (value, defaultUnit = "px") => {
	if (!value) return "";
	if (isNumber(value) || isStringNumber(value)) {
		return `${value}${defaultUnit}`;
	} else if (isString(value)) {
		return value;
	}
};

const props = defineProps({
	name: String,
	color: String,
	size: {
		type: [String, Number],
		default: ""
	}
});
const icon = computed(() => getIcon(props.name));

const style = computed(() => {
	return {
		...(props.size ? { fontSize: addUnit(props.size) } : { fontSize: "16px" }),
		...(props.color ? { fill: props.color } : {})
	};
});
</script>

<style lang="scss" scoped>
.svg {
	width: 24px;
	height: 24px;
	display: inline-flex;
	justify-content: center;
	align-items: center;
	use {
		display: flex;
		align-items: center;
	}
}
</style>
