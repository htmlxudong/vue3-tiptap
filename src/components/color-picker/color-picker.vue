<template>
	<div class="color-picker">
		<ColorPickerPanel
			ref="pickerPanel"
			:panelPoint="panelPoint"
			:huePoint="huePoint"
			:opacityPoint="opacityPoint"
			@changeForms="onChangeForms"
			@updateColor="color => emits('updateColor', color)"
		/>
		<ColorInput @emitInput="changeInputColor" :forms="forms"></ColorInput>
	</div>
</template>

<script setup lang="ts">
import { TinyColor } from "@ctrl/tinycolor";
import ColorInput from "./color-input.vue";
import ColorPickerPanel from "./color-picker-panel.vue";
import { ref, reactive } from "vue";
import { hex2rgb } from "@swiftcarrot/color-fns";
import { colorToPoint, hueToPoint, opacityToPoint } from "./utils";

const emits = defineEmits(["updateColor"]);

const pickerPanel = ref();
const forms = reactive({
	hex: "FFFFFF",
	r: 255,
	g: 255,
	b: 255
});
const panelPoint = reactive({
	x: -8,
	y: -8
});
const huePoint = reactive({
	x: -4,
	y: 0
});
const opacityPoint = reactive({
	x: -4,
	y: 0
});

interface InputParams {
	h: number;
	s: number;
	v: number;
	type: string;
}

const changeInputColor = ({ h, s, v, type }: InputParams) => {
	const { containerRef, slideHueRef, slideOpaRef } = pickerPanel.value?.getAllContainer() || {};

	const conversion = colorToPoint({ container: containerRef, s, v });
	panelPoint.x = conversion.x - 8;
	panelPoint.y = conversion.y - 8;

	huePoint.x = hueToPoint({ container: slideHueRef, h }) - 4;

	// update panel/slide/opacity
	pickerPanel.value.handleColor({
		type: "set",
		value: new TinyColor({
			h,
			s,
			v
		})
	});
	const hueColor = pickerPanel.value.handleHueColor({ type: "get" });
	const hsvHue = hueColor.toHsv();
	pickerPanel.value.handleHueColor({
		type: "set",
		value: new TinyColor({
			h,
			s: hsvHue.s,
			v: hsvHue.v
		})
	});

	const opacityColor = pickerPanel.value.handleOpacityColor({ type: "get" });
	const hsvOpa = opacityColor.toHsv();
	pickerPanel.value.handleOpacityColor({
		type: "set",
		value: new TinyColor({
			h: h,
			s: s,
			v: v,
			a: hsvOpa.a
		})
	});

	const opaX = opacityToPoint({ container: slideOpaRef, s });
	opacityPoint.x = opaX - 4;

	if (type === "hex") {
		const { r, g, b } = hex2rgb(forms["hex"]);
		forms["r"] = r;
		forms["g"] = g;
		forms["b"] = b;
	}
	if (type === "rgb") {
		forms["hex"] = opacityColor.toHex();
	}
	emits("updateColor", `#${forms["hex"]}`);
};

const onChangeForms = (newColor: string) => {
	forms["hex"] = newColor;
	const { r, g, b } = hex2rgb(forms["hex"]);
	forms["r"] = r;
	forms["g"] = g;
	forms["b"] = b;
};
</script>

<style lang="scss" scoped>
.color-picker {
	width: 300px;
}
</style>
