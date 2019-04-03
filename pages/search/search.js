// pages/search/search.js
var app = getApp();
Page({
  data: {
    focus: true,
    hotKeyShow: true,
    historyKeyShow: true,
    searchValue: '',
    page: 0,
    productData: [],
    historyKeyList: [],
    hotKeyList: [],
    isFirst:0
  },
  onShow: function () {
    var that = this;
    that.search(); //搜索调用
  },
  onReachBottom: function () {
    this.setData({
      page: (this.data.page + 10)
    })
    this.searchProductData("0");
  },
  // 搜索页渲染
  search: function () {
    var that = this;
    wx.request({
      url: app.d.ceshiUrl + '/Api/Search/index',
      method: 'post',
      data: { uid: app.d.userId },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var remen = res.data.remen;
        var history = res.data.history;
        that.setData({
          historyKeyList: history,
          hotKeyList: remen,
        });
      },
      fail: function (e) {
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      },
    })
  },
  // 获取input输入值
  searchValueInput:function(e){
    var value = e.detail.value;
    this.setData({
      searchValue: value,
    });
  },
  // 点击搜索按钮
  doSearch:function(options){
    var searchKey = this.data.searchValue;
    this.setData({
      isFirst: 1
    });
    if (searchKey == '') {
      this.setData({
        focus: true,
        hotKeyShow: true,
        historyKeyShow: true,
        isFirst: 0
      });
      return;
    };
    this.setData({
      hotKeyShow: false,
      historyKeyShow: false,
    });
    this.data.productData.length = 0;
    this.searchProductData();
    this.getOrSetSearchHistory(searchKey);
  },
  // 获取历史搜索
  getOrSetSearchHistory: function (key) {
    var that = this;
    wx.getStorage({
      key: 'historyKeyList',
      success: function (res) {
        console.log(res.data);
        //console.log(res.data.indexOf(key))
        if (res.data.indexOf(key) >= 0) {
          return;
        }
        res.data.push(key);
        wx.setStorage({
          key: "historyKeyList",
          data: res.data,
        });
        that.setData({
          historyKeyList: res.data
        });
      }
    });
  },
  // 热门搜索、历史搜索
  doKeySearch: function (e) {
    var key = e.currentTarget.dataset.key;
    this.setData({
      searchValue: key,
      hotKeyShow: false,
      historyKeyShow: false,
    });
    // this.data.productData.length = 0;
    this.searchProductData();
  },
  // 搜索结果
  searchProductData: function (type) {
    var that = this;
    that.setData({
      isFirst: 1
    });
    wx.request({
      url: app.d.ceshiUrl + '/Api/Search/searches',
      method: 'post',
      data: {
        keyword: that.data.searchValue,
        uid: app.d.userId,
        page: that.data.page,
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var data = res.data.pro;
        console.log(data);
        console.log(that.data.isFirst,that.data.searchValue,that.data.productData.length);
        if(type){
          that.setData({
            productData: that.data.productData.concat(data),
          });
        }else{
          that.setData({
            productData: data,
          });
        }
      },
      fail: function (e) {
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      },
    });
  },
  



})