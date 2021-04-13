// pages/component/navigate/index.js
const app = getApp()
Component({  
    properties: {    
        navbarData: {   
            //navbarData   由父页面传递的数据，变量名字自命名      
            type: Object,      
            value: {},      
            observer: function (newVal, oldVal) { }    
            }  
        },  
        data: {    
            height: '',    //默认值  默认显示左上角    
            navbarData: {     
                showBack:1, 
                showSearch: 1,
                searchHint: '请输入关键字'     
            }  
        },  
        attached: function () {    
                // 定义导航栏的高度   方便对齐    
                this.setData({      
                    height: app.globalData.height    
                })  
        },  
        methods: {    
            // 返回上一页面    
            _navback() {      
                wx.navigateBack()    
            },               
}})