import { TinyColor } from "@ctrl/tinycolor";
import type { Ref } from "vue";

export class Color extends TinyColor {}

export interface EmitColor {
	container: Ref<HTMLElement>;
	targetRef: Ref<HTMLElement>;
	offset: { x: number; y: number };
	color?: Color;
}

export interface HandleColorType {
	type: string;
	value?: Color;
}

export interface FormsType {
	hex: string;
	r: number;
	g: number;
	b: number;
}
