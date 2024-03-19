<template>
	<a-modal
		v-model:open="open"
		:title="options.title"
		@ok="handleOk"
		okText="插入"
		cancelText="取消"
	>
		<a-form :model="forms" ref="formRef">
			<template v-if="options.headers.length">
				<a-form-item
					v-bind="item.formItem"
					v-for="item in options.headers"
					:key="item.formItem.name"
				>
					<component
						:is="`a-${item.component.name}`"
						v-model:value="forms[item.formItem.name]"
						v-bind="item.component"
					>
						<template v-if="item.component.name === 'select' && item.options">
							<a-select-option
								v-for="option in item.options"
								:key="option.value"
								:value="option.value"
							>
								{{ option.label }}
							</a-select-option>
						</template>
						<template v-if="item.component.name === 'radio-group' && item.options">
							<a-radio
								v-for="(option, index) in item.options"
								:key="index"
								:value="option.value"
								:options="item.options"
								>{{ option.label }}</a-radio
							>
						</template>
					</component>
				</a-form-item>
			</template>

			<slot />
		</a-form>
	</a-modal>
</template>

<script setup>
import { ref, reactive } from "vue";

const props = defineProps(["options"]);

const formRef = ref();
const forms = reactive({});
const open = ref(false);
const emit = defineEmits(["emitInsert"]);

const showModal = () => {
	forms["url"] = "";
	open.value = true;
};
const closeModal = () => {
	open.value = false;
};

const handleOk = e => {
	formRef.value.validateFields().then(res => {
		emit("emitInsert", forms);
		closeModal();
	});
};

defineExpose({
	showModal,
	closeModal
});
</script>

<style lang="scss" scoped>
.x_flex {
	display: flex;
	justify-content: end;
	gap: 20px;
}
</style>
