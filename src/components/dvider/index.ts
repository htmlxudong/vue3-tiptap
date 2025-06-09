import Dvider from "./dvider.vue";

export { Dvider };
export default Dvider;

declare module "vue" {
	export interface GlobalComponents {
		dvider: typeof Dvider;
	}
}
