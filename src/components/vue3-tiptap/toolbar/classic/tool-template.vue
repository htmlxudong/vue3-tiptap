<template>
	<a-tooltip placement="top" :show-after="200">
		<template #title>
			<span>{{ option.tip }}</span>
		</template>
		<div
			:class="['tool', editor.isActive(option.name) ? 'tool--active' : '']"
			@click="option.click"
			@dblclick="option.dblclick"
		>
			<component :is="option.component" style="font-size: 16px" />
		</div>
	</a-tooltip>
</template>

<script setup lang="ts">
import type { Editor } from "@tiptap/core";
import type { OptionProps } from "./classic";

interface ToolTemplateProps {
	editor: Editor;
	option: OptionProps;
}

defineProps<ToolTemplateProps>();
</script>
