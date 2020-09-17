<!--
 * @Author: wkiwi
 * @Email: w_kiwi@163.com
 * @Date: 2020-09-17 13:47:48
 * @LastEditors: wkiwi
 * @LastEditTime: 2020-09-17 13:57:14
-->
<script>
	export default {
		onLaunch: function() {
			/**
			 * 初次加载判断网络情况
			 * 无网络状态下根据实际情况进行调整
			 * @Author: wkiwi
			 **/
			uni.getNetworkType({
				success(res) {
					const networkType = res.networkType;
					let data = "";
					if (networkType === "none") {
						data = { networkType: "none", isConnected: false };
						wx.showToast({
							title: "当前无网络",
							icon: "loading",
							duration: 2000
						});
					} else {
						data = { networkType: networkType, isConnected: true };
					}
					_this.$store.dispatch("app/setNetWork", data); //调用vueX设置网络状态
				}
			});
			/**
			 * 监听网络状态变化
			 * 可根据业务需求进行调整
			 * @Author: wkiwi
			 **/
			uni.onNetworkStatusChange((res)=> {
				let data = { networkType: res.networkType, isConnected: res.isConnected };
				_this.$store.dispatch("app/setNetWork", data); //调用vueX设置网络状态
				if (!res.isConnected) {
					wx.showToast({
						title: "网络已断开",
						icon: "loading",
						duration: 2000
					});
				} else {
					wx.showToast({ //此处弹出为了防止hideToast报错
						title: "网络已断开",
						icon: "loading",
						duration: 100
					});
					wx.hideToast();
				}
			});
		},
		onShow: function() {
			console.log('App Show');
		},
		onHide: function() {
			console.log('App Hide');
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import './styles/base.css';
	/* uni-app默认全局使用flex布局。因为flex布局有利于跨更多平台，尤其是采用原生渲染的平台。如不了解flex布局，请参考http://www.w3.org/TR/css3-flexbox/。如不使用flex布局，请删除或注释掉本行。*/
	body,
	page {
		min-height: 100%;
		display: flex;
	}

</style>
