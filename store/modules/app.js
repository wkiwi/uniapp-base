import ApiService from '../../services/api.service';

// action types
const TYPES = {
  SET_ERROR: 'SET_ERROR', // 错误
  SET_THEME: 'SET_THEME' // 设置皮肤
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
  }
};

// mutations
const mutations = {
  [TYPES.SET_ERROR](state, error) {
    state.errors = error;
  },
  [TYPES.SET_THEME](state, theme) {
    state.theme = theme;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
