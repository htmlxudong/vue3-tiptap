import type { InjectionKey } from "vue";

export interface TiptapProps {
	mode?: "bubble" | "classic" | undefined; // 气泡菜单 | 经典菜单
}

export const IsFullScreenKey = Symbol("isFullScreen");
export const ToggleFullScreenKey = Symbol("toggleFullscreen") as InjectionKey<() => void>;
