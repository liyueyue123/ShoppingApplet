//城市选择
var app = getApp();
Page({
    data: {
      shengArr: [],//省级数组
      shengId: [],//省级id数组
      shiArr: [],//城市数组
      shiId: [],//城市id数组
      quArr: [],//区数组
      quId: [],
      shengIndex: 0,
      shiIndex: 0,
      quIndex: 0,
      mid: 0,
      sheng:22,
      city: 0,
      area: 0,
      code: 0,
      cartId: 0,
      multiIndex:[],
      addressShow:false,
      multiArray: [],
    },
    formSubmit: function (e) {
        var adds = e.detail.value;
        var cartId = this.data.cartId;
        wx.request({
            url: app.d.ceshiUrl + '/Api/Address/add_adds',
            data: {
              user_id: app.d.userId,
              receiver: adds.name,
              tel: adds.phone,
              sheng: this.data.shengId[this.data.shengIndex],
              city: this.data.shiId[this.data.shiIndex],
              quyu: this.data.quId[this.data.quIndex],
              adds: adds.address,
              code: this.data.code,
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
        that.getProvinces();
    },
    // 改变所在地区
    bindMultiPickerChange(e) {
      console.log(e)
        let val = e.detail.value;
        let code = e.detail.code;
        this.setData({
          multiIndex: e.detail.value,
          addressShow: true
        });
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
    },
    bindMultiPickerColumnChange(e){
      console.log(e);
      if (e.detail.column == 0){
        this.setData({
          shengIndex: e.detail.value,
        })
        this.getCities();
      }
      if (e.detail.column == 1){
        this.setData({
          shiIndex: e.detail.value
        })
        this.getCounties();
      }
      if (e.detail.column == 2){
        this.setData({
          quIndex: e.detail.value
        })
        this.getCodes();
      }
    },
    getProvinces () {
      var that = this;
      wx.request({
        url: app.d.ceshiUrl + '/Api/Address/get_province',
        data: {},
        method: 'POST',
        success: function (res) {
          var status = res.data.status;
          var province = res.data.list;
          var sArr = [];
          var sId = [];
          for (var i = 0; i < province.length; i++) {
            sArr.push(province[i].name);
            sId.push(province[i].id);
          }
          that.setData({
            shengArr: sArr,
            shengId: sId
          })
          // console.log(that.data.shengArr)
          that.getCities();
        },
        fail: function () {
          // fail
          wx.showToast({
            title: '网络异常！',
            duration: 2000
          });
        },
      })
    },
    getCities () {
      var that = this;
      wx.request({
        url: app.d.ceshiUrl + '/Api/Address/get_city',
        data: { sheng: that.data.shengIndex+1 },
        method: 'POST',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          // success
          var status = res.data.status;
          var city = res.data.city_list;

          var hArr = [];
          var hId = [];
          for (var i = 0; i < city.length; i++) {
            hArr.push(city[i].name);
            hId.push(city[i].id);
          }
          that.setData({
            sheng: res.data.sheng,
            shiArr: hArr,
            shiId: hId
          })
          // console.log(that.data.shiArr);
          that.getCounties();
        },
        fail: function () {
          // fail
          wx.showToast({
            title: '网络异常！',
            duration: 2000
          });
        },

      })
    },
    getCounties () {
      var that = this;
      // console.log('city',that.data.shiIndex)
      wx.request({
        url: app.d.ceshiUrl + '/Api/Address/get_area',
        data: {
          city: that.data.shiIndex+1,
          sheng: that.data.shengId[that.data.shengIndex]
        },
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {// 设置请求的 header
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          var status = res.data.status;
          var area = res.data.area_list;

          var qArr = [];
          var qId = [];
          // qArr.push('请选择');
          // qId.push('0');
          for (var i = 0; i < area.length; i++) {
            qArr.push(area[i].name)
            qId.push(area[i].id)
          }
          that.setData({
            city: res.data.city,
            quArr: qArr,
            quId: qId
          })
          // console.log(that.data.quId)
          // console.log(that.data.shengId)
          // console.log(that.data.shiId)
          var multiArray = [];
          multiArray.push(that.data.shengArr,that.data.shiArr,that.data.quArr)
          console.log(multiArray)
          that.setData({
            multiArray: multiArray
          })
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
    getCodes () {
      console.log(this.data.city)
      this.setData({
        quIndex: this.data.quIndex
      });
      var that = this;
      wx.request({
        url: app.d.ceshiUrl + '/Api/Address/get_code',
        data: {
          quyu: that.data.quIndex,
          city: that.data.shiIndex + 1
        },
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {// 设置请求的 header
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          that.setData({
            area: res.data.area,
            code: res.data.code
          })
          console.log(that.data.area, that.data.code)
        },
        fail: function () {
          // fail
          wx.showToast({
            title: '网络异常！',
            duration: 2000
          });
        }
      })
    }

})