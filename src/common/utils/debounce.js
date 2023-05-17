/*
 * @Author: wkiwi
 * @Email: w_kiwi@163.com
 * @Date: 2020-02-22 10:28:32
 * @LastEditors: wkiwi
 * @LastEditTime: 2020-06-21 22:36:12
 */

// 概念说明：
// 防抖：就是指触发事件后在 n 秒内函数只能执行一次，如果在 n 秒内又触发了事件，则会重新计算函数执行时间。
// 节流：就是指连续触发事件但是在 n 秒中只执行一次函数。

//参数说明
// type (fangdou防抖模式/jieliu节流模式),默认节流(因为上一版用的是节流)
// immediate  是否需要立即执行(true立即执行/false不立即执行),默认立即执行
// key 防抖的关键词(用于标记防抖的关键词,可以通过此关键词连链接任意的事件,比如用户点击立即付款,非常快的又点击了取消订单,两个方法传同样的key即可解决)
// time  防抖时间(多少时间内生效(防抖模式(默认300ms)/节流模式(默认不锁定,需要手动解锁))),

//  this.$debounce.canDoFunction({
// 	time:3000,
//  immediate:true,
// 	key:"orderAction",
// 	success:()=>{
//  由于我传了time，并且立即执行，所以我被console了，且time时间内（3000毫秒）不会重复触发
// 		uni.showToast({
// 			title:'支付订单'
// 		})
// 	},
// 	fail:()=>{
// 		console.log('频繁操作')
// 	}
// })

export default {
  keyList: {},
  canDoFunction(e = {}) {
    e.type = e.type || "jieliu";
    e.immediate = e.immediate === undefined ? true : e.immediate;
    if (e.type == "fangdou") {
      if (e.immediate && !this.keyList[e.key]) {
        e.success && e.success();
      }
      clearTimeout(this.keyList[e.key]);
      this.keyList[e.key] = setTimeout(() => {
        e.success && e.success();
        this.releaseKey(e.key);
      }, e.time || 300);
    } else if (e.type == "jieliu") {
      if (!this.keyList[e.key]) {
        if (e.immediate) {
          this.lockKey(e.key);
          e.success && e.success();
        } else {
          this.lockKey(e.key);
        }
        if (e.time) {
          setTimeout(() => {
            if (!e.immediate) {
              e.success && e.success();
            }
            this.releaseKey(e.key);
          }, e.time);
        }
      } else {
        e.fail && e.fail();
      }
    }
  },
  releaseKey(key) {
    //解锁
    delete this.keyList[key];
  },
  lockKey(key) {
    //上锁
    this.keyList[key] = true;
  },
};
