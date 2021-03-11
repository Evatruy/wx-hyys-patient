// pages/mine/bmi/bmi.js
var wxCharts = require('../../../utils/wxcharts.js');
var util = require("../../../utils/util.js")
var app = getApp();
var lineChart = null;
Page({
  data: {
    items: [],//7天记录数据
    startX: 0, //开始坐标
    startY: 0,
    token: '',//token值
    total: '',//总条数
    bmiMsg: '',//判断bmi值是否为空
    heightArr:[],//身高数组
    weightArr: [],//体重数组
    height:'',//身高
    weight:'',//体重
    month: '',//月份
    showColor: '',//显示颜色及状态
    dt: [],
    vaule: [],//bmi值
  },
  //点击小知识跳转
  linkKnow() {
    wx.navigateTo({
      url: '../knowledge/knowledge?name=2',
    })
  },
  //点击添加记录
  linkRecord() {
    wx.navigateTo({
      url: '../addRecord/addRecord?name=2',
    })
  },
  //点击总条数跳转
  linkTotal() {
    wx.navigateTo({
      url: '../totalRecord/totalRecord?name=2',
    })
  },
  //点击坐标点的时候
  touchHandler(e) {
    var that=this;
    lineChart.showToolTip(e, {
      format: function (item, category) {
        that.setData({
          month: category,
          bmiMsg: item.data
        })
        var value = item.data;
        var dt = that.data.dt;
        var height = that.data.heightArr;
        var weight = that.data.weightArr;
        var index = dt.indexOf(category);
        that.setData({
          height:height[index],
          weight:weight[index]
        })
        if(value<=18.4){
          that.setData({
            showColor:'偏瘦'
          })
        }else if (value >= 18.5 && value <= 23.9) {
          that.setData({
            showColor: '正常'
          })
        } else if (value >= 24 && value <= 27.9) {
          that.setData({
            showColor: '偏重'
          })
        }else{
          that.setData({
            showColor: '肥胖'
          })
        }
        return category + '' + item.name + ':' + item.data
      }
    })
  },
  showLine(dt, value) {
    var that = this;
    var windowWidth = '';    //定义宽高
    try {
      var res = wx.getSystemInfoSync();    //试图获取屏幕宽高数据
      windowWidth = res.windowWidth / 750 * 690;
    } catch (e) {
      console.error('getSystemInfoSync failed!');   //如果获取失败
    }
    lineChart = new wxCharts({
      canvasId: 'lineCanvas',
      type: 'line',
      categories: dt,
      animation: true,
      series: [{
        name: 'BMI值',
        data: value,
        format: function (val, name) {
          that.setData({
            sugarMsg: val
          })
          return val;
        }
      }],
      xAxis: {
        disableGrid: true
      },
      yAxis: {
        format: function (val) {
          return val;
        },
        min: 0
      },
      width: windowWidth,
      height: 200,
      dataLabel: false,
      dataPointShape: true,
      extra: {
        lineStyle: 'curve',
      }
    });
  },
  handleMsg(res) {
    if (res.data == '') {
      this.setData({
        items: res.data,
        total: res.total
      })
    } else {
      var dt = res.line.dt;
      var value = res.line.value;
      this.setData({
        items: res.data,
        total: res.total,
        dt:res.line.dt,
        value:res.line.value,
        heightArr:res.line.height,
        weightArr:res.line.weight
      })
      this.showLine(dt,value)
    }
  },
  onLoad(e) {
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
  //删除事件
  del: function (e) {
    var that = this
    // this.data.items.splice(e.currentTarget.dataset.id, 1)
    wx.showModal({
      title: '',
      content: '确定删除吗？？？',
      confirmColor: '#6A7BC7',
      success(res) {
        if (res.confirm) {
          var id = e.currentTarget.dataset.id
          util.requestDel("api/my/delBmi/" + id, {}, that.data.token, that.handleDel.bind(this))
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  //删除成功后重新拉取数据
  handleDel(res) {
    if (res.status_code == 200) {
      util.requestGet("api/my/body", {}, this.data.token, this.handleMsg.bind(this))
      this.setData({
        bmiMsg:''
      })
    }
  },
  onShow() {
    var that = this;
    wx.getStorage({
      key: 'token',
      success: function (res) {
        that.setData({
          token: res.data
        })
        util.requestGet("api/my/body", {}, res.data, that.handleMsg.bind(this))
      },
    })
  }
});