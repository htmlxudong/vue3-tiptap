<template>
	<node-view-wrapper as="div" class="iframe">
		<iframe class="iframe__embed" :src="node.attrs.src" style="border: none"></iframe>
	</node-view-wrapper>
</template>

<script>
import { defineComponent } from "vue";
import { NodeViewWrapper, nodeViewProps } from "@tiptap/vue-3";

export default defineComponent({
	name: "IframeView",
	components: {
		NodeViewWrapper
	},

	props: nodeViewProps
});
</script>

<style scoped lang="scss">
.iframe {
	height: 0;
	padding-bottom: 56.25%;
	position: relative;
	width: 100%;

	&__embed {
		border: 0;
		height: 100%;
		left: 0;
		position: absolute;
		top: 0;
		width: 100%;
	}
}
</style>
