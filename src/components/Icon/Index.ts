// 用来整合组件的  最终实现导出组件
import _Icon from "./src/Icon.vue";
import { withInstall } from "@/utils/with-install";

const Icon = withInstall(_Icon);

export * from "./src/Icon";
export default Icon; // 可以通过app.use来使用，也可以通过import方式单独使用
