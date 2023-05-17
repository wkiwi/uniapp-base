/*
 * @Author: wkiwi
 * @Email: w_kiwi@163.com
 * @Date: 2019-05-31 09:42:18
 * @LastEditors: wkiwi
 * @LastEditTime: 2023-05-17 09:39:51
 */
import AppConfig from './app.config';

const { BASE_URL,WEB_SOCKET_URL } = AppConfig;

export default {
  BASE_URL,
  // WebSocket
  WEB_SOCKET_URL,
  // 第三方接口
  OPEN_API: {
  
	},
	//我的模块
	APP_MINE_API:{
		MY_USER_INFO: `${BASE_URL}/mine/userinfo`,
		ABOUT:`${BASE_URL}/mine/about`,
	},
	//基础接口
	APP_BASE_API:{
		LOGIN_URL: `${BASE_URL}/user/login`,
    VALIDATE_TOKEN_URL: `${BASE_URL}/token/validate`,
    SIGNUP_URL: `${BASE_URL}/auth/signup`,
    USER_INFO_URL: `${BASE_URL}/user`,
    USERS_URL: `${BASE_URL}/users`
	}
};
