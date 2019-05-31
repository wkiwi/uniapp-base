<template>
	<view class="child">
		组件数值（{{index}}）
		<button @click ="multiplication" class="btn">子组件广播事件给父组件</button>
		父组件props传来的值{{number}}
		
		<view>{{i}}</view>
	</view>
</template>

<script>
	export default {
		name: 'child',
		props:{
			number: Number
		},
		data() {
			return {
				index: 1,
				i:2,
			}
		},
		bus:{
			add(){
				console.log('接收到事件广播');
				this.index++;
			}
		},
		methods: {
			multiplication(){
				console.log('子组件事件广播');
				this.$emit('multiply',3);
			},
			clickme(){
				this.i *=10
			}
		}
	}
</script>

<style>
	.child{
		margin-top: 150upx;
	}
</style>
