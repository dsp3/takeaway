import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/css/reset.css'//导入重置样式
//1.导入element-ui组件库
import ElementUi from "element-ui";
//2.引入element-ui的样式表
import 'element-ui/lib/theme-chalk/index.css';
//3.将element引入到Vue中
//导入字体图标样式
import "./assets/fonts/iconfont.css"
// axios
import axios from 'axios'
// mock
import mock from 'mockjs'
//时间
import dayjs from 'dayjs'
import '@/assets/css/loading/loading.css'//等待样式
import VueCropper from 'vue-cropper'//图片剪切组件
import storage from './utils/storage'//localstorage二次封装
Vue.use(ElementUi);
Vue.prototype.$storage = storage
Vue.config.productionTip = false
Vue.prototype.axios = axios;
Vue.filter("dateTime", (val) => dayjs(val).format("YYYY-MM-DD HH:mm:ss"))
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
