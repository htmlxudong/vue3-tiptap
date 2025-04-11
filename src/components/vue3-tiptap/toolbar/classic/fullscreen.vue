<template>
	<a-tooltip placement="top" :show-after="200">
		<template #title>
			<span>全屏</span>
		</template>
		<div
			:class="['tool', editor.isActive('ExpandOutlined') ? 'tool--active' : '']"
			@click="toggleFullscreen"
		>
			<ExpandOutlined style="font-size: 16px" />
		</div>
	</a-tooltip>
</template>

<script setup lang="ts">
import { inject } from "vue";
import type { Editor } from "@tiptap/core";
import { ExpandOutlined } from "@ant-design/icons-vue";
import { ToggleFullScreenKey } from "@/components/vue3-tiptap/vue3-tiptap";

const toggleFullscreen = inject(ToggleFullScreenKey);

interface ToolTemplateProps {
	editor: Editor;
}

defineProps<ToolTemplateProps>();
</script>
