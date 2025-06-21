import { ref } from "vue";
// 弹窗 hooks
export const useModal = () => {
	const visible = ref(false);

	const closeModal = () => {
		visible.value = false;
	};
	const openModal = () => {
		visible.value = true;
	};
	const toggleModal = () => {
		visible.value = !visible.value;
	};
	return {
		closeModal,
		openModal,
		visible,
		toggleModal
	};
};
