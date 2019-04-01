//app.js
App({
  onLaunch: function () {
    wx.login({
      success: function (res) {
        var code = res.code;//发送给服务器的code
        if (code) {
          wx.request({
            url: 'https://www.lixiuu.top/gdxq/login.php',
            data: {
              code: code,
            },
            method: 'GET',
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              //console.log(res.data);
              wx.setStorageSync('openid', res.data);//将获取信息写入本地缓存  
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