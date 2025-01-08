import { OrderedList } from "@tiptap/extension-ordered-list";

const CustomOrderedList = OrderedList.extend({
	addOptions() {
		return {
			...this.parent?.(),
			defaultStyle: ""
		};
	},
	addAttributes() {
		return {
			orderedStyle: {
				default: this.options.defaultStyle,
				parseHTML: element => element.getAttribute("data-ordered-style"),
				renderHTML: attributes => ({
					"data-ordered-style": attributes.orderedStyle || this.options.defaultStyle
				})
			}
		};
	},
	addCommands() {
		return {
			setOrderedStyle:
				style =>
				({ commands }) => {
					this.options.defaultStyle = style;
				},
			toggleOrderedList:
				() =>
				({ commands, chain }) => {
					if (this.options.keepAttributes) {
						return chain()
							.toggleList(this.name, this.options.itemTypeName, this.options.keepMarks)
							.updateAttributes(ListItemName, this.editor.getAttributes(TextStyleName))
							.run();
					}
					return commands.toggleList(this.name, this.options.itemTypeName, this.options.keepMarks);
				}
		};
	}
});

export default CustomOrderedList;
