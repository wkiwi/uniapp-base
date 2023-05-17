import { UserService } from '../../services/api.service';
import AuthService from '../../services/auth.service';

// action types
const TYPES = {
  SET_ERROR: 'SET_ERROR', // 错误
  SET_AUTH: 'SET_AUTH', // 用户认证信息
  CLEAR_AUTH: 'CLEAR_AUTH' ,// 清除认证信息
	TOKEN: ''//token
};

// initial state
const state = {
  isAuthenticated: false,
  user: {},
  errors: null
};

// getters
const getters = {
  currentUser(state) {
    return state.user;
  },
  isAuthenticated(state) {
    return state.isAuthenticated;
  }
};

// actions
const actions = {
  // 用户登录
  login({ commit }, user = {}) {
    return new Promise((resolve, reject) => {
      UserService.login(user)
        .then((res) => {
          if(res&&res.data){
            commit(TYPES.SET_AUTH, res.data.data);
          }
          resolve(res);
        }).catch((res) => {
          if(res&&res.data){
            commit(TYPES.SET_ERROR, `${res.data.msg}`);
          }
          reject(res);
        });
    });
  },
  // 注销
  logout({ commit }) {
    commit(TYPES.CLEAR_AUTH);
  },
  // 注册
  async signup({ commit }, user = {}) {
    await UserService.signup(user)
      .then((res) => {
        commit(TYPES.SET_AUTH, res.data.user);
      })
      .catch((error) => {
        commit(TYPES.SET_ERROR, error.message);
      });
  },
  // 验证Token是否有效

  // 验证Token是否有效
  async check_auth({ commit }) {
    if(Object.keys(AuthService.get()).length == 0) {
      commit(TYPES.CLEAR_AUTH);
    } else {
      try {
        const user = await AuthService.get();
        if(user.token) {
          commit(TYPES.SET_AUTH, user);
        }
      } catch (e) {
        commit(TYPES.SET_ERROR, 'Token认证失效~');
      }
    }
  }
};

// mutations
const mutations = {
  [TYPES.SET_ERROR](state, error) {
    state.errors = error;
  },
  [TYPES.SET_AUTH](state, user) {
    state.isAuthenticated = true;
    state.user = user;
    state.errors = {};
    AuthService.set(state.user);
  },
  [TYPES.CLEAR_AUTH](state) {
    state.isAuthenticated = false;
    state.user = {};
    state.errors = {};
    AuthService.logout();
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
