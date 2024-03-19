import { ImageDisplay } from "./image";

export const Alignment = {
	left: "left",
	center: "center",
	right: "right",
	justify: "justify"
};

export const ALIGN_PATTERN = new RegExp(
	`(${Alignment.left}|${Alignment.center}|${Alignment.right}|${Alignment.justify})`
);

export const DEFAULT_IMAGE_URL_REGEX =
	/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
export const DEFAULT_IMAGE_WIDTH = 200;
export const DEFAULT_IMAGE_DISPLAY = ImageDisplay.INLINE;
export const LINE_HEIGHT_100 = 1.7;
export const DEFAULT_LINE_HEIGHT = "100%";

export const DEFAULT_VIDEO_WIDTH = 300;

export const enums = {
	INIT: "init",
	TRANSACTION: "transaction",
	FOCUS: "focus",
	BLUR: "blur",
	PASTE: "paste",
	DROP: "drop",
	UPDATE: "update"
};

export const PREVIEW_WINDOW_WIDTH = "80vw";
