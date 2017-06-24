//app.js
App({
  globalData: {
    userInfo: null,
    siteBaseUrl: 'http://aweig.com',
  },

  onLaunch: function() {
    
    this.login();
  },

  
  
  
  login: function () {//登录
        console.log("login start");
        var that = this;
        wx.login({//微信登录
            success: function (res) {
                var code = res.code;
                wx.getUserInfo({//微信用户信息
                    success: function (res) {
                        console.log(res);
                        that.globalData.userInfo = res.userInfo;
                        var encryptedData = res.encryptedData;
                        var iv = res.iv;

                        // wx.request({//调用登录接口
                        //     url: that.globalData.siteBaseUrl + '/user/login.html',
                        //     data: {
                        //         code: code,
                        //         encryptedData: encryptedData,
                        //         iv: iv
                        //     },
                        //     method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                        //     header: { 'Content-Type': 'application/x-www-form-urlencoded;' },

                        //     success: function (res) {
                        //         console.log(res);
                        //         wx.setStorageSync('token', res.data.token);

                                
                        //     },    
                        //     fail: function (res) {
                        //         console.log('wx.request fail', res)
                        //     }
                        // });
                    },
                    fail: function (res) {
                        console.log('wx.getUserInfo fail', res)
                    }
                })
            },
            fail: function (res) {
                console.log('wx.login fail', res)
            }
        })
    },
})
