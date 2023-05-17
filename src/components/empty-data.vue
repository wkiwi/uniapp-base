<template>
	<view class="empty-data flex flex-column align-center justify-center">
    <view class="icon">
			<image class="img" src="https://img-blog.csdnimg.cn/20200219103750122.png" mode="widthFix"></image>
		</view>
		<view class="title padding-top-20 text-gray text-28">{{title}}</view>
	</view>
</template>

<script>
	export default {
    props:{
      title:{
				type:String,
				default:'暂无数据'
			}
    },
    name:'empty-data'
	}
</script>

<style scoped lang="scss">
 .empty-data{
	 position:absolute;
	 top:40%;
	 left:0;
	 transform: translateY(-50%);
	 width:100%;
	 .icon{
		 width:300upx;
		 height:300upx;
		 .img{
			 width:300upx;
			 height:300upx;
		 }
	 }
 }
</style>
