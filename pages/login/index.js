Page({
  data: {

  },
  handIeGetUser(e){
    // console.log(e);
    const {userInfo}=e.detail;
    wx.setStorageSync('userInfo', userInfo);
    // wx.navigateBack({
      // delta: 1,
    // });
  },
  onLoad: function (options) {
  },

})