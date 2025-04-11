import BulletList from "@tiptap/extension-bullet-list";

export interface BulletListType {
	defaultStyle: string;
	keepAttributes: boolean;
	keepMarks: boolean;
	itemTypeName: string;
}

const ListItemName = "listItem";
const TextStyleName = "textStyle";

const CustomBulletList = BulletList.extend<BulletListType>({
	addOptions() {
		return {
			...this.parent?.(),
			defaultStyle: ""
		};
	},
	addAttributes() {
		return {
			bulletStyle: {
				default: this.options.defaultStyle,
				parseHTML: element => element.getAttribute("data-bullet-style"),
				renderHTML: attributes => {
					return {
						"data-bullet-style": attributes.bulletStyle || this.options.defaultStyle
					};
				}
			}
		};
	},
	addCommands() {
		return {
			setBulletStyle: (style: string) => () => {
				this.options.defaultStyle = style;
			},
			toggleBulletList:
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

export default CustomBulletList;
