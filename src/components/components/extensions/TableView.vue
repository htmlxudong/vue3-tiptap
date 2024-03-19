<template>
	<node-view-wrapper as="div" class="table">
		<table>
			<tr>
				<td>对对对</td>
			</tr>
		</table>
	</node-view-wrapper>
</template>

<script>
import { defineComponent } from "vue";
import { NodeViewWrapper, nodeViewProps } from "@tiptap/vue-3";

export default defineComponent({
	name: "TableView",
	components: {
		NodeViewWrapper
	},

	props: nodeViewProps
});
</script>

<style lang="scss">
.iframe {
	padding: 10px 0;
	position: relative;
	width: 100%;

	&__embed {
		box-sizing: border-box;
		overflow-x: hidden;
		background: transparent;
		border: none;
		min-height: 400px;
		height: 100%;
		width: 100%;
	}
}
</style>
