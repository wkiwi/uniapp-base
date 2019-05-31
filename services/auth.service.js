/* eslint-disable */

class AuthService {
  constructor() {
    this.auth = this.get();
  }

  set(auth) {
    uni.setStorageSync('auth', auth);
  }

  get() {
    const auth = uni.getStorageSync('auth');
    return auth || {};
  }

  clear() {
    this.auth = {};
    uni.removeStorageSync('auth');
  }

  index() {
    // 跳转到首页页面
    
  }

  logout() {
    this.clear();
    // 用户注销
    
    // 跳转到登录页面
   
  }
}

export default new AuthService();
