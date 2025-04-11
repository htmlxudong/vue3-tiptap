import TextStyle, { type TextStyleOptions } from "@tiptap/extension-text-style";

interface CustomTextStyleAttributes {
	fontSize?: number | string | null;
}

const CustomTextStyle = TextStyle.extend<
	TextStyleOptions & {
		addAttributes: () => CustomTextStyleAttributes;
	}
>({
	addAttributes() {
		return {
			...this.parent?.(),
			fontSize: {
				default: null,
				parseHTML: element => element.style.fontSize.replace("px", ""),
				renderHTML: attributes => {
					if (!attributes["fontSize"]) {
						return {};
					}
					return {
						style: `font-size: ${attributes["fontSize"]}px`
					};
				}
			}
		};
	},

	addCommands() {
		return {
			...this.parent?.(),
			setFontSize:
				(fontSize: string) =>
				({ commands, editor }: any) => {
					if (!editor.isActive("heading")) {
						return commands.setMark(this.name, { fontSize: fontSize });
					}
				},
			unsetFontSize:
				() =>
				({ chain }: any) => {
					return chain().setMark(this.name, { fontSize: null }).removeEmptyTextStyle().run();
				}
			// setLineHeight:
			// 	lineHeight =>
			// 	({ commands }) => {
			// 		return commands.setMark(this.name, { lineHeight });
			// 	}
		};
	}
});
export default CustomTextStyle;
