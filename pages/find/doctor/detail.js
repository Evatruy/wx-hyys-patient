// pages/find/doctor/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isFollow:0,
    isFold: true,
    diseaseData:[],
    serviceData:[],
    weekTitle:['本周', '一', '二', '三', '四', '五', '六', '日'],
    beforenoon:['专家', '普通', '门诊', '特需', '名医', '普通', '专家'],
    afternoon:['特需', '名医', '普通', '专家', '专家', '普通', '门诊'],
    evening:['专家', '普通', '门诊', '特需', '名医', '普通', '专家']
  },

  showAll: function (e) {
    this.setData({
     isFold: !this.data.isFold,
    })
   },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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