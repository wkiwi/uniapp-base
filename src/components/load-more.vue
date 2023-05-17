<template>
  <view
    class="load-more flex align-center justify-center"
    :class="status!='loading'?'load-more-inner':''"
  >
    <view
      v-if="status=='loading'"
      class="loading margin-right-10"
      :class="mode == 'circle' ? 'loading-circle' : 'loading-flower'"
    ></view>
    <view
      class="text text-24"
      @click.stop="loadingMore"
    >{{status=='loading'?loadText.loading: status=='loadmore'?loadText.loadmore:loadText.nomore}}</view>
  </view>
</template>

<script>
export default {
  props: {
    // 动画的类型,flower-花朵状图标，circle-圆圈状图标
    mode: {
      type: String,
      default: "flower"
    },
    //是否处于加载中
    status: {
      //loadmore-加载前 loading-加载中   nomore-没有更多啦
      type: String,
      default: "loading"
    },
    // 显示的文字
    loadText: {
      type: Object,
      default() {
        return {
          loadmore: "点击加载更多",
          loading: "加载中...",
          nomore: "没有更多啦"
        };
      }
    }
  },
  name: "load-more",
  methods: {
    loadingMore() {
      // 只有在“加载更多”的状态下才发送点击事件，
      if (this.status == "loadmore") {
        this.$emit("loadingMore");
      }
    }
  }
};
</script>

<style scoped lang="scss">
.load-more {
  height: 100upx;
  width: 100%;
  &.load-more-inner {
    &::after {
      content: " ";
      border-bottom: 1px solid #d4d4d4;
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
      width: 80upx;
      margin-left: 30upx;
    }
    &::before {
      content: " ";
      border-bottom: 1px solid #d4d4d4;
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
      width: 80upx;
      margin-right: 30upx;
    }
  }
  .text {
    color: #d4d4d4;
  }
}
.loading-circle {
  display: inline-block;
  vertical-align: middle;
  width: 30upx;
  height: 30upx;
  background: 0 0;
  border-radius: 50%;
  border: 2px solid;
  border-color: #e5e5e5 #e5e5e5 #e5e5e5 #8f8d8e;
  animation: circle 1s linear infinite;
}
.loading-flower {
  width: 20px;
  height: 20px;
  display: inline-block;
  vertical-align: middle;
  -webkit-animation: flower 1s steps(12) infinite;
  animation: flower 1s steps(12) infinite;
  background: transparent
    url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+PHBhdGggZmlsbD0ibm9uZSIgZD0iTTAgMGgxMDB2MTAwSDB6Ii8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTlFOUU5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgLTMwKSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iIzk4OTY5NyIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgzMCAxMDUuOTggNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjOUI5OTlBIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDYwIDc1Ljk4IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0EzQTFBMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSg5MCA2NSA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNBQkE5QUEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoMTIwIDU4LjY2IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0IyQjJCMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgxNTAgNTQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjQkFCOEI5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDE4MCA1MCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDMkMwQzEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTE1MCA0NS45OCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDQkNCQ0IiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTEyMCA0MS4zNCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNEMkQyRDIiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTkwIDM1IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0RBREFEQSIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgtNjAgMjQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTJFMkUyIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKC0zMCAtNS45OCA2NSkiLz48L3N2Zz4=)
    no-repeat;
  background-size: 100%;
}
@keyframes flower {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(1turn);
    transform: rotate(1turn);
  }
}
@-webkit-keyframes circle {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
