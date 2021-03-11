// pages/navigation/more/more.js
var util = require("../../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: '',//token值
    items: [],//详情数据
    host: util.host,//域名
    showMsg:false,
    page: '',//当前页
    num: '',//当前页的总条数
    count: '',//总条数
    pageCount: '',//总页数
    data_id:'',//药店id
  },
  //跳转药品详情
  linkDetails(e) {
    var data_id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../details/details?id=' + data_id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var data_id = options.id;
    this.setData({
      data_id:data_id
    })
    var that = this;
    wx.getStorage({
      key: 'token',
      success: function (res) {
        that.setData({
          token: res.data
        })
        util.requestGet("api/drugRecord", {"shop_id":data_id}, res.data, that.handleMsg.bind(this))
      },
    })
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
    var that = this;
    if (this.data.page < this.data.pageCount) {
      var page = this.data.page;
      page++;
      var data = {
        shop_id:this.data.data_id,
        page: page
      }
      util.requestGet('api/drugRecord', data, that.data.token, that.handleHasMsg.bind(this))
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