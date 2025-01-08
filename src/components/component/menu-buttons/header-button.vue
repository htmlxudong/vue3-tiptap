<template>
	<a-popover placement="bottom" trigger="click" v-model:open="visible">
		<a-tooltip placement="top">
			<template #title>
				<span> 标题</span>
			</template>
			<div class="tools__button header_button">
				<div class="header_label">
					{{ content }}
				</div>
				<CaretDownOutlined style="font-size: 10px" />
			</div>
		</a-tooltip>
		<template #content>
			<div class="header-lists">
				<div class="header-lists-text header-lists-item" @click="setClassName(0)">
					正文
					<Icon name="correct" v-if="content === '正文'" />
				</div>
				<h1 class="header-lists-h1 header-lists-item" @click="setClassName(1)">
					标题1
					<Icon name="correct" v-if="content === '标题1'" />
				</h1>
				<h2 class="header-lists-h2 header-lists-item" @click="setClassName(2)">
					标题2 <Icon name="correct" v-if="content === '标题2'" />
				</h2>
				<h3 class="header-lists-h3 header-lists-item" @click="setClassName(3)">
					标题3 <Icon name="correct" v-if="content === '标题3'" />
				</h3>
				<h4 class="header-lists-h4 header-lists-item" @click="setClassName(4)">
					标题4 <Icon name="correct" v-if="content === '标题4'" />
				</h4>
			</div>
		</template>
	</a-popover>
</template>

<script setup>
import Icon from "../Icon/src/Icon.vue";
import { computed, ref, watch } from "vue";
import { CaretDownOutlined } from "@ant-design/icons-vue";

const props = defineProps(["modelValue", "editor"]);
const header = ["正文", "标题1", "标题2", "标题3", "标题4"];
const visible = ref(false);
const content = ref("正文");
const setClassName = value => {
	content.value = header[value];
	visible.value = false;
	if (value === 0) {
		props.editor.chain().focus().setParagraph().run();
	} else {
		props.editor.chain().focus().toggleHeading({ level: value }).run();
	}
};
</script>

<style lang="scss">
.header_button {
	width: 65px;
	font-size: 14px;
	padding: 0 4px;
	gap: 5px;
	.header_label {
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
}
.header-lists {
	&-item {
		background-color: transparent;
		transition: all 0.25s ease-out;
		cursor: pointer;
		letter-spacing: 1px;
		padding: 0 5px 3px 5px;
		&:hover {
			background-color: var(--main-primary-background);
		}
		display: flex;
		align-items: center;
		line-height: 1.25;
	}
	&-text {
		font-size: 14px;
	}
	&-h1 {
		font-size: 18px;
		font-weight: 500;
	}
	&-h2 {
		font-size: 18px;
		font-weight: 500;
	}
	&-h3 {
		font-size: 18px;
		font-weight: 500;
	}
	&-h4 {
		font-size: 18px;
		font-weight: 500;
	}
}
</style>
