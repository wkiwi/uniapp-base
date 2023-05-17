<!--
 * @Author: wkiwi
 * @Email: w_kiwi@163.com
 * @Date: 2019-12-25 14:36:25
 * @LastEditors: wkiwi
 * @LastEditTime: 2023-05-17 09:31:26
 -->
 
<template>
  <view :data-scroll="scrollTop" :data-top="top" class="lazy-image-comp image-container-class" :style="[{background:imgErr?'url('+errorImage+')':placeholder?'url('+placeholder+')':'#eee'}]">
    <image  :class="showed&&!imgErr?'show':''" :style="styles" class="final-image image-class" :src="showed?src:placeholder" :mode="mode" :webp="webp"
      :show-menu-by-longpress="showMenuByLongpress" @load="imgLoad" @error="imgError" />
  </view>
</template>

<script>
  export default {
    props: {
      scrollTop:{ //上划高度
        type: Number,
        default: 0
      },
      windowHeight:{//屏幕高度
        type: Number,
        default: 0
      },
      distance:{//安全距离，距离多少开始预加载
        type: Number,
        default: 0
      },
      destroy:{//是否上划一定距离销毁释放已下载的图片
        type: Boolean,
        default: false
      },
      src: {//实际图片链接
        type: String,
        default: ''
      },
      placeholder: {//占位图图片链接
        type: String,
        default: ''
      },
      mode: {//图片显示模型
        type: String,
        default: 'aspectFill'
      },
      webp: {
        type: Boolean,
        default: false
      },
      showMenuByLongpress: {//是否长按显示菜单
        type: Boolean,
        default: false
      },
      styles: {//自定义样式
        type: String,
        default: ''
      },
    },
    name: 'wkiwi-lazy-img',
    data() {
      return {
        showed: false,
        errorImage: 'https://img-blog.csdnimg.cn/20191226104716638.png', //加载失败的占位图
        imgErr: false, //图片是否加载失败
        top:0,
        bottom:0,
      };
    },
    watch:{
      scrollTop:function(){
        this.switchImg()
      }
    },
    mounted: function() {
      let _this = this
      _this.showed=false
      this.$nextTick(() => {
        this.calculateItemHeight()
      })
    },
    methods: {
      calculateItemHeight:function(){
        let _this = this
        const query = uni.createSelectorQuery().in(this);
        query.select('.lazy-image-comp').boundingClientRect(data => {
          _this.top = data.top+_this.scrollTop
          _this.bottom = data.bottom + _this.scrollTop
          if(data.top<_this.windowHeight+_this.distance){//首屏自动加载
            _this.showed = true
          }
        }).exec();
      },
      switchImg:function(){//切换占位图与真实图片
        if(this.scrollTop>this.top-this.distance-this.windowHeight){
          if(!this.destroy){
            if(!this.showed){this.showed = true}
            return false;
          }
          if(this.destroy){//需要销毁
            if(this.scrollTop>this.bottom-this.windowHeight*3){//销毁上划一定距离的图片
              if(this.showed){this.showed = false}
            }else{
              if(!this.showed){this.showed = true}
            }
          }
        }
      },
      imgError: function(e) { //图片下载失败
        this.imgErr = true
      },
      imgLoad: function(e) { //图片下载成功
        // console.log('下载成功')
      },
    }
  }
</script>

<style scoped lang="scss">
  .lazy-image-comp{
    width:100%;
    height:100%;
    position:relative;
    background-size:100% 100%;
    background-repeat: no-repeat;
    background-position: center center;
    .image-class{
      width:100%;
      height:100%;
    }
    .final-image{
      opacity:0;
      transition: all 0.5s;
      &.show{
        opacity:1;
      }
    }
  }

</style>
