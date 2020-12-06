Page({
  data: {
    tabs:[
      {
        id:0,
        value:"问题反馈",
        isActive:true
      },
      {
        id:1,
        value:"商品，商家投诉",
        isActive:false
      },
    ],
    // 被选中的图片路径 数组
    chooseImgs:[],
    // 文本域的内容
    textVal:""
  },
  // 外网的图片路径数组
  upLoadImags:[],
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
// 点击+选择图片
handleChooseImg(){
  //调用小程序内置的图片api
  wx.chooseImage({
    // 同时选择的数量
    count: 9,
    // 图片的格式 原图 压缩
    sizeType:['original','compressed'],
    // 图片的来源 相册 照相机
    sourceType:['album','camera'],
    success:(result)=>{
      //console.log(result);
      this.setData({
        // 图片数组 进行拼接
        chooseImgs:[...this.data.chooseImgs,...result.tempFilePaths]
      })
    }
  })
},
// 点击自定义图片组件
handleRemoveImg(e){
  // 获取被点击的组件的索引
  const {index}=e.currentTarget.dataset;
  // console.log(index);
  // 获取data中的图片数据
  let {chooseImgs}=this.data;
  // 删除元素
  chooseImgs.splice(index,1);
  this.setData({
    chooseImgs
  })
},
// 文本域的输入事件
handleTextInput(e){
  // console.log(e);
  this.setData({
    textVal:e.detail.value
  })
},
//提交按钮点击事件
handleFormSubmit(){
  // 获取文本域的内容 图片数组
  const {textVal,chooseImgs}=this.data;
  // 合法性的验证
  if(!textVal.trim()){
    wx.showToast({
      title: '输入不合法',
      icon:'none',
      mask:true
    });
    return;
  }
  // 成功上传到图片服务器 上传文件api不支持多个文件同时上传 需要进行遍历数组
  wx.showLoading({
    title: '正在上传中',
    mask:true,
  });
  chooseImgs.forEach((v,i)=>{
    wx.uploadFile({
      filePath: 'filePath',
      name: 'file',
      url: 'https://images.ac.cn/Home/Index/UploadAction',
      success:(result)=>{
        // console.log(result);
        let uel=JSON.parse(result.data).url;
        this.upLoadImags.push(url);
        // console.log(this.upLoadImags);
        if(i===chooseImgs.length-1){
          console.log("内容以提交到后台");
          this.setData({
            textVal:"",
            chooseImgs:[]
          })
        }
      }
    })
  })
  setTimeout(function () {
    wx.hideLoading({
      success: (res) => {},
    })({})
  }, 1000)
}
})