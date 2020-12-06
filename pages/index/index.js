//引入 用来发送请求得方法 （路径也补全）
import {request} from "../../request/index.js";
wx-Page({
  data: {
    //轮播图数组
    swiperList:[],
    //导航 数组
    catesList:[],
    //楼层数据
    floorList:[]
  },

  onLoad: function (options) {
    // 发送异步请求获取轮播图数据 （优化代码手段通过es6的 promise来解决）
    this.getSwiperList();
    this.getCatesList();
    this.getFloorList();
  },

  //获取轮播图数据
   getSwiperList(){
    request({url:"/home/swiperdata"})
    .then(result => {
      this.setData({
        swiperList:result.data.message
      })
    })
  },
  //获取 分类导航数据
  getCatesList(){
    request({url:"/home/catitems"})
    .then(result => {
      this.setData({
        catesList:result.data.message
      })
    })
  },
  //获取 楼层数据
  getFloorList(){
    request({url:"/home/floordata"})
    .then(result => {
      for (let k = 0; k < result.length; k++) {
        result[k].product_list.forEach((v, i) => {
            result[k].product_list[i].navigator_url = v.navigator_url.replace('?', '/index?');
        });
    }
      this.setData({
        floorList:result.data.message
      })
    })
  },
});