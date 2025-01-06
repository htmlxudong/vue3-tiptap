<template>
	<a-tooltip placement="top" :show-after="200">
		<template #title>
			<span>格式刷</span>
		</template>
		<div
			:class="['tools__button', editor.isActive('formatBrush') ? 'tool--active' : '']"
			@click="onClick"
			@dblclick="onDblclick"
		>
			<Icon name="format-paint" />
		</div>
	</a-tooltip>
</template>

<script setup>
import Icon from "../Icon/src/Icon.vue";
import { ref, onMounted } from "vue";

const props = defineProps(["editor"]);
const timer = ref(null);

const onClick = () => {
	clearTimeout(timer.value);
	timer.value = setTimeout(() => {
		props.editor.chain().focus().copyFormat({ type: "click" }).run();
	}, 300);
};
const onDblclick = event => {
	clearTimeout(timer.value);
	props.editor.chain().focus().copyFormat({ type: "dblclick" }).run();
};
</script>

<style lang="scss" scoped></style>
