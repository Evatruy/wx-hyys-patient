// pages/service/reply/reply.js
var util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',//id值
    textMsg: '',//提交的文本数据
    token: '',//token值
    turn: true,//开关
  },
  //输入框的值
  textMsg(e) {
    this.setData({
      textMsg: e.detail.value
    })
  },
  //点击按钮进行提交
  onSubmit(e) {
    var turn=this.data.turn
    var textMsg = this.data.textMsg;
    if (textMsg == '') {
      wx.showToast({
        title: '回复的内容不能为空',
        icon: 'none'
      })
    } else {
      if(turn){
        this.setData({
          turn:false
        })
        var data = {
          id: this.data.id,
          content: this.data.textMsg,
          from_id: e.detail.formId,
        }
        util.requestPost("api/pharmacist/addReply", data, this.data.token, this.handleMsg.bind(this))
      }
     
    }
  },
  handleMsg(res) {
    var that=this
    if(res.status_code==200){
      wx.showToast({
        title: '提交成功',
        icon:'none'
      })
      setTimeout(function(){
        that.setData({
          turn: true
        })
        wx.navigateBack({
          delta: 1
        })
      },1000)
      
    }
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this
    var id=options.id;
    this.setData({
      id:id
    })
    wx.getStorage({
      key: 'token',
      success: function(res) {
        that.setData({
          token:res.data
        })
      },
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