<template>
	<a-popover placement="bottom" trigger="click">
		<template #content>
			<ul class="colors-palette">
				<li
					:class="[
						'color-item',
						{
							border_black: currentIndex === index
						}
					]"
					v-for="(color, index) in colors"
					:key="color"
					@click="toggleColor(color, index)"
				>
					<div class="color-box" :style="{ background: color }"></div>
				</li>
			</ul>
		</template>
		<a-tooltip placement="top">
			<template #title> <span>文字颜色</span> </template>
			<div
				:class="[
					'tools__button',
					{
						'tool--active': editor.isActive('highlight')
					}
				]"
			>
				<BgColorsOutlined style="font-size: 16px; font-weight: 600" /><CaretDownOutlined
					style="font-size: 10px; font-weight: 600"
				/>
			</div>
		</a-tooltip>
	</a-popover>
</template>

<script setup>
import { getTextColor } from "./cells";
import { ref, reactive } from "vue";
import { BgColorsOutlined, CaretDownOutlined } from "@ant-design/icons-vue";
const props = defineProps(["editor"]);
const colors = reactive(getTextColor());

const currentIndex = ref(9);

const toggleColor = (color, index) => {
	currentIndex.value = index;
	props.editor.chain().focus().setHighlight({ color: color }).run();
};
</script>

<style lang="scss" scoped>
.border_black {
	border: 1px solid rgba(0, 0, 0, 0.6) !important;
}
.colors-palette {
	width: 230px;
	display: flex;
	flex-wrap: wrap;
	.color-item {
		padding: 2px;
		border: 1px solid transparent;
		transition: border 0.2s ease-out;
		cursor: pointer;
		border-radius: 3px;
		&:hover {
			border: 1px solid rgba(0, 0, 0, 0.5);
		}
		.color-box {
			border: 1px solid #e8e8e8;
			background-color: rgb(235, 144, 58);
			border-radius: 3px;
			width: 17px;
			height: 17px;
		}
	}
}
</style>
