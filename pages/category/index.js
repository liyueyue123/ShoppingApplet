//获取应用实例  
var app = getApp();
Page({
  data: {
    // types: null,
    typeTree: {}, // 数据缓存
    currType: 0, 
    "types": [], 
    typeTree: [],
  },

  onLoad: function(options) {
    var that = this;
    wx.request({
      url: app.d.ceshiUrl + '/Api/Category/index',
      method: 'post',
      data: {},
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        console.log(res);
        //--init data 
        var status = res.data.status;
        if (status == 1) {
          var list = res.data.list;
          var catList = res.data.catList;
          that.setData({
            types: list,
            typeTree: catList
          });
        } else {
          wx.showToast({
            title: res.data.err,
            duration: 2000,
          });
        }
        that.tapType('',res.data.list[0].id); //获取分类底下的商品
      },
      error: function(e) {
        wx.showToast({
          title: '网络异常！',
          duration: 2000,
        });
      },
    });
  },
  //获取分类底下的商品
  tapType: function (e,id) {
    var that = this;
    if(e){
      const type = e.currentTarget.dataset.typeId;
      if (type == that.data.currType) return;
      that.setData({
        currType: type
      });
    }else{
      that.setData({
        currType: id
      });
    }
    wx.request({
      url: app.d.ceshiUrl + '/Api/Product/lists',
      method: 'post',
      data: {
        cat_id: that.data.currType
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        console.log(res)
        var status = res.data.status;
        if (status == 1) {
          var catList = res.data.pro;
          that.setData({
            typeTree: catList,
          });
        } else {
          wx.showToast({
            title: res.data.err,
            duration: 2000,
          });
        }
      },
      error: function(e) {
        wx.showToast({
          title: '网络异常！',
          duration: 2000,
        });
      }
    });
  },
  // 加载品牌、二级类目数据
  getTypeTree(currType) {
    const me = this,
      _data = me.data;
    if (!_data.typeTree[currType]) {
      request({
        url: ApiList.goodsTypeTree,
        data: {
          typeId: +currType
        },
        success: function(res) {
          _data.typeTree[currType] = res.data.data;
          me.setData({
            typeTree: _data.typeTree
          });
        }
      });
    }
  }
})