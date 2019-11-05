/*
 * @Author: wkiwi
 * @Email: w_kiwi@163.com
 * @Date: 2019-05-31 09:23:07
 * @LastEditors: wkiwi
 * @LastEditTime: 2019-11-05 21:05:43
 */
import Vue from 'vue';
import App from './App';
import store from './store';
import ApiClinet from './services/api-clinet';
import { VueBus } from './plugins/vue-bus';
import AppConfig from './config/app.config'
import {Base} from './common/utils/base';
Vue.config.productionTip = false;
// 全局事件中心
Vue.use(VueBus);

// 状态, 全局挂载
Vue.prototype.$store = store;
// Ajax请求, 全局挂载
Vue.prototype.$http = ApiClinet;
Vue.prototype.$imgUrl = AppConfig.IMG_URL;
Vue.prototype.$base = new Base();
App.mpType = 'app';

const app = new Vue({
  store,
  ...App
});
app.$mount();
