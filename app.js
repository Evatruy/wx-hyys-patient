//app.js
var util=require('./utils/util.js')
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs); 
    // // 登录
    // wx.login({
    //   success: res => {
    //     // console.log(res.code)
    //     var code=res.code;
    //     if(code){
    //       wx.getUserInfo({
    //         success: function (res) {
    //            console.log(res.encryptedData, res.iv)
    //           wx.request({
    //             url: util.host + 'api/authorizations',
    //             data: { 
    //               'encryptData': res.encryptedData,
    //               'iv': res.iv,
    //               'code': code 
    //             },
    //             method: "POST",
    //             header: {
    //               'content-type': 'application/x-www-form-urlencoded' // 默认值
    //             },
    //             success(res) {
    //               var res = res.data;
    //               // console.log(res);
    //               if (res.status_code == 200) {
    //                 wx.setStorage({
    //                   key: 'token',
    //                   data: res.access_token,
    //                 })
                    
    //               }
    //             }
    //           })
    //         },
    //         fail: function () {
    //           console.log('获取用户信息失败')
    //         } 
    //       })
    //     } else {
    //       console.log('获取用户登录态失败！')
    //     } 
    //   }
    // })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
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