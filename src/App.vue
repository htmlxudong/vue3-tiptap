<template>
	<div class="app-wrapper">
		<Header />
		<router-view />
	</div>
</template>

<script setup lang="ts">
import Header from "@/components/header/header.vue";
</script>

<style scoped lang="scss">
.app-wrapper {
	padding-top: 64px;
}
</style>
·