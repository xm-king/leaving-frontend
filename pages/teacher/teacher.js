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
    applyhidden: false,
    startTime:"",
    endTime:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var userid = wx.getStorageSync('openid');//用户id
    var relatedBaby = wx.getStorageSync("relateBaby");
    var res_data = [
      { 
        slesson: '相家喻', 
        applyTime: '2018-09-02', 
        status:'已确认'
    }, {
        slesson: '相家喻', 
        applyTime: '2018-09-01',
        status: '已阅'
      }];
    that.setData({
      student_lesson: res_data
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
  doAudit: function () {
    var openid = wx.getStorageInfoSync('openid');
    var startTime = this.data.startTime;
    var endTime = this.data.endTime;
    console.log({ "openid": openid, "startTime": startTime,"endTime":endTime});
  },
})