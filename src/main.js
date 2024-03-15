import { createApp } from "vue";

import "./styles/reset.scss";
import "./styles/editor.scss";

import App from "./App.vue";
import AntdCom from "./plugins/antd-vue";
import XTiptapPlugin from "@/components/editor";

const app = createApp(App);
app.use(AntdCom).use(XTiptapPlugin).mount("#app");
