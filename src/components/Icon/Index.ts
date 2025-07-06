// 用来整合组件的  最终实现导出组件
import _Icon from "./src/Icon.vue";
import { withInstall } from "@/utils/with-install";
import type { App } from "vue";

const Icon = withInstall(_Icon);

export default Icon; // 可以通过app.use来使用，也可以通过import方式单独使用

// 为 Vue 应用提供类型声明
declare module 'vue' {
  export interface GlobalComponents {
    Icon: typeof Icon
  }
}
