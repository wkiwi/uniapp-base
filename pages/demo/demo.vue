<template>
  <view class="content">
    <view class="uni-padding-wrap uni-common-mt">
      <view class="uni-textarea uni-common-mt">
        <textarea :value="res"></textarea>
      </view>
      <view class="uni-btn-v uni-common-mt">
        <button type="primary" @click="sendRequest" :loading="loading">发起请求</button>
        <button type="default" @click="sendRequest1" :loading="loading">发起请求(async/await)</button>
      </view>
    </view>
  </view>
</template>

<script>
import { UserService } from '../../services/api.service';
import ApiConfig from '../../config/api.config';

export default {
  data() {
    return {
      loading: false,
      res: ""
    };
  },
  onLoad(option) {
    //this.sendRequest();
    //this.sendRequest1();
  },
  methods: {
    // 方式一
    sendRequest: function() {
      this.loading = true;
			this.$http
				.get(ApiConfig.APP_BASE_API.USER_INFO_URL)
        .then(res => {
          this.loading = false;
          console.log("request success", res);
          uni.showToast({
            title: "请求成功",
            icon: "success",
            mask: true
          });
          this.res = "请求结果: " + JSON.stringify(res);
        })
        .catch(err => {
          this.loading = false;
          console.log("request fail", err);
        });
    },

    //方式二
    async sendRequest1() {
      this.loading = true;
			await UserService.get({id : 1})
        .then(res => {
          this.loading = false;
          console.log("request success", res);
          uni.showToast({
            title: "请求成功",
            icon: "success",
            mask: true
          });
          this.res = "请求结果: " + JSON.stringify(res);
        })
        .catch(err => {
          this.loading = false;
          console.log("request fail", err);
        });
    }
  }
};
</script>

<style lang="scss">
	.content{
		width: 100%;
	}
</style>