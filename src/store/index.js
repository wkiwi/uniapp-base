import Vue from 'vue';
import Vuex from 'vuex';
import modules from './modules';
import { createLogger } from '../plugins/vue-logger';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules,
  strict: debug,
  plugins: debug ? [createLogger()] : []
});
