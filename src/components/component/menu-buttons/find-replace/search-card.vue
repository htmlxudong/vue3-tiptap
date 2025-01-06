<template>
	<div class="search-card">
		<div class="search-card-bar">
			<div class="input">
				<a-input v-model:value="searchTerm" placeholder="搜索内容" @keyup.enter="emit('search')" />
			</div>
			<div class="search-card-button">
				<a-button @click="emit('find-previous')">prev</a-button>
				<a-button @click="emit('find-next')">next</a-button>
				<a-button type="text" v-if="totalMatches > 0"
					>{{ currentMatch + 1 }}/{{ totalMatches }}</a-button
				>
			</div>
		</div>

		<div class="search-card-bar">
			<div class="input">
				<a-input v-model:value="replaceTerm" placeholder="替换为" />
			</div>
			<div class="search-card-button">
				<a-button @click="emit('replace-next')">替换</a-button>
				<a-button @click="emit('replace-all')">全部替换</a-button>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, computed, reactive, watch, watchEffect } from "vue";

const emit = defineEmits([
	"update:searchTerm",
	"update:replaceTerm",
	"find-next",
	"find-previous",
	"replace-next",
	"replace-all",
	"search",
	"clear"
]);
const props = defineProps(["searchTerm", "replaceTerm", "currentMatch", "totalMatches"]);

const searchTerm = computed({
	get() {
		return props.searchTerm;
	},
	set(value) {
		emit("update:searchTerm", value);
	}
});
const replaceTerm = computed({
	get() {
		return props.replaceTerm;
	},
	set(value) {
		emit("update:replaceTerm", value);
	}
});
</script>

<style lang="scss" scoped>
.search-card {
	&-bar {
		padding-top: 5px;
		display: flex;
		gap: 5px;
		.input {
			width: 280px;
		}
	}
	&-button {
		display: flex;
		gap: 5px;
	}
}
</style>
