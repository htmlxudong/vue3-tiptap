<template>
	<a-popover v-model:open="visible" placement="bottom" trigger="click">
		<a-tooltip placement="top">
			<template #title>
				<span> 行高</span>
			</template>
			<div class="tool font-size" @click="visible = !visible">
				<div class="size-label">
					<span class="label"> {{ content }}</span>
				</div>
				<CaretDownOutlined style="font-size: 10px" />
			</div>
		</a-tooltip>
		<template #content>
			<div class="size-lists">
				<div
					class="size-lists-text size-lists-item"
					@click="setClassName(item.value)"
					v-for="item in options"
					:key="item.value"
				>
					<span class="pr-2">{{ item.label }}</span>
					<Icon name="correct" v-if="content === item.value" />
				</div>
			</div>
		</template>
	</a-popover>
</template>

<script setup lang="ts">
import Icon from "@/components/Icon/src/Icon.vue";
import { ref } from "vue";
import { CaretDownOutlined } from "@ant-design/icons-vue";

const props = defineProps(["modelValue", "editor"]);
const visible = ref(false);

const content = ref(14);
const setClassName = (value: number) => {
	content.value = value;
	props.editor.chain().focus().setFontSize(value).run();
	visible.value = false;
};

const options = [
	{
		label: "12",
		value: 12
	},
	{
		label: "14",
		value: 14
	},
	{
		label: "16",
		value: 16
	},
	{
		label: "18",
		value: 18
	},
	{
		label: "22",
		value: 22
	},
	{
		label: "24",
		value: 24
	},
	{
		label: "26",
		value: 26
	},
	{
		label: "28",
		value: 28
	},
	{
		label: "36",
		value: 36
	},
	{
		label: "48",
		value: 48
	},
	{
		label: "72",
		value: 72
	}
];
</script>

<style lang="scss">
.font-size {
	width: 50px;
	font-size: 14px;
}
.size-label {
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
	.label {
		font-size: 16px;
	}
}
.size-lists {
	&-item {
		background-color: transparent;
		transition: all 0.25s ease-out;
		cursor: pointer;
		letter-spacing: 2px;
		padding: 5px 10px;
		&:hover {
			background-color: var(--main-primary-background);
		}
		display: flex;
		align-items: center;
		gap: 10px;
	}
	&-text {
		font-size: 14px;
	}
}
</style>
