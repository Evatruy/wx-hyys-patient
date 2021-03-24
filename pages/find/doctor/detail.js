// pages/find/doctor/detail.js
const util = require('../../../utils/util')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    doctorInfoId:'',
    info:{},
    isFollow:0,
    isFold: true,
    diseaseData:[],
    serviceData:[],
    weekTitle:['本周', '一', '二', '三', '四', '五', '六', '日'],
    beforenoon:[],
    afternoon:[],
    evening:[],
    newsData:[]
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
    var that = this;
    let doctorInfoId = options.id;
    // console.log(doctorInfoId)
    that.setData({
      doctorInfoId:doctorInfoId
    })
    var rq = {
      doctorInfoId:options.id
    }
    util.requestPost2('patient/my/doctors/getDoctorInfo', rq, this.handleInfo.bind(this))
    util.requestPost2('patient/my/doctors/getDoctorOfflineTime', rq, this.handleTime.bind(this))
    rq = {
      doctorInfoId: options.id,
      num: 5
    }
    util.requestPost2('patient/my/doctors/getPatientArticleList', rq, this.handleNews.bind(this))
  },

  handleInfo(res){
    if(res.code == 0 && res.success){
      this.setData({
        info:res.data
      })
    }else{
      wx.showToast({
        title: res.message,
      })
    }
  },

  handleTime(res){
    if(res.code == 0 && res.success){      
      var before = [];  
      var after = [];
      var eve = [];
      for(let i=0; i < res.data.length; ++i){
        before[i] = res.data[i].map['morning'],
        after[i] = res.data[i].map['afternoon'],
        eve[i] = res.data[i].map['night']
      }
      this.setData({
        beforenoon:before,
        afternoon:after,
        evening:eve
      })
    }else{
      wx.showToast({
        title: res.message,
      })
    }
  },

  //处理专栏数据
  handleNews(res){
    console.log(res)
    if(res.code == 0 && res.success){
      this.setData({
        newsData:res.data
      })
    }else{
      wx.showToast({
        title: res.message,
      })
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