/*
 * @Author: wkiwi
 * @Email: w_kiwi@163.com
 * @Date: 2019-10-17 12:20:37
 * @LastEditors: wkiwi
 * @LastEditTime: 2023-05-16 14:42:55
 */
class Base {
  constructor() {
    "use strict";
    this.__init();
  }
  /**
   * __init
   */
  __init() {
    this.__initTools();
    this.__initDefaults();
    this.__initMethods();
  }
  /**
   * 初始化工具方法
   */
  __initTools() {
    this.tools = {
      isArray(value) {
        return Array.isArray(value);
      },
      isObject(value) {
        return value !== null && typeof value === "object";
      },
      isNumber(value) {
        return typeof value === "number";
      },
      isDate(value) {
        return Object.prototype.toString.call(value) === "[object Date]";
      },
      isUndefined(value) {
        return typeof value === "undefined";
      },
      toJson(obj, pretty) {
        if (this.isUndefined(obj)) return undefined;
        if (!this.isNumber(pretty)) {
          pretty = pretty ? 2 : null;
        }
        return JSON.stringify(obj, null, pretty);
      },
      serializeValue(value) {
        if (this.isObject(value))
          return this.isDate(value) ? value.toISOString() : this.toJson(value);
        return value;
      },
      encodeUriQuery(value, pctEncodeSpaces) {
        return encodeURIComponent(value)
          .replace(/%40/gi, "@")
          .replace(/%3A/gi, ":")
          .replace(/%24/g, "$")
          .replace(/%2C/gi, ",")
          .replace(/%3B/gi, ";")
          .replace(/%20/g, pctEncodeSpaces ? "%20" : "+");
      },
      paramSerializer(obj) {
        if (!obj) return "";
        let parts = [];
        for (let key in obj) {
          const value = obj[key];
          if (value === null || this.isUndefined(value)) return;
          if (this.isArray(value)) {
            value.forEach(v => {
              parts.push(
                this.encodeUriQuery(key) +
                  "=" +
                  this.encodeUriQuery(this.serializeValue(v))
              );
            });
          } else {
            parts.push(
              this.encodeUriQuery(key) +
                "=" +
                this.encodeUriQuery(this.serializeValue(value))
            );
          }
        }
        return parts.join("&");
      },
      buildUrl(url, obj) {
        const serializedParams = this.paramSerializer(obj);
        if (serializedParams.length > 0) {
          url += (url.indexOf("?") == -1 ? "?" : "&") + serializedParams;
        }
        return url;
      },
      
      /**
       * 格式化时间
       * @param  {Datetime} source 时间对象
       * @param  {String} format 格式
       * @return {String}        格式化过后的时间
       * @example  formatDate (new Date(), 'yyyy-MM-dd hh:mm:ss')
       */
      formatDate(source, format) {
        const o = {
          "M+": source.getMonth() + 1, // 月份
          "d+": source.getDate(), // 日
          "h+": source.getHours(), // 小时
          "m+": source.getMinutes(), // 分
          "s+": source.getSeconds(), // 秒
          "q+": Math.floor((source.getMonth() + 3) / 3), // 季度
          "f+": source.getMilliseconds() // 毫秒
        };
        if (/(y+)/.test(format)) {
          format = format.replace(
            RegExp.$1,
            (source.getFullYear() + "").substr(4 - RegExp.$1.length)
          );
        }
        for (let k in o) {
          if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(
              RegExp.$1,
              RegExp.$1.length === 1
                ? o[k]
                : ("00" + o[k]).substr(("" + o[k]).length)
            );
          }
        }
        return format;
      },
			/**
			 * 多久之前
			 * @param  {String|Number} start_time 时间戳
			 * @return {String}        hh:mm:ss
			 */
			calculateDiffTime(start_time){
				let end_time = Math.round(new Date().getTime()/1000).toString();
				var startTime = 0, endTime = 0
				if (start_time < end_time){
					startTime = start_time
					endTime = end_time
				}else{
					startTime = end_time
					endTime = start_time
				}
				var timeDiff = endTime - startTime
				var hour = Math.floor(timeDiff / 3600);
				(hour < 10) && (hour = '0' + hour); 
				timeDiff = timeDiff % 3600;
				var minute = Math.floor(timeDiff / 60);
				(minute < 10) && (minute = '0' + minute); 
				timeDiff = timeDiff % 60;
				var second = timeDiff;
				(second < 10) && (second = '0' + second);
				return [hour + ":", minute +':', second];
			},
			/**
			 * 生成指定位数的随机字符串
			 * @param  {String|Number} length 位数
			 * @return {String}        
			 */
			getRandStr(length) {
				var _string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";  //26个大写字母
						_string += 'abcdefghijklmnopqrstuvwxyz';  //26个小写字母
						_string += '0123456789-_';  //10个数字、下划线、连字符
				var _temp = '', _length = _string.length - 1;
				for (var i = 0; i < length; i ++) {  //根据指定长度生成随机字符串
						var n = parseInt (Math.random() * _length);  //获取随机数字
						_temp += _string[n];  //映射成字符串
				}
				return _temp;  //返回映射后的字符串
			},
			
			/**
			 * 判断是否为手机号
			 * @param  {String|Number} str 校验字符串
			 * @return {Boolean}        
			 */
			isPhone(str){
				var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
				if (!myreg.test(str)) {
						return false;
				} else {
						return true;
				}
			},
			
			/**
			 * 判断字符长度(英文占1个字符，中文汉字占2个字符)
			 * @param  {String|Number} str 校验字符串
			 * @return {Boolean}        
			 */
			strlen(str){
				var len = 0;
				for (var i=0; i<str.length; i++) {
				 var c = str.charCodeAt(i);
				//单字节加1
				 if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) {
					 len++;
				 }
				 else {
					len+=2;
				 }
				}
				return len;
			}
    };
  }

  /**
   * 初始化工具方法
   */
  __initDefaults() {
    this.defaults = {
      /**
       * 获取元素date-index
       *
       * @param {Object} event 标题
       * @param {String} key 取值key
       * @return {*}
       */
      getDataSet(event, key) {
        return event.currentTarget.dataset[key];
      },
			/**
			 * 预览图片
			 *
			 * @param {Array} imgList 
			 * @param {Number} current 
			 * @return {*}
			 */
			previewImageList(imgList,current) {
				uni.previewImage({
					urls: imgList,
					current:current,
					loop: true,
					indicator:'number',
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							//console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
							return data.tapIndex;
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
			},
			/**
			 * tip小提示
			 * @param {String} title 
			 * @return {*}
			 */
			toast(title,icon){
				uni.showToast({
					title:title,
					icon:icon||"none"
				})
			}
    };
  }

  /**
   * 初始化事件方法
   */
  __initMethods() {
    this.methods = {
      /**
       * 公共分享卡片
       *
       * @param {String} title 标题
       * @param {String} path 路径
       * @param {String} imageUrl 图片url
       * @param {Boolean} openUserName 是否打开username@你
       * @return {*}
       */
      shareContent(title, path, imageUrl, openUserName) {
        let newTitle;
        if (openUserName) {
					console.log(openUserName)
          let username = "";
          try {
            const value = uni.getStorageSync("wxuserinfo");
            if (value) {
              username = value.nickName + "@你,";
            }
          } catch (e) {
            // error
            console.log(e);
          }
          if (title) {
            newTitle = username + title;
          } else {
            newTitle = username + "来【有奖积分】抽取兑换商品吧！";
          }
        } else {
          if (title) {
            newTitle = title;
          } else {
            newTitle = "来【有奖积分】抽取兑换商品吧！";
          }
        }
        var raw = {
          title: newTitle,
          path: path ? path : "/pages/index/index",
          imageUrl: imageUrl
            ? imageUrl
            : "https://img-blog.csdnimg.cn/20191012134534112.jpg"
        };
        return raw;
      },
      /**
       * 公共拷贝方法
       *
       * @param {String} str 标题
       * @return {*}
       */
      setClipboardData(str) {
        uni.setClipboardData({
          data: str,
          success: function() {
            uni.showToast({
              title: "拷贝成功",
              icon: "success"
            });
          },
          fail: function() {
            uni.showToast({
              title: "拷贝失败",
              icon: "none"
            });
          }
        });
      }
    };
  }
}
export { Base };
