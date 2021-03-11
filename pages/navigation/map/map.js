// pages/navigation/map/map.js
let plugin = requirePlugin("myPlugin")
// let routeInfo = {
//   startLat: 29.35,    //起点纬度 选填
//   startLng: 106.33,    //起点经度 选填
//   startName: "我的位置",   // 起点名称 选填
//   endLat: 29.35,    // 终点纬度必传
//   endLng: 106.44,  //终点经度 必传
//   endName: "",  //终点名称 必传
//   mode: 'car'  //算路方式 选填
// }
Page({
  /**
   * 页面的初始数据
   */
  data: {
    routeInfo: {
      startLat: '',    //起点纬度 选填
      startLng: '',    //起点经度 选填
      startName: "我的位置",   // 起点名称 选填
      endLng: '',  //终点经度 必传
      endLat: '',    // 终点纬度必传
      endName: "",  //终点名称 必传
      mode: 'car'  //算路方式 选填
    },
  },
  onLoad: function (options) { 
    var startLng = options.startLng;
    var startLat = options.startLat;
    var endName = options.address;
    var endLng = options.end_longitude;
    var endLat = options.end_latitude;
    this.setData({
      routeInfo: {
        startLat: 29.50207,    //起点纬度 选填
        startLng: 106.5114,    //起点经度 选填
        startName: "我的位置",   // 起点名称 选填
        endLng: endLng,  //终点经度 必传
        endLat: endLat,    // 终点纬度必传
        endName: endName,  //终点名称 必传
        mode: 'car'  //算路方式 选填
      },
    })
  }
})