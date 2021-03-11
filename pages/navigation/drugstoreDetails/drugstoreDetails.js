// pages/navigation/drugstoreDetails/drugstoreDetails.js
var util = require("../../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token:'',//token值
    items:[],//详情数据
    host:util.host,//域名
    hideMsg:false
  },
  //点击跳转查看更多
  linkMore(e){
    var data_id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../more/more?id='+data_id,
    })
  },
  //跳转药品详情
  linkDetails(e){
    var data_id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../details/details?id='+data_id,
    })
  },
  //跳转查看路线
  linkMap(e){
    var startLng = this.data.startLng;
    var startLat = this.data.startLat;
    var end = e.currentTarget.dataset.address;//终点
    var end_longitude = e.currentTarget.dataset.longitude;//终点经度
    var end_latitude = e.currentTarget.dataset.latitude;//终点纬度
    wx.navigateTo({
      url: '../map/map?address=' + end + '&end_longitude=' + end_longitude + '&end_latitude=' + end_latitude + '&startLng' + startLng + '&startLat' + startLat,
    })
  },
  //拨打电话
  phoneCall(e) {
    console.log(e.currentTarget.dataset.phone)
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone // 仅为示例，并非真实的电话号码
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showToast({ title: '加载中', icon: 'loading', duration: 10000 });
    let data_id = options.id;
    var that = this;
    wx.getStorage({
      key: 'token',
      success: function (res) {
        that.setData({
          token: res.data
        })
        util.requestGet("api/shop/" + data_id, data_id, res.data, that.handleMsg.bind(this))
      },
    })
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        const speed = res.speed
        const accuracy = res.accuracy
        that.setData({
          startLng: longitude,
          startLat: latitude
        })
      }
    })
  },
  handleMsg(res){
    if (res.status_code == 200) {
      this.setData({
        items:res.data,
        hideMsg:true
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