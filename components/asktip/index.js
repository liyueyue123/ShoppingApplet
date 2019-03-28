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
        this.handleGetToken(userInfo) //获取token
        wx.redirectTo({
          url: '/pages/index/index'
        })
      } else {
        console.log('err')
      }
    },

    // 获取token 
    handleGetToken(userInfo) {
      var openId = wx.getStorageSync("openid");
      userInfo.openID = openId;
      // wx.request({
      //   url: app.d.ceshiUrl + '/Api/Product/get_more',
      //   method: 'post',
      //   data: {
      //     userInfo: JSON.stringify(userInfo)
      //   },
      //   header: {
      //     'Content-Type': 'application/x-www-form-urlencoded'
      //   },
      //   success: function (res) {
      //     console.log(res)
      //   },
      //   fail: function (e) {
      //     wx.showToast({
      //       title: '网络异常！',
      //       duration: 2000
      //     });
      //   }
      // })
    },
  }
})