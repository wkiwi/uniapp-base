/*
 * @Author: wkiwi
 * @Email: w_kiwi@163.com
 * @Date: 2019-05-31 09:42:18
 * @LastEditors: wkiwi
 * @LastEditTime: 2019-11-05 20:59:54
 */
import AppConfig from './app.config';

const { BASE_URL } = AppConfig;

export default {
  BASE_URL,
  // WebSocket
  WEB_SOCKET_URL: 'ws://localhost:4000',

  // 第三方接口
  OPEN_API: {
  
	},

	//我的模块
	APP_MINE_API:{
		MY_USER_INFO: `${BASE_URL}/mine/userinfo`,
		ABOUT:`${BASE_URL}/mine/about`,
	},
	
	APP_BASE_API:{
    QNY_TOKEN: `${BASE_URL}/img/code`,//获取七牛云token
		LOGIN_URL: `${BASE_URL}/login`,
    VALIDATE_TOKEN_URL: `${BASE_URL}/token/validate`,
    SIGNUP_URL: `${BASE_URL}/auth/signup`,
    USER_INFO_URL: `${BASE_URL}/user`,
    USERS_URL: `${BASE_URL}/users`
	}
};
