// pages/mine/addRecord/addRecord.js
var util=require('../../../utils/util.js');
var time = util.formatTime(new Date()); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token:'',//token值
    showType:'',//控制显示0血压，1血糖，2bmi,3心率
    pressDataTime: time,//血压测量日期
    pressDataOne: '',//传递的收缩压数据
    pressDataTwo: '',//传递的舒张也数据
    array: ['空腹', '餐后', '睡前'],
    index: 0,
    sugerName:'空腹',//时间段
    sugerOne:[],//血糖数组
    sugerData:'',//传递的血糖值
    bmiOne:'',//身高
    bmiTwo:[],//体重数组数据
    bmiData:'',//体重传递数据
    heartOne:'',//心率
  },
  //选择测量日期
  bindDateChange: function (e) {
    this.setData({
      pressDataTime: e.detail.value
    })
  },
  //收缩压
  inputOne(e) {
    this.setData({
      pressDataOne: e.detail.value
    })
  },
  //舒张压
  inputTwo(e) {
    this.setData({
      pressDataTwo: e.detail.value
    })
  },
  // 血压的判断公式
  pressTest(pressDataOne, pressDataTwo, pressDataTime) {
    if (pressDataOne == '') {
      wx.showToast({
        title: '收缩压的值不能为空',
        icon: 'none'
      })
      return false
    }
    if (pressDataTwo == '') {
      wx.showToast({
        title: '舒张压的值不能为空',
        icon: 'none'
      })
      return false
    }
      var data = {
        systolic_pressure: this.data.pressDataOne,//传递的收缩压数据
        diastolic_pressure: this.data.pressDataTwo,//传递的舒张也数据
        meter_time: this.data.pressDataTime,//测量日期
      }
    util.requestPost("api/my/addPressure", data, this.data.token, this.handle.bind(this))
  },
  //提交成功执行方法
  handle(res){
    if(res.status_code==200){
      wx.showToast({
        title: '保存成功',
        icon:'none'
      })
     setTimeout(function(){
       wx.navigateBack({
         delta: 1
       })
     },1000)
    }
  },
  //血糖值
  inputSuger(e){
    var sugerOne = this.checkInputText(e.detail.value).toString().split('.');
    this.setData({
      sugerOne: sugerOne
    })
    return this.checkInputText(e.detail.value);
  }, 
  //血糖的选择时间段
  bindPickerChange(e) {
    this.setData({
      index: e.detail.value
    })
    if(e.detail.value==0){
      this.setData({
        sugerName:'空腹'
      })
      return false
    }
    if (e.detail.value == 1) {
      this.setData({
        sugerName: '餐后'
      })
      return false
    }
    if (e.detail.value == 2) {
      this.setData({
        sugerName: '睡前'
      })
      return false
    }
  },
  // 血糖的判断公式
  sugerTest(sugerOne, sugerName, pressDataTime){
    var sugerOne_0=sugerOne[0];
    var sugerOne_1 = sugerOne[1];
    if (sugerOne==""){
      wx.showToast({
        title: '血糖值不能为空',
        icon:'none'
      })
      return false
    }
    if (sugerOne_1 == "") {
      wx.showToast({
        title: '血糖值格式不正确',
        icon: 'none'
      })
      return false
    }
    if (sugerOne_1==undefined){
      this.setData({
        sugerData: sugerOne_0
      })
    }
    if (sugerOne_1 != "" && sugerOne_1 !=undefined) {
      this.setData({
        sugerData: sugerOne_0 + '.' + sugerOne_1
      })
    }
      var data={
        value: this.data.sugerData,
        time_slot: sugerName,
        meter_time: pressDataTime,
      }
    util.requestPost("api/my/addSugars", data, this.data.token, this.handle.bind(this))
  },
  //身高
  inputHeight(e){
    this.setData({
      bmiOne: e.detail.value
    })
  },
  //体重
  inputWeight(e) {
    var bmiTwo = this.checkInputText(e.detail.value).toString().split('.');
    this.setData({
      bmiTwo: bmiTwo
    })
    return this.checkInputText(e.detail.value);
  }, 
  //bmi
  bmiTest(bmiOne, bmiTwo, pressDataTime){
    var bmiTwo_0 = bmiTwo[0];
    var bmiTwo_1 = bmiTwo[1];
    if (bmiOne==''){
      wx.showToast({
        title: '身高不能为空',
        icon: 'none'
      })
      return false
    }
    if (bmiTwo == "") {
      wx.showToast({
        title: '体重不能为空',
        icon: 'none'
      })
      return false
    }
    if (bmiTwo_1 == "") {
      wx.showToast({
        title: '体重值格式不正确',
        icon: 'none'
      })
      return false
    }
    if (bmiTwo_1 == undefined) {
      this.setData({
        bmiData: bmiTwo_0
      })
    }
    if (bmiTwo_1 != "" && bmiTwo_1 != undefined) {
      this.setData({
        bmiData: bmiTwo_0 + '.' + bmiTwo_1
      })
    }
      var data = {
        height: bmiOne,
        weight: this.data.bmiData,
        meter_time: pressDataTime,
      }
    util.requestPost("api/my/addBmi", data, this.data.token, this.handle.bind(this))
    
  },
  //心率输入
  inputHeart(e){
    this.setData({
      heartOne: e.detail.value
    })
  },
  //心率
  heartTest(heartOne, pressDataTime){
    if (heartOne==""){
      wx.showToast({
        title: '心率不能为空',
        icon: 'none'
      })
      return false
    }
    var data = {
      rate: heartOne,
      meter_time: pressDataTime,
    }
    util.requestPost("api/my/addHeartRate", data, this.data.token, this.handle.bind(this))
  },
  //检查输入文本，限制只能为数字并且数字最多带1位小数
  checkInputText: function (text) {
    var reg = /^(\.*)(\d+)(\.?)(\d{0,1}).*$/g; if (reg.test(text)) { //正则匹配通过，提取有效文本
      text = text.replace(reg, '$2$3$4');
    } else { //正则匹配不通过，直接清空
      text = '';
    } return text; //返回符合要求的文本（为数字且最多有带1位小数）
  },
  
  //点击保存执行的方法
  save(){
    var that=this;
    var msg = that.data.showType;
    var pressDataTime = that.data.pressDataTime;
    // 血压的数据
    var pressDataOne = that.data.pressDataOne;
    var pressDataTwo = that.data.pressDataTwo;
    //血糖的数据
    var sugerOne=that.data.sugerOne;
    var sugerName = that.data.sugerName;
    //bmi的数据
    var bmiOne = that.data.bmiOne;//身高
    var bmiTwo = that.data.bmiTwo;//体重
    //心率
    var heartOne = that.data.heartOne;
    //血压
    if(msg==0){
      this.pressTest(pressDataOne, pressDataTwo, pressDataTime);
      return false;
    }
    //血糖
    if(msg==1){
      this.sugerTest(sugerOne, sugerName, pressDataTime);
      return false
    }
    //bmi
    if (msg == 2) {
      this.bmiTest(bmiOne, bmiTwo, pressDataTime);
      return false
    }
    //心率
    if (msg == 3) {
      this.heartTest(heartOne,pressDataTime);
      return false
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    var showType=options.name;
    wx.getStorage({
      key: 'token',
      success: function(res) {
        that.setData({
          token:res.data,
          showType: showType
        })
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