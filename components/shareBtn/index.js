// components/shareBtn/index.js
Component({
  properties: {
  },
  data: {
    isShow:false
  },
  methods: {
    shareTip:function(e){
      console.log(e);
      this.onShareAppMessage();
      wx.onShareAppMessage(() =>({
        
      }))
    },
    // onShareAppMessage: function (res) {
    //   console.log("转发开始")
    //   this.setData({
    //     isShow: true
    //   })
    //   if (res.from === 'button'){}
    //   return {
    //     title: '自定义转发标题',
    //     path: '/pages/product/index',
    //     success: function (res) {
    //       // 转发成功
    //       console.log("转发成功")
    //       this.setData({
    //         isShow: false
    //       })
    //     },
    //     fail: function (res) {
    //       // 转发失败
    //       console.log("转发失败")
    //       this.setData({
    //         isShow: false
    //       })
    //     }
    //   }
    // }
  }
})
