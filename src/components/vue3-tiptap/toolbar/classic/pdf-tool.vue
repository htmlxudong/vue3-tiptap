<template>
	<a-popover placement="bottom" trigger="click">
		<template #content>
			<ul class="dropdown">
				<li class="dropdown__opeartion" @click="insertRef.showModal()">
					<DisconnectOutlined style="margin-right: 5px" />插入网络PDF
				</li>
				<li class="dropdown__opeartion" @click="insertLocalPdf">
					<CloudUploadOutlined style="margin-right: 5px" />上传本地PDF
				</li>
			</ul>
		</template>
		<a-tooltip placement="top">
			<template #title>
				<span>PDF</span>
			</template>
			<div class="tool">
				<FilePdfOutlined style="font-size: 16px; font-weight: 600" />
			</div>
		</a-tooltip>
	</a-popover>
	<InsertPDF ref="insertRef" @emitInsert="handleEmit"
		:options="{ title: '插入PDF地址', placeholder: 'URL of PDF', headers }">
		<a-form-item name="type" label="插入类型">
			<a-radio-group v-model:value="showType" button-style="solid">
				<a-radio-button :value="1">附件形式</a-radio-button>
				<a-radio-button :value="2">内容形式</a-radio-button>
			</a-radio-group>
		</a-form-item>
	</InsertPDF>
	<UploadPDF ref="uploadRef" @emitUpload="handleEmit" :options="{ title: '上传PDF' }"> </UploadPDF>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { validateUrl } from "@/utils/pattern";
import { FilePdfOutlined, CloudUploadOutlined, DisconnectOutlined } from "@ant-design/icons-vue";
import InsertPDF from "./insert-model/index.vue";
import UploadPDF from "./upload-model/index.vue";
import { _getBase64 } from "@/utils/index";

const emit = defineEmits(["emitPdf"]);
const props = defineProps(["editor"]);

const insertRef = ref();
const uploadRef = ref();

const headers = [
	{
		formItem: {
			name: "url",
			rules: [{ required: true, validator: validateUrl, trigger: "blur" }]
		},
		component: {
			name: "input",
			placeholder: "URL of PDF"
		}
	}
];

const showType = ref(1);
const handleEmit = async ({ url, file, type }: { url: string; file: File; type: string }) => {
	if (type === "upload") {
		const fileName = file.name || 'document.pdf';
		
		const blob = new Blob([file], { type: 'application/pdf' });
		const blobUrl = URL.createObjectURL(blob);
		
		props.editor.chain().focus().setPdf({ 
			src: blobUrl, 
			fileName 
		}).run();
	} else {
		if (showType.value === 1) {
			props.editor.commands.insertContent({
				type: "text",
				text: `附件:${url}`,
				marks: [
					{
						type: "link",
						attrs: {
							href: url
						}
					}
				]
			});
		}
		if (showType.value === 2) {
			if (url.toLowerCase().includes('.pdf') || url.includes('application/pdf')) {
				const fileName = url.split('/').pop() || 'document.pdf';
				props.editor.chain().focus().setPdf({ 
					src: url, 
					fileName 
				}).run();
			} else {
				props.editor.chain().focus().setIframe({ src: url }).run();
			}
		}
	}

	uploadRef.value.closeModal();
	insertRef.value.closeModal();
};

const insertLocalPdf = () => {
	showType.value = 2;
	uploadRef.value.showModal();
};
</script>

<style lang="scss" scoped></style>
