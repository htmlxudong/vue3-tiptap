export const svgs = import.meta.glob("./svgs/*.svg", { eager: true, as: "raw" });
export const getIcon = name => {
	if (!name) return "";
	return svgs[`./svgs/${name}.svg`];
};
