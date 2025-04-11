import { ref } from "vue";

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
