// pages/bootPage/bootPage.js
var util = require('../../utils/util');
Page({
  data: {
    current:0,
    status:'',
    token:'',//token值
    time:true
  },
  onLoad(e){
  //获取status
  var that =this;
   wx.getStorage({
     key: 'status',
     success: function(res) {
       console.log(res)
       that.setData({
         status:res.data
       })
     },
   })
    wx.getStorage({
      key: 'token',
      success: function (res) {
        if (res.data != '' || res.data != null) {
          if(status=='10'){
            wx.reLaunch({
              url: '../service/index/index',
            })
          }else{
            wx.reLaunch({
              url: '../login/login',
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
    // wx.reLaunch({
    //   url: '../service/index/index',
    // })
    // 登录
    wx.login({
      success: res => {
        // console.log(res.code)
        var code = res.code;
        if (code) {
          wx.getUserInfo({
            success: function (res) {
              // console.log(res.openid, res.unionid)
              var userInfo = res.userInfo
              var nickName = userInfo.nickName
              var avatarUrl = userInfo.avatarUrl
              var gender = userInfo.gender //性别 0：未知、1：男、2：女
              var province = userInfo.province
              var city = userInfo.city
              var country = userInfo.country
              console.log(userInfo,nickName,avatarUrl,gender,province,city,country)
              wx.showLoading({
                title: '获取数据中...',
              })
              wx.request({
                url: util.host + 'patient/login/weChat',
                data: {
                  'wechatType': 2,
                  'openid': 'oEWohs1n4-4d7YjguB3qXXFDsTuw',
                  'unionid': 'oNXCs5sC_BzOMizAhz2AXx39ir2w',
                  'city': '',
                  'province': '',
                  'country': '中国',
                  'headimgurl': 'https://thirdwx.qlogo.cn/mmopen/vi_32/PLE2ib4Pe3rcvaSSqMTiaicbFRGbzX7icy0iaI30dSwEOqtV4IAO7rFmzibWd14BiaKSquglLHWSjyZRS06jsMw1GJ6LA/132',
                  'language': 'zh_CN',
                  'nickname': '安卓测试机',
                  'sex': '1'               
                },
                method: "POST",
                header: {
                  'content-type': 'application/x-www-form-urlencoded' // 默认值
                },
                success(res) {                              
                  var result = res.data;                              
                  if (result.code == 0 && result.success) {
                    var token = result.data.token;
                    console.log(token)
                    wx.setStorage({
                      key: 'token',
                      data: token,
                    })
                    wx.setStorage({
                      data: 'status',
                      key: result.data.status,
                    })
                    wx.setStorage({
                      data: 'imAccount',
                      key: result.data.imAccount,
                    })
                    wx.setStorage({
                      data: 'imPassWord',
                      key: result.data.imPassWord,
                    })
                    wx.setStorage({
                      data: 'imNickName',
                      key: result.data.imNickName,
                    })                    
                    wx.showToast({
                      title: result.message,
                    })
                    wx.reLaunch({
                      url: '../find/index',
                    })
                  }else{
                    wx.showToast({
                      title: result.message,
                    })
                  }
                }
              })
            },
            fail: function () {
              console.log('获取用户信息失败')
            }
          })
        } else {
          console.log('获取用户登录状态失败！')
        }
      }
    })
    
  },
  handleSubmitSucc(res){
    // console.log(res)
    if(res.status_code==200){
      wx.hideLoading()
      wx.setStorage({
        key: 'status',
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