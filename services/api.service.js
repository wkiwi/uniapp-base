import ApiClinet from './api-clinet';
import ApiConfig from '../config/api.config';

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
    return ApiClinet.post(ApiConfig.APP_BASE_API.LOGIN_URL, params);
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
    return ApiClinet.get(ApiConfig.APP_BASE_API.OTHER, params, HeaderTypr); //更改header类型
  },	
};



