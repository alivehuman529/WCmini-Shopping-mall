/* （用户上滑页面 滚动条触底 开始加载下一页数据
   找到滚动条触底事件
   判断有没有下一页数据{
     1.获取总页数=Math.ceil（总条数/页容量pagesize）
     2.获取当前的页码pagenum
     3.判断当前页码是否大于等于总页数}
    假如还有下一页数据 来加载下一页数据
      1.当前的页码 ++
      2.重新发送请求
      3。数据请求回来 要对data中的数组进行拼接 而不是全部替换）
     (
       下拉刷新页面
      1.触发下拉刷新事件，需要在页面的json文件中开启一个配置项
      2.重置 数据 数组
      3.重置页码 设置为1 
      4.重新发现请求
     )
*/
import {request} from "../../request/index.js";
//import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:"综合",
        isActive:true
      },
      {
        id:1,
        value:"销量",
        isActive:false
      },
      {
        id:2,
        value:"价格",
        isActive:false
      }
    ],
    goodsList:[]
  },
  //接口要的参数
  QueryParams:{
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10
  },
  //总页数
  totalPages:1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:function(options){
    this.QueryParams.cid=options.cid||"";
    this.QueryParams.query=options.query||"";
    this.getGoodsList();
  },
  
  //获取商品列表数据
    async getGoodsList(){
      const res=await request({url:"/goods/search",data:this.QueryParams});
    //获取总条数
    const total=res.data.message.total;
      //计算总页数
      this.totalPages=Math.ceil(total/this.QueryParams.pagesize);
      //console.log(this.totalPages);
      this.setData({
        //数据拼接
          goodsList:[...this.data.goodsList,...res.data.message.goods]
    })
    //关闭下拉刷新的窗口
     wx.stopPullDownRefresh();
   },

  //标题点击事件 从子组件获取过来
  handleTabsltemChange(e){
    //获取被点击的标题索引
    const {index} = e.detail;
    // 修改源数组
    let {tabs} = this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    // 赋值到data中
    this.setData({
      tabs
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    // 判断还有没有下一页数据
    if(this.QueryParams.pagenum>=this.totalPages){
      //console.log("没有下一页数据")
      wx.showToast({
        title: '数据已加载完',
      })
    }else{
      //还有下一页数据
      //console.log("还有下一页数据")
      this.QueryParams.pagenum++;
      this.getGoodsList();
    }
  },
  //下拉刷新事件
  onPullDownRefresh(){
    //1.重置数组
    this.setData({
      goodsList:[]
    })
    //2.重置页码
    this.QueryParams.pagenum=1;
    //3.发送请求
     this.getGoodsList();
  }
})