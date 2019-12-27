<!--
 * @Author: wkiwi
 * @Email: w_kiwi@163.com
 * @Date: 2019-12-25 14:36:25
 * @LastEditors: wkiwi
 * @LastEditTime: 2019-12-26 14:01:15
 -->
<template>
	<view classs="img-compress">
		<!-- <view class="iconfont iconAdd_bule"></view> -->
		<canvas :style="{width:canvasWidth+'px',height:canvasHeight +'px'}" class="canvas" canvas-id="compressCanvasId"></canvas>
	</view>
</template>

<script>
	export default {
		name: 'img-compress',
		props: {
			maxWidth: {
				type: Number,
				default: 750
			},
			ql: {
				type: Number,
				default: 0.4
			},
			number: {
				type: Number,
				default: 1
			},
			size: {
				type: Number,
				default: 200 //500KB    500*1024B
			},
		},
		data() {
			return {
				tempFilePathsList:[], //临时图片列表
				canvasWidth:10,
				canvasHeight:10,
				cpImgList:[],//压缩后图片地址
				chooseImgLength:0,
				timeID:'',
				index: 0
			};
		},
		created() {
		},
		mounted () {
			
		},
		methods: {
			addImg(){
				let _this = this
				uni.chooseImage({
					count: _this.number, //默认9
					sizeType: ['compressed'], //指定是压缩图
					sourceType: ['album','camera'], //从相册选择
					success: function (res) {
						_this.chooseImgLength = res.tempFilePaths.length;
						_this.tempFilePathsList = res.tempFilePaths;	
						_this.cpImg(res.tempFilePaths[_this.index],_this.index+1)//处理第一张
					},
					fail: function (e) {
						// _this._err(e.errMsg)
					}
				});
			},
			cpImg(src,i){//压缩图片
				let _this = this
				uni.showLoading({
				    title: '图片压缩中'+i+ '/' + _this.chooseImgLength
				});
				uni.getImageInfo({
					src: src,
					success: function (image) {
						if(image.type.indexOf('gif') == -1){
							if(image.width < image.height){//竖图
								if(image.width > _this.maxWidth){//宽度过大，等比例缩放
									_this.canvasWidth = _this.maxWidth
									_this.canvasHeight = _this.maxWidth * image.height /image.width
								}else{//没有大于限制，不等比例缩放
									_this.canvasWidth = image.width
									_this.canvasHeight = image.height
								}
							}else{//横图
								if(image.height > _this.maxWidth){//宽度过大，等比例缩放
									_this.canvasHeight = _this.maxWidth
									_this.canvasWidth = _this.maxWidth * image.width /image.height
								}else{//没有大于限制，不等比例缩放
									_this.canvasWidth = image.width
									_this.canvasHeight = image.height
								}
							}
							uni.getFileInfo({
								filePath: src,
								success: function (res) {
									if(res.size /1024 > _this.size){//压缩
										_this._cpImg(src)
									}else{//不压缩直接压入cpImgList
										if(_this.index+1 < _this.chooseImgLength){
											_this.cpImg(_this.tempFilePathsList[_this.index+1],_this.index+2)
											_this.index = _this.index+1;
										}
										_this.cpImgListAdd(src)
									}
								},
								fail: function (e) {
									_this._err(e.errMsg)
								}
							})
						}else{
							_this.cpImgListAdd(image.path)
						}
					},
					fail: function (e) {
						_this._err(e.errMsg)
					}
				});
			},
			_cpImg(img){
				let _this = this
				console.log(img,_this.canvasWidth,_this.canvasHeight)
				const ctx = uni.createCanvasContext('compressCanvasId',this);
				ctx.setFillStyle('#FFFFFF');
				ctx.fillRect(0, 0, parseInt(_this.canvasWidth),parseInt(_this.canvasHeight));
				ctx.save();
				ctx.drawImage(img,0,0,parseInt(_this.canvasWidth),parseInt(_this.canvasHeight));
				ctx.save();
				ctx.draw(false, function(e){
					let timeId = setTimeout(()=>{ //防止安卓出现报错 canvasToTempFilePath:fail:create bitmap failed
						console.log('画完了')
						clearTimeout(timeId)
						uni.canvasToTempFilePath({
							x: 0,
							y: 0,
							width: parseInt(_this.canvasWidth),
							height: parseInt(_this.canvasHeight),
							destWidth: parseInt(_this.canvasWidth),
							destHeight: parseInt(_this.canvasHeight),
							canvasId: 'compressCanvasId',
							fileType: 'jpg',
							quality: Number(_this.ql),
							success: function(res) {
								if(_this.index+1 < _this.chooseImgLength){
									_this.cpImg(_this.tempFilePathsList[_this.index+1],_this.index+2)
									_this.index = _this.index+1;
								}
								_this.cpImgListAdd(res.tempFilePath)
							},
							fail: function(res){
								console.log(res)
								_this._err(res.errMsg)
							}
						},_this)
					}, 400);
				})
			},
			cpImgListAdd(img){//向压缩图片数组添加
				let _this = this
				if(_this.cpImgList.length < _this.chooseImgLength){
					_this.cpImgList.push(img)
					if(_this.cpImgList.length == _this.chooseImgLength){
						uni.hideLoading();
						_this.$emit('result', _this.cpImgList);
						_this.tempFilePathsList=[] //临时图片列表
						_this.canvasWidth=0
						_this.canvasHeight=0
						_this.cpImgList=[]//压缩后图片地址
						_this.index  = 0
					}
				}else{ //向父元素抛出压缩数组，并清除缓存的数据
					uni.hideLoading();
					_this.$emit('result', _this.cpImgList);
					_this.tempFilePathsList=[] //临时图片列表
					_this.canvasWidth=0
					_this.canvasHeight=0
					_this.cpImgList=[]//压缩后图片地址
					_this.index  = 0
				}
			},
			_err(e){
				uni.showToast({
					title: e
				})
			}
		}
	}
</script>

<style lang="scss">
	.canvas{
		position: fixed;
		z-index: -1;
		left: -9999px;
		top: -9999px;
	}
	.iconfont{
		color: #999;
		font-size: 60upx;
	}
</style>
