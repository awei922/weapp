// pages/login/login.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;
    wx.login({//微信登录
      success: function (res) {
        var code = res.code;
        wx.request({//调用第三方服务器登录接口
          url: app.globalData.siteBaseUrl + '/weapp/login.php',
          data: {
            code: code,
          },
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header: { 'Content-Type': 'application/x-www-form-urlencoded;' },

          success: function (res) {
            console.log(res);
            wx.setStorageSync('token', res.data.data);
            that.setData({
              token: res.data.data
            })

          },
          fail: function (res) {
            console.log('wx.request fail', res)
          }
        });
      },
      fail: function (res) {
        console.log('wx.login fail', res)
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

})