export function findTextInNode(doc, searchTerm) {
	const matches = [];
	if (!searchTerm) return matches;

	let pos = 0;
	doc.descendants((node, nodePos) => {
		if (node.isText) {
			const text = node.text;
			let index = 0;
			while (true) {
				index = text.indexOf(searchTerm, index);
				if (index === -1) break;
				matches.push({
					from: nodePos + index,
					to: nodePos + index + searchTerm.length
				});

				index += 1;
			}
		}
	});

	return matches;
}
