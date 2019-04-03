Page({
  /**
   * 页面的初始数据
   */
  data: {
    student_lesson: [],
    bgcolor1: "gainsboro",
    bgcolor2: "white",
    ismine:false,
    listhidden: true,
    formhidden: false,
    startTime:"",
    endTime:"",
    telephone:""
  },

  apply: function () {
    this.onLoad();
    this.setData({
      bgcolor1: "gainsboro",
      bgcolor2: "white",
      ismine:false,
      listhidden:true,
      formhidden:false
    })
  },

  history: function () {
    this.setData({
      bgcolor1: "white",
      bgcolor2: "gainsboro",
      ismine: true,
      listhidden: false,
      formhidden: true
    });

    var openid = wx.getStorageSync('openid');//用户id
    var name = wx.getStorageSync("relateBaby");
    //请求请假数据
    var that = this;
    wx.request({
      url: 'https://www.xiangjiayu.com:8443/student/list',
      data: {
        openid: openid,
        name: name
      },
      method: 'POST',
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        if (res.data.result === true) {
          //设置数据
          that.setData({
            student_lesson: res.data.data
          })
        } else {
          wx.showToast({
            title: '查询失败,请联系管理员',
            icon: 'none'
          })
        }
      }
    })
  },

  startDateChange: function (e) {
    console.log(e)
      this.setData({
        startTime: e.detail.value
      })
      console.log(this.data);
  },
  endDateChange: function (e) {
    this.setData({
      endTime: e.detail.value
    })
  },
  searchBox: function (e) {
    console.log(e.detail.value);
    var openid = wx.getStorageSync('openid');//用户id
    var name = wx.getStorageSync("relateBaby");
    var startTime = e.detail.value.startTime;
    var endTime = e.detail.value.endTime;
    var telephone = e.detail.value.telephone;
    console.log(openid);
    wx.request({
      url: 'https://www.xiangjiayu.com:8443/student/apply',
      data: {
        openid: openid,
        startTime: startTime,
        endTime: endTime,
        name: name,
        telephone: telephone
      },
      method: 'POST',
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        console.log(res.data.result);
        if (res.data.result == true) {
          wx.showToast({
            title: '申请成功',
            icon: 'none'
          })
        } else {
          wx.showToast({
            title: '申请失败,请联系管理员',
            icon: 'none'
          })
        }
      }
    })
  }
})