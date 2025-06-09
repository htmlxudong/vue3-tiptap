import type { Ref } from "vue";

//saturation 饱和度(0~100%) ,反映色相的颜色中混入白色的值,值越大白色越少色相颜色越纯，值越小白色越多色相颜色越淡
// lightness 明度(0~100%),反映色相的颜色中混入的黑色的值，值越小黑色越多颜色更暗(黑)，值越大黑色越少颜色更纯(亮)。
export const calculateColor = ({
	container,
	targetRef,
	offset
}: {
	container: Ref<HTMLElement>;
	targetRef?: Ref<HTMLElement>;
	offset: { x: number; y: number };
}) => {
	const { width, height } = container.value.getBoundingClientRect();
	const saturation = offset.x / width;
	const lightness = 1 - offset.y / height;
	return {
		saturation,
		lightness
	};
};

export const calculateHueColor = ({
	container,
	targetRef,
	offset
}: {
	container: Ref<HTMLElement>;
	targetRef?: Ref<HTMLElement>;
	offset: { x: number; y: number };
}) => {
	const { width, height } = container.value.getBoundingClientRect();
	const hue = Math.floor(360 * (offset.x / width));
	return hue;
};

export const calculateOpacityColor = ({
	container,
	targetRef,
	offset
}: {
	container: Ref<HTMLElement>;
	targetRef?: Ref<HTMLElement>;
	offset: { x: number; y: number };
}) => {
	const { width, height } = container.value.getBoundingClientRect();

	const saturation = offset.x / width <= 0 ? 0 : offset.x / width;

	return saturation;
};

export const colorToPoint = ({
	container,
	s,
	v
}: {
	container: Ref<HTMLElement>;
	s: number;
	v: number;
}) => {
	const { width, height } = container.value.getBoundingClientRect();
	const x = Math.floor(s * width);
	const y = Math.floor((1 - v) * height);

	return { x, y };
};

export const hueToPoint = ({ container, h }: { container: Ref<HTMLElement>; h: number }) => {
	const { width, height } = container.value.getBoundingClientRect();
	const hueX = Math.floor((h / 360) * width);
	return hueX;
};

export const opacityToPoint = ({ container, s }: { container: Ref<HTMLElement>; s: number }) => {
	const { width, height } = container.value.getBoundingClientRect();
	const opaX = s * width;
	return opaX;
};
