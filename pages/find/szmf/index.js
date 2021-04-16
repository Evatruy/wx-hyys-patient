// pages/find/szmf/index.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 组件所需的参数    
    nvabarData: {      
      showSearch: 1, //是否显示搜索框   1表示显示    0表示不显示      
      showBack:1,             
      searchHint: '搜医生、病症、医院', 
    },    
    height: app.globalData.height * 2 + 20, 

    //选择医院
    hospitalFlag:false,//控制医院选择下拉框是否显示
    hospitalDown: {hospitalDown:["医科院","儿科医院"],hospital:-1},
    hospitalColor: false,
    hospitalText: "选择医院",

    //选择科室
    departmentFlag:false,//控制医院选择下拉框是否显示
    departmentDown: {departmentDown:["妇科","儿科","产科","外科","呼吸科AAAAAAWDEDEDUHUGBYUGYGYGYGG","妇科","儿科","产科","外科","妇科","儿科","产科","外科","妇科","儿科","产科","外科"],department:-1},
    departmentColor: false,
    departmentText: "选择科室",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(this.data.height) 
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

  },

  hospitalShow: function () {//医院下拉
    if (this.data.hospitalFlag){
      this.setData({
        hospitalFlag : !this.data.hospitalFlag,
        departmentFlag: false
      })
    }else{
      this.setData({
        hospitalFlag: !this.data.hospitalFlag,
        departmentFlag: false
      })
    }
  },
  hospitalChoice:function(e){//医院下拉选择子项
    this.setData({
      "hospitalDown.hospital": e.currentTarget.dataset.index,
      hospitalFlag: false,
      hospitalColor:true,
      hospitalText: e.currentTarget.dataset.item
    })
  },
  handletouchtart: function (event) {//点击透明背景隐藏下拉
    this.setData({
      hospitalFlag: false,
      departmentFlag: false
    })
  },  

  departmentShow: function(){//科室下拉   
    if (this.data.departmentFlag){
      this.setData({
        departmentFlag : !this.data.departmentFlag,
        hospitalFlag: false
      })
    }else{
      this.setData({
        departmentFlag: !this.data.departmentFlag,
        hospitalFlag: false
      })
    }
  },
  departmentChoice:function(e){//科室下拉子项
    this.setData({
      "departmentDown.department": e.currentTarget.dataset.index,
      departmentFlag: false,
      departmentColor:true,
      departmentText: e.currentTarget.dataset.item
    })
  }
})