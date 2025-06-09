<template>
	<div class="table-wrap" v-select>
		<table>
			<tr v-for="r in ROW" :key="r">
				<td class="cell" v-for="c in COLUMN" :key="c"></td>
			</tr>
		</table>
		<div class="select-suspension-modal" ref="selectModal"></div>
	</div>
	<div class="show-row-column">{{ row }} x {{ column }}</div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const ROW = 6;
const COLUMN = 6;
const RECT = 20;
const selectModal = ref<HTMLElement | null>(null);
const row = ref(0);
const column = ref(0);
// const emits = defineEmits(["emitTable"]);
const emits = defineEmits<{
	(event: "emitTable", payload: { row: number; column: number }): void;
}>();
const vSelect = {
	mounted(el: HTMLElement) {
		el.addEventListener("mousemove", e => {
			if (selectModal.value) {
				const { width, height, left, top } = el.getBoundingClientRect();
				const currentX = Math.min(e.clientX - left, width);
				const currentY = Math.min(e.clientY - top, height);

				selectModal.value.style.width = `${Math.abs(currentX)}px`;
				selectModal.value.style.height = `${Math.abs(currentY)}px`;
				selectModal.value.style.left = `${currentX}px`;
				selectModal.value.style.top = `${currentY}px`;

				const selectedItems = el.querySelectorAll(".cell");
				selectedItems.forEach(item => {
					item.classList.remove("selected");
				});
				row.value = Math.min(Math.floor(currentY / RECT) + 1, ROW);
				column.value = Math.min(Math.floor(currentX / RECT) + 1, COLUMN);

				for (let r = 0; r <= row.value - 1; r++) {
					for (let c = 0; c <= column.value - 1; c++) {
						const index = r * ROW + c;
						selectedItems[index].classList.add("selected");
					}
				}
			}
		});
		el.addEventListener("mouseup", () => {
			emits("emitTable", { row: row.value, column: column.value });
			row.value = column.value = 0;
			if (selectModal.value) {
				selectModal.value.style.left = "0px";
				selectModal.value.style.top = "0px";
			}
		});
	},
	unmounted(el: HTMLElement) {
		el.removeEventListener("mousemove", () => {});
		el.removeEventListener("mouseup", () => {});
	}
};
</script>

<style lang="scss">
.table-wrap {
	display: inline-flex;
	position: relative;
	.select-suspension-modal {
		position: absolute;
		opacity: 0.3;
		z-index: 10;
	}
	table {
		border-collapse: collapse;
	}
	table,
	td {
		border: 1px solid rgba(0, 0, 0, 0.06);
	}

	td {
		width: 20px;
		height: 20px;
	}
	.selected {
		background-color: #f1f1f1;
	}
}
.show-row-column {
	padding: 5px 0;
	text-align: center;
}
</style>
