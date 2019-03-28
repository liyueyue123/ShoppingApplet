var app = getApp();
// pages/order/detail.js
Page({
  data: {
    kuaidi_name: '',
    orderData: {},
    expressData: [],
    kuaidi_num:'',
    post_code:'',
  },
  onLoad: function (options) {
    this.setData({
      kuaidi_name: options.kuaidi_name,
      kuaidi_num: options.kuaidi_num,
      post_code: options.post_code,
      
    })
    //console.log(options.kuaidi_num)
    this.loadExpressDetail();
  },


  loadExpressDetail: function () {
    var that = this;
    wx.request({
      url: app.d.ceshiUrl + '/Api/Order/order_express',
      method: 'post',
      data: {
        kuaidi_name: that.data.kuaidi_name,
        kuaidi_num: that.data.kuaidi_num,
        post_code: that.data.post_code,
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res)
        var success = res.data.Success;
        if (success) {
          var expressData = res.data.Traces;
          that.setData({
            expressData: expressData
          });
        } else {
          wx.showToast({
            title: res.data.err,
            duration: 2000
          });
        }
      },
      fail: function () {
        // fail
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      }
    });
  },


  
})