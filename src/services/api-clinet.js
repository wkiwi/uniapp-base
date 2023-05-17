import HttpClient from '../common/http-client';
import AuthService from './auth.service';
import store from "../store/index.js";

class ApiClient {
  /**
   * Create a new instance of ApiClient.
   */
  constructor() {
    
    this.http = new HttpClient();
    
    this.http.interceptors.request.push((options) => {
      let nextOptions = options;
      // console.log('拦截HTTP请求处理结果: ', nextOptions);
      if (AuthService.auth) {
        nextOptions.header.Authorization = `Bearer ${AuthService.auth}`;
      }

      // nextOptions.header['X-USER-APP-VERSION'] = `${AuthService.auth.version}`;
      return {
        options: nextOptions,
      };
    });

    this.http.interceptors.response.push((response) => {
      // console.log('拦截HTTP响应处理结果: ', response);
      response
        .then((res) => {
          return res;
        })
        .catch((error)  => {
          let err = error;
          if (err) {
            switch (err.statusCode) {
              case 200:
                err.message = err.data.message;
                break;
              case 400:
                err.message = "请求错误(400)";
                break;
              case 401:
                // 401: 未登录或Token过期 对用户进行提示
                // 未登录则跳转登录页面，并携带当前页面的路径
                // 在登录成功后返回当前页面，这一步需要在登录页操作。
                // uni.navigateTo({
                //   url: 'login'
                // });
                err.message = "未授权，请重新登录(401)";
                break;
              case 403:
                err.message = "拒绝访问(403)";
                break;
              case 404:
                err.message = "请求错误(404)";
                break;
              case 500:
                err.message = "服务器错误(500)";
                break;
              case 501:
                err.message = "服务器未实现服务(501)";
                break;
              case 502:
                err.message = "网络错误(502)";
                break;
              case 503:
                err.message = "服务不可用(503)";
                break;
              case 504:
                err.message = "网络超时(504)";
                break;
              case 505:
                err.message = "HTTP版本不受支持(505)";
                break;
              default:
                err.message = `错误类型[${err.statusCode ? err.statusCode : "未知"}]`;
            }
          } else {
            err.message = "连接到服务器失败";
          }
          uni.showToast({
            title: err.message,
            duration: 2000,
            icon: "none",
          });
          return err;
        });
      return response;
    });
  }

  request(options) {
    if(!store.getters['app/getIsConnected']){
      uni.showToast({
        title: '请检查网络',
        duration: 2000,
        icon: "none",
      });
      return new Promise((resolve, reject) => {
        reject('请检查网络')
      })
    }

    return this.http.sendRequest(options);
  }

  /**
   * get方法，对应get请求
   * @param {String} url [请求的url地址]
   * @param {Object} data [请求时携带的参数] 对于 GET 方法，会将数据自动转换为 query string
   */
  get(url, data, options) {
    if (!options) {
      options = {};
    }
    options.url = url;
    options.data = data;
    options.method = 'GET';
    return this.request(options);
  }

  /**
   * post方法，对应post请求
   * @param {String} url [请求的url地址]
   * @param {Object} data [请求时携带的参数]
   */
  post(url, data, options) {
    if (!options) {
      options = {};
    }
    options.url = url;
    options.data = data;
    options.method = 'POST';
    return this.request(options);
  }

  put(url, data, options) {
    if (!options) {
      options = {};
    }
    options.url = url;
    options.data = data;
    options.method = 'PUT';
    return this.request(options);
  }

  delete(url, data, options) {
    if (!options) {
      options = {};
    }
    options.url = url;
    options.data = data;
    options.method = 'DELETE';
    return this.request(options);
  }
}

const getApiClient = () => {
  return new ApiClient();
};

export { getApiClient };
export default new ApiClient();
