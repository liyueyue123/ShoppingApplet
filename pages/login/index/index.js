// pages/login/index.js
//获取应用实例
const APP = getApp()

Page({
  data: {

  },
  onLoad: function (options) {

  },
  // 点击首页跳转
  goHome() {
    wx.switchTab({
      url: '/pages/home/homeIndex/index'
    })
  }
})