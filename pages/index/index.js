// pages/home/homeIndex/index.js
var app = getApp();
Page({
  data: {
    imgUrls: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    circular: true,
    sortInner: [],
    protuctSorts: [],
    protuctSortIndex: 0,
    askIsShow: true,
    homeProList:[],
    recommendProduct: [], // 热门商品
    recommendList: [], // 热卖套装
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this;
    //判断用户是否授权
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          _this.setData({
            askIsShow: false
          })
        } else {
          _this.setData({
            askIsShow: true
          })
        }
      }
    });
    _this.getSwiper(); //获取轮播图
    _this.getTheme(); //获取顶部主题
    _this.getBottomTheme(); //获取底部主题
    _this.getRecommendList(); //热卖套装
    _this.getrecommendProduct(); //热卖商品
  },

  // 获取轮播图
  getSwiper(options) {
    let _this = this;
    wx.request({
      url: app.d.ceshiUrl + '/Api/Index/getBanner',
      method: 'get',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        // console.log(res);
        _this.setData({
          imgUrls: res.data.data
        })
      },
      fail: function (e) {
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      }
    })
  },
  // 分类主题
  getTheme(options){
    let _this = this;
    wx.request({
      url: app.d.ceshiUrl + '/Api/Index/getTopTheme',
      method: 'get',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res);
        _this.setData({
          sortInner: res.data.data
        })
      },
      fail: function (e) {
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      }
    })
  },
  // 顶部主题跳转
  gotoProduct(e){
    // console.log(e.currentTarget.dataset.id);
    let themeId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: "../listdetail/listdetail?id=" + themeId+"&type=00"
    })
  },
  // 获取底部主题
  getBottomTheme(options){
    let _this = this;
    wx.request({
      url: app.d.ceshiUrl + '/Api/Index/getBottomTheme',
      method: 'get',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res);
        _this.setData({
          protuctSorts: res.data.data,
          homeProList:res.data.data[0]
        })
      },
      fail: function (e) {
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      }
    })
  },
  // 底部主题切换
  checkTab(e) {
    // console.log(e.currentTarget.dataset.index);
    let _this = this;
    let index = e.currentTarget.dataset.index;
    if (_this.data.protuctSorts[index] == _this.data.protuctSortIndex) {
      return;
    }
    _this.setData({
      protuctSortIndex: index
    })
  },
  // 点击商品跳转详情
  gotoDetail(e){
    // console.log(e.currentTarget.dataset.id);
    let productId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: "../product/detail?productId=" + productId
    })
  },
  // 热卖商品
  getrecommendProduct() {
    let _this = this;
    wx.request({
      url: app.d.ceshiUrl + '/Api/Index/getPagesHotProduct',
      method: 'get',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log('热卖商品',res.data);
        let data = res.data.data;
        let recommendProduct = [data[0], data[1]]
        _this.setData({
          recommendProduct: recommendProduct
        })
      },
      fail: function (e) {
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      }
    })
  },
  // 热卖套装
  getRecommendList() {
    let _this = this;
    wx.request({
      url: app.d.ceshiUrl + '/Api/Index/getPagesShowProduct',
      method: 'get',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log('热卖套装',res.data);
        let data = res.data.data;
        _this.setData({
          recommendList: data[0]
        })
      },
      fail: function (e) {
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      }
    })
  }

})