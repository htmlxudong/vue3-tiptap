<template>
	<template v-for="tool in desserts" :key="tool.name">
		<a-tooltip placement="top">
			<template #title>
				<span>{{ tool.tip }}</span>
			</template>
			<div
				:class="['tools__button', editor.isActive(tool.name) ? 'tool--active' : '']"
				@click="tool.click"
			>
				<component :is="tool.component" style="font-size: 16px; font-weight: 600" />
			</div>
		</a-tooltip>
	</template>
</template>

<script setup>
import { ref, reactive } from "vue";
const props = defineProps(["desserts", "editor"]);
</script>

<style lang="scss" scoped></style>
