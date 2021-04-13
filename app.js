//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);     

    //获取设备顶部窗口的高度（不同设备窗口高度不一样，根据这个来设置自定义导航栏的高度）    
    this.globalData.height = wx.getSystemInfoSync().statusBarHeight;  
  },
  globalData: {
    userInfo: null,
    height: 0
  },
  onHide: function () {
    wx.removeStorage({
      key:'open',
      success(res) {
        console.log(res)
      }
    })
  }
})