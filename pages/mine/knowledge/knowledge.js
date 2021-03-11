// pages/mine/knowledge/knowledge.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showType:'',//控制显示
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      showType: options.name
    })
    var showType=options.name;
    if (showType == 0) {
      wx.setNavigationBarTitle({
        title: '血压小知识'
      })
      return false
    }
    if (showType == 1) {
      wx.setNavigationBarTitle({
        title: '血糖小知识'
      })
      return false
    }
    if (showType == 2) {
      wx.setNavigationBarTitle({
        title: 'BMI小知识'
      })
      return false
    }
    if (showType == 3) {
      wx.setNavigationBarTitle({
        title: '心率小知识'
      })
      return false
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