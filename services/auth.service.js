/*
 * @Author: wkiwi
 * @Email: w_kiwi@163.com
 * @Date: 2020-09-17 13:47:48
 * @LastEditors: wkiwi
 * @LastEditTime: 2020-09-17 13:51:33
 */
/* eslint-disable */

class AuthService {
  constructor() {
    this.auth = this.get();
  }

  set(auth) {
		try {
			uni.setStorageSync('auth', auth);
		} catch (error) {
		  console.log(`setStorageSync调用失败`);
		}
  }
	
	setToken(token) {
		try {
			uni.setStorageSync('token', token);
		} catch (error) {
		  console.log(`setStorageSync调用失败`);
		}
	}
	
  get() {
		try {
			const auth = uni.getStorageSync('auth');
			return auth || {};
		} catch (error) {
		  console.log(`getStorageSync调用失败`);
		}
  }
	
	getToken(){
		try {
			const token = uni.getStorageSync('token');
			return token || '';
		} catch (error) {
		  console.log(`getStorageSync调用失败`);
		}
	}
	
	getAppName(){
		try {
			const appName = uni.getStorageSync('appName');
			return appName || '';
		} catch (error) {
		  console.log(`getStorageSync调用失败`);
		}
	}
	
	setAppName(appName){
		try {
			uni.setStorageSync('appName', appName);
		} catch (error) {
		  console.log(`setStorageSync调用失败`);
		}
	}
	
  clear() {
		try {
			this.auth = {};
			uni.removeStorageSync('auth');
			uni.removeStorageSync('token');
		} catch (error) {
		  console.log(`getStorageSync调用失败`);
		}
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
