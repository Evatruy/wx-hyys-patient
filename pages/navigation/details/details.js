// pages/navigation/details/details.js
var util = require("../../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: '',//token值
    items: [],//详情数据
    host: util.host//域名
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showToast({ title: '加载中', icon: 'loading', duration: 10000 });
      var data_id=options.id;
      var that = this;
    wx.getStorage({
      key: 'token',
      success: function (res) {
        that.setData({
          token: res.data
        })
        util.requestGet("api/drug/"+data_id, data_id, res.data, that.handleMsg.bind(this))
      },
    })
  },
  //加载列表数据
  handleMsg(res) {
    if (res.status_code == 200) {
        this.setData({
          items: res.data,
        })
      wx.hideToast();
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