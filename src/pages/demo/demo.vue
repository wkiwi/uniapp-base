<!--
 * @Author: wkiwi
 * @Email: w_kiwi@163.com
 * @Date: 2019-05-31 14:32:43
 * @LastEditors: wkiwi
 * @LastEditTime: 2019-11-05 20:58:40
 -->
<template>
  <view class="content">
    <view class="uni-padding-wrap uni-common-mt">
      <view class="uni-textarea uni-common-mt">
        <textarea :value="res"></textarea>
      </view>
      <view class="uni-btn-v uni-common-mt">
        <button type="primary" @click="sendRequest" :loading="loading">发起请求</button>
        <button type="default" @click="sendRequest1" :loading="loading">发起请求(async/await)</button>
        <button type="default" @click="upload" >上传图片</button>
      </view>
    </view>
  </view>
</template>

<script>
import { UserService } from '../../services/api.service';
import ApiConfig from '../../config/api.config';
import { async } from 'q';

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
    upload:function(){
      let _this = this
      uni.chooseImage({
					count: 9 , //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album','camera'], //从相册选择
					success: async function (res) {
					  await _this.$base.methods.imgUpload({
              imgList:res.tempFilePaths
            })
            .then(res =>{
              let arr = []
              for(let i=0; i < res.length; i++){
                arr.push(res[i].qnyimg)
              }
              let uploadImgList = _this.uploadImgList
              _this.uploadImgList = uploadImgList.concat(arr);
            })
            .catch(err =>{
              console.log(err)
            })
					}
				});
    },
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