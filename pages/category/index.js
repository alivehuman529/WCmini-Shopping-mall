//引入 用来发送请求得方法 （路径也补全）
import {request} from "../../request/index.js";

//es7的async语法 需要下载facebook的regenrator库中的文件 然后引入文件 新版的开发者已不需要下载引入可直接使用
//import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
  data: {
    //左侧的菜单数据
    leftMenuList:[],
    //右侧的商品数据
    rightContent:[],
    //被点击的左侧菜单
    currentIndex:0,
    //右侧内容的滚动条距离顶部的距离
    scrollTop:0
  },
  //接口的返回数据
  Cates:[],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 缓存本地数据
    //1.判断本地有没有存储有没有旧的数据{time:Data.now(),data:[...]}
    //2.没有旧的数据直接发送新请求
    //3.有旧的数据同时旧的数据也没有过期就使用本地存储的旧数据即可

    // 1获取本地存储中的数据
    const Cates=wx.getStorageSync('cates');
    // 2判断
    if(!Cates) {
      // 不存在 发送请求获取数据
      this.getCates();
    }else{
      //有旧的数据 定义过期时间 
      // Data.now时间戳
      if(Date.now()-Cates.time>1000*10){
        //重新发送请求
        this.getCates();
      }else{
        //可以使用旧的数据
        this.Cates=Cates.data;
        let leftMenuList = this.Cates.map(v=>v.cat_name);
        let rightContent=this.Cates[0].children;
        this.setData({
        leftMenuList,
        rightContent,
        //重新设置右侧内容scroll-view标签的距离顶部的距离
        scrollTop:0
        })
      }
    }
  },
  //获取分类数据
    getCates(){
     
      // var that = this

    request({
      url:"/categories"
    })
    .then(res=>{
      this.Cates=res.data.message;

      //把接口的数据存入到本地存储中
      wx.setStorageSync("cates",{time:Date.now(),data:this.Cates});

      //构造左侧的大菜单数据
      // map是一个数组函数返回一个新的数组不会改变原始数组，数组中的元素为原始数组调用函数处理后的值。
      // 有三个函数参数，其中一个必须。为当前元素的的值。
      // es6的箭头函数写法无需加以变量指定this
      let leftMenuList = this.Cates.map(v=>v.cat_name);
      //es5语法写需要在前面指定this 并不是每一次都可以请求到数据
      // var leftMenuList = that.Cates.map(function (item){
        //  item=that.Cates.cat_name;
          // return item;
      // });

      // 构造右侧的商品
      let rightContent=this.Cates[0].children;
      this.setData({
        leftMenuList,
        rightContent
      })
    })
      
     //1.使用async来发送异步请求
      // const res=await request({url:"/categories"});
      //  this.Cates=res.data.message;
      //  把接口的数据存入到本地存储中
      //  wx.setStorageSync("cates",{time:Date.now(),data:this.Cates});
      //  构造左侧的大菜单数据
      //  let leftMenuList = this.Cates.map(v=>v.cat_name);
      //  构造右侧的商品数据
      //  let rightContent=this.Cates[0].children;
      //  this.setData({
        //  leftMenuList,
        //  rightContent
      //  })
  },
  //获取左侧菜单的点击事件
  handletItemTap(e){
    //获取被点击的标题身上的索引，给data中的currentlndex赋值
    const {index}=e.currentTarget.dataset;
    //根据不同的索引渲染右侧的商品内容
    let rightContent=this.Cates[index].children;
    this.setData({
      currentIndex:index,
      rightContent,
     //重新设置右侧内容scroll-view标签的距离顶部的距离
      scrollTop:0
    })
  },
})