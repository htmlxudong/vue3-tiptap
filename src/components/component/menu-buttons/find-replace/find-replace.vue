<template>
	<a-popover v-model:open="visible" title="查找" trigger="click" placement="bottom">
		<template #content>
			<SearchCard
				v-model:searchTerm="searchTerm"
				v-model:replaceTerm="replaceTerm"
				:currentMatch="currentMatchIndex"
				:totalMatches="totalMatches"
				@find-next="findNext"
				@find-previous="findPrevious"
				@replace-next="replaceNext"
				@replace-all="replaceAll"
				@search="performSearch"
				@clear="clearSearch"
			/>
		</template>
		<a-tooltip placement="top">
			<template #title>查找</template>
			<div
				:class="['tools__button', editor.isActive('find') ? 'tool--active' : '']"
				@click="visible = !visible"
			>
				<SearchOutlined style="font-size: 16px; font-weight: 600" />
			</div>
		</a-tooltip>
	</a-popover>
</template>

<script setup>
import { useSearchReplace } from "@/hooks/useSearchReplace.js";
import Icon from "../../Icon/src/Icon.vue";
import { computed, ref, watch, inject } from "vue";
import { onClickOutside } from "@vueuse/core";
import SearchCard from "./search-card.vue";
import { SearchOutlined } from "@ant-design/icons-vue";

const props = defineProps(["modelValue", "editor"]);

const popverRef = ref(null);
const visible = ref(false);

const {
	searchTerm,
	replaceTerm,
	currentMatchIndex,
	totalMatches,
	findNext,
	findPrevious,
	replaceNext,
	replaceAll,
	performSearch,
	clearSearch
} = useSearchReplace(ref(props.editor));

watch(
	() => visible.value,
	bool => {
		if (!bool) {
			clearSearch();
			searchTerm.value = "";
			replaceTerm.value = "";
		}
	}
);
</script>

<style lang="scss" scoped>
.header-button-wrap {
	background-color: red;
	height: 20px;
	width: 20px;
}
</style>
