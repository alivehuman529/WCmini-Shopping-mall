wx-Page({
  data: {
    swiperList:[]
  },

  onLoad: function (options) {
    wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
      success:(result)=>{
       this.setData({
         swiperList:result.data.message
       })
      }
    });

  },

  onReady: function () {
    
  },

  onShow: function () {
    
  },

  onHide: function () {
    
  },

  onUnload: function () {
    
  },

  onPullDownRefresh: function () {
    
  },

  onReachBottom: function () {
    
  },

  onShareAppMessage: function () {
    
  },
  onPageScroll:function(){

  },
  onTabItemTap:function(item) {

  }
});