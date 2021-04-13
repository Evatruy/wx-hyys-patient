const util = require("../../utils/util");

// pages/find/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerData:[],//banner
    teamData:[],//专家团队    
    departData:[],//热门科室
    diseaseData:[],
    newsData:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //请求banner    
    var data = {
      type: '5'
    }
    util.requestPost2("common/banner/list", data, that.handleBanner.bind(this));
    //请求专家团队数据
    util.requestPost2("patient/doctor/teams/getSearchList", {}, that.handleTeam.bind(this))
    util.requestPost2("patient/my/doctors/getHotDepartmentLabelList", {}, this.handleDepart.bind(this))
    var diseaseRq = {
      num: '6'
    }
    util.requestPost2("patient/my/doctors/getHotDiseaseList", diseaseRq, this.handleDisease.bind(this))
    var newsRq = {
      pageNum: '1',
      pageSize: '5'
    }
    util.requestPost2("patient/articles/getRecommendList", newsRq, this.handleNews.bind(this))
  },

  //加载banner数据
  handleBanner(res){
    if(res.code == 0 && res.success){
      this.setData({
        bannerData: res.data
      })    
    }else{
      wx.showToast({
        title: res.message,
      })
    }
  },

  //加载专家团队列表数据
  handleTeam(res){    
    if(res.code == 0 && res.success){
      this.setData({
        teamData: res.data
      })    
    }else{
      wx.showToast({
        title: res.message,
      })
    }
  },

  //加载热门科室数据
  handleDepart(res){    
    if(res.code == 0 && res.success){
      this.setData({
        departData: res.data
      })    
    }else{
      wx.showToast({
        title: res.message,
      })
    }
  },

  //加载常见病症数据
  handleDisease(res){    
    if(res.code == 0 && res.success){
      this.setData({
        diseaseData: res.data
      })    
    }else{
      wx.showToast({
        title: res.message,
      })
    }
  },

  //加载科普数据
  handleNews(res){    
    if(res.code == 0 && res.success){
      this.setData({
        newsData: res.data.list
      })    
    }else{
      wx.showToast({
        title: res.message,
      })
    }
  },

  //我的医生
  toMyDoctor(){
    wx.navigateTo({
      url: '../find/myDoctor/index',
    })
  },

  //首诊免费
  toSzmf(){
    wx.navigateTo({
      url: '/pages/find/szmf/index',
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