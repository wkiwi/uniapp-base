<template>
  <view class="mask" :class= "mask == 'true' || mask == true ? 'mask-show' : ''" @click="Mclose" v-if="show">
		<!-- 加载动画开始 -->    <!-- loading1~loading30挑选任意一个替换下方html 且替换对应css -->
    <view class="loader">
      <view class="loading-square"></view>
      <view class="loading-square"></view>
      <view class="loading-square"></view>
      <view class="loading-square"></view>
    </view>
		<!-- 加载动画结束 -->
		<!-- <view class="title" v-if="text">{{text}}</view> -->
  </view>
  <!-- 遮罩层-->
</template>

<script scoped="true">
export default {
  name: "wkiwi-loading",
	props:{
		text: String,
		mask: Boolean | String,
		click: Boolean | String,
	},
  data() {
    return {
			show: false
		};
  },
	methods:{
		Mclose(){
			if(this.click == 'false' || this.click == false){
				this.show = false
			}
		},
		open(){
			this.show = true
    },
    close(){
      this.show = false
    }
	}
};
</script>

<style>
.mask {
  /* pointer-events: none; */
  position: fixed;
  z-index: 99999;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
	flex-direction:column;
  justify-content: center;
  align-items: center;
	flex-wrap: wrap;
}
.mask.mask-show{
	background: rgba(7, 17, 27, .3);
}
.title{
	color: #fff;
	font-size: 28upx;
}





/* loading加载动画的css */
.loader {
  display: block;
  position: relative;
  height: 20upx;
  width: 86upx;
}

.loading-square {
  position: absolute;
  height: 20upx;
  width: 20upx;
  top: 0;
}

.loading-square:nth-child(1) {
  left: 0;
  animation: square1 1.5s linear forwards infinite;
}

.loading-square:nth-child(2) {
  left: 22upx;
  animation: square2 1.5s linear forwards infinite;
}

.loading-square:nth-child(3) {
  left: 44upx;
  animation: square3 1.5s linear forwards infinite;
}

.loading-square:nth-child(4) {
  left: 66upx;
  animation: square4 1.5s linear forwards infinite;
}

@keyframes square1 {
  0% {
    background-color: #97c900;
    transform: translate(0, 0);
  }
  9.09091% {
    transform: translate(0, calc(-100% - 2upx));
    background-color: #97c900;
  }
  18.18182% {
    transform: translate(calc(100% + 2upx), calc(-100% - 2upx));
    background-color: #15668a;
  }
  27.27273% {
    transform: translate(calc(100% + 2upx), 0);
  }
  100% {
    background-color: #15668a;
    transform: translate(calc(100% + 2upx), 0);
  }
}
@keyframes square2 {
  0% {
    background-color: #15668a;
    transform: translate(0, 0);
  }
  18.18182% {
    transform: translate(0, 0);
  }
  27.27273% {
    transform: translate(0, calc(100% + 2upx));
    background-color: #15668a;
  }
  36.36364% {
    transform: translate(calc(100% + 2upx), calc(100% + 2upx));
    background-color: #d53a33;
  }
  45.45455% {
    transform: translate(calc(100% + 2upx), 0);
  }
  100% {
    background-color: #d53a33;
    transform: translate(calc(100% + 2upx), 0);
  }
}
@keyframes square3 {
  0% {
    background-color: #d53a33;
    transform: translate(0, 0);
  }
  36.36364% {
    transform: translate(0, 0);
  }
  45.45455% {
    transform: translate(0, calc(-100% - 2upx));
    background-color: #d53a33;
  }
  54.54545% {
    transform: translate(calc(100% + 2upx), calc(-100% - 2upx));
    background-color: #e79c10;
  }
  63.63636% {
    transform: translate(calc(100% + 2upx), 0);
  }
  100% {
    background-color: #e79c10;
    transform: translate(calc(100% + 2upx), 0);
  }
}
@keyframes square4 {
  0% {
    transform: translate(0, 0);
    background-color: #e79c10;
  }
  54.54545% {
    transform: translate(0, 0);
  }
  63.63636% {
    transform: translate(0, calc(100% + 2upx));
    background-color: #e79c10;
  }
  72.72727% {
    background-color: #d53a33;
  }
  81.81818% {
    background-color: #15668a;
  }
  90.90909% {
    transform: translate(calc(-300% - 6upx), calc(100% + 2upx));
    background-color: #97c900;
  }
  100% {
    transform: translate(calc(-300% - 6upx), 0);
    background-color: #97c900;
  }
}
</style>
