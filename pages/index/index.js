Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenmodalput: true,
    hide1: true,
    hide2: true,
    isRegister: true,
    sname: "",
    snum: "",
    slesson: "",
    sclass: "",
  },
  //点击按钮弹出指定的hiddenmodalput弹出框
  modalinput1: function (e) {
    var that = this;
    if (e.detail.userInfo != undefined) {
      if (that.data.isRegister == false) {
        that.setData({
          hiddenmodalput: !that.data.hiddenmodalput,
          hidden1: false,
          hidden2: true,
        })
      } else {
        wx.navigateTo({ url: '../student_lesson/student_lesson' })
      }
    }
  },
  modalinput2: function (e) {
    if (e.detail.userInfo != undefined) {
      this.setData({
        hiddenmodalput: !this.data.hiddenmodalput,
        hidden1: true,
        hidden2: false,
      })
    }
  },
  goLesson: function () {
    wx.navigateTo({ url: '../lesson/lesson' })
  },
  //取消按钮
  cancel: function () {
    this.setData({
      hiddenmodalput: true,
    });
  },
  //确认
  confirm: function (e) {
    var that = this;
    this.setData({
      hiddenmodalput: true,
    })
    if ((that.data.sname && that.data.snum) || (that.data.slesson && that.data.sclass) != '') {
      this.charu()
      this.setData({
        slesson: "",
        sclass: "",
      })
    } else {
      wx.showToast({
        title: '输入为空(+_+)?',
        icon: 'none'
      })
    }
  },

  //获取input的信息
  setname: function (e) {
    this.setData({ sname: e.detail.value })
  },
  setnum: function (e) {
    this.setData({ snum: e.detail.value })
  },
  setlesson: function (e) {
    this.setData({ slesson: e.detail.value })
  },
  setclass: function (e) {
    this.setData({ sclass: e.detail.value })
  },

  charu: function () {
    var that = this;
    var userid = wx.getStorageSync('openid');
    wx.request({
      url: 'https://www.xxxxx.com/sign.php',
      data: {
        userid: userid,
        sname: that.data.sname,
        snum: that.data.snum,
        slesson: that.data.slesson,
        sclass: that.data.sclass
      },
      method: 'POST',
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        //console.log(res.data)
        if (res.data === "student") {
          wx.showToast({
            title: '添加成功！',
            icon: 'success'
          })
          wx.navigateTo({ url: '../student_lesson/student_lesson' })
          that.setData({
            isRegister: true,
          })
        } else {
          wx.showToast({
            title: '添加成功！',
            icon: 'none'
          })
          wx.navigateTo({ url: '../lesson/lesson' })
        }
      },
      fail: function (res) {

      },
      complete: function (res) { },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var userid = wx.getStorageSync('openid');
    wx.request({
      url: 'https://www.xxxxx.com/check_student.php',
      data: { userid: userid },
      method: 'POST',
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        if (res.data == null) {
          that.setData({
            isRegister: false
          })
        }
      },
      fail: function (res) { },
      complete: function (res) { },
    })

    wx.showLoading({
      title: '加载中',
    })

    setTimeout(function () {
      wx.hideLoading()
    }, 1500)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      hiddenmodalput: true
    })
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})