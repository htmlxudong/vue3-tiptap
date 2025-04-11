export const _getBase64 = async (file: File): Promise<string> => {
	return new Promise(
		(resolve: (value: string) => void, reject: (error: ProgressEvent<FileReader>) => void) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);

			reader.onload = () => resolve(reader.result as string);
			reader.onerror = error => reject(error);
		}
	);
};

export const clamp = (val: number, min: number, max: number) => {
	if (val < min) {
		return min;
	}
	if (val > max) {
		return max;
	}
	return val;
};
