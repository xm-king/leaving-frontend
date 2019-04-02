Page({
  /**
   * 页面的初始数据
   */
  data: {
    apply_data: [],
    list_data: [],
    bgcolor1: "gainsboro",
    bgcolor2: "white",
    ismine:false,
    listhidden: true,
    applyhidden: false,
    startTime:"",
    endTime:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: getApp().globalData.SERVER_URL +'/teacher/list',
      method: 'GET',
      success: function (res) {
        console.log(res.data);
        that.setData({
          apply_data: res.data
        })
      }
    })
  },
  apply: function () {
    this.onLoad();
    this.setData({
      bgcolor1: "gainsboro",
      bgcolor2: "white",
      ismine:false,
      listhidden:true,
      applyhidden:false
    })
  },
  history: function () {
    var that = this;
    wx.request({
      url: getApp().globalData.SERVER_URL +'/teacher/lastList',
      method: 'GET',
      success: function (res) {
        console.log(res.data);
        that.setData({
          list_data: res.data
        })
      }
    })
    this.setData({
      bgcolor1: "white",
      bgcolor2: "gainsboro",
      ismine: true,
      listhidden:false,
      applyhidden: true
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
  doAudit: function (e) {
    var applyId = e.currentTarget.dataset.applyid;
    wx.request({
      url: getApp().globalData.SERVER_URL +'/teacher/audit',
      data: {
        applyId: applyId
      },
      method: 'POST',
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        console.log(res.data.result);
        if (res.data.result == true) {
          wx.showToast({
            title: '审批成功',
            icon: 'none'
          })
        } else {
          wx.showToast({
            title: '审批失败,请联系管理员',
            icon: 'none'
          })
        }
      }
    })
  },
})