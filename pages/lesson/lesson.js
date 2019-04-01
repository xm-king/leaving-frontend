// pages/lesson/lesson.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lesson: [],
    hiddenmodalput: true,
    hiddendelete: true,
    lessonId: "",
    slesson: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var userid = wx.getStorageSync('openid'); //用户id
    wx.request({
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      url: 'https://www.xxxxx.com/load_lesson.php',
      data: {
        userid: userid
      },
      success: function(res) {
        //console.log(res.data);
        that.setData({
          lesson: res.data
        })
      },
      fail: function(res) {
        wx.showToast({
          title: '获取信息失败',
          icon: 'none'
        })
      },
      complete: function(res) {
        wx.showLoading({
          title: '加载中',
        })
        setTimeout(function() {
          wx.hideLoading()
        }, 1000)
        if (res.data == '') {
          wx.showToast({
            title: '您还没有创建课程哟！',
            icon: 'none'
          })
        }
      }
    })
  },
  chooselesson: function(e) {
    this.setData({
      lessonId: e.currentTarget.dataset.id,
      slesson: e.currentTarget.dataset.lesson
    })
    this.setData({
      hiddenmodalput: false
    })
  },
  //取消按钮
  cancel: function() {
    this.setData({
      hiddenmodalput: true,
    });
  },
  /** 查看历史考勤*/
  confirm: function() {
    wx.navigateTo({
      url: '../historyrecord/historyrecord?lessonid=' + this.data.lessonId + ''
    })
  },
  goKaoqin: function(e) {
    var that = this;
    wx.request({
      url: 'https://www.xxxxx.com/checkKaoqin.php',
      data: {
        id: that.data.lessonId
      },
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        //console.log(res.data)
        if (res.data == null) {
          wx.navigateTo({
            url: '../kaoqin/kaoqin?lessonid=' + that.data.lessonId + '&slesson=' + that.data.slesson + ''
          })
        } else {
          if (res.data.state === 'false') {
            wx.navigateTo({
              url: '../kaoqin/kaoqin?lessonid=' + that.data.lessonId + '&slesson=' + that.data.slesson + ''
            })
          } else {
            wx.navigateTo({
              url: '../t_signList/t_signList?lessonid=' + that.data.lessonId + ''
            })
          }
        }

      },
      fail: function(res) {},
      complete: function(res) {},
    })

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.setData({
      hiddenmodalput: true,
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})