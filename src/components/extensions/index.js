// 自定义插件
export { default as FormatBrush } from "./format-brush.js";
export { default as CustomOrderedList } from "./ordered-list.js";
export { default as CustomBulletList } from "./bullet-list.js";

// tiptap 插件
export { default as Highlight } from "@tiptap/extension-highlight";
export { default as TiptapUnderline } from "@tiptap/extension-underline";
export { default as StarterKit } from "@tiptap/starter-kit";
export { default as TextAlign } from "@tiptap/extension-text-align";
export { default as Link } from "@tiptap/extension-link";
export { default as Table } from "@tiptap/extension-table";
export { default as TableHeader } from "@tiptap/extension-table-header";
export { default as TableRow } from "@tiptap/extension-table-row";
export { default as TextStyle } from "@tiptap/extension-text-style";
export { default as FontFamily } from "@tiptap/extension-font-family";


import { Color } from "@tiptap/extension-color";
import { lowlight } from "lowlight";

import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";

export { Color };
export { lowlight };

