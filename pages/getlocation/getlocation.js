// pages/getlocation/getlocation.js
// 引用百度地图微信小程序JSAPI模块 
var bmap = require('../../utils/bmap-wx.min.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    weatherData: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        console.log(res);
        var latitude = res.latitude;//维度
        var longitude = res.longitude;//经度
        var speed = res.speed;
        var accuracy = res.accuracy;

        that.setData({
          latitude: latitude,//维度
          longitude: longitude,//经度
        })
        // 新建百度地图对象 
        var BMap = new bmap.BMapWX({
          ak: 'XKRp9VBC8zyoEK4TXkUGS2CydcCHNg6r'
        });
        // 发起weather请求       
        BMap.weather({
          location: longitude + ',' + latitude,
          fail: function (data) {
            console.log("BMap", data)
          },
          success: function (data) {
            console.log(data);
            var weatherData = data.currentWeather[0];
            var weather = 'PM2.5：' + weatherData.pm25 + '\n' + '日期：' + weatherData.date + '\n' + '温度：' + weatherData.temperature + '\n' + '天气：' + weatherData.weatherDesc + '\n' + '风力：' + weatherData.wind + '\n';
            that.setData({
              currentCity: weatherData.currentCity,
              weatherData: weather
            });
          }
        });
      }
    })
  },
})