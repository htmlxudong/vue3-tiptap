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

			<a-popover placement="right">
				<template #content>
					<ColorPicker @updateColor="onUpdateColor" />
				</template>
				<div class="color-more">
					<div class="color-circle">
						<Icon name="color-picker" />
						更多颜色
					</div>
					<div>
						<CaretRightOutlined style="font-size: 12px" />
					</div>
				</div>
			</a-popover>
		</template>
		<a-tooltip placement="top">
			<template #title> <span>文字颜色</span> </template>
			<div
				:class="[
					'tool',
					{
						'tool--active': editor.isActive('textStyle')
					}
				]"
			>
				<FontColorsOutlined style="font-size: 16px" /><CaretDownOutlined style="font-size: 10px" />
			</div>
		</a-tooltip>
	</a-popover>
</template>

<script setup lang="ts">
import { getTextColor } from "./cells";
import { ref, reactive } from "vue";
import { FontColorsOutlined, CaretDownOutlined, CaretRightOutlined } from "@ant-design/icons-vue";
import ColorPicker from "@/components/color-picker/color-picker.vue";
import Icon from "@/components/Icon/src/Icon.vue";

const props = defineProps(["editor"]);
const colors = reactive(getTextColor());
const currentIndex = ref(0);

const toggleColor = (color: string, index: number) => {
	currentIndex.value = index;
	props.editor.chain().focus().setColor(color).run();
};

const onUpdateColor = (color: string) => {
	props.editor.chain().focus().setColor(color).run();
};
</script>

<style lang="scss">
.border_black {
	border: 1px solid rgba(0, 0, 0, 0.6) !important;
}
.colors-palette {
	list-style: none;
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

.color-more {
	cursor: pointer;
	width: 100%;
	padding: 5px 0;
	border-top: 1px solid #eee;
	display: flex;
	justify-content: space-between;
	background: transparent;
	transition: background 0.3s;
	&:hover {
		background: #e8e8e8;
	}
	.color-circle {
		display: flex;
		column-gap: 5px;
		align-items: center;
	}
}
</style>
