var app = getApp();
Page({
  data: {
    orderId: 0,
    pid:0,
    remark: '',
    star: 0,
    starMap: [
      '非常差',
      '差',
      '一般',
      '好',
      '非常好',
    ],
  },
  onLoad: function (options) {
    this.setData({
      orderId: options.orderId,
      pid: options.pid,
    });
  },
  submitReturnData: function () {
    console.log(this.data);
    //数据验证
    if (!this.data.remark) {
      wx.showToast({
        title: '请填写评价内容',
        icon: 'success',
        duration: 2000
      });
      return;
    }
    
    var that = this;
    wx.request({
      url: app.d.ceshiUrl + '/Api/Order/add_comment',
      method: 'post',
      data: {
        order_id: that.data.orderId,
        pid: that.data.pid,
        uid: app.d.userId,
        num: that.data.star,
        content: that.data.remark,
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        //--init data        
        var status = res.data.status;
        if (status == 1) {
          wx.showToast({
            title: '评价已提交！',
            duration: 2000,
            success: function () {
              console.log('haha');
              setTimeout(function () {
                //要延时执行的代码
                wx.navigateBack({
                  delta: 1, // 回退前 delta(默认为1) 页面
                })
              }, 2000) //延迟时间 
            }
          });

        } else {
          wx.showToast({
            title: res.data.err,
            duration: 2000
          });
        }
      },
    });

  },

  remarkInput: function (e) {
    this.setData({
      remark: e.detail.value,
    });
  },

  myStarChoose(e) {
    let star = parseInt(e.target.dataset.star) || 0;
    this.setData({
      star: star,
    });
  },
  
  
})