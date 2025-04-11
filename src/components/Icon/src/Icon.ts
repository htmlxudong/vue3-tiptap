export const svgs: Record<string, string> = import.meta.glob("./svgs/*.svg", {
	eager: true,
	as: "raw"
});
export const getIcon = (name: string): string => {
	const key = `./svgs/${name}.svg`;
	return svgs[key] || "";
};
