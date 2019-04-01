// pages/student_lesson/student_lesson.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    student_lesson: [],
    bgcolor1: "gainsboro",
    bgcolor2: "white",
    ismine:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var userid = wx.getStorageSync('openid');//用户id
    wx.request({
      method: 'POST',
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      url: 'https://www.xxxxx.com/load_student_lesson.php',
      data: {},
      success: function (res) {
        //console.log(res.data);
        that.setData({
          student_lesson: res.data
        })
      },
      fail: function (res) {
        wx.showToast({
          title: '获取信息失败',
          icon: 'none'
        })
      },
      complete: function (res) {
        wx.showLoading({
          title: '加载中',
        })
        setTimeout(function () {
          wx.hideLoading()
        }, 1000)
        if (res.data == '') {
          wx.showToast({
            title: '还没有创建课程哟！',
            icon: 'none'
          })
        }
      }
    })
  },
  all: function () {
    this.onLoad();
    this.setData({
      bgcolor1: "gainsboro",
      bgcolor2: "white",
      ismine:false
    })
  },
  mine: function () {
    this.setData({
      bgcolor1: "white",
      bgcolor2: "gainsboro",
      ismine: true
    })

    var that = this;
    var userid = wx.getStorageSync('openid');//用户id
    wx.request({
      method: 'POST',
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      url: 'https://www.xxxxx.com/load_mylesson.php',
      data: {
        userid: userid
      },
      success: function (res) {
        //console.log(res.data);
        if (res.data == null) {
          that.setData({
            student_lesson: ""
          })
        }else{
          that.setData({
            student_lesson: res.data
          })
        }
      },
      fail: function (res) {
        wx.showToast({
          title: '获取信息失败',
          icon: 'none'
        })
      },
      complete: function (res) {
        wx.showLoading({
          title: '加载中',
        })
        setTimeout(function () {
          wx.hideLoading()
        }, 1000)
      }
    })
  },
  addlesson: function (e) {
    var lessonid = e.currentTarget.dataset.id;
    //console.log(lessonid)
    var slesson = e.currentTarget.dataset.lesson;
    var sclass = e.currentTarget.dataset.class;
    var setTime = e.currentTarget.dataset.stime;
    var userid = wx.getStorageSync('openid');//用户id
    if(this.data.ismine==false){
      wx.showModal({
        title: slesson,
        content: '是否添加到"我的课程"?',
        success: function (res) {
          if (res.confirm) {
            wx.request({
              url: 'https://www.xxxxx.com/addlesson.php',
              data: {
                lessonid: lessonid,
                userid: userid,
                slesson: slesson,
                sclass: sclass,
                setTime: setTime
              },
              method: 'POST',
              header: { 'Content-Type': 'application/x-www-form-urlencoded' },
              success: function (res) {
                if (res.data === "yes") {
                  wx.showToast({
                    title: '已经添加过了',
                    icon: 'none'
                  })
                } else {
                  wx.showToast({
                    title: '添加成功',
                    icon: 'success'
                  })
                }
              },
              fail: function (res) { },
              complete: function (res) { },
            })
          } else {
            //console.log('用户点击取消')
          }

        }
      })
    }else{
      wx.navigateTo({
        url: '../sign/sign?lessonid=' + lessonid+'&slesson=' + slesson+''})
    }

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