// pages/consult/consult.js
const util = require("../../utils/util");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    /**
    * 页面配置
    */
    winWidth: 0,
    winHeight: 0,
    // tab切换
    currentTab: 0,
    dataList:[]
  },

    /**
     * 滑动切换tab
     */
    bindChange: function(e) {
      var that = this;
      that.setData( { 
        currentTab: e.detail.current
       });
       that.getDataList()
    },
    /**
     * 点击tab切换
     */
    swichNav: function(e) {   
      var that = this;   
      if( this.data.currentTab === e.target.dataset.current ) {
        return false;
      } else {
        that.setData( {
          currentTab: e.target.dataset.current
        })
        that.getDataList()
      }
    },

    /**
     * 获取list数据
     */
    getDataList: function(){
      var that = this;        
      var rq = {
        type: that.data.currentTab+2
      }
      util.requestPost2("patient/orders/queryConsulting", rq, this.handleList.bind(this))
    },

    handleList: function(res){
      console.log(res);
      if(res.code == 0 && res.success){
        this.setData({
          dataList: res.data
        })    
      }else{
        wx.showToast({
          title: res.message,
        })
      }
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.getDataList();
    /**
     * 获取系统信息
     */
    wx.getSystemInfo( {
      success: function( res ) {
        that.setData( {
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
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