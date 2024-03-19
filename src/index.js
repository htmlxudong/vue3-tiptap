import XTiptap from "./components/index.vue";

const XTiptapPlugin = {
	install(app) {
		app.component("x-tiptap", XTiptap);
	}
};

export { XTiptapPlugin, XTiptap };

export default XTiptapPlugin;
