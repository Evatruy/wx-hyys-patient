const util = require("../../utils/util");
// pages/science/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerData:[],//banner
    more: false,
    noMore: false,
    showMsg: false,//是否显示暂无数据
    page: '1',//当前页
    num: '',//当前页的总条数
    count: '',//总条数
    pageCount: '',//总页数
    items:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //请求banner    
    var data = {
      type: '10'
    }
    util.requestPost2("common/banner/list", data, that.handleBanner.bind(this));
    var rq = {
      pageNum: that.data.page,
      pageSize: '10'
    }
    util.requestPost2("patient/articles/patientGetPatientArticleList", rq, that.handleHas.bind(this));
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

  //手指触摸动作开始 记录起点X坐标
  touchstart: function (e) {
    //开始触摸时 重置所有删除
    this.data.items.forEach(function (v, i) {
      if (v.isTouchMove)//只操作为true的
        v.isTouchMove = false;
    })
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      items: this.data.items
    })
  },
  //滑动事件处理
  touchmove: function (e) {
    var that = this,
      index = e.currentTarget.dataset.index,//当前索引
      startX = that.data.startX,//开始X坐标
      startY = that.data.startY,//开始Y坐标
      touchMoveX = e.changedTouches[0].clientX,//滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY,//滑动变化坐标
      //获取滑动角度
      angle = that.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });
    that.data.items.forEach(function (v, i) {
      v.isTouchMove = false
      //滑动超过30度角 return
      if (Math.abs(angle) > 30) return;
      if (i == index) {
        if (touchMoveX > startX) //右滑
          v.isTouchMove = false
        else //左滑
          v.isTouchMove = true
      }
    })
    //更新数据
    that.setData({
      items: that.data.items
    })
  },
  /**
  * 计算滑动角度
  * @param {Object} start 起点坐标
  * @param {Object} end 终点坐标
  */
  angle: function (start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  },

   /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function (e) {
    var that = this
    if (this.data.page < this.data.pageCount) {
      var page = this.data.page;
      page++;      
      var rq = {
        pageNum: page,
        pageSize: '10'
      }
      util.requestPost2("patient/articles/patientGetPatientArticleList", rq, that.handleHas.bind(this));
      return false
    }
    if (this.data.page == this.data.pageCount) {
      this.setData({
        more: false,
        noMore: true
      })
    }
  },
  //分页
  handleHas(res){
    if (res.code == 0 && res.success) {
      var msg = this.data.items;
      var items = msg.concat(res.data.list);
      this.setData({
        items: items,
        page: res.data.pageNum,//当前页
        num: 10,//当前页的总条数
        count: res.data.total,//总条数
        pageCount: res.data.pages,//总页数
      })
    }
  },  
})