<template>
	<a-popover placement="bottom" trigger="click">
		<template #content>
			<ul class="dropdown">
				<li class="dropdown__opeartion" @click="insertRef.showModal()">
					<PaperClipOutlined style="margin-right: 5px" />插入URL
				</li>
				<li class="dropdown__opeartion" @click="uploadRef.showModal()">
					<CloudUploadOutlined style="margin-right: 5px" />上传图片
				</li>
			</ul>
		</template>
		<a-tooltip placement="top">
			<template #title>
				<span>图片</span>
			</template>
			<div class="tools__button">
				<PictureOutlined style="font-size: 16px; font-weight: 600" />
			</div>
		</a-tooltip>
	</a-popover>
	<InsertImage
		ref="insertRef"
		@emitInsert="handleEmit"
		:options="{ title: '插入图片地址', headers }"
	>
	</InsertImage>
	<UploadImage ref="uploadRef" @emitUpload="handleEmit" :options="{ title: '上传图片' }" />
</template>

<script setup>
import { ref, reactive, inject } from "vue";
import { PictureOutlined, CloudUploadOutlined, PaperClipOutlined } from "@ant-design/icons-vue";
import { validateUrl } from "@/utils/pattern.js";
import InsertImage from "./insert-model/index.vue";
import UploadImage from "./upload-model/index.vue";

const props = defineProps(["editor"]);

const headers = [
	{
		formItem: {
			name: "url",
			rules: [{ required: true, validator: validateUrl, trigger: "blur" }]
		},
		component: {
			name: "input",
			placeholder: "URL of Image"
		}
	}
];

const editorContext = inject("editorContext");
const insertRef = ref();
const uploadRef = ref();
const handleEmit = async ({ url, file, type }) => {
	if (type === "upload") {
		const res = await editorContext.uploadImg(file);
	}
	props.editor.chain().focus().setImage({ src: url }).run();
	uploadRef.value.closeModal();
	insertRef.value.closeModal();
};
</script>

<style lang="scss" scoped>
.dropdown {
	&__opeartion {
		padding: 5px 0;
		cursor: pointer;
		transition: 0.2s;
		&:hover {
			color: #409eff;
		}
	}
}
</style>
