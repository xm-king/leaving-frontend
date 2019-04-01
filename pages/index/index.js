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
    array: ['请选择','姚沛阳',
      '高雨暄',
      '章宸恺',
      '赵可馨',
      '李丁睿',
      '杨晨曦',
      '刘宇恒',
      '史语欣',
      '姚宇浩',
      '谢一晨',
      '向妤轩',
      '严熙程',
      '童瑾荃',
      '魏一诺',
      '申屠子远',
      '黄婉怡',
      '相家喻',
      '颜睿阳',
      '江佑恩',
      '刘芮琪',
      '王梓芃',
      '王彦喆',
      '石啸奕',
      '郑宇航',
      '马筱语',
      '庞瑾萱',
      '赵恬歆',
      '胡芯淼',
      '朱可依',
      '陶皓杨',
      '王梦媛',
      '陈俊豪',
      '张雨萱',
      '姚铮',
      '周子茉'],
    index: 0,
  },
  //点击按钮弹出指定的hiddenmodalput弹出框
  teacherInput: function (e) {
   wx.navigateTo({ url: '../teacher/teacher' })
  },
  parentInput: function (e) {
    console.log(e.detail.userInfo);
    //var relateBaby = wx.getStorageSync("relateBaby");
    var relateBaby = '';
    console.log(relateBaby);
    if (!relateBaby) {
      //未关联宝贝,首先需要关联宝贝
      this.setData({
        hiddenmodalput: !this.data.hiddenmodalput,
        hidden1: true,
        hidden2: false,
      })
    }else{
      //跳转到请假申请中
      wx.navigateTo({ url: '../student_lesson/student_lesson' })
    }
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
    //检查输入的宝贝名称
    if(that.data.index == 0){
      wx.showToast({
        title: '请选择有效的宝贝名称',
        icon:"none"
      })
      return;
    }
    var relatedBaby = that.data.array[that.data.index];
    var openid = wx.getStorageSync('openid'); 
    //建立绑定关系
    /*
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
            title: '绑定成功！',
            icon: 'success'
          })
          wx.navigateTo({ url: '../student_lesson/student_lesson' })
          that.setData({
            isRegister: true,
          })
        } else {
          wx.showToast({
            title: '绑定成功！',
            icon: 'none'
          })
          wx.navigateTo({ url: '../lesson/lesson' })
        }
      },
      fail: function (res) {

      },
      complete: function (res) { },
    })
    */
    //
    //绑定成功,跳转到请假申请中
    wx.navigateTo({ url: '../student_lesson/student_lesson' })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var userid = wx.getStorageSync('openid');
    wx.request({
      url: 'https://www.xiangjiayu.com/check_student.php',
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
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  }

})