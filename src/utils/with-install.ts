import type { Plugin, App } from "vue";
type SFCWithInstall<T> = T & Plugin;

export const withInstall = <T>(comp: T) => {
	(comp as SFCWithInstall<T>).install = (app: App) => {
		const { name } = comp as unknown as { name: string };
		app.component(name, comp as any);
	};
	return comp as SFCWithInstall<T>;
};
