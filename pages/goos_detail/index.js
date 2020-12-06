//点击轮播图 预览大图 
//给轮播图绑定点击事件 调用小程序的api previewImage

import {request} from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj:{}
  },
  //商品的对象
  GoodsInfo:{},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {goods_id}=options;
    //console.log(goods_id);
    this.getGoodsDateail(goods_id);
  },
  //获取商品的详情数据
  async getGoodsDateail(goods_id){
    const goodsObj=await request({url:"/goods/detail",data:{goods_id}});
    // this.GoodsInfo=goodsObj;
    this.setData({
      goodsObj
      // :{
        // goods_name:goodsObj.goods_name,
        // goods_price:goodsObj.goods_price,
        // goods_introduce:goodsObj.goods_introduce.replace(/\.web/g,'.jpg'),
        // pics:goodsObj.pic
      // }
    })
  },


  //点击轮播图放大预览
 // handlePrevewImage(e){
    //先构造要预览的图片数
    // this.GoodsInfo=goodsObj.data.message.pics;
    // const urls=this.GoodsInfo.map(v=>v.pics_mid);
    // const current=e.currentTarget.dataset.url;
    // wx.previewImage({
      // current:urls[0],
      // urls:urls,
    // })
  // },
  
  //点击 加入购物
    //点击 加入购物车
    handleCartAdd(){
      // 1获取缓存中的购物车数据 数组
      let cart=wx.getStorageSync("cart")||[];
      // 2判断 商品对象是否存在于购物车数组中
      let index=cart.findIndex(v=>v.goods_id===this.GoodsInfo.goods_id);
      if(index===-1){
        // 不存在 第一次添加
        this.GoodsInfo.num=1;
        this.GoodsInfo.checked=true;
        cart.push(this.GoodsInfo);
      }else{
        // 已经存在购物车数据 执行 num++  
        cart[index].num++;
       }
      // 把购物车重新添加回缓存中
      wx.setStorageSync("cart",cart);
      // 弹窗提示
      wx.showToast({
        title: '加入成功',
        icon:"success",
        mask:true
      });
    },
})