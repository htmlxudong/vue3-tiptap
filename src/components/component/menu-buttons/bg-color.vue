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
						<Icon name="caret-right" />
					</div>
				</div>
			</a-popover>

		</template>
		<a-tooltip placement="top">
			<template #title> <span>背景颜色</span> </template>
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
import ColorPicker from "../../component/color-picker/color-picker.vue";
import Icon from "../../component/Icon/src/Icon.vue";

const props = defineProps(["editor"]);
const colors = reactive(getTextColor());
const currentColor = ref("#ffffff");
const currentIndex = ref(9);

const toggleColor = (color, index) => {
	currentIndex.value = index;
	props.editor.chain().focus().setHighlight({ color: color }).run();
};

const onUpdateColor = color => {
	currentColor.value = `#${color}`;
	props.editor
		.chain()
		.focus()
		.setHighlight({ color: `#${color}` })
		.run();
};

</script>

<style lang="scss" scoped>

</style>
