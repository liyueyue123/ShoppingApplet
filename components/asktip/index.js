// components/asktip/index.js
var app = getApp();     // 取得全局App
Component({
  properties: {
  },
  data: {
    asktip: false
  },
  methods: {
    // 询问授权
    askTip(e) {
      var userInfo = e.detail.userInfo;
      this.setData({
        asktip: true
      })
      if (userInfo) {
        app.getUserInfo();
        // 跳转页面刷新
        app.globalData.userInfo = userInfo;
        wx.reLaunch({
          url: "../index/index"
        })
      } else {
        console.log('err')
      }
    },
  }
})