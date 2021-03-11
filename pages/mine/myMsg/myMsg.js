// pages/mine/myMsg/myMsg.js
var util=require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    more:false,
    noMore:false,
    items:[],//数据
    token:'',//token值
    showMsg:false,//是否显示暂无数据
    page: '',//当前页
    num: '',//当前页的总条数
    count: '',//总条数
    pageCount: '',//总页数
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this;
    wx.getStorage({
      key: 'token',
      success: function(res) {
        that.setData({
          token:res.data
        })
        util.requestGet("api/my/message", {}, res.data, that.handleMsg.bind(this))
      },
    })
  },
  handleMsg(res){
    if(res.status_code==200){
      if (res.data == "") {
       this.setData({
         showMsg:true
       })
      }else{
        this.setData({
          items: res.data,
          page: res.page,//当前页
          num:res.num,//当前页的总条数
          count:res.count,//总条数
          pageCount: res.pageCount,//总页数
        })
        if (this.data.page < this.data.pageCount) {
          this.setData({
            more:true
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
  onReachBottom: function (e) {
    var that=this
    if (this.data.page < this.data.pageCount) {
     
      var page = this.data.page;
      page++;
      var data = {
        page: page
      }
    util.requestGet('api/my/message', data, that.data.token, that.handleHasMsg.bind(this))

      return false
    } 
    if (this.data.page ==this.data.pageCount) {
      this.setData({
        more: false,
        noMore: true
      })
    }
  },
  handleHasMsg(res){
    if (res.status_code == 200) {
      var msg=this.data.items;
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