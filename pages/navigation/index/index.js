// pages/navigation/index/index.js
var util = require("../../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items:[],//药店导航数据
    startLng:'',//经度
    startLat:'',//纬度
    showMsg: false,//是否显示暂无数据
    page: '',//当前页
    num: '',//当前页的总条数
    count: '',//总条数
    pageCount: '',//总页数
  },
  //点击跳转到药店详情页
  linkDetails(e){
    var data_id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../drugstoreDetails/drugstoreDetails?id='+data_id,
    })
  },
  //拨打电话
  phoneCall(e){
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone // 仅为示例，并非真实的电话号码
    })
  },
  //点击查看线路进行跳转页面
  linkMap(e){
    // if (this.data.startLng==""){
    //   wx.showToast({
    //     title: '拒绝获取地理位置将无法查看路线',
    //     icon:'none'
    //   })
    // }else{
      var startLng = this.data.startLng;
      var startLat = this.data.startLat;
      var end = e.currentTarget.dataset.address;//终点
      var end_longitude = e.currentTarget.dataset.longitude;//终点经度
      var end_latitude = e.currentTarget.dataset.latitude;//终点纬度
      wx.navigateTo({
        url: '../map/map?address=' + end + '&end_longitude=' + end_longitude + '&end_latitude=' + end_latitude + '&startLng' + startLng + '&startLat' + startLat,
      })
    // }
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
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
    wx.getStorage({
      key: 'token',
      success: function (res) {
        that.setData({
          token: res.data
        })
        util.requestGet("api/shop", {}, res.data, that.handleMsg.bind(this))
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
    // wx.getStorage({
    //   key: 'open',
    //   success(res) {
    //     console.log(res.data)
    //   },
    //   fail(){
    //     // wx.setTabBarBadge({
    //     //   index: 0,
    //     //   text: '2'
    //     // })
    //   }
    // })
   
  },
  //加载列表数据
  handleMsg(res) {
    if (res.status_code == 200) {
      if (res.data == "") {
        this.setData({
          showMsg: true
        })
      } else {
        this.setData({
          showMsg: false,
          items: res.data,
          page: res.page,//当前页
          num: res.num,//当前页的总条数
          count: res.count,//总条数
          pageCount: res.pageCount,//总页数
        })
        if (this.data.page < this.data.pageCount) {
          this.setData({
            more: true
          })
        }
      }
    }
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
    var that = this;
    if (this.data.page < this.data.pageCount) {
      var page = this.data.page;
      page++;
      var data = {
        page: page
      }
      util.requestGet('api/shop', data, that.data.token, that.handleHasMsg.bind(this))
      return false
    }
    if (this.data.page == this.data.pageCount) {
      this.setData({
        more: false,
        noMore: true
      })
    }
  },
  handleHasMsg(res) {
    if (res.status_code == 200) {
      var msg = this.data.items;
      var items = msg.concat(res.data);
      this.setData({
        items: items,
        page: res.page,//当前页
        num: res.num,//当前页的总条数
        count: res.count,//总条数
        pageCount: res.pageCount,//总页数
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})