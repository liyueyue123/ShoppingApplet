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
    sortInner: [{
        img: '/images/icon_newSeason.png',
        title: '当季新品'
      },
      {
        img: '/images/icon_skinCream.png',
        title: '护肤脸霜'
      },
      {
        img: '/images/icon_makeupSort.png',
        title: '彩妆分类'
      },
      {
        img: '/images/icon_discountArea.png',
        title: '七折专区'
      },
      {
        img: '/images/icon_maskBoutique.png',
        title: '面膜精品'
      },
      {
        img: '/images/icon_hairCare.png',
        title: '头发护理'
      },
      {
        img: '/images/icon_digitalPlaything.png',
        title: '数码玩物'
      },
      {
        img: '/images/icon_hotSale.png',
        title: '当季热销'
      },
      {
        img: '/images/icon_skinCare.png',
        title: '皮肤护理'
      },
      {
        img: '/images/icon_moreProducts.png',
        title: '更多商品'
      }
    ],
    protuctSorts: ['新品特价', '优惠活动', '七折优惠', '进口专区', '美妆专区'],
    protuctSortIndex: 0,
    askIsShow: true
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
    _this.getSwiper();
  },

  // 获取轮播图
  getSwiper(e) {
    let _this = this;
    wx.request({
      url: app.d.ceshiUrl + '/Api/Index/getBanner',
      method: 'get',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        // console.log(res);
        let data = res.data.data;
        let imgs = [];
        for (let i = 0; i < data.length;i++){
          imgs.push(data[i].photo);
        }
        _this.setData({
          imgUrls: imgs
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
  // 点击搜索
  gotoSearch(){
    wx.navigateTo({
      url: '../search/search'
    })
  },
  // 列表分类切换
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
  }

})