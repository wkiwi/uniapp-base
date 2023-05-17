/*
 * @Author: wkiwi
 * @Email: w_kiwi@163.com
 * @Date: 2020-06-02 22:08:03
 * @LastEditors: wkiwi
 * @LastEditTime: 2020-08-04 21:24:55
 */

// 触底加载更多mixin

module.exports = {
  data() {
    return {
      listLoading: false, //列表加载状态
      listPage: 1,
    };
  },
  onPullDownRefresh() {
    this.$debounce.canDoFunction({
      time: 2000,
      immediate: true,
      key: "onPullDownRefresh",
      success: () => {
        this.listPage = 1;
        this.refreshList(); //刷新数据
        setTimeout(() => {
          uni.stopPullDownRefresh();
        }, 1000);
      },
      fail: () => {
        uni.stopPullDownRefresh();
      },
    });
  },
  onReachBottom() {
    this.$debounce.canDoFunction({
      time: 1000,
      immediate: true,
      key: "onReachBottom",
      success: () => {
        if(this.listPage==0){
          return
        }
        this.listLoading = true
        this.getNextList(); //加载下一页数据
      },
      fail: () => {
      },
    });
  },
};
