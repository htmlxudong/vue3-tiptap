<template>
	<a-popover placement="bottom" trigger="click">
		<template #content>
			<ul class="dropdown">
				<li class="dropdown__opeartion border_bottom">
					<a-popover placement="right">
						<template #content>
							<div class="x_flex">
								<div class="label">行：</div>
								<div class="input_box">
									<a-input v-model:value="forms['rows']" />
								</div>
							</div>
							<div class="x_flex">
								<div class="label">列：</div>
								<div class="input_box">
									<a-input v-model:value="forms['cols']" />
								</div>
							</div>

							<div class="x_flex justify-center">
								<a-button @click="insertTable"> 插入 </a-button>
							</div>
						</template>

						<div>插入表格</div>
					</a-popover>
				</li>
				<li class="dropdown__opeartion" @click="addRowBefore">添加行before</li>
				<li class="dropdown__opeartion" @click="addRowAfter">添加行after</li>
				<li class="dropdown__opeartion border_bottom" @click="delRow">删除行</li>
				<li class="dropdown__opeartion" @click="addColBefore">添加列before</li>
				<li class="dropdown__opeartion" @click="addColAfter">添加列after</li>
				<li class="dropdown__opeartion border_bottom" @click="delCol">删除列</li>
				<li class="dropdown__opeartion" @click="mergeCells">合并单元格</li>
				<li class="dropdown__opeartion" @click="splitCell">取消合并单元格</li>
			</ul>
		</template>
		<a-tooltip placement="top">
			<template #title>
				<span>表格</span>
			</template>
			<div class="tools__button">
				<TableOutlined style="font-size: 16px; font-weight: 600" />
			</div>
		</a-tooltip>
	</a-popover>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { TableOutlined } from "@ant-design/icons-vue";

const props = defineProps(["editor"]);

const forms = reactive({
	rows: 1,
	cols: 1
});
const emit = defineEmits(["emitTable"]);

const insertTable = () => {
	props.editor
		.chain()
		.focus()
		.insertTable({ ...forms, withHeaderRow: true })
		.run();
};

const addRowBefore = () => {
	props.editor.chain().focus().addRowBefore().run();
};
const addRowAfter = () => {
	props.editor.chain().focus().addRowAfter().run();
};
const delRow = () => {
	props.editor.chain().focus().deleteRow().run();
};

const addColBefore = () => {
	props.editor.chain().focus().addColumnBefore().run();
};
const addColAfter = () => {
	props.editor.chain().focus().addColumnAfter().run();
};
const delCol = () => {
	props.editor.chain().focus().deleteColumn().run();
};

const mergeCells = () => {
	props.editor.chain().focus().mergeCells().run();
};
const splitCell = () => {
	props.editor.chain().focus().splitCell().run();
};
</script>

<style lang="scss" scoped>
.dropdown {
	&__opeartion {
		padding: 5px 10px;
		cursor: pointer;
		transition: 0.2s;
		&:hover {
			color: #409eff;
		}
	}
	.border_bottom {
		border-bottom: 1px solid #eee;
	}
}
.x_flex {
	display: flex;
	align-items: center;
	padding-bottom: 5px;
	gap: 5px;
	width: 120px;
}
.justify-center {
	padding-top: 10px;
	justify-content: center;
}
</style>
