const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('-') 
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
}

var app = getApp();
var host = 'https://api.yaoshi365.net/';
/**
 * POST请求，
 * URL：接口
 * postData：参数，json类型
 * doSuccess：成功的回调函数
 * doFail：失败的回调函数
 */
function requestPost(url, postData, token_Date, doSuccess) {
  wx.request({
    //项目的真正接口，通过字符串拼接方式实现
    url: host + url,
    header: {
      "content-type": "application/x-www-form-urlencoded",
      'Authorization': `Bearer ${token_Date}`
    },
    data: postData,
    method: 'POST',
    success: function (res) {
      //参数值为res.data,直接将返回的数据传入
      doSuccess(res.data);
    },
    fail: function () {
     
    },
  })
}
function requestDel(url, delData, token_Date, doSuccess) {
  wx.request({
    //项目的真正接口，通过字符串拼接方式实现
    url: host + url,
    header: {
      "content-type": "application/x-www-form-urlencoded",
      'Authorization': `Bearer ${token_Date}`
    },
    data: delData,
    method: 'DELETE',
    success: function (res) {
      //参数值为res.data,直接将返回的数据传入
      doSuccess(res.data);
    },
    fail: function () {

    },
  })
}
//GET请求，不需传参，直接URL调用，
function requestGet(url, getData, token_Date, doSuccess) {
  wx.request({
    url: host + url,
    header: {
      "content-type": "application/x-www-form-urlencoded",
      'Authorization': `Bearer ${token_Date}`
    },
    data: getData,
    method: 'GET',
    success: function (res) {
      doSuccess(res.data);
    },
    fail: function () {
     
    },
  })
}

/**
 * module.exports用来导出代码
 * js文件中通过var call = require("../util/request.js")  加载
 */
module.exports.requestPost = requestPost;
module.exports.requestGet = requestGet;
module.exports.requestDel = requestDel;
module.exports.host = host;
