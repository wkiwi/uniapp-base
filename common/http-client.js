/**
 * HTTP Clinet (umi.request)
 */
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
      requestOptions.complete = (res) => {
        const { statusCode } = res;
        const isSuccess = (statusCode >= 200 && statusCode < 300) || statusCode === 304;
        if (isSuccess) {
          resolve(res);
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
