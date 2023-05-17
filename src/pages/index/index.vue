<template>
	<view class="page">
		<view>bus事件传值</view>
		<view>{{index}}</view>
		<button @click="add" class="btn">通过bus让组件数字+1</button>
		<button @click="myclick" class="btn">父组件直接调用子组件事件</button>
		<child @multiply = "multiplyEvent" :number="index" ref = 'child'></child>
		
	</view>
</template>

<script>
	import Child from './components/child.vue'
	import { mapState, mapActions } from 'vuex'
	export default {
		data() {
			return {
				index: 2
			}
		},
		components: {Child},
		methods: {
			add(){
				console.log('add')
				this.$bus('add');
			},
			multiplyEvent(data){
				console.log('子组件传值',data)
				this.index *= data;
			},
			myclick(){
				 this.$refs.child.clickme();
			}
		},
		computed: {
			...mapState('auth', {
				userinfo: (state) => state.user,
			})
  	},
	}
</script>

<style>
	.page{
		width: 100%;
		text-align: center;
	}
</style>
