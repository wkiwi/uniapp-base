/*
 * @Author: wkiwi
 * @Email: w_kiwi@163.com
 * @Date: 2020-09-17 13:47:48
 * @LastEditors: wkiwi
 * @LastEditTime: 2020-09-17 13:54:22
 */
import ApiService from '../../services/api.service';

// action types
const TYPES = {
  SET_ERROR: 'SET_ERROR', // 错误
  SET_THEME: 'SET_THEME', // 设置皮肤
  SET_NETWORK: "SET_NETWORK", //设置网络状态
};

// initial state
const state = {
  theme: null
};

// getters
const getters = {
  getTheme(state) {
    return state.theme;
  }
};

// actions
const actions = {
  // 获取当前主题
  async changeTheme({ commit }, theme) {
    await ApiService.get('app/theme')
      .then((res) => {
        commit(TYPES.SET_THEME, res.data.theme);
      })
      .catch((error) => {
        commit(TYPES.SET_ERROR, error.message);
      });
  },
  // 设置设备网络信息
  setNetWork({ commit }, data) {
    commit(TYPES.SET_NETWORK, data);
  },
};

// mutations
const mutations = {
  [TYPES.SET_ERROR](state, error) {
    state.errors = error;
  },
  [TYPES.SET_THEME](state, theme) {
    state.theme = theme;
  },
  [TYPES.SET_NETWORK](state, data) {
    state.networkType = data.networkType;
    state.isConnected = data.isConnected;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
