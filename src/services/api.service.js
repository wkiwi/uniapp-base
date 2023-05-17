/*
 * @Author: wkiwi
 * @Email: w_kiwi@163.com
 * @Date: 2019-05-31 09:47:48
 * @LastEditors: wkiwi
 * @LastEditTime: 2023-05-17 10:03:58
 */
import ApiClinet from './api-clinet';
import ApiConfig from '../config/api.config';
import AppConfig from '../config/app.config'
const ApiService = {
  get(url, data, options) {
    return ApiClinet.get(url, data, options);
  },
  post(url, data, options) {
    return ApiClinet.post(url, data, options);
  },
  put(url, data, options) {
    return ApiClinet.put(url, data, options);
  },
  delete(url, data, options) {
    return ApiClinet.delete(url, data, options);
  }
};

export default ApiService;

const HeaderTypr = {
	header: {
		Accept: '*/*',
		'Content-Type': 'multipart/form-data; charset=utf-8'
	},
};

// 用户管理服务
export const UserService = {
  // 用户登录
  login(params) {
    if (['weixin','qq'].includes(AppConfig.PROVIDER)) {
      //微信或QQ登陆
      return new Promise((resolve, reject) => {
        uni.login({
          provider: AppConfig.PROVIDER,
          success: result=> {
            console.log(result)
            ApiClinet.post(ApiConfig.APP_BASE_API.LOGIN_URL, {
              code: result.code
            })
            .then(res=>{
              resolve(res);
            })
            .catch(err=>{
              resolve(err);
            })
          },
          fail:err=>{
            console.log(err);
          }
        });
      });
    } else {
      //其他登陆方式
      return ApiClinet.post(ApiConfig.APP_BASE_API.LOGIN_URL, params);
    }
  },
	// 查询用户
  get(params) {
    return ApiClinet.get(ApiConfig.APP_BASE_API.USER_INFO_URL, params);
  }
  /*
  // 找回密码
  findPassword(params) {
    return ApiClinet.post(ApiConfig.APP_BASE_API.FIND_PASSWORD_URL, params);
  },
  // 修改密码
  modifyPassword(params) {
    return ApiClinet.post(ApiConfig.APP_BASE_API.MODIFY_PASSWORD_URL, params);
  },
  // 用户注册
  signup(params) {
    return ApiClinet.post(ApiConfig.APP_BASE_API.SIGNUP_URL, params);
  },
  
  */
};

//其他服务模块
export const AppOtherService = {
  getMessageList(params) {
    return ApiClinet.get(ApiConfig.APP_BASE_API.OTHER, params, HeaderType); //更改header类型
  },
  getQnyToken(params){
		return ApiClinet.get(ApiConfig.APP_BASE_API.QNY_TOKEN,params);
	}	
};



