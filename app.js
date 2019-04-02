//app.js
App({
  onLaunch: function () {
    //wx.setStorageSync("relateBaby", "相家喻");
    wx.login({
      success: function (res) {
        var code = res.code;//发送给服务器的code
        if (code) {
          wx.request({
            url: 'https://www.xiangjiayu.com:8443/auth/login',
            data: {
              code: code,
            },
            method: 'GET',
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              //将获取信息写入本地缓存 
              wx.setStorageSync('openid', res.data.openid); 
              wx.setStorageSync("relateBaby", res.data.name);
            }
          })
        }
        else {
          console.log("获取用户登录态失败！");
        }
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  globalData: {
    userInfo: null
  }
})