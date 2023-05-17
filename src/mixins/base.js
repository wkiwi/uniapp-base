/*
 * @Author: wkiwi
 * @Email: w_kiwi@163.com
 * @Date: 2020-06-02 21:55:16
 * @LastEditors: wkiwi
 * @LastEditTime: 2020-07-08 10:49:31
 */

//基础mixin
import { mapState, mapActions } from "vuex";

module.exports = {
  computed: {
    ...mapState("auth", {
      userinfo: (state) => state.user,
    }),
  },
  onShareAppMessage() {
    let title, path, imageUrl, openUserName;
    return this.$base.methods.shareContent(title, path, imageUrl, openUserName);
  },
};
