<template>
	<div class="find-replace" v-if="visible" :style="style">
		<div class="find-header">
			<div class="icon-left">
				<div class="icon" ref="el"><DragOutlined /></div>
				<div class="tabs">
					<span :class="['tab', activeKey === 1 ? 'tab_active' : '']" @click="toggleTab(1)"
						>查找</span
					>
					<span :class="['tab', activeKey === 2 ? 'tab_active' : '']" @click="toggleTab(2)"
						>替换</span
					>
				</div>
			</div>
			<div class="icon" @click="handleClose">
				<CloseOutlined />
			</div>
		</div>

		<div class="search-card">
			<div class="input">
				<a-input
					v-model:value="searchTerm"
					placeholder="搜索内容"
					@keyup.enter="performSearch"
					@change="performSearch"
				>
					<template #suffix>
						<span style="color: #409eff">{{ currentCount }}/{{ totalCount }} </span>
					</template>
				</a-input>
			</div>

			<div class="input" v-show="activeKey === 2">
				<a-input v-model:value="replaceTerm" placeholder="替换为" />
			</div>

			<div class="search-action">
				<a-button @click="findPrevious">上一个</a-button>
				<a-button @click="findNext">下一个</a-button>
				<a-button @click="replace">替换</a-button>
				<a-button @click="replaceAll">全部替换</a-button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { CloseOutlined, DragOutlined } from "@ant-design/icons-vue";
import { ref } from "vue";
import { useDraggable } from "@vueuse/core";
import { useTemplateRef } from "vue";
import emitter from "@/utils/EventEmitter";
import { debounce } from "lodash-es";

interface optionsType {
	activeIndex: number;
	decorations: [];
}

const props = defineProps(["modelValue", "editor", "visible", "closeModal"]);

const el = useTemplateRef<HTMLElement>("el");
const searchTerm = ref("");
const replaceTerm = ref("");
const totalCount = ref(0);
const currentCount = ref(0);

emitter.on("search", (data: optionsType) => updateStatus(data));

const updateStatus = (options: optionsType) => {
	totalCount.value = options.decorations.length;
	currentCount.value = options.activeIndex + 1;
};

const findNext = () => {
	props.editor.chain().findNext().search(searchTerm.value).run();
};

const findPrevious = () => {
	props.editor.chain().findPrev().search(searchTerm.value).run();
};

const replace = () => {
	props.editor.chain().replace(replaceTerm.value).run();
};

const replaceAll = () => {
	props.editor.chain().replaceAll(replaceTerm.value).run();
};

const performSearch = debounce(() => {
	props.editor.chain().search(searchTerm.value).run();
}, 1000);

const handleClose = () => {
	clearStatus();
	props.closeModal();
};

const clearStatus = () => {
	props.editor.chain().clearSearch().run();
	totalCount.value = 0;
	currentCount.value = 0;
	replaceTerm.value = "";
	searchTerm.value = "";
};

// draggable modal
const { x, y, style } = useDraggable(el, {
	initialValue: { x: 100, y: 100 }
});

const activeKey = ref(1);
const toggleTab = (activeIndex: number) => {
	activeKey.value = activeIndex;
};
</script>

<style lang="scss" scoped>
.find-replace {
	position: fixed;
	left: 0;
	top: 0;
	z-index: 110;
	padding: 10px;
	width: 490px;
	border: 1px solid #eee;
	background-color: #fff;
	border-radius: 5px;

	.find-header {
		display: flex;
		justify-content: space-between;
		border-bottom: 1px solid #eee;
		padding-bottom: 2px;
		.icon-left {
			width: 130px;
			display: flex;
			align-items: center;
			gap: 10px;
			.tabs {
				font-size: 14px;
				line-height: 20px;
				height: 100%;
				.tab {
					padding: 3px;
					margin-right: 10px;
					cursor: pointer;
					color: rgba(0, 0, 0, 0.5);
				}
				& > .tab_active {
					border-bottom: 2px solid #333;
					color: #000;
				}
			}
		}
		.icon {
			font-size: 18px;
			color: rgba(0, 0, 0, 0.45);
			transition: all 0.2s;
			cursor: pointer;
			&:hover {
				color: #333;
			}
		}
	}

	.search-card {
		padding-top: 10px;
		.input {
			padding: 5px 0;
		}
		.search-action {
			padding: 10px 0;
			display: flex;
			align-items: center;
			gap: 10px;
		}
	}
}
</style>
