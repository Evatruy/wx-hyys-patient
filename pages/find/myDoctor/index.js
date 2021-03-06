const util = require("../../../utils/util");

// pages/find/myDoctor/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    doctorData:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.requestPost2("patient/my/doctors/getMyDoctorsList", {}, this.handleList.bind(this))
  },

  //加载列表
  handleList(res) {
    if(res.code == 0 && res.success){
      this.setData({
        doctorData: res.data
      })
    }else{
      wx.showToast({
        title: res.message,
      })
    }
  },

  //跳转医生详情页
  linkDetails(e){
    var data_id = e.currentTarget.dataset.item.id
    wx.navigateTo({
      url: '../doctor/detail?id='+data_id,
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