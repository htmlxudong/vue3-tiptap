<template>
	<a-tooltip placement="top">
		<template #title>
			<span>标题</span>
		</template>
		<div class="header_button">
			<a-select v-model:value="title">
				<a-select-option :value="0">正文</a-select-option>
				<a-select-option :value="1">H1</a-select-option>
				<a-select-option :value="2"><span class="header--title">H2</span></a-select-option>
				<a-select-option :value="3"><span class="header--title">H3</span></a-select-option>
				<a-select-option :value="4"><span class="header--title">H4</span></a-select-option>
				<a-select-option :value="5"><span class="header--title">H5</span></a-select-option>
				<a-select-option :value="6"><span class="header--title">H6</span></a-select-option>
			</a-select>
		</div>
	</a-tooltip>
</template>

<script setup>
import { computed, watch } from "vue";

const emit = defineEmits(["update:modelValue", "change"]);
const props = defineProps(["modelValue"]);

const title = computed({
	get: () => props.modelValue,
	set(value) {
		emit("change", value);
		emit("update:modelValue", value);
	}
});
</script>

<style lang="scss" scoped>
.header_button {
	border: 1px solid transparent;
	box-sizing: border-box;
	align-items: center;
	border-radius: 50%;
	color: #303133;
	cursor: pointer;
	display: flex;
	justify-content: center;
	height: 40px;
	margin: 2px;
	outline: 0;
	width: 75px;
	box-sizing: border-box;
	&--title {
		font-size: 17px;
	}
}
::v-deep .ant-select-selector {
	width: 100%;
	border: 1px solid #eee !important;
	border-radius: 5px !important;
}
</style>
