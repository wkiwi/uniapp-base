import Vue from 'vue';
import App from './App';
import store from './store';
import ApiClinet from './services/api-clinet';
import { VueBus } from './plugins/vue-bus';
import AppConfig from './config/app.config'
Vue.config.productionTip = false;
// 全局事件中心
Vue.use(VueBus);

// 状态, 全局挂载
Vue.prototype.$store = store;
// Ajax请求, 全局挂载
Vue.prototype.$http = ApiClinet;
Vue.prototype.$imgUrl = AppConfig.IMG_URL;
App.mpType = 'app';

const app = new Vue({
  store,
  ...App
});
app.$mount();
