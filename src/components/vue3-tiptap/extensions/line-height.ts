import { Extension } from "@tiptap/core";

export interface LineHeightOptions {
	types: string[];
	heights: string[];
	defaultHeight: string;
}

declare module "@tiptap/core" {
	interface Commands<ReturnType> {
		lineHeight: {
			setLineHeight: (data: string) => ReturnType;
			unsetLineHeight: () => ReturnType;
		};

	}
}

export const LineHeight = Extension.create({
	name: "lineHeight",

	addOptions() {
		return {
			types: ["heading", "paragraph"],
			heights: ["100%", "115%", "150%", "200%", "250%", "300%"],
			defaultHeight: "100%"
		};
	},
	//@ts-ignore
	addGlobalAttributes() {
		return [
			{
				types: this.options.types,
				attributes: {
					lineHeight: {
						default: this.options.defaultHeight,
						parseHTML: (element: HTMLElement) => element.style.lineHeight || this.options.defaultHeight,
						renderHTML: (attributes: { lineHeight: string }) => {
							if (attributes.lineHeight === this.options.defaultHeight) {
								return {};
							}

							return { style: `line-height: ${attributes.lineHeight}` };
						}
					}
				}
			}
		];
	},

	addCommands() {
		return {
			setLineHeight:
				(height: string) =>
					({ commands }) => {
						if (!this.options.heights.includes(height)) {
							return false;
						}

						return this.options.types.every((type: string) =>
							commands.updateAttributes(type, { lineHeight: height })
						);
					},

			unsetLineHeight:
				() =>
					({ commands }) => {
						return this.options.types.every((type: string) => commands.resetAttributes(type, "lineHeight"));
					}
		};
	}
});

export default LineHeight;
