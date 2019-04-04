// components/share/index.js
var app = getApp(); // 取得全局App
Component({
  properties: {
    visible: {
      type: Boolean,
      value: false
    }
  },
  data: {
    sharePath: '',
    imageFile: ''
  },
  methods: {
    draw() {
      var that = this
      const rpx2px = createRpx2px()
      console.log(app.globalData.userInfo)
      const userInfo = app.globalData.userInfo;
      // const avatarUrl = app.globalData.userInfo.avatarUrl;
      const avatarUrl = "https://shop.icpnt.com/Data/UploadFiles/theme/20190403/1554257315351920.png";
      const nickName = app.globalData.userInfo.nickName;
      // console.log(avatarUrl);
      // 获取头像图像信息 
      const avatarPromise = getImageInfo(avatarUrl)
      // 获取背景图像信息
      const backgroundPromise = getImageInfo('https://shop.icpnt.com/Data/UploadFiles/product/20190330/1553928299241782.jpg')

      Promise.all([avatarPromise, backgroundPromise])
        .then(([avatar, background]) => {
          // 创建绘图上下文
          const ctx = wx.createCanvasContext('shareImg', this)
          const canvasWidth = rpx2px(360 * 2)
          const canvasHeight = rpx2px(260 * 2)
          // 绘制背景，填充满整个canvas画布
          ctx.drawImage(background.path, 0, 0, canvasWidth, canvasHeight)
          // 绘制产品标题
          const productName = "SVK美眼仪"
          const productNameTop = rpx2px(280 * 2)
          ctx.font = 'normal bold 20px sans-serif';
          ctx.setTextAlign('center')
          ctx.setFillStyle('#000')
          ctx.fillText(productName,canvasWidth / 2,productNameTop + 10,)
          // 绘制产品功效
          const productEffect = "淡化黑眼圈、眼袋，眼周轮廓护理淡化黑眼圈、眼袋，眼周轮廓护理"
          const titleHeight = rpx2px(30 * 2);  // 文字的高度
          const initHeight = rpx2px(320 * 2);  //绘制字体距离canvas顶部初始的高度
          const productEx = rpx2px(20 * 2)
          const productH = rpx2px(320 * 2)
          drawText(ctx, productEffect, initHeight, titleHeight, canvasWidth, productEx, productH);
          // 绘制价钱优惠
          const productDiscount = "9.7折"
          const productDiscountTop = rpx2px(380 * 2)
          ctx.setFontSize(16)
          ctx.setFillStyle('#fff')
          ctx.fillText(productDiscount,canvasWidth /8,productDiscountTop + 10,)
          // 绘制价钱
          const productPrice = "￥299"
          const productPriceTop = rpx2px(380 * 2)
          ctx.setFontSize(30)
          ctx.setFillStyle('#fff')
          ctx.fillText(productPrice,canvasWidth / 4,productPriceTop + 10,)
          // 绘制二维码
          const codeUrl = "https://shop.icpnt.com/Data/UploadFiles/theme/20190403/1554257315351920.png"
          const codeWidth = rpx2px(80 * 2)
          const codeHeight = rpx2px(80 * 2)
          const codeX = rpx2px(240 * 2)
          const codeY = rpx2px(340 * 2)
          ctx.drawImage(background.path, codeX, codeY, codeWidth, codeHeight)

          ctx.stroke()
          // 完成作画
          // ctx.draw(false,function(){
          //   that.imageGeneratePreview()
          // })
          ctx.draw(false, () => {
            canvasToTempFilePath({
              canvasId: 'shareImg',
            }, this).then(({ tempFilePath }) => this.setData({ imageFile: tempFilePath }))
          })
        })
    },
    imageGeneratePreview() {
      let that = this;
      //把当前画布指定区域的内容导出生成指定大小的图片，并返回文件路径
      wx.canvasToTempFilePath({
        // width: this.data.systemInfo.windowWidth,
        // height: this.data.systemInfo.screenHeight,
        // destWidth: this.data.systemInfo.windowWidth * 3,
        // destHeight: this.data.systemInfo.screenHeight * 3,
        x:0,
        y:0,
        canvasId: 'myCanvas',
        success: function (res) {
          //预览图片
          wx.previewImage({
            urls: res.tempFilePath.split(','),   // 需要预览的图片http链接列表
            fail: function (res) {
              console.log("预览图片失败" + res)
            }
          })
        },
        fail: function (res) {
          console.log("出错了:" + JSON.stringify(res));
        }, complete: function () {
          wx.hideLoading();
        }
      })
    },
    // 保存到相册
    handleSave() {
      const { imageFile } = this.data
      if (imageFile) {
        saveImageToPhotosAlbum({
          filePath: imageFile,
        }).then(() => {
          wx.showToast({
            icon: 'none',
            title: '分享图片已保存至相册',
            duration: 2000,
          })
        })
      }
    }
  },

})

// 多行文本
function drawText(ctx, str, initHeight, titleHeight, canvasWidth, productEx, productH) {
  var lineWidth = 0;
  var lastSubStrIndex = 0; //每次开始截取的字符串的索引    
  for (let i = 0; i < str.length; i++) {
    lineWidth += ctx.measureText(str[i]).width;
    ctx.setFontSize(13)
    ctx.setTextAlign('start')
    ctx.setFillStyle('#000')
    if (lineWidth > canvasWidth) {
      ctx.fillText(str.substring(lastSubStrIndex, i), productEx, initHeight, productH); //绘制截取部分        
      initHeight += 26; //20为字体的高度        
      lineWidth = 0;
      lastSubStrIndex = i;
      titleHeight += 20;
    }
    if (i == str.length - 1) { //绘制剩余部分        
      ctx.fillText(str.substring(lastSubStrIndex, i + 1), productEx, initHeight, productH);
    }
  }
}

// 合成图片
function getImageInfo(url) {
  return new Promise((resolve, reject) => {
    wx.getImageInfo({
      src: url,
      success: resolve,
      fail: reject,
    })
  })
}

// 单位转换
function createRpx2px() {
  const { windowWidth } = wx.getSystemInfoSync()

  return function (rpx) {
    return windowWidth / 750 * rpx
  }
}

// 转换成图片
function canvasToTempFilePath(option, context) {
  return new Promise((resolve, reject) => {
    wx.canvasToTempFilePath({
      ...option,
      success: resolve,
      fail: reject,
    }, context)
  })
}

// 保存图片
function saveImageToPhotosAlbum(option) {
  return new Promise((resolve, reject) => {
    wx.saveImageToPhotosAlbum({
      ...option,
      success: resolve,
      fail: reject,
    })
  })
}