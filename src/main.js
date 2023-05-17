/*
 * @Author: wkiwi
 * @Email: w_kiwi@163.com
 * @Date: 2019-05-31 09:23:07
 * @LastEditors: wkiwi
 * @LastEditTime: 2023-05-15 17:54:28
 */
import Vue from 'vue';
import App from './App';
import store from './store';
import ApiClinet from './services/api-clinet';
import { VueBus } from './plugins/vue-bus';
import AppConfig from './config/app.config'
import {Base} from './common/utils/base';
import debounce from "./common/utils/debounce.js";
Vue.config.productionTip = false;
// 全局事件中心
Vue.use(VueBus);

// 状态, 全局挂载
Vue.prototype.$store = store;
// Ajax请求, 全局挂载
Vue.prototype.$http = ApiClinet;
Vue.prototype.$imgUrl = AppConfig.IMG_URL;
Vue.prototype.$debounce = debounce;
Vue.prototype.$base = new Base();
App.mpType = 'app';

import emptyData from "./components/empty-data.vue";
Vue.component("empty-data", emptyData);
//底部加载更多组件
import loadMore from "./components/load-more.vue";
Vue.component("load-more", loadMore);
//自定义加载
import wkiwiLoading from "./components/wkiwi-loading.vue";
Vue.component("wkiwi-loading", wkiwiLoading);

// 引入基础mixin封装
let baseMixin = require("@/mixins/base.js");
Vue.mixin(baseMixin);

const app = new Vue({
  store,
  ...App
});
app.$mount();
