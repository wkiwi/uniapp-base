<!--
 * @Author: wkiwi
 * @Email: w_kiwi@163.com
 * @Date: 2020-09-17 13:47:48
 * @LastEditors: wkiwi
 * @LastEditTime: 2023-05-16 18:01:15
-->
<script>
export default {
	onLaunch: function () {
		//#ifdef MP-WEIXIN
    this.$store
      .dispatch("auth/login")
      // .then(res => {
				
      // })
      // .catch(err => {
				
			// }); //调用vueX登陆
    //#endif
		this.getNetworkType()
		this.onNetworkStatusChange()
	},
	onShow: function () {
		console.log('App Show');
	},
	onHide: function () {
		console.log('App Hide');
	},
	methods: {
		/**
		* 初次加载判断网络情况
		* 无网络状态下根据实际情况进行调整
		* @Author: wkiwi
		**/
		getNetworkType() {
			uni.getNetworkType({
				success:res=> {
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
					this.$store.dispatch("app/setNetWork", data); //调用vueX设置网络状态
				}
			});
		},
		/**
		 * 监听网络状态变化
		 * 可根据业务需求进行调整
		 * @Author: wkiwi
		 **/
		onNetworkStatusChange() {
			uni.onNetworkStatusChange((res) => {
				let data = { networkType: res.networkType, isConnected: res.isConnected };
				this.$store.dispatch("app/setNetWork", data); //调用vueX设置网络状态
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
		}
	}
}
</script>

<style>
/*每个页面公共css */
@import './styles/base.css';
@import './styles/aliicon.css';
@import './styles/common.css';
@import './styles/border.css';

</style>
