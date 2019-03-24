// pages/home/homeIndex/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      '/images/banner.png',
      '/images/banner.png',
      '/images/banner.png'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    circular:true,
    sortInner:[
      {
        img: '/images/icon_newSeason.png',
        title:'当季新品'
      },
      {
        img: '/images/icon_skinCream.png',
        title:'护肤脸霜'
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
    protuctSorts: [
      {
        title: '新品特价', 
        checked:true
      },{
        title: '优惠活动',
        checked: false
      },{
        title: '七折优惠',
        checked: false
      },{
        title: '进口专区',
        checked:false
      },{
        title: '美妆专区',
        checked: false
      }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  
})