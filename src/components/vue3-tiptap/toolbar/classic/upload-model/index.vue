<template>
	<a-modal v-model:open="open" :title="options.title">
		<a-form-item>
			<a-upload-dragger v-model:fileList="fileList" name="file" :before-upload="beforeUpload"
				:show-upload-list="false" :auto-upload="false">
				<p class="ant-upload-drag-icon">
					<inbox-outlined></inbox-outlined>
				</p>
				<p class="ant-upload-text">Click or drag file to this area to upload</p>
				<p class="ant-upload-hint">
					Support for a single or bulk upload. Strictly prohibit from uploading company data or
					other band files
				</p>
			</a-upload-dragger>
		</a-form-item>
		<slot />
		<template #footer> </template>
	</a-modal>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { InboxOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import { _getBase64 } from "@/utils";

const open = ref(false);
const emit = defineEmits(["emitUpload"]);
const props = defineProps(["options"]);
const { fileType } = props.options;

const showModal = () => {
	open.value = true;
};
const closeModal = () => {
	open.value = false;
};

const fileList = ref([]);
const beforeUpload = async (file: File) => {
	const isVideoType = file.type === "video/mp4";
	const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
	const isPDF = file.type === "application/pdf";

	// const reg = new RegExp(fileType, "ig");
	// if (!reg.test(file.type)) {
	// 	message.error("请上传视频格式文件");
	// 	return false;
	// }

	// if (isJpgOrPng || isVideoType || isPDF) {
	// 	const imgBase64 = await _getBase64(file);
	// 	emit("emitUpload", { url: imgBase64, file, type: "upload" });
	// }

	const imgBase64 = await _getBase64(file);
	emit("emitUpload", { url: imgBase64, file, type: "upload" });

	return false;
};

defineExpose({
	showModal,
	closeModal
});
</script>

<style lang="scss" scoped></style>
