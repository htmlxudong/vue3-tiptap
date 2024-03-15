import Antd from "ant-design-vue";
import "ant-design-vue/dist/reset.css";

const AntdCom = {
	install(app) {
		app.use(Antd);
	}
};

export default AntdCom;
