/*
 * @Author: wkiwi
 * @Email: w_kiwi@163.com
 * @Date: 2020-09-17 13:47:48
 * @LastEditors: wkiwi
 * @LastEditTime: 2020-09-17 14:03:23
 */
import AuthService from "@/services/auth.service";
import store from "../store/index.js";
// 是否正在重新登陆刷新的标记
var loginRefreshing = false
// 重试队列，每一项将是一个待执行的函数形式
let requests = []

class HttpClient {
  /**
   * Create a new instance of HttpClient.
   */
  constructor() {
    this.interceptors = {
      request: [],
      response: []
    };
  }

  /**
   * Sends a single request to server.
   *
   * @param {Object} options - Coming soon.
   */
  sendRequest(options) {
    let requestOptions = options;

    if (!requestOptions.header) {
      requestOptions.header = {};
    }

    // 重新设置 Accept 和 Content-Type
    requestOptions.header = Object.assign(
      {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json;charset=utf-8'
      },
      requestOptions.header
    );
    this.interceptors.request.forEach((interceptor) => {
      const request = interceptor(requestOptions);
      requestOptions = request.options;
    });

    // 将以 Promise 返回数据, 无 success、fail、complete 参数
    // let response = uni.request(requestOptions);

    // 使用Promise包装一下, 以 complete方式来接收接口调用结果
    let response = new Promise((resolve, reject) => {
			let timeId = setTimeout(()=>{
			  reject({statusCode:504});
			},10000)
      requestOptions.complete = (res) => {
        clearTimeout(timeId)
        const { statusCode } = res;
        const isSuccess = (statusCode >= 200 && statusCode < 300) || statusCode === 304;
        if(statusCode==401){ //无痛刷新token
          if(!loginRefreshing){//防止重复登陆
            loginRefreshing = true
            store.dispatch("auth/logout");
            store
              .dispatch("auth/login")
              .then(()=>{
                //所有存储到对列组中的请求重新执行。
                requests.forEach(callback=>{
                  callback(AuthService.getToken() ? AuthService.getToken() : "")
                })
                //重试队列清空
                requests = []
              })
              .catch(()=>{
                uni.showToast({
                  title: '账户异常请重启程序',
                  duration: 2000,
                  icon: "none",
                }); 
              })
              .finally(()=>{
                //销毁 是否正在重新登陆刷新的标记
                loginRefreshing = false
              });
          }
          return new Promise((resolve) => {
            // 将resolve放进队列，用一个函数形式来保存，等token刷新后直接执行
            requests.push((token) => {
              requestOptions.header.token = token //带着登陆后的新token
              resolve(uni.request(requestOptions))
            })
          })
        }
        if (isSuccess) {
          if(res.data.code==1){
            resolve(res.data);
          }else{
            reject(res);
          }
        } else {
          reject(res);
        }
      };
      requestOptions.requestId = new Date().getTime();
      uni.request(requestOptions);
    });

    this.interceptors.response.forEach((interceptor) => {
      response = interceptor(response);
    });

    return response;
  }
}

export default HttpClient;
