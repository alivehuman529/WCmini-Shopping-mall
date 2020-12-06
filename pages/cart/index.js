/* 1获取用户的收货地址
    1.绑定点击事件
    2.调用小程序内置 api 获取用户的收货地址wx.chooseAddress
*/
import {getSetting,chooseAddress,openSetting} from "../../utils/asyncWx.js"
Page({
  data:{
    address:{},
    cart:[],
    allChecked:false,
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
  },
 //点击收货地址
 async handleChooseAddress(){
  try{
  //获取权限状态
  const res1=await getSetting();
  const scopeAddress=res1.authSetting["scope.address"];
  // 判断权限状态
  if (scopeAddress===false){
   //诱导用户打开授权页面
    await openSetting();
  }
    //调用获取收货地址api
    let address=await chooseAddress();
    address.all=address.provinceName+address.cityName+address.countyName+address.detailInfo
    //存入到缓存中
    wx.setStorageSync("address",address);
  }catch (error){
   console.log(error);
  }
},
//商品的选中
handeltemChange(e){
  //获取被修改的商品id
  const goods_id=e.currentTarget.dataset.id;
  //获取购物车数组
  let {cart}=this.data;
  //找到被修改的商品对象
  let index=cart.findIndex(v=>v.goods_id===goods_id);
  //选中状态取反
  cart[index].checked=!cart[index].checked;
  //把购物车数据重新设置回data中和缓存中
  this.setData({
    cart
  });
  wx.setStorageSync('cart', cart);
  let allChecked=true;
// 总价格 总数量
let totalPrice=0;
let totalNum=0;
cart.forEach(v=>{
  if(v.checked){
    totalPrice+=v.num*v.goods_price;
    totalNum+=v.num;
  }else{
    allChecked=falschecked=allCheckede;
  }
})
//判断数组是否为空checked=allChecked
allChecked=cart.lenchecked=allCheckedgth!=0?allChecked:false;
this.setData({
  address,
  cart,
  allChecked,
  totalPrice,
  totalNum
});
},
// 商品数量的编辑
handleItemNumEdit(e){
  // console.log(e)
  const {operation,id}=e.currentTarget.dataset;
  let {cart}=this.data;
  const index=cart.findIndex(v=>v.gooods_id===id);
  cart[index].num+=operation;
  this.setData({
    cart
  })
},
  //点击结算
  handlePay(e){
    wx.navigateTo({
      url: '/pages/pay/index',
    })
  }
})