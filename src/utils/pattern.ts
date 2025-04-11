import type { Rule } from "ant-design-vue/es/form";
export const validateUrl = async (_rule: Rule, value: string) => {
	if (!value) {
		return Promise.reject(new Error("URL地址不能为空!"));
	} else {
		if (
			!/^(((ht|f)tps?):\/\/)?([^!@#$%^&*?.\s-]([^!@#$%^&*?.\s]{0,63}[^!@#$%^&*?.\s])?\.)+[a-z]{2,6}\/?/.test(
				value
			)
		) {
			return Promise.reject(new Error("请输入正确的URL地址!"));
		} else {
			return Promise.resolve();
		}
	}
};
