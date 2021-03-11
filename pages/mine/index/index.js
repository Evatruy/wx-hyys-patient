// pages/mine/index/index.js
var util=require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // headimgurl: '/images/default-avatar.png',//头像
    headimgurl:'',
    color:'color:#4BB24B',//设置偏高正常偏低的字体颜色
    token:'',//token值
    messageCount:'1',//通知数量
    name:'',//姓名
    sex:'',//性别
    age:'',//年龄
    pressure:'',//暂无数据
    systolicPressure:'',//收缩压
    diastolicPressure:'',//舒张压
    resultPressure:'',//血压状态值
    meterTimePressure:'',//血压时间
    sugars:'',//暂无血糖数据
    sugarsValue:'',//血糖值
    resultSugars: '',//血糖状态值
    meterTimeSugars:'',//血糖时间
    timeSlotSugars:'',//血糖时间段
    bmi: '',//暂无bmi数据
    bmiValue: '',//bmi值
    resultBmi: '',//bmi状态值
    meterTimeBmi: '',//bmi时间
    heart: '',//暂无bmi数据
    heartValue: '',//heart值
    resultHeart: '',//heart状态值
    meterTimeHeart: '',//heart时间
    funcData://功能按钮
    [
      {
        name:'我的医生',
        imgUrl:'/images/mine-wdys.png'
      },
      {
        name:'我的病例',
        imgUrl:'/images/mine-wdbl.png'
      },
      {
        name:'药师咨询',
        imgUrl:'/images/mine-yszx.png'
      },
      {
        name:'特医食品',
        imgUrl:'/images/mine-tysp.png'
      },
      {
        name:'优惠券',
        imgUrl:'/images/mine-yhj.png'
      },
      {
        name:'联系客服',
        imgUrl:'/images/mine-lxkf.png'
      },
      {
        name:'系统设置',
        imgUrl:'/images/mine-xtsz.png'
      }
    ]
  },
  //跳转到我的消息
  linkMsg(){
    wx.navigateTo({
      url: '../myMsg/myMsg',
    })
  },
  //跳转到反馈
  linkFeedback(){
    wx.navigateTo({
      url: '../feedback/feedback',
    })
  },
//跳转到血压页面
  linkPress(){
    wx.navigateTo({
      url: '../bloodPressure/bloodPressure',
    })
  },
  //跳转到血糖页面
  linkSugar() {
    wx.navigateTo({
      url: '../bloodSugar/bloodSugar',
    })
  },
  //跳转到bmi页面
  linkBmi() {
    wx.navigateTo({
      url: '../bmi/bmi',
    })
  },
  //跳转到心率页面
  linkHeart() {
    wx.navigateTo({
      url: '../heartRate/heartRate',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  handleSubmitSucc(res){
    if(res.status_code==200){
      var sex = res.data.healthInfo.sex;
      var sex_name='';
      if(sex==1){
        sex_name = '男'
      } else if (sex == 2){
        sex_name = '女'
      }else{
        sex_name='未知'
      }
      var headimgurl = res.data.healthInfo.headimgurl;
      if(headimgurl==null){
        this.setData({
          headimgurl:headimgurl
        })
      }else{
        this.setData({
          headimgurl: util.host+headimgurl
        })
      }
      this.setData({
        messageCount: res.data.messageCount,
        name: res.data.healthInfo.name,
        age: res.data.healthInfo.age,
        sex: sex_name,
      })
      if (res.data.pressure==''){
        this.setData({
          pressure:'0'
        })
      }else{
        this.setData({
          pressure: '1',
          systolicPressure: res.data.pressure.systolicPressure,
          diastolicPressure: res.data.pressure.diastolicPressure,
          resultPressure: res.data.pressure.result,
          meterTimePressure: res.data.pressure.meterTime,
        })
      }
      if (res.data.sugars == '') {
        this.setData({
          sugars: '0'
        })
      } else {
        this.setData({
          sugars: '1',
          sugarsValue: res.data.sugars.value,
          resultSugars: res.data.sugars.result,
          meterTimeSugars: res.data.sugars.meterTime,
          timeSlotSugars: res.data.sugars.timeSlot,
        })
      }
      if (res.data.sugars == '') {
        this.setData({
          sugars: '0'
        })
      } else {
        this.setData({
          sugars: '1',
          sugarsValue: res.data.sugars.value,
          resultSugars: res.data.sugars.result,
          meterTimeSugars: res.data.sugars.meterTime,
          timeSlotSugars: res.data.sugars.timeSlot,
        })
      }
      if (res.data.body == '') {
        this.setData({
          bmi: '0'
        })
      } else {
        this.setData({
          bmi: '1',
          bmiValue: res.data.body.bmi,
          resultBmi: res.data.body.result,
          meterTimeBmi: res.data.body.meterTime,
        })
      }
      if (res.data.heartRates == '') {
        this.setData({
          heart: '0'
        })
      } else {
        this.setData({
          heart: '1',
          heartValue: res.data.heartRates.value,
          resultHeart: res.data.heartRates.result,
          meterTimeHeart: res.data.heartRates.meterTime,
        })
      }
    }
  },
  onLoad: function (options) {
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  handleMsgSucc(res){
    if (res.count>0){
      var count = res.count;
      wx.setTabBarBadge({
        index: 0,
        text: "" + count + ""
      })
    } 
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //获取token
    var that = this;
    wx.getStorage({
      key: 'token',
      success: function (res) {
        that.setData({
          token: res.data
        })
        util.requestGet('api/my', {}, res.data, that.handleSubmitSucc.bind(this))
        wx.getStorage({
          key: 'open',
          success(res) {
          },
          fail() {
            util.requestGet('api/getPharmacistNum', {}, that.data.token, that.handleMsgSucc.bind(this))
          }
        })
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