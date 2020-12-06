import {getSetting,chooseAddress,openSetting} from "../../utils/asyncWx.js"
Page({
  data:{
    address:{},
    cart:[],
    totaoPrice:0,
    totalNum:0

  },
  onShow(){
    //获取缓存中的收货地址信息
    const address=wx.getStorageSync("address");
    //获取缓存中的购物车数据
    const cart=wx.getStorageSync("cart")||[];
    //计算全选
    // const allChecked=cart.every(v=>v.checked);
  //  const allChecked=cart.length?cart.every(v=>v.checked):false;
    let allChecked=true;
    // 总价格 总数量
    let totalPrice=0;
    let totalNum=0;
    cart.forEach(v=>{
      if(v.checked){
        totalPrice+=v.num*v.goods_price;
        totalNum+=v.num;
      }else{
        allChecked=false;
      }
    })
    //判断数组是否为空
    allChecked=cart.length!=0?allChecked:false;
    //给data赋值
    this.setData({
      address,
      cart,
      allChecked,
      totalPrice,
      totalNum
    })
  }
})