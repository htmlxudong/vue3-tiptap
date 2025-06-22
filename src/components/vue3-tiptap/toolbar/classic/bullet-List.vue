<template>
	<a-popover v-model:open="visible" placement="bottom" trigger="click">
		<a-tooltip placement="top">
			<template #title>
				<span> 无序列表</span>
			</template>
			<div :class="[
				'tool bullet_button',
				{
					'tool--active': isActive
				}
			]">
				<UnorderedListOutlined style="font-size: 18px" />
				<CaretDownOutlined style="font-size: 10px" />
			</div>
		</a-tooltip>

		<template #content>
			<div class="bullet-lists">
				<div v-for="item in bulletList" :key="item.type" class="bullet-lists-item"
					@click="setDataSet(item.type)"
					:class="[{ 'bullet-lists__border': isActive && currentStyle === item.type }]">
					<Icon :name="item.icon" :size="18" />
				</div>
			</div>
		</template>
	</a-popover>
</template>

<script setup lang="ts">
import Icon from "@/components/Icon/src/Icon.vue";
import { computed, ref } from "vue";
import { UnorderedListOutlined, CaretDownOutlined } from "@ant-design/icons-vue";

const emit = defineEmits(["update:modelValue", "change"]);
const props = defineProps(["modelValue", "editor"]);
const visible = ref(false);

const bulletList = [
	{
		type: "disc",
		icon: "ul-solid-circle"
	},
	{
		type: "circle",
		icon: "ul-hollow-circle"
	},
	{
		type: "square",
		icon: "ul-solid-square"
	}
];
const currentStyle = ref("");
const isActive = computed(() => {
	return props.editor?.isActive("bulletList");
});

const setDataSet = (style: string) => {
	if (isActive.value && currentStyle.value === style) {
		props.editor.chain().focus().toggleBulletList().run();
	} else {
		if (!isActive.value) {
			props.editor.chain().focus().toggleBulletList().run();
		}
	}
	currentStyle.value = style;
	props.editor
		.chain()
		.focus()
		.setBulletStyle(style)
		.updateAttributes("bulletList", { bulletStyle: style })
		.run();
	visible.value = false;
};
</script>

<style lang="scss" scoped>
.bullet_button {
	width: 45px;
	gap: 5px;
}

.bullet-lists {
	width: 100%;
	display: flex;
	justify-content: center;
	gap: 5px;
	flex-wrap: wrap;

	&-item {
		cursor: pointer;
		padding: 5px;
	}
}
</style>
