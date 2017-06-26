// pages/uploadfile/uploadfile.js
var util = require('../../utils/util.js');
var app=getApp();

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

  },

  chooseImage: function (e) {//上传图片
    var that = this;

    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths

        wx.uploadFile({
          url: app.globalData.siteBaseUrl + '/weapp/uploadfile.php',
          filePath: tempFilePaths[0],
          name: 'file',
          success: function (res) {
            console.log("上传图片", res);
            var res = JSON.parse(res.data);//字符转json                        

            if (res.status) {
              that.setData({
                image: res.data
              });             
            } else {
              util.showModal(res.msg);
            }
          },
          fail: function () {
            console.log("上传图片fail", res);
          },
        })
        console.log("选择图片", res);
      },
      fail: function (res) {
        console.log("选择图片fail", res);
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
})