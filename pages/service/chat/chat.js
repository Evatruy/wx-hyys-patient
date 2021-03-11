// pages/service/chat/chat.js
var util=require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:[],//患者数据
    items:[],//数据
    showModal:true,//显示
    status:'',
    id:'',//id值
    token:'',//token值
    headimgurl:'',//头像
  },
  //点击结束咨询弹出框
  end(){
    var that=this;
    wx.showModal({
      title: '',
      content: '是否结束本次服务？',
      confirmColor:'#6A7BC7',
      success(res) {
        if (res.confirm) {
          // that.setData({
          //   showModal:false,
          //   chatTitle:'已结束'
          // })
          var data={
            id:that.data.id
          }
          util.requestPost("api/pharmacist/end", data, that.data.token, that.handleDel.bind(this))

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  handleDel(res){
    if(res.status_code==200){
      util.requestGet("api/pharmacist/" + this.data.id, {}, this.data.token, this.handleMsg.bind(this))
    }
  },
  //点击跳转回复页面
  linkReply(){
    var id = this.data.id;
    wx.navigateTo({
      url: '../reply/reply?id='+id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    this.setData({
      id: id
    })
  },
  // 数据
  handleMsg(res){
    if(res.status_code==200){
      if (res.data[0].headimgurl==null){
        this.setData({
          headimgurl: res.data[0].headimgurl
        })
      }else{
        this.setData({
          headimgurl: util.host+res.data[0].headimgurl
        })
      }
      this.setData({
        items:res.data,
        status:res.data[0].status,
        
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
    var that = this;
    wx.getStorage({
      key: 'token',
      success: function (res) {
        that.setData({
          token: res.data
        })
        util.requestGet("api/pharmacist/" + that.data.id, {}, res.data, that.handleMsg.bind(this))
      },
    })
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