<!--
 * @Author: wkiwi
 * @Email: w_kiwi@163.com
 * @Date: 2020-09-17 14:04:37
 * @LastEditors: wkiwi
 * @LastEditTime: 2023-05-17 09:30:42
-->
<template>
	<view class="back-top" @click="backTop" :class="show ? 'show' : ''">
		<view class="back-bg">
			<view class="iconfont iconhuidaodingbu"></view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'back-top',
	data() {
		return {
			show: false
		}
	},
	onPageScroll:res=> {
		if (this.timeoutId) {
			clearTimeout(this.timeoutId);
		}
		this.timeoutId = setTimeout(function () { //节流
			res.scrollTop > 900 ? this.show = true : this.show = false;
			this.timeoutId = undefined;
		}, 10);
	},
	methods: {
		backTop() {
			// this.show = false;
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 400
			});
		}
	}
}
</script>

<style scoped >
.back-top {
	position: fixed;
	bottom: -100upx;
	right: 50upx;
	z-index: 99;
	padding: 10upx;
	border-radius: 50%;
	overflow: hidden;
	opacity: 0;
	transition: all .4s ease 0s;
}

.back-bg {
	width: 80upx;
	height: 80upx;
	border-radius: 50%;
	overflow: hidden;
	background: rgba(255, 81, 0, .8);
	color: #FFFFFF;
	line-height: 80upx;
	text-align: center;
	box-shadow: 0upx 0upx 20upx rgba(255, 81, 0, .7);
}

.iconfont {
	font-size: 30upx;
}

.back-top.show {
	opacity: 1;
	transform: translateY(-380upx) translateX(0);
}</style>
