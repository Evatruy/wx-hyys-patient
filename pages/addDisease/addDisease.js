// pages/addDisease/addDisease.js
var util = require('../../utils/util.js')
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    items: [],//存放后台拉取的病症数据显示在页面
    hiddenmodalput: true,
    //可以通过hidden是否掩藏弹出框的属性，来指定那个弹出框  
    input_val: '',//反馈病症名称数据
    imgAdd: '/images/disease_add.png',
    token_Date: '',//token值
    arrayAll: [],//选择的病症存放的id
    num: '',//医生的id
    hideAll: true,//输入信息时隐藏下面展示内容
    itemsList: [],//搜索数据列表
    inputMsg: '',//input里面的值
    disB:'display:block',
    disN: 'display:none',
    itemsMsg:[],
    dis: 'display:none',
  },
  //搜索后点击添加病症到病症列表
  addDisease(e) {
    var that = this;
    var msg = [{
      id: parseInt(e.currentTarget.dataset.id),//字符串转整型
      name: e.currentTarget.dataset.text,
      checked: true,
    }]
    var arr = that.data.items;
    var arrMsg = that.data.itemsMsg
    function test() {
      var array = [];
      for (var i = 0; i < arr.length; i++) {
        array.push(arr[i].id);
      }
      return array;
    }
    function testMsg() {
      var array = [];
      for (var i = 0; i < arrMsg.length; i++) {
        array.push(arrMsg[i].id);
      }
      return array;
    }
    var num = test().indexOf(msg[0].id)
    var numMsg = testMsg().indexOf(msg[0].id)
    var bb = [];
    var itemsMsg = that.data.itemsMsg.concat(msg)
    if (num <0) {
      if(numMsg<0){
        that.setData({
          itemsMsg: itemsMsg
        })
        arr = that.data.items;
        bb.push(msg[0].id)
        that.setData({
          disB: 'display:block',
          disN: 'display:none',
          inputMsg: '',
          arrayAll: bb.concat(that.data.arrayAll)
        })
      }else{
        wx.showToast({
          title: '已有该病症了',
          icon: 'none',
        })
        return
      }
      
    } else {
      wx.showToast({
        title: '已有该病症了',
        icon: 'none',
      })
      return
    }
  },
  //获取input输入的值
  inputVal(e){
    if (e.detail.value==""){
      this.setData({
        dis: 'display:none',
        disN: 'display:none',
        disB: 'display:block',
      })
    }
    this.setData({
      inputMsg: e.detail.value
    })
  },
  //input获得焦点时隐藏下面的数据
  inputFouce(e) {
    var that = this;
    var inputMsg=this.data.inputMsg;
    if (inputMsg==""){
      wx.showToast({
        title: '搜索的内容不能为空',
        icon:'none'
      })
    }
    else {
      this.setData({
        disB: 'display:none',
        disN: 'display:block',
        itemsList: [],
      })
      var keyword = that.data.inputMsg;
      var data = {
        keyword: keyword
      }

      util.requestGet('api/disease', data, that.data.token, that.handleRequestMsg.bind(this))
    } 
  },
  //搜索请求病症
  handleRequestMsg(res) {
    if (res.status_code == 200) {
      if (res.data != '') {
        this.setData({

          itemsList: res.data
        })
      } else {
        this.setData({
          dis:'display:block'
        })
      }
    }
  },
  //是否选择病症
  checkboxChange: function (e) {
    if (e.detail.value == '') {
      for (var i = 0; i < this.data.items.length; i++) {
        this.data.items[i].checked = false
      }
      this.setData({
        arrayAll: []
      })
    }else{
      // var id = e.detail.value;
      // var selected=e.target.dataset.checked?false:true;
      this.setData({
        arrayAll: e.detail.value
      })
    }
  },
  //点击按钮指定的hiddenmodalput弹出框  
  modalinput: function () {
    // this.setData({
    //   hiddenmodalput: !this.data.hiddenmodalput
    // })
    this.setData({
      dis: 'display:none',
      disB: 'display:block',
      disN: 'display:none',
      inputMsg: '',
    })
  },
  //添加反馈数据到data
  input_btn(e) {
    this.setData({
      input_val: e.detail.value
    })
  },
  //取消按钮  
  cancel: function () {
    this.setData({
      hiddenmodalput: true
    });
  },
  //确认  
  confirm: function (e) {
    var data = {
      name: this.data.input_val
    }
    if (this.data.input_val == "") {
      wx.showToast({
        title: '反馈的病症名称不能为空',
        icon: 'none'
      })
    } else {
      util.requestPost('api/disease/addDisease', data, this.data.token_Date, this.handleSuccData.bind(this))
    }
  },
  //请求成功后
  handleSuccData(res) {
    if (res.status_code == 200) {
      wx.showToast({
        title: '反馈成功',
      })
      this.setData({
        hiddenmodalput: true
      })
    } else {
      this.setData({
        hiddenmodalput: true
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'token',
      success: this.handleStorage.bind(this),
    })
    // wx.getStorage({
    //   key: 'doctor_id',
    //   success: function (res) {
    //     that.setData({
    //       num: res.data
    //     })
    //   },
    // })
  },
  //获取token成功之后
  handleStorage(res) {
    this.setData({
      token: res.data
    })
    //加载病症列表
    util.requestGet("api/defaultDisease", {}, this.data.token, this.handleMsg.bind(this))
  },
  //请求信息获取数据后
  handleMsg(res) {
    if (res.status_code == 200) {
      this.setData({
        items: res.data
      })
    }
  },
  //点击确定按钮
  disease_ok() {
    if (this.data.arrayAll == '') {
      wx.reLaunch({
        url: '../service/index/index'
      })
    } else {
      var data=this.data.arrayAll;
      util.requestPost('api/editInfoTwo', { data: JSON.stringify(data)}, this.data.token, this.handleSuccDo.bind(this))
    }
  },
  //点击确定后提交数据后的操作
  handleSuccDo(res) {
    if (res.status_code == 200) {
      wx.reLaunch({
        url: '../service/index/index'
      })
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