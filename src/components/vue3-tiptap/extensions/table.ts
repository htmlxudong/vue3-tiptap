import TableCell from "@tiptap/extension-table-cell";

const CustomTableCell = TableCell.extend({
	addAttributes() {
		return {
			...this.parent?.(),
			backgroundColor: {
				default: null,
				parseHTML: element => element.getAttribute("data-background-color"),
				renderHTML: attributes => {
					return {
						"data-background-color": attributes.backgroundColor,
						style: `background-color: ${attributes.backgroundColor}`
					};
				}
			}
		};
	}
});

export default CustomTableCell;
