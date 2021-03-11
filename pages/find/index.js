// pages/find/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    teamData:['../../images/data-team1.png', '../../images/data-team2.png', '../../images/data-team3.png', '../../images/data-team4.png'],
    departData:[
      {
        name:'儿科学',
        imgUrl:'../../images/mine-bmi.png'
      },
      {
        name:'妇产科',
        imgUrl:'../../images/mine-bmi.png'
      },
      {
        name:'内科',
        imgUrl:'../../images/mine-heart.png'
      },
      {
        name:'外科',
        imgUrl:'../../images/mine-help.png'
      },
      {
        name:'专科',
        imgUrl:'../../images/mine-msg.png'
      }
    ],
    diseaseData:['高血压', '糖尿病', '多囊卵巢综合征', '硬化性先天血管肿瘤'],
    newsData:
    [
      {
        preview:'',
        title:'谷胱甘肽与2型糖尿病密切相关病密切相关',
        views:'545',
        time:'2020-10-28'
      },
      {
        preview:'',
        title:'谷胱甘肽与2型糖尿病密切相关病密切相关谷胱甘肽与2型糖尿病密切相关病密切相关谷胱甘肽与2型糖尿病密切相关病密切相关',
        views:'745',
        time:'2020-10-29'
      },
      {
        preview:'',
        title:'谷胱甘肽与2型糖尿病密切相关病密切相关',
        views:'645',
        time:'2020-10-18'
      },
      {
        preview:'',
        title:'谷胱甘肽与2型糖尿病密切相关病密切相关',
        views:'505',
        time:'2020-10-08'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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