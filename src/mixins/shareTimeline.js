/*
 * @Author: wkiwi
 * @Email: w_kiwi@163.com
 * @Date: 2020-07-08 10:48:05
 * @LastEditors: wkiwi
 * @LastEditTime: 2020-07-08 11:04:44
 */

//分享到朋友圈mixin

module.exports = {
  onReady() {
    uni.showShareMenu({
      withShareTicket: false,
      menus: ["shareAppMessage", "shareTimeline"],
    });
  },
  onShareTimeline() {
    let title, query, imageUrl, openUserName;
    return this.$base.methods.shareTimeline(
      title,
      query,
      imageUrl,
      openUserName
    );
  },
};
