// pages/bootPage/bootPage.js
var util = require('../../utils/util');
Page({
  data: {
    current:0,
    token:'',//token值
    time:true
  },
  onLoad(e){
       //获取token
  var that =this;
   wx.getStorage({
     key: 'token',
     success: function(res) {
       that.setData({
         token:res.data
       })
     },
   })
    var login='';
    wx.getStorage({
      key: 'login',
      success: function (res) {
        login=res.data
       },
    })
    wx.getStorage({
      key: 'authSet',
      success: function (res) {
        if (res.data == 'ok') {
          if(login=='ok'){
            wx.reLaunch({
              url: '../service/index/index',
            })
          }else{
            wx.getStorage({
              key: 'token',
              success: function (res) {
                that.setData({
                  token: res.data
                })
                util.requestGet('api/user', {}, res.data, that.handleSubmitSucc.bind(this))
              },
            })
          } 
        }
      },
    });
    setTimeout(function(){
      that.setData({
        time:false
      })
    },1000)   
 
  },
  change(e){
    if (e.detail.source == 'touch') {
      this.setData({
        current: e.detail.current
      })
    } 
  },
  start(e){
    var current=this.data.current+1;
    this.setData({
      current: current
    })
  },
  //用户授权判断及跳转
  onGotUserInfo: function (e) {
    var that=this;
    wx.reLaunch({
      url: '../service/index/index',
    })
    // 登录
    // wx.login({
    //   success: res => {
    //     // console.log(res.code)
    //     var code = res.code;
    //     if (code) {
    //       wx.getUserInfo({
    //         success: function (res) {
    //           // console.log(res.encryptedData, res.iv)
    //           wx.showLoading({
    //             title: '获取数据中...',
    //           })
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
    //                 var token = res.access_token;
    //                 wx.setStorage({
    //                   key: 'token',
    //                   data: res.access_token,
    //                 })
    //                 wx.getSetting({
    //                   success(res) {
    //                     if (res.authSetting['scope.userInfo']) {
    //                       //判断是否注册过
    //                       util.requestGet('api/user', {}, token, that.handleSubmitSucc.bind(this))
    //                     } else {
    //                       wx.showToast({
    //                         title: "为了更好的为您提供服务我们需要获取您的授权信息",
    //                         icon: 'none',
    //                         duration: 2000
    //                       })
    //                     }

    //                   }
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
    //       console.log('获取用户登录状态失败！')
    //     }
    //   }
    // })
    
  },
  handleSubmitSucc(res){
    // console.log(res)
    if(res.status_code==200){
      wx.hideLoading()
      wx.setStorage({
        key: 'authSet',
        data: 'ok',
      })
      var data = res.data.is_register;
      if(data==0){
          wx.reLaunch({
            url: '../login/login',
          })
      }else{
        wx.reLaunch({
          url: '../service/index/index',
        })
      }
    }
  }
})