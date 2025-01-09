<template>
	<a-popover placement="bottom" trigger="click" v-model:open="visible">
		<template #content>
			<ul class="dropdown" ref="containerRef">
				<li class="dropdown__opeartion border_bottom">
					<a-popover placement="right">
						<template #content>
							<TableSheet @emitTable="onEmitTable" />
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
import { reactive, ref } from "vue";
import { TableOutlined } from "@ant-design/icons-vue";
import TableSheet from "./table-sheet.vue";
import { onClickOutside } from "@vueuse/core";

const props = defineProps(["editor"]);

const visible = ref(false);
const emit = defineEmits(["emitTable"]);
const containerRef = ref();

const onEmitTable = ({ row, column }) => {
	props.editor.chain().focus().insertTable({ rows: row, cols: column, withHeaderRow: true }).run();
};

onClickOutside(containerRef, () => {
	visible.value = false;
});

const addRowBefore = () => {
	props.editor.chain().focus().addRowBefore().run();
	visible.value = false;
};
const addRowAfter = () => {
	props.editor.chain().focus().addRowAfter().run();
	visible.value = false;
};
const delRow = () => {
	props.editor.chain().focus().deleteRow().run();
	visible.value = false;
};

const addColBefore = () => {
	props.editor.chain().focus().addColumnBefore().run();
	visible.value = false;
};
const addColAfter = () => {
	props.editor.chain().focus().addColumnAfter().run();
	visible.value = false;
};
const delCol = () => {
	props.editor.chain().focus().deleteColumn().run();
	visible.value = false;
};

const mergeCells = () => {
	props.editor.chain().focus().mergeCells().run();
	visible.value = false;
};
const splitCell = () => {
	props.editor.chain().focus().splitCell().run();
	visible.value = false;
};
</script>

<style lang="scss" scoped>
.dropdown {
	list-style: none;
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
