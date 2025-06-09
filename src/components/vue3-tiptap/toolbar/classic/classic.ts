import type { Component } from "vue";

export interface OptionProps {
	name: string;
	component: Component;
	tip: string;
	click: () => void;
	dblclick?: () => void;
	active: boolean;
}
