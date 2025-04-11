<template>
	<div class="color-picker-panel">
		<div class="color-picker-panel-palette" :style="computedStyle" ref="containerRef">
			<Transform
				ref="transformColor"
				:color="color"
				@change="onChangeColor"
				containerName="container"
				parentName="panel"
				:defaultPoint="panelPoint"
			>
				<ColorPickerCircle :bgColor="color.toRgbString()" />
			</Transform>
		</div>
		<div class="color-picker-panel-slide-container">
			<div class="color-picker-panel-slide-group" ref="slideGroup">
				<div class="color-picker-panel-slide color-hue" ref="slideHueRef">
					<Transform
						ref="transformSlide"
						:color="color"
						containerName="slideHue"
						:direction="['x']"
						parentName="slideGroup"
						:defaultPoint="huePoint"
						@change="onChangeSlide"
					>
						<ColorPickerCircle :bgColor="hueColor.toRgbString()" :size="8" />
					</Transform>
				</div>
				<div class="color-picker-panel-slide color-opacity" ref="slideOpaRef">
					<div class="color-picker-slider-rail" :style="opacityStyle">
						<Transform
							ref="transformOpacity"
							:color="color"
							containerName="slideOpa"
							:direction="['x']"
							parentName="slideGroup"
							:defaultPoint="opacityPoint"
							@change="onChangeOpacity"
						>
							<div class="color-picker-container">
								<ColorPickerCircle :bgColor="opacityColor.toRgbString()" :size="8" />
							</div>
						</Transform>
					</div>
				</div>
			</div>
			<div class="color-picker-block" :style="`background:${opacityColor.toRgbString()}`">
				<div class="color-picker-block-inner"></div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import Transform from "./transform.vue";
import { TinyColor } from "@ctrl/tinycolor";
import ColorPickerCircle from "./color-picker-circle.vue";
import { computed, ref, provide } from "vue";
import type { Ref, CSSProperties } from "vue";
import { calculateColor, calculateHueColor, calculateOpacityColor } from "./utils";
import type { EmitColor, HandleColorType } from "./color-picker";

// 往下滑亮度减少、往左滑饱和度减少。
const props = defineProps(["forms", "panelPoint", "huePoint", "opacityPoint"]);
const emits = defineEmits(["changeForms", "updateColor"]);

const color = ref(new TinyColor("white"));
const hueColor = ref(new TinyColor("red"));
const opacityColor = ref(new TinyColor("#fff"));

const transformColor = ref();
const transformSlide = ref();
const transformOpacity = ref();
const panelRef = ref();
const containerRef = ref();
const slideHueRef = ref();
const slideOpaRef = ref();
const slideGroupRef = ref();

provide<Ref<HTMLElement | null>>("slideOpa", slideOpaRef);
provide<Ref<HTMLElement | null>>("panel", panelRef);
provide<Ref<HTMLElement | null>>("container", containerRef);
provide<Ref<HTMLElement | null>>("slideHue", slideHueRef);
provide<Ref<HTMLElement | null>>("slideGroup", slideGroupRef);

const computedStyle = computed<CSSProperties>(() => {
	return {
		backgroundColor: `hsl(${color.value.toHsl().h},100%, 50%)`,
		backgroundImage:
			"linear-gradient(0deg, #000, transparent),linear-gradient(90deg, #fff, hsla(0, 0%, 100%, 0))"
	};
});

const opacityStyle = computed(() => {
	return {
		background: `linear-gradient(90deg, rgba(255, 0, 4, 0) 0%, ${color.value.toRgbString()} 100%)`
	};
});

const onChangeColor = (data: EmitColor) => {
	const hsv = color.value.toHsv();
	const { saturation, lightness } = calculateColor(data);
	color.value = new TinyColor({
		h: hsv.h,
		s: saturation <= 0 ? 0 : saturation,
		v: lightness >= 1 ? 1 : lightness,
		a: hsv.a
	});

	const opacity = calculateOpacityColor({
		container: slideOpaRef,
		targetRef: transformOpacity,
		offset: props.opacityPoint
	});

	opacityColor.value = new TinyColor({
		h: hsv.h,
		s: saturation <= 0 ? 0 : saturation,
		v: lightness >= 1 ? 1 : lightness,
		a: opacity
	});

	emits("changeForms", opacityColor.value.toHex());
	emits("updateColor", `#${opacityColor.value.toHex()}`);
};
const onChangeSlide = (data: EmitColor) => {
	const hue = calculateHueColor(data);
	const hsvHue = hueColor.value.toHsv();
	const hsvOpa = opacityColor.value.toHsv();

	const { saturation, lightness } = calculateColor({
		container: containerRef,
		targetRef: transformColor,
		offset: props.panelPoint
	});

	color.value = new TinyColor({
		h: hue,
		s: saturation <= 0 ? 0 : saturation,
		v: lightness >= 1 ? 1 : lightness,
		a: hsvHue.a
	});

	hueColor.value = new TinyColor({
		h: hue,
		s: hsvHue.s,
		v: hsvHue.v,
		a: hsvHue.a
	});

	opacityColor.value = new TinyColor({
		h: hue,
		s: hsvOpa.s,
		v: hsvOpa.v,
		a: hsvOpa.a
	});
	emits("updateColor", `#${opacityColor.value.toHex()}`);
};

const onChangeOpacity = (data: EmitColor) => {
	const opacity = calculateOpacityColor(data);
	const hsv = opacityColor.value.toHsv();
	opacityColor.value = new TinyColor({
		h: color.value.toHsl().h,
		s: hsv.s,
		v: hsv.v,
		a: opacity
	});
	emits("updateColor", opacityColor.value.toRgbString());
};

const handleColor = ({ type, value }: HandleColorType) => {
	if (type === "set" && value) {
		color.value = value;
		return null;
	}
	return color.value;
};
const handleHueColor = ({ type, value }: HandleColorType) => {
	if (type === "set" && value) {
		hueColor.value = value;
		return null;
	}
	return hueColor.value;
};
const handleOpacityColor = ({ type, value }: HandleColorType) => {
	if (type === "set" && value) {
		opacityColor.value = value;
		return null;
	}
	return opacityColor.value;
};
const getAllContainer = (): {
	containerRef: Ref<HTMLElement>;
	slideHueRef: Ref<HTMLElement>;
	slideOpaRef: Ref<HTMLElement>;
} => {
	return {
		containerRef: containerRef,
		slideHueRef: slideHueRef,
		slideOpaRef: slideOpaRef
	};
};

defineExpose({
	handleColor,
	handleHueColor,
	handleOpacityColor,
	getAllContainer
});
</script>

<style lang="scss" scoped>
.color-picker-panel {
	border-radius: 5px;
	padding: 5px;
	&-palette {
		width: 280px;
		position: relative;
		height: 150px;
		overflow: hidden;
	}
	&-slide-container {
		width: 100%;
		padding: 10px 0;
		height: 50px;
		display: flex;
		column-gap: 10px;
	}
	&-slide-group {
		width: 250px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		row-gap: 7px;
		.color-picker-panel-slide {
			width: 100%;
			height: 8px;
			border-radius: 10px;
			position: relative;
		}
		.color-hue {
			background: linear-gradient(
				90deg,
				rgb(255, 0, 0) 0%,
				rgb(255, 255, 0) 17%,
				rgb(0, 255, 0) 33%,
				rgb(0, 255, 255) 50%,
				rgb(0, 0, 255) 67%,
				rgb(255, 0, 255) 83%,
				rgb(255, 0, 0) 100%
			);
		}

		.color-opacity {
			background-image: conic-gradient(
				rgba(0, 0, 0, 0.06) 0 25%,
				transparent 0 50%,
				rgba(0, 0, 0, 0.06) 0 75%,
				transparent 0
			);
			background-size: 8px 8px;
		}
		.color-picker-slider-rail {
			width: 100%;
			height: 100%;
			border-radius: 10px;
			.color-picker-container {
				padding: 1px;
				background-color: #eee;
				border-radius: 50%;
			}
		}
	}
	.color-picker-block {
		width: 30px;
		height: 30px;
		border-radius: 5px;
		box-shadow: rgba(0, 0, 0, 0.06) 0px 0px 0px 1px inset;
		&-inner {
			width: 100%;
			height: 100%;
			border-radius: 5px;
			background: conic-gradient(
				rgba(0, 0, 0, 0.03) 0 25%,
				transparent 0 50%,
				rgba(0, 0, 0, 0.03) 0 75%,
				transparent 0
			);
			background-size: 15px 15px;
		}
	}
}
</style>
