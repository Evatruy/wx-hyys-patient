// pages/login/login.js
var util=require("../../utils/util.js");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { name: '1', value: '男', checked: 'true'},
      { name: '2', value: '女' }
    ],//男女
    name:'',//姓名
    age:'',//年龄
    sex:'1',//默认男
    phone: '',//获取到的手机栏中的值
    verification_code: '',//验证码
    text: '', //秒数
    currentTime: 60, //倒计时
    token: '',//token
    showText: true,//控制是否显示秒数和验证码
    textAll: '发送验证码'//显示验证码文案
  },
  //获取name的值
  nameInput(e){
    this.setData({
      name: e.detail.value
    })
  },
  //获取年龄
  ageInput(e){
    this.setData({
      age: e.detail.value
    })
  },
  //获取手机号
  phoneInput(e){
    this.setData({
      phone: e.detail.value
    })
  },
  //获取验证码
  codeInput(e) {
    this.setData({
      verification_code: e.detail.value
    })
  },
  //获取男女改变事件
  radioChange(e) {
    this.setData({
      sex:e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.getStorage({
      key: 'token',
      success: function(res) {
        that.setData({
          token:res.data
        })
      },
    })
  },
  //点击下一步进行判断
  onSubmit() {
    var that = this;
    var name = that.data.name;
    var sex =that.data.sex;
    var age = that.data.age;
    var phone = that.data.phone;
    var verification_code = that.data.verification_code;
    this.test(name, sex, age, phone, verification_code)
  },
  //判断用户是否填写这些值
  test(name, sex, age, phone, verification_code){
    if (name.trim() == "") {
      wx.showToast({
        title: "姓名不能为空",
        icon: 'none',
        duration: 2000
      })
      return false
    }
    if (!(/[\u4e00-\u9fa5]+/).test(name)) {
      wx.showToast({
        title: "请输入为汉字的姓名",
        icon: 'none',
        duration: 2000
      })
      return false
    }
    if (age.trim() == "") {
      wx.showToast({
        title: "年龄不能为空",
        icon: 'none',
        duration: 2000
      })
      return false
    }
    if (!(/^[1-9]\d?$|^1[01]\d$|^120$/).test(age)) {
      wx.showToast({
        title: "请输入1-120的年龄",
        icon: 'none',
        duration: 2000
      })
      return false
    }
    if (phone == '') {
      wx.showToast({
        title: "电话号码不能为空",
        icon: 'none',
        duration: 2000
      })
      return false
    } if (phone.trim().length != 11 || !/^1[3|4|5|6|7|8|9]\d{9}$/.test(phone)) {
      wx.showToast({
        title: "手机号格式不正确",
        icon: 'none',
        duration: 2000
      })
      return false
    } if (verification_code == '') {
      wx.showToast({
        title: "验证码不能为空",
        icon: 'none',
        duration: 2000
      })
      return false
    } 
    else {
      this.ajaxPost(name, sex, age, phone, verification_code)
    }
  },
  //判断符合条件后执行的方法
  ajaxPost(name, sex, age, phone, verification_code){
    var data = {
      name: name,
      sex: sex,
      age: age,
      phone: phone,
      code: verification_code
    }
    util.requestPost('api/editInfoOne', data, this.data.token, this.handleSubmitSucc.bind(this))
  },
  //点击下一步跳转
  handleSubmitSucc(res){
    if(res.status_code==200){
      wx.setStorage({
        key: 'login',
        data: 'ok',
      })
      wx.reLaunch({
        url: '../addDisease/addDisease',
      })
    }else{
      wx.showToast({
        title: res.message,
        icon:'none'
      })
    }
  },
  //获取验证码按钮
  bindButtonTap: function () {
    var that = this;
    var phone = that.data.phone;
    var warn = null; //warn为当手机号为空或格式不正确时提示用户的文字，默认为空
    if (phone == '') {
      warn = "号码不能为空";
    } else if (phone.trim().length != 11 || !/^1[3|4|5|6|7|8|9]\d{9}$/.test(phone)) {
      warn = "手机号格式不正确";
    } else {
      var data = {
        phone: phone
      }
      util.requestPost('api/verificationCodes', data, this.data.token, this.handleRequestPostSucc.bind(this))
    };
    //判断 当提示错误信息文字不为空 即手机号输入有问题时提示用户错误信息 并且提示完之后一定要让按钮为可用状态 因为点击按钮时设置了只要点击了按钮就让按钮禁用的情况
    if (warn != null) {
      wx.showToast({
        title: warn,
        icon: 'none',
        duration: 2000
      })
      return;
    };
  },
  //请求验证码成功后执行的方法
  handleRequestPostSucc(res) {
    var that = this;
    var currentTime = this.data.currentTime //把手机号跟倒计时值变例成js值
    if (res.status_code == 200) {
      wx.showToast({
        title: '发送成功',
        icon:'none'
      })
      //设置一分钟的倒计时
      var interval = setInterval(function () {
        currentTime--; //每执行一次让倒计时秒数减一
        that.setData({
          text: currentTime + 's', //按钮文字变成倒计时对应秒数
          showText: false
        })
        //如果当秒数小于等于0时 停止计时器 且按钮文字变成重新发送 且按钮变成可用状态 倒计时的秒数也要恢复成默认秒数 即让获取验证码的按钮恢复到初始化状态只改变按钮文字
        if (currentTime <= 0) {
          clearInterval(interval)
          that.setData({
            textAll: '重新发送',
            currentTime: 60,
            showText: true
          })
        }
      }, 1000);
    } else {
      wx.showToast({
        title: '获取验证码失败',
        icon: 'none',
        duration: 2000
      });
    }
  },
  //点击跳转用户协议
  loginWord(){
    wx.navigateTo({
      url: './loginWord/loginWord',
    })
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