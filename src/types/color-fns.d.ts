// 简单声明（适用于快速修复）
declare module "@swiftcarrot/color-fns";

// 扩展声明（若需具体类型提示）
declare module "@swiftcarrot/color-fns" {
	export function hexToRgb(hex: string): [number, number, number];
	// 添加其他函数声明...
}
