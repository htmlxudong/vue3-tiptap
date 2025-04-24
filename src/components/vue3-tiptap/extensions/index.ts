// tiptap 插件
export { default as Underline } from "@tiptap/extension-underline";
export { default as Color } from "@tiptap/extension-color";
export { default as Highlight } from "@tiptap/extension-highlight";
export { default as TextAlign } from "@tiptap/extension-text-align";
export { default as FontFamily } from "@tiptap/extension-font-family";
export { default as Table } from "@tiptap/extension-table";
export { default as TableHeader } from "@tiptap/extension-table-header";
export { default as TableRow } from "@tiptap/extension-table-row";
export { default as Link } from "@tiptap/extension-link";

// 自定义插件
export { default as Images } from "./image";
export { default as Video } from "./video";
export { default as CustomTableCell } from "./table";
export { default as CustomOrderedList } from "./ordered-list";
export { default as CustomBulletList } from "./bullet-list";
export { default as CustomIndent } from "./indent";
export { default as CodeBlockLights } from "./code-block-light";
export { default as searchReplace } from "./search-replace";
export { default as Iframe } from "./iframe";
export { default as CustomTextStyle } from "./text-style";
export { default as FormatBrush } from "./format-brush";
export { default as LineHeight } from "./line-height";


import { createLowlight, common } from "lowlight";

const lowlight = createLowlight(common);

export { lowlight };
