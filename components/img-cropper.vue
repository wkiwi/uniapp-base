<template >
	<view>
		<image  v-if="imgSrc.imgSrc" :src="imgSrc.imgSrc" class="my-avatar" mode="aspectFill" @click="fSelect" :style="imgStyle"></image>
		<view v-if="!imgSrc.imgSrc" :style="imgStyle" class='iconfont ic_jia' @click="fSelect"></view>
		<!-- 上传图片 -->
		<canvas canvas-id="avatar-canvas" id="avatar-canvas" class="my-canvas" :style="{top: styleTop, height: cvsStyleHeight}"
		 disable-scroll="false"></canvas>
		<!-- 截取边框 -->
		<canvas canvas-id="oper-canvas" id="oper-canvas" class="oper-canvas" :style="{top: styleTop, height: cvsStyleHeight}"
		 disable-scroll="false" @touchstart="fStart" @touchmove="fMove" @touchend="fEnd"></canvas>
		<view class="oper-wrapper" :style="{display: styleDisplay}">
			<view class="btn-wrapper" v-if="showOper">
				<view @click="fClose" hover-class="hover">取消</view>
				<view @click="fUpload" hover-class="hover">选取</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "cropper",
		data() {
			return {
				tabHeight:70,
				cvsStyleHeight: '0px',
				styleDisplay: 'none',
				styleTop: '-10000px',
				prvTop: '-10000px',
				imgStyle: {},
				selStyle: {},
				showOper: true,
				imgSrc: {
					imgSrc: ''
				},
				qlty: 0.9,
				postWidthFirst: {},
			};
		},
		watch: {
			avatarSrc() {
				this.imgSrc.imgSrc = this.avatarSrc;
			}
		},
		props: {
			avatarSrc: '',
			avatarStyle: '',
			selWidth: '',
			selHeight: '',
			expWidth: '',
			expHeight: '',
			minScale: '',
			maxScale: '',
			canScale: '',
			noTab: '',
			quality: '',
			index: ''
		},
		created() {
			this.ctxCanvas = uni.createCanvasContext('avatar-canvas', this);
			this.ctxCanvasOper = uni.createCanvasContext('oper-canvas', this);
			this.qlty = parseInt(this.quality) || 0.9;
			this.imgSrc.imgSrc = this.avatarSrc;
			this.letScale = this.canScale === 'false' ? 0 : 1;
			this.indx = this.index || undefined;
			this.mnScale = this.minScale || 0.3;
			this.mxScale = this.maxScale || 4;
			this.noBar = this.noTab === 'true' ? 1 : 0;
			if (this.noBar) {
				this.moreHeight = 0;
				this.fWindowResize();
			} else {
				uni.showTabBar({
					complete: (res) => {
						this.moreHeight = (res.errMsg === 'showTabBar:ok') ? 50 : 0;
						this.fWindowResize();
					}
				});
			}
		},
		methods: {
			fWindowResize() {
				let sysInfo = uni.getSystemInfoSync();
				this.platform = sysInfo.platform;
				this.pixelRatio = sysInfo.pixelRatio;
				this.windowWidth = sysInfo.windowWidth;
				// #ifdef H5
				this.drawTop = sysInfo.windowTop;
				this.windowHeight = sysInfo.windowHeight + sysInfo.windowBottom;
				this.cvsStyleHeight = this.windowHeight - this.tabHeight + 'px';
				// #endif
				// #ifdef APP-PLUS
				if (this.platform === 'android') {
					this.windowHeight = sysInfo.screenHeight + sysInfo.statusBarHeight;
					this.cvsStyleHeight = this.windowHeight - this.tabHeight + 'px';
				} else {
					this.windowHeight = sysInfo.windowHeight + this.moreHeight;
					this.cvsStyleHeight = this.windowHeight - this.tabHeight + 6 + 'px';
				}
				// #endif
				// #ifdef MP
				let custom = uni.getMenuButtonBoundingClientRect();
				let CustomBar = custom.bottom + custom.top - sysInfo.statusBarHeight;
				this.windowHeight = sysInfo.screenHeight-CustomBar; // sysInfo.statusBarHeight - 44*sysInfo.windowWidth/750;//有tab栏
				this.cvsStyleHeight = this.windowHeight - this.tabHeight + 'px';
				// #endif
				this.pxRatio = this.windowWidth / 750;
				let style = this.avatarStyle;
				this.imgStyle = style;
				this.expWidth && (this.exportWidth = this.expWidth.indexOf('rpx') >= 0 ? parseInt(this.expWidth) * this.pxRatio :
					parseInt(this.expWidth));
				this.expHeight && (this.exportHeight = this.expHeight.indexOf('rpx') >= 0 ? parseInt(this.expHeight) * this.pxRatio :
					parseInt(this.expHeight));
				if (this.styleDisplay === 'flex') {
					this.fDrawInit(true);
				}
				this.fHideImg();
			},
			fSelect() {
				if (this.fSelecting) return;
				this.fSelecting = true;
				setTimeout(() => {
					this.fSelecting = false;
				}, 500);
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					sourceType: ['camera', 'album'],
					success: (r) => {
						uni.showLoading({
							mask: true
						});
						let path = this.imgPath = r.tempFilePaths[0];
						uni.getImageInfo({
							src: path,
							success: r => {
								this.imgWidth = r.width;
								this.imgHeight = r.height;
								this.path = path;
								if (!this.hasSel) {
									let style = this.selStyle || {};
									if (this.selWidth && this.selHeight) {
										let selWidth = this.selWidth.indexOf('rpx') >= 0 ? parseInt(this.selWidth) * this.pxRatio :
											parseInt(this.selWidth),
											selHeight = this.selHeight.indexOf('rpx') >= 0 ? parseInt(this.selHeight) * this.pxRatio :
											parseInt(this.selHeight);
										style.width = parseInt(selWidth);
										style.height = parseInt(selHeight);
										style.top = parseInt((this.windowHeight - style.height - this.tabHeight) / 2);
										style.left = parseInt((this.windowWidth - style.width) / 2);
									} else {
										uni.showModal({
											title: '裁剪框的宽或高没有设置',
											showCancel: false
										})
										return;
									}
									this.selStyle = style;
								}
								if (this.noBar) {
									this.fDrawInit(true);
								} else {
									uni.hideTabBar({
										complete: () => {
											this.fDrawInit(true);
										}
									});
								}
							},
							fail: () => {
								uni.showToast({
									title: "error3",
									duration: 2000,
								})
							},
							complete() {
								uni.hideLoading();
							}
						});
					}
				})
			},
			fUpload() {
				if (this.fUploading) return;
				this.fUploading = true;
				setTimeout(() => {
					this.fUploading = false;
				}, 1000)
				let style = this.selStyle,
					x = parseInt(style.left),
					y = parseInt(style.top),
					width = parseInt(style.width),
					height = parseInt(style.height),
					expWidth = this.exportWidth || width,
					expHeight = this.exportHeight || height;
				// #ifdef H5
				x *= this.pixelRatio;
				y *= this.pixelRatio;
				expWidth = width;
				expHeight = height;
				// #endif
				// uni.showLoading({
				// 	mask: true
				// });
				this.styleDisplay = 'none';
				this.styleTop = '-10000px';
				this.hasSel = false;
				this.fHideImg();
				uni.canvasToTempFilePath({
					x: x,
					y: y,
					width: width,
					height: height,
					destWidth: expWidth,
					destHeight: expHeight,
					canvasId: 'avatar-canvas',
					fileType: 'png',
					quality: this.qlty,
					success: (r) => {
						r = r.tempFilePath;
						// #ifdef H5
						this.btop(r).then((r) => {
							if (this.exportWidth && this.exportHeight) {
								let ctxCanvas = this.ctxCanvas;
								expWidth = this.exportWidth,
									expHeight = this.exportHeight;
								ctxCanvas.drawImage(r, 0, 0, expWidth, expHeight);
								ctxCanvas.draw(false, () => {
									uni.canvasToTempFilePath({
										x: 0,
										y: 0,
										width: expWidth,
										height: expHeight,
										destWidth: expWidth,
										destHeight: expHeight,
										canvasId: 'avatar-canvas',
										fileType: 'png',
										quality: this.qlty,
										success: (r) => {
											r = r.tempFilePath;
											this.btop(r).then((r) => {
												this.$emit("upload", {
													avatar: this.imgSrc,
													path: r,
													index: this.indx
												});
											});
										},
										fail: () => {
											uni.showToast({
												title: "error0",
												duration: 2000,
											})
										}
									});
								});
							} else {
								this.$emit("upload", {
									avatar: this.imgSrc,
									path: r,
									index: this.indx
								});
							}
						})
						// #endif
						// #ifndef H5
						this.$emit("upload", {
							avatar: this.imgSrc,
							path: r,
							index: this.indx
						});
						// #endif
					},
					fail: (res) => {
						uni.showToast({
							title: "error1",
							duration: 2000,
						})
					},
					complete: () => {
						// uni.hideLoading();
						this.noBar || uni.showTabBar();
					}
				}, this);
			},
			fDrawInit(ini = false) {
				let allWidth = this.windowWidth,
					allHeight = this.windowHeight,
					imgWidth = this.imgWidth,
					imgHeight = this.imgHeight,
					imgRadio = imgWidth / imgHeight,
					useWidth = allWidth,
					useHeight = allHeight - this.tabHeight,
					pixelRatio = this.pixelRatio,
					selWidth = parseInt(this.selStyle.width),
					selHeight = parseInt(this.selStyle.height);
				this.fixWidth = 0;
				this.fixHeight = 0;
				
				if (this.fixWidth) {
					useWidth = selWidth;
					useHeight = useWidth / imgRadio;
				} else if (this.fixHeight) {
					useHeight = selHeight;
					useWidth = useHeight * imgRadio;
				} else if (imgRadio < 1) {
					useWidth = selWidth;
					useHeight = parseInt(useWidth / imgRadio);
				} else {
					useHeight = selHeight;
					useWidth = parseInt(useHeight * imgRadio);
				}
				this.scaleSize = 1;
				this.rotateDeg = 0;
				this.posWidth = parseInt((allWidth - useWidth) / 2);
				this.posHeight = parseInt((allHeight - useHeight - this.tabHeight) / 2);
				this.useWidth = useWidth;
				this.useHeight = useHeight;
				let style = this.selStyle,
					left = parseInt(style.left),
					top = parseInt(style.top),
					width = parseInt(style.width),
					height = parseInt(style.height),
					canvas = this.canvas,
					canvasOper = this.canvasOper,
					ctxCanvas = this.ctxCanvas,
					ctxCanvasOper = this.ctxCanvasOper;
				ctxCanvasOper.setFillStyle('rgba(0,0,0, 0.5)');
				ctxCanvasOper.fillRect(0, 0, this.windowWidth, top);
				ctxCanvasOper.fillRect(0, top, left, height);
				ctxCanvasOper.fillRect(0, top + height, this.windowWidth, this.windowHeight - height - this.tabHeight - top);
				ctxCanvasOper.fillRect(left + width, top, this.windowWidth - width - left, height);
				ctxCanvasOper.setLineWidth(1);
				ctxCanvasOper.setStrokeStyle('rgba(255, 255, 255,1)'); //细线的颜色
				ctxCanvasOper.strokeRect(left, top, width, height);
				ctxCanvasOper.setLineWidth(3);
				ctxCanvasOper.setStrokeStyle('rgba(255, 255, 255, 1)'); //粗线的颜色
				ctxCanvasOper.moveTo(left + 20, top);
				ctxCanvasOper.lineTo(left, top);
				ctxCanvasOper.lineTo(left, top + 20);
				ctxCanvasOper.moveTo(left + width - 20, top);
				ctxCanvasOper.lineTo(left + width, top);
				ctxCanvasOper.lineTo(left + width, top + 20);
				ctxCanvasOper.moveTo(left + 20, top + height);
				ctxCanvasOper.lineTo(left, top + height);
				ctxCanvasOper.lineTo(left, top + height - 20);
				ctxCanvasOper.moveTo(left + width - 20, top + height);
				ctxCanvasOper.lineTo(left + width, top + height);
				ctxCanvasOper.lineTo(left + width, top + height - 20);
				ctxCanvasOper.stroke();
				this.postFirst = {
					left: left,
					top: top,
					width: width,
					height: selWidth,
					posWidth: this.posWidth,
					posHeight: this.posHeight
				};
				ctxCanvasOper.draw(false, () => {
					if (ini) {
						this.styleDisplay = 'flex';
						// #ifdef H5
						this.styleTop = this.drawTop + 'px';
						// #endif
						// #ifndef H5
						this.styleTop = '0';
						// #endif
						ctxCanvas.setFillStyle('black');
						this.fDrawImage();
					}
				});
				this.$emit("avtinit");
			},
			fDrawImage() {
				let tm_now = Date.now();
				if (tm_now - this.drawTm < 20) return;
				this.drawTm = tm_now;
				let ctxCanvas = this.ctxCanvas;
				ctxCanvas.fillRect(0, 0, this.windowWidth, this.windowHeight - this.tabHeight);
				//中心点坐标
				ctxCanvas.translate(this.posWidth + this.useWidth / 2, this.posHeight + this.useHeight / 2);
				//比例缩放
				ctxCanvas.scale(this.scaleSize, this.scaleSize);
				ctxCanvas.drawImage(this.imgPath, -this.useWidth / 2, -this.useHeight / 2, this.useWidth, this.useHeight);
				ctxCanvas.draw(false);
			},
			fHideImg() {
				this.prvImg = '';
				this.prvTop = '-10000px';
				this.showOper = true;
				this.prvImgData = null;
				this.target = null;
			},
			fClose() {
				this.styleDisplay = 'none';
				this.styleTop = '-10000px';
				this.hasSel = false;
				this.fHideImg();
				this.noBar || uni.showTabBar();
			},
			fStart(e) {
				let touches = e.touches,
					touch0 = touches[0],
					touch1 = touches[1];
				this.touch0 = touch0;
				this.touch1 = touch1;
				if (touch1) {
					let x = touch1.x - touch0.x,
						y = touch1.y - touch0.y;
					this.fgDistance = Math.sqrt(x * x + y * y);
				}
			},
			fMove(e) {
				let touches = e.touches,
					touch0 = touches[0],
					touch1 = touches[1];
				if (touch1) {
					let x = touch1.x - touch0.x,
						y = touch1.y - touch0.y,
						fgDistance = Math.sqrt(x * x + y * y),
						scaleSize = 0.005 * (fgDistance - this.fgDistance),
						beScaleSize = this.scaleSize + scaleSize;
					do {
						if (!this.letScale) break;
						if (beScaleSize < this.mnScale) break;
						if (beScaleSize > this.mxScale) break;
						this.scaleSize = beScaleSize;
					} while (0);
					this.fgDistance = fgDistance;
					if (touch1.x !== touch0.x && this.letRotate) {
						x = (this.touch1.y - this.touch0.y) / (this.touch1.x - this.touch0.x);
						y = (touch1.y - touch0.y) / (touch1.x - touch0.x);
						this.rotateDeg += Math.atan((y - x) / (1 + x * y)) * 180 / Math.PI;
						this.touch0 = touch0;
						this.touch1 = touch1;
					}
					this.fDrawImage();
				} else if (this.touch0) {
					let x = touch0.x - this.touch0.x,
						y = touch0.y - this.touch0.y,
						beX = this.posWidth + x,
						beY = this.posHeight + y;			
						if (Math.abs(x) < 100 && !this.lckWidth) this.posWidth = beX;
						if (Math.abs(y) < 100 && !this.lckHeight) this.posHeight = beY;
					this.touch0 = touch0;
					this.fDrawImage();
				}
			},
			async fEnd(e) {
				let self = this;
				let touches = e.touches,
					touch0 = touches && touches[0],
					touch1 = touches && touches[1];
				if (self.scaleSize < 1) {
					let style = self.selStyle;
					let imgRadio = self.imgWidth / self.imgHeight;
					//高长宽短
					if (imgRadio < 1 && self.scaleSize * self.useWidth < style.width) {
						self.posWidth = style.left;
						self.scaleSize = 1
						setTimeout(function() {
							self.fDrawImage();
						}, 100)
					} else if (self.scaleSize * self.useHeight < style.width) {
						//高短宽长
						self.posHeight = style.top;
						self.scaleSize = 1
						setTimeout(function() {
							self.fDrawImage();
						}, 100)
					}
				} else if (this.scaleSize == 1) {
					let endWidth = this.posWidth - this.postFirst.posWidth,
						firstWidth = this.postFirst.left - this.postFirst.posWidth;
					let endHeight = this.posHeight - this.postFirst.posHeight,
						firstHigth = this.postFirst.top - this.postFirst.posHeight;
					if (endWidth > 0 && this.posWidth > this.postFirst.left) {
						//右滑动过长
						this.posWidth = this.postFirst.left;
					} else if (endWidth < 0 && endWidth < firstWidth) {
						//左滑动过长
						this.posWidth = -this.postFirst.left + this.postFirst.posWidth * 2;
					}
					if (endHeight < 0 && this.posHeight < this.postFirst.top) {
						//上滑动过长
						this.posHeight = -this.postFirst.top + this.postFirst.posHeight * 2 + 1;
					} else if (endHeight > 0 && endHeight > firstHigth) {
						//下滑动过长
						this.posHeight = this.postFirst.top;
					}
					setTimeout(function() {
						self.fDrawImage();
					}, 100);
				}
				if (touch0) {
					this.touch0 = touch0;
				} else {
					this.touch0 = null;
					this.touch1 = null;
				}
			},
			btop(base64) {
				return new Promise(function(resolve, reject) {
					var arr = base64.split(','),
						mime = arr[0].match(/:(.*?);/)[1],
						bstr = atob(arr[1]),
						n = bstr.length,
						u8arr = new Uint8Array(n);
					while (n--) {
						u8arr[n] = bstr.charCodeAt(n);
					}
					return resolve((window.URL || window.webkitURL).createObjectURL(new Blob([u8arr], {
						type: mime
					})));
				});
			},
		}
	}
</script>

<style scoped lang="scss">
	.my-canvas {
		display: flex;
		position: fixed !important;
		background: #000000;
		left: 0;
		z-index: 100;
		width: 100%;
	}
	.my-avatar {
		width: 100vw;
		height: 100vw;
		background:#ccc;
	}
	.oper-canvas {
		display: flex;
		position: fixed !important;
		left: 0;
		z-index: 101;
		width: 100%;
	}
	.oper-wrapper {
		height: 71px;
		position: fixed !important;
		box-sizing: border-box;
		width: 100%;
		left: 0;
		bottom: 0;
		z-index: 200;
		flex-direction: row;
	}
	.btn-wrapper {
		background-color: #000000;
		color: #ffffff;
		display: flex;
		height: 100%;
		width: 100%;
		justify-content: space-around;
		align-items: center
	}
	.btn-wrapper view {
		width: 160rpx;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		font-size: 16px;
		color: #ffffff;
		z-index: 300;
	}
	.hover {
		color: #f1f1f1;
	}
	.iconfont{
		background: #ddd;
		color: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>