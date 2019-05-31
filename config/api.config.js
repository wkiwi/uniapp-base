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
		LOGIN_URL: `${BASE_URL}/login`,
    VALIDATE_TOKEN_URL: `${BASE_URL}/token/validate`,
    SIGNUP_URL: `${BASE_URL}/auth/signup`,
    USER_INFO_URL: `${BASE_URL}/user`,
    USERS_URL: `${BASE_URL}/users`
	}
};
