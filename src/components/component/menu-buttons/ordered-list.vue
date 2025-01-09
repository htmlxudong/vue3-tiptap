<template>
	<a-popover v-model:open="visible" placement="bottom" trigger="click">
		<div>
			<a-tooltip placement="top">
				<template #title>
					<span> 有序列表</span>
				</template>
				<div
					:class="[
						'tools__button ordered_button',
						{
							'tool--active': isActive
						}
					]"
				>
					<OrderedListOutlined style="font-size: 18px" />
					<CaretDownOutlined style="font-size: 10px" />
				</div>
			</a-tooltip>
		</div>

		<template #content>
			<div class="order-lists">
				<div
					v-for="item in orderList"
					:key="item.type"
					class="bullet-lists-item"
					@click="setDataSet(item.type)"
					:class="[{ 'order-lists__border': isActive && currentStyle === item.type }]"
				>
					<Icon :name="item.icon" />
				</div>
			</div>
		</template>
	</a-popover>
</template>

<script setup>
import Icon from "../Icon/src/Icon.vue";
import { computed, watch, ref } from "vue";
import { OrderedListOutlined,CaretDownOutlined } from "@ant-design/icons-vue";


const emit = defineEmits(["update:modelValue", "change"]);
const props = defineProps(["modelValue", "editor"]);
const visible = ref(false);
const currentStyle = ref("");

const orderList = [
	{
		type: "chinese",
		icon: "ol-chinese-number"
	},
	{
		type: "decimal",
		icon: "ol-decimal"
	},
	{
		type: "circle",
		icon: "ol-decimal-zero"
	},
	{
		type: "lower-alpha",
		icon: "ol-lower-alpha"
	},
	{
		type: "letter",
		icon: "ol-upper-alpha"
	},
	{
		type: "roman",
		icon: "ol-lower-roman"
	}
];

const isActive = computed(() => {
	return props.editor?.isActive("orderedList");
});

const setDataSet = style => {
	if (isActive.value && currentStyle.value === style) {
		props.editor.chain().focus().toggleOrderedList().run();
	} else {
		if (!isActive.value) {
			props.editor.chain().focus().toggleOrderedList().run();
		}
	}
	currentStyle.value = style;
	props.editor
		.chain()
		.focus()
		.setOrderedStyle(style)
		.updateAttributes("orderedList", { orderedStyle: style })
		.run();
	visible.value = false;
};
</script>

<style lang="scss" scoped>
.ordered_button {
	width: 45px;
	gap:5px;
}

.order-lists {
	width: 100px;
	display: flex;
	flex-wrap: wrap;
	gap: 10px;
	&-item {
		cursor: pointer;
	}
}
</style>
