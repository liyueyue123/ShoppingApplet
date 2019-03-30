// pages/user/user.js
var app = getApp()
Page({
    data: {
        userInfo: {},
        orderInfo: {},
        likes: {},
        projectSource: 'https://github.com/liuxuanqiang/wechat-weapp-mall',
        userListInfo: [{
            icon: '../../images/iconfont-dingdan.png',
            text: '我的订单',
            isunread: true,
            unreadNum: 2
        }, {
            icon: '../../images/iconfont-card.png',
            text: '我的代金券',
            isunread: false,
            unreadNum: 2
        }, {
            icon: '../../images/iconfont-icontuan.png',
            text: '我的拼团',
            isunread: true,
            unreadNum: 1
        }, {
            icon: '../../images/iconfont-shouhuodizhi.png',
            text: '收货地址管理'
        }, {
            icon: '../../images/iconfont-kefu.png',
            text: '联系客服'
        }, {
            icon: '../../images/iconfont-help.png',
            text: '常见问题'
        }],
        loadingText: '加载中...',
        loadingHidden: false,
        askIsShow: true
    },
    onLoad: function(options) {
        var that = this;
        //调用应用实例的方法获取全局数据
        app.getUserInfo(function(userInfo) {
            console.log("我的" + JSON.stringify(userInfo));
            //更新数据
            that.setData({
                userInfo: userInfo,
                loadingHidden: true
            })
        });

        //判断用户是否授权
        if (!app.globalData.userInfo) {
            that.setData({
                askIsShow: false
            })
        }
        // this.loadOrderStatus();//获取用户订单数据
    },
    onShow: function(options) {
        this.loadOrderStatus();
        this.canLike();
    },
    // 询问授权
    askTip: function(e) {
        var userInfo = e.detail.userInfo;
        this.setData({
            askIsShow: false
        })
        console.log(e.detail.userInfo);
        if (userInfo) {
            app.getUserInfo();
            app.globalData.userInfo = userInfo // 跳转页面刷新
            wx.reLaunch({
                url: '../index/index'
            })
        } else {
            console.log('err')
        }
    },
    loadOrderStatus: function() {
        //获取用户订单数据
        var that = this;
        wx.request({
            url: app.d.ceshiUrl + '/Api/User/getorder',
            method: 'post',
            data: {
                userId: app.d.userId,
            },
            header: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            success: function(res) {
                //--init data        
                var status = res.data.status;
                if (status == 1) {
                    var orderInfo = res.data.orderInfo;
                    that.setData({
                        orderInfo: orderInfo
                    });
                } else {
                    wx.showToast({
                        title: '未知用户',
                        duration: 2000
                    });
                }
            },
            error: function(e) {
                wx.showToast({
                    title: '网络异常！',
                    duration: 2000
                });
            }
        });
    },
    onShareAppMessage: function() {
        return {
            title: '宠物美容学校',
            path: '/pages/index/index',
            success: function(res) {
                // 分享成功
            },
            fail: function(res) {
                // 分享失败
            }
        }
    },
    // 猜你喜欢
    canLike: function() {
        var that = this;
        wx.request({
            url: app.d.ceshiUrl + '/Api/index/likeProduct',
            method: 'get',
            header: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            success: function(res) {
                console.log(res)
                var likes = res.data.data;
                that.setData({
                    likes: likes
                })
            },
        });
    },
    // 跳转详情
    gotoDetail: function (e) {
        let productId = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../product/detail?productId=" + productId
        })
    }

})