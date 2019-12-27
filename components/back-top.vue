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
    props: {

    },
    data () {
        return {
					show: false
        }
    },
    components: {

    },
		onPageScroll: function(res) {
			let _this = this;
			if(this.timeoutId){
				clearTimeout(this.timeoutId);
			}
			this.timeoutId = setTimeout(function(){ //节流
				res.scrollTop > 900 ? _this.show = true : _this.show = false;
				_this.timeoutId = undefined;
			},10);
		},
    methods: {
        backTop:function(){
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
	.back-top{
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
	.back-bg{
		width: 80upx;
		height: 80upx;
		border-radius: 50%;
		overflow: hidden;
		background: rgba(255,81,0,.8);
		color: #FFFFFF;
		line-height: 80upx;
		text-align: center;
		box-shadow:0upx 0upx 20upx rgba(255,81,0,.7);
	}
	.iconfont{
		font-size: 30upx;
	}
	.back-top.show{
		opacity: 1;
    transform: translateY(-380upx) translateX(0);
	}
</style>
