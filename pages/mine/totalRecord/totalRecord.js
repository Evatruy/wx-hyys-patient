// pages/mine/totalRecord/totalRecord.js
var util=require('../../../utils/util.js')
Page({
  data: {
    showType:'',//控制显示
    items: [],
    startX: 0, //开始坐标
    startY: 0,
    token:'',//token值
    more: false,
    noMore: false,
    showMsg: false,//是否显示暂无数据
    page: '',//当前页
    num: '',//当前页的总条数
    count: '',//总条数
    pageCount: '',//总页数
  },
  //血压,血糖，bmi,心率，总记录查询
  handle(res){
    if(res.status_code==200){
      if (res.data == "") {
        this.setData({
          showMsg: true
        })
        this.setData({
          items: res.data,
          count: res.count,//总条数
        })
      } else {
        this.setData({
          items: res.data,
          page: res.page,//当前页
          num: res.num,//当前页的总条数
          count: res.count,//总条数
          pageCount: res.pageCount,//总页数
        })
        if (this.data.page < this.data.pageCount) {
          this.setData({
            more: true
          })
        }
      }
    }
  },
  onLoad: function (options) {
    var that = this;
    this.setData({
      showType: options.name
    });
    var showType=options.name;
    //血压
    if(showType==0){
      wx.setNavigationBarTitle({
        title: '血压总记录'
      })
      wx.getStorage({
        key: 'token',
        success: function (res) {
          that.setData({
            token: res.data
          })
          util.requestGet("api/my/pressuresRecord", {}, res.data, that.handle.bind(this))
        },
      })
      return false
    }
    //血糖
    if (showType == 1) {
      wx.setNavigationBarTitle({
        title: '血糖总记录'
      })
      wx.getStorage({
        key: 'token',
        success: function (res) {
          that.setData({
            token: res.data
          })
          util.requestGet("api/my/sugarsRecord", {}, res.data, that.handle.bind(this))
        },
      })
      return false
    }
    //bmi
    if (showType == 2) {
      wx.setNavigationBarTitle({
        title: 'BMI总记录'
      })
      wx.getStorage({
        key: 'token',
        success: function (res) {
          that.setData({
            token: res.data
          })
          util.requestGet("api/my/bodyRecord", {}, res.data, that.handle.bind(this))
        },
      })
      return false
    }
    //心率
    if (showType == 3) {
      wx.setNavigationBarTitle({
        title: '心率总记录'
      })
      wx.getStorage({
        key: 'token',
        success: function (res) {
          that.setData({
            token: res.data
          })
          util.requestGet("api/my/heartRateRecord", {}, res.data, that.handle.bind(this))
        },
      })
      return false
    }
    
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
  //删除血压记录事件
  del: function (e) {
    // this.data.items.splice(e.currentTarget.dataset.id, 1)
    var that = this
    var showType = this.data.showType
    wx.showModal({
      title: '',
      content: '确定删除吗？？？',
      confirmColor: '#6A7BC7',
      success(res) {
        if (res.confirm) {
          var id = e.currentTarget.dataset.id
          if (showType==0){
            util.requestDel("api/my/delPressure/" + id, {}, that.data.token, that.handleDelPress.bind(this))
            return false
          }
          if (showType == 1) {
            util.requestDel("api/my/delSugars/" + id, {}, that.data.token, that.handleDelSugar.bind(this))
            return false
          }
          if (showType == 2) {
            util.requestDel("api/my/delBmi/" + id, {}, that.data.token, that.handleDelBmi.bind(this))
            return false
          }
          if (showType == 3) {
            util.requestDel("api/my/heartRateDel/" + id, {}, that.data.token, that.handleDelHeart.bind(this))
            return false
          }
          
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  //删除血压记录成功后的回调方法
  handleDelPress(res){
    if (res.status_code == 200) {
      util.requestGet("api/my/pressuresRecord", {}, this.data.token, this.handle.bind(this))
    }
  },
  //删除血糖记录成功后的回调方法
  handleDelSugar(res){
    if (res.status_code == 200) {
      util.requestGet("api/my/sugarsRecord", {}, this.data.token, this.handle.bind(this))
    }
  },
  //删除bmi记录成功后的回调方法
  handleDelBmi(res) {
    if (res.status_code == 200) {
      util.requestGet("api/my/bodyRecord", {}, this.data.token, this.handle.bind(this))
    }
  },
  //删除心率记录成功后的回调方法
  handleDelHeart(res) {
    if (res.status_code == 200) {
      util.requestGet("api/my/heartRateRecord", {}, this.data.token, this.handle.bind(this))
    }
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function (e) {
    var that = this
    var showType = this.data.showType;
    if (this.data.page < this.data.pageCount) {
      var page = this.data.page;
      page++;
      var data = {
        page: page
      }
      if (showType == 0) {
        util.requestGet('api/my/pressuresRecord', data, that.data.token, that.handleHas.bind(this))
        return false
      }
      if (showType == 1){
        util.requestGet('api/my/sugarsRecord', data, that.data.token, that.handleHas.bind(this))
        return false
      }
      if (showType == 2) {
        util.requestGet('api/my/bodyRecord', data, that.data.token, that.handleHas.bind(this))
        return false
      }
      if (showType == 3) {
        util.requestGet('api/my/heartRateRecord', data, that.data.token, that.handleHas.bind(this))
        return false
      }
    }
    if (this.data.page == this.data.pageCount) {
      this.setData({
        more: false,
        noMore: true
      })
    }
  },
  //血压,血糖,bmi,心率分页
  handleHas(res){
    if (res.status_code == 200) {
      var msg = this.data.items;
      var items = msg.concat(res.data);
      this.setData({
        items: items,
        page: res.page,//当前页
        num: res.num,//当前页的总条数
        count: res.count,//总条数
        pageCount: res.pageCount,//总页数
      })
    }
  },
})