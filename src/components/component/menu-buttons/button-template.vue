<template>
	<a-tooltip placement="top" :show-after="200">
		<template #title>
			<span>{{ option.tip }}</span>
		</template>
		<div
			:class="['tools__button', editor.isActive(option.name) ? 'tool--active' : '']"
			@click="option.click"
			@dblclick="option.dblclick"
		>
			<component :is="option.component" style="font-size: 16px; font-weight: 600" />
			<!-- <Icon :name="option.component" /> -->
		</div>
	</a-tooltip>
</template>

<script setup>
import Icon from "../Icon/src/Icon.vue";
const props = defineProps(["option", "editor"]);
</script>

<style lang="scss" scoped></style>
