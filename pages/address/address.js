//城市选择
var app = getApp();
Page({
    data: {
        cartId: 0,
        region: [],
        province: '',
        city: '',
        county: '',
    },
    formSubmit: function (e) {
        var adds = e.detail.value;
        var cartId = this.data.cartId;
        console.log(this.data.province, this.data.city, this.data.county)
        wx.request({
            url: app.d.ceshiUrl + '/Api/Address/add_adds',
            data: {
                // user_id:'111',
                // receiver: '2222',
                // tel: '1111',
                // province: this.data.province,
                // city: this.data.city,
                // county: this.data.county
                user_id: app.d.userId,
                receiver: adds.name,
                tel: adds.phone,
                sheng: '1',
                city: '1',
                quyu: '1',
                adds: adds.address,
                code: '00000',
              // user_id: app.d.userId,
              // receiver: adds.name,
              // tel: adds.phone,
              // sheng: this.data.sheng,
              // city: this.data.city,
              // quyu: this.data.area,
              // adds: adds.address,
              // code: this.data.code,
            },
            method: 'POST',
            header: {// 设置请求的 header
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
                // success
                var status = res.data.status;
                console.log(res)
                if (status == 1) {
                    wx.showToast({
                        title: '保存成功！',
                        duration: 2000
                    });
                    setTimeout(function(){
                      wx.navigateBack({
                        url: 'user-address/user-address?cartId=' + cartId
                      });
                    },2000)
                } else {
                    wx.showToast({
                        title: res.data.err,
                        icon: 'none',
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
        })


    },
    onLoad: function (options) {
        // 生命周期函数--监听页面加载
        var that = this;
        that.setData({
            cartId: options.cartId
        })
    },
    // 改变所在地区
    bindRegionChange(e) {
        let val = e.detail.value;
        let code = e.detail.code;
      console.log(e.currentTarget.dataset.index)
        this.setData({
            // sheng: code[0],
            // city: code[1],
            // quyu: code[2],
            sheng: val[0],
            city: val[1],
            quyu: val[2]
        });
        this.setData({
            region: e.detail.value
        })
        console.log(e.detail)
        console.log(this.data.region)
    },
    // 手机号验证
    bindTelephone(e) {
        var phone = e.detail.value;
        if (!phone) {
            wx.showToast({
                title: '请输入手机号',
                icon: 'none',
                duration: 2000
            });
            return;
        } else {
            if (!(/^1(3|4|5|7|8)\d{9}$/.test(phone))) {
                wx.showToast({
                    title: '手机号码有误，请重填',
                    icon: 'none',
                    duration: 2000
                });
            }
        }
    }

})