<template>
	<div class="color-picker-input-container">
		<div class="picker-input">
			<div class="color-rgb-hex">
				<a-input
					v-model:value="forms['hex']"
					:maxlength="6"
					style="width: 80px"
					size="small"
					@change="changeHex"
				>
					<template #prefix><span>#</span></template>
				</a-input>
			</div>
			<div class="color-rgb-name">Hex</div>
		</div>

		<div class="picker-input">
			<div>
				<a-input v-model:value="forms['r']" :maxlength="3" size="small" @change="changeRGB" />
			</div>
			<div class="color-rgb-name">R</div>
		</div>
		<div class="picker-input">
			<div>
				<a-input v-model:value="forms['g']" :maxlength="3" size="small" @change="changeRGB" />
			</div>
			<div class="color-rgb-name">G</div>
		</div>
		<div class="picker-input">
			<div>
				<a-input v-model:value="forms['b']" :maxlength="3" size="small" @change="changeRGB" />
			</div>
			<div class="color-rgb-name">B</div>
		</div>
	</div>
</template>

<script setup>
import { computed, ref, reactive, provide } from "vue";
import { TinyColor } from "@ctrl/tinycolor";

const emit = defineEmits(["emitInput"]);
const props = defineProps(["forms"]);

const changeHex = event => {
	const val = event.target.value;
	const regx = /([0-9A-Fa-f]{3}){1,2}$/;
	if (val.length !== 6 || !regx) {
		return;
	}

	const { h, s, v } = new TinyColor(val).toHsv();
	emit("emitInput", { h, s, v, type: "hex" });
};

const changeRGB = event => {
	const val = event.target.value;
	if (val.length !== 3) {
		return;
	}
	const { h, s, v } = new TinyColor(
		`rgb(${props.forms["r"]}, ${props.forms["g"]}, ${props.forms["b"]})`
	).toHsv();
	emit("emitInput", { h, s, v, type: "rgb" });
};
</script>

<style lang="scss" scoped>
.color-picker-input-container {
	display: flex;
	column-gap: 8px;
	.picker-input {
		.color-rgb-name {
			font-size: 14px;
			padding-top: 5px;
			text-align: center;
			color: rgb(96, 98, 102);
		}
	}
}
</style>
