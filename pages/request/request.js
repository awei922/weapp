// pages/request/request.js
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
    wx.request({
      url: app.globalData.siteBaseUrl+'/weapp/request.php', //app.globalData.siteBaseUrl为通信域名，本人在app.js定义了
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var res = res.data;
        if (res.status) {
          that.setData({
            title: res.data.title,
            content: res.data.content,
          })
        } else {
          console.log(res)
        }
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
})