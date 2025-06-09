<template>
	<a-tooltip placement="top">
		<template #title>
			<span>链接</span>
		</template>
		<div
			:class="['tool', editor.isActive('link') ? 'tool--active' : '']"
			@click="linkRef.showModal()"
		>
			<LinkOutlined style="font-size: 16px; font-weight: 600" />
		</div>
	</a-tooltip>

	<InsertLink ref="linkRef" @emitInsert="onEmitInsert" :options="{ title: '插入链接', headers }">
	</InsertLink>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { LinkOutlined } from "@ant-design/icons-vue";
import InsertLink from "./insert-model/index.vue";
import { validateUrl } from "@/utils/pattern";

const props = defineProps(["editor"]);
const emit = defineEmits(["emitUpdate"]);

const headers = [
	{
		formItem: {
			label: "链接",
			name: "href",
			rules: [{ required: true, validator: validateUrl, trigger: "blur" }]
		},
		component: {
			name: "input",
			placeholder: "URL of LINK"
		}
	}
];

const linkRef = ref();
const onEmitInsert = ({ href }: { href: string }) => {
	props.editor
		.chain()
		.focus()
		.extendMarkRange("link")
		.setLink({
			href: href
		})
		.run();
};
</script>
