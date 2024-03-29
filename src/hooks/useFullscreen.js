import { ref, reactive } from "vue";

export const useFullscreen = () => {
	const isFullScreen = ref(false);

	const toggleFullscreen = () => {
		isFullScreen.value = !isFullScreen.value;
	};

	return {
		isFullScreen,
		toggleFullscreen
	};
};
